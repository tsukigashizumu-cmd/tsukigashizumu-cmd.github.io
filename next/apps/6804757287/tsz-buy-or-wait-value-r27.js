/* TSZ Buy or Wait R27: example $20 over 14 days, not an actual sale or predicted price. */
(() => {
  'use strict';
  const APP = '6804757287';
  const FLAG = 'tsz-bow27';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + FLAG)) return;
    const art = document.createElement('div');
    art.className = FLAG;
    art.setAttribute('aria-hidden', 'true');
    art.dataset.tszIllustration = 'buy-or-wait-r27-concept-not-screenshot-not-price-forecast';
    art.innerHTML = '<div class="tsz-bow27__panel tsz-bow27__panel--save">' +
      '<div class="tsz-bow27__top"><span class="tsz-bow27__coin"></span><span class="tsz-bow27__rule"></span></div>' +
      '<div class="tsz-bow27__main tsz-bow27__main--save"><small>−$</small><strong>20</strong></div>' +
      '<span class="tsz-bow27__bar"></span></div>' +
      '<div class="tsz-bow27__vs"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 11h20m0 0-5-5m5 5-5 5M26 21H6m0 0 5-5m-5 5 5 5"/></svg></div>' +
      '<div class="tsz-bow27__panel tsz-bow27__panel--wait">' +
      '<div class="tsz-bow27__top"><span class="tsz-bow27__hourglass"></span><span class="tsz-bow27__rule tsz-bow27__rule--warm"></span></div>' +
      '<div class="tsz-bow27__main tsz-bow27__main--wait"><strong>14</strong><small>d</small></div>' +
      '<span class="tsz-bow27__bar tsz-bow27__bar--wait"></span></div>';
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
