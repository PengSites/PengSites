(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: 'recipes', title: 'All recipes' });

  const state = { q: '', category: 'all' };
  const chips = document.getElementById('category-chips');
  const grid = document.getElementById('recipes-grid');
  const search = document.getElementById('recipe-search');
  const countEl = document.getElementById('recipes-count');

  function renderChips() {
    const cats = Store.getCategories();
    chips.innerHTML =
      `<button type="button" class="peng-chip ${state.category === 'all' ? 'is-active' : ''}" data-cat="all">All</button>` +
      cats
        .map(
          (c) =>
            `<button type="button" class="peng-chip ${state.category === c.id ? 'is-active' : ''}" data-cat="${F.escapeHtml(c.id)}">${F.escapeHtml(c.label)}</button>`
        )
        .join('');
    chips.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.category = btn.getAttribute('data-cat');
        render();
      });
    });
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return Store.getRecipes().filter((r) => {
      const catOk = state.category === 'all' || (r.categoryIds || []).includes(state.category);
      if (!catOk) return false;
      if (!q) return true;
      const hay = [r.title, r.shortDescription, ...(r.badges || [])].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  function render() {
    renderChips();
    const list = filtered();
    countEl.textContent = `${list.length} recipe${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length
      ? list.map(UI.recipeCard).join('')
      : '<div class="peng-empty">No recipes match your filters.</div>';
    UI.bindAddButtons(grid);
  }

  search.addEventListener('input', () => {
    state.q = search.value;
    render();
  });

  render();
})();
