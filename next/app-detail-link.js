/* P19-1: minimal, non-invasive secondary detail link for PromptDock cards. */
(() => {
  'use strict';
  const detail='/next/apps/6772130038/';
  const label=()=>/^ja(?:-|$)/i.test(document.documentElement.lang||'')?'詳しく見る':'Explore details';
  function enhance(){
    for(const card of document.querySelectorAll('.app-card')){
      if(card.querySelector('.p19-detail-link'))continue;
      const store=[...card.querySelectorAll('a[href]')].find(a=>{
        try{const u=new URL(a.href);return u.hostname==='apps.apple.com'&&/\/id6772130038(?:$|[/?#])/.test(u.pathname);}catch(_){return false;}
      });
      if(!store)continue;
      const anchor=document.createElement('a');anchor.className='p19-detail-link';anchor.href=detail;anchor.textContent=label();anchor.setAttribute('aria-label',label()+': PromptDock AI');
      const footer=card.querySelector('.app-footer');if(footer)footer.insertBefore(anchor,store);
    }
    document.querySelectorAll('.p19-detail-link').forEach(a=>{a.textContent=label();a.setAttribute('aria-label',label()+': PromptDock AI');});
  }
  function init(){
    enhance();const main=document.querySelector('main');if(!main)return;
    const obs=new MutationObserver(list=>{if(list.some(r=>r.type==='childList'))enhance();});
    obs.observe(main,{childList:true,subtree:true});
    document.addEventListener('tsz-locale-changed',enhance);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
