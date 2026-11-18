/* TSZ LP R372 — PromptDock AI scoped locale bridge. No storage, analytics, or external requests.
   Navigation uses existing publisher-owned common translations. Module R351 is
   synchronized to the page language; unsupported module languages are explicitly
   identified as English fallbacks. NOT a claim of complete 50-locale translation. */
(()=>{'use strict';
  const APP='6772130038';
  if(document.body?.dataset?.p19AppId!==APP)return;
  const $=id=>document.getElementById(id);
  const EL={
    'p19-language-label':'language', 'p19-region-label':'region',
    'p19-all-apps':'all','p19-back-link':'back','p19-related-back':'back',
    'p19-store-link':'store','p19-bottom-store':'store',
    'p19-contents-heading':'toc','p19-price-note':'note',
    'p19-related-copy':'relatedText','p19-description-heading':'full',
    'p196-disclosure-title':'fullToggle'
  };
  const RTL=new Set(['ar-SA','he','ur-PK']);
  const FALLBACK_MESSAGE='The article overview and some interactive examples are not translated into this language. English text may still appear. The App Store description uses an available listing language.';
  const JA_MESSAGE='ページ本文の一部と操作型デモには未翻訳の英語が残っています。App Storeの説明文は掲載済みの言語で表示します。';
  const DEMO_MESSAGE='This interactive example is displayed in English because a translation for the selected page language is not available.';
  let common=null, serial=0;
  const language=()=>$('p19-language')?.value||'en-US';
  const set=(id,v)=>{const node=$(id);if(node&&typeof v==='string'&&v.trim())node.textContent=v;};
  function notice(id,parent,after){
    let node=$(id);
    if(!node){node=document.createElement('p');node.id=id;node.setAttribute('role','status');
      node.style.cssText='max-width:70rem;margin:1rem auto;padding:0.75rem 1rem;border:1px solid currentColor;border-radius:10px;font:500 0.85rem/1.5 system-ui;opacity:.84;';
      if(after)parent?.insertAdjacentElement('afterbegin',node);else parent?.append(node);
    }
    return node;
  }
  function synchronizeDemo(loc){
    const root=$('tsz-promptdock-r351');if(!root)return;
    const supported=loc.startsWith('ja')?'ja':(loc.startsWith('ar')?'ar':'en');
    const button=root.querySelector('[data-lang="'+supported+'"]');
    if(button&&button.getAttribute('aria-pressed')!=='true')button.click();
    const nav=root.querySelector('.pd-langs');
    if(nav){nav.style.display='none';nav.setAttribute('aria-hidden','true');}
    root.dataset.tszR372SelectedLocale=loc;
    root.dataset.tszR372Fallback=String(!(
      (supported==='ja'&&loc.startsWith('ja'))||
      (supported==='ar'&&loc.startsWith('ar'))||
      (supported==='en'&&loc.startsWith('en'))
    ));
    const warning=notice('tsz-promptdock-r372-demo-notice',root.querySelector('.pd-shell')||root,true);
    const needFallback=root.dataset.tszR372Fallback==='true';
    warning.hidden=!needFallback;
    warning.textContent=needFallback?DEMO_MESSAGE:'';
    warning.lang='en';warning.dir='ltr';
    // Keep original user input: the R351 module uses its own dirty-state guard.
  }
  function synchronizeChrome(loc){
    if($('p19-detail')?.hidden)return;
    const rows=common?.locales?.[loc];
    if(rows){
      for(const [id,key] of Object.entries(EL))set(id,rows[key]);
      const lang=$('p19-language');if(lang)lang.setAttribute('aria-label',rows.language||'Language');
      const region=$('p19-region');if(region)region.setAttribute('aria-label',rows.region||'App Store region');
      const footer=document.querySelector('.p19-footer span');if(footer&&rows.footer)footer.textContent=rows.footer;
      const prev=$('p193-prev');if(prev&&rows.prev)prev.setAttribute('aria-label',rows.prev);
      const next=$('p193-next');if(next&&rows.next)next.setAttribute('aria-label',rows.next);
      const close=$('p19-zoom-close');if(close&&rows.close)close.setAttribute('aria-label',rows.close);
      const fit=$('p193-zoom-fit');if(fit&&rows.fit)fit.textContent=rows.fit;
    }
    document.documentElement.lang=loc;
    document.documentElement.dir=RTL.has(loc)?'rtl':'ltr';
    const n=notice('tsz-promptdock-r372-translation-notice',$('p19-detail'),true);
    n.hidden=loc==='en-US';
    n.textContent=loc.startsWith('ja')?JA_MESSAGE:FALLBACK_MESSAGE;
    n.lang=loc.startsWith('ja')?'ja':'en';
    n.dir=loc.startsWith('ja')?'ltr':'ltr';
    n.dataset.tszR372TranslationStatus='PARTIAL_NOT_NATIVE_REVIEWED';
    synchronizeDemo(loc);
  }
  function notify(source){
    const loc=language();
    window.dispatchEvent(new CustomEvent('tsz:locale-change',{detail:{locale:loc,source:'promptdock-r372',originalEvent:source}}));
  }
  function schedule(source){
    const s=++serial;
    // app-detail.js renders synchronously on change; defer until after its listener.
    Promise.resolve().then(()=>{if(s!==serial)return;synchronizeChrome(language());notify(source);});
  }
  async function loadCommon(){
    try{
      const r=await fetch('../../data/tsz-r39r4-common-ui.json',{cache:'no-store'});
      if(!r.ok)throw Error('LOCAL_DICTIONARY_'+r.status);
      const value=await r.json();
      if(value?.kind!=='tsz-common-article-ui-exact-reuse'||Object.keys(value.locales||{}).length!==50)throw Error('INVALID_COMMON_DICTIONARY');
      common=value;
    }catch(_){common=null;}
    schedule('dictionary-ready');
  }
  function init(){
    const select=$('p19-language');if(!select)return;
    select.addEventListener('change',()=>schedule('user-selection'));
    const detail=$('p19-detail');
    if(detail){const ob=new MutationObserver(()=>{if(!detail.hidden)schedule('article-ready');});ob.observe(detail,{attributes:true,attributeFilter:['hidden']});}
    const main=document.querySelector('main')||document.body;
    const ob=new MutationObserver(list=>{
      if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.id==='tsz-promptdock-r351'||n.querySelector?.('#tsz-promptdock-r351')))))schedule('demo-ready');
    });
    ob.observe(main,{subtree:true,childList:true});
    void loadCommon();schedule('initial');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
