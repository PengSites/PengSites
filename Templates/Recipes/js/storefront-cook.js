(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;
  const Reader = window.PENG_RECIPE_READER;

  UI.initStorefront({ active: 'my recipes', title: 'Cook', stickyCart: false });
  const root = document.getElementById('cook-root');
  const id = new URLSearchParams(location.search).get('id');
  const recipe = Store.getRecipe(id);

  if (!recipe) {
    root.innerHTML = `<div class="peng-container peng-section"><div class="peng-empty">Recipe not found. <a href="${F.pageUrl('my-recipes')}">Back to My recipes</a></div></div>`;
    return;
  }

  if (!Store.isUnlocked(recipe.id)) {
    root.innerHTML = `
      <div class="peng-container peng-section peng-fade-in" style="max-width:32rem">
        <div class="peng-empty">
          <p style="margin:0 0 0.75rem">This recipe isn’t unlocked in your cookbook yet.</p>
          <a class="peng-btn peng-btn-primary" href="${F.pageUrl('recipe')}?id=${encodeURIComponent(recipe.id)}">View in shop</a>
        </div>
      </div>`;
    return;
  }

  document.title = `${recipe.title} — My recipes`;
  Reader.render(root, recipe, { mode: 'library' });
})();
