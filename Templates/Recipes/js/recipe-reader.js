/**
 * Shared cookbook / PDF-style recipe reader for My recipes cook view
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
    const mode = options.mode || 'library';
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
      return `<li><span class="peng-book-qty">${F.escapeHtml(String(amount))}${F.escapeHtml(unit)}</span> <span class="peng-book-ing">${F.escapeHtml(ing.name)}</span></li>`;
    }

    function paint() {
      const n = r.nutrition || {};
      const intro = r.intro || r.shortDescription || '';
      const metaBits = [];
      if (r.prepTime) metaBits.push(`Prep ${r.prepTime}`);
      if (r.cookTime) metaBits.push(`Cook ${r.cookTime}`);
      metaBits.push(`Total ${r.time || '—'}`);
      metaBits.push(`Serves ${servings}`);
      if (r.difficulty) metaBits.push(r.difficulty);

      root.innerHTML = `
        <div class="peng-book-shell peng-fade-in">
          <a class="peng-cook-back no-print" href="${backHref}">← ${F.escapeHtml(backLabel)}</a>

          <div class="peng-book-toolbar no-print">
            <div class="peng-book-toolbar-inner">
              <span>Servings</span>
              <button type="button" class="peng-icon-btn" data-cook-serv="-1" aria-label="Fewer servings">−</button>
              <strong data-cook-serv-count>${servings}</strong>
              <button type="button" class="peng-icon-btn" data-cook-serv="1" aria-label="More servings">+</button>
              <button type="button" class="peng-btn peng-btn-ghost" data-cook-print>${UI.icons.print} Print / PDF</button>
              ${
                mode === 'storefront'
                  ? `<a class="peng-btn peng-btn-secondary" href="${F.cookUrl(r.id)}">Open in My recipes</a>`
                  : ''
              }
            </div>
          </div>

          <article class="peng-book-page peng-print-mark">
            <div class="peng-book-hero">
              <img src="${F.escapeHtml(F.assetPath(r.image))}" alt="${F.escapeHtml(r.title)}">
            </div>

            <header class="peng-book-header">
              ${(r.badges || []).length ? `<p class="peng-book-kicker">${(r.badges || []).map((b) => F.escapeHtml(b)).join(' · ')}</p>` : ''}
              <h1 class="peng-book-title">${F.escapeHtml(r.title)}</h1>
              <p class="peng-book-meta">${metaBits.map((b) => F.escapeHtml(b)).join('  ·  ')}</p>
              ${
                (r.equipment || []).length
                  ? `<p class="peng-book-equip"><span>You will need</span> ${r.equipment.map((e) => F.escapeHtml(e)).join(', ')}</p>`
                  : ''
              }
            </header>

            ${intro ? `<p class="peng-book-intro">${F.escapeHtml(intro)}</p>` : ''}

            <hr class="peng-book-rule">

            <section class="peng-book-section">
              <h2 class="peng-book-h2">Ingredients</h2>
              <ul class="peng-book-ingredients">${(r.ingredients || []).map(ingredientLine).join('')}</ul>
            </section>

            <hr class="peng-book-rule">

            <section class="peng-book-section">
              <h2 class="peng-book-h2">Method</h2>
              <ol class="peng-book-steps">
                ${r.steps
                  .map(
                    (s, i) => `
                  <li>
                    <span class="peng-book-stepnum">${i + 1}</span>
                    <div class="peng-book-stepbody">
                      <p>${F.escapeHtml(s.text)}</p>
                      ${s.tip ? `<p class="peng-book-tip"><em>Tip — </em>${F.escapeHtml(s.tip)}</p>` : ''}
                    </div>
                  </li>`
                  )
                  .join('')}
              </ol>
            </section>

            <hr class="peng-book-rule">

            <footer class="peng-book-footer">
              <p class="peng-book-nutrition">
                <strong>Per serving</strong>
                ${F.escapeHtml(String(n.calories || '—'))} cal ·
                ${F.escapeHtml(n.protein || '—')} protein ·
                ${F.escapeHtml(n.carbs || '—')} carbs ·
                ${F.escapeHtml(n.fat || '—')} fat
                <span>(at ${r.servingsBase || 2} servings)</span>
              </p>
            </footer>
          </article>
        </div>
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
      <div class="peng-book-preview-mini">
        <div style="font-family:var(--peng-font-heading);font-size:1.35rem;color:var(--peng-primary);margin-bottom:0.35rem">${F.escapeHtml(r.title || 'Untitled recipe')}</div>
        <div style="font-size:0.8rem;color:var(--peng-muted);margin-bottom:0.75rem;letter-spacing:0.04em;text-transform:uppercase">Serves ${serve} · ${F.escapeHtml(r.time || '—')}</div>
        <div style="color:var(--peng-text);line-height:1.55;margin-bottom:0.85rem;font-size:0.9rem">${F.escapeHtml((r.intro || r.shortDescription || '').slice(0, 180))}${(r.intro || r.shortDescription || '').length > 180 ? '…' : ''}</div>
        <div style="font-family:var(--peng-font-heading);margin-bottom:0.35rem">Ingredients</div>
        <ul style="margin:0 0 0.85rem;padding-left:1.1rem;font-size:0.85rem;line-height:1.55">${(r.ingredients || [])
          .slice(0, 5)
          .map((ing) => {
            const amount = ing.scalable
              ? F.scaleAmount(ing.amount, r.servingsBase || 2, serve)
              : ing.amount;
            return `<li><strong>${F.escapeHtml(String(amount))} ${F.escapeHtml(ing.unit || '')}</strong> ${F.escapeHtml(ing.name)}</li>`;
          })
          .join('')}${(r.ingredients || []).length > 5 ? '<li>…</li>' : ''}</ul>
        <div style="font-family:var(--peng-font-heading);margin-bottom:0.35rem">Method</div>
        <div style="font-size:0.85rem;line-height:1.55">${steps || '<div style="color:var(--peng-muted)">Add steps to preview the page.</div>'}</div>
      </div>
    `;
  }

  global.PENG_RECIPE_READER = { render, renderPreviewHtml };
})(window);
