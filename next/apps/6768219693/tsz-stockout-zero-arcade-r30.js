/* Stockout Zero R30 — an arcade illustration, not actual gameplay capture. */
(() => {
  'use strict';
  const APP = '6768219693';
  const CLASS = 'tsz-sz30';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + CLASS)) return;
    const art = document.createElement('div');
    art.className = CLASS;
    art.dataset.tszIllustration = 'stockout-zero-r30-concept-not-screenshot';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = `
      <div class="tsz-sz30__stripe"><span class="tsz-sz30__lights"><i></i><i></i><i></i></span><span class="tsz-sz30__stripe-rail"></span></div>
      <div class="tsz-sz30__stages">
        <div class="tsz-sz30__node">
          <div class="tsz-sz30__tap"><svg viewBox="0 0 32 32"><path d="M13 23V9.5a3 3 0 0 1 6 0v9M19 18l2-1.3c1.3-.8 3.1.1 3.1 1.8l-.2 5.5c-.1 2.9-2.5 5-5.6 5H15c-1.6 0-3.1-.8-4-2L6.7 21c-1.1-1.7 1-3.8 2.7-2.6l3.6 2.6"/></svg></div>
          <div class="tsz-sz30__node-num">+1</div>
        </div>
        <i class="tsz-sz30__arrow"></i>
        <div class="tsz-sz30__node">
          <div class="tsz-sz30__rack"><i></i><i></i><i></i><i></i></div>
          <div class="tsz-sz30__node-num tsz-sz30__node-num--mid">×4</div>
        </div>
        <i class="tsz-sz30__arrow"></i>
        <div class="tsz-sz30__node">
          <div class="tsz-sz30__zero">0</div>
          <div class="tsz-sz30__target"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <div class="tsz-sz30__bottom"><i></i><i></i><i></i><b>∞</b></div>`;
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
