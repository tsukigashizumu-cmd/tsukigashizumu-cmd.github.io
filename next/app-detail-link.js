/* P19-7R6: idempotent PromptDock detail-link enhancer; prevent observer self-loop. */
(() => {
  'use strict';
  const detail='/next/apps/6772130038/';
  const label=()=>/^ja(?:-|$)/i.test(document.documentElement.lang||'')?'詳しく見る':'Explore details';
  const isPromptDockStoreLink=(a)=>{
    try {const u=new URL(a.href);return u.hostname==='apps.apple.com'&&/\/id6772130038(?:$|[/?#])/.test(u.pathname);}
    catch(_){return false;}
  };
  function enhance(){
    const text=label(),aria=text+': PromptDock AI';
    for(const card of document.querySelectorAll('.app-card')){
      let anchor=card.querySelector('.p19-detail-link');
      if(!anchor){
        const store=[...card.querySelectorAll('a[href]')].find(isPromptDockStoreLink);
        if(!store)continue;
        const footer=card.querySelector('.app-footer');if(!footer)continue;
        anchor=document.createElement('a');anchor.className='p19-detail-link';anchor.href=detail;
        anchor.textContent=text;anchor.setAttribute('aria-label',aria);
        footer.insertBefore(anchor,store);
      }
      // Assigning textContent on every MutationObserver callback replaces its text
      // node and triggers another childList event. Update ONLY on actual change.
      if(anchor.textContent!==text)anchor.textContent=text;
      if(anchor.getAttribute('aria-label')!==aria)anchor.setAttribute('aria-label',aria);
    }
  }
  function init(){
    enhance();const main=document.querySelector('main');if(!main)return;
    const obs=new MutationObserver(records=>{
      // Child additions inside our own link never require card re-enhancement.
      if(!records.some(r=>r.type==='childList' &&
        !(r.target.nodeType===1 && r.target.closest('.p19-detail-link'))))return;
      enhance();
    });
    obs.observe(main,{childList:true,subtree:true});
    document.addEventListener('tsz-locale-changed',enhance);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
