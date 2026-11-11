(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: 'bundles', title: 'Bundles' });
  const root = document.getElementById('bundles-root');
  const bundles = Store.getBundles();

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in">
      <h1 class="peng-section-title">Bundles</h1>
      <p class="peng-section-sub">Recipe packs at a discount versus buying each recipe alone.</p>
      <div style="display:grid;gap:1.25rem">
        ${bundles
          .map((b) => {
            const recipes = (b.recipeIds || []).map((id) => Store.getRecipe(id)).filter(Boolean);
            const separate = recipes.reduce((s, r) => s + (r.price || 0), 0);
            return `
              <article class="peng-card" style="display:grid;gap:0;overflow:hidden">
                <div style="display:grid;gap:0" class="bundle-row">
                  <div class="peng-card-media" style="border-radius:0;aspect-ratio:16/10">
                    <img src="${F.escapeHtml(F.assetPath(b.image))}" alt="${F.escapeHtml(b.title)}">
                    <span class="peng-price-pill">${F.escapeHtml(F.money(b.price))}</span>
                  </div>
                  <div class="peng-card-body">
                    <h2 style="margin:0;font-size:1.5rem;color:var(--peng-primary)">${F.escapeHtml(b.title)}</h2>
                    <p style="margin:0;color:var(--peng-muted)">${F.escapeHtml(b.description)}</p>
                    <p style="margin:0">
                      <strong style="font-size:1.35rem">${F.escapeHtml(F.money(b.price))}</strong>
                      ${b.compareAtPrice ? `<span style="text-decoration:line-through;color:var(--peng-muted);margin-left:0.4rem">${F.escapeHtml(F.money(b.compareAtPrice))}</span>` : ''}
                      ${separate > b.price ? `<span style="margin-left:0.5rem;font-size:0.8rem;color:var(--peng-accent)">Save ${F.escapeHtml(F.money(separate - b.price))} vs separate</span>` : ''}
                    </p>
                    <ul style="margin:0;padding-left:1.1rem;font-size:0.9rem">
                      ${recipes
                        .map(
                          (r) =>
                            `<li><a href="${F.pageUrl('recipe')}?id=${encodeURIComponent(r.id)}">${F.escapeHtml(r.title)}</a> · ${r.price ? F.escapeHtml(F.money(r.price)) : 'Free'}</li>`
                        )
                        .join('')}
                    </ul>
                    <button type="button" class="peng-btn peng-btn-primary" data-add-bundle="${F.escapeHtml(b.id)}">Add bundle to cart</button>
                  </div>
                </div>
              </article>`;
          })
          .join('')}
      </div>
    </div>
    <style>@media(min-width:800px){.bundle-row{grid-template-columns:0.9fr 1.1fr !important}}</style>
  `;
  UI.bindAddButtons(root);
})();
