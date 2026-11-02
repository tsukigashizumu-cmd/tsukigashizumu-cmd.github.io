/* TSZ_P19_8B. Read-only page section tracker.
   No catalog writes, data requests, DOM watchers, timers, or business calculations. */
(()=>{
  'use strict';
  const root=document.getElementById('tsz-p198-guide');
  if(!root)return;
  const sectionIds=['choose','paid-now','free-now','catalog'];
  const sections=sectionIds.map(id=>document.getElementById(id));
  if(sections.some(s=>!s))return;
  const current=root.querySelector('#tsz-p198-current');
  const heading=root.querySelector('#tsz-p198-heading');
  const meter=root.querySelector('#tsz-p198-progress');
  const links=Array.from(root.querySelectorAll('.p198-chapter'));
  const accordion=root.querySelector('.p198-accordion');
  if(!current||!heading||!meter||links.length!==sections.length)return;
  let currentIndex=-1;
  let scheduled=false;
  const localizedTitle=(index)=>{
    const source=links[index]?.querySelector('[data-i18n]');
    return source?.textContent?.trim()||links[index]?.textContent?.replace(/^\s*0?[1-4]\s*/, '').trim()||'';
  };
  const render=(index)=>{
    const number=String(index+1).padStart(2,'0');
    const label=localizedTitle(index);
    if(current.textContent!==number)current.textContent=number;
    if(label&&heading.textContent!==label)heading.textContent=label;
    if(meter.value!==index+1)meter.value=index+1;
    const accessible=(label?label+' · ':'')+(index+1)+' / '+sections.length;
    if(meter.getAttribute('aria-label')!==accessible)meter.setAttribute('aria-label',accessible);
    links.forEach((link,i)=>{
      if(i===index){if(link.getAttribute('aria-current')!=='step')link.setAttribute('aria-current','step');}
      else if(link.hasAttribute('aria-current'))link.removeAttribute('aria-current');
    });
  };
  const update=()=>{
    scheduled=false;
    let index=0;
    const threshold=Math.min(150,Math.max(85,window.innerHeight*.18));
    for(let i=0;i<sections.length;i++){
      if(sections[i].getBoundingClientRect().top<=threshold)index=i;
    }
    currentIndex=index;
    render(index);
  };
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  window.addEventListener('pageshow',schedule);
  document.addEventListener('tsz-locale-changed',()=>{
    // i18n.js has already updated the four localizable link labels.
    if(currentIndex>=0)render(currentIndex);
    schedule();
  });
  links.forEach(link=>link.addEventListener('click',()=>{
    // Native disclosure closes within its original card, never becomes an overlay.
    if(accordion&&accordion.open)accordion.open=false;
    schedule();
  }));
  schedule();
})();
