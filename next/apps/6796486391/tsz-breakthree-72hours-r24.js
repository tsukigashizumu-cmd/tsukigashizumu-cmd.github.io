/* TSZ BreakThree R24: static decorative 72-hour motif, not app data or UI. */
(() => {
  'use strict';
  const ID = '6796486391';
  const MARK = 'tsz-bt72';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== ID && body.dataset.p19AppId !== ID)) return;
    const hero = document.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + MARK)) return;
    const motif = document.createElement('div');
    motif.className = MARK;
    motif.setAttribute('aria-hidden', 'true');
    motif.dataset.tszBreakthree = 'r24-symbolic-not-screenshot';
    motif.innerHTML = '<div class="tsz-bt72__number"><div class="tsz-bt72__time">72<small>h</small></div><div class="tsz-bt72__rule"></div><div class="tsz-bt72__mini"><span></span><span></span><span></span></div></div><div class="tsz-bt72__candles"><i class="tsz-bt72__candle"></i><i class="tsz-bt72__candle"></i><i class="tsz-bt72__candle"></i><i class="tsz-bt72__ground"></i></div>';
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', motif);
    else hero.appendChild(motif);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
