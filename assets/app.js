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
      global: { num: '01', tag: '🏆 1.º · El mejor equilibrio global (Toyota Relax 15 años)' },
      quality: { num: '02', tag: '💻 2.º · Mejor tecnología, interior & confort (Doble 12,3")' },
      used: { num: '03', tag: '🛡️ 3.º · El SUV híbrido más refinado y sólido (97,5% fiabilidad)' },
    };

    verdictContainer.innerHTML = verdictCards.map((car) => {
      const meta = tags[car.verdict] || { num: '★', tag: 'Recomendado' };
      const b = car.breakdown;
      return `
        <article class="verdict-card" id="verdict-${car.id}">
          <div class="verdict-card__header">
            <span class="verdict-card__tag">${meta.tag}</span>
            <span class="score-badge" aria-label="Nota baremo">${car.score ? car.score.toFixed(2).replace('.', ',') : '—'} / 10</span>
          </div>
          <h3>${escapeHtml(car.name)}</h3>
          <p class="verdict-card__variant">${escapeHtml(car.variant)}</p>
          <ul class="spec-strip" aria-label="Especificaciones clave">
            ${car.lengthM ? `<li>📏 ${escapeHtml(car.lengthM)}</li>` : ''}
            ${car.powerCv ? `<li>⚡ ${car.powerCv} CV</li>` : ''}
            ${car.trunkL ? `<li>🧳 ${escapeHtml(car.trunkL)}</li>` : ''}
            ${car.seats ? `<li>👥 ${car.seats} pl</li>` : ''}
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
          <a class="button button--quiet button--sm" href="#${car.id}">Ver ficha técnica completa ↓</a>
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

  function renderTierList() {
    const tierCardsContainer = document.getElementById('tier-cards-view');
    const tierTableContainer = document.getElementById('tier-table-view');
    const btnViewCards = document.getElementById('btn-view-cards');
    const btnViewTable = document.getElementById('btn-view-table');

    if (!tierCardsContainer || !tierTableContainer) return;

    const sortedCars = [...cars].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));

    const tierMeta = {
      S: { title: 'Tier S · Los Imprescindibles (Candidatos Top)', desc: 'Máximo equilibrio en fiabilidad, confort familiar a 10-15 años y tecnología.', class: 'tier-group--s' },
      A: { title: 'Tier A · Sobresalientes con Matiz', desc: 'Gran calidad y prestaciones, con algún compromiso menor en tamaño, plazas o juventud.', class: 'tier-group--a' },
      B: { title: 'Tier B · Alternativas Buenas y Probadas', desc: 'Opciones sólidas de ocasión o de concepto más clásico y utilitario.', class: 'tier-group--b' },
      C: { title: 'Tier C · Opciones Secundarias / Específicas', desc: 'Recomendables solo si buscas un atributo muy concreto (deportividad, autonomía o bajo coste).', class: 'tier-group--c' },
      D: { title: 'Tier D · Compromisos Severos', desc: 'Vehículos con limitaciones acusadas en vías rápidas, plazas o calidades básicas.', class: 'tier-group--d' },
    };

    const tiers = ['S', 'A', 'B', 'C', 'D'];
    tierCardsContainer.innerHTML = tiers.map((t) => {
      const groupCars = sortedCars.filter((c) => (c.tier || 'C') === t);
      if (groupCars.length === 0) return '';
      const meta = tierMeta[t];

      return `
        <div class="tier-group ${meta.class}">
          <div class="tier-group__header">
            <span class="tier-badge tier-badge--${t}">TIER ${t}</span>
            <div>
              <h3>${escapeHtml(meta.title)}</h3>
              <p>${escapeHtml(meta.desc)}</p>
            </div>
          </div>
          <div class="tier-cards-grid">
            ${groupCars.map((car) => `
              <article class="tier-card" id="tier-card-${car.id}">
                <div class="tier-card__head">
                  <div class="tier-card__rank-badge">#${car.rank}</div>
                  <div class="tier-card__titles">
                    <h4>${escapeHtml(car.name)}</h4>
                    <p class="tier-card__variant">${escapeHtml(car.variant)}</p>
                  </div>
                  <div class="tier-card__score" aria-label="Puntuación baremo">
                    <strong>${car.score ? car.score.toFixed(2).replace('.', ',') : '—'}</strong>
                    <span>/ 10</span>
                  </div>
                </div>

                <div class="tier-card__meta-bar">
                  <span class="tier-pill tier-pill--price">${priceDisplay(car)}</span>
                  <span class="tier-pill tier-pill--tech">${techLabel(car.technology)} · ${marketLabel(car.market)}</span>
                  ${car.lengthM ? `<span class="tier-pill">📏 ${escapeHtml(car.lengthM)}</span>` : ''}
                  ${car.seats ? `<span class="tier-pill">👥 ${car.seats} plazas</span>` : ''}
                  ${car.trunkL ? `<span class="tier-pill">🧳 ${escapeHtml(car.trunkL)}</span>` : ''}
                </div>

                <div class="tier-card__pro-con">
                  <div class="tier-card__pros">
                    <strong class="pro-heading">🟢 Lo Mejor</strong>
                    <ul>
                      ${(car.pros || []).map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
                    </ul>
                  </div>
                  <div class="tier-card__cons">
                    <strong class="con-heading">🔴 A Considerar</strong>
                    <ul>
                      ${(car.cons || []).map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <div class="tier-card__verdict">
                  <p><strong>🎯 Veredicto:</strong> ${escapeHtml(car.bestFor || car.summary)}</p>
                  ${car.warranty ? `<p class="tier-card__warranty"><strong>🛡️ Garantía:</strong> ${escapeHtml(car.warranty)}</p>` : ''}
                </div>

                <div class="tier-card__footer">
                  <a href="${car.sourceUrl}" target="_blank" rel="noopener noreferrer" class="tier-link">
                    ${escapeHtml(car.sourceLabel)} ↗
                  </a>
                  <a href="#${car.id}" class="tier-link-more">Ver ficha completa ↓</a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    tierTableContainer.innerHTML = `
      <div class="tier-table-wrapper" tabindex="0" role="region" aria-label="Tabla de clasificación de coches ordenados de mejor a peor">
        <table class="tier-table">
          <thead>
            <tr>
              <th scope="col"># / Tier</th>
              <th scope="col">Modelo & Versión</th>
              <th scope="col">Nota</th>
              <th scope="col">Propulsión</th>
              <th scope="col">Medidas & Plazas</th>
              <th scope="col">Precio Estimado</th>
              <th scope="col">Lo Mejor (Pros)</th>
              <th scope="col">A Considerar (Contras)</th>
              <th scope="col">Garantía Oficial</th>
            </tr>
          </thead>
          <tbody>
            ${sortedCars.map((car) => `
              <tr class="tier-row tier-row--${car.tier || 'C'}">
                <td>
                  <span class="table-rank">#${car.rank}</span>
                  <span class="tier-badge tier-badge--sm tier-badge--${car.tier || 'C'}">${car.tier || 'C'}</span>
                </td>
                <td>
                  <strong>${escapeHtml(car.name)}</strong>
                  <small>${escapeHtml(car.variant)}</small>
                </td>
                <td>
                  <strong class="table-score">${car.score ? car.score.toFixed(2).replace('.', ',') : '—'}</strong>
                </td>
                <td>
                  <span class="table-tech">${techLabel(car.technology)}</span>
                  <small>${car.powerCv ? car.powerCv + ' CV' : ''} ${car.batteryKwh ? '· ' + car.batteryKwh + ' kWh' : ''}</small>
                </td>
                <td>
                  <span>${car.lengthM || '—'}</span>
                  <small>${car.seats ? car.seats + ' plazas' : ''} · ${car.trunkL || ''}</small>
                </td>
                <td>
                  <strong class="table-price">${priceDisplay(car)}</strong>
                </td>
                <td class="table-pro">
                  <ul>
                    ${(car.pros || []).slice(0, 2).map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
                  </ul>
                </td>
                <td class="table-con">
                  <ul>
                    ${(car.cons || []).slice(0, 2).map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
                  </ul>
                </td>
                <td>
                  <small>${escapeHtml(car.warranty || 'Garantía legal')}</small>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (btnViewCards && btnViewTable) {
      btnViewCards.onclick = () => {
        btnViewCards.classList.add('is-active');
        btnViewCards.setAttribute('aria-selected', 'true');
        btnViewTable.classList.remove('is-active');
        btnViewTable.setAttribute('aria-selected', 'false');
        tierCardsContainer.hidden = false;
        tierTableContainer.hidden = true;
      };

      btnViewTable.onclick = () => {
        btnViewTable.classList.add('is-active');
        btnViewTable.setAttribute('aria-selected', 'true');
        btnViewCards.classList.remove('is-active');
        btnViewCards.setAttribute('aria-selected', 'false');
        tierTableContainer.hidden = false;
        tierCardsContainer.hidden = true;
      };
    }
  }

  function renderBudgetTool() {
    const budgetGuides = window.CarData.budgetGuides || [];
    const budgetRange = document.getElementById('budget-range');
    const budgetInputNumber = document.getElementById('budget-input-number');
    const budgetOutput = document.getElementById('budget-output');
    const budgetResultCard = document.getElementById('budget-result-card');
    const sweetSpotBtns = document.querySelectorAll('[data-set-budget]');

    if (!budgetRange || !budgetOutput || !budgetResultCard || budgetGuides.length === 0) return;

    function getAdviceForAmount(amount) {
      if (amount <= 13500) return { guide: budgetGuides[0], bracket: '13k' };
      if (amount <= 14500) return { guide: budgetGuides[1], bracket: '14k' };
      if (amount <= 15500) return { guide: budgetGuides[2], bracket: '15k' };
      if (amount <= 16500) return { guide: budgetGuides[3], bracket: '16k' };
      if (amount <= 17500) return { guide: budgetGuides[4], bracket: '17k' };
      if (amount <= 18500) return { guide: budgetGuides[5], bracket: '18k' };
      if (amount <= 19500) return { guide: budgetGuides[6], bracket: '19k' };
      if (amount <= 20500) return { guide: budgetGuides[7], bracket: '20k' };
      if (amount <= 21500) return { guide: budgetGuides[8], bracket: '21k' };
      if (amount <= 22500) return { guide: budgetGuides[9], bracket: '22k' };
      if (amount <= 23500) return { guide: budgetGuides[10], bracket: '23k' };
      if (amount <= 24500) return { guide: budgetGuides[11], bracket: '24k' };
      if (amount <= 25500) return { guide: budgetGuides[12], bracket: '25k' };
      if (amount <= 26500) return { guide: budgetGuides[13], bracket: '26k' };
      return { guide: budgetGuides[14] || budgetGuides[budgetGuides.length - 1], bracket: '27k+' };
    }

    function getActionSteps(amount, guide) {
      if (amount <= 14000) {
        return [
          'Filtra en Coches.net: Toyota Yaris Hybrid 100H acabado Active Tech o Feel (2017–2019).',
          'Comprueba que tenga libro de revisiones oficial Toyota para verificar el estado de la batería híbrida.',
          'Consejo inteligente: Si puedes juntar 1.500 € más (15.000 €), accederás a la 4ª generación 120H con chasis TNGA moderno.'
        ];
      }
      if (amount <= 17000) {
        return [
          'Filtra: Toyota Yaris 120H Style / Active (años 2020–2022) en concesionarios de Barcelona.',
          'Pide activación del programa Toyota Relax para extender la cobertura oficial hasta los 15 años.',
          'Si la prioridad es la entrada/salida fácil para tus padres, tu siguiente gran objetivo son los 17.900 € del Kona SUV.'
        ];
      }
      if (amount < 21500) {
        const saved = Math.max(0, amount - 17900);
        return [
          'Localiza la unidad activa en Barcelona: Hyundai Kona HEV Maxx 2021 con 21.835 km por 17.900 € al contado.',
          `¡AHORRA ${formatEuro(saved)}! No pagues 19k–21k por coches con +100.000 km. Esta unidad con 21k km y 98,7% de fiabilidad es imbatible.`,
          'Solicita informe DGT/Carfax para confirmar kilometraje y prueba dinámica en cuestas y tráfico urbano.'
        ];
      }
      if (amount < 24000) {
        return [
          'Filtra en la red oficial Toyota Ocasión de Barcelona: Yaris Cross 120H Style con menos de 55.000 km (~22.700 €).',
          'Verifica la garantía oficial Toyota Relax hasta 15 años o 250.000 km.',
          'Alternativa tecnológica: Por 23.900 € pasas al Kona 2024 con doble pantalla panorámica de 12,3" y 466 l de maletero.'
        ];
      }
      if (amount < 25800) {
        const saved = Math.max(0, amount - 23900);
        return [
          'Compra el Hyundai Kona Hybrid Tecno 2024 (25.000 km por 23.900 € al contado en Barcelona).',
          'Disfruta de la doble pantalla de 12,3", 466 l de maletero y 5 años de garantía oficial sin límite de km.',
          saved > 0 ? `Te sobran ${formatEuro(saved)} de tu presupuesto para seguro, garaje y mantenimiento.` : 'Precio cerrado al contado sin sorpresas.'
        ];
      }
      return [
        'Compra el Toyota Yaris Cross 130H Style 2024 (27.000 km por 25.990 € certificado en Barcelona).',
        'Disfrutas del motor 130H más ágil, cuadro digital de 12,3", central de 10,5" y Toyota Relax hasta 15 años.',
        'Techo óptimo alcanzado: No gastes más dinero; para vuestro uso de 3–5k km/año es la compra familiar definitiva.'
      ];
    }

    function updateBudget(val) {
      const budgetNum = Math.max(8000, Math.min(40000, Number(val) || 18000));
      const { guide } = getAdviceForAmount(budgetNum);

      budgetOutput.textContent = formatEuro(budgetNum);
      if (budgetInputNumber && document.activeElement !== budgetInputNumber) {
        budgetInputNumber.value = budgetNum;
      }
      if (budgetRange && document.activeElement !== budgetRange) {
        budgetRange.value = Math.min(27000, Math.max(13000, budgetNum));
      }

      const decisionLabels = {
        stop: '🛑 NO SUBIR DE PRESUPUESTO',
        upgrade: '⬆️ MERECE LA PENA SUBIR 1.000 €',
        consider: '⚖️ DEPENDE DEL KILOMETRAJE',
      };

      const steps = getActionSteps(budgetNum, guide);

      budgetResultCard.innerHTML = `
        <div class="budget-card-header">
          <div class="budget-card-title-group">
            <span class="budget-badge-winner">🏆 Recomendación para ${formatEuro(budgetNum)}</span>
            ${guide.spotlight ? `<span class="budget-spotlight-badge">${escapeHtml(guide.spotlight)}</span>` : ''}
            <h3>${escapeHtml(guide.winnerName)}</h3>
            <p class="budget-variant-sub">${escapeHtml(guide.winnerVariant)} · <strong>${escapeHtml(guide.market)}</strong></p>
          </div>
        </div>

        <div class="budget-card-body">
          <div class="budget-why-section">
            <strong>💎 Por qué esta compra con ${formatEuro(budgetNum)}:</strong>
            <p>${escapeHtml(guide.why)}</p>
          </div>

          <div class="budget-upgrade-box budget-upgrade--${guide.upgradeDecision}">
            <div class="upgrade-decision-header">
              <span class="upgrade-tag">${decisionLabels[guide.upgradeDecision] || 'CONSEJO'}</span>
              <strong>¿Merece la pena pagar más?</strong>
            </div>
            <p>${escapeHtml(guide.nextStepAdvice)}</p>
          </div>

          <div class="budget-action-steps">
            <strong>📋 Qué hacer exactamente paso a paso:</strong>
            <ol class="action-steps-list">
              ${steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
          </div>
        </div>
      `;

      sweetSpotBtns.forEach((btn) => {
        const btnBudget = Number(btn.dataset.setBudget);
        if (Math.abs(btnBudget - budgetNum) < 500) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    }

    if (budgetRange) {
      budgetRange.addEventListener('input', (e) => {
        updateBudget(e.target.value);
      });
    }

    if (budgetInputNumber) {
      budgetInputNumber.addEventListener('input', (e) => {
        updateBudget(e.target.value);
      });
      budgetInputNumber.addEventListener('change', (e) => {
        updateBudget(e.target.value);
      });
    }

    sweetSpotBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        updateBudget(btn.dataset.setBudget);
      });
    });

    updateBudget(18000);
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
    renderTierList();
    renderBudgetTool();
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
