'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { cars, watchlistCars } = require('../data/cars.js');

test('todos los coches tienen definidas imagenes principales y de galeria', () => {
  const allCars = [...cars, ...watchlistCars];

  for (const car of allCars) {
    assert.ok(car.images, `${car.id}: falta la propiedad images`);
    assert.ok(typeof car.images.main === 'string' && car.images.main.length > 0, `${car.id}: falta images.main`);
    assert.ok(Array.isArray(car.images.gallery) && car.images.gallery.length >= 1, `${car.id}: gallery debe tener al menos 1 imagen`);
  }
});

test('todos los ficheros de imagen referenciados existen en el directorio assets/images/cars/', () => {
  const allCars = [...cars, ...watchlistCars];
  const rootDir = path.resolve(__dirname, '..');

  for (const car of allCars) {
    if (!car.images) continue;
    const mainPath = path.resolve(rootDir, car.images.main);
    assert.ok(fs.existsSync(mainPath), `${car.id}: no existe la imagen principal en ${car.images.main}`);

    for (const imgPath of car.images.gallery || []) {
      const fullPath = path.resolve(rootDir, imgPath);
      assert.ok(fs.existsSync(fullPath), `${car.id}: no existe la imagen de galería en ${imgPath}`);
    }
  }
});
