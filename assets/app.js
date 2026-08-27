(function appInit() {
  'use strict';

  if (typeof window === 'undefined' || !window.CarData || !window.Comparison) {
    return;
  }

  const { cars } = window.CarData;
  const {
    conditionLabel,
    escapeHtml,
    evidenceLabel,
    filterCars,
    formatDate,
    formatEuro,
    initials,
    marketLabel,
    parseFilters,
    priceDisplay,
    sortCars,
    techLabel,
  } = window.Comparison;

  const verdictContainer = document.getElementById('verdict-list');
  const winnerContainer = document.getElementById('winner-grid');
  const listContainer = document.getElementById('comparison-list');
  const emptyState = document.getElementById('empty-state');
  const resultCount = document.getElementById('result-count');
  const filterForm = document.getElementById('filters');
  const searchInput = document.getElementById('car-search');
  const marketSelect = document.getElementById('market-filter');
  const techSelect = document.getElementById('tech-filter');
  const sortSelect = document.getElementById('sort-filter');
  const resetBtn = document.getElementById('reset-filters');
  const emptyResetBtn = document.querySelector('[data-reset-filters]');

  function renderVerdicts() {
    if (!verdictContainer) return;

    const verdictCards = cars
      .filter((car) => car.verdict)
      .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

    const tags = {
      global: { num: '01', tag: 'La compra maestra (Ocasión deportiva)' },
      quality: { num: '02', tag: 'Diseño icónico & Estreno nuevo' },
      used: { num: '03', tag: 'Máximo ahorro & 7 años garantía' },
    };

    verdictContainer.innerHTML = verdictCards.map((car) => {
      const meta = tags[car.verdict] || { num: '★', tag: 'Recomendado' };
      const b = car.breakdown;
      return `
        <article class="verdict-card" id="verdict-${car.id}">
          <span class="verdict-card__number" aria-hidden="true">${meta.num}</span>
          <p class="verdict-card__tag">${meta.tag}</p>
          <h3>${escapeHtml(car.name)}</h3>
          <p class="verdict-card__variant">${escapeHtml(car.variant)}</p>
          <ul class="spec-strip" aria-label="Especificaciones clave">
            <li><strong>WLTP:</strong> ${car.wltpKm ? car.wltpKm + ' km' : '—'}</li>
            <li><strong>Batería:</strong> ${car.batteryKwh ? car.batteryKwh + ' kWh' : '—'}</li>
            <li><strong>Potencia:</strong> ${car.powerCv ? car.powerCv + ' CV' : '—'}</li>
          </ul>
          ${b ? `
          <div class="verdict-breakdown" aria-label="Desglose de precios y ayudas">
            <div class="breakdown-row">
              <span>${escapeHtml(b.initialLabel)}</span>
              <strong>${escapeHtml(b.initialValue)}</strong>
            </div>
            <div class="breakdown-row breakdown-row--discount">
              <span>${escapeHtml(b.aidLabel)}</span>
              <b>${escapeHtml(b.aidValue)}</b>
            </div>
            ${b.extraLabel ? `
            <div class="breakdown-row breakdown-row--extra">
              <span>${escapeHtml(b.extraLabel)}</span>
              <em>${escapeHtml(b.extraValue)}</em>
            </div>` : ''}
            <div class="breakdown-row breakdown-row--final">
              <span>${escapeHtml(b.finalLabel)}</span>
              <strong class="price-highlight">${escapeHtml(b.finalValue)}</strong>
            </div>
            ${b.financeNote ? `
            <div class="breakdown-row breakdown-row--finance">
              <span>Alternativa:</span>
              <small>${escapeHtml(b.financeNote)}</small>
            </div>` : ''}
          </div>
          ` : `
          <div class="verdict-card__price">
            <span>Precio neto estimado</span>
            <strong>${formatEuro(car.netPriceMin)}</strong>
          </div>
          `}
          <p class="verdict-card__summary">${escapeHtml(car.summary)}</p>
          <a class="button button--quiet" href="#${car.id}">Ver ficha y fuentes ↓</a>
        </article>
      `;
    }).join('');
  }

  function renderWinners() {
    if (!winnerContainer) return;

    const winners = cars.filter((car) => car.winner);

    winnerContainer.innerHTML = winners.map((car) => `
      <article class="winner">
        <p class="winner__category">${escapeHtml(car.winner)}</p>
        <h3>${escapeHtml(car.name)}</h3>
        <p>${escapeHtml(car.bestFor || car.summary)} <strong>${formatEuro(car.netPriceMin)}</strong></p>
      </article>
    `).join('');
  }

  function renderCars(items) {
    if (!listContainer || !resultCount || !emptyState) return;

    const count = items.length;
    resultCount.textContent = count === 0
      ? '0 coches disponibles con estos filtros'
      : `${count} ${count === 1 ? 'coche disponible' : 'coches disponibles'}`;

    if (count === 0) {
      listContainer.innerHTML = '';
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    listContainer.innerHTML = items.map((car) => `
      <article class="car-card" id="${car.id}" data-market="${car.market}" data-technology="${car.technology}" data-evidence="${car.evidence}">
        <div class="car-card__visual" aria-hidden="true">
          <span class="car-card__initials">${initials(car.name)}</span>
        </div>
        <div class="car-card__body">
          <div class="car-card__topline">
            <span class="evidence">
              <i class="dot dot--${car.evidence}" aria-hidden="true"></i> ${evidenceLabel(car.evidence)}
            </span>
            <span class="tech-label">${techLabel(car.technology)} · ${marketLabel(car.market)}</span>
          </div>
          <h3>${escapeHtml(car.name)}</h3>
          <p class="car-card__variant">${escapeHtml(car.variant)}</p>
          <p class="car-card__summary">${escapeHtml(car.summary)}</p>
          <dl class="car-card__specs">
            <div>
              <dt>Autonomía</dt>
              <dd>${car.wltpKm ? car.wltpKm + ' km WLTP' : 'No aplica'}</dd>
            </div>
            <div>
              <dt>Batería</dt>
              <dd>${car.batteryKwh ? car.batteryKwh + ' kWh' : '—'}</dd>
            </div>
            <div>
              <dt>Potencia</dt>
              <dd>${car.powerCv ? car.powerCv + ' CV' : '—'}</dd>
            </div>
          </dl>
          <div class="price-block">
            <span class="price-block__label">${conditionLabel(car)}</span>
            <strong class="price-block__value">${priceDisplay(car)}</strong>
            ${car.aidEstimate > 0 ? `<span class="price-block__aid">Auto+ estimado: −${formatEuro(car.aidEstimate)} (Neto: ${formatEuro(car.netPriceMin)})</span>` : ''}
          </div>
          <p class="car-card__note">${escapeHtml(car.priceNote)}</p>
          ${car.caution ? `<p class="car-card__caution"><strong>Atención:</strong> ${escapeHtml(car.caution)}</p>` : ''}
          <div class="car-card__footer">
            <a href="${car.sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(car.sourceLabel)} <span aria-hidden="true">↗</span></a>
            <time datetime="${car.verifiedAt}">Comprobado: ${formatDate(car.verifiedAt)}</time>
          </div>
        </div>
      </article>
    `).join('');
  }

  function getFormFilters() {
    return {
      query: searchInput ? searchInput.value : '',
      market: marketSelect ? marketSelect.value : 'all',
      technology: techSelect ? techSelect.value : 'all',
      sort: sortSelect ? sortSelect.value : 'recommended',
    };
  }

  function setFormFilters(filters) {
    if (searchInput) searchInput.value = filters.query || '';
    if (marketSelect) marketSelect.value = filters.market || 'all';
    if (techSelect) techSelect.value = filters.technology || 'all';
    if (sortSelect) sortSelect.value = filters.sort || 'recommended';
  }

  function updateUrl(filters) {
    if (typeof window === 'undefined' || !window.history || !window.history.replaceState) return;
    if (window.location.protocol === 'file:') return;

    try {
      const params = new URLSearchParams();
      if (filters.market && filters.market !== 'all') params.set('market', filters.market);
      if (filters.technology && filters.technology !== 'all') params.set('technology', filters.technology);
      if (filters.sort && filters.sort !== 'recommended') params.set('sort', filters.sort);
      if (filters.query && filters.query.trim()) params.set('q', filters.query.trim());

      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState(null, '', newUrl);
    } catch {
      // Ignorar restricciones en protocolos locales o sandboxes
    }
  }

  function applyFilters() {
    const filters = getFormFilters();
    const filtered = filterCars(cars, filters);
    const sorted = sortCars(filtered, filters.sort);
    renderCars(sorted);
    updateUrl(filters);
  }

  function resetAll() {
    setFormFilters({
      query: '',
      market: 'all',
      technology: 'all',
      sort: 'recommended',
    });
    applyFilters();
  }

  function init() {
    renderVerdicts();
    renderWinners();

    const initialFilters = parseFilters(new URLSearchParams(window.location.search));
    setFormFilters(initialFilters);
    applyFilters();

    if (filterForm) {
      filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    if (marketSelect) {
      marketSelect.addEventListener('change', applyFilters);
    }

    if (techSelect) {
      techSelect.addEventListener('change', applyFilters);
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', applyFilters);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetAll();
      });
    }

    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAll);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
