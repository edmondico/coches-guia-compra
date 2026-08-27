(function comparisonModule(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.Comparison = api;
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function createComparison() {
  'use strict';

  const VALID_MARKETS = new Set(['all', 'new', 'used']);
  const VALID_TECHNOLOGIES = new Set(['all', 'BEV', 'PHEV', 'HEV', 'plug-in', 'no-plug']);
  const VALID_SORTS = new Set(['recommended', 'price-asc', 'range-desc', 'newest']);

  function calculateAid(car) {
    if (!car || !car.aidEligible || !['BEV', 'PHEV', 'EREV'].includes(car.technology)) {
      return 0;
    }

    if (!Number.isFinite(car.pretaxPrice) || car.pretaxPrice > 45000) {
      return 0;
    }

    let share = car.technology === 'BEV' ? 0.5 : 0.25;
    share += car.pretaxPrice <= 35000 ? 0.25 : 0.15;

    if (car.euAssembly) {
      share += 0.15;
    }

    if (car.euAssembly && car.euBattery) {
      share += 0.1;
    }

    return Math.min(4500, Math.round(4500 * share));
  }

  function netPrice(car) {
    if (!car || !Number.isFinite(car.cashPrice)) {
      return null;
    }

    return Math.max(0, car.cashPrice - (Number.isFinite(car.aidEstimate) ? car.aidEstimate : 0));
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function matchesTechnology(car, technology) {
    if (technology === 'all') return true;
    if (technology === 'plug-in') return ['BEV', 'PHEV', 'EREV'].includes(car.technology);
    if (technology === 'no-plug') return car.technology === 'HEV';
    return car.technology === technology;
  }

  function filterCars(cars, filters) {
    const market = VALID_MARKETS.has(filters.market) ? filters.market : 'all';
    const technology = VALID_TECHNOLOGIES.has(filters.technology) ? filters.technology : 'all';
    const maximum = Number.isFinite(filters.maxPrice) ? filters.maxPrice : Infinity;
    const query = normalize(filters.query);

    return cars.filter((car) => {
      const searchable = normalize([car.name, car.variant, car.summary, car.year].join(' '));
      return (market === 'all' || car.market === market)
        && matchesTechnology(car, technology)
        && (!Number.isFinite(car.netPriceMin) || car.netPriceMin <= maximum)
        && (!query || searchable.includes(query));
    });
  }

  function sortCars(cars, key) {
    const sorted = [...cars];

    if (key === 'price-asc') {
      return sorted.sort((a, b) => (a.netPriceMin ?? Infinity) - (b.netPriceMin ?? Infinity));
    }

    if (key === 'range-desc') {
      return sorted.sort((a, b) => (b.wltpKm ?? -1) - (a.wltpKm ?? -1));
    }

    if (key === 'newest') {
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }

    return sorted.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  }

  function formatEuro(value) {
    if (!Number.isFinite(value)) return 'Consultar';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  function conditionLabel(car) {
    if (Number.isFinite(car.cashPrice)) return 'Precio al contado';
    if (Number.isFinite(car.financePrice)) return 'Oferta financiada';
    if (Array.isArray(car.priceRange)) return 'Banda de anuncios';
    return 'Precio por confirmar';
  }

  function parseFilters(searchParams) {
    const market = searchParams.get('market');
    const technology = searchParams.get('technology');
    const sort = searchParams.get('sort');

    return {
      market: VALID_MARKETS.has(market) ? market : 'all',
      technology: VALID_TECHNOLOGIES.has(technology) ? technology : 'all',
      sort: VALID_SORTS.has(sort) ? sort : 'recommended',
      query: searchParams.get('q') || '',
    };
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initials(name) {
    if (!name) return '??';
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function techLabel(technology) {
    const map = {
      BEV: 'Eléctrico puro (BEV)',
      PHEV: 'Híbrido enchufable (PHEV)',
      HEV: 'Híbrido (ECO)',
      EREV: 'Eléctrico de rango extendido (EREV)',
    };
    return map[technology] || technology || '—';
  }

  function marketLabel(market) {
    const map = {
      new: 'Nuevo',
      used: 'Ocasión',
    };
    return map[market] || market || '—';
  }

  function evidenceLabel(evidence) {
    const map = {
      verified: 'Verificado',
      indicative: 'Orientativo',
      upcoming: 'Próximo lanzamiento',
    };
    return map[evidence] || evidence || '—';
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const match = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      return `${match[3]}/${match[2]}/${match[1]}`;
    }
    return dateStr;
  }

  function priceDisplay(car) {
    if (!car) return 'Consultar';
    if (Number.isFinite(car.cashPrice)) {
      return formatEuro(car.cashPrice);
    }
    if (Number.isFinite(car.financePrice)) {
      return `desde ${formatEuro(car.financePrice)}`;
    }
    if (Array.isArray(car.priceRange) && car.priceRange.length === 2) {
      return `${formatEuro(car.priceRange[0])} – ${formatEuro(car.priceRange[1])}`;
    }
    return 'Consultar';
  }

  return {
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
  };
}));

