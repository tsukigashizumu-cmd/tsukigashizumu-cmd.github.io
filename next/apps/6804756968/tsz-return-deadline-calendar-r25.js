/* TSZ Return Deadline R25: decorative example, never a live return deadline. */
(() => {
  'use strict';
  const APP = '6804756968';
  const CLASS = 'tsz-rd25';
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const hero = body.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + CLASS)) return;
    const art = document.createElement('div');
    art.className = CLASS;
    art.setAttribute('aria-hidden', 'true');
    art.dataset.tszReturnExample = 'r25-conceptual-calendar-not-app-screenshot';
    const cells = Array.from({length:28}, (_,i) => {
      const n=i+1;
      return `<span class="tsz-rd25__day"${n===14?' data-last="1"':n>=8&&n<14?' data-progress="1"':''}>${String(n).padStart(2,'0')}</span>`;
    }).join('');
    art.innerHTML = '<div class="tsz-rd25__signal"><span class="tsz-rd25__dot"></span>'+
      '<strong class="tsz-rd25__number">14</strong>'+
      '<span class="tsz-rd25__line"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>'+
      '<div class="tsz-rd25__paper"><div class="tsz-rd25__binding"><span></span><span></span></div>'+
      '<div class="tsz-rd25__calendar">'+cells+'</div><div class="tsz-rd25__paper-rule"></div></div>';
    const buttons = hero.querySelector('.p19-actions');
    if (buttons) buttons.insertAdjacentElement('afterend', art);
    else hero.appendChild(art);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
