(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;
  const Reader = window.PENG_RECIPE_READER;

  const ui = UI.initStorefront({ active: 'recipes', title: 'Recipe' });
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const root = document.getElementById('recipe-root');
  const recipe = Store.getRecipe(id);

  if (!recipe) {
    root.innerHTML = `<div class="peng-container peng-section"><div class="peng-empty">Recipe not found. <a href="${F.pageUrl('recipes')}">Back to recipes</a></div></div>`;
    return;
  }

  document.title = `${recipe.title} — ${Store.getBrand().name}`;
  const unlocked = Store.isUnlocked(recipe.id);

  function related() {
    const cats = new Set(recipe.categoryIds || []);
    return Store.getRecipes()
      .filter((r) => r.id !== recipe.id && (r.categoryIds || []).some((c) => cats.has(c)))
      .slice(0, 3);
  }

  function lockedTeaser() {
    const n = recipe.nutrition || {};
    root.innerHTML = `
      <div class="peng-container peng-section peng-fade-in">
        <a href="${F.pageUrl('recipes')}" style="font-size:0.85rem;color:var(--peng-muted)">← All recipes</a>
        <div style="display:grid;gap:1.75rem;margin-top:1rem" class="recipe-layout">
          <div>
            <div style="border-radius:1.5rem;overflow:hidden;border:1px solid var(--peng-sand);aspect-ratio:4/3;background:var(--peng-sand)">
              <img src="${F.escapeHtml(F.assetPath(recipe.image))}" alt="${F.escapeHtml(recipe.title)}" style="width:100%;height:100%;object-fit:cover">
            </div>
          </div>
          <div>
            <div class="peng-badge-row" style="margin-bottom:0.75rem">
              ${(recipe.badges || []).map((b) => `<span class="peng-badge">${F.escapeHtml(b)}</span>`).join('')}
              ${recipe.time ? `<span class="peng-badge">${F.escapeHtml(recipe.time)}</span>` : ''}
              ${recipe.difficulty ? `<span class="peng-badge">${F.escapeHtml(recipe.difficulty)}</span>` : ''}
            </div>
            <h1 class="font-display" style="margin:0 0 0.75rem;font-size:clamp(1.8rem,4vw,2.6rem);color:var(--peng-primary)">${F.escapeHtml(recipe.title)}</h1>
            <p style="margin:0 0 1rem;color:var(--peng-muted);font-size:1.05rem">${F.escapeHtml(recipe.shortDescription)}</p>
            <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0.5rem;margin-bottom:1.25rem">
              <div class="peng-metric"><div class="label">Cal</div><div class="value" style="font-size:1.1rem">${F.escapeHtml(String(n.calories || '—'))}</div></div>
              <div class="peng-metric"><div class="label">Protein</div><div class="value" style="font-size:1.1rem">${F.escapeHtml(n.protein || '—')}</div></div>
              <div class="peng-metric"><div class="label">Carbs</div><div class="value" style="font-size:1.1rem">${F.escapeHtml(n.carbs || '—')}</div></div>
              <div class="peng-metric"><div class="label">Fat</div><div class="value" style="font-size:1.1rem">${F.escapeHtml(n.fat || '—')}</div></div>
            </div>
            <button type="button" class="peng-btn peng-btn-primary" id="buy-recipe-top">Add to cart — ${F.escapeHtml(F.money(recipe.price))}</button>
          </div>
        </div>

        <div style="margin-top:2rem" class="peng-lock-panel">
          <div class="peng-lock-blur" aria-hidden="true">
            <h3>Ingredients</h3>
            <ul><li>● ● ● ● ●</li><li>● ● ● ●</li><li>● ● ● ● ● ●</li><li>● ● ●</li><li>● ● ● ● ●</li></ul>
            <h3>Steps</h3>
            <ol><li>● ● ● ● ● ● ● ●</li><li>● ● ● ● ● ●</li><li>● ● ● ● ● ● ●</li></ol>
          </div>
          <div class="peng-lock-gate">
            <div class="peng-lock-card">
              <div style="margin-bottom:0.5rem">${UI.icons.lock}</div>
              <h3 style="margin:0 0 0.5rem;color:var(--peng-primary)">Full recipe locked</h3>
              <p style="margin:0 0 1rem;font-size:0.9rem;color:var(--peng-muted)">Detailed ingredients, method, and print access unlock after purchase. Preview shows the photo, description, badges, and nutrition only.</p>
              <button type="button" class="peng-btn peng-btn-primary" style="width:100%" id="buy-recipe">Buy — ${F.escapeHtml(F.money(recipe.price))}</button>
              <a class="peng-btn peng-btn-ghost" style="width:100%;margin-top:0.5rem" href="${F.pageUrl('cart')}">View cart</a>
            </div>
          </div>
        </div>

        ${(recipe.reviews || []).length
          ? `<section style="margin-top:2.5rem">
              <h2 class="peng-section-title" style="font-size:1.6rem">Reviews</h2>
              <div style="display:grid;gap:0.85rem;margin-top:1rem">
                ${recipe.reviews
                  .map(
                    (rev) => `
                  <div class="peng-card" style="padding:1rem 1.15rem">
                    <div class="peng-stars">${F.stars(rev.stars)}</div>
                    <p style="margin:0.5rem 0">${F.escapeHtml(rev.text)}</p>
                    <div style="font-size:0.8rem;color:var(--peng-muted)">${F.escapeHtml(rev.name)} · ${F.escapeHtml(F.formatDate(rev.date))}</div>
                  </div>`
                  )
                  .join('')}
              </div>
            </section>`
          : ''}

        <section style="margin-top:2.5rem">
          <h2 class="peng-section-title" style="font-size:1.6rem">You might also like</h2>
          <div class="peng-grid-recipes peng-stagger" id="related-grid" style="margin-top:1rem"></div>
        </section>
      </div>
      <style>
        @media (min-width:900px){
          .recipe-layout{grid-template-columns:1.1fr 0.9fr !important;align-items:start}
        }
      </style>
    `;

    const relatedEl = document.getElementById('related-grid');
    const rel = related();
    relatedEl.innerHTML = rel.length
      ? rel.map(UI.recipeCard).join('')
      : '<div class="peng-empty">More recipes coming soon.</div>';
    UI.bindAddButtons(relatedEl);

    const buy = () => {
      Store.addToCart({
        type: 'recipe',
        id: recipe.id,
        title: recipe.title,
        price: recipe.price,
        image: recipe.image,
        recipeIds: [recipe.id]
      });
      ui.toast(`Added ${recipe.title}`);
      ui.updateCartBadge();
    };
    document.getElementById('buy-recipe')?.addEventListener('click', buy);
    document.getElementById('buy-recipe-top')?.addEventListener('click', buy);
  }

  function unlockedView() {
    const wrap = document.createElement('div');
    root.innerHTML = '';
    root.appendChild(wrap);
    Reader.render(wrap, recipe, {
      mode: 'storefront',
      backHref: F.pageUrl('recipes'),
      backLabel: 'All recipes'
    });

    const extra = document.createElement('div');
    extra.className = 'peng-container';
    extra.style.paddingBottom = '3rem';
    extra.innerHTML = `
      ${(recipe.reviews || []).length
        ? `<section style="margin-top:0.5rem">
            <h2 class="peng-section-title" style="font-size:1.6rem">Reviews</h2>
            <div style="display:grid;gap:0.85rem;margin-top:1rem">
              ${recipe.reviews
                .map(
                  (rev) => `
                <div class="peng-card" style="padding:1rem 1.15rem">
                  <div class="peng-stars">${F.stars(rev.stars)}</div>
                  <p style="margin:0.5rem 0">${F.escapeHtml(rev.text)}</p>
                  <div style="font-size:0.8rem;color:var(--peng-muted)">${F.escapeHtml(rev.name)} · ${F.escapeHtml(F.formatDate(rev.date))}</div>
                </div>`
                )
                .join('')}
            </div>
          </section>`
        : ''}
      <section style="margin-top:2.5rem">
        <h2 class="peng-section-title" style="font-size:1.6rem">You might also like</h2>
        <div class="peng-grid-recipes peng-stagger" id="related-grid" style="margin-top:1rem"></div>
      </section>
    `;
    root.appendChild(extra);
    const relatedEl = document.getElementById('related-grid');
    const rel = related();
    relatedEl.innerHTML = rel.length
      ? rel.map(UI.recipeCard).join('')
      : '<div class="peng-empty">More recipes coming soon.</div>';
    UI.bindAddButtons(relatedEl);
  }

  if (unlocked) unlockedView();
  else lockedTeaser();
})();
