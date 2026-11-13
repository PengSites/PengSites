(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: 'my recipes', title: 'My recipes' });
  const root = document.getElementById('my-recipes-root');
  const unlocked = new Set(Store.getUnlockedIds());
  const list = Store.getRecipes().filter((r) => unlocked.has(r.id));

  function libraryCard(recipe) {
    const href = F.cookUrl(recipe.id);
    const avg =
      recipe.reviews && recipe.reviews.length
        ? recipe.reviews.reduce((s, r) => s + r.stars, 0) / recipe.reviews.length
        : 0;
    return `
      <article class="peng-card">
        <a href="${href}">
          <div class="peng-card-media">
            <img src="${F.escapeHtml(F.assetPath(recipe.image))}" alt="${F.escapeHtml(recipe.title)}" loading="lazy">
            <span class="peng-free-pill">${!recipe.price ? 'Free' : 'Owned'}</span>
          </div>
        </a>
        <div class="peng-card-body">
          <div class="peng-badge-row">
            ${(recipe.badges || []).slice(0, 3).map((b) => `<span class="peng-badge">${F.escapeHtml(b)}</span>`).join('')}
            ${recipe.time ? `<span class="peng-badge">${F.escapeHtml(recipe.time)}</span>` : ''}
          </div>
          <h3 style="margin:0;font-size:1.15rem;color:var(--peng-primary)">
            <a href="${href}">${F.escapeHtml(recipe.title)}</a>
          </h3>
          <p style="margin:0;font-size:0.875rem;color:var(--peng-muted);flex:1">${F.escapeHtml(recipe.shortDescription)}</p>
          ${avg ? `<div class="peng-stars">${F.stars(avg)}</div>` : ''}
          <a class="peng-btn peng-btn-secondary" style="width:100%" href="${href}">Open cookbook view</a>
        </div>
      </article>
    `;
  }

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in">
      <h1 class="peng-section-title">My recipes</h1>
      <p class="peng-section-sub">Your private cookbook. Tap <strong>Open cookbook view</strong> on a recipe to read the full book-style page. Free recipes always appear here; paid ones show up after you buy them (Reset demo clears purchases).</p>
      ${
        list.length
          ? `<div class="peng-grid-recipes peng-stagger">${list.map(libraryCard).join('')}</div>`
          : `<div class="peng-empty">No recipes in your cookbook yet. <a href="${F.pageUrl('recipes')}">Browse the shop</a> — the free Rainbow Grain Bowl should appear here automatically.</div>`
      }
    </div>
  `;
})();
