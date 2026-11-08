/* TSZ Warranty Deadline R26: static numeric example, not actual coverage or app UI. */
(() => {
  'use strict';
  const APP = '6804757195';
  const FLAG = 'tsz-wd26';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + FLAG)) return;
    const art = document.createElement('div');
    art.className = FLAG;
    art.setAttribute('aria-hidden', 'true');
    art.dataset.tszIllustration = 'warranty-r26-example-not-screenshot-not-coverage';
    art.innerHTML = '<div class="tsz-wd26__metric">'+
      '<span class="tsz-wd26__status"><i></i><b></b></span>'+
      '<strong class="tsz-wd26__count">30<small>d</small></strong>'+
      '<span class="tsz-wd26__ticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>'+
      '<div class="tsz-wd26__viz">'+
      '<div class="tsz-wd26__card"><span class="tsz-wd26__card-head"><b class="tsz-wd26__card-dot"></b><i></i></span>'+
      '<i class="tsz-wd26__card-line"></i><i class="tsz-wd26__card-line"></i><i class="tsz-wd26__card-line"></i><i class="tsz-wd26__rule"></i></div>'+
      '<div class="tsz-wd26__shield"><i class="tsz-wd26__shield-shape"></i><i class="tsz-wd26__shield-inner"></i><i class="tsz-wd26__check"></i></div></div>';
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
