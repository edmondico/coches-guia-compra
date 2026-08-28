import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

// 1. Create static server
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(rootDir, urlPath === '/' ? 'index.html' : urlPath);
  if (!filePath.startsWith(rootDir)) {
    res.statusCode = 403;
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    res.end(content);
  });
});

await new Promise((resolve) => server.listen(8080, '127.0.0.1', resolve));
console.log('HTTP server listening on http://127.0.0.1:8080');

const port = 9222;
const chromeProc = spawn('/usr/bin/google-chrome', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  'http://127.0.0.1:8080/#presupuestos',
], { stdio: 'ignore' });

let cleanedUp = false;
function cleanup() {
  if (cleanedUp) return;
  cleanedUp = true;
  chromeProc.kill('SIGKILL');
  server.close();
}

process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Wait for Chrome CDP to be available
let wsUrl = null;
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json`);
    if (res.ok) {
      const targets = await res.json();
      const pageTarget = targets.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        wsUrl = pageTarget.webSocketDebuggerUrl;
        break;
      }
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 200));
}

if (!wsUrl) {
  cleanup();
  throw new Error('Could not connect to Chrome CDP');
}

console.log('Connected to Chrome CDP:', wsUrl);
const ws = new WebSocket(wsUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let msgId = 1;
const pending = new Map();
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(data.error.message));
    else resolve(data.result);
  }
};

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const res = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(res.exceptionDetails.text || 'Evaluation failed');
  }
  return res.result.value;
}

try {
  // Wait a moment for page scripts to run
  await new Promise((r) => setTimeout(r, 500));

  // A direct URL with a fragment must still land on the target after the
  // dynamic sections above it have finished rendering.
  let directHashPosition;
  for (let i = 0; i < 20; i++) {
    directHashPosition = await evaluate(`({
      hash: window.location.hash,
      top: Math.round(document.getElementById('presupuestos').getBoundingClientRect().top),
    })`);
    if (directHashPosition.hash === '#presupuestos' && Math.abs(directHashPosition.top) <= 160) break;
    await new Promise((r) => setTimeout(r, 100));
  }
  console.log('Direct hash position:', directHashPosition);
  assert.equal(directHashPosition.hash, '#presupuestos');
  assert.ok(Math.abs(directHashPosition.top) <= 160, `#presupuestos quedó a ${directHashPosition.top}px del viewport`);

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 100));
  const mobileNavigation = await evaluate(`({
    menu: getComputedStyle(document.querySelector('.mobile-menu')).display,
    desktop: getComputedStyle(document.querySelector('.nav--desktop')).display,
  })`);
  assert.notEqual(mobileNavigation.menu, 'none');
  assert.equal(mobileNavigation.desktop, 'none');

  await evaluate(`
    const menu = document.querySelector('.mobile-menu');
    menu.open = true;
    menu.querySelector('a').click();
  `);
  await new Promise((r) => setTimeout(r, 50));
  const mobileMenuOpen = await evaluate('document.querySelector(".mobile-menu").open');
  assert.equal(mobileMenuOpen, false);

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 100));
  const desktopNavigation = await evaluate(`({
    menu: getComputedStyle(document.querySelector('.mobile-menu')).display,
    desktop: getComputedStyle(document.querySelector('.nav--desktop')).display,
  })`);
  assert.equal(desktopNavigation.menu, 'none');
  assert.notEqual(desktopNavigation.desktop, 'none');

  const alertInitiallyOpen = await evaluate('document.querySelector(".alert-details").open');
  assert.equal(alertInitiallyOpen, false);
  await evaluate('document.querySelector(".alert-details > summary").click()');
  const alertOpened = await evaluate('document.querySelector(".alert-details").open');
  assert.equal(alertOpened, true);
  await evaluate('document.querySelector(".alert-details > summary").click()');

  // Check title
  const title = await evaluate('document.title');
  console.log('Title:', title);
  assert.match(title, /Qué coche comprar/);

  // Check verdict count
  const verdicts = await evaluate('document.querySelectorAll("#verdict-list .verdict-card").length');
  console.log('Verdicts rendered:', verdicts);
  assert.equal(verdicts, 3);

  // Check winners count
  const winners = await evaluate('document.querySelectorAll("#winner-grid .winner").length');
  console.log('Winners rendered:', winners);
  assert.equal(winners, 8);

  // Check Tier List and Table
  const tierCardsCount = await evaluate('document.querySelectorAll("#tier-cards-view .tier-card").length');
  const tierGroupsCount = await evaluate('document.querySelectorAll("#tier-cards-view details.tier-group").length');
  const openTierGroups = await evaluate('document.querySelectorAll("#tier-cards-view details.tier-group[open]").length');
  console.log('Tier cards rendered:', tierCardsCount);
  assert.equal(tierCardsCount, 21);
  assert.equal(tierGroupsCount, 5);
  assert.equal(openTierGroups, 1);

  const tierDCount = await evaluate('document.querySelector(".tier-group--d .tier-group__toggle").textContent');
  assert.match(tierDCount, /1 coche\b/);
  assert.doesNotMatch(tierDCount, /1 coches\b/);

  await evaluate('document.getElementById("btn-view-table").click()');
  await new Promise((r) => setTimeout(r, 50));
  const tableRowsCount = await evaluate('document.querySelectorAll("#tier-table-view .tier-row").length');
  const tableVisible = await evaluate('!document.getElementById("tier-table-view").hidden');
  const cardsHidden = await evaluate('document.getElementById("tier-cards-view").hidden');
  console.log('Tier table visible:', tableVisible, 'Rows count:', tableRowsCount, 'Cards hidden:', cardsHidden);
  assert.equal(tableRowsCount, 21);
  assert.equal(tableVisible, true);
  assert.equal(cardsHidden, true);

  await evaluate('document.getElementById("btn-view-cards").click()');
  await new Promise((r) => setTimeout(r, 50));
  const cardsVisible = await evaluate('!document.getElementById("tier-cards-view").hidden');
  assert.equal(cardsVisible, true);

  // Check Watchlist / Radar
  const watchlistCount = await evaluate('document.querySelectorAll("#watchlist-grid .watchlist-card").length');
  console.log('Watchlist cards rendered:', watchlistCount);
  assert.equal(watchlistCount, 3);

  const secondaryDisclosures = await evaluate(`({
    count: document.querySelectorAll('details.section-disclosure').length,
    open: document.querySelectorAll('details.section-disclosure[open]').length,
  })`);
  assert.deepEqual(secondaryDisclosures, { count: 7, open: 0 });

  await evaluate('document.querySelector("details.section-disclosure > summary").click()');
  const openedSecondaryDisclosure = await evaluate('document.querySelector("details.section-disclosure").open');
  assert.equal(openedSecondaryDisclosure, true);
  await evaluate('document.querySelector("details.section-disclosure > summary").click()');

  // Check Budget Tool
  const budgetOutput = await evaluate('document.getElementById("budget-output").textContent');
  const budgetResultText = await evaluate('document.getElementById("budget-result-card").textContent');
  console.log('Budget tool initial output:', budgetOutput);
  assert.match(budgetOutput, /18\.000\s*€/);
  assert.match(budgetResultText, /Hyundai Kona Hybrid/i);

  // Test moving budget slider to 26000 €
  await evaluate(`
    const slider = document.getElementById("budget-range");
    slider.value = "26000";
    slider.dispatchEvent(new Event("input"));
  `);
  await new Promise((r) => setTimeout(r, 50));
  const budgetOutput26k = await evaluate('document.getElementById("budget-output").textContent');
  const budgetResult26k = await evaluate('document.getElementById("budget-result-card").textContent');
  console.log('Budget tool at 26k:', budgetOutput26k);
  assert.match(budgetOutput26k, /26\.000\s*€/);
  assert.match(budgetResult26k, /Toyota Yaris Cross/i);

  // Test typing directly into numeric input (24000 €)
  await evaluate(`
    const numInput = document.getElementById("budget-input-number");
    numInput.value = "24000";
    numInput.dispatchEvent(new Event("input"));
  `);
  await new Promise((r) => setTimeout(r, 50));
  const budgetOutput24k = await evaluate('document.getElementById("budget-output").textContent');
  const budgetResult24k = await evaluate('document.getElementById("budget-result-card").textContent');
  console.log('Budget tool at 24k (typed):', budgetOutput24k);
  assert.match(budgetOutput24k, /24\.000\s*€/);
  assert.match(budgetResult24k, /Kona Hybrid Tecno/i);

  // Check 15 master table rows and 15 preset pills
  const masterTableRows = await evaluate('document.querySelectorAll(".budget-row").length');
  const presetPillsCount = await evaluate('document.querySelectorAll(".preset-pill").length');
  const masterTableOpen = await evaluate('document.querySelector(".budget-master-details").open');
  console.log('Master table rows:', masterTableRows, 'Preset pills:', presetPillsCount);
  assert.equal(masterTableRows, 15);
  assert.equal(presetPillsCount, 15);
  assert.equal(masterTableOpen, false);

  // Test clicking a preset pill (14k)
  await evaluate(`
    const pill14k = document.querySelector('.preset-pill[data-set-budget="14000"]');
    pill14k.click();
  `);
  await new Promise((r) => setTimeout(r, 50));
  const budgetResult14k = await evaluate('document.getElementById("budget-result-card").textContent');
  console.log('Budget tool at 14k (pill):', budgetResult14k.slice(0, 80));
  assert.match(budgetResult14k, /Yaris 100H Feel/i);

  // Test clicking sticky TL;DR pill (26k)
  await evaluate(`
    const tldr26k = document.querySelector('.tldr-pill[data-set-budget="26000"]');
    tldr26k.click();
  `);
  await new Promise((r) => setTimeout(r, 50));
  const budgetResult26kTldr = await evaluate('document.getElementById("budget-result-card").textContent');
  console.log('Budget tool from TL;DR (26k):', budgetResult26kTldr.slice(0, 80));
  assert.match(budgetResult26kTldr, /Toyota Yaris Cross/i);

  // Tier analysis stays compact on desktop and expands on demand.
  const initialTierDetailState = await evaluate(`({
    button: getComputedStyle(document.querySelector('.tier-card .tier-card__expand-btn')).display,
    details: getComputedStyle(document.querySelector('.tier-card .tier-card__expandable')).display,
  })`);
  assert.notEqual(initialTierDetailState.button, 'none');
  assert.equal(initialTierDetailState.details, 'none');

  await evaluate(`
    const firstTierBtn = document.querySelector('.tier-card .tier-card__expand-btn');
    if (firstTierBtn) firstTierBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 50));
  const isFirstCardExpanded = await evaluate('document.querySelector(".tier-card").classList.contains("is-expanded")');
  const expandedTierDetailDisplay = await evaluate('getComputedStyle(document.querySelector(".tier-card .tier-card__expandable")).display');
  console.log('First tier card expanded:', isFirstCardExpanded);
  assert.equal(isFirstCardExpanded, true);
  assert.equal(expandedTierDetailDisplay, 'flex');

  // Check initial comparison count
  const initialCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Initial cars in comparison:', initialCars);
  assert.equal(initialCars, 6);

  const initialCarDetails = await evaluate(`({
    count: document.querySelectorAll('#comparison-list .car-card__details').length,
    open: document.querySelectorAll('#comparison-list .car-card__details[open]').length,
  })`);
  assert.deepEqual(initialCarDetails, { count: 6, open: 0 });

  await evaluate('document.querySelector("#comparison-list .car-card__details summary").click()');
  const openCarDetails = await evaluate('document.querySelectorAll("#comparison-list .car-card__details[open]").length');
  assert.equal(openCarDetails, 1);

  const initialCountText = await evaluate('document.getElementById("result-count").textContent');
  console.log('Result count text:', initialCountText);
  assert.match(initialCountText, /6 de 21 coches visibles/);

  const catalogueToggleState = await evaluate(`({
    text: document.getElementById('catalogue-toggle').textContent,
    expanded: document.getElementById('catalogue-toggle').getAttribute('aria-expanded'),
  })`);
  assert.match(catalogueToggleState.text, /Mostrar 15 más/);
  assert.equal(catalogueToggleState.expanded, 'false');

  await evaluate('document.getElementById("catalogue-toggle").click()');
  await new Promise((r) => setTimeout(r, 50));
  const expandedCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  const expandedState = await evaluate('document.getElementById("catalogue-toggle").getAttribute("aria-expanded")');
  assert.equal(expandedCars, 21);
  assert.equal(expandedState, 'true');

  // Test filter by market = used
  await evaluate(`
    document.getElementById("market-filter").value = "used";
    document.getElementById("market-filter").dispatchEvent(new Event("change"));
  `);
  await new Promise((r) => setTimeout(r, 100));

  const usedCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Used cars count:', usedCars);
  assert.ok(usedCars > 0 && usedCars < expandedCars);

  // Test search
  await evaluate(`
    document.getElementById("market-filter").value = "all";
    document.getElementById("car-search").value = "Citroën";
    document.getElementById("car-search").dispatchEvent(new Event("input"));
  `);
  await new Promise((r) => setTimeout(r, 100));

  const citroenCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Citroën search count:', citroenCars);
  assert.equal(citroenCars, 1);

  // Test empty state
  await evaluate(`
    document.getElementById("car-search").value = "nonexistentmodel12345";
    document.getElementById("car-search").dispatchEvent(new Event("input"));
  `);
  await new Promise((r) => setTimeout(r, 100));

  const emptyVisible = await evaluate('!document.getElementById("empty-state").hidden');
  const emptyListCount = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Empty state visible:', emptyVisible, 'Cards count:', emptyListCount);
  assert.equal(emptyVisible, true);
  assert.equal(emptyListCount, 0);

  // Test reset button
  await evaluate('document.querySelector("[data-reset-filters]").click()');
  await new Promise((r) => setTimeout(r, 100));

  const resetCount = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('After reset count:', resetCount);
  assert.equal(resetCount, expandedCars);

  // Test responsive layout at 320, 768, 1024, 1440 px
  for (const width of [320, 768, 1024, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await new Promise((r) => setTimeout(r, 100));

    const scrollWidth = await evaluate('document.documentElement.scrollWidth');
    const clientWidth = await evaluate('document.documentElement.clientWidth');
    console.log(`Viewport ${width}px -> scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth + 1) {
      const culprits = await evaluate(`
        Array.from(document.querySelectorAll("*"))
          .filter(el => el.scrollWidth > ${clientWidth} || el.getBoundingClientRect().right > ${clientWidth})
          .map(el => ({ tag: el.tagName, id: el.id, class: el.className, scrollWidth: el.scrollWidth, right: el.getBoundingClientRect().right, text: (el.innerText || "").slice(0, 35) }))
      `);
      console.log("Culprits:", culprits);
    }
    assert.ok(scrollWidth <= clientWidth + 1, `Horizontal overflow at ${width}px: ${scrollWidth} > ${clientWidth}`);
  }

  console.log('All browser smoke tests passed successfully!');
} finally {
  ws.close();
  cleanup();
}
