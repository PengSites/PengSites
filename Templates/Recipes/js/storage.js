/**
 * Namespaced localStorage helpers for the PengSites recipe demo.
 */
(function (global) {
  const PREFIX = 'pengsites.recipes.demo.v1.';

  const KEYS = {
    cart: 'cart',
    orders: 'orders',
    unlocked: 'unlockedRecipeIds',
    subscribers: 'subscribers',
    overrides: 'overrides',
    stats: 'stats',
    lastOrderId: 'lastOrderId',
    appliedDiscount: 'appliedDiscount'
  };

  function fullKey(key) {
    return PREFIX + key;
  }

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(fullKey(key));
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    localStorage.setItem(fullKey(key), JSON.stringify(value));
  }

  function remove(key) {
    localStorage.removeItem(fullKey(key));
  }

  function resetAll() {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  }

  global.PENG_STORAGE = { PREFIX, KEYS, get, set, remove, resetAll };
})(window);
