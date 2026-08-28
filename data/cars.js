(function carDataModule(root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.CarData = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createCarData() {
  "use strict";

  const cars = [
  {
    "id": "toyota-yaris-cross-130-used",
    "name": "Toyota Yaris Cross",
    "variant": "Hybrid 130 Style · 2024 · Automático e-CVT",
    "market": "used",
    "technology": "HEV",
    "year": 2024,
    "powerCv": 130,
    "batteryKwh": 0.8,
    "wltpKm": null,
    "priceRange": [
      25000,
      25990
    ],
    "aidEstimate": 0,
    "netPriceMin": 25000,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/toyota/yaris_cross/segunda-mano/barcelona/?MinYear=2022",
    "sourceLabel": "Coches.net · Buscar Yaris Cross VO Barcelona (Filtro Activo)",
    "priceNote": "Unidades Style 2024 (27.000 km) observadas en Barcelona por 25.990 € certificado con Toyota Relax hasta 15 años o 250.000 km.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "25.000 € – 25.990 €",
      "aidLabel": "Garantía extendida oficial",
      "aidValue": "Hasta 15 años / 250.000 km (Toyota Relax)",
      "extraLabel": "Pantallas y equipamiento 2024",
      "extraValue": "Central 10,5\" + Cuadro digital 12,3\" + Lumbar",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "25.000 € – 25.990 €",
      "financeNote": "Financiación Toyota Easy VO: cuotas habituales desde ~250–280 €/mes"
    },
    "summary": "El coche más equilibrado para vuestra familia a 10–15 años: 4,17 m, 130 CV con respuesta más ágil, e-CVT sin embragues ni turbos, pantallas grandes (10,5\" y 12,3\"), posición elevada fácil para tus padres y llave digital compartida.",
    "bestFor": "Máxima tranquilidad mecánica a 15 años, facilidad de acceso para padres y tecnología actualizada 2024",
    "caution": "Incidencias menores reportadas en batería auxiliar de 12 V si se deja parado meses.",
    "availability": "Stock certificado en concesionarios Toyota Barcelona",
    "winner": "🏆 Mejor equilibrio global (Toyota Relax 15 años)",
    "verdict": "global",
    "rank": 1,
    "tier": "S",
    "score": 9.25,
    "lengthM": "4,17 m",
    "trunkL": "397 l",
    "seats": 5,
    "warranty": "Hasta 15 años / 250.000 km (Toyota Relax)",
    "pros": [
      "Motor 130 CV con respuesta más ágil y solvente",
      "Transmisión e-CVT muy contrastada y de elevada fiabilidad sin embrague tradicional ni turbo",
      "Garantía Toyota Relax extensible hasta los 15 años o 250.000 km",
      "Pantalla central de 10,5\" y cuadro digital de 12,3\" (Style 2024)",
      "Posición de conducción crossover elevada: acceso muy cómodo para tus padres"
    ],
    "cons": [
      "Incidencias menores reportadas en batería auxiliar de 12 V si pasa semanas parado",
      "Insonorización algo ruidosa en aceleraciones a fondo por el cambio e-CVT"
    ],
    "images": {
      "main": "assets/images/cars/toyota-yaris-cross-130-used-main.jpg",
      "gallery": [
        "assets/images/cars/toyota-yaris-cross-130-used-main.jpg",
        "assets/images/cars/toyota-yaris-cross-130-used-gallery-1.jpg",
        "assets/images/cars/toyota-yaris-cross-130-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "hyundai-kona-hev-tecno-used",
    "name": "Hyundai Kona Hybrid",
    "variant": "1.6 GDI HEV Tecno · 141 CV · DCT 6v · 2024",
    "market": "used",
    "technology": "HEV",
    "year": 2024,
    "powerCv": 141,
    "batteryKwh": 1.32,
    "wltpKm": null,
    "priceRange": [
      23900,
      26000
    ],
    "aidEstimate": 0,
    "netPriceMin": 23900,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/hyundai/kona/hibrido/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · Buscar Kona Hybrid VO Barcelona (Filtro Activo)",
    "priceNote": "Kona HEV Tecno 2024 observado en Barcelona desde 23.900 € al contado (25.000 km). Batería oficial 1,32 kWh.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "23.900 € – 26.000 €",
      "aidLabel": "Garantía oficial Hyundai",
      "aidValue": "5 años sin límite km (8 años/160.000 km batería)",
      "extraLabel": "Pantallas panorámicas 2024",
      "extraValue": "Doble pantalla integrada de 12,3\" + Clima bizona",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "23.900 € – 26.000 €",
      "financeNote": "Financiación VO en compraventa/concesionario: cuotas desde ~240–270 €/mes"
    },
    "summary": "La mejor tecnología y sensación de coche moderno por euro invertido: 4,35 m, doble pantalla de 12,3\", batería de 1,32 kWh, 466 l de maletero, confort superior de marcha y 5 años de garantía sin límite de km (a 23.900 € es una ganga).",
    "bestFor": "Interior futurista de 2026, máximo confort de habitáculo y espacio de maletero",
    "caution": "Mide 4,35 m (el límite máximo para vuestro garaje) y cambio de doble embrague DCT.",
    "availability": "Unidades recientes en red oficial Barcelona",
    "winner": "💻 Mejor tecnología, interior & confort (Doble 12,3\")",
    "verdict": "comfort",
    "rank": 2,
    "tier": "S",
    "score": 9.1,
    "lengthM": "4,35 m",
    "trunkL": "466 l",
    "seats": 5,
    "warranty": "5 años sin límite de km (oficial Hyundai)",
    "pros": [
      "Doble pantalla panorámica curva de 12,3\" con interfaz moderna y nítida",
      "Maletero de 466 l (el más grande y aprovechable del top)",
      "Sensación de coche grande y confort de rodadura impecable en autopista y baches",
      "Garantía oficial de 5 años sin límite de kilometraje"
    ],
    "cons": [
      "Mide 4,35 m (+18 cm que el Yaris Cross, límite para maniobrar en garajes justos)",
      "Caja automática DCT con doble embrague tradicional (más compleja que e-CVT)"
    ],
    "images": {
      "main": "assets/images/cars/hyundai-kona-hev-tecno-used-main.jpg",
      "gallery": [
        "assets/images/cars/hyundai-kona-hev-tecno-used-main.jpg",
        "assets/images/cars/hyundai-kona-hev-tecno-used-gallery-1.jpg",
        "assets/images/cars/hyundai-kona-hev-tecno-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "honda-hrv-ehev-used",
    "name": "Honda HR-V e:HEV",
    "variant": "1.5 i-MMD Advance · 131 CV · 2022–2023",
    "market": "used",
    "technology": "HEV",
    "year": 2023,
    "powerCv": 131,
    "batteryKwh": 1,
    "wltpKm": null,
    "priceRange": [
      24500,
      25900
    ],
    "aidEstimate": 0,
    "netPriceMin": 24500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/honda/hrv/hibrido/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · Buscar Honda HR-V Híbrido Barcelona",
    "priceNote": "Unidades Advance 2022-2023 observadas en Barcelona entre 24.500 € y 25.900 € al contado.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "24.500 € – 25.900 €",
      "aidLabel": "Fiabilidad mecánica What Car?",
      "aidValue": "97,5% satisfacción demostrada",
      "extraLabel": "Modularidad interior",
      "extraValue": "Magic Seats traseros plegables hacia arriba",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "24.500 € – 25.900 €",
      "financeNote": "Financiación VO: cuotas habituales desde ~250 €/mes"
    },
    "summary": "Ingeniería japonesa impecable (97,5% fiabilidad What Car?): el motor térmico actúa como generador eléctrico la mayor parte del tiempo, propulsión eléctrica directa suave, asientos Magic Seats y calidad de ajuste superior.",
    "bestFor": "Calidad constructiva suprema, suavidad de marcha tipo eléctrico y fiabilidad",
    "caution": "Maletero algo justo (319 l) y sistema multimedia más clásico de 9\".",
    "availability": "Stock certificado en red Honda",
    "winner": "🛡️ Máxima fiabilidad mecánica & ergonomía (97,5%)",
    "verdict": "mechanical",
    "rank": 3,
    "tier": "S",
    "score": 8.95,
    "lengthM": "4,34 m",
    "trunkL": "319 l",
    "seats": 5,
    "warranty": "Hasta 8 años / 160.000 km si la unidad cumple las condiciones de la garantía comercial activada por servicio Honda (comprobar elegibilidad/cobertura por bastidor e historial oficial)",
    "pros": [
      "97,5% de fiabilidad en encuestas independientes europeas (What Car?)",
      "Sistema e:HEV: rueda como un eléctrico casi todo el tiempo con suavidad absoluta",
      "Magic Seats: banquetas traseras que se levantan como butacas de cine para llevar plantas o cajas",
      "Excelente visibilidad hacia afuera y tacto de botones físicos prémium"
    ],
    "cons": [
      "Maletero de 319 l (el más modesto entre los crossover medianos)",
      "Pantalla multimedia de 9\" correcta pero menos vistosa que la de Hyundai"
    ],
    "images": {
      "main": "assets/images/cars/honda-hrv-ehev-used-main.jpg",
      "gallery": [
        "assets/images/cars/honda-hrv-ehev-used-main.jpg",
        "assets/images/cars/honda-hrv-ehev-used-gallery-1.jpg",
        "assets/images/cars/honda-hrv-ehev-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "toyota-chr-180h-gr-used",
    "name": "Toyota C-HR GR Sport",
    "variant": "2.0 Dynamic Force 180H GR Sport · 2022 · e-CVT",
    "market": "used",
    "technology": "HEV",
    "year": 2022,
    "powerCv": 184,
    "batteryKwh": 1.4,
    "wltpKm": null,
    "priceRange": [
      25500,
      26490
    ],
    "aidEstimate": 0,
    "netPriceMin": 25500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.autocasion.com/coches-segunda-mano/toyota-c-hr-ocasion/2-0-hybrid-gr-sport-16a640c90f0500-ref20863869",
    "sourceLabel": "AutoCasión · C-HR 2.0 180H GR Sport 2022 Barcelona (26.199 €)",
    "priceNote": "Unidades 2.0 180H GR Sport 2022 con ~44.000 km observadas en Barcelona por 26.199 € al contado con Toyota Relax hasta 15 años/250.000 km.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "25.500 € – 26.490 €",
      "aidLabel": "Garantía oficial extendida",
      "aidValue": "Hasta 15 años / 250.000 km (Toyota Relax)",
      "extraLabel": "Motor y acabado",
      "extraValue": "184 CV (0-100 en 8,0 s) + Llantas 19\" + Asientos deportivos",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "25.500 € – 26.490 €",
      "financeNote": "Financiación habitual Toyota Ocasión desde ~270 €/mes"
    },
    "summary": "La opción que combina estética deportiva y potencia (184 CV) con total tranquilidad familiar: chasis dinámico GR Sport, e-CVT extremadamente contrastada y de elevada fiabilidad sin turbo ni embrague, garantía Toyota Relax 15 años y altura crossover que aún permite un acceso razonable a tus padres.",
    "bestFor": "Quien busca un crossover deportivo, potente (184 CV) y de imagen atractiva sin renunciar a fiabilidad a 15 años y acceso elevado",
    "caution": "Visibilidad trasera reducida por diseño coupé y ventanillas traseras pequeñas que pueden dar sensación de encajonamiento a los pasajeros posteriores.",
    "availability": "Disponibilidad contrastada en concesionarios Toyota Ocasión y compraventa en Barcelona",
    "winner": "🔥 Crossover deportivo más fiable y potente (184 CV)",
    "verdict": null,
    "rank": 4,
    "tier": "S",
    "score": 8.93,
    "lengthM": "4,40 m",
    "trunkL": "358 l",
    "seats": 5,
    "warranty": "Hasta 15 años / 250.000 km (Toyota Relax)",
    "pros": [
      "Motor 2.0 180H con 184 CV y aceleración 0-100 en 8,0 s muy superior a la media",
      "Mecánica híbrida Toyota ultra-probada con e-CVT sin embrague ni turbo",
      "Garantía oficial Toyota Relax renovable hasta 15 años o 250.000 km",
      "Puesto de conducción crossover con acceso más alto y cómodo que un compacto bajo",
      "Acabado GR Sport con ajuste de suspensión específico, llantas 19\" y asientos envolventes"
    ],
    "cons": [
      "Ventanillas traseras estrechas con menor luminosidad y visibilidad posterior crítica",
      "Maletero de 358 l (inferior a los 397 l del Yaris Cross y 466 l del Kona)",
      "Longitud de 4,40 m (23 cm más largo que el Yaris Cross para aparcar en garaje)"
    ],
    "images": {
      "main": "assets/images/cars/toyota-chr-180h-gr-used-main.jpg",
      "gallery": [
        "assets/images/cars/toyota-chr-180h-gr-used-main.jpg",
        "assets/images/cars/toyota-chr-180h-gr-used-gallery-1.jpg",
        "assets/images/cars/toyota-chr-180h-gr-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "toyota-corolla-180h-gr-used",
    "name": "Toyota Corolla GR Sport",
    "variant": "2.0 Dynamic Force 180H GR Sport · 2021–2022 · e-CVT",
    "market": "used",
    "technology": "HEV",
    "year": 2021,
    "powerCv": 184,
    "batteryKwh": 1.4,
    "wltpKm": null,
    "priceRange": [
      24900,
      25990
    ],
    "aidEstimate": 0,
    "netPriceMin": 24900,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.autocasion.com/coches-segunda-mano/toyota-corolla-ocasion/barcelona/hibrido",
    "sourceLabel": "AutoCasión · Corolla 2.0 180H GR Sport Barcelona (25.890 €)",
    "priceNote": "Unidades 2.0 180H GR Sport 2021-2022 observadas en Barcelona por 25.890 € al contado con ~53.000 km y Toyota Relax hasta 15 años.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "24.900 € – 25.990 €",
      "aidLabel": "Garantía oficial extendida",
      "aidValue": "Hasta 15 años / 250.000 km (Toyota Relax)",
      "extraLabel": "Chasis y mecánica",
      "extraValue": "184 CV + Suspensión multibrazo trasera + Acabado GR Sport",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "24.900 € – 25.990 €",
      "financeNote": "Financiación habitual Toyota Ocasión desde ~260 €/mes"
    },
    "summary": "El compacto más gratificante de conducir de la comparativa con mecánica híbrida Toyota muy contrastada y de elevada fiabilidad: centro de gravedad bajo, suspensión trasera multibrazo, 184 CV con empuje inmediato y garantía Relax de 15 años. Su único peaje familiar es una postura más baja para tus padres.",
    "bestFor": "Prioridad en dinamismo de conducción, agilidad en carretera y fiabilidad absoluta manteniendo 5 puertas",
    "caution": "Carrocería baja tradicional que exige flexionar más las piernas y tronco para entrar y salir que en un crossover.",
    "availability": "Stock habitual certificado en la red Toyota Ocasión Barcelona",
    "winner": "🏁 Compacto deportivo con mejor chasis y fiabilidad 15 años",
    "verdict": null,
    "rank": 5,
    "tier": "S",
    "score": 8.91,
    "lengthM": "4,37 m",
    "trunkL": "361 l",
    "seats": 5,
    "warranty": "Hasta 15 años / 250.000 km (Toyota Relax)",
    "pros": [
      "Excelente dinamismo en carretera gracias a su centro de gravedad bajo y suspensión multibrazo",
      "Motor 2.0 184 CV con respuesta contundente y consumo real en torno a 4,8-5,2 l/100 km",
      "Fiabilidad legendaria del sistema híbrido Toyota de 4.ª generación con e-CVT",
      "Garantía Toyota Relax hasta 15 años o 250.000 km",
      "Estética deportiva sobria y elegante con asientos mixtos cuero/tela GR Sport"
    ],
    "cons": [
      "Acceso más bajo y menos cómodo para personas mayores que en los SUV/crossovers",
      "Plazas traseras con espacio para piernas justo para adultos de más de 1,80 m",
      "Maletero de 361 l en la versión 2.0 (batería de 12V reubicada en el fondo del maletero)"
    ],
    "images": {
      "main": "assets/images/cars/toyota-corolla-180h-gr-used-main.jpg",
      "gallery": [
        "assets/images/cars/toyota-corolla-180h-gr-used-main.jpg",
        "assets/images/cars/toyota-corolla-180h-gr-used-gallery-1.jpg",
        "assets/images/cars/toyota-corolla-180h-gr-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "hyundai-kona-hev-2021-used",
    "name": "Hyundai Kona Hybrid 2021",
    "variant": "1.6 GDI HEV Maxx · 141 CV · DCT 6v · 2021",
    "market": "used",
    "technology": "HEV",
    "year": 2021,
    "powerCv": 141,
    "batteryKwh": 1.56,
    "wltpKm": null,
    "cashPrice": 17900,
    "aidEstimate": 0,
    "netPriceMin": 17900,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/hyundai/kona/hibrido/segunda-mano/barcelona/?MinYear=2020&MaxYear=2022",
    "sourceLabel": "Coches.net · Kona Hybrid 2020–2022 Barcelona",
    "priceNote": "Unidad activa observada en Barcelona por 17.900 € al contado con solo 21.835 km certificados (141 CV, automático, 5 puertas, 4,17 m). Incluye 12 meses de garantía del vendedor.",
    "breakdown": {
      "initialLabel": "PVP al contado verificado BCN",
      "initialValue": "17.900 €",
      "aidLabel": "Kilometraje certificado",
      "aidValue": "21.835 km (uso de reestreno)",
      "extraLabel": "Fiabilidad What Car? 2026",
      "extraValue": "98,7% (solo 8% incidencias menores)",
      "finalLabel": "Precio cerrado al contado",
      "finalValue": "17.900 €",
      "financeNote": "Financiación opcional disponible; precio al contado no condicionado"
    },
    "summary": "El primer gran \"Sweet Spot\" de la guía: 98,7% de fiabilidad demostrada en What Car?, solo 21.835 km certificados por 17.900 €, 4,17 m (tamaño ideal), 141 CV, postura elevada cómoda para tus padres y cuadro digital de 10,25\". Ahorras ~6.000–8.000 € respecto al techo de presupuesto.",
    "bestFor": "Máxima relación km/precio en formato crossover fiable sin gastar más de 18.000 €",
    "caution": "Garantía de 12 meses del vendedor (fuera de la garantía de fábrica original de 5 años por antigüedad) y maletero de 374 l.",
    "availability": "Unidad concreta disponible en concesionario multimarca Barcelona",
    "winner": "💎 El Gran Sweet Spot Calidad/Precio (17.900 € · 21k km)",
    "rank": 6,
    "tier": "S",
    "score": 8.9,
    "lengthM": "4,17 m",
    "trunkL": "374 l",
    "seats": 5,
    "warranty": "12 meses garantía legal vendedor",
    "pros": [
      "98,7% de fiabilidad What Car? (solo 8% de usuarios reportaron algún fallo menor)",
      "Solo 21.835 km reales por 17.900 € (relación km/precio imbatible)",
      "4,17 m de largo: medida perfecta para aparcar en Vallirana y Barcelona",
      "Carrocería crossover: altura de asiento perfecta para entrar y salir sin agacharse",
      "Cuadro de instrumentos digital de 10,25\" y cámara de marcha atrás"
    ],
    "cons": [
      "12 meses de garantía comercial del vendedor (no conserva la cobertura de fábrica de 5 años)",
      "Pantalla central táctil de 8\" de generación anterior (con CarPlay/Android Auto por cable)",
      "Caja automática DCT de doble embrague (requiere mantenimiento periódico)"
    ],
    "images": {
      "main": "assets/images/cars/hyundai-kona-hev-2021-used-main.jpg",
      "gallery": [
        "assets/images/cars/hyundai-kona-hev-2021-used-main.jpg",
        "assets/images/cars/hyundai-kona-hev-2021-used-gallery-1.jpg",
        "assets/images/cars/hyundai-kona-hev-2021-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "honda-jazz-crosstar-new",
    "name": "Honda Jazz Crosstar",
    "variant": "1.5 e:HEV Advance · Nuevo · Automático",
    "market": "new",
    "technology": "HEV",
    "year": 2026,
    "powerCv": 122,
    "batteryKwh": 1,
    "wltpKm": null,
    "cashPrice": 26750,
    "aidEstimate": 0,
    "netPriceMin": 26750,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.honda.es/cars/new/jazz-crosstar-advance-hybrid/specifications.html",
    "sourceLabel": "Honda España · Web Oficial Jazz Crosstar",
    "priceNote": "26.750 € PVP oficial al contado. Hasta 8 años de cobertura oficial (3 años de fábrica + 5 años activados por servicio anual).",
    "summary": "El coche con mejor ergonomía, visibilidad panorámica y facilidad de conducción para tus padres. Asientos Magic Seats, tapicería repelente al agua, 4,10 m y suavidad de marcha total.",
    "bestFor": "Estrenar coche nuevo con máxima visibilidad, accesibilidad para padres y longevidad",
    "caution": "Estética de monovolumen crossover muy sobria y maletero de 304 l.",
    "availability": "Red oficial Honda",
    "winner": "La mejor ergonomía & visibilidad (Magic Seats)",
    "rank": 7,
    "tier": "S",
    "score": 8.85,
    "lengthM": "4,10 m",
    "trunkL": "304 l",
    "seats": 5,
    "warranty": "Hasta 8 años / 160.000 km (3 años original + 5 años comercial activada mediante servicio oficial, según condiciones)",
    "pros": [
      "Visibilidad delantera insuperable gracias a los pilares A ultrafinos",
      "Asientos Magic Seats y tapicería hidrófuga fácil de limpiar",
      "4,10 m de largo con postura elevada: aparcamiento y acceso sencillísimos",
      "Sistema e:HEV muy suave y silencioso en ciclo urbano",
      "Hasta 8 años o 160.000 km de garantía oficial Honda"
    ],
    "cons": [
      "Estética exterior monovolumen crossover muy sobria y discreta",
      "Pantalla multimedia central de 9\" más modesta que la del Kona"
    ],
    "images": {
      "main": "assets/images/cars/honda-jazz-crosstar-new-main.jpg",
      "gallery": [
        "assets/images/cars/honda-jazz-crosstar-new-main.jpg",
        "assets/images/cars/honda-jazz-crosstar-new-gallery-1.jpg"
      ]
    }
  },
  {
    "id": "renault-4-etech-new",
    "name": "Renault 4 E-Tech",
    "variant": "Evolution 120 CV (40 kWh) / Techno 150 CV (52 kWh) · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 120,
    "batteryKwh": 40,
    "wltpKm": 300,
    "cashPrice": 27954,
    "aidEstimate": 0,
    "netPriceMin": 27954,
    "pretaxPrice": 23102,
    "aidEligible": true,
    "euAssembly": true,
    "euBattery": true,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.renault.es/electricos/r4-e-tech-electrico/medidas.html",
    "sourceLabel": "Renault España · Gama y Medidas Renault 4 E-Tech",
    "priceNote": "Tarifa Evolution 120 CV desde 27.954 € al contado (Techno 150 CV 52 kWh en 32.729 €). Con campañas/Auto+ Línea 2 se sitúa en el radar de 23–25k €.",
    "summary": "El concepto crossover eléctrico compacto ideal: 4,14 m, 5 plazas, 420 l de maletero, 181 mm de altura libre al suelo y umbral de carga bajo. Postura crossover elevada perfecta para entrar y salir con tus padres, con ecosistema OpenR Link con Google integrado.",
    "bestFor": "Formato crossover compacto eléctrico con altura perfecta para padres, 5 plazas y gran maletero",
    "caution": "Tarifa oficial al contado de salida por encima de 27k en acabado básico y 32,7k en Techno.",
    "winner": "🇫🇷 Mejor concepto crossover eléctrico compacto (4,14 m)",
    "rank": 8,
    "tier": "A",
    "score": 8.78,
    "lengthM": "4,14 m",
    "trunkL": "420 l",
    "seats": 5,
    "warranty": "3 años general / 8 años (160.000 km) batería",
    "pros": [
      "Medida ideal para garaje y Barcelona (4,14 m)",
      "Carrocería crossover con 181 mm de altura libre: acceso óptimo para tus padres",
      "420 l de maletero con boca de carga muy baja y 5 plazas reales",
      "Plataforma AmpR Small muy ágil y confortable"
    ],
    "cons": [
      "PVP oficial de partida al contado (27.954 € Evolution) rozando el límite de presupuesto",
      "El acabado Techno con 52 kWh y Google se va a 32.729 € sin ayudas"
    ],
    "images": {
      "main": "assets/images/cars/renault-4-etech-new-main.jpg",
      "gallery": [
        "assets/images/cars/renault-4-etech-new-main.jpg",
        "assets/images/cars/renault-4-etech-new-gallery-1.jpg",
        "assets/images/cars/renault-4-etech-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "nissan-micra-ev-new",
    "name": "Nissan Micra EV",
    "variant": "N-Connecta · 120/150 CV · 40/52 kWh · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 120,
    "batteryKwh": 40,
    "wltpKm": 314,
    "cashPrice": 23000,
    "aidEstimate": 0,
    "netPriceMin": 23000,
    "pretaxPrice": 19008,
    "aidEligible": true,
    "euAssembly": true,
    "euBattery": true,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.nissan.es/comprar/venta-de-coches/micra",
    "sourceLabel": "Nissan España · Tienda Online Stock Micra EV (20.600–23.000 €)",
    "priceNote": "Stock oficial Nissan España al contado: Acenta (317 km) en 20.600 €, N-Connecta (314 km) en 23.000 € y N-Connecta (415 km) en 25.650–26.250 €. Cobertura Nissan+ hasta 10 años / 200.000 km en condiciones de uso particular (confirmar compatibilidad si se vincula a actividad económica/Auto+ Línea 2).",
    "summary": "La alternativa eléctrica más fuerte por 23.000 € al contado: 3,97 m, 5 puertas y 5 plazas, 326 l de maletero, pantalla de 10,1\" con Google integrado (Maps y Assistant), gran suavidad y garantía Nissan+ hasta 10 años.",
    "bestFor": "Eléctrico urbano equilibrado con 5 plazas, Google y cobertura Nissan+ hasta 10 años",
    "caution": "Postura de turismo convencional (3,97 m): acceso más bajo para tus padres que en un SUV. ⚠️ Nissan+: hasta 10 años / 200.000 km para uso particular según condiciones. Confirmar compatibilidad si la compra se vincula a actividad económica o se tramita mediante Línea 2.",
    "winner": "🛡️ Mejor garantía eléctrica urbana (Nissan+ 10 años)",
    "rank": 9,
    "tier": "A",
    "score": 8.72,
    "lengthM": "3,97 m",
    "trunkL": "326 l",
    "seats": 5,
    "warranty": "Nissan+ hasta 10 años / 200.000 km para uso particular según condiciones (8 años batería)",
    "pros": [
      "Precios de stock oficial al contado muy competitivos (N-Connecta a 23.000 €)",
      "Garantía Nissan+ extensible hasta 10 años o 200.000 km con revisiones oficiales (uso particular)",
      "Tamaño compacto ideal de 3,97 m con 5 puertas y 5 plazas",
      "Sistema multimedia avanzado con Google integrado y cámara"
    ],
    "cons": [
      "Altura y acceso más bajo que en Yaris Cross o Kona (menos cómodo para padres mayores)",
      "Nissan+ exige uso particular (confirmar compatibilidad si se tramita con actividad de autónomo)"
    ],
    "images": {
      "main": "assets/images/cars/nissan-micra-ev-new-main.jpg",
      "gallery": [
        "assets/images/cars/nissan-micra-ev-new-main.jpg",
        "assets/images/cars/nissan-micra-ev-new-gallery-1.jpg",
        "assets/images/cars/nissan-micra-ev-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "renault-5-techno-new",
    "name": "Renault 5 E-Tech",
    "variant": "Techno · 40 kWh · 120 CV (Google integrado + One Pedal)",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 120,
    "batteryKwh": 40,
    "wltpKm": 312,
    "cashPrice": 27954,
    "aidEstimate": 0,
    "netPriceMin": 27954,
    "pretaxPrice": 23102,
    "aidEligible": true,
    "euAssembly": true,
    "euBattery": true,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.renault.es/electricos/r5-e-tech-electrico.html",
    "sourceLabel": "Renault España · Gama Oficial R5 E-Tech",
    "priceNote": "27.954 € PVP tarifa al contado. Como autónomo, potencialmente elegible para hasta 6.000 € en Línea 2 Auto+ según RD 609/2026 (pendiente de convocatoria correspondiente; no descontada del precio). OpenR Link 10,1\" con Google nativo.",
    "summary": "El coche más bonito y moderno para tus 27 años: 3,92 m, 5 plazas, pantalla OpenR Link de 10,1\" con Google integrado, cuadro digital, One Pedal y chasis sobresaliente.",
    "bestFor": "Diseño espectacular, tecnología Google integrada y disfrute personal",
    "caution": "27.954 € tarifa antes de tramitar Línea 2 de autónomos y modelo recién lanzado.",
    "availability": "Pedidos oficiales 2026",
    "winner": "El más bonito y tecnológico (Google nativo)",
    "rank": 10,
    "tier": "A",
    "score": 8.7,
    "lengthM": "3,92 m",
    "trunkL": "326 l",
    "seats": 5,
    "warranty": "3 años general / 8 años (160.000 km) batería",
    "pros": [
      "El diseño más icónico, atractivo y juvenil de todo el mercado",
      "Pantalla OpenR Link 10,1\" con Google Automotive nativo y Maps integrado",
      "5 plazas en solo 3,92 m con tacto de conducción ágil (AmpR Small) y One Pedal"
    ],
    "cons": [
      "PVP oficial de 27.954 € al contado (Línea 2 requiere solicitud de autónomo)",
      "Modelo recién llegado sin historial estadístico de longevidad a 10 años"
    ],
    "images": {
      "main": "assets/images/cars/renault-5-techno-new-main.jpg",
      "gallery": [
        "assets/images/cars/renault-5-techno-new-main.jpg",
        "assets/images/cars/renault-5-techno-new-gallery-1.jpg",
        "assets/images/cars/renault-5-techno-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "mg4-urban-2026-new",
    "name": "MG4 Urban",
    "variant": "Comfort 43 kWh LFP · 170 CV · Bomba calor · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 170,
    "batteryKwh": 42.8,
    "wltpKm": 325,
    "cashPrice": 25490,
    "aidEstimate": 0,
    "netPriceMin": 25490,
    "pretaxPrice": 21066,
    "aidEligible": true,
    "euAssembly": false,
    "euBattery": false,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://news.mgmotor.eu/es/press/precio-mg4-urban/",
    "sourceLabel": "MG Motor Europe · Tarifa Oficial MG4 Urban 2026",
    "priceNote": "Tarifa oficial Comfort 43 kWh LFP desde 25.490 € al contado (sin descuentos condicionados a financiación). 7 años de garantía oficial.",
    "summary": "La gran renovación del compacto eléctrico: 4,40 m, batería LFP de 42,8 kWh (325 km WLTP), bomba de calor de serie, pantalla central de 12,8\" con Apple CarPlay/Android Auto inalámbrico, hasta 577 l de maletero (incluyendo 98 l bajo el piso) y 7 años de garantía oficial.",
    "bestFor": "Máximo equipamiento de serie, bomba de calor, maletero enorme y 7 años de garantía a precio cerrado",
    "caution": "Mide 4,40 m (ligeramente por encima de los 4,20 m ideales) y plataforma de nueva hornada.",
    "winner": "📦 Mejor relación equipamiento/maletero eléctrico (577 l · Bomba calor)",
    "rank": 11,
    "tier": "A",
    "score": 8.65,
    "lengthM": "4,40 m",
    "trunkL": "577 l (incl. 98 l bajo piso)",
    "seats": 5,
    "warranty": "7 años / 150.000 km oficial MG",
    "pros": [
      "Bomba de calor de serie y batería LFP de alta durabilidad",
      "Pantalla central de 12,8\" con conectividad inalámbrica moderna",
      "Hasta 577 l de maletero total (479 l principales + 98 l bajo piso) y 5 plazas muy amplias",
      "7 años o 150.000 km de garantía de fábrica"
    ],
    "cons": [
      "Longitud de 4,40 m (+22 cm que Yaris Cross, límite superior de maniobra en garaje)",
      "Red de servicio en consolidación comparada con marcas tradicionales japonesas"
    ],
    "images": {
      "main": "assets/images/cars/mg4-urban-2026-new-main.jpg",
      "gallery": [
        "assets/images/cars/mg4-urban-2026-new-main.jpg",
        "assets/images/cars/mg4-urban-2026-new-gallery-1.jpg",
        "assets/images/cars/mg4-urban-2026-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "toyota-yaris-120h-used",
    "name": "Toyota Yaris 120H VO",
    "variant": "1.5 120H Style / Active Tech · 2021–2022",
    "market": "used",
    "technology": "HEV",
    "year": 2022,
    "powerCv": 116,
    "batteryKwh": 0.8,
    "wltpKm": null,
    "priceRange": [
      16850,
      17090
    ],
    "aidEstimate": 0,
    "netPriceMin": 16850,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/toyota/yaris/hibrido/segunda-mano/barcelona/?MinYear=2021",
    "sourceLabel": "Coches.net · Yaris 120H Ocasión Barcelona",
    "priceNote": "Unidades 120H Style 2021-2022 (50–57k km) observadas en Barcelona entre 16.850 € y 17.090 € con Toyota Relax.",
    "summary": "El utilitario híbrido moderno más sensato por ~17.000 €: 116 CV, e-CVT de 4ª gen, 3,94 m, 5 puertas, consumo de 3,8 l/100 km y Toyota Relax hasta 15 años.",
    "bestFor": "Máxima fiabilidad y mínimo consumo en formato utilitario por ~17.000 €",
    "caution": "Postura de conducción baja para personas mayores frente a los SUV.",
    "availability": "Stock frecuente en Barcelona",
    "winner": "Mejor utilitario contrastado (~17.000 €)",
    "rank": 12,
    "tier": "A",
    "score": 8.55,
    "lengthM": "3,94 m",
    "trunkL": "286 l",
    "seats": 5,
    "warranty": "Hasta 15 años / 250.000 km (Toyota Relax)",
    "pros": [
      "Ahorro de ~4.500 € frente a comprarlo nuevo",
      "Garantía oficial Toyota Relax hasta 15 años",
      "Consumo real ridículo (~3,8–4,2 l/100 km)",
      "Mecánica e-CVT sin embrague ni turbo"
    ],
    "cons": [
      "Carrocería baja: tus padres entrarán menos cómodos que en un SUV",
      "Maletero de 286 l suficiente pero no amplio"
    ],
    "images": {
      "main": "assets/images/cars/toyota-yaris-120h-used-main.jpg",
      "gallery": [
        "assets/images/cars/toyota-yaris-120h-used-main.jpg",
        "assets/images/cars/toyota-yaris-120h-used-gallery-1.jpg"
      ]
    }
  },
  {
    "id": "mazda-3-skyactivx-used",
    "name": "Mazda 3 e-Skyactiv-X Homura",
    "variant": "2.0 e-Skyactiv-X 186 CV Homura · Automático 6v · 2023",
    "market": "used",
    "technology": "HEV",
    "year": 2023,
    "powerCv": 186,
    "batteryKwh": null,
    "wltpKm": null,
    "priceRange": [
      22000,
      23500
    ],
    "aidEstimate": 0,
    "netPriceMin": 22000,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.autocasion.com/compactos-segunda-mano/mazda-mazda3-ocasion/barcelona/gasolina/cambio-automatic",
    "sourceLabel": "AutoCasión · Mazda 3 Homura Automático 2023 Barcelona (22.600 €)",
    "priceNote": "Unidades Homura Automático 2023 (186 CV e-Skyactiv-X) observadas en Barcelona por 22.600 € al contado con garantía oficial Mazda hasta 6 años.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "22.000 € – 23.500 €",
      "aidLabel": "Garantía oficial Mazda",
      "aidValue": "Hasta 6 años o 150.000 km de origen",
      "extraLabel": "Equipamiento Homura",
      "extraValue": "186 CV + Cambio automático de convertidor + Head-up display + Acabado negro brillante",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "22.000 € – 23.500 €",
      "financeNote": "Financiación VO habitual desde ~230 €/mes"
    },
    "summary": "El compacto con mejor diseño y calidad de acabados interiores por debajo de 23.000 €: motor 2.0 atmosférico de combustión por compresión (SPCCI) con 186 CV, cambio automático clásico suave y tacto premium. Penaliza en espacio trasero y baja altura para tus padres.",
    "bestFor": "Amantes del diseño refinado, acabados interiores de nivel premium y motor atmosférico con cambio automático tradicional",
    "caution": "Pilar C muy grueso que reduce la visibilidad posterior y plazas traseras algo oscuras y justas de acceso.",
    "availability": "Unidades disponibles en concesionarios Mazda y multimarca en Cataluña",
    "winner": "🎨 Mejor calidad de acabado interior y diseño por <23k",
    "verdict": null,
    "rank": 13,
    "tier": "A",
    "score": 8.55,
    "lengthM": "4,46 m",
    "trunkL": "358 l",
    "seats": 5,
    "warranty": "6 años o 150.000 km oficiales Mazda",
    "pros": [
      "Calidad de materiales y ajustes interiores a la altura de marcas premium alemanas",
      "Motor 2.0 e-Skyactiv-X 186 CV atmosférico muy progresivo y silencioso",
      "Cambio automático de 6 marchas por convertidor de par sin variador ni tirones",
      "Etiqueta ECO mediante microhibridación MHEV de 24 V",
      "Postura de conducción excepcionalmente ergonómica"
    ],
    "cons": [
      "Carrocería baja y puertas traseras con vano reducido (difícil para personas mayores)",
      "Longitud generosa de 4,46 m con maletero comedido de 358 l",
      "Consumo en ciudad algo mayor que los híbridos puros de Toyota y Honda"
    ],
    "images": {
      "main": "assets/images/cars/mazda-3-skyactivx-used-main.jpg",
      "gallery": [
        "assets/images/cars/mazda-3-skyactivx-used-main.jpg",
        "assets/images/cars/mazda-3-skyactivx-used-gallery-1.jpg",
        "assets/images/cars/mazda-3-skyactivx-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "hyundai-inster-new",
    "name": "Hyundai Inster",
    "variant": "Maxx · 42 kWh · 97 CV (327 km WLTP)",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 97,
    "batteryKwh": 42,
    "wltpKm": 327,
    "cashPrice": 24900,
    "aidEstimate": 0,
    "netPriceMin": 24900,
    "pretaxPrice": 20578,
    "aidEligible": true,
    "euAssembly": false,
    "euBattery": false,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.hyundai.com/es/es/modelos/inster.html",
    "sourceLabel": "Hyundai España · Gama Oficial Inster",
    "priceNote": "24.900 € PVP al contado con promociones directas. Como autónomo, potencialmente elegible para Línea 2 Auto+ (hasta 4.500 € al fabricarse fuera de la UE; pendiente de convocatoria).",
    "summary": "El rey de la ergonomía para tus padres: 3,83 m, suelo plano, posición elevada, asientos deslizantes (maletero 238–351 l) y 5 años de garantía total sin límite de km.",
    "bestFor": "Facilidad de acceso para padres y maniobras en huecos diminutos",
    "caution": "Homologado para 4 plazas (no 5) y modelo sin historial a largo plazo.",
    "availability": "Disponible en concesionarios Hyundai",
    "winner": "El más fácil de manejar (Modular · 4 plazas)",
    "rank": 14,
    "tier": "A",
    "score": 8.5,
    "lengthM": "3,83 m",
    "trunkL": "238 – 351 l",
    "seats": 4,
    "warranty": "5 años sin límite km / 8 años (160.000 km) batería",
    "pros": [
      "3,83 m con suelo plano y postura alta: visibilidad y acceso inmejorables para padres",
      "Asientos traseros deslizantes 16 cm para pasar de 238 a 351 l de maletero",
      "Función V2L bidireccional y 5 años de garantía total sin límite de km"
    ],
    "cons": [
      "⚠️ Homologado para 4 plazas (no 5)",
      "Estética exterior crossover peculiar que conviene ver en persona"
    ],
    "images": {
      "main": "assets/images/cars/hyundai-inster-new-main.jpg",
      "gallery": [
        "assets/images/cars/hyundai-inster-new-main.jpg",
        "assets/images/cars/hyundai-inster-new-gallery-1.jpg",
        "assets/images/cars/hyundai-inster-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "toyota-yaris-hybrid-new",
    "name": "Toyota Yaris Hybrid Nuevo",
    "variant": "Hybrid 120 · Automático e-CVT · 5 puertas · 2026",
    "market": "new",
    "technology": "HEV",
    "year": 2026,
    "powerCv": 116,
    "batteryKwh": 0.8,
    "wltpKm": null,
    "cashPrice": 21500,
    "aidEstimate": 0,
    "netPriceMin": 21500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.toyota.es/coches/yaris",
    "sourceLabel": "Toyota España · Oferta Oficial Yaris",
    "priceNote": "21.500 € al contado oficial. Cobertura Toyota Relax hasta 15 años o 250.000 km.",
    "summary": "Mecánica e-CVT muy contrastada y de elevada fiabilidad en carrocería utilitaria baja de 3,94 m.",
    "bestFor": "Gastar lo mínimo en un híbrido fiable nuevo (postura baja)",
    "caution": "Acceso más bajo para tus padres que en el Yaris Cross.",
    "availability": "Concesionarios Toyota",
    "winner": "El utilitario híbrido más fiable",
    "rank": 15,
    "tier": "A",
    "score": 8.45,
    "lengthM": "3,94 m",
    "trunkL": "286 l",
    "seats": 5,
    "warranty": "Hasta 15 años / 250.000 km (Toyota Relax)",
    "pros": [
      "Estrenar coche nuevo por 21.500 € con Toyota Relax hasta 15 años",
      "Consumo real bajísimo de ~3,8–4,2 l/100 km en ciudad",
      "Mecánica e-CVT sin embrague ni turbo"
    ],
    "cons": [
      "Carrocería baja (acceso menos cómodo para padres que el Yaris Cross)",
      "Pantallas e infoentretenimiento más sencillos"
    ],
    "images": {
      "main": "assets/images/cars/toyota-yaris-hybrid-new-main.jpg",
      "gallery": [
        "assets/images/cars/toyota-yaris-hybrid-new-main.jpg",
        "assets/images/cars/toyota-yaris-hybrid-new-gallery-1.jpg",
        "assets/images/cars/toyota-yaris-hybrid-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "cupra-leon-15-etsi-used",
    "name": "CUPRA León eTSI DSG",
    "variant": "1.5 eTSI 150 CV DSG 7v · MHEV ECO · 2023",
    "market": "used",
    "technology": "HEV",
    "year": 2023,
    "powerCv": 150,
    "batteryKwh": null,
    "wltpKm": null,
    "priceRange": [
      23500,
      24900
    ],
    "aidEstimate": 0,
    "netPriceMin": 23500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/cupra-leon-15-etsi-110kw-150cv-dsg-5p-electrico-hibrido-2024-en-barcelona-70783707-covo.aspx",
    "sourceLabel": "Coches.net · CUPRA León 1.5 eTSI DSG 2023 Barcelona (23.900 €)",
    "priceNote": "Unidades 1.5 eTSI 150 CV DSG con ~34.000 km observadas en Barcelona por 23.900 € al contado con etiqueta ECO y garantía de hasta 5 años de origen.",
    "breakdown": {
      "initialLabel": "PVP al contado mercado VO BCN",
      "initialValue": "23.500 € – 24.900 €",
      "aidLabel": "Garantía oficial",
      "aidValue": "Hasta 5 años oficial CUPRA (según unidad)",
      "extraLabel": "Equipamiento",
      "extraValue": "150 CV + Cambio DSG 7v + Faros Full LED + Pantalla 12\" + Cuadro digital",
      "finalLabel": "Precio real compra al contado",
      "finalValue": "23.500 € – 24.900 €",
      "financeNote": "Financiación habitual desde ~245 €/mes"
    },
    "summary": "Imagen deportiva atractiva, chasis muy ágil y tecnología digital de última generación: motor 1.5 turbo con microhibridación de 48V, cambio DSG rápido y maletero de 380 l. Frente a Toyota, su mecánica con turbo y doble embrague requiere mayor atención de mantenimiento a 10-15 años.",
    "bestFor": "Quien busca imagen agresiva, tacto deportivo moderno y amplio maletero en formato compacto",
    "caution": "Caja DSG y sistema eléctrico de 48 V más complejos a largo plazo (10-15 años) que el sistema híbrido atmosférico e-CVT.",
    "availability": "Amplio stock en la red oficial SEAT/CUPRA Ocasión Barcelona",
    "winner": "⚡ Compacto con estética más agresiva y cambio DSG",
    "verdict": null,
    "rank": 16,
    "tier": "A",
    "score": 8.4,
    "lengthM": "4,40 m",
    "trunkL": "380 l",
    "seats": 5,
    "warranty": "Hasta 5 años oficial CUPRA de origen",
    "pros": [
      "Diseño exterior e interior llamativo y muy diferenciado con detalles en cobre",
      "Chasis muy eficaz y divertido en tramos de curvas",
      "Cambio automático DSG de 7 relaciones muy rápido en carretera",
      "Maletero amplio de 380 l y buen espacio longitudinal en plazas traseras",
      "Etiqueta ECO mediante sistema microhíbrido eTSI de 48 V"
    ],
    "cons": [
      "Postura de conducción baja que resta comodidad de entrada/salida para tus padres",
      "Mandos táctiles del climatizador sin retroiluminación en las primeras unidades",
      "Mecánica 1.5 Turbo + embragues secos DSG con mayor riesgo de costes de mantenimiento a >10 años"
    ],
    "images": {
      "main": "assets/images/cars/cupra-leon-15-etsi-used-main.jpg",
      "gallery": [
        "assets/images/cars/cupra-leon-15-etsi-used-main.jpg",
        "assets/images/cars/cupra-leon-15-etsi-used-gallery-1.jpg",
        "assets/images/cars/cupra-leon-15-etsi-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "kia-niro-hev-used",
    "name": "Kia Niro HEV",
    "variant": "1.6 GDi HEV Drive · 141 CV · DCT 6v · 2023",
    "market": "used",
    "technology": "HEV",
    "year": 2023,
    "powerCv": 141,
    "batteryKwh": 1.32,
    "wltpKm": null,
    "priceRange": [
      22500,
      24990
    ],
    "aidEstimate": 0,
    "netPriceMin": 22500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/kia/niro/hibrido/segunda-mano/barcelona/?MinYear=2022",
    "sourceLabel": "Coches.net · Kia Niro HEV Ocasión Barcelona",
    "priceNote": "Unidades de 2023 con 26.000 km observadas en Barcelona entre 22.500 € y 24.990 €.",
    "summary": "Doble pantalla de 10,25\", asientos muy confortables, 7 años de garantía oficial Kia y mecánica híbrida eficiente.",
    "bestFor": "Amplitud de rodadura y confort de crucero",
    "caution": "Mide 4,42 m (ya algo grande para el uso diario en Vallirana/BCN).",
    "availability": "Oferta frecuente en Barcelona",
    "winner": "Gran habitabilidad y 7 años de garantía",
    "rank": 17,
    "tier": "B",
    "score": 8.35,
    "lengthM": "4,42 m",
    "trunkL": "451 l",
    "seats": 5,
    "warranty": "7 años / 150.000 km de fábrica",
    "pros": [
      "Doble pantalla de 10,25\" y gran calidad de rodadura en carretera",
      "7 años de garantía oficial Kia transferible",
      "Amplitud de maletero (451 l) y confort de asientos"
    ],
    "cons": [
      "Mide 4,42 m (el más voluminoso para calles estrechas y garajes justos)"
    ],
    "images": {
      "main": "assets/images/cars/kia-niro-hev-used-main.jpg",
      "gallery": [
        "assets/images/cars/kia-niro-hev-used-main.jpg",
        "assets/images/cars/kia-niro-hev-used-gallery-1.jpg",
        "assets/images/cars/kia-niro-hev-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "kia-eniro-64-used",
    "name": "Kia e-Niro",
    "variant": "Long Range · 64 kWh · 204 CV · 2021–2022",
    "market": "used",
    "technology": "BEV",
    "year": 2022,
    "powerCv": 204,
    "batteryKwh": 64,
    "wltpKm": 455,
    "priceRange": [
      19000,
      21500
    ],
    "aidEstimate": 0,
    "netPriceMin": 19000,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/kia/eniro/electrico/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · Kia e-Niro Eléctrico Barcelona",
    "priceNote": "Unidades Long Range 64 kWh entre 19.000 € y 21.500 € al contado.",
    "summary": "94,4% de fiabilidad What Car?, 7 años de garantía oficial Kia y 455 km WLTP.",
    "bestFor": "Eléctrico fiable para viajar (batería grande para pocos km diarios)",
    "caution": "Mide 4,38 m.",
    "availability": "Stock en concesionarios VO",
    "winner": "Mejor BEV en fiabilidad demostrada",
    "rank": 18,
    "tier": "B",
    "score": 8.2,
    "lengthM": "4,38 m",
    "trunkL": "451 l",
    "seats": 5,
    "warranty": "7 años / 150.000 km oficial Kia",
    "pros": [
      "94,4% de fiabilidad en encuestas What Car? (Top 5 entre 25 eléctricos)",
      "455 km WLTP y 451 l de maletero sin mantenimiento térmico"
    ],
    "cons": [
      "Mide 4,38 m y batería de 64 kWh sobredimensionada para 3.000 km/año"
    ],
    "images": {
      "main": "assets/images/cars/kia-eniro-64-used-main.jpg",
      "gallery": [
        "assets/images/cars/kia-eniro-64-used-main.jpg",
        "assets/images/cars/kia-eniro-64-used-gallery-1.jpg",
        "assets/images/cars/kia-eniro-64-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "hyundai-kona-64-used",
    "name": "Hyundai Kona EV",
    "variant": "Tecno / Style · 64 kWh · 204 CV · 2020–2022",
    "market": "used",
    "technology": "BEV",
    "year": 2021,
    "powerCv": 204,
    "batteryKwh": 64,
    "wltpKm": 484,
    "priceRange": [
      17500,
      19500
    ],
    "aidEstimate": 0,
    "netPriceMin": 17500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/hyundai/kona/electrico/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · Hyundai Kona Eléctrico Barcelona",
    "priceNote": "Unidades de 64 kWh entre 17.500 € y 19.500 € al contado.",
    "summary": "Plataforma probada desde 2018: 91,1% fiabilidad What Car?, 64 kWh de batería.",
    "bestFor": "Autonomía eléctrica por debajo de 20.000 €",
    "caution": "Batería de 64 kWh sobredimensionada para trayectos cortos.",
    "availability": "Stock abundante en ocasión",
    "winner": "Autonomía para viajar (64 kWh)",
    "rank": 19,
    "tier": "B",
    "score": 8.1,
    "lengthM": "4,18 m",
    "trunkL": "332 l",
    "seats": 5,
    "warranty": "5 años sin límite km / 8 años batería",
    "pros": [
      "Plataforma probada desde 2018 con 91,1% de fiabilidad",
      "Batería grande de 64 kWh con ~390 km reales combinados",
      "Precio ajustado entre 17.500 € y 19.500 €"
    ],
    "cons": [
      "Diseño e infoentretenimiento de anterior generación frente al Kona 2024",
      "Batería sobredimensionada para hacer recados locales"
    ],
    "images": {
      "main": "assets/images/cars/hyundai-kona-64-used-main.jpg",
      "gallery": [
        "assets/images/cars/hyundai-kona-64-used-main.jpg",
        "assets/images/cars/hyundai-kona-64-used-gallery-1.jpg",
        "assets/images/cars/hyundai-kona-64-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "citroen-ec3-44-new",
    "name": "Citroën ë-C3",
    "variant": "Max / Plus Comfort Range · 44 kWh LFP",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 113,
    "batteryKwh": 44,
    "wltpKm": 322,
    "cashPrice": 20500,
    "aidEstimate": 0,
    "netPriceMin": 20500,
    "pretaxPrice": 16942,
    "aidEligible": true,
    "euAssembly": true,
    "euBattery": true,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.citroen.es/vehiculos-citroen/e-c3.html",
    "sourceLabel": "Citroën España · Gama Oficial ë-C3",
    "priceNote": "20.500 € PVP al contado sin subvenciones. Como autónomo, potencialmente elegible para hasta 6.000 € en Línea 2 Auto+ (pendiente de convocatoria).",
    "summary": "Suspensión y asientos muy confortables para baches, pero con acabados y construcción deliberadamente sencillos.",
    "bestFor": "Confort de marcha al menor precio de compra",
    "caution": "Materiales interiores y construcción low-cost frente a Toyota/Honda.",
    "availability": "Ofertas oficiales activas",
    "winner": "Compra económica de confort",
    "rank": 20,
    "tier": "B",
    "score": 8,
    "lengthM": "4,01 m",
    "trunkL": "310 l",
    "seats": 5,
    "warranty": "3 años general / 8 años (160.000 km) batería",
    "pros": [
      "Suspensión y asientos Advanced Comfort muy mullidos para baches y badenes",
      "5 plazas reales y precio al contado accesible"
    ],
    "cons": [
      "Materiales interiores y ajustes deliberadamente low-cost",
      "Menor sensación de solidez a largo plazo frente a japoneses"
    ],
    "images": {
      "main": "assets/images/cars/citroen-ec3-44-new-main.jpg",
      "gallery": [
        "assets/images/cars/citroen-ec3-44-new-main.jpg",
        "assets/images/cars/citroen-ec3-44-new-gallery-1.jpg",
        "assets/images/cars/citroen-ec3-44-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "renault-twingo-techno-new",
    "name": "Renault Twingo E-Tech",
    "variant": "Techno · 27,5 kWh · 81 CV (5 puertas · 4 plazas)",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 81,
    "batteryKwh": 27.5,
    "wltpKm": 263,
    "cashPrice": 18959,
    "aidEstimate": 0,
    "netPriceMin": 18959,
    "pretaxPrice": 15668,
    "aidEligible": true,
    "euAssembly": true,
    "euBattery": false,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.renault.es/electricos/twingo-e-tech-electrico.html",
    "sourceLabel": "Renault España · Gama Oficial Twingo",
    "priceNote": "18.959 € PVP al contado en acabado Techno. Como autónomo, potencialmente elegible para hasta 5.400 € en Línea 2 Auto+ (pendiente de convocatoria).",
    "summary": "Google integrado, cámara trasera, Stop&Go y One Pedal en 3,79 m.",
    "bestFor": "Aparcamiento en huecos diminutos y recados locales",
    "caution": "4 plazas homologadas y batería de 27,5 kWh.",
    "availability": "Gama oficial activa",
    "winner": "El más compacto para recados (4 plazas)",
    "rank": 21,
    "tier": "C",
    "score": 7.8,
    "lengthM": "3,79 m",
    "trunkL": "219 l",
    "seats": 4,
    "warranty": "3 años general / 8 años batería",
    "pros": [
      "3,79 m con radio de giro récord: maniobrabilidad insuperable",
      "Google integrado, cámara trasera, Stop&Go y One Pedal por <19k"
    ],
    "cons": [
      "⚠️ Homologado para 4 plazas (no 5)",
      "Batería de 27,5 kWh enfocada a uso estrictamente local"
    ],
    "images": {
      "main": "assets/images/cars/renault-twingo-techno-new-main.jpg",
      "gallery": [
        "assets/images/cars/renault-twingo-techno-new-main.jpg",
        "assets/images/cars/renault-twingo-techno-new-gallery-1.jpg",
        "assets/images/cars/renault-twingo-techno-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "cupra-born-58-used",
    "name": "Cupra Born",
    "variant": "58 kWh (204 CV / 231 CV e-Boost) · 2021–2023",
    "market": "used",
    "technology": "BEV",
    "year": 2022,
    "powerCv": 204,
    "batteryKwh": 58,
    "wltpKm": 424,
    "priceRange": [
      19500,
      21000
    ],
    "aidEstimate": 0,
    "netPriceMin": 19500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/cupra/born/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · Cupra Born Ocasión Barcelona",
    "priceNote": "Unidades entre 19.500 € y 21.000 € al contado.",
    "summary": "Propulsión trasera (204/231 CV), chasis firme y asientos semibaquet.",
    "bestFor": "Conducción puramente deportiva",
    "caution": "Acceso más bajo y suspensión más firme.",
    "availability": "Mercado de ocasión activo",
    "winner": "Prestaciones deportivas (conductor único)",
    "rank": 22,
    "tier": "C",
    "score": 7.7,
    "lengthM": "4,32 m",
    "trunkL": "385 l",
    "seats": 5,
    "warranty": "3 años general / 8 años batería",
    "pros": [
      "Propulsión trasera (204/231 CV), chasis firme y estética prémium",
      "Gran dinamismo y tacto en curva"
    ],
    "cons": [
      "Acceso bajo y suspensión firme poco adecuada para tus padres",
      "Software de pantalla MEB requiere verificar versión 3.0+"
    ],
    "images": {
      "main": "assets/images/cars/cupra-born-58-used-main.jpg",
      "gallery": [
        "assets/images/cars/cupra-born-58-used-main.jpg",
        "assets/images/cars/cupra-born-58-used-gallery-1.jpg",
        "assets/images/cars/cupra-born-58-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "byd-dolphin-surf-new",
    "name": "BYD Dolphin Surf",
    "variant": "Comfort · 43,2 kWh Blade LFP · 156 CV",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 156,
    "batteryKwh": 43.2,
    "wltpKm": 310,
    "financePrice": 21905,
    "netPriceMin": 21905,
    "conditional": true,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.byd.com/es-es/coches-electricos/dolphin-surf",
    "sourceLabel": "BYD España · Gama Oficial Dolphin Surf",
    "priceNote": "Anunciado en oferta oficial financiada a 21.905 € con campañas de marca.",
    "summary": "156 CV, batería Blade LFP de 43,2 kWh, 310 km WLTP y garantía de batería de 8 años o 250.000 km.",
    "bestFor": "Garantía líder de batería de 8 años / 250.000 km",
    "caution": "Red y posventa menos contrastadas a largo plazo.",
    "availability": "Concesionarios oficiales BYD",
    "winner": "Garantía 8 años / 250.000 km",
    "rank": 23,
    "tier": "C",
    "score": 7.5,
    "lengthM": "3,99 m",
    "trunkL": "308 l",
    "seats": 5,
    "warranty": "8 años / 250.000 km de batería",
    "pros": [
      "Batería Blade LFP estructural con garantía de 8 años o 250.000 km",
      "156 CV de potencia y buen equipamiento de serie"
    ],
    "cons": [
      "Red de posventa y valor de reventa a 10 años menos contrastados",
      "Diseño interior con pantalla giratoria peculiar"
    ],
    "images": {
      "main": "assets/images/cars/byd-dolphin-surf-new-main.jpg",
      "gallery": [
        "assets/images/cars/byd-dolphin-surf-new-main.jpg",
        "assets/images/cars/byd-dolphin-surf-new-gallery-1.jpg",
        "assets/images/cars/byd-dolphin-surf-new-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "mg4-51-used",
    "name": "MG4 Electric VO",
    "variant": "Standard 51 kWh LFP / Comfort 64 kWh · 2022–2024",
    "market": "used",
    "technology": "BEV",
    "year": 2023,
    "powerCv": 170,
    "batteryKwh": 51,
    "wltpKm": 350,
    "priceRange": [
      16500,
      19800
    ],
    "aidEstimate": 0,
    "netPriceMin": 16500,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://www.coches.net/mg/mg4/electrico/segunda-mano/barcelona/",
    "sourceLabel": "Coches.net · MG4 Eléctricos Ocasión Barcelona",
    "priceNote": "Banda observada entre 16.500 € y 19.800 € al contado en unidades 2022–2024.",
    "summary": "Alternativa de ocasión muy barata: propulsión trasera de 170 CV y 7 años de garantía oficial transferible.",
    "bestFor": "Comprar un eléctrico moderno de ocasión por menos de 18.000 €",
    "caution": "Calidades interiores y posventa un escalón por debajo del nuevo MG4 Urban 2026.",
    "availability": "Stock abundante en Km0 y VO",
    "winner": "Eléctrico de ocasión más barato (16–18k)",
    "rank": 24,
    "tier": "C",
    "score": 7.3,
    "lengthM": "4,29 m",
    "trunkL": "363 l",
    "seats": 5,
    "warranty": "7 años / 150.000 km de fábrica",
    "pros": [
      "Propulsión trasera de 170 CV y 7 años de garantía oficial transferible",
      "Precio de compraventa muy asequible en ocasión (16,5k–19,8k €)"
    ],
    "cons": [
      "Ajustes interiores y tacto de pedal de freno mejorables",
      "Superado claramente por el nuevo MG4 Urban 2026"
    ],
    "images": {
      "main": "assets/images/cars/mg4-51-used-main.jpg",
      "gallery": [
        "assets/images/cars/mg4-51-used-main.jpg",
        "assets/images/cars/mg4-51-used-gallery-1.jpg",
        "assets/images/cars/mg4-51-used-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "dacia-spring-new",
    "name": "Dacia Spring",
    "variant": "Expression electric 70",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 70,
    "batteryKwh": 26.8,
    "wltpKm": 225,
    "cashPrice": 17045,
    "aidEstimate": 0,
    "netPriceMin": 17045,
    "pretaxPrice": 14087,
    "aidEligible": true,
    "euAssembly": false,
    "euBattery": false,
    "evidence": "verified",
    "verifiedAt": "2026-08-28",
    "sourceUrl": "https://ofertas.dacia.es/particulares/spring/?noajax=true",
    "sourceLabel": "Dacia España · Condiciones Oficiales Spring",
    "priceNote": "17.045 € PVP al contado sin ayudas. Como autónomo, potencialmente elegible para Línea 2 Auto+ (hasta 4.500 € al fabricarse fuera de la UE; pendiente de convocatoria).",
    "summary": "El eléctrico nuevo más barato, pero con severas limitaciones dinámicas en autovías y subidas pronunciadas.",
    "bestFor": "Presupuesto mínimo estricto para estrenar eléctrico",
    "caution": "No recomendable para subir la B-24 o viajes familiares frecuentes.",
    "availability": "Red oficial Dacia",
    "winner": "Eléctrico nuevo más barato",
    "rank": 25,
    "tier": "D",
    "score": 6.2,
    "lengthM": "3,73 m",
    "trunkL": "308 l",
    "seats": 4,
    "warranty": "3 años general / 8 años (120.000 km) batería",
    "pros": [
      "17.045 € al contado nuevo (el eléctrico más barato del mercado)",
      "3,73 m: cabe en cualquier aparcamiento estrecho"
    ],
    "cons": [
      "⚠️ 4 plazas homologadas y calidades básicas",
      "Potencia y estabilidad justas para la B-24 y vías rápidas",
      "Carga rápida opcional (no de serie)"
    ],
    "images": {
      "main": "assets/images/cars/dacia-spring-new-main.jpg",
      "gallery": [
        "assets/images/cars/dacia-spring-new-main.jpg",
        "assets/images/cars/dacia-spring-new-gallery-1.jpg",
        "assets/images/cars/dacia-spring-new-gallery-2.jpg"
      ]
    }
  }
];

  const watchlistCars = [
  {
    "id": "kia-ev3-watchlist",
    "name": "Kia EV3",
    "variant": "Air / Earth 58,3 kWh & 81,4 kWh · 204 CV · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 204,
    "batteryKwh": 58.3,
    "wltpKm": 436,
    "officialPrice": "36.500 € – 41.500 € (campañas financiada desde ~28,6k)",
    "targetOfferPrice": "≤ 27.000 € al contado",
    "lengthM": "4,30 m",
    "trunkL": "460 l + 25 l frunk",
    "seats": 5,
    "warranty": "7 años / 150.000 km oficial Kia",
    "summary": "Arquitectura eléctrica E-GMP de Kia con hasta 605 km WLTP (batería grande), 4,30 m, 460 l de maletero y 7 años de garantía total.",
    "status": "Si aparece en stock/campaña real al contado por ≤27.000 €: entraría directamente en Tier A alto y sería candidato Top 6–8.",
    "sourceUrl": "https://www.kia.com/es/modelos/ev3/descubrelo/",
    "sourceLabel": "Kia Iberia · Gama Oficial Kia EV3",
    "images": {
      "main": "assets/images/cars/kia-ev3-watchlist-main.jpg",
      "gallery": [
        "assets/images/cars/kia-ev3-watchlist-main.jpg",
        "assets/images/cars/kia-ev3-watchlist-gallery-1.jpg",
        "assets/images/cars/kia-ev3-watchlist-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "leapmotor-b10-watchlist",
    "name": "Leapmotor B10",
    "variant": "Design 56 kWh · 218 CV · Stellantis · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 218,
    "batteryKwh": 56.2,
    "wltpKm": 361,
    "officialPrice": "29.900 € (campañas financiada desde ~25,5k)",
    "targetOfferPrice": "≤ 26.000 – 27.000 € al contado",
    "lengthM": "4,52 m",
    "trunkL": "435 l",
    "seats": 5,
    "warranty": "5 años / 100.000 km (Red Stellantis España)",
    "summary": "SUV tecnológico del segmento C con 218 CV, pantalla 14,6\" 2.5K, carga rápida 168 kW y red Stellantis (506 uds matriculadas en julio 2026).",
    "status": "En Radar porque sus 29.900 € y 4,52 m exceden el presupuesto objetivo y el tamaño dulce. Si aparece oferta al contado ≤26–27k, entra a valorar si el tamaño es admisible.",
    "sourceUrl": "https://www.media.stellantis.com/es-es/leapmotor/press/el-leapmotor-b10-turismo-100-electrico-mas-matriculado-en-espana-en-julio",
    "sourceLabel": "Stellantis Media · Leapmotor B10 Oficial",
    "images": {
      "main": "assets/images/cars/leapmotor-b10-watchlist-main.jpg",
      "gallery": [
        "assets/images/cars/leapmotor-b10-watchlist-main.jpg",
        "assets/images/cars/leapmotor-b10-watchlist-gallery-1.jpg",
        "assets/images/cars/leapmotor-b10-watchlist-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "jaecoo-5-ev-watchlist",
    "name": "JAECOO 5 EV",
    "variant": "Pure / Exclusive · 60,9 kWh LFP · 211 CV · 2026",
    "market": "new",
    "technology": "BEV",
    "year": 2026,
    "powerCv": 211,
    "batteryKwh": 60.9,
    "wltpKm": 402,
    "officialPrice": "35.500 € – 38.500 €",
    "targetOfferPrice": "≤ 26.000 € al contado",
    "lengthM": "4,38 m",
    "trunkL": "480 l",
    "seats": 5,
    "warranty": "7 años / 150.000 km general (8 años batería)",
    "summary": "211 CV, batería LFP de 60,9 kWh, 480 l de maletero, pantalla central de 13,2\" y cámaras 540°.",
    "status": "Tarifa oficial en 35.500 € (los anuncios de 20k mezclan financiación, achatarramiento y CAE). Solo a considerar si aparecen campañas reales al contado ≤26k €.",
    "sourceUrl": "https://www.omodajaecoo.es/modelos/jaecoo-5/ev-ficha-tecnica",
    "sourceLabel": "JAECOO España · Ficha Técnica JAECOO 5 EV",
    "images": {
      "main": "assets/images/cars/jaecoo-5-ev-watchlist-main.jpg",
      "gallery": [
        "assets/images/cars/jaecoo-5-ev-watchlist-main.jpg",
        "assets/images/cars/jaecoo-5-ev-watchlist-gallery-1.jpg",
        "assets/images/cars/jaecoo-5-ev-watchlist-gallery-2.jpg"
      ]
    }
  },
  {
    "id": "lexus-ux-250h-watchlist",
    "name": "Lexus UX 250h F Sport",
    "variant": "2.0 Híbrido 184 CV F Sport · 2022 · e-CVT",
    "officialPrice": "Tarifa VO BCN: ~28.790 €",
    "targetOfferPrice": "Comprar si oferta ≤ 27.000 €",
    "summary": "El crossover premium definitivo con base mecánica Toyota (2.0 de 184 CV e-CVT): insonorización excelente, acabado F Sport con suspensión adaptativa, etiqueta ECO y cobertura Lexus Relax hasta 10 años. Vigilar en mercado VO si surge unidad ≤27k.",
    "lengthM": "4,50 m",
    "trunkL": "320 l",
    "wltpKm": "HEV ECO",
    "warranty": "Hasta 10 años / 185.000 km (Lexus Relax)",
    "status": "Excelente si entra en precio; actualmente en ~28.790 € en acabado F Sport (Business por ~26.900 €). Poner alerta por debajo de 27.000 €.",
    "sourceUrl": "https://www.autocasion.com/coches-segunda-mano/lexus-ux-ocasion/barcelona",
    "sourceLabel": "AutoCasión · Buscar Lexus UX 250h F Sport Barcelona",
    "images": {
      "main": "assets/images/cars/lexus-ux-250h-watchlist-main.jpg",
      "gallery": [
        "assets/images/cars/lexus-ux-250h-watchlist-main.jpg",
        "assets/images/cars/lexus-ux-250h-watchlist-gallery-1.jpg",
        "assets/images/cars/lexus-ux-250h-watchlist-gallery-2.jpg"
      ]
    }
  }
];

  const budgetGuides = [
  {
    "budget": 13000,
    "label": "13.000 €",
    "winnerName": "Toyota Yaris 100H Hybrid",
    "winnerVariant": "1.5 100H Active / Feel (2017–2019 · 85–110k km)",
    "bevWinner": "Dacia Spring VO (~11–13k €)",
    "market": "VO Barcelona (~11.850 – 13.000 €)",
    "targetPrice": "11.850 – 13.000 €",
    "spendLimit": "No gastar el límite",
    "why": "Fiabilidad legendaria Toyota e-CVT, etiqueta ECO, consumo urbano ridículo (3,9 l/100 km) y mantenimiento ultrasencillo.",
    "bevWhy": "El único eléctrico accesible por ≤13k es un Dacia Spring de ocasión (4 plazas, 45 CV, uso local estricto).",
    "nextStepAdvice": "No necesitas agotar 13k si encuentras una buena unidad por ~12k con libro sellado.",
    "upgradeDecision": "stop",
    "spotlight": null
  },
  {
    "budget": 14000,
    "label": "14.000 €",
    "winnerName": "Toyota Yaris 100H Feel 2020",
    "winnerVariant": "1.5 100H Feel (2020 · ~90.000 km)",
    "bevWinner": "Dacia Spring VO (~12.500 €)",
    "market": "VO Barcelona (~13.990 €)",
    "targetPrice": "~13.990 €",
    "spendLimit": "Sí",
    "why": "Unidad 2020 con un solo propietario, historial en concesionario oficial Toyota, cámara trasera, CarPlay/Android Auto y garantía.",
    "bevWhy": "Sin alternativas BEV de 5 plazas recomendables en este escalón.",
    "nextStepAdvice": "Sí: es un precio excelente para una unidad 2020 con historial sellado.",
    "upgradeDecision": "upgrade",
    "spotlight": null
  },
  {
    "budget": 15000,
    "label": "15.000 €",
    "winnerName": "Toyota Yaris 100H Feel 2020",
    "winnerVariant": "1.5 100H Feel (2020 · ~90.000 km)",
    "bevWinner": "Dacia Spring VO (guardar ~2,5k €)",
    "market": "VO Barcelona (~13.990 €)",
    "targetPrice": "~13.990 €",
    "spendLimit": "No, guardar ~1.000 €",
    "why": "Tener 15.000 € no significa tener que gastar 15.000 €. Compra la unidad de ~13.990 € y quédate el dinero sobrante.",
    "bevWhy": "No gastes 15k en un eléctrico precario: o compras el 100H ahorrando o subes a 17k para un MG4 VO.",
    "nextStepAdvice": "NO gastes los 15.000 € enteros: compra la unidad de 13.990 € y guarda el resto.",
    "upgradeDecision": "stop",
    "spotlight": null
  },
  {
    "budget": 16000,
    "label": "16.000 €",
    "winnerName": "Toyota Yaris Hybrid",
    "winnerVariant": "100H Feel 2020 o esperar mejor 120H",
    "bevWinner": "Dacia Spring VO / Esperar",
    "market": "VO Barcelona (14.000 € – 16.000 €)",
    "targetPrice": "14.000 – 16.000 €",
    "spendLimit": "No forzar",
    "why": "A 16k los 120H disponibles suelen tener más de 125.000 km. Mantén el 100H 2020 con 90k km o sube a 17k.",
    "bevWhy": "Con un tope estricto de 16k no entra un MG4 VO (~16,5k €). Mejor comprar un Spring VO ahorrando o subir a 17k.",
    "nextStepAdvice": "No fuerces los 16k: o compras el 100H por ~14k o estiras a 17k para un 120H con bajo kilometraje.",
    "upgradeDecision": "upgrade",
    "spotlight": null
  },
  {
    "budget": 17000,
    "label": "17.000 €",
    "winnerName": "Toyota Yaris 120H",
    "winnerVariant": "1.5 120H Style / Active (2021–2022 · 50–57k km)",
    "bevWinner": "MG4 Electric 51 kWh VO (solo si aparece ≤17.000 €)",
    "market": "VO Barcelona (~16.850 – 17.090 €)",
    "targetPrice": "~16.850 – 17.090 €",
    "spendLimit": "Sí",
    "why": "Generación moderna TNGA: chasis superior, 116 CV, 3,8 l/100 km y cobertura Toyota Relax hasta 15 años.",
    "bevWhy": "MG4 Standard 51 kWh de ocasión si localizas unidad con oferta cerrada ≤17.000 € (170 CV y propulsión trasera).",
    "nextStepAdvice": "Sí: 17k es una compra magnífica. Si puedes añadir ~800–1.000 €, el Kona HEV 2021 supone un salto importante.",
    "upgradeDecision": "upgrade",
    "spotlight": null
  },
  {
    "budget": 18000,
    "label": "18.000 €",
    "winnerName": "Hyundai Kona Hybrid Maxx 2021",
    "winnerVariant": "1.6 GDI HEV 141 CV (2021 · 21.835 km)",
    "bevWinner": "Hyundai Kona EV 64 VO (~17,5k €) / MG4 VO (≤18k €)",
    "market": "VO Barcelona (17.900 € al contado)",
    "targetPrice": "17.900 €",
    "spendLimit": "Sí: SWEET SPOT BRUTAL",
    "why": "⭐ EL PRIMER GRAN SWEET SPOT: 98,7% de fiabilidad What Car?, solo 21.835 km por 17.900 €, 4,17 m, 141 CV, postura elevada para padres y cuadro digital 10,25\".",
    "bevWhy": "En eléctrico entra con holgura el Kona EV 64 kWh de ocasión (~17,5k €) o MG4 51 kWh VO dentro del presupuesto.",
    "nextStepAdvice": "COMPRA AQUÍ: No necesitas gastar 20–21k. Este coche cubre todas vuestras necesidades.",
    "upgradeDecision": "stop",
    "spotlight": "⭐ Sweet Spot Calidad/Precio (17.900 €)"
  },
  {
    "budget": 19000,
    "label": "19.000 €",
    "winnerName": "Hyundai Kona Hybrid 2021",
    "winnerVariant": "1.6 GDI HEV Maxx (2021 · 21.835 km)",
    "bevWinner": "Renault Twingo E-Tech nuevo (18.959 €) / Kona EV 64 VO",
    "market": "VO Barcelona (17.900 € al contado)",
    "targetPrice": "17.900 €",
    "spendLimit": "No (guardar 1.100 €)",
    "why": "No gastes 19k por gastar: el Kona HEV 2021 con 21k km por 17.900 € es mejor que cualquier otra opción de 19k. Quédate los 1.100 € sobrantes.",
    "bevWhy": "El Twingo E-Tech nuevo entra por 18.959 € al contado (4 plazas, Google, 3,79 m) o Kona EV 64 VO.",
    "nextStepAdvice": "Guarda 1.100 €: no compensa pagar más en este escalón.",
    "upgradeDecision": "stop",
    "spotlight": null
  },
  {
    "budget": 20000,
    "label": "20.000 €",
    "winnerName": "Hyundai Kona Hybrid 2021",
    "winnerVariant": "1.6 GDI HEV Maxx (2021 · 21.835 km)",
    "bevWinner": "Kia e-Niro 64 VO / Kona EV 64 VO (ë-C3 solo si baja ≤20k)",
    "market": "VO Barcelona (17.900 € al contado)",
    "targetPrice": "17.900 €",
    "spendLimit": "No (guardar 2.100 €)",
    "why": "A 20k el Kona con 21.835 km a 17.900 € ofrece una relación km/precio claramente superior. Ahorra 2.100 €.",
    "bevWhy": "Kia e-Niro o Kona EV 64 kWh de ocasión. El ë-C3 nuevo (20.500 €) supera los 20k salvo que negocies rebaja.",
    "nextStepAdvice": "💰 AHORRA 2.100 €: No compres algo con más kilometraje solo para agotar los 20.000 €.",
    "upgradeDecision": "stop",
    "spotlight": null
  },
  {
    "budget": 21000,
    "label": "21.000 €",
    "winnerName": "Hyundai Kona HEV 2021 / Subir a 22k",
    "winnerVariant": "Kona 2021 (17.900 €) o esperar / subir a Yaris Cross",
    "bevWinner": "⭐ Nissan Micra EV Acenta nuevo (20.600 € al contado stock)",
    "market": "VO / Nuevo oficial",
    "targetPrice": "17.900 € (Kona) / 20.600 € (Micra)",
    "spendLimit": "Esperaría / subiría a 22k",
    "why": "A 21k en híbridos o te quedas en el Kona ahorrando 3.100 €, o subes a 21.990 € para el Yaris Cross.",
    "bevWhy": "⚡ SALTO ELÉCTRICO NUEVO: Nissan tiene stock oficial del Micra EV Acenta por 20.600 € al contado (3,97 m, 5 plazas, 317 km WLTP y Nissan+ hasta 10 años en uso particular).",
    "nextStepAdvice": "En híbrido sube a 22k para el Yaris Cross. En eléctrico, el Micra Acenta a 20.600 € es una gran oportunidad.",
    "upgradeDecision": "upgrade",
    "spotlight": null
  },
  {
    "budget": 22000,
    "label": "22.000 €",
    "winnerName": "Toyota Yaris Cross 120H",
    "winnerVariant": "1.5 120H Active Tech (2022 · 42.841 km)",
    "bevWinner": "⭐ Nissan Micra EV Acenta nuevo (20.600 € · sobran 1.400 €)",
    "market": "VO Barcelona (21.990 € al contado)",
    "targetPrice": "21.990 €",
    "spendLimit": "Sí: 2º Salto Importante",
    "why": "⭐ SEGUNDO SALTO IMPORTANTE: 42k km por 21.990 €. Combinas fiabilidad Toyota, e-CVT, carrocería elevada crossover (4,18 m), 5 plazas y acceso perfecto para tus padres.",
    "bevWhy": "El Micra Acenta nuevo a 20.600 € te deja 1.400 € en el bolsillo con 5 plazas, 3,97 m y gran suavidad al contado.",
    "nextStepAdvice": "Sí: aquí sí merece la pena pagar los ~4.000 € extra respecto al Kona 2021 si buscas un Toyota crossover con pocos km.",
    "upgradeDecision": "upgrade",
    "spotlight": "⭐ Salto Crossover Toyota (21.990 €)"
  },
  {
    "budget": 23000,
    "label": "23.000 €",
    "winnerName": "Toyota Yaris Cross Style 120H",
    "winnerVariant": "1.5 120H Style (2022 · 51.000 km)",
    "bevWinner": "⭐ Nissan Micra EV N-Connecta nuevo (23.000 € al contado stock)",
    "market": "VO Concesionario BCN (~22.990 €) / Nuevo Nissan",
    "targetPrice": "~22.990 € (Yaris) / 23.000 € (Micra)",
    "spendLimit": "Sí",
    "why": "🏆 Compra conservadora: Acabado Style con asientos calefactables, pantalla de 9\", clima bizona y Toyota Relax.",
    "bevWhy": "⚡ Mejor eléctrico nuevo: Nissan Micra N-Connecta por 23.000 € al contado con pantalla 10,1\", Google Maps/Assistant nativo, cámara, 5 plazas y garantía Nissan+ hasta 10 años (uso particular).",
    "nextStepAdvice": "Si buscas crossover elevado compra el Yaris Cross. Si quieres estrenar eléctrico tecnológico con Google, el Micra N-Connecta a 23k cambia las reglas.",
    "upgradeDecision": "upgrade",
    "spotlight": null
  },
  {
    "budget": 24000,
    "label": "24.000 €",
    "winnerName": "Hyundai Kona Hybrid Tecno 2024",
    "winnerVariant": "1.6 GDI HEV Tecno 141 CV (2024 · 25.395 km)",
    "bevWinner": "⭐ Nissan Micra EV N-Connecta nuevo (23.000 € · sobran 1.000 €)",
    "market": "VO Barcelona (23.900 € al contado)",
    "targetPrice": "23.900 €",
    "spendLimit": "Sí: CHOLLO MODERNO",
    "why": "⭐ EL CHOLLO MODERNO: Doble pantalla panorámica de 12,3\", 466 l de maletero, 5 años de garantía oficial sin límite de km, interior de 2026 y máximo confort para toda la familia.",
    "bevWhy": "El Micra N-Connecta a 23.000 € te permite estrenar eléctrico moderno con Google ahorrando 1.000 € al contado.",
    "nextStepAdvice": "COMPRA AQUÍ: Por 23.900 € el Kona 2024 es el mejor salto tecnológico en híbrido.",
    "upgradeDecision": "stop",
    "spotlight": "⭐ El Chollo Moderno (23.900 €)"
  },
  {
    "budget": 25000,
    "label": "25.000 €",
    "winnerName": "Hyundai Kona HEV Tecno 2024",
    "winnerVariant": "1.6 GDI HEV Tecno (2024 · 25k km)",
    "bevWinner": "Nissan Micra N-Connecta (23.000 €) / Hyundai Inster (24.900 €)",
    "market": "VO Barcelona (23.900 € al contado)",
    "targetPrice": "23.900 €",
    "spendLimit": "No gastar más por gastar (guardar 1.100 €)",
    "why": "Seguiría comprando el Kona Tecno 2024 por 23.900 €. Te da un interior dos años más moderno que un Yaris Cross 2022 y te sobran 1.100 € en el banco.",
    "bevWhy": "Micra N-Connecta por 23.000 € (sobran 2k) o Inster por 24.900 € al contado. El MG4 Urban (25.490 €) pasa estrictamente al escalón de 26k.",
    "nextStepAdvice": "No gastes 25k en híbrido: quédate en el Kona 2024 por 23.900 € o sube a 26k por el Yaris Cross 130H 2024.",
    "upgradeDecision": "stop",
    "spotlight": null
  },
  {
    "budget": 26000,
    "label": "26.000 €",
    "winnerName": "Toyota Yaris Cross 130H Style 2024",
    "winnerVariant": "Hybrid 130 Style (2024 · 27.199 km)",
    "bevWinner": "⭐ MG4 Urban 2026 Comfort (25.490 €) / Nissan Micra N-Connecta 52 kWh (25.650 €)",
    "market": "VO Concesionario Oficial BCN (25.990 €)",
    "targetPrice": "25.990 €",
    "spendLimit": "Sí: GANADOR GLOBAL",
    "why": "🏆 GANADOR GLOBAL ABSOLUTO A 10–15 AÑOS: Motor 130H mejorado, cuadro digital de 12,3\" + central de 10,5\", e-CVT de elevada fiabilidad, Toyota Relax hasta 15 años/250.000 km y 4,17 m.",
    "bevWhy": "MG4 Urban 2026 (25.490 € · 170 CV, bomba calor y 577 l) o Micra N-Connecta con batería grande de 52 kWh (415 km WLTP) por 25.650 € al contado.",
    "nextStepAdvice": "AQUÍ PARARÍA: Es el coche definitivo para vosotros. Techo alcanzado.",
    "upgradeDecision": "stop",
    "spotlight": "🏆 Ganador Global a 15 Años (25.990 €)"
  },
  {
    "budget": 27000,
    "label": "27.000 €",
    "winnerName": "Toyota Yaris Cross 130H Style",
    "winnerVariant": "Yaris Cross 130H (25.990 €) o Honda Jazz Crosstar nuevo (26.750 €)",
    "bevWinner": "MG4 Urban 2026 (25.490 €) / Micra 52 kWh (25.650 €) / R4 o R5 solo si oferta stock ≤27.000 €",
    "market": "VO / Nuevo oficial",
    "targetPrice": "25.990 €",
    "spendLimit": "No gastar el extra (guardar 1.000 €)",
    "why": "El Yaris Cross 130H a 25.990 € sigue siendo más atractivo, SUV y moderno para tus 27 años y tus padres que gastar 26.750 € en el Jazz. Guarda los 1.000 €.",
    "bevWhy": "MG4 Urban (25.490 €) o Micra 52 kWh (25.650 €). Renault 4 E-Tech (27.954 € PVP) o R5 Techno (27.954 €) solo si localizas campaña de stock ≤27.000 €.",
    "nextStepAdvice": "No gastes 27k en híbrido: compra el Yaris Cross 130H por 25.990 € (o el Jazz nuevo solo si la prioridad exclusiva es estrenar coche).",
    "upgradeDecision": "stop",
    "spotlight": null
  }
];

  return { cars, watchlistCars, budgetGuides };
}));
