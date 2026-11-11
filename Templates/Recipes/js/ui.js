/**
 * Shared storefront chrome: theme, header, footer, watermarks, sticky cart, toasts.
 * Set window.PENG_PATH_DEPTH before loading (0 for root, 1 for nested pages).
 */
(function (global) {
  const F = () => global.PENG_FORMAT;
  const Store = () => global.PENG_STORE;
  const Config = () => global.PENG_CONFIG;

  const ICONS = {
    cart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
    print: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="7"/></svg>'
  };

  function ensureFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href =
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#3B4F3C"/><text x="16" y="22" text-anchor="middle" font-size="14" font-family="Georgia,serif" fill="#FDFBF7">P</text></svg>`
      );
    document.head.appendChild(link);
  }

  function applyTheme() {
    ensureFavicon();
    const theme = Store().getTheme();
    const root = document.documentElement;
    const c = theme.colors || {};
    const map = {
      '--peng-bg': c.bg,
      '--peng-bg-alt': c.bgAlt,
      '--peng-primary': c.primary,
      '--peng-primary-soft': c.primarySoft,
      '--peng-accent': c.accent,
      '--peng-accent-hover': c.accentHover,
      '--peng-sand': c.sand,
      '--peng-text': c.text,
      '--peng-muted': c.muted
    };
    Object.keys(map).forEach((k) => {
      if (map[k]) root.style.setProperty(k, map[k]);
    });
    if (theme.fonts) {
      if (theme.fonts.heading) root.style.setProperty('--peng-font-heading', `'${theme.fonts.heading}', Georgia, serif`);
      if (theme.fonts.body) root.style.setProperty('--peng-font-body', `'${theme.fonts.body}', system-ui, sans-serif`);
    }
    ensureFonts(theme.fonts);
  }

  function ensureFonts(fonts) {
    if (!fonts) return;
    const id = 'peng-fonts';
    if (document.getElementById(id)) return;
    const families = [fonts.heading, fonts.body].filter(Boolean);
    if (!families.length) return;
    const q = families.map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join('&');
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${q}&display=swap`;
    document.head.appendChild(link);
  }

  function toast(message) {
    let wrap = document.querySelector('.peng-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'peng-toast-wrap';
      document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = 'peng-toast';
    el.textContent = message;
    wrap.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.25s';
      setTimeout(() => el.remove(), 250);
    }, 2600);
  }

  function mountWatermarks() {
    const text = (Config().demo && Config().demo.watermarkText) || 'PengSites DEMO';
    if (!document.querySelector('.peng-watermark-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'peng-watermark-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.innerHTML = Array.from({ length: 36 }, () => `<span>${F().escapeHtml(text)}</span>`).join('');
      overlay.appendChild(tile);
      document.body.appendChild(overlay);
    }
    if (!document.querySelector('.peng-corner-badge')) {
      const badge = document.createElement('div');
      badge.className = 'peng-corner-badge';
      badge.textContent = text;
      document.body.appendChild(badge);
    }
    if (!document.querySelector('.peng-reset-fab')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'peng-reset-fab';
      btn.textContent = (Config().demo && Config().demo.resetLabel) || 'Reset demo';
      btn.addEventListener('click', () => {
        if (confirm('Reset this demo? Cart, orders, unlocks, subscribers, and admin edits on this device will be cleared.')) {
          Store().resetDemo();
          toast('Demo reset');
          setTimeout(() => location.reload(), 400);
        }
      });
      document.body.appendChild(btn);
    }
  }

  function navItems() {
    return [
      { label: 'Recipes', href: F().pageUrl('recipes') },
      { label: 'Bundles', href: F().pageUrl('bundles') },
      { label: 'My recipes', href: F().pageUrl('my-recipes') },
      { label: 'About', href: F().pageUrl('about') }
    ];
  }

  function mountHeader(active) {
    const brand = Store().getBrand();
    const mount = document.getElementById('peng-header');
    if (!mount) return;

    const avatar = brand.avatarImage
      ? `<img src="${F().escapeHtml(F().assetPath(brand.avatarImage))}" alt="">`
      : F().escapeHtml(brand.initials || 'C');

    mount.innerHTML = `
      <header class="peng-header">
        <div class="peng-header-inner">
          <a class="peng-brand" href="${F().pageUrl('')}">
            <span class="peng-avatar">${avatar}</span>
            <span style="min-width:0">
              <span style="display:block;font-family:var(--peng-font-heading);font-weight:700;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${F().escapeHtml(brand.name)}</span>
              <span style="display:block;font-size:0.72rem;color:var(--peng-muted)">${F().escapeHtml(brand.handle)}</span>
            </span>
          </a>
          <nav class="peng-nav" aria-label="Primary">
            ${navItems()
              .map(
                (n) =>
                  `<a href="${n.href}" ${active === n.label.toLowerCase() ? 'aria-current="page" style="color:var(--peng-accent)"' : ''}>${n.label}</a>`
              )
              .join('')}
          </nav>
          <div class="peng-header-actions">
            <a class="peng-btn peng-btn-admin" href="${F().pageUrl('admin')}">Admin dashboard</a>
            <a class="peng-icon-btn" href="${F().pageUrl('cart')}" aria-label="Cart">
              ${ICONS.cart}
              <span class="peng-cart-count" id="peng-cart-count">0</span>
            </a>
            <button type="button" class="peng-icon-btn peng-mobile-toggle" id="peng-mobile-toggle" aria-label="Menu">${ICONS.menu}</button>
          </div>
        </div>
        <div class="peng-mobile-menu" id="peng-mobile-menu">
          ${navItems().map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
          <a href="${F().pageUrl('admin')}">Admin dashboard</a>
          <a href="${F().pageUrl('cart')}">Cart</a>
        </div>
      </header>
    `;

    const toggle = document.getElementById('peng-mobile-toggle');
    const menu = document.getElementById('peng-mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('is-open');
        toggle.innerHTML = menu.classList.contains('is-open') ? ICONS.close : ICONS.menu;
      });
    }
    updateCartBadge();
  }

  function mountFooter() {
    const brand = Store().getBrand();
    const mount = document.getElementById('peng-footer');
    if (!mount) return;
    const powered = (Config().demo && Config().demo.poweredBy) || 'Powered by PengSites';
    mount.innerHTML = `
      <footer class="peng-footer">
        <div class="peng-footer-inner">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <span class="peng-avatar" style="width:2rem;height:2rem;font-size:0.8rem">${F().escapeHtml(brand.initials || 'C')}</span>
            <div>
              <div style="font-family:var(--peng-font-heading);font-weight:700">${F().escapeHtml(brand.name)}</div>
              <div style="font-size:0.8rem;color:var(--peng-muted)">${F().escapeHtml(brand.handle)}</div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:0.875rem">
            <a href="${F().pageUrl('recipes')}">Recipes</a>
            <a href="${F().pageUrl('bundles')}">Bundles</a>
            <a href="${F().pageUrl('my-recipes')}">My recipes</a>
            <a href="${F().pageUrl('about')}">About</a>
          </div>
          <p style="margin:0;font-size:0.8rem;color:var(--peng-muted)">© ${new Date().getFullYear()} ${F().escapeHtml(brand.name)}. Demo storefront — no real payments.</p>
          <p class="peng-powered"><strong>${F().escapeHtml(powered)}</strong></p>
        </div>
      </footer>
    `;
  }

  function mountStickyCart() {
    if (document.querySelector('.peng-sticky-cart')) return;
    const a = document.createElement('a');
    a.className = 'peng-sticky-cart';
    a.href = F().pageUrl('cart');
    a.innerHTML = `${ICONS.cart}<span>Cart</span><span class="badge" id="peng-sticky-count">0</span>`;
    document.body.appendChild(a);
    updateCartBadge();
  }

  function updateCartBadge() {
    const count = Store().cartCount();
    document.querySelectorAll('#peng-cart-count, #peng-sticky-count').forEach((el) => {
      el.textContent = String(count);
      if (el.id === 'peng-cart-count') el.classList.toggle('is-on', count > 0);
    });
  }

  function recipeCard(recipe) {
    const unlocked = Store().isUnlocked(recipe.id);
    const priceLabel =
      !recipe.price || recipe.price <= 0
        ? '<span class="peng-free-pill">Free</span>'
        : `<span class="peng-price-pill">${F().escapeHtml(F().money(recipe.price))}</span>`;
    const href = `${F().pageUrl('recipe')}?id=${encodeURIComponent(recipe.id)}`;
    const avg =
      recipe.reviews && recipe.reviews.length
        ? recipe.reviews.reduce((s, r) => s + r.stars, 0) / recipe.reviews.length
        : 0;
    return `
      <article class="peng-card">
        <a href="${href}">
          <div class="peng-card-media">
            <img src="${F().escapeHtml(F().assetPath(recipe.image))}" alt="${F().escapeHtml(recipe.title)}" loading="lazy">
            ${priceLabel}
          </div>
        </a>
        <div class="peng-card-body">
          <div class="peng-badge-row">
            ${(recipe.badges || []).slice(0, 3).map((b) => `<span class="peng-badge">${F().escapeHtml(b)}</span>`).join('')}
            ${unlocked && recipe.price > 0 ? '<span class="peng-badge">Owned</span>' : ''}
          </div>
          <h3 style="margin:0;font-size:1.15rem;color:var(--peng-primary)">
            <a href="${href}">${F().escapeHtml(recipe.title)}</a>
          </h3>
          <p style="margin:0;font-size:0.875rem;color:var(--peng-muted);flex:1">${F().escapeHtml(recipe.shortDescription)}</p>
          ${avg ? `<div class="peng-stars" aria-label="${avg.toFixed(1)} stars">${F().stars(avg)}</div>` : ''}
          <div style="display:flex;gap:0.5rem;margin-top:auto">
            <a class="peng-btn peng-btn-ghost" style="flex:1" href="${href}">View</a>
            ${
              !recipe.price || recipe.price <= 0
                ? `<a class="peng-btn peng-btn-secondary" style="flex:1" href="${href}">Get free</a>`
                : unlocked
                  ? `<a class="peng-btn peng-btn-secondary" style="flex:1" href="${href}">Open</a>`
                  : `<button type="button" class="peng-btn peng-btn-primary" style="flex:1" data-add-recipe="${F().escapeHtml(recipe.id)}">Add</button>`
            }
          </div>
        </div>
      </article>
    `;
  }

  function bundleCard(bundle) {
    const href = F().pageUrl('bundles');
    return `
      <article class="peng-card">
        <div class="peng-card-media">
          <img src="${F().escapeHtml(F().assetPath(bundle.image))}" alt="${F().escapeHtml(bundle.title)}" loading="lazy">
          <span class="peng-price-pill">${F().escapeHtml(F().money(bundle.price))}</span>
        </div>
        <div class="peng-card-body">
          <h3 style="margin:0;font-size:1.2rem;color:var(--peng-primary)">${F().escapeHtml(bundle.title)}</h3>
          <p style="margin:0;font-size:0.875rem;color:var(--peng-muted);flex:1">${F().escapeHtml(bundle.description)}</p>
          <p style="margin:0;font-size:0.85rem">
            <strong>${F().escapeHtml(F().money(bundle.price))}</strong>
            ${bundle.compareAtPrice ? `<span style="color:var(--peng-muted);text-decoration:line-through;margin-left:0.35rem">${F().escapeHtml(F().money(bundle.compareAtPrice))}</span>` : ''}
          </p>
          <button type="button" class="peng-btn peng-btn-primary" data-add-bundle="${F().escapeHtml(bundle.id)}">Add bundle</button>
          <a href="${href}" style="font-size:0.8rem;color:var(--peng-muted)">View all bundles</a>
        </div>
      </article>
    `;
  }

  function bindAddButtons(root) {
    (root || document).querySelectorAll('[data-add-recipe]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add-recipe');
        const r = Store().getRecipe(id);
        if (!r) return;
        Store().addToCart({
          type: 'recipe',
          id: r.id,
          title: r.title,
          price: r.price,
          image: r.image,
          recipeIds: [r.id]
        });
        toast(`Added ${r.title}`);
        updateCartBadge();
      });
    });
    (root || document).querySelectorAll('[data-add-bundle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add-bundle');
        const b = Store().getBundle(id);
        if (!b) return;
        Store().addToCart({
          type: 'bundle',
          id: b.id,
          title: b.title,
          price: b.price,
          image: b.image,
          recipeIds: b.recipeIds || []
        });
        toast(`Added ${b.title}`);
        updateCartBadge();
      });
    });
  }

  function initStorefront(options) {
    options = options || {};
    applyTheme();
    mountWatermarks();
    mountHeader(options.active || '');
    mountFooter();
    if (options.stickyCart !== false) mountStickyCart();
    Store().trackPageview();
    document.title = options.title
      ? `${options.title} — ${Store().getBrand().name}`
      : `${Store().getBrand().name} — Recipes`;
    global.addEventListener('peng:cart', updateCartBadge);
    return { toast, updateCartBadge, recipeCard, bundleCard, bindAddButtons, icons: ICONS, applyTheme };
  }

  function scriptBase() {
    // unused helper kept for clarity
    return F().assetPath('js/');
  }

  global.PENG_UI = {
    initStorefront,
    applyTheme,
    toast,
    updateCartBadge,
    recipeCard,
    bundleCard,
    bindAddButtons,
    icons: ICONS,
    scriptBase
  };
})(window);
