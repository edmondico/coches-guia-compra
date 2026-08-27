'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { cars } = require('../data/cars.js');

test('el catálogo tiene al menos doce alternativas comparables', () => {
  assert.ok(cars.length >= 12);
});

test('cada coche tiene identidad, evidencia, fecha y fuente utilizable', () => {
  const allowedEvidence = new Set(['verified', 'indicative', 'upcoming']);

  for (const car of cars) {
    assert.match(car.id, /^[a-z0-9-]+$/, `${car.id}: id inválido`);
    assert.ok(car.name, `${car.id}: falta nombre`);
    assert.ok(['new', 'used'].includes(car.market), `${car.id}: mercado inválido`);
    assert.ok(['BEV', 'PHEV', 'HEV'].includes(car.technology), `${car.id}: tecnología inválida`);
    assert.ok(allowedEvidence.has(car.evidence), `${car.id}: evidencia inválida`);
    assert.match(car.verifiedAt, /^2026-08-\d{2}$/, `${car.id}: fecha inválida`);
    assert.doesNotThrow(() => new URL(car.sourceUrl), `${car.id}: URL inválida`);
    assert.ok(car.sourceLabel, `${car.id}: falta etiqueta de fuente`);
    assert.ok(car.summary, `${car.id}: falta resumen`);
    assert.ok(car.priceNote, `${car.id}: falta explicación del precio`);
    assert.ok(Number.isFinite(car.netPriceMin), `${car.id}: falta precio comparable`);
  }
});

test('el precio neto al contado coincide con contado menos ayuda', () => {
  for (const car of cars.filter((item) => Number.isFinite(item.cashPrice))) {
    assert.equal(
      car.netPriceMin,
      car.cashPrice - car.aidEstimate,
      `${car.id}: precio neto incoherente`,
    );
  }
});

test('ningún recomendado rebasa el presupuesto neto', () => {
  for (const car of cars.filter((item) => item.verdict)) {
    assert.ok(car.netPriceMin <= 22000, `${car.id}: recomendado fuera de presupuesto`);
  }
});

test('las bandas de ocasión están ordenadas y definen el mínimo comparable', () => {
  for (const car of cars.filter((item) => Array.isArray(item.priceRange))) {
    assert.equal(car.priceRange.length, 2, `${car.id}: banda incompleta`);
    assert.ok(car.priceRange[0] <= car.priceRange[1], `${car.id}: banda invertida`);
    assert.equal(car.netPriceMin, car.priceRange[0], `${car.id}: mínimo incoherente`);
  }
});

test('las ofertas condicionadas no se presentan como precio al contado', () => {
  for (const car of cars.filter((item) => item.financePrice)) {
    assert.equal(car.cashPrice, undefined, `${car.id}: mezcla contado con financiado`);
    assert.equal(car.conditional, true, `${car.id}: falta marcar condiciones`);
  }
});

