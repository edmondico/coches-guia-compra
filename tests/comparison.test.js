'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  calculateAid,
  conditionLabel,
  escapeHtml,
  evidenceLabel,
  filterCars,
  formatDate,
  formatEuro,
  initials,
  marketLabel,
  netPrice,
  parseFilters,
  priceDisplay,
  sortCars,
  techLabel,
} = require('../assets/comparison.js');

const fixtures = [
  {
    id: 'new-bev',
    name: 'Nuevo BEV',
    market: 'new',
    technology: 'BEV',
    cashPrice: 23000,
    aidEstimate: 4500,
    netPriceMin: 18500,
    wltpKm: 312,
  },
  {
    id: 'used-bev',
    name: 'Usado BEV',
    market: 'used',
    technology: 'BEV',
    cashPrice: 17000,
    aidEstimate: 0,
    netPriceMin: 17000,
    wltpKm: 340,
  },
  {
    id: 'used-phev',
    name: 'Usado PHEV',
    market: 'used',
    technology: 'PHEV',
    cashPrice: 18000,
    aidEstimate: 0,
    netPriceMin: 18000,
    wltpKm: 50,
  },
  {
    id: 'new-hev',
    name: 'Nuevo híbrido',
    market: 'new',
    technology: 'HEV',
    cashPrice: 21000,
    aidEstimate: 0,
    netPriceMin: 21000,
    wltpKm: null,
  },
];

test('calcula 4.500 € sólo con los tres tramos completos de un BEV', () => {
  assert.equal(calculateAid({
    technology: 'BEV',
    pretaxPrice: 30000,
    euAssembly: true,
    euBattery: true,
    aidEligible: true,
  }), 4500);
});

test('calcula 3.375 € para un BEV económico sin tramo europeo', () => {
  assert.equal(calculateAid({
    technology: 'BEV',
    pretaxPrice: 30000,
    euAssembly: false,
    euBattery: false,
    aidEligible: true,
  }), 3375);
});

test('un PHEV económico europeo queda limitado al 75 % del máximo', () => {
  assert.equal(calculateAid({
    technology: 'PHEV',
    pretaxPrice: 30000,
    euAssembly: true,
    euBattery: true,
    aidEligible: true,
  }), 3375);
});

test('no concede ayuda a un coche no elegible', () => {
  assert.equal(calculateAid({
    technology: 'BEV',
    pretaxPrice: 30000,
    euAssembly: true,
    euBattery: true,
    aidEligible: false,
  }), 0);
});

test('no mezcla un precio financiado con el precio al contado', () => {
  assert.equal(netPrice({ financePrice: 16000, aidEstimate: 3375 }), null);
});

test('resta la ayuda estimada sólo del precio al contado', () => {
  assert.equal(netPrice({ cashPrice: 23000, aidEstimate: 4500 }), 18500);
});

test('filtra por mercado y tecnología sin mutar la colección', () => {
  const before = structuredClone(fixtures);
  const result = filterCars(fixtures, {
    market: 'used',
    technology: 'BEV',
    maxPrice: 22000,
    query: '',
  });

  assert.deepEqual(result.map((car) => car.id), ['used-bev']);
  assert.deepEqual(fixtures, before);
});

test('el grupo enchufable reúne BEV y PHEV', () => {
  const result = filterCars(fixtures, {
    market: 'all',
    technology: 'plug-in',
    maxPrice: 22000,
    query: '',
  });

  assert.deepEqual(result.map((car) => car.id), ['new-bev', 'used-bev', 'used-phev']);
});

test('la búsqueda ignora mayúsculas y acentos', () => {
  const result = filterCars(fixtures, {
    market: 'all',
    technology: 'all',
    maxPrice: 22000,
    query: 'HIBRIDO',
  });

  assert.deepEqual(result.map((car) => car.id), ['new-hev']);
});

test('ordena por precio sin alterar la lista de entrada', () => {
  const result = sortCars(fixtures, 'price-asc');
  assert.deepEqual(result.map((car) => car.id), ['used-bev', 'used-phev', 'new-bev', 'new-hev']);
  assert.equal(fixtures[0].id, 'new-bev');
});

test('ordena autonomía poniendo los valores desconocidos al final', () => {
  const result = sortCars(fixtures, 'range-desc');
  assert.deepEqual(result.map((car) => car.id), ['used-bev', 'new-bev', 'used-phev', 'new-hev']);
});

test('formatea euros en español sin decimales', () => {
  assert.match(formatEuro(18500), /18[.\s]500\s*€/);
  assert.equal(formatEuro(null), 'Consultar');
});

test('describe por separado contado, financiación y banda de mercado', () => {
  assert.equal(conditionLabel({ cashPrice: 21000 }), 'Precio al contado');
  assert.equal(conditionLabel({ financePrice: 17000 }), 'Oferta financiada');
  assert.equal(conditionLabel({ priceRange: [16000, 19000] }), 'Banda de anuncios');
});

test('sólo conserva filtros de URL permitidos', () => {
  const filters = parseFilters(new URLSearchParams('market=used&technology=BEV&sort=hacked&q=Zoe'));
  assert.deepEqual(filters, {
    market: 'used',
    technology: 'BEV',
    sort: 'recommended',
    query: 'Zoe',
  });
});

test('escapa caracteres HTML peligrosos', () => {
  assert.equal(escapeHtml('<script>alert("xss") & \'test\'</script>'), '&lt;script&gt;alert(&quot;xss&quot;) &amp; &#39;test&#39;&lt;/script&gt;');
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(123), '123');
});

test('genera iniciales correctas para el avatar visual', () => {
  assert.equal(initials('Citroën ë-C3'), 'CË');
  assert.equal(initials('Renault 5 E-Tech'), 'R5');
  assert.equal(initials('MG4'), 'MG');
  assert.equal(initials('Zoe'), 'ZO');
});

test('mapea etiquetas legibles de tecnología, mercado y evidencia', () => {
  assert.equal(techLabel('BEV'), 'Eléctrico puro (BEV)');
  assert.equal(techLabel('PHEV'), 'Híbrido enchufable (PHEV)');
  assert.equal(techLabel('HEV'), 'Híbrido (ECO)');

  assert.equal(marketLabel('new'), 'Nuevo');
  assert.equal(marketLabel('used'), 'Ocasión');

  assert.equal(evidenceLabel('verified'), 'Verificado');
  assert.equal(evidenceLabel('indicative'), 'Orientativo');
  assert.equal(evidenceLabel('upcoming'), 'Próximo lanzamiento');
});

test('formatea fechas ISO a formato legible en español', () => {
  assert.equal(formatDate('2026-08-28'), '28/08/2026');
  assert.equal(formatDate(null), '—');
});

test('formatea el valor de precio según sea contado, financiado o banda', () => {
  assert.match(priceDisplay({ cashPrice: 22200 }), /22[.\s]200\s*€/);
  assert.match(priceDisplay({ financePrice: 17855 }), /desde\s*17[.\s]855\s*€/);
  assert.match(priceDisplay({ priceRange: [12590, 14990] }), /12[.\s]590\s*€\s*–\s*14[.\s]990\s*€/);
  assert.equal(priceDisplay({}), 'Consultar');
});


