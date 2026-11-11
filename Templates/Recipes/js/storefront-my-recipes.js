(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: 'my recipes', title: 'My recipes' });
  const root = document.getElementById('my-recipes-root');
  const unlocked = new Set(Store.getUnlockedIds());
  const list = Store.getRecipes().filter((r) => unlocked.has(r.id));

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in">
      <h1 class="peng-section-title">My recipes</h1>
      <p class="peng-section-sub">Recipes unlocked in this browser (purchases, free recipes, and email signup). In a live shop these would also arrive by email.</p>
      ${
        list.length
          ? `<div class="peng-grid-recipes peng-stagger">${list.map(UI.recipeCard).join('')}</div>`
          : `<div class="peng-empty">No unlocked recipes yet. <a href="${F.pageUrl('recipes')}">Buy a recipe</a> or grab the free one from the home page signup.</div>`
      }
    </div>
  `;
  UI.bindAddButtons(root);
})();
