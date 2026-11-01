/* TSZ P19-8C: verified PromptDock media pilot. No MutationObserver, app.js edits,
   catalog repaint, analytics overrides, setInterval, or autoplay. */
(()=>{
  'use strict';
  const el=document.getElementById('tsz-p198c-story');if(!el)return;
  const id=6772130038,artist=1817908735;
  const lang=document.getElementById('locale-select');
  const country=document.getElementById('tsz-storefront-select');
  const media=el.querySelector('#p198c-media');
  const shot=el.querySelector('#p198c-shot');
  const status=el.querySelector('#p198c-status');
  const source=el.querySelector('#p198c-source');
  const pos=el.querySelector('#p198c-position');
  const prev=el.querySelector('#p198c-prev'),next=el.querySelector('#p198c-next');
  const store=el.querySelector('#p198c-store');
  const texts={
    ja:{eyebrow:'APP STORY · 公開機能を確認',problem:'同じAIへの依頼を、毎回最初から書いていませんか。',solution:'テンプレートを選び、必要な項目を入力してプロンプトを生成・コピー。保存した入力セットや履歴から、次の依頼を始められます。',details:'実際にできること',step1:'内蔵テンプレートから始める',step2:'項目を埋めてプロンプトを生成・コピー',step3:'入力セットや履歴、カスタムテンプレートを再利用',caveat:'AIの回答を自動生成するアプリではありません。ChatGPTへのショートカットは任意です。',source:'App Store公開機能に基づく説明。体験談ではありません。',detail:'実画面と詳細を見る',store:'App Storeで見る',loading:'公開スクリーンショットを確認中…',none:'このストアの公開画像を確認できませんでした。詳細ページで確認できます。',media:'App Store公開画像',quality:'小さな文字は元画像の解像度に依存します。',english:'説明文は英語で表示しています。',from:'App Store公開画像'},
    en:{eyebrow:'APP STORY · VERIFIED FEATURES',problem:'Do you keep rewriting similar requests to AI?',solution:'Choose a template, fill in the fields, and generate a prompt to copy. Saved inputs, history, and custom templates support repeat requests.',details:'What the app actually does',step1:'Start from a built-in template',step2:'Fill fields, then generate and copy the prompt',step3:'Reuse saved inputs, history, and custom formats',caveat:'It does not automatically generate an AI answer. The ChatGPT shortcut is optional.',source:'Based on published product features, not customer testimonials.',detail:'Explore real screens and details',store:'View on App Store',loading:'Checking published screenshots…',none:'Verified screenshots are unavailable for this storefront. You can check the detail page.',media:'Published App Store screenshot',quality:'Small text clarity depends on the original image resolution.',english:'Editorial copy is in English.',from:'Published App Store screen'}
  };
  let serial=0,controller=null,slides=[],slide=0,started=false,lastRegion='';
  const japanese=()=>String(lang?.value||'').toLowerCase().startsWith('ja');
  const T=()=>texts[japanese()?'ja':'en'];
  const storefront=()=>/^[a-z]{2}$/.test(country?.value||'')?country.value:'us';
  const safeImage=(value)=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.port&&!u.username&&!u.password&&(u.hostname==='mzstatic.com'||u.hostname.endsWith('.mzstatic.com'))?u.href:'';}catch(_){return '';}};
  const label=(key,value)=>{const item=el.querySelector('[data-p198c="'+key+'"]');if(item&&item.textContent!==value)item.textContent=value;};
  function localize(){const t=T();['eyebrow','problem','solution','details','step1','step2','step3','caveat','source','detail','store'].forEach(k=>label(k,t[k]));
    if(!slides.length)status.textContent=t[media.dataset.state==='unavailable'?'none':'loading'];
    source.textContent=slides.length?t.from+' · '+storefront().toUpperCase()+' · '+(slide+1)+' / '+slides.length+' · '+t.quality:'';
    store.href='https://apps.apple.com/'+storefront()+'/app/id'+id;
    shot.alt=slides.length?t.media+' '+(slide+1):'';
    el.lang=japanese()?'ja':'en';
    const notice=el.querySelector('#p198c-translation-note');notice.hidden=japanese()||String(lang?.value||'').startsWith('en');notice.textContent=t.english;
  }
  function show(){const available=slides.length>0;shot.hidden=!available;
    status.hidden=available;prev.disabled=!available||slides.length<2;next.disabled=!available||slides.length<2;
    if(!available){pos.textContent='— / —';source.textContent='';return;}
    shot.src=slides[slide];shot.alt=T().media+' '+(slide+1);pos.textContent=String(slide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    source.textContent=T().from+' · '+storefront().toUpperCase()+' · '+(slide+1)+' / '+slides.length+' · '+T().quality;
  }
  function stop(){serial++;if(controller){controller.abort();controller=null;}slides=[];slide=0;shot.removeAttribute('src');shot.hidden=true;media.dataset.state='loading';status.hidden=false;show();localize();}
  async function fetchImages(){if(!started)return;stop();const request=serial,region=storefront();lastRegion=region;const abort=new AbortController();controller=abort;
    const timeout=setTimeout(()=>abort.abort(),7000);
    try{
      const response=await fetch('https://itunes.apple.com/lookup?country='+encodeURIComponent(region)+'&entity=software&id='+id,{signal:abort.signal,cache:'no-store',credentials:'omit',mode:'cors'});
      if(!response.ok)throw Error('HTTP');
      const data=await response.json();if(request!==serial)return;
      if(data?.resultCount!==1||!Array.isArray(data.results)||data.results.length!==1)throw Error('LOOKUP');
      const app=data.results[0];if(app.trackId!==id||app.artistId!==artist||app.kind!=='software')throw Error('ID');
      slides=(Array.isArray(app.screenshotUrls)?app.screenshotUrls:[]).slice(0,3).map(safeImage).filter(Boolean);
      if(!slides.length)throw Error('EMPTY');media.dataset.state='verified';
      shot.onerror=()=>{if(request===serial){slides=[];media.dataset.state='unavailable';show();status.textContent=T().none;}};
      show();
    }catch(_){if(request!==serial)return;slides=[];media.dataset.state='unavailable';show();status.hidden=false;status.textContent=T().none;}
    finally{clearTimeout(timeout);if(controller===abort)controller=null;}
  }
  prev.addEventListener('click',()=>{if(slides.length){slide=(slide-1+slides.length)%slides.length;show();}});
  next.addEventListener('click',()=>{if(slides.length){slide=(slide+1)%slides.length;show();}});
  const syncRegion=()=>{const region=storefront();if(started&&region!==lastRegion)void fetchImages();else localize();};
  country?.addEventListener('change',syncRegion);
  lang?.addEventListener('change',()=>{localize();setTimeout(syncRegion,200);});
  document.getElementById('tsz-storefront-auto')?.addEventListener('click',()=>setTimeout(syncRegion,200));
  document.addEventListener('tsz-locale-changed',()=>{localize();setTimeout(syncRegion,200);});
  localize();show();
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){io.disconnect();started=true;void fetchImages();}},{rootMargin:'200px'});io.observe(el);}
  else {started=true;void fetchImages();}
})();
