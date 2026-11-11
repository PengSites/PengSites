(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  const ui = UI.initStorefront({ active: '', title: 'Checkout', stickyCart: false });
  const root = document.getElementById('checkout-root');
  const totals = Store.cartTotals();

  if (!totals.items.length) {
    root.innerHTML = `<div class="peng-container peng-section"><div class="peng-empty">Nothing to checkout. <a href="${F.pageUrl('recipes')}">Browse recipes</a></div></div>`;
    return;
  }

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in" style="max-width:40rem">
      <div class="peng-demo-banner">DEMO CHECKOUT — No real payment will be taken. Card details are not sent anywhere.</div>
      <h1 class="peng-section-title">Checkout</h1>
      <p class="peng-section-sub">This is a test checkout for the PengSites demo. Completing it unlocks recipes in this browser only.</p>
      <form id="checkout-form" class="peng-card" style="padding:1.25rem">
        <div class="peng-field">
          <label class="peng-label" for="name">Full name</label>
          <input class="peng-input" id="name" name="name" required placeholder="Alex Creator" autocomplete="name">
        </div>
        <div class="peng-field">
          <label class="peng-label" for="email">Email (recipes will be “sent” here)</label>
          <input class="peng-input" id="email" name="email" type="email" required placeholder="you@email.com" autocomplete="email">
        </div>
        <div class="peng-field">
          <label class="peng-label" for="card">Card number</label>
          <input class="peng-input" id="card" name="card" required placeholder="4242 4242 4242 4242" inputmode="numeric" autocomplete="off">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div class="peng-field">
            <label class="peng-label" for="exp">Expiry</label>
            <input class="peng-input" id="exp" name="exp" required placeholder="12 / 28" autocomplete="off">
          </div>
          <div class="peng-field">
            <label class="peng-label" for="cvc">CVC</label>
            <input class="peng-input" id="cvc" name="cvc" required placeholder="123" autocomplete="off">
          </div>
        </div>
        <div style="border-top:1px solid var(--peng-sand);padding-top:1rem;margin:0.5rem 0 1rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem"><span>Items</span><span>${totals.items.length}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem"><span>Subtotal</span><span>${F.escapeHtml(F.moneyExact(totals.subtotal))}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;color:var(--peng-muted)"><span>Discount</span><span>−${F.escapeHtml(F.moneyExact(totals.discountAmount))}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:1.15rem;font-weight:700"><span>Total</span><span>${F.escapeHtml(F.moneyExact(totals.total))}</span></div>
        </div>
        <button class="peng-btn peng-btn-primary" style="width:100%" type="submit">Pay ${F.escapeHtml(F.moneyExact(totals.total))} — Demo only</button>
        <p style="margin:0.85rem 0 0;font-size:0.78rem;color:var(--peng-muted);text-align:center">Processed locally in your browser. Not connected to Stripe or any processor.</p>
      </form>
    </div>
  `;

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Processing demo payment…';
    setTimeout(() => {
      const res = Store.createOrder({
        name: data.get('name'),
        email: data.get('email')
      });
      if (!res.ok) {
        ui.toast(res.error);
        btn.disabled = false;
        btn.textContent = 'Try again';
        return;
      }
      location.href = F.pageUrl('order-confirmed');
    }, 900);
  });
})();
