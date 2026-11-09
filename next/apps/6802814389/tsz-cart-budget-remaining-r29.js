/* Cart Budget R29 — 100 - 72 = 28 illustrative budget, not an app screenshot. */
(() => {
  'use strict';
  const APP = '6802814389';
  const CLASS = 'tsz-cb29';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + CLASS)) return;
    const art = document.createElement('div');
    art.className = CLASS;
    art.setAttribute('aria-hidden', 'true');
    art.dataset.tszIllustration = 'cart-budget-r29-concept-not-screenshot';
    art.innerHTML = `
      <div class="tsz-cb29__summary">
        <div class="tsz-cb29__eyebrow">
          <svg class="tsz-cb29__cart" viewBox="0 0 24 24"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6H19l2-9.5H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
          <span class="tsz-cb29__dots"><i></i><i></i><i></i></span>
        </div>
        <div class="tsz-cb29__equation">
          <span class="tsz-cb29__number tsz-cb29__number--left">100</span>
          <span class="tsz-cb29__operator">−</span>
          <span class="tsz-cb29__number tsz-cb29__number--used">72</span>
          <span class="tsz-cb29__operator">=</span>
          <span class="tsz-cb29__number tsz-cb29__number--remaining">28</span>
        </div>
        <div class="tsz-cb29__rule"></div>
        <div class="tsz-cb29__lines">
          <div class="tsz-cb29__line"><i class="tsz-cb29__square"></i><i class="tsz-cb29__stub"></i><span class="tsz-cb29__amount">25</span></div>
          <div class="tsz-cb29__line"><i class="tsz-cb29__square"></i><i class="tsz-cb29__stub"></i><span class="tsz-cb29__amount">18</span></div>
          <div class="tsz-cb29__line"><i class="tsz-cb29__square"></i><i class="tsz-cb29__stub"></i><span class="tsz-cb29__amount">29</span></div>
        </div>
      </div>
      <div class="tsz-cb29__ring-wrap">
        <svg class="tsz-cb29__ring" viewBox="0 0 100 100" focusable="false">
          <circle class="tsz-cb29__track" cx="50" cy="50" r="40" pathLength="100"></circle>
          <circle class="tsz-cb29__used" cx="50" cy="50" r="40" pathLength="100"></circle>
          <circle class="tsz-cb29__remaining" cx="50" cy="50" r="40" pathLength="100"></circle>
        </svg>
        <div class="tsz-cb29__inner"><strong>28</strong><span></span><b>100</b></div>
      </div>`;
    const cta = hero.querySelector('.p19-actions');
    if (cta) cta.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
