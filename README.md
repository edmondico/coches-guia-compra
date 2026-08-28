# Qué coche comprar · objetivo 23–26k (máximo ~27k) · España 2026

Guía interactiva y contrastada para elegir un coche automático, híbrido o eléctrico nuevo o de ocasión. Está personalizada para uso familiar compartido, trayectos entre Vallirana y Barcelona, garaje y una compra pensada para durar 10–15 años.

## Características

- **Veredicto personalizado**: 3 finalistas para equilibrio global, tecnología/confort y fiabilidad/ergonomía.
- **Clasificación completa**: 21 candidatos ordenados en tiers S–D, disponibles como tarjetas desplegables y como tabla maestra.
- **Mejor coche por presupuesto**: 15 escalones entre 13.000 y 27.000 €, con selector, entrada numérica, saltos recomendados y alternativas por tramo.
- **Lectura progresiva**: Tier S abierto por defecto, tabla presupuestaria plegada, ocho distinciones clave y comparador compacto de 6 coches ampliable a 21.
- **Radar 2026**: 3 candidatos adicionales que sólo entran si aparece una oferta dentro del objetivo.
- **Comparador dinámico**: filtros por mercado (nuevo/ocasión), tecnología (BEV/HEV), ordenación y búsqueda textual en tiempo real.
- **Rigor en los precios**: Separación estricta entre precio al contado, oferta financiada condicionada y banda de anuncios de ocasión.
- **Plan Auto+ (RD 609/2026)**: diferencia Línea 1 de particulares y Línea 2 para actividad económica, sin descontar ayudas no concedidas del precio comparable.
- **Contexto local**: tamaño para garajes, acceso para los padres, ZBE de Barcelona y coste de uso.
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
│   └── cars.js                  # 21 modelos, 3 en radar y 15 guías de presupuesto
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
# Pruebas unitarias, de integridad y estructura (36 tests)
node --test tests/*.test.js

# Verificación en navegador real (CDP / Chrome Headless)
node tests/smoke-browser.mjs
```

## Metodología y actualización de datos

Al añadir o modificar vehículos en `data/cars.js`:

1. **Nunca inventar precios al contado**: Si una marca solo publica oferta financiada, definir `financePrice` y `conditional: true`. Usar `cashPrice` solo cuando esté confirmado al contado.
2. **Bandas de ocasión**: Para usados, definir `priceRange: [min, max]` donde `min` coincida con `netPriceMin`.
3. **Plan Auto+**: No restar del precio comparable una ayuda pendiente. Línea 1 y Línea 2 tienen importes, beneficiarios y convocatorias distintas; citar siempre la base y la convocatoria aplicable.
4. **Evidencia y fuentes**: Cada ficha debe incluir `evidence` (`verified`, `indicative`, `upcoming`), `verifiedAt` (fecha ISO) y `sourceUrl` válida con `sourceLabel`.
5. **Ranking y presupuesto**: Mantener `rank`, `tier`, `score` y `budgetGuides` coherentes. Los tres veredictos no pueden superar el techo editorial de 27.000 €.

## Estado de las fuentes

Los precios y enlaces se revisaron el 28/08/2026. Los listados de ocasión son búsquedas vivas: una unidad concreta puede desaparecer y la banda debe volver a comprobarse antes de reservar. Las fuentes oficiales pueden bloquear comprobaciones automáticas aunque sigan abriendo en un navegador normal.
