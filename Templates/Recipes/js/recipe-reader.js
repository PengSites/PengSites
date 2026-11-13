/**
 * Shared cookbook-style recipe reader for My recipes cook view
 * and unlocked storefront recipe pages.
 */
(function (global) {
  function render(root, recipe, options) {
    const F = global.PENG_FORMAT;
    const UI = global.PENG_UI;
    options = options || {};
    if (!root || !recipe) return;

    const r = F.normalizeRecipe(recipe);
    let servings = options.servings || r.servingsBase || 2;
    const mode = options.mode || 'library'; // library | storefront
    const backHref =
      options.backHref ||
      (mode === 'library' ? F.pageUrl('my-recipes') : F.pageUrl('recipes'));
    const backLabel =
      options.backLabel || (mode === 'library' ? 'My recipes' : 'All recipes');

    function ingredientLine(ing) {
      const amount = ing.scalable
        ? F.scaleAmount(ing.amount, r.servingsBase || 2, servings)
        : ing.amount;
      const unit = ing.unit ? ` ${ing.unit}` : '';
      return `<li><strong>${F.escapeHtml(String(amount))}${F.escapeHtml(unit)}</strong><span>${F.escapeHtml(ing.name)}</span></li>`;
    }

    function paint() {
      const n = r.nutrition || {};
      const intro = r.intro || r.shortDescription || '';
      root.innerHTML = `
        <article class="peng-cook peng-fade-in peng-print-mark">
          <a class="peng-cook-back no-print" href="${backHref}">← ${F.escapeHtml(backLabel)}</a>

          <header class="peng-cook-hero">
            <div class="peng-cook-media">
              <img src="${F.escapeHtml(F.assetPath(r.image))}" alt="${F.escapeHtml(r.title)}">
            </div>
            <div class="peng-cook-meta">
              <div class="peng-badge-row">
                ${(r.badges || []).map((b) => `<span class="peng-badge">${F.escapeHtml(b)}</span>`).join('')}
                ${r.difficulty ? `<span class="peng-badge">${F.escapeHtml(r.difficulty)}</span>` : ''}
              </div>
              <h1 class="peng-cook-title">${F.escapeHtml(r.title)}</h1>
              ${intro ? `<p class="peng-cook-intro">${F.escapeHtml(intro)}</p>` : ''}
              <div class="peng-cook-timing">
                ${r.prepTime ? `<div><span class="label">Prep</span><span class="value">${F.escapeHtml(r.prepTime)}</span></div>` : ''}
                ${r.cookTime ? `<div><span class="label">Cook</span><span class="value">${F.escapeHtml(r.cookTime)}</span></div>` : ''}
                <div><span class="label">Total</span><span class="value">${F.escapeHtml(r.time || '—')}</span></div>
                <div><span class="label">Yield</span><span class="value">${servings} serving${servings === 1 ? '' : 's'}</span></div>
              </div>
              ${
                (r.equipment || []).length
                  ? `<div><div class="label" style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--peng-muted);margin-bottom:0.4rem">Equipment</div>
                      <div class="peng-equip-row">${r.equipment
                        .map((e) => `<span class="peng-badge">${F.escapeHtml(e)}</span>`)
                        .join('')}</div></div>`
                  : ''
              }
              <div class="peng-cook-toolbar no-print">
                <span class="peng-label" style="margin:0">Servings</span>
                <button type="button" class="peng-icon-btn" data-cook-serv="-1" aria-label="Fewer servings">−</button>
                <strong data-cook-serv-count>${servings}</strong>
                <button type="button" class="peng-icon-btn" data-cook-serv="1" aria-label="More servings">+</button>
                <button type="button" class="peng-btn peng-btn-ghost" data-cook-print>${UI.icons.print} Print</button>
                ${
                  mode === 'storefront'
                    ? `<a class="peng-btn peng-btn-secondary" href="${F.cookUrl(r.id)}">Open in My recipes</a>`
                    : ''
                }
              </div>
            </div>
          </header>

          <div class="peng-cook-layout">
            <aside class="peng-cook-side">
              <div class="peng-cook-panel">
                <h2>Ingredients</h2>
                <ul class="peng-cook-ingredients">${(r.ingredients || []).map(ingredientLine).join('')}</ul>
              </div>
              <div class="peng-cook-panel" style="margin-top:1rem">
                <h2 style="font-size:1.1rem;margin-bottom:0.75rem">Nutrition</h2>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem">
                  <div class="peng-metric"><div class="label">Calories</div><div class="value" style="font-size:1.15rem">${F.escapeHtml(String(n.calories || '—'))}</div></div>
                  <div class="peng-metric"><div class="label">Protein</div><div class="value" style="font-size:1.15rem">${F.escapeHtml(n.protein || '—')}</div></div>
                  <div class="peng-metric"><div class="label">Carbs</div><div class="value" style="font-size:1.15rem">${F.escapeHtml(n.carbs || '—')}</div></div>
                  <div class="peng-metric"><div class="label">Fat</div><div class="value" style="font-size:1.15rem">${F.escapeHtml(n.fat || '—')}</div></div>
                </div>
                <p style="margin:0.75rem 0 0;font-size:0.75rem;color:var(--peng-muted)">Per serving at the base yield (${r.servingsBase || 2}).</p>
              </div>
            </aside>

            <section class="peng-cook-panel">
              <h2>Method</h2>
              <ol class="peng-cook-steps">
                ${r.steps
                  .map(
                    (s) => `
                  <li class="peng-cook-step">
                    <div>
                      <div class="peng-cook-step-body">${F.escapeHtml(s.text)}</div>
                      ${
                        s.tip
                          ? `<div class="peng-cook-tip"><strong>Tip</strong>${F.escapeHtml(s.tip)}</div>`
                          : ''
                      }
                    </div>
                  </li>`
                  )
                  .join('')}
              </ol>
            </section>
          </div>
        </article>
      `;

      root.querySelectorAll('[data-cook-serv]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const delta = Number(btn.getAttribute('data-cook-serv')) || 0;
          servings = Math.max(1, servings + delta);
          paint();
        });
      });
      root.querySelector('[data-cook-print]')?.addEventListener('click', () => window.print());
    }

    paint();
  }

  function renderPreviewHtml(recipe, servings) {
    const F = global.PENG_FORMAT;
    const r = F.normalizeRecipe(recipe);
    const serve = servings || r.servingsBase || 2;
    const steps = r.steps
      .slice(0, 3)
      .map(
        (s, i) =>
          `<div style="margin-bottom:0.65rem"><strong>${i + 1}.</strong> ${F.escapeHtml(s.text.slice(0, 140))}${s.text.length > 140 ? '…' : ''}</div>`
      )
      .join('');
    return `
      <div style="font-size:0.85rem">
        <div style="font-family:var(--peng-font-heading);font-size:1.25rem;color:var(--peng-primary);margin-bottom:0.35rem">${F.escapeHtml(r.title || 'Untitled recipe')}</div>
        <div style="color:var(--peng-muted);margin-bottom:0.75rem">${F.escapeHtml((r.intro || r.shortDescription || '').slice(0, 160))}</div>
        <div style="margin-bottom:0.5rem"><strong>Yield</strong> ${serve} · <strong>Total</strong> ${F.escapeHtml(r.time || '—')}</div>
        <div style="margin-bottom:0.35rem;font-weight:600">Ingredients (${(r.ingredients || []).length})</div>
        <ul style="margin:0 0 0.75rem;padding-left:1.1rem">${(r.ingredients || [])
          .slice(0, 5)
          .map((ing) => {
            const amount = ing.scalable
              ? F.scaleAmount(ing.amount, r.servingsBase || 2, serve)
              : ing.amount;
            return `<li>${F.escapeHtml(String(amount))} ${F.escapeHtml(ing.unit || '')} ${F.escapeHtml(ing.name)}</li>`;
          })
          .join('')}${(r.ingredients || []).length > 5 ? '<li>…</li>' : ''}</ul>
        <div style="font-weight:600;margin-bottom:0.35rem">Method preview</div>
        ${steps || '<div style="color:var(--peng-muted)">Add steps to preview the cook view.</div>'}
      </div>
    `;
  }

  global.PENG_RECIPE_READER = { render, renderPreviewHtml };
})(window);
