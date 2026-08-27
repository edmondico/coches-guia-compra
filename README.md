# Qué coche comprar por menos de 22.000 € · España 2026

Guía interactiva, editorial y contrastada para elegir coche nuevo o de ocasión en el mercado español con un presupuesto de hasta 22.000 €, garaje propio y uso principalmente urbano y trayectos cortos.

## Características

- **Veredicto personalizado**: 3 opciones claras según prioridad (compra equilibrada, diseño y calidad, máximo ahorro de ocasión).
- **Ganadores por categoría**: 10 categorías clave (mejor compra, autonomía por euro, espacio familiar, viajar, PHEV, automático ECO sin enchufe...).
- **Comparador dinámico**: 16 candidatos contrastados con filtros por mercado (nuevo / ocasión), tecnología (BEV, PHEV, HEV, enchufables), ordenación y búsqueda textual en tiempo real.
- **Rigor en los precios**: Separación estricta entre precio al contado, oferta financiada condicionada y banda de anuncios de ocasión.
- **Plan Auto+ (RD 609/2026)**: Explicación de los 350 M€ de la Línea 1, cálculo de tramos (eléctrico, económico, origen europeo) y advertencias sobre adelanto y tributación.
- **Coste de uso y checklist**: Escenarios reales de recarga en tarifa valle vs. doméstica vs. rápida vs. gasolina, más pasos antes de firmar y modelos descartados.
- **Accesibilidad y diseño responsive**: Conforme a WCAG 2.1 AA, mobile-first verificado a 320, 768, 1024 y 1440 px sin dependencias externas ni compilación.

## Estructura del proyecto

```text
coches-22000/
├── index.html                   # Estructura semántica, accesibilidad y puntos de montaje
├── assets/
│   ├── styles.css               # Sistema de diseño editorial, tokens CSS y responsive
│   ├── comparison.js            # Lógica pura (cálculos Auto+, filtros, orden, formateo) UMD
│   └── app.js                   # Renderizado DOM, gestión de filtros e historial URL
├── data/
│   └── cars.js                  # Catálogo de 16 modelos con fuentes oficiales y anuncios
├── docs/superpowers/
│   ├── specs/                   # Especificación técnica y de diseño
│   └── plans/                   # Plan de implementación paso a paso
├── tests/
│   ├── comparison.test.js       # Pruebas unitarias de cálculo, filtros y formato
│   ├── data.test.js             # Validación de integridad de datos y fuentes
│   ├── page-structure.test.js   # Pruebas de HTML, accesibilidad y tokens CSS
│   └── smoke-browser.mjs        # Smoke test E2E en Chrome headless (CDP)
└── README.md
```

## Cómo abrir y ejecutar

Al ser una aplicación web estática pura (HTML5/CSS/ES2022), no requiere dependencias de producción:

```bash
# Servidor local con Python
python3 -m http.server 8080

# O con Node.js
npx serve .
```

Abre en el navegador `http://127.0.0.1:8080/`.

## Ejecución de pruebas

El proyecto utiliza el test runner nativo de Node.js (`node:test`) y Chrome headless para verificación E2E:

```bash
# Pruebas unitarias y de integridad (31 tests)
node --test tests/*.test.js

# Verificación en navegador real (CDP / Chrome Headless)
node tests/smoke-browser.mjs
```

## Metodología y actualización de datos

Al añadir o modificar vehículos en `data/cars.js`:

1. **Nunca inventar precios al contado**: Si una marca solo publica oferta financiada, definir `financePrice` y `conditional: true`. Usar `cashPrice` solo cuando esté confirmado al contado.
2. **Bandas de ocasión**: Para usados, definir `priceRange: [min, max]` donde `min` coincida con `netPriceMin`.
3. **Plan Auto+**: Para vehículos nuevos elegibles, `aidEstimate` se calcula con la fórmula del RD 609/2026 (hasta 4.500 € para turismos M1 nuevos con fabricación y batería UE). En seminuevos, solo aplica si la primera matrícula es posterior al 01/01/2025 y han transcurrido menos de 12 meses hasta factura en concesionario oficial.
4. **Evidencia y fuentes**: Cada ficha debe incluir `evidence` (`verified`, `indicative`, `upcoming`), `verifiedAt` (fecha ISO) y `sourceUrl` válida con `sourceLabel`.
