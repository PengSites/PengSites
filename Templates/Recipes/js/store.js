/**
 * Merge config seed + localStorage overlays. Cart, orders, unlocks API.
 */
(function (global) {
  const S = () => global.PENG_STORAGE;
  const C = () => global.PENG_CONFIG;

  function emptyOverrides() {
    return {
      brand: null,
      theme: null,
      recipes: {},
      bundles: {},
      discountCodes: {},
      deletedRecipeIds: [],
      deletedBundleIds: [],
      deletedDiscountCodes: []
    };
  }

  function getOverrides() {
    return Object.assign(emptyOverrides(), S().get(S().KEYS.overrides, {}));
  }

  function saveOverrides(overrides) {
    S().set(S().KEYS.overrides, overrides);
  }

  function getBrand() {
    const o = getOverrides();
    return Object.assign({}, C().brand, o.brand || {});
  }

  function getTheme() {
    const o = getOverrides();
    return {
      colors: Object.assign({}, C().theme.colors, (o.theme && o.theme.colors) || {}),
      fonts: Object.assign({}, C().theme.fonts, (o.theme && o.theme.fonts) || {})
    };
  }

  function getCurrency() {
    return C().currency || { code: 'USD', symbol: '$' };
  }

  function getFees() {
    return C().fees;
  }

  function getCategories() {
    return (C().categories || []).slice();
  }

  function getRecipes() {
    const o = getOverrides();
    const deleted = new Set(o.deletedRecipeIds || []);
    const map = {};
    (C().recipes || []).forEach((r) => {
      if (!deleted.has(r.id)) map[r.id] = Object.assign({}, r);
    });
    Object.keys(o.recipes || {}).forEach((id) => {
      if (deleted.has(id)) return;
      map[id] = Object.assign({}, map[id] || {}, o.recipes[id], { id });
    });
    return Object.values(map);
  }

  function getRecipe(id) {
    return getRecipes().find((r) => r.id === id) || null;
  }

  function getBundles() {
    const o = getOverrides();
    const deleted = new Set(o.deletedBundleIds || []);
    const map = {};
    (C().bundles || []).forEach((b) => {
      if (!deleted.has(b.id)) map[b.id] = Object.assign({}, b);
    });
    Object.keys(o.bundles || {}).forEach((id) => {
      if (deleted.has(id)) return;
      map[id] = Object.assign({}, map[id] || {}, o.bundles[id], { id });
    });
    return Object.values(map);
  }

  function getBundle(id) {
    return getBundles().find((b) => b.id === id) || null;
  }

  function getDiscountCodes() {
    const o = getOverrides();
    const deleted = new Set((o.deletedDiscountCodes || []).map((c) => c.toUpperCase()));
    const map = {};
    (C().discountCodes || []).forEach((d) => {
      const code = d.code.toUpperCase();
      if (!deleted.has(code)) map[code] = Object.assign({}, d, { code });
    });
    Object.keys(o.discountCodes || {}).forEach((code) => {
      const up = code.toUpperCase();
      if (deleted.has(up)) return;
      map[up] = Object.assign({}, map[up] || {}, o.discountCodes[code], { code: up });
    });
    return Object.values(map);
  }

  function findDiscount(code) {
    if (!code) return null;
    const up = String(code).trim().toUpperCase();
    return getDiscountCodes().find((d) => d.code === up && d.active !== false) || null;
  }

  /* ---- Cart ---- */
  function getCart() {
    return S().get(S().KEYS.cart, []);
  }

  function saveCart(cart) {
    S().set(S().KEYS.cart, cart);
    global.dispatchEvent(new CustomEvent('peng:cart'));
  }

  function cartCount() {
    return getCart().reduce((n, i) => n + (i.qty || 1), 0);
  }

  function addToCart(item) {
    const cart = getCart();
    const key = item.type + ':' + item.id;
    const existing = cart.find((c) => c.type + ':' + c.id === key);
    if (existing) {
      existing.qty = (existing.qty || 1) + (item.qty || 1);
    } else {
      cart.push({
        type: item.type,
        id: item.id,
        title: item.title,
        price: Number(item.price) || 0,
        image: item.image || '',
        qty: item.qty || 1,
        recipeIds: item.recipeIds || (item.type === 'recipe' ? [item.id] : [])
      });
    }
    saveCart(cart);
    return cart;
  }

  function updateCartQty(type, id, qty) {
    let cart = getCart();
    cart = cart
      .map((c) => {
        if (c.type === type && c.id === id) return Object.assign({}, c, { qty: Math.max(0, qty) });
        return c;
      })
      .filter((c) => c.qty > 0);
    saveCart(cart);
  }

  function removeFromCart(type, id) {
    saveCart(getCart().filter((c) => !(c.type === type && c.id === id)));
  }

  function clearCart() {
    saveCart([]);
    S().remove(S().KEYS.appliedDiscount);
  }

  function getAppliedDiscount() {
    return S().get(S().KEYS.appliedDiscount, null);
  }

  function applyDiscountCode(code) {
    const d = findDiscount(code);
    if (!d) return { ok: false, error: 'Invalid or inactive code' };
    S().set(S().KEYS.appliedDiscount, { code: d.code, type: d.type, value: d.value });
    return { ok: true, discount: d };
  }

  function clearDiscount() {
    S().remove(S().KEYS.appliedDiscount);
  }

  function cartTotals() {
    const items = getCart();
    const subtotal = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    const discount = getAppliedDiscount();
    let discountAmount = 0;
    if (discount) {
      if (discount.type === 'percent') discountAmount = (subtotal * Number(discount.value)) / 100;
      else discountAmount = Number(discount.value) || 0;
      discountAmount = Math.min(discountAmount, subtotal);
    }
    const total = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);
    return { items, subtotal, discount, discountAmount, total };
  }

  /* ---- Unlocks ---- */
  function getUnlockedIds() {
    const set = new Set(S().get(S().KEYS.unlocked, []));
    getRecipes().forEach((r) => {
      if (!r.price || r.price <= 0) set.add(r.id);
    });
    return Array.from(set);
  }

  function isUnlocked(recipeId) {
    const r = getRecipe(recipeId);
    if (!r) return false;
    if (!r.price || r.price <= 0) return true;
    return getUnlockedIds().includes(recipeId);
  }

  function unlockRecipes(ids) {
    const set = new Set(S().get(S().KEYS.unlocked, []));
    (ids || []).forEach((id) => set.add(id));
    S().set(S().KEYS.unlocked, Array.from(set));
  }

  /* ---- Orders ---- */
  function getOrders() {
    return S().get(S().KEYS.orders, []);
  }

  function createOrder(payload) {
    const totals = cartTotals();
    if (!totals.items.length) return { ok: false, error: 'Cart is empty' };

    const recipeIds = [];
    totals.items.forEach((item) => {
      (item.recipeIds || []).forEach((id) => recipeIds.push(id));
    });
    const uniqueRecipeIds = Array.from(new Set(recipeIds));

    const order = {
      id: 'ord-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6),
      createdAt: new Date().toISOString(),
      email: payload.email || '',
      name: payload.name || '',
      items: totals.items.map((i) => Object.assign({}, i)),
      subtotal: totals.subtotal,
      discountCode: totals.discount ? totals.discount.code : null,
      discountAmount: totals.discountAmount,
      total: totals.total,
      recipeIds: uniqueRecipeIds,
      demo: true
    };

    const orders = getOrders();
    orders.unshift(order);
    S().set(S().KEYS.orders, orders);
    unlockRecipes(uniqueRecipeIds);
    S().set(S().KEYS.lastOrderId, order.id);
    clearCart();
    global.dispatchEvent(new CustomEvent('peng:orders'));
    return { ok: true, order };
  }

  function getLastOrder() {
    const id = S().get(S().KEYS.lastOrderId, null);
    if (!id) return getOrders()[0] || null;
    return getOrders().find((o) => o.id === id) || null;
  }

  /* ---- Subscribers ---- */
  function getSubscribers() {
    return S().get(S().KEYS.subscribers, []);
  }

  function addSubscriber(email, source) {
    const list = getSubscribers();
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) return { ok: false, error: 'Enter a valid email' };
    if (list.some((s) => s.email === normalized)) return { ok: true, existing: true };
    list.unshift({
      email: normalized,
      source: source || 'signup',
      createdAt: new Date().toISOString()
    });
    S().set(S().KEYS.subscribers, list);
    return { ok: true };
  }

  /* ---- Stats ---- */
  function getStats() {
    return Object.assign(
      { pageviews: 0, visits: [] },
      S().get(S().KEYS.stats, {})
    );
  }

  function trackPageview() {
    const stats = getStats();
    stats.pageviews = (stats.pageviews || 0) + 1;
    const day = new Date().toISOString().slice(0, 10);
    stats.visits = stats.visits || [];
    const row = stats.visits.find((v) => v.day === day);
    if (row) row.count += 1;
    else stats.visits.push({ day, count: 1 });
    if (stats.visits.length > 60) stats.visits = stats.visits.slice(-60);
    S().set(S().KEYS.stats, stats);
  }

  function visitorCount() {
    const baseline = (C().seedMeta && C().seedMeta.visitorBaseline) || 0;
    return baseline + (getStats().pageviews || 0);
  }

  /* ---- Admin mutations (local overlays) ---- */
  function upsertRecipe(recipe) {
    const o = getOverrides();
    if (!recipe.id) recipe.id = global.PENG_FORMAT.slugify(recipe.title);
    o.recipes[recipe.id] = recipe;
    o.deletedRecipeIds = (o.deletedRecipeIds || []).filter((id) => id !== recipe.id);
    saveOverrides(o);
    return recipe;
  }

  function deleteRecipe(id) {
    const o = getOverrides();
    delete o.recipes[id];
    if (!o.deletedRecipeIds.includes(id)) o.deletedRecipeIds.push(id);
    saveOverrides(o);
  }

  function upsertBundle(bundle) {
    const o = getOverrides();
    if (!bundle.id) bundle.id = global.PENG_FORMAT.slugify(bundle.title);
    o.bundles[bundle.id] = bundle;
    o.deletedBundleIds = (o.deletedBundleIds || []).filter((id) => id !== bundle.id);
    saveOverrides(o);
    return bundle;
  }

  function deleteBundle(id) {
    const o = getOverrides();
    delete o.bundles[id];
    if (!o.deletedBundleIds.includes(id)) o.deletedBundleIds.push(id);
    saveOverrides(o);
  }

  function upsertDiscount(discount) {
    const o = getOverrides();
    const code = String(discount.code || '').trim().toUpperCase();
    discount.code = code;
    o.discountCodes[code] = discount;
    o.deletedDiscountCodes = (o.deletedDiscountCodes || []).filter((c) => c !== code);
    saveOverrides(o);
    return discount;
  }

  function deleteDiscount(code) {
    const up = String(code).toUpperCase();
    const o = getOverrides();
    delete o.discountCodes[up];
    if (!o.deletedDiscountCodes.includes(up)) o.deletedDiscountCodes.push(up);
    saveOverrides(o);
  }

  function saveBrandSettings(brandPatch, themePatch) {
    const o = getOverrides();
    o.brand = Object.assign({}, o.brand || {}, brandPatch || {});
    if (themePatch) {
      o.theme = o.theme || {};
      if (themePatch.colors) o.theme.colors = Object.assign({}, o.theme.colors || {}, themePatch.colors);
      if (themePatch.fonts) o.theme.fonts = Object.assign({}, o.theme.fonts || {}, themePatch.fonts);
    }
    saveOverrides(o);
  }

  function resetDemo() {
    S().resetAll();
    global.dispatchEvent(new CustomEvent('peng:reset'));
  }

  /* ---- Analytics helpers for admin ---- */
  function salesSummary() {
    const orders = getOrders();
    const gross = orders.reduce((s, o) => s + (o.total || 0), 0);
    const fees = global.PENG_FORMAT.calcFees(gross, getFees());
    const recipeSales = {};
    orders.forEach((o) => {
      (o.recipeIds || []).forEach((id) => {
        recipeSales[id] = (recipeSales[id] || 0) + 1;
      });
    });
    const topRecipes = Object.keys(recipeSales)
      .map((id) => {
        const r = getRecipe(id);
        return { id, title: (r && r.title) || id, count: recipeSales[id] };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const cadence = getFees().payoutCadenceDays || 14;
    const cutoff = Date.now() - cadence * 24 * 60 * 60 * 1000;
    const periodOrders = orders.filter((o) => new Date(o.createdAt).getTime() >= cutoff);
    const periodGross = periodOrders.reduce((s, o) => s + (o.total || 0), 0);
    const periodFees = global.PENG_FORMAT.calcFees(periodGross, getFees());

    return {
      orderCount: orders.length,
      gross,
      afterPlatform: gross - fees.platformFee,
      platformFee: fees.platformFee,
      creatorNet: fees.creatorNet,
      processingFee: fees.processingFee,
      topRecipes,
      periodGross,
      periodNet: periodFees.creatorNet,
      periodOrderCount: periodOrders.length,
      cadenceDays: cadence,
      visitors: visitorCount(),
      subscribers: getSubscribers().length
    };
  }

  function buildPayouts() {
    const feesCfg = getFees();
    const cadence = feesCfg.payoutCadenceDays || 14;
    const seed = ((C().seedMeta && C().seedMeta.samplePayouts) || []).map((p) => {
      const breakdown = global.PENG_FORMAT.calcFees(p.grossSales, feesCfg);
      return Object.assign({}, p, breakdown, { source: 'seed' });
    });

    const orders = getOrders().slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const live = [];
    if (orders.length) {
      const start = new Date(orders[0].createdAt);
      start.setHours(0, 0, 0, 0);
      let periodStart = new Date(start);
      const now = new Date();
      while (periodStart < now) {
        const periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + cadence - 1);
        periodEnd.setHours(23, 59, 59, 999);
        const inPeriod = orders.filter((o) => {
          const t = new Date(o.createdAt).getTime();
          return t >= periodStart.getTime() && t <= periodEnd.getTime();
        });
        const gross = inPeriod.reduce((s, o) => s + (o.total || 0), 0);
        if (gross > 0 || periodEnd >= now) {
          const breakdown = global.PENG_FORMAT.calcFees(gross, feesCfg);
          const isCurrent = now >= periodStart && now <= periodEnd;
          live.push(
            Object.assign(
              {
                id: 'po-live-' + periodStart.toISOString().slice(0, 10),
                periodStart: periodStart.toISOString().slice(0, 10),
                periodEnd: periodEnd.toISOString().slice(0, 10),
                orderCount: inPeriod.length,
                status: isCurrent ? 'current' : 'pending',
                source: 'live'
              },
              breakdown
            )
          );
        }
        periodStart = new Date(periodEnd);
        periodStart.setDate(periodStart.getDate() + 1);
        periodStart.setHours(0, 0, 0, 0);
        if (live.length > 12) break;
      }
    }

    return seed.concat(live).reverse();
  }

  global.PENG_STORE = {
    getBrand,
    getTheme,
    getCurrency,
    getFees,
    getCategories,
    getRecipes,
    getRecipe,
    getBundles,
    getBundle,
    getDiscountCodes,
    findDiscount,
    getCart,
    cartCount,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getAppliedDiscount,
    applyDiscountCode,
    clearDiscount,
    cartTotals,
    getUnlockedIds,
    isUnlocked,
    unlockRecipes,
    getOrders,
    createOrder,
    getLastOrder,
    getSubscribers,
    addSubscriber,
    getStats,
    trackPageview,
    visitorCount,
    upsertRecipe,
    deleteRecipe,
    upsertBundle,
    deleteBundle,
    upsertDiscount,
    deleteDiscount,
    saveBrandSettings,
    resetDemo,
    salesSummary,
    buildPayouts,
    getOverrides
  };
})(window);
