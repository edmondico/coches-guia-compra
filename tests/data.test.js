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

test('ningún recomendado rebasa el techo ampliado de 27.000 €', () => {
  for (const car of cars.filter((item) => item.verdict)) {
    assert.ok(car.netPriceMin <= 27000, `${car.id}: recomendado fuera de presupuesto`);
  }
});

test('Honda Jazz Crosstar enlaza su ficha oficial vigente', () => {
  const crosstar = cars.find((car) => car.id === 'honda-jazz-crosstar-new');
  assert.equal(
    crosstar.sourceUrl,
    'https://www.honda.es/cars/new/jazz-crosstar-advance-hybrid/specifications.html',
  );
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

test('el catálogo cuenta con 25 coches en la lista principal y 4 en el radar', () => {
  const { watchlistCars } = require('../data/cars.js');
  assert.equal(cars.length, 25);
  assert.equal(watchlistCars.length, 4);
});

test('el Tier S contiene 7 modelos incluyendo C-HR GR Sport y Corolla GR Sport', () => {
  const tierSCars = cars.filter((c) => c.tier === 'S');
  assert.equal(tierSCars.length, 7);
  assert.ok(tierSCars.some((c) => c.id === 'toyota-chr-180h-gr-used'));
  assert.ok(tierSCars.some((c) => c.id === 'toyota-corolla-180h-gr-used'));
});

test('los coches están estrictamente ordenados de mayor a menor puntuación según su rank', () => {
  for (let i = 0; i < cars.length; i++) {
    assert.equal(cars[i].rank, i + 1, `${cars[i].id}: rank no secuencial`);
    if (i > 0) {
      assert.ok(
        cars[i - 1].score >= cars[i].score,
        `Incoherencia de notas: ${cars[i - 1].id} (${cars[i - 1].score}) < ${cars[i].id} (${cars[i].score})`,
      );
    }
  }
});

test('Yaris Hybrid nuevo es #15 y CUPRA León es #16, ambos en Tier A', () => {
  const yarisNew = cars.find((c) => c.id === 'toyota-yaris-hybrid-new');
  const cupraLeon = cars.find((c) => c.id === 'cupra-leon-15-etsi-used');
  assert.equal(yarisNew.rank, 15);
  assert.equal(yarisNew.tier, 'A');
  assert.equal(cupraLeon.rank, 16);
  assert.equal(cupraLeon.tier, 'A');
});

test('el resumen de Corolla GR Sport usa redacción rigurosa sin términos absolutos', () => {
  const corolla = cars.find((c) => c.id === 'toyota-corolla-180h-gr-used');
  assert.doesNotMatch(corolla.summary, /a prueba de bombas/);
  assert.match(corolla.summary, /mecánica híbrida Toyota muy contrastada y de elevada fiabilidad/);
});
