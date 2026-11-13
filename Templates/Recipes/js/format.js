/**
 * Formatting helpers — money, dates, fees.
 */
(function (global) {
  function currency() {
    const c = (global.PENG_STORE && global.PENG_STORE.getCurrency()) ||
      (global.PENG_CONFIG && global.PENG_CONFIG.currency) ||
      { code: 'USD', symbol: '$' };
    return c;
  }

  function money(amount) {
    const n = Number(amount) || 0;
    const { symbol } = currency();
    const fixed = Math.round(n * 100) / 100;
    const str = fixed.toFixed(2);
    // Drop .00 for whole dollars in UI when clean
    const display = str.endsWith('.00') ? String(Math.round(fixed)) : str;
    return symbol + display;
  }

  function moneyExact(amount) {
    const n = Number(amount) || 0;
    const { symbol } = currency();
    return symbol + n.toFixed(2);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function formatDateShort(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function stars(n) {
    const filled = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
  }

  function scaleAmount(amount, baseServings, servings) {
    if (amount == null || amount === '') return '';
    const ratio = servings / baseServings;
    const scaled = Number(amount) * ratio;
    if (Number.isInteger(Number(amount)) && Number.isInteger(scaled)) return String(scaled);
    const rounded = Math.round(scaled * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    return String(rounded);
  }

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'item-' + Date.now();
  }

  function calcFees(gross, fees) {
    const f = fees || (global.PENG_CONFIG && global.PENG_CONFIG.fees) || {};
    const platformFeePercent = Number(f.platformFeePercent) || 15;
    const processingFeePercent = Number(f.processingFeePercent) || 2.9;
    const processingFeeFixed = Number(f.processingFeeFixed) || 0.3;
    const platformFee = (gross * platformFeePercent) / 100;
    const processingFee = (gross * processingFeePercent) / 100 + (gross > 0 ? processingFeeFixed : 0);
    const creatorNet = Math.max(0, gross - platformFee - processingFee);
    return {
      gross,
      platformFee,
      platformFeePercent,
      processingFee,
      creatorNet
    };
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function assetPath(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
    const depth = global.PENG_PATH_DEPTH || 0;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + path.replace(/^\//, '');
  }

  function pageUrl(route) {
    const depth = global.PENG_PATH_DEPTH || 0;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    if (!route || route === '/' || route === 'home') return prefix || './';
    return prefix + route.replace(/^\//, '').replace(/\/?$/, '/');
  }

  function normalizeStep(step) {
    if (step == null) return { text: '', tip: '' };
    if (typeof step === 'string') return { text: step, tip: '' };
    return {
      text: String(step.text || step.body || ''),
      tip: String(step.tip || '')
    };
  }

  function normalizeSteps(steps) {
    return (steps || []).map(normalizeStep).filter((s) => s.text.trim());
  }

  function normalizeRecipe(recipe) {
    if (!recipe) return null;
    const r = Object.assign({}, recipe);
    r.steps = normalizeSteps(r.steps);
    r.equipment = Array.isArray(r.equipment) ? r.equipment.slice() : [];
    r.intro = r.intro || '';
    r.prepTime = r.prepTime || '';
    r.cookTime = r.cookTime || '';
    r.ingredients = (r.ingredients || []).map((ing) =>
      Object.assign({ scalable: true }, ing)
    );
    return r;
  }

  function cookUrl(recipeId) {
    return `${pageUrl('my-recipes/cook')}?id=${encodeURIComponent(recipeId)}`;
  }

  global.PENG_FORMAT = {
    money,
    moneyExact,
    formatDate,
    formatDateShort,
    stars,
    scaleAmount,
    slugify,
    calcFees,
    escapeHtml,
    assetPath,
    pageUrl,
    normalizeStep,
    normalizeSteps,
    normalizeRecipe,
    cookUrl
  };
})(window);
