/* TSZ_P19_8A. Static four-section navigator, no fetch, timers or observers.
   Never writes to cards, prices, catalog, i18n resources or attribution. */
(()=>{
  'use strict';
  const root=document.getElementById('tsz-p198-guide');
  if(!root)return;
  const ids=['choose','free-now','paid-now','catalog'];
  const sections=ids.map(id=>document.getElementById(id));
  if(sections.some(s=>!s))return;
  const current=root.querySelector('#tsz-p198-current');
  const meter=root.querySelector('#tsz-p198-progress');
  const links=Array.from(root.querySelectorAll('.p198-chapter'));
  const accordion=root.querySelector('.p198-accordion');
  let currentIndex=-1,scheduled=false;
  const update=()=>{
    scheduled=false;
    let index=0;
    // Last section whose top has crossed a small, stable viewing threshold.
    for(let n=0;n<sections.length;n++){
      if(sections[n].getBoundingClientRect().top<=Math.min(220,window.innerHeight*.30)) index=n;
    }
    if(index===currentIndex)return;
    currentIndex=index;
    const label=String(index+1).padStart(2,'0');
    if(current.textContent!==label)current.textContent=label;
    meter.value=index+1;
    links.forEach((a,i)=>{
      if(i===index)a.setAttribute('aria-current','step');
      else if(a.hasAttribute('aria-current'))a.removeAttribute('aria-current');
    });
  };
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  links.forEach(link=>link.addEventListener('click',()=>{
    // Native accordion closure is local to this card. Avoid overlay animations.
    if(accordion)accordion.open=false;
    schedule();
  }));
  schedule();
})();
