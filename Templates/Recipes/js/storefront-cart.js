(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  const ui = UI.initStorefront({ active: '', title: 'Cart', stickyCart: false });
  const root = document.getElementById('cart-root');

  function render() {
    const totals = Store.cartTotals();
    if (!totals.items.length) {
      root.innerHTML = `
        <div class="peng-container peng-section peng-fade-in">
          <h1 class="peng-section-title">Cart</h1>
          <div class="peng-empty">Your cart is empty. <a href="${F.pageUrl('recipes')}">Browse recipes</a></div>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="peng-container peng-section peng-fade-in" style="display:grid;gap:1.5rem">
        <h1 class="peng-section-title">Cart</h1>
        <div style="display:grid;gap:1.5rem" class="cart-layout">
          <div style="display:grid;gap:0.85rem">
            ${totals.items
              .map(
                (item) => `
              <div class="peng-card" style="display:grid;grid-template-columns:5rem 1fr auto;gap:0.85rem;align-items:center;padding:0.85rem">
                <div style="width:5rem;height:5rem;border-radius:0.85rem;overflow:hidden;background:var(--peng-sand)">
                  ${item.image ? `<img src="${F.escapeHtml(F.assetPath(item.image))}" alt="" style="width:100%;height:100%;object-fit:cover">` : ''}
                </div>
                <div>
                  <div style="font-weight:600;color:var(--peng-primary)">${F.escapeHtml(item.title)}</div>
                  <div style="font-size:0.85rem;color:var(--peng-muted)">${F.escapeHtml(F.money(item.price))} · ${item.type}</div>
                  <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem">
                    <button type="button" class="peng-icon-btn" data-qty="${F.escapeHtml(item.type)}:${F.escapeHtml(item.id)}:${(item.qty || 1) - 1}">−</button>
                    <span>${item.qty || 1}</span>
                    <button type="button" class="peng-icon-btn" data-qty="${F.escapeHtml(item.type)}:${F.escapeHtml(item.id)}:${(item.qty || 1) + 1}">+</button>
                  </div>
                </div>
                <div style="text-align:right">
                  <div style="font-weight:700">${F.escapeHtml(F.money(item.price * (item.qty || 1)))}</div>
                  <button type="button" class="peng-btn peng-btn-ghost" style="margin-top:0.5rem;padding:0.35rem 0.7rem;font-size:0.75rem" data-remove="${F.escapeHtml(item.type)}:${F.escapeHtml(item.id)}">Remove</button>
                </div>
              </div>`
              )
              .join('')}
          </div>
          <aside class="peng-card" style="padding:1.25rem;height:fit-content">
            <h2 style="margin:0 0 1rem;font-size:1.2rem;color:var(--peng-primary)">Summary</h2>
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem"><span>Subtotal</span><strong>${F.escapeHtml(F.moneyExact(totals.subtotal))}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;color:var(--peng-muted)"><span>Discount ${totals.discount ? `(${F.escapeHtml(totals.discount.code)})` : ''}</span><span>−${F.escapeHtml(F.moneyExact(totals.discountAmount))}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:1.15rem;margin-bottom:1rem"><span>Total</span><strong>${F.escapeHtml(F.moneyExact(totals.total))}</strong></div>
            <form id="discount-form" style="display:flex;gap:0.5rem;margin-bottom:1rem">
              <input class="peng-input" name="code" placeholder="Discount code" value="${totals.discount ? F.escapeHtml(totals.discount.code) : ''}">
              <button class="peng-btn peng-btn-ghost" type="submit">Apply</button>
            </form>
            ${totals.discount ? `<button type="button" class="peng-btn peng-btn-ghost" style="width:100%;margin-bottom:0.75rem" id="clear-discount">Remove code</button>` : ''}
            <a class="peng-btn peng-btn-primary" style="width:100%" href="${F.pageUrl('checkout')}">Checkout</a>
            <a href="${F.pageUrl('recipes')}" style="display:block;text-align:center;margin-top:0.85rem;font-size:0.85rem;color:var(--peng-muted)">Continue shopping</a>
          </aside>
        </div>
      </div>
      <style>@media(min-width:900px){.cart-layout{grid-template-columns:1.4fr 0.8fr}}</style>
    `;

    root.querySelectorAll('[data-qty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [type, id, qty] = btn.getAttribute('data-qty').split(':');
        Store.updateCartQty(type, id, Number(qty));
        render();
        ui.updateCartBadge();
      });
    });
    root.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [type, id] = btn.getAttribute('data-remove').split(':');
        Store.removeFromCart(type, id);
        render();
        ui.updateCartBadge();
      });
    });
    document.getElementById('discount-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = new FormData(e.target).get('code');
      const res = Store.applyDiscountCode(code);
      if (!res.ok) ui.toast(res.error);
      else ui.toast(`Applied ${res.discount.code}`);
      render();
    });
    document.getElementById('clear-discount')?.addEventListener('click', () => {
      Store.clearDiscount();
      render();
    });
  }

  render();
})();
