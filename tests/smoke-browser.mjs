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
  'http://127.0.0.1:8080',
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
  assert.ok(winners >= 8);

  // Check Tier List and Table
  const tierCardsCount = await evaluate('document.querySelectorAll("#tier-cards-view .tier-card").length');
  console.log('Tier cards rendered:', tierCardsCount);
  assert.equal(tierCardsCount, 16);

  await evaluate('document.getElementById("btn-view-table").click()');
  await new Promise((r) => setTimeout(r, 50));
  const tableRowsCount = await evaluate('document.querySelectorAll("#tier-table-view .tier-row").length');
  const tableVisible = await evaluate('!document.getElementById("tier-table-view").hidden');
  const cardsHidden = await evaluate('document.getElementById("tier-cards-view").hidden');
  console.log('Tier table visible:', tableVisible, 'Rows count:', tableRowsCount, 'Cards hidden:', cardsHidden);
  assert.equal(tableRowsCount, 16);
  assert.equal(tableVisible, true);
  assert.equal(cardsHidden, true);

  await evaluate('document.getElementById("btn-view-cards").click()');
  await new Promise((r) => setTimeout(r, 50));
  const cardsVisible = await evaluate('!document.getElementById("tier-cards-view").hidden');
  assert.equal(cardsVisible, true);

  // Check initial comparison count
  const initialCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Initial cars in comparison:', initialCars);
  assert.ok(initialCars >= 15);

  const initialCountText = await evaluate('document.getElementById("result-count").textContent');
  console.log('Result count text:', initialCountText);
  assert.match(initialCountText, /\d+ coches disponibles/);

  // Test filter by market = used
  await evaluate(`
    document.getElementById("market-filter").value = "used";
    document.getElementById("market-filter").dispatchEvent(new Event("change"));
  `);
  await new Promise((r) => setTimeout(r, 100));

  const usedCars = await evaluate('document.querySelectorAll("#comparison-list .car-card").length');
  console.log('Used cars count:', usedCars);
  assert.ok(usedCars > 0 && usedCars < initialCars);

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
  assert.equal(resetCount, initialCars);

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
