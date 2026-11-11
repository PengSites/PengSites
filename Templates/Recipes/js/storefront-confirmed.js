(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: '', title: 'Order confirmed', stickyCart: false });
  const order = Store.getLastOrder();
  const root = document.getElementById('confirmed-root');

  if (!order) {
    root.innerHTML = `<div class="peng-container peng-section"><div class="peng-empty">No recent order. <a href="${F.pageUrl('recipes')}">Browse recipes</a></div></div>`;
    return;
  }

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in" style="max-width:36rem;text-align:center">
      <div class="peng-demo-banner">Demo order complete — nothing was charged and no email was really sent.</div>
      <div style="width:4rem;height:4rem;border-radius:999px;background:var(--peng-primary);color:var(--peng-bg);display:inline-flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1rem">✓</div>
      <h1 class="peng-section-title">Order confirmed</h1>
      <p class="peng-section-sub" style="margin-left:auto;margin-right:auto">We “sent” your recipes to <strong>${F.escapeHtml(order.email)}</strong>. In a live PengSites shop, buyers get an email with access links. In this demo, open them below.</p>
      <div class="peng-card" style="padding:1.15rem;text-align:left;margin-bottom:1.25rem">
        <div style="font-size:0.8rem;color:var(--peng-muted)">Order ${F.escapeHtml(order.id)}</div>
        <div style="font-weight:700;margin:0.35rem 0">${F.escapeHtml(F.moneyExact(order.total))}</div>
        <ul style="margin:0;padding-left:1.1rem">
          ${order.items.map((i) => `<li>${F.escapeHtml(i.title)} × ${i.qty || 1}</li>`).join('')}
        </ul>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.65rem;justify-content:center">
        <a class="peng-btn peng-btn-primary" href="${F.pageUrl('my-recipes')}">Open my recipes</a>
        <a class="peng-btn peng-btn-ghost" href="${F.pageUrl('admin')}">See it in Admin dashboard</a>
      </div>
    </div>
  `;
})();
