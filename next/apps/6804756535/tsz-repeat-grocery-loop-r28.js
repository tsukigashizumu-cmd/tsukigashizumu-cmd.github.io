/* Repeat Grocery List R28 — conceptual check-and-reset loop, not a screenshot. */
(() => {
  'use strict';
  const APP = '6804756535';
  const FLAG = 'tsz-rgl28';
  const row = (icon, width) => '<div class="tsz-rgl28__line">' +
      '<span class="tsz-rgl28__tick"><svg viewBox="0 0 16 16"><path d="m3 8 3.2 3.1L13 4.5"/></svg></span>' +
      '<svg class="tsz-rgl28__glyph" viewBox="0 0 24 24"><path d="' + icon + '"/></svg>' +
      '<span class="tsz-rgl28__bar" style="max-width:' + width + 'px"></span></div>';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + FLAG)) return;
    const art = document.createElement('div');
    art.className = FLAG;
    art.setAttribute('aria-hidden', 'true');
    art.dataset.tszIllustration = 'repeat-grocery-list-r28-concept-not-screenshot';
    art.innerHTML = '<div class="tsz-rgl28__sheet">' +
      '<div class="tsz-rgl28__top"><strong><span>01</span> / 04</strong><span class="tsz-rgl28__dots"><i></i><i></i><i></i><i></i></span></div>' +
      '<div class="tsz-rgl28__list">' +
      row('M7 3h10v4l2 2v12H5V9l2-2zM7 7h10', 95) +
      row('M5 12c-2-5 3-9 7-8 4-1 9 3 7 8l-2 7H7z', 71) +
      row('M12 7c-5-6-12 0-9 8 1 5 6 7 9 4 3 3 8 1 9-4 3-8-4-14-9-8M12 7c0-4 2-5 5-5', 88) +
      row('M9 3h6M10 3v4l-4 5v9h12v-9l-4-5V3', 61) +
      '</div></div>' +
      '<div class="tsz-rgl28__loop"><div class="tsz-rgl28__ring">' +
      '<svg class="tsz-rgl28__arrow" viewBox="0 0 80 80"><path d="M59 25a25 25 0 1 0 7 26M59 25V10M59 25H44"/></svg>' +
      '</div><span class="tsz-rgl28__mini">01 ↻ 04</span></div>';
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once:true });
  else mount();
})();
