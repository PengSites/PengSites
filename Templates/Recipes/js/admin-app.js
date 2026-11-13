(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;
  const Config = window.PENG_CONFIG;

  UI.applyTheme();
  // Light chrome for admin: watermarks + reset, custom header
  const demo = Config.demo || {};
  if (!document.querySelector('.peng-watermark-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'peng-watermark-overlay';
    overlay.innerHTML = `<div class="tile">${Array.from({ length: 36 }, () => `<span>${F.escapeHtml(demo.watermarkText || 'PengSites DEMO')}</span>`).join('')}</div>`;
    document.body.appendChild(overlay);
  }
  if (!document.querySelector('.peng-corner-badge')) {
    const b = document.createElement('div');
    b.className = 'peng-corner-badge';
    b.textContent = demo.watermarkText || 'PengSites DEMO';
    document.body.appendChild(b);
  }
  if (!document.querySelector('.peng-reset-fab')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'peng-reset-fab';
    btn.textContent = demo.resetLabel || 'Reset demo';
    btn.addEventListener('click', () => {
      if (confirm('Reset this demo on this device?')) {
        Store.resetDemo();
        location.reload();
      }
    });
    document.body.appendChild(btn);
  }

  const brand = Store.getBrand();
  document.title = `Admin — ${brand.name}`;
  document.getElementById('admin-top').innerHTML = `
    <header class="peng-header">
      <div class="peng-header-inner">
        <div class="peng-brand">
          <span class="peng-avatar">${F.escapeHtml(brand.initials || 'C')}</span>
          <div>
            <div style="font-family:var(--peng-font-heading);font-weight:700">Creator admin</div>
            <div style="font-size:0.72rem;color:var(--peng-muted)">${F.escapeHtml(brand.name)}</div>
          </div>
        </div>
        <div class="peng-header-actions">
          <a class="peng-btn peng-btn-ghost" href="${F.pageUrl('')}">← Storefront</a>
          <button type="button" class="peng-btn peng-btn-admin" id="admin-reset">${F.escapeHtml(demo.resetLabel || 'Reset demo')}</button>
        </div>
      </div>
    </header>
  `;
  document.getElementById('admin-reset').addEventListener('click', () => {
    if (confirm('Reset this demo on this device?')) {
      Store.resetDemo();
      location.reload();
    }
  });

  const sections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'recipes', label: 'Recipes' },
    { id: 'editor', label: 'Recipe editor' },
    { id: 'bundles', label: 'Bundles' },
    { id: 'discounts', label: 'Discount codes' },
    { id: 'subscribers', label: 'Subscribers' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'settings', label: 'Settings' }
  ];

  let current = (location.hash || '#dashboard').replace('#', '') || 'dashboard';
  let editingId = null;

  const nav = document.getElementById('admin-nav');
  const content = document.getElementById('admin-content');

  function setSection(id) {
    current = id;
    location.hash = id;
    render();
  }

  nav.innerHTML = sections
    .map((s) => `<button type="button" data-section="${s.id}">${s.label}</button>`)
    .join('');
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-section]');
    if (!btn) return;
    editingId = null;
    setSection(btn.getAttribute('data-section'));
  });

  function navActive() {
    nav.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('is-active', b.getAttribute('data-section') === current);
    });
  }

  function chartBars(values) {
    const max = Math.max(1, ...values);
    return `<div class="peng-chart">${values
      .map((v) => `<div class="peng-chart-bar" style="height:${Math.max(4, (v / max) * 100)}%" title="${v}"></div>`)
      .join('')}</div>`;
  }

  function renderDashboard() {
    const s = Store.salesSummary();
    const orders = Store.getOrders();
    const byDay = {};
    orders.forEach((o) => {
      const d = o.createdAt.slice(0, 10);
      byDay[d] = (byDay[d] || 0) + o.total;
    });
    const days = Object.keys(byDay).sort().slice(-14);
    const values = days.length ? days.map((d) => byDay[d]) : [0, 0, 0, 0, 0, 0, 0];
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Dashboard</h1>
        <p class="peng-section-sub">Buy something on the storefront — it shows up here instantly (this browser only).</p>
        <div class="peng-metric-grid" style="margin-bottom:1.25rem">
          <div class="peng-metric"><div class="label">Orders</div><div class="value">${s.orderCount}</div></div>
          <div class="peng-metric"><div class="label">Gross sales</div><div class="value">${F.escapeHtml(F.money(s.gross))}</div></div>
          <div class="peng-metric"><div class="label">After ${F.escapeHtml((Config.demo && Config.demo.platformFeeLabel) || 'PengSites')} (${Store.getFees().platformFeePercent}%)</div><div class="value">${F.escapeHtml(F.money(s.afterPlatform))}</div></div>
          <div class="peng-metric"><div class="label">Earned last ${s.cadenceDays} days</div><div class="value">${F.escapeHtml(F.money(s.periodNet))}</div></div>
        </div>
        <div class="peng-metric-grid" style="margin-bottom:1.25rem">
          <div class="peng-metric"><div class="label">Visitors</div><div class="value">${s.visitors}</div></div>
          <div class="peng-metric"><div class="label">Subscribers</div><div class="value">${s.subscribers}</div></div>
          <div class="peng-metric"><div class="label">Period orders</div><div class="value">${s.periodOrderCount}</div></div>
          <div class="peng-metric"><div class="label">Creator net (all time)</div><div class="value">${F.escapeHtml(F.money(s.creatorNet))}</div></div>
        </div>
        <div class="peng-card" style="padding:1.15rem;margin-bottom:1.25rem">
          <h2 style="margin:0 0 0.5rem;font-size:1.1rem">Sales (recent)</h2>
          ${chartBars(values)}
        </div>
        <div class="peng-card" style="padding:1.15rem">
          <h2 style="margin:0 0 0.75rem;font-size:1.1rem">Top recipes</h2>
          ${
            s.topRecipes.length
              ? `<ol style="margin:0;padding-left:1.1rem">${s.topRecipes.map((r) => `<li>${F.escapeHtml(r.title)} · ${r.count}</li>`).join('')}</ol>`
              : '<div class="peng-empty">No sales yet — purchase a recipe on the storefront.</div>'
          }
        </div>
      </div>
    `;
  }

  function renderOrders() {
    const orders = Store.getOrders();
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Orders</h1>
        <p class="peng-section-sub">Every demo checkout lands here.</p>
        ${
          orders.length
            ? `<div style="overflow:auto"><table class="peng-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th></tr></thead>
                <tbody>
                  ${orders
                    .map(
                      (o) => `
                    <tr>
                      <td>${F.escapeHtml(o.id)}</td>
                      <td>${F.escapeHtml(o.name)}<div style="color:var(--peng-muted);font-size:0.8rem">${F.escapeHtml(o.email)}</div></td>
                      <td>${o.items.map((i) => F.escapeHtml(i.title)).join(', ')}</td>
                      <td>${F.escapeHtml(F.moneyExact(o.total))}</td>
                      <td>${F.escapeHtml(F.formatDate(o.createdAt))}</td>
                    </tr>`
                    )
                    .join('')}
                </tbody>
              </table></div>`
            : '<div class="peng-empty">No orders yet.</div>'
        }
      </div>
    `;
  }

  function renderRecipes() {
    const recipes = Store.getRecipes();
    content.innerHTML = `
      <div class="peng-fade-in">
        <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center;flex-wrap:wrap">
          <div>
            <h1 class="peng-section-title" style="font-size:1.8rem;margin-bottom:0.25rem">Recipes</h1>
            <p class="peng-section-sub" style="margin:0">Edits stay on this device and update the storefront immediately.</p>
          </div>
          <button type="button" class="peng-btn peng-btn-primary" id="new-recipe">New recipe</button>
        </div>
        <div style="overflow:auto;margin-top:1rem">
          <table class="peng-table">
            <thead><tr><th>Recipe</th><th>Price</th><th>Categories</th><th></th></tr></thead>
            <tbody>
              ${recipes
                .map(
                  (r) => `
                <tr>
                  <td><strong>${F.escapeHtml(r.title)}</strong></td>
                  <td>${!r.price ? 'Free' : F.escapeHtml(F.money(r.price))}</td>
                  <td>${(r.categoryIds || []).join(', ')}</td>
                  <td style="white-space:nowrap">
                    <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.35rem 0.7rem" data-edit="${F.escapeHtml(r.id)}">Edit</button>
                    <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.35rem 0.7rem" data-del="${F.escapeHtml(r.id)}">Delete</button>
                  </td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    document.getElementById('new-recipe').addEventListener('click', () => {
      editingId = null;
      setSection('editor');
    });
    content.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        editingId = btn.getAttribute('data-edit');
        setSection('editor');
      });
    });
    content.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this recipe from the local demo overlay?')) {
          Store.deleteRecipe(btn.getAttribute('data-del'));
          UI.toast('Recipe deleted locally');
          renderRecipes();
        }
      });
    });
  }

  function renderEditor() {
    const existing = editingId && Store.getRecipe(editingId);
    const normalized = existing ? F.normalizeRecipe(existing) : null;
    const state = {
      id: (normalized && normalized.id) || '',
      title: (normalized && normalized.title) || '',
      shortDescription: (normalized && normalized.shortDescription) || '',
      intro: (normalized && normalized.intro) || '',
      categoryIds: (normalized && normalized.categoryIds) || [],
      price: normalized ? normalized.price : 9,
      badges: (normalized && normalized.badges) || [],
      nutrition: (normalized && normalized.nutrition) || { calories: '', protein: '', carbs: '', fat: '' },
      image: (normalized && normalized.image) || 'images/recipes/garlic-herb-pasta.jpg',
      servingsBase: (normalized && normalized.servingsBase) || 4,
      prepTime: (normalized && normalized.prepTime) || '',
      cookTime: (normalized && normalized.cookTime) || '',
      time: (normalized && normalized.time) || '30 min',
      difficulty: (normalized && normalized.difficulty) || 'Easy',
      featured: !!(normalized && normalized.featured),
      equipment: (normalized && normalized.equipment) || [],
      ingredients:
        normalized && normalized.ingredients.length
          ? normalized.ingredients.map((i) => Object.assign({}, i))
          : [{ amount: 1, unit: '', name: '', scalable: true }],
      steps:
        normalized && normalized.steps.length
          ? normalized.steps.map((s) => Object.assign({}, s))
          : [{ text: '', tip: '' }],
      reviews: (normalized && normalized.reviews) || []
    };
    const cats = Store.getCategories();

    function collectDraft(form) {
      const fd = new FormData(form);
      const categoryIds = [...form.querySelectorAll('input[name="categoryIds"]:checked')].map((i) => i.value);
      const ingredients = [...form.querySelectorAll('[data-ing-row]')].map((row) => {
        const amountRaw = row.querySelector('[data-ing-amount]').value.trim();
        const amountNum = Number(amountRaw);
        return {
          amount: amountRaw === '' || Number.isNaN(amountNum) ? amountRaw : amountNum,
          unit: row.querySelector('[data-ing-unit]').value.trim(),
          name: row.querySelector('[data-ing-name]').value.trim(),
          scalable: row.querySelector('[data-ing-scalable]').checked
        };
      }).filter((i) => i.name);
      const steps = [...form.querySelectorAll('[data-step-card]')].map((card) => ({
        text: card.querySelector('[data-step-text]').value.trim(),
        tip: card.querySelector('[data-step-tip]').value.trim()
      })).filter((s) => s.text);
      return {
        id: editingId || state.id || F.slugify(fd.get('title')),
        title: fd.get('title'),
        shortDescription: fd.get('shortDescription'),
        intro: fd.get('intro'),
        categoryIds,
        price: Number(fd.get('price')) || 0,
        badges: String(fd.get('badges') || '')
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean),
        nutrition: {
          calories: fd.get('calories'),
          protein: fd.get('protein'),
          carbs: fd.get('carbs'),
          fat: fd.get('fat')
        },
        image: fd.get('image'),
        servingsBase: Number(fd.get('servingsBase')) || 2,
        prepTime: fd.get('prepTime'),
        cookTime: fd.get('cookTime'),
        time: fd.get('time'),
        difficulty: fd.get('difficulty'),
        featured: !!fd.get('featured'),
        equipment: String(fd.get('equipment') || '')
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean),
        ingredients,
        steps,
        reviews: state.reviews || []
      };
    }

    function paintPreview(form) {
      const box = document.getElementById('editor-preview');
      if (!box || !window.PENG_RECIPE_READER) return;
      const draft = collectDraft(form);
      box.innerHTML = window.PENG_RECIPE_READER.renderPreviewHtml(draft, draft.servingsBase);
    }

    function ingredientRowsHtml() {
      return state.ingredients
        .map(
          (ing, idx) => `
        <div class="peng-builder-row" data-ing-row>
          <input class="peng-input" data-ing-amount placeholder="Amt" value="${F.escapeHtml(String(ing.amount ?? ''))}">
          <input class="peng-input" data-ing-unit placeholder="Unit" value="${F.escapeHtml(ing.unit || '')}">
          <input class="peng-input" data-ing-name placeholder="Ingredient name" value="${F.escapeHtml(ing.name || '')}">
          <label style="font-size:0.75rem;display:inline-flex;gap:0.25rem;align-items:center;white-space:nowrap">
            <input type="checkbox" data-ing-scalable ${ing.scalable !== false ? 'checked' : ''}> Scale
          </label>
          <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.4rem 0.6rem" data-ing-remove="${idx}">✕</button>
        </div>`
        )
        .join('');
    }

    function stepCardsHtml() {
      return state.steps
        .map(
          (step, idx) => `
        <div class="peng-step-card" data-step-card>
          <div class="peng-step-card-head">
            <strong>Step ${idx + 1}</strong>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.3rem 0.55rem" data-step-up="${idx}" ${idx === 0 ? 'disabled' : ''}>↑</button>
              <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.3rem 0.55rem" data-step-down="${idx}" ${idx === state.steps.length - 1 ? 'disabled' : ''}>↓</button>
              <button type="button" class="peng-btn peng-btn-ghost" style="padding:0.3rem 0.55rem" data-step-remove="${idx}">Delete</button>
            </div>
          </div>
          <textarea class="peng-textarea" data-step-text rows="5" placeholder="Write a detailed step with exact amounts, heat, timing, and doneness cues…">${F.escapeHtml(step.text || '')}</textarea>
          <input class="peng-input" style="margin-top:0.5rem" data-step-tip placeholder="Optional tip (shown under the step)" value="${F.escapeHtml(step.tip || '')}">
        </div>`
        )
        .join('');
    }

    function syncStateFromForm(form) {
      const draft = collectDraft(form);
      state.title = draft.title;
      state.shortDescription = draft.shortDescription;
      state.intro = draft.intro;
      state.categoryIds = draft.categoryIds;
      state.price = draft.price;
      state.badges = draft.badges;
      state.nutrition = draft.nutrition;
      state.image = draft.image;
      state.servingsBase = draft.servingsBase;
      state.prepTime = draft.prepTime;
      state.cookTime = draft.cookTime;
      state.time = draft.time;
      state.difficulty = draft.difficulty;
      state.featured = draft.featured;
      state.equipment = draft.equipment;
      state.ingredients = draft.ingredients.length
        ? draft.ingredients
        : [{ amount: 1, unit: '', name: '', scalable: true }];
      state.steps = draft.steps.length ? draft.steps : [{ text: '', tip: '' }];
    }

    function mount() {
      content.innerHTML = `
        <div class="peng-fade-in">
          <h1 class="peng-section-title" style="font-size:1.8rem">${editingId ? 'Edit recipe' : 'New recipe'}</h1>
          <p class="peng-section-sub">Write cookbook-level steps with exact amounts. Preview updates as you edit (this browser only).</p>
          <div class="peng-editor-grid">
            <form id="recipe-form" class="peng-card" style="padding:1.25rem">
              <div class="peng-field"><label class="peng-label">Title</label><input class="peng-input" name="title" required value="${F.escapeHtml(state.title)}"></div>
              <div class="peng-field"><label class="peng-label">Short description (cards / shop teaser)</label><textarea class="peng-textarea" name="shortDescription" rows="2" required>${F.escapeHtml(state.shortDescription)}</textarea></div>
              <div class="peng-field"><label class="peng-label">Intro (cookbook story)</label><textarea class="peng-textarea" name="intro" rows="4" placeholder="1–3 short paragraphs readers see in the cook view">${F.escapeHtml(state.intro)}</textarea></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
                <div class="peng-field"><label class="peng-label">Price (0 = free)</label><input class="peng-input" name="price" type="number" min="0" step="0.01" value="${state.price || 0}"></div>
                <div class="peng-field"><label class="peng-label">Image path</label><input class="peng-input" name="image" value="${F.escapeHtml(state.image || '')}"></div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0.75rem">
                <div class="peng-field"><label class="peng-label">Prep</label><input class="peng-input" name="prepTime" value="${F.escapeHtml(state.prepTime || '')}" placeholder="10 min"></div>
                <div class="peng-field"><label class="peng-label">Cook</label><input class="peng-input" name="cookTime" value="${F.escapeHtml(state.cookTime || '')}" placeholder="20 min"></div>
                <div class="peng-field"><label class="peng-label">Total</label><input class="peng-input" name="time" value="${F.escapeHtml(state.time || '')}"></div>
                <div class="peng-field"><label class="peng-label">Servings base</label><input class="peng-input" name="servingsBase" type="number" min="1" value="${state.servingsBase || 2}"></div>
              </div>
              <div class="peng-field"><label class="peng-label">Difficulty</label><input class="peng-input" name="difficulty" value="${F.escapeHtml(state.difficulty || '')}"></div>
              <div class="peng-field">
                <label class="peng-label">Categories</label>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
                  ${cats
                    .map(
                      (c) => `
                    <label style="display:inline-flex;gap:0.3rem;align-items:center;font-size:0.85rem">
                      <input type="checkbox" name="categoryIds" value="${F.escapeHtml(c.id)}" ${state.categoryIds.includes(c.id) ? 'checked' : ''}> ${F.escapeHtml(c.label)}
                    </label>`
                    )
                    .join('')}
                </div>
              </div>
              <div class="peng-field"><label class="peng-label">Badges (comma-separated)</label><input class="peng-input" name="badges" value="${F.escapeHtml(state.badges.join(', '))}"></div>
              <div class="peng-field"><label class="peng-label">Equipment (comma-separated)</label><input class="peng-input" name="equipment" value="${F.escapeHtml(state.equipment.join(', '))}" placeholder="Large skillet, Whisk, Mixing bowls"></div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem">
                <div class="peng-field"><label class="peng-label">Calories</label><input class="peng-input" name="calories" value="${F.escapeHtml(String(state.nutrition.calories || ''))}"></div>
                <div class="peng-field"><label class="peng-label">Protein</label><input class="peng-input" name="protein" value="${F.escapeHtml(state.nutrition.protein || '')}"></div>
                <div class="peng-field"><label class="peng-label">Carbs</label><input class="peng-input" name="carbs" value="${F.escapeHtml(state.nutrition.carbs || '')}"></div>
                <div class="peng-field"><label class="peng-label">Fat</label><input class="peng-input" name="fat" value="${F.escapeHtml(state.nutrition.fat || '')}"></div>
              </div>
              <label style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem"><input type="checkbox" name="featured" ${state.featured ? 'checked' : ''}> Featured on home</label>

              <div class="peng-field">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;margin-bottom:0.5rem">
                  <label class="peng-label" style="margin:0">Ingredients</label>
                  <button type="button" class="peng-btn peng-btn-ghost" id="add-ingredient">Add ingredient</button>
                </div>
                <div id="ingredient-rows">${ingredientRowsHtml()}</div>
              </div>

              <div class="peng-field">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;margin-bottom:0.5rem">
                  <label class="peng-label" style="margin:0">Method steps</label>
                  <button type="button" class="peng-btn peng-btn-ghost" id="add-step">Add step</button>
                </div>
                <div id="step-cards">${stepCardsHtml()}</div>
              </div>

              <button class="peng-btn peng-btn-primary" type="submit">Save recipe</button>
            </form>

            <aside class="peng-editor-preview">
              <div class="peng-card" style="padding:1.15rem">
                <h2 style="margin:0 0 0.75rem;font-size:1.1rem;color:var(--peng-primary)">Cookbook preview</h2>
                <div id="editor-preview"></div>
              </div>
            </aside>
          </div>
        </div>
      `;

      const form = document.getElementById('recipe-form');

      form.addEventListener('input', () => paintPreview(form));
      form.addEventListener('change', () => paintPreview(form));

      document.getElementById('add-ingredient').addEventListener('click', () => {
        syncStateFromForm(form);
        state.ingredients.push({ amount: 1, unit: '', name: '', scalable: true });
        mount();
      });
      document.getElementById('add-step').addEventListener('click', () => {
        syncStateFromForm(form);
        state.steps.push({ text: '', tip: '' });
        mount();
      });

      form.querySelectorAll('[data-ing-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
          syncStateFromForm(form);
          const idx = Number(btn.getAttribute('data-ing-remove'));
          state.ingredients.splice(idx, 1);
          if (!state.ingredients.length) state.ingredients.push({ amount: 1, unit: '', name: '', scalable: true });
          mount();
        });
      });

      form.querySelectorAll('[data-step-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
          syncStateFromForm(form);
          const idx = Number(btn.getAttribute('data-step-remove'));
          state.steps.splice(idx, 1);
          if (!state.steps.length) state.steps.push({ text: '', tip: '' });
          mount();
        });
      });

      form.querySelectorAll('[data-step-up]').forEach((btn) => {
        btn.addEventListener('click', () => {
          syncStateFromForm(form);
          const idx = Number(btn.getAttribute('data-step-up'));
          if (idx <= 0) return;
          const tmp = state.steps[idx - 1];
          state.steps[idx - 1] = state.steps[idx];
          state.steps[idx] = tmp;
          mount();
        });
      });

      form.querySelectorAll('[data-step-down]').forEach((btn) => {
        btn.addEventListener('click', () => {
          syncStateFromForm(form);
          const idx = Number(btn.getAttribute('data-step-down'));
          if (idx >= state.steps.length - 1) return;
          const tmp = state.steps[idx + 1];
          state.steps[idx + 1] = state.steps[idx];
          state.steps[idx] = tmp;
          mount();
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const draft = collectDraft(form);
        if (!draft.steps.length) {
          UI.toast('Add at least one method step');
          return;
        }
        if (!draft.ingredients.length) {
          UI.toast('Add at least one ingredient');
          return;
        }
        const saved = Store.upsertRecipe(draft);
        editingId = saved.id;
        UI.toast('Saved — live on storefront & My recipes in this browser');
        setSection('recipes');
      });

      paintPreview(form);
    }

    mount();
  }

  function renderBundles() {
    const bundles = Store.getBundles();
    const recipes = Store.getRecipes();
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Bundles</h1>
        <p class="peng-section-sub">Build packs of recipes sold together.</p>
        <div style="display:grid;gap:1rem;margin-bottom:1.5rem">
          ${bundles
            .map(
              (b) => `
            <div class="peng-card" style="padding:1rem;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
              <div>
                <strong>${F.escapeHtml(b.title)}</strong>
                <div style="font-size:0.85rem;color:var(--peng-muted)">${(b.recipeIds || []).length} recipes · ${F.escapeHtml(F.money(b.price))}</div>
              </div>
              <button type="button" class="peng-btn peng-btn-ghost" data-del-bundle="${F.escapeHtml(b.id)}">Delete</button>
            </div>`
            )
            .join('')}
        </div>
        <form id="bundle-form" class="peng-card" style="padding:1.25rem;max-width:40rem">
          <h2 style="margin:0 0 1rem;font-size:1.15rem">New bundle</h2>
          <div class="peng-field"><label class="peng-label">Title</label><input class="peng-input" name="title" required></div>
          <div class="peng-field"><label class="peng-label">Description</label><textarea class="peng-textarea" name="description" rows="2" required></textarea></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
            <div class="peng-field"><label class="peng-label">Price</label><input class="peng-input" name="price" type="number" min="0" step="0.01" required></div>
            <div class="peng-field"><label class="peng-label">Compare-at price</label><input class="peng-input" name="compareAtPrice" type="number" min="0" step="0.01"></div>
          </div>
          <div class="peng-field"><label class="peng-label">Image path</label><input class="peng-input" name="image" value="images/bundles/weeknight.jpg"></div>
          <div class="peng-field">
            <label class="peng-label">Recipes in bundle</label>
            <div style="display:grid;gap:0.35rem;max-height:12rem;overflow:auto;border:1px solid var(--peng-sand);border-radius:0.85rem;padding:0.75rem">
              ${recipes
                .map(
                  (r) => `
                <label style="display:flex;gap:0.45rem;align-items:center;font-size:0.875rem">
                  <input type="checkbox" name="recipeIds" value="${F.escapeHtml(r.id)}"> ${F.escapeHtml(r.title)}
                </label>`
                )
                .join('')}
            </div>
          </div>
          <button class="peng-btn peng-btn-primary" type="submit">Create bundle</button>
        </form>
      </div>
    `;
    content.querySelectorAll('[data-del-bundle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Store.deleteBundle(btn.getAttribute('data-del-bundle'));
        UI.toast('Bundle deleted locally');
        renderBundles();
      });
    });
    document.getElementById('bundle-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const recipeIds = [...e.target.querySelectorAll('input[name="recipeIds"]:checked')].map((i) => i.value);
      if (!recipeIds.length) {
        UI.toast('Pick at least one recipe');
        return;
      }
      Store.upsertBundle({
        id: F.slugify(fd.get('title')),
        title: fd.get('title'),
        description: fd.get('description'),
        price: Number(fd.get('price')) || 0,
        compareAtPrice: Number(fd.get('compareAtPrice')) || null,
        image: fd.get('image'),
        recipeIds
      });
      UI.toast('Bundle saved');
      renderBundles();
    });
  }

  function renderDiscounts() {
    const codes = Store.getDiscountCodes();
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Discount codes</h1>
        <div style="overflow:auto;margin-bottom:1.25rem">
          <table class="peng-table">
            <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Active</th><th></th></tr></thead>
            <tbody>
              ${codes
                .map(
                  (d) => `
                <tr>
                  <td>${F.escapeHtml(d.code)}</td>
                  <td>${F.escapeHtml(d.type)}</td>
                  <td>${d.type === 'percent' ? d.value + '%' : F.escapeHtml(F.money(d.value))}</td>
                  <td>${d.active === false ? 'No' : 'Yes'}</td>
                  <td><button type="button" class="peng-btn peng-btn-ghost" style="padding:0.3rem 0.6rem" data-del-code="${F.escapeHtml(d.code)}">Delete</button></td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
        <form id="discount-form" class="peng-card" style="padding:1.25rem;max-width:28rem">
          <h2 style="margin:0 0 1rem;font-size:1.1rem">Add code</h2>
          <div class="peng-field"><label class="peng-label">Code</label><input class="peng-input" name="code" required placeholder="SAVE15"></div>
          <div class="peng-field">
            <label class="peng-label">Type</label>
            <select class="peng-select" name="type"><option value="percent">Percent</option><option value="fixed">Fixed ${F.escapeHtml(Store.getCurrency().symbol)}</option></select>
          </div>
          <div class="peng-field"><label class="peng-label">Value</label><input class="peng-input" name="value" type="number" min="0" step="0.01" required></div>
          <button class="peng-btn peng-btn-primary" type="submit">Save code</button>
        </form>
      </div>
    `;
    content.querySelectorAll('[data-del-code]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Store.deleteDiscount(btn.getAttribute('data-del-code'));
        renderDiscounts();
      });
    });
    document.getElementById('discount-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Store.upsertDiscount({
        code: fd.get('code'),
        type: fd.get('type'),
        value: Number(fd.get('value')),
        active: true
      });
      UI.toast('Discount saved');
      renderDiscounts();
    });
  }

  function renderSubscribers() {
    const list = Store.getSubscribers();
    content.innerHTML = `
      <div class="peng-fade-in">
        <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:center">
          <div>
            <h1 class="peng-section-title" style="font-size:1.8rem;margin-bottom:0.25rem">Subscribers</h1>
            <p class="peng-section-sub" style="margin:0">${list.length} emails captured in this demo.</p>
          </div>
          <button type="button" class="peng-btn peng-btn-primary" id="export-csv">Export CSV</button>
        </div>
        ${
          list.length
            ? `<div style="overflow:auto;margin-top:1rem"><table class="peng-table">
                <thead><tr><th>Email</th><th>Source</th><th>Joined</th></tr></thead>
                <tbody>${list
                  .map(
                    (s) =>
                      `<tr><td>${F.escapeHtml(s.email)}</td><td>${F.escapeHtml(s.source)}</td><td>${F.escapeHtml(F.formatDate(s.createdAt))}</td></tr>`
                  )
                  .join('')}</tbody>
              </table></div>`
            : '<div class="peng-empty" style="margin-top:1rem">No subscribers yet. Use the free-recipe signup on the home page.</div>'
        }
      </div>
    `;
    document.getElementById('export-csv')?.addEventListener('click', () => {
      const rows = [['email', 'source', 'createdAt']].concat(list.map((s) => [s.email, s.source, s.createdAt]));
      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'subscribers.csv';
      a.click();
    });
  }

  function renderPayouts() {
    const payouts = Store.buildPayouts();
    const fee = Store.getFees();
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Payouts</h1>
        <p class="peng-section-sub">Creators are paid every ${fee.payoutCadenceDays} days. Each row shows gross sales, PengSites share (${fee.platformFeePercent}%), processing fees, and your net.</p>
        <div style="overflow:auto">
          <table class="peng-table">
            <thead>
              <tr>
                <th>Period</th><th>Orders</th><th>Gross</th><th>PengSites</th><th>Processing</th><th>You earn</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${payouts
                .map(
                  (p) => `
                <tr style="${p.status === 'current' ? 'background:color-mix(in srgb, var(--peng-accent) 8%, transparent)' : ''}">
                  <td>${F.escapeHtml(F.formatDateShort(p.periodStart))} – ${F.escapeHtml(F.formatDateShort(p.periodEnd))}</td>
                  <td>${p.orderCount || 0}</td>
                  <td>${F.escapeHtml(F.moneyExact(p.gross))}</td>
                  <td>${F.escapeHtml(F.moneyExact(p.platformFee))}</td>
                  <td>${F.escapeHtml(F.moneyExact(p.processingFee))}</td>
                  <td><strong>${F.escapeHtml(F.moneyExact(p.creatorNet))}</strong></td>
                  <td>${F.escapeHtml(p.status)}</td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderSettings() {
    const b = Store.getBrand();
    const t = Store.getTheme();
    content.innerHTML = `
      <div class="peng-fade-in">
        <h1 class="peng-section-title" style="font-size:1.8rem">Settings</h1>
        <p class="peng-section-sub">Brand changes apply to the storefront in this browser right away. They do not edit the hosted config file.</p>
        <form id="settings-form" class="peng-card" style="padding:1.25rem;max-width:40rem">
          <div class="peng-field"><label class="peng-label">Brand name</label><input class="peng-input" name="name" value="${F.escapeHtml(b.name)}"></div>
          <div class="peng-field"><label class="peng-label">Handle</label><input class="peng-input" name="handle" value="${F.escapeHtml(b.handle)}"></div>
          <div class="peng-field"><label class="peng-label">Initials</label><input class="peng-input" name="initials" value="${F.escapeHtml(b.initials || '')}"></div>
          <div class="peng-field"><label class="peng-label">Bio</label><textarea class="peng-textarea" name="bio" rows="3">${F.escapeHtml(b.bio || '')}</textarea></div>
          <div class="peng-field"><label class="peng-label">Hero title</label><input class="peng-input" name="heroTitle" value="${F.escapeHtml(b.heroTitle || '')}"></div>
          <div class="peng-field"><label class="peng-label">Avatar image path</label><input class="peng-input" name="avatarImage" value="${F.escapeHtml(b.avatarImage || '')}"></div>
          <div class="peng-field"><label class="peng-label">Hero image path</label><input class="peng-input" name="heroImage" value="${F.escapeHtml(b.heroImage || '')}"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
            <div class="peng-field"><label class="peng-label">Primary color</label><input class="peng-input" name="primary" type="color" value="${F.escapeHtml(t.colors.primary)}"></div>
            <div class="peng-field"><label class="peng-label">Accent color</label><input class="peng-input" name="accent" type="color" value="${F.escapeHtml(t.colors.accent)}"></div>
            <div class="peng-field"><label class="peng-label">Background</label><input class="peng-input" name="bg" type="color" value="${F.escapeHtml(t.colors.bg)}"></div>
            <div class="peng-field"><label class="peng-label">Alt background</label><input class="peng-input" name="bgAlt" type="color" value="${F.escapeHtml(t.colors.bgAlt)}"></div>
          </div>
          <button class="peng-btn peng-btn-primary" type="submit">Save settings</button>
        </form>
      </div>
    `;
    document.getElementById('settings-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Store.saveBrandSettings(
        {
          name: fd.get('name'),
          handle: fd.get('handle'),
          initials: fd.get('initials'),
          bio: fd.get('bio'),
          heroTitle: fd.get('heroTitle'),
          avatarImage: fd.get('avatarImage'),
          heroImage: fd.get('heroImage')
        },
        {
          colors: {
            primary: fd.get('primary'),
            accent: fd.get('accent'),
            accentHover: fd.get('accent'),
            bg: fd.get('bg'),
            bgAlt: fd.get('bgAlt')
          }
        }
      );
      UI.applyTheme();
      UI.toast('Settings saved locally');
    });
  }

  function render() {
    navActive();
    const map = {
      dashboard: renderDashboard,
      orders: renderOrders,
      recipes: renderRecipes,
      editor: renderEditor,
      bundles: renderBundles,
      discounts: renderDiscounts,
      subscribers: renderSubscribers,
      payouts: renderPayouts,
      settings: renderSettings
    };
    (map[current] || renderDashboard)();
  }

  window.addEventListener('hashchange', () => {
    current = (location.hash || '#dashboard').replace('#', '') || 'dashboard';
    render();
  });

  Store.trackPageview();
  render();
})();
