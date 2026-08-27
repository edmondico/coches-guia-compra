'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('la página tiene estructura semántica y salto al contenido', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="es">/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="contenido">/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.match(html, /<footer/);
});

test('los filtros están etiquetados y el recuento se anuncia', () => {
  const html = read('index.html');
  for (const id of ['market-filter', 'tech-filter', 'sort-filter', 'car-search']) {
    assert.match(html, new RegExp(`<label[^>]+for="${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /id="result-count"[^>]+aria-live="polite"/);
});

test('el contenido corrige el presupuesto Auto+ y enlaza las fuentes oficiales', () => {
  const html = read('index.html');
  assert.match(html, /350 M€/);
  assert.match(html, /31 de diciembre de 2026/);
  assert.match(html, /https:\/\/www\.boe\.es\/diario_boe\/txt\.php\?id=BOE-A-2026-16010/);
  assert.match(html, /https:\/\/www\.boe\.es\/buscar\/doc\.php\?id=BOE-B-2026-26062/);
  assert.doesNotMatch(html, /finales de septiembre|principios de octubre/);
});

test('existen puntos de montaje y scripts en el orden correcto', () => {
  const html = read('index.html');
  for (const id of ['verdict-list', 'winner-grid', 'comparison-list', 'empty-state']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  const dataIndex = html.indexOf('data/cars.js');
  const comparisonIndex = html.indexOf('assets/comparison.js');
  const appIndex = html.indexOf('assets/app.js');
  assert.ok(dataIndex > 0 && dataIndex < comparisonIndex && comparisonIndex < appIndex);
});

test('los enlaces externos declarados no están vacíos y se protegen', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /href=""/);
  for (const anchor of html.matchAll(/<a\s+[^>]*href="https:[^"]+"[^>]*>/g)) {
    assert.match(anchor[0], /rel="noopener noreferrer"/);
  }
});

test('la hoja visual incluye accesibilidad y responsive sin ocultar desbordamientos', () => {
  const css = read('assets/styles.css');
  for (const token of ['--color-ink', '--color-paper', '--color-accent', '--space-4']) {
    assert.match(css, new RegExp(`${token}:`));
  }
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(min-width:/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden/);
});
