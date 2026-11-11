(function () {
  const Store = window.PENG_STORE;
  const F = window.PENG_FORMAT;
  const UI = window.PENG_UI;

  UI.initStorefront({ active: 'about', title: 'About' });
  const brand = Store.getBrand();
  const root = document.getElementById('about-root');

  root.innerHTML = `
    <div class="peng-container peng-section peng-fade-in">
      <div style="display:grid;gap:2rem;align-items:center" class="about-grid">
        <div style="border-radius:1.5rem;overflow:hidden;aspect-ratio:1;border:1px solid var(--peng-sand);max-width:26rem">
          <img src="${F.escapeHtml(F.assetPath(brand.avatarImage))}" alt="${F.escapeHtml(brand.name)}" style="width:100%;height:100%;object-fit:cover">
        </div>
        <div>
          <p style="margin:0 0 0.5rem;color:var(--peng-accent);font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-size:0.8rem">${F.escapeHtml(brand.handle)}</p>
          <h1 class="peng-section-title">About ${F.escapeHtml(brand.name)}</h1>
          <p style="color:var(--peng-muted);font-size:1.05rem;line-height:1.7">${F.escapeHtml(brand.aboutStory || brand.bio)}</p>
          <div class="peng-stat-row">
            ${(brand.followerStats || [])
              .map(
                (s) => `
              <div class="peng-stat"><strong>${F.escapeHtml(s.value)}</strong><span>${F.escapeHtml(s.label)}</span></div>`
              )
              .join('')}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.25rem">
            ${(brand.socials || [])
              .map((s) => `<a class="peng-btn peng-btn-ghost" href="${F.escapeHtml(s.url)}">${F.escapeHtml(s.label)}</a>`)
              .join('')}
          </div>
        </div>
      </div>
      <div class="peng-grid-recipes" style="margin-top:3rem">
        ${(brand.funFacts || [])
          .map(
            (f) => `
          <div class="peng-card" style="padding:1.25rem">
            <h3 style="margin:0 0 0.5rem;color:var(--peng-primary)">${F.escapeHtml(f.title)}</h3>
            <p style="margin:0;color:var(--peng-muted)">${F.escapeHtml(f.text)}</p>
          </div>`
          )
          .join('')}
      </div>
    </div>
    <style>@media(min-width:900px){.about-grid{grid-template-columns:0.8fr 1.2fr !important}}</style>
  `;
})();
