(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;
  const Config = window.PENG_CONFIG;

  const ui = UI.initStorefront({ active: 'home', title: 'Home' });
  const brand = Store.getBrand();

  const hero = document.getElementById('home-hero');
  if (hero) {
    hero.innerHTML = `
      <div class="peng-container peng-hero-grid peng-fade-in">
        <div>
          <p style="margin:0 0 0.75rem;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--peng-accent)">Recipe shop</p>
          <h1 class="font-display" style="margin:0 0 1rem;font-size:clamp(2.2rem,6vw,3.6rem);line-height:1.08;color:var(--peng-primary)">${F.escapeHtml(brand.heroTitle)}</h1>
          <p style="margin:0;font-size:1.05rem;color:var(--peng-muted);max-width:32rem">${F.escapeHtml(brand.heroSubtitle)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.65rem;margin-top:1.5rem">
            <a class="peng-btn peng-btn-primary" href="${F.pageUrl('recipes')}">Browse recipes</a>
            <a class="peng-btn peng-btn-ghost" href="${F.pageUrl('bundles')}">View bundles</a>
          </div>
          <div class="peng-stat-row">
            ${(brand.followerStats || [])
              .map(
                (s) => `
              <div class="peng-stat">
                <strong>${F.escapeHtml(s.value)}</strong>
                <span>${F.escapeHtml(s.label)}</span>
              </div>`
              )
              .join('')}
          </div>
        </div>
        <div class="peng-hero-media">
          <img src="${F.escapeHtml(F.assetPath(brand.heroImage))}" alt="">
        </div>
      </div>
    `;
  }

  const featured = Store.getRecipes().filter((r) => r.featured).slice(0, 6);
  const featEl = document.getElementById('featured-recipes');
  if (featEl) {
    featEl.innerHTML = featured.map(UI.recipeCard).join('') || '<div class="peng-empty">No featured recipes yet.</div>';
    UI.bindAddButtons(featEl);
  }

  const bundles = Store.getBundles().slice(0, 3);
  const bunEl = document.getElementById('home-bundles');
  if (bunEl) {
    bunEl.innerHTML = bundles.map(UI.bundleCard).join('');
    UI.bindAddButtons(bunEl);
  }

  const reviews = [];
  Store.getRecipes().forEach((r) => {
    (r.reviews || []).forEach((rev) => reviews.push(Object.assign({ recipe: r.title }, rev)));
  });
  const revEl = document.getElementById('home-reviews');
  if (revEl) {
    revEl.innerHTML = reviews
      .slice(0, 6)
      .map(
        (r) => `
      <blockquote class="peng-card" style="padding:1.25rem">
        <div class="peng-stars">${F.stars(r.stars)}</div>
        <p style="margin:0.75rem 0;font-size:0.95rem">“${F.escapeHtml(r.text)}”</p>
        <footer style="font-size:0.8rem;color:var(--peng-muted)">${F.escapeHtml(r.name)} · ${F.escapeHtml(r.recipe)}</footer>
      </blockquote>`
      )
      .join('');
  }

  const signup = Config.freeRecipeSignup || {};
  const form = document.getElementById('signup-form');
  const signupCopy = document.getElementById('signup-copy');
  if (signupCopy) {
    signupCopy.innerHTML = `
      <h2 class="peng-section-title">${F.escapeHtml(signup.headline || 'Get a free recipe')}</h2>
      <p class="peng-section-sub">${F.escapeHtml(signup.blurb || '')}</p>
    `;
  }
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = new FormData(form).get('email');
      const res = Store.addSubscriber(email, 'free-recipe');
      if (!res.ok) {
        ui.toast(res.error);
        return;
      }
      if (signup.recipeId) Store.unlockRecipes([signup.recipeId]);
      form.reset();
      document.getElementById('signup-success').hidden = false;
      ui.toast('You are on the list — free recipe unlocked in My recipes');
    });
  }

  const bio = document.getElementById('home-bio');
  if (bio) {
    bio.innerHTML = `
      <div class="peng-container" style="display:grid;gap:1.5rem;align-items:center">
        <div style="display:grid;gap:1.25rem;align-items:center" class="about-split">
          <div style="width:6rem;height:6rem;border-radius:999px;overflow:hidden;border:3px solid var(--peng-sand)">
            <img src="${F.escapeHtml(F.assetPath(brand.avatarImage))}" alt="" style="width:100%;height:100%;object-fit:cover">
          </div>
          <div>
            <h2 class="peng-section-title" style="margin-bottom:0.5rem">Hi, I'm ${F.escapeHtml(brand.name)}</h2>
            <p style="margin:0;color:var(--peng-muted);max-width:40rem">${F.escapeHtml(brand.bio)}</p>
            <a class="peng-btn peng-btn-ghost" style="margin-top:1rem" href="${F.pageUrl('about')}">More about me</a>
          </div>
        </div>
      </div>
    `;
  }
})();
