/* Unit Choice R32 — static conceptual unit-price comparison; not a screenshot or live price. */
(() => {
  'use strict';
  const APP='6762347699';
  const CLASS='tsz-uc32';
  const mount=()=>{
    const b=document.body;
    if(!b || (b.dataset.p199Id!==APP && b.dataset.p19AppId!==APP)) return;
    const hero=b.querySelector('.p19-hero-copy');
    if(!hero || hero.querySelector('.'+CLASS)) return;
    const art=document.createElement('div');
    art.className=CLASS;
    art.dataset.tszIllustration='unit-choice-r32-numerical-example-not-screenshot';
    art.setAttribute('aria-hidden','true');
    art.innerHTML=`
      <span class="tsz-uc32__glow"></span>
      <div class="tsz-uc32__header">
        <span class="tsz-uc32__logo"><span class="tsz-uc32__icon"><svg viewBox="0 0 24 24"><path d="M12 3v17M5 7h14M5 7l-3 6h6L5 7Zm14 0-3 6h6l-3-6ZM8 20h8"/></svg></span><span class="tsz-uc32__sparks"><i></i><i></i><i></i></span></span>
        <span class="tsz-uc32__top-rule"></span>
      </div>
      <div class="tsz-uc32__compare">
        <div class="tsz-uc32__panel">
          <div class="tsz-uc32__size"><strong>500</strong> g</div>
          <div class="tsz-uc32__cost">400</div>
          <div class="tsz-uc32__bars"><span></span></div>
          <div class="tsz-uc32__division"><div><div class="tsz-uc32__unit">0.80</div><span class="tsz-uc32__suffix">/ g</span></div></div>
        </div>
        <div class="tsz-uc32__panel tsz-uc32__panel--win">
          <div class="tsz-uc32__size"><strong>800</strong> g</div>
          <div class="tsz-uc32__cost">560</div>
          <div class="tsz-uc32__bars"><span></span></div>
          <div class="tsz-uc32__division"><div><div class="tsz-uc32__unit">0.70</div><span class="tsz-uc32__suffix">/ g</span></div><span class="tsz-uc32__win-mark"><svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-8"/></svg></span></div>
        </div>
      </div>
      <div class="tsz-uc32__tail"><div class="tsz-uc32__dots"><i></i><i></i><i></i></div><div class="tsz-uc32__delta">−12.5%</div></div>`;
    const actions=hero.querySelector('.p19-actions');
    if(actions) actions.insertAdjacentElement('afterend',art);
    else hero.appendChild(art);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
