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
  const watchlistContainer = document.getElementById('watchlist-grid');
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
  const catalogueToggle = document.getElementById('catalogue-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const cataloguePreviewLimit = 6;
  let catalogueExpanded = false;

  function renderVerdicts() {
    if (!verdictContainer) return;

    const verdictCards = cars
      .filter((car) => car.verdict)
      .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

    const tags = {
      global: { num: '01', tag: '1.º · El mejor equilibrio global (Toyota Relax 15 años)' },
      comfort: { num: '02', tag: '2.º · Mejor tecnología, interior & confort (Doble 12,3")' },
      mechanical: { num: '03', tag: '3.º · El SUV híbrido más refinado y sólido (97,5% fiabilidad)' },
    };

    verdictContainer.innerHTML = verdictCards.map((car) => {
      const tagInfo = tags[car.verdict] || { num: '★', tag: car.winner || 'Destacado' };
      return `
        <article class="verdict-card" id="verdict-${car.id}">
          <span class="verdict-card__number">${tagInfo.num}</span>
          <div class="verdict-card__header">
            <span class="verdict-card__tag">${escapeHtml(tagInfo.tag)}</span>
            <span class="score-badge">${car.score ? car.score.toFixed(2).replace('.', ',') : '—'}/10</span>
          </div>
          <h3>${escapeHtml(car.name)}</h3>
          <p class="verdict-card__variant">${escapeHtml(car.variant)}</p>
          <ul class="spec-strip" aria-label="Especificaciones clave">
            <li><strong>Longitud:</strong> ${escapeHtml(car.lengthM || '—')}</li>
            <li><strong>Maletero:</strong> ${escapeHtml(car.trunkL || '—')}</li>
            <li><strong>Garantía:</strong> ${escapeHtml(car.warranty || '—')}</li>
          </ul>
          ${car.breakdown ? `
          <div class="verdict-card__price-box">
            <span>Precio mercado VO verificado:</span>
            <strong>${escapeHtml(car.breakdown.initialValue)}</strong>
          </div>
          ` : `
          <div class="verdict-card__price-box">
            <span>Precio al contado oficial:</span>
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

    const winners = cars
      .filter((car) => car.winner)
      .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
      .slice(0, 8);

    winnerContainer.innerHTML = winners.map((car) => `
      <article class="winner">
        <p class="winner__category">${escapeHtml(car.winner)}</p>
        <h3>${escapeHtml(car.name)}</h3>
        <p>${escapeHtml(car.bestFor || car.summary)} <strong>${formatEuro(car.netPriceMin)}</strong></p>
      </article>
    `).join('');
  }

  function renderWatchlist() {
    if (!watchlistContainer) return;
    const watchlist = window.CarData.watchlistCars || [];
    if (!watchlist.length) return;

    watchlistContainer.innerHTML = watchlist.map((item) => `
      <article class="watchlist-card" id="${item.id}">
        <div class="watchlist-card__head">
          <div>
            <span class="watchlist-tag">📡 Radar 2026</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="watchlist-variant">${escapeHtml(item.variant)}</p>
          </div>
          <div class="watchlist-price-block">
            <span class="watchlist-price-label">Tarifa oficial</span>
            <strong class="watchlist-price-val">${escapeHtml(item.officialPrice)}</strong>
            <span class="watchlist-target-pill">Objetivo: ${escapeHtml(item.targetOfferPrice)}</span>
          </div>
        </div>
        <p class="watchlist-summary">${escapeHtml(item.summary)}</p>
        <div class="watchlist-specs">
          <span>📏 ${escapeHtml(item.lengthM)}</span>
          <span>🧳 ${escapeHtml(item.trunkL)}</span>
          <span>⚡ ${item.wltpKm} km WLTP</span>
          <span>🛡️ ${escapeHtml(item.warranty)}</span>
        </div>
        <p class="watchlist-status"><strong>🎯 Diagnóstico:</strong> ${escapeHtml(item.status)}</p>
        <div class="watchlist-footer">
          <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="watchlist-link">${escapeHtml(item.sourceLabel)} ↗</a>
        </div>
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
      const groupCountLabel = `${groupCars.length} ${groupCars.length === 1 ? 'coche' : 'coches'}`;

      return `
        <details class="tier-group ${meta.class}" ${t === 'S' ? 'open' : ''}>
          <summary class="tier-group__header">
            <span class="tier-badge tier-badge--${t}">TIER ${t}</span>
            <div>
              <h3>${escapeHtml(meta.title)}</h3>
              <p>${escapeHtml(meta.desc)}</p>
            </div>
            <span class="tier-group__toggle" aria-hidden="true">${groupCountLabel} <i>▾</i></span>
          </summary>
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

                <button type="button" class="tier-card__expand-btn" aria-expanded="false" aria-controls="tier-details-${car.id}">
                  <span class="expand-text">Ver análisis, pros y contras</span>
                  <span class="expand-arrow" aria-hidden="true">▾</span>
                </button>

                <div class="tier-card__expandable" id="tier-details-${car.id}">
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
                </div>
              </article>
            `).join('')}
          </div>
        </details>
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
                    ${(car.pros || []).map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
                  </ul>
                </td>
                <td class="table-con">
                  <ul>
                    ${(car.cons || []).map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
                  </ul>
                </td>
                <td>
                  <small>${escapeHtml(car.warranty || '—')}</small>
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
    const budgetRange = document.getElementById('budget-range');
    const budgetOutput = document.getElementById('budget-output');
    const budgetInputNumber = document.getElementById('budget-input-number');
    const budgetResultCard = document.getElementById('budget-result-card');
    const sweetSpotBtns = document.querySelectorAll('[data-set-budget]');
    const tldrPills = document.querySelectorAll('.tldr-pill[data-set-budget]');

    if (!budgetOutput || !budgetResultCard) return;

    const guides = CarData.budgetGuides || [];

    function getAdviceForAmount(amount) {
      if (!guides.length) return null;
      let matched = guides[0];
      for (const item of guides) {
        if (amount >= item.budget) {
          matched = item;
        } else {
          break;
        }
      }
      return { guide: matched };
    }

    function getActionSteps(amount, guide) {
      if (amount < 15000) {
        return [
          'Busca unidades Toyota Yaris 100H Hybrid (2017–2020) con libro sellado en taller oficial.',
          'Revisa que la batería híbrida mantenga chequeo de salud oficial para activar Toyota Relax.',
          'Precio objetivo en Barcelona: 11.850 € a 13.990 € al contado.'
        ];
      }
      if (amount < 17900) {
        return [
          'Filtra en portales por Toyota Yaris 120H (2021–2022) acabado Style o Active Tech con <60.000 km.',
          'Comprueba que disponga del sello anual Toyota para mantener garantía Relax hasta 15 años.',
          'Alternativa SUV: Si puedes estirar ~800–1.000 €, compra el Hyundai Kona HEV 2021 (17.900 €).'
        ];
      }
      if (amount < 22000) {
        const saved = Math.max(0, amount - 17900);
        return [
          'Ve a ver el Hyundai Kona Hybrid Maxx 2021 (21.835 km por 17.900 € al contado en Barcelona).',
          'Comprueba la garantía de 12 meses del vendedor y el estado de neumáticos/frenos.',
          saved > 0 ? `Ahorras ${formatEuro(saved)} de tu presupuesto para seguro y combustible durante años.` : 'Operación al contado cerrada en el sweet spot.'
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
            <div class="budget-card-top-pills">
              <span class="budget-badge-winner">Recomendación para ${formatEuro(budgetNum)}</span>
              ${guide.spotlight ? `<span class="budget-spotlight-badge">${escapeHtml(guide.spotlight)}</span>` : ''}
            </div>

            <div class="budget-dual-grid">
              <div class="budget-dual-card budget-dual-card--global">
                <span class="budget-dual-tag">🏆 Mejor global (Conservador / HEV)</span>
                <h3>${escapeHtml(guide.winnerName)}</h3>
                <p class="budget-variant-sub">${escapeHtml(guide.winnerVariant)} · <strong>${escapeHtml(guide.market)}</strong></p>
                <div class="budget-why-section">
                  <strong>💎 Análisis de compra:</strong>
                  <p>${escapeHtml(guide.why)}</p>
                </div>
              </div>

              ${guide.bevWinner ? `
              <div class="budget-dual-card budget-dual-card--bev">
                <span class="budget-dual-tag budget-dual-tag--bev">⚡ Mejor alternativa 100% eléctrica (BEV)</span>
                <h4 class="budget-bev-title">${escapeHtml(guide.bevWinner)}</h4>
                <div class="budget-why-section">
                  <strong>⚡ Enfoque eléctrico:</strong>
                  <p>${escapeHtml(guide.bevWhy || '')}</p>
                </div>
              </div>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="budget-card-body">
          <div class="budget-upgrade-box budget-upgrade--${guide.upgradeDecision}">
            <div class="upgrade-decision-header">
              <span class="upgrade-tag">${decisionLabels[guide.upgradeDecision] || 'CONSEJO'}</span>
              <strong class="upgrade-decision-title">¿Merece la pena pagar más?</strong>
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
      const tableRows = document.querySelectorAll('.budget-row[data-table-budget]');
      tableRows.forEach((row) => {
        const rowBudget = Number(row.dataset.tableBudget);
        if (Math.abs(rowBudget - budgetNum) < 500) {
          row.classList.add('is-selected');
        } else {
          row.classList.remove('is-selected');
        }
      });
    }

    if (budgetRange) {
      budgetRange.addEventListener('input', (e) => updateBudget(e.target.value));
    }

    if (budgetInputNumber) {
      budgetInputNumber.addEventListener('input', (e) => updateBudget(e.target.value));
    }

    sweetSpotBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        updateBudget(btn.dataset.setBudget);
      });
    });

    tldrPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        updateBudget(pill.dataset.setBudget);
      });
    });

    updateBudget(18000);
  }

  function renderCars(items) {
    if (!listContainer || !resultCount || !emptyState) return;

    const count = items.length;
    const visibleItems = catalogueExpanded ? items : items.slice(0, cataloguePreviewLimit);
    const visibleCount = visibleItems.length;
    if (count === 0) {
      resultCount.textContent = '0 coches disponibles con estos filtros';
    } else if (visibleCount < count) {
      resultCount.textContent = `${visibleCount} de ${count} coches visibles`;
    } else {
      resultCount.textContent = `${count} ${count === 1 ? 'coche disponible' : 'coches disponibles'}`;
    }

    if (catalogueToggle) {
      const hiddenCount = Math.max(0, count - cataloguePreviewLimit);
      catalogueToggle.hidden = count <= cataloguePreviewLimit;
      catalogueToggle.setAttribute('aria-expanded', String(catalogueExpanded));
      catalogueToggle.textContent = catalogueExpanded
        ? 'Mostrar selección compacta'
        : `Mostrar ${hiddenCount} más`;
    }

    if (count === 0) {
      listContainer.innerHTML = '';
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    listContainer.innerHTML = visibleItems.map((car) => `
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
          <div class="price-block">
            <span class="price-block__label">${conditionLabel(car)}</span>
            <strong class="price-block__value">${priceDisplay(car)}</strong>
          </div>
          <details class="car-card__details">
            <summary>Ver datos, análisis y fuente <span aria-hidden="true">▾</span></summary>
            <div class="car-card__details-body">
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
              ${car.aidEligible ? `<span class="price-block__aid">Línea 2 Autónomos: potencialmente hasta 6.000 € (RD 609/2026 · pendiente convocatoria)</span>` : ''}
              <p class="car-card__note">${escapeHtml(car.priceNote)}</p>
              ${car.caution ? `<p class="car-card__caution"><strong>Atención:</strong> ${escapeHtml(car.caution)}</p>` : ''}
              <div class="car-card__footer">
                <a href="${car.sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(car.sourceLabel)} <span aria-hidden="true">↗</span></a>
                <time datetime="${car.verifiedAt}">Comprobado: ${formatDate(car.verifiedAt)}</time>
              </div>
            </div>
          </details>
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
    renderWatchlist();

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

    if (catalogueToggle) {
      catalogueToggle.addEventListener('click', () => {
        catalogueExpanded = !catalogueExpanded;
        applyFilters();
      });
    }

    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.open = false;
        });
      });
    }

    document.addEventListener('click', (e) => {
      const expandBtn = e.target.closest('.tier-card__expand-btn');
      if (expandBtn) {
        const card = expandBtn.closest('.tier-card');
        if (card) {
          const isExpanded = card.classList.toggle('is-expanded');
          expandBtn.setAttribute('aria-expanded', String(isExpanded));
          const textSpan = expandBtn.querySelector('.expand-text');
          if (textSpan) {
            textSpan.textContent = isExpanded ? 'Ocultar análisis y contras' : 'Ver análisis, pros y contras';
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
