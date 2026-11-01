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
    source.textContent=slides.length?t.from+' · '+storefront().toUpperCase()+' · '+(slide+1)+' / '+slides.length:'';if(slides.length)qualityLine.textContent=qualityNote(slide);
    store.href='https://apps.apple.com/'+storefront()+'/app/id'+id;
    shot.alt=slides.length?t.media+' '+(slide+1):'';
    el.lang=japanese()?'ja':'en';
    const notice=el.querySelector('#p198c-translation-note');notice.hidden=japanese()||String(lang?.value||'').startsWith('en');notice.textContent=t.english;
    if(slides.length)zoomHint.textContent=japanese()?'画像を押して拡大 ↗':'Tap image to inspect ↗';
  }
  // P19-8CR1: allow direct screenshot click and validate higher-resolution Apple CDN renditions.
  // Never upscale by pretending that a bigger CSS box adds image information.
  const orig=[],meta=[],qualityRequests=new Set();
  const clickToInspect=document.createElement('button');
  clickToInspect.type='button';clickToInspect.id='p198cr1-open';clickToInspect.className='c-shot-click';
  clickToInspect.setAttribute('aria-label','画像を拡大 / Enlarge screenshot');
  const zoomHint=document.createElement('span');zoomHint.className='c-zoom-hint';
  zoomHint.textContent='画像を拡大 ↗';
  shot.parentNode.insertBefore(clickToInspect,shot);clickToInspect.append(shot,zoomHint);
  const qualityLine=document.createElement('p');qualityLine.id='p198cr1-quality';qualityLine.className='c-quality';
  media.append(qualityLine);
  const modal=document.createElement('dialog');modal.className='p198cr1-dialog';modal.id='p198cr1-dialog';
  modal.innerHTML='<div class="p198cr1-window"><header class="p198cr1-top"><strong id="p198cr1-title">PromptDock AI · 公開画像</strong><button type="button" id="p198cr1-close">閉じる ×</button></header><div class="p198cr1-viewport" id="p198cr1-viewport" tabindex="0"><img id="p198cr1-image" alt=""></div><footer class="p198cr1-bottom"><div class="p198cr1-buttons"><button type="button" id="p198cr1-prev">‹</button><span id="p198cr1-count">01 / 03</span><button type="button" id="p198cr1-next">›</button></div><p id="p198cr1-note" role="status"></p><div class="p198cr1-buttons"><button type="button" id="p198cr1-fit">Fit</button><button type="button" id="p198cr1-actual">1:1</button></div></footer></div>';
  document.body.appendChild(modal);
  const mimg=modal.querySelector('#p198cr1-image'),vp=modal.querySelector('#p198cr1-viewport');
  const mnote=modal.querySelector('#p198cr1-note'),mcount=modal.querySelector('#p198cr1-count');
  const mprev=modal.querySelector('#p198cr1-prev'),mnext=modal.querySelector('#p198cr1-next');
  let magnification='fit', modalRequest=0;
  const jp=()=>japanese();
  const highUrl=src=>{try{
    const u=new URL(src);if(!safeImage(u.href)||!u.pathname.includes('/image/thumb/'))return '';
    const m=u.pathname.match(/\/(\d{2,4})x(\d{2,4})bb\.(webp|png|jpe?g)$/i);
    if(!m||Number(m[1])>=1200&&Number(m[2])>=2200)return '';
    u.pathname=u.pathname.replace(/\/\d{2,4}x\d{2,4}bb\.(webp|png|jpe?g)$/i,'/1290x2796bb.'+m[3]);
    return safeImage(u.href);
  }catch(_){return '';}};
  function probe(url,limit=4800){return new Promise(done=>{
    const im=new Image();let settled=false;
    const finish=answer=>{if(settled)return;settled=true;clearTimeout(timer);im.onload=null;im.onerror=null;done(answer);};
    const timer=setTimeout(()=>finish(null),limit);
    im.referrerPolicy='no-referrer';im.onload=()=>finish({url,width:im.naturalWidth,height:im.naturalHeight});
    im.onerror=()=>finish(null);im.src=url;
    if(im.complete&&im.naturalWidth)finish({url,width:im.naturalWidth,height:im.naturalHeight});
  });}
  function qualityNote(index){const data=meta[index],dimension=data?.width&&data?.height ? data.width+' × '+data.height+' px':'';
    if(!dimension)return jp()?'画像の解像度を確認中…':'Checking image pixels…';
    if(data.upgraded)return (jp()?'高解像度版を確認：':'Verified larger image: ')+dimension;
    if(data.width<800||data.height<1600)return (jp()?'元画像の解像度が不足：':'Source image is limited: ')+dimension;
    return (jp()?'画像の実解像度：':'Image pixels: ')+dimension;
  }
  function sizing(){if(!mimg.naturalWidth||!mimg.naturalHeight)return;
    const w=mimg.naturalWidth,h=mimg.naturalHeight;
    const ratio=magnification==='actual'?1:Math.min(1,(Math.max(1,vp.clientWidth)-24)/w,(Math.max(1,vp.clientHeight)-24)/h);
    mimg.style.width=Math.max(1,Math.round(w*ratio))+'px';
    mimg.style.height=Math.max(1,Math.round(h*ratio))+'px';
    mnote.textContent=qualityNote(slide)+(jp()?' · 1:1でも画像にない文字情報は復元できません。':' · 1:1 does not restore missing text detail.');
  }
  function modalShow(){if(!modal.open||!slides.length)return;
    const request=++modalRequest;magnification='fit';mcount.textContent=String(slide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    mprev.disabled=slides.length<2;mnext.disabled=slides.length<2;
    modal.querySelector('#p198cr1-title').textContent='PromptDock AI · '+(jp()?'公開画像':'Published screenshot');
    modal.querySelector('#p198cr1-close').textContent=jp()?'閉じる ×':'Close ×';
    mnote.textContent=qualityNote(slide);mimg.style.width='';mimg.style.height='';
    mimg.onload=()=>{if(request===modalRequest)sizing();};
    mimg.onerror=()=>{if(request===modalRequest)mnote.textContent=jp()?'画像を表示できません。':'Unable to display image.';};
    mimg.referrerPolicy='no-referrer';mimg.alt=(jp()?'公開画像 ':'Screenshot ')+(slide+1);
    mimg.src=slides[slide];if(mimg.complete&&mimg.naturalWidth)sizing();
    vp.scrollTop=0;vp.scrollLeft=0;
  }
  function openShot(){if(!slides.length||typeof modal.showModal!=='function')return;
    if(!modal.open)modal.showModal();modalShow();vp.focus({preventScroll:true});}
  clickToInspect.addEventListener('click',openShot);
  modal.querySelector('#p198cr1-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
  modal.addEventListener('close',()=>{modalRequest++;});
  const step=d=>{if(!slides.length)return;slide=(slide+d+slides.length)%slides.length;show();modalShow();};
  mprev.addEventListener('click',()=>step(-1));mnext.addEventListener('click',()=>step(1));
  modal.querySelector('#p198cr1-fit').addEventListener('click',()=>{magnification='fit';sizing();});
  modal.querySelector('#p198cr1-actual').addEventListener('click',()=>{magnification='actual';sizing();});
  modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}if(e.key==='ArrowRight'){e.preventDefault();step(1);}});
  window.addEventListener('resize',()=>{if(modal.open&&magnification==='fit')sizing();},{passive:true});
  // Probe one selected screenshot at a time. An unsuccessful high-res request
  // never hides the original, changes storefront data, or blocks the catalog.
  async function improve(index){const original=orig[index];if(!original||qualityRequests.has(original))return;
    qualityRequests.add(original);const request=serial;
    const source=await probe(original),candidate=highUrl(original);
    const larger=candidate?await probe(candidate):null;
    if(request!==serial||orig[index]!==original)return;
    const same=source&&larger&&Math.abs(larger.width/Math.max(1,larger.height)-source.width/Math.max(1,source.height))<.035;
    const better=Boolean(same&&larger.width>=source.width*1.5&&larger.height>=source.height*1.5);
    const chosen=better?larger:source;
    if(!chosen)return;
    meta[index]={width:chosen.width,height:chosen.height,upgraded:better};
    if(better)slides[index]=chosen.url;
    if(index===slide){show();if(modal.open)modalShow();}
  }
  function show(){const available=slides.length>0;shot.hidden=!available;clickToInspect.hidden=!available;
    status.hidden=available;prev.disabled=!available||slides.length<2;next.disabled=!available||slides.length<2;
    qualityLine.hidden=!available;
    if(!available){pos.textContent='— / —';source.textContent='';qualityLine.textContent='';return;}
    shot.src=slides[slide];shot.alt=T().media+' '+(slide+1);pos.textContent=String(slide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    source.textContent=T().from+' · '+storefront().toUpperCase()+' · '+(slide+1)+' / '+slides.length;
    qualityLine.textContent=qualityNote(slide);
    zoomHint.textContent=jp()?'画像を押して拡大 ↗':'Tap image to inspect ↗';
    void improve(slide);
  }
  function stop(){serial++;if(modal.open)modal.close();orig.length=0;meta.length=0;qualityRequests.clear();if(controller){controller.abort();controller=null;}slides=[];slide=0;shot.removeAttribute('src');shot.hidden=true;media.dataset.state='loading';status.hidden=false;show();localize();}
  async function fetchImages(){if(!started)return;stop();const request=serial,region=storefront();lastRegion=region;const abort=new AbortController();controller=abort;
    const timeout=setTimeout(()=>abort.abort(),7000);
    try{
      const response=await fetch('https://itunes.apple.com/lookup?country='+encodeURIComponent(region)+'&entity=software&id='+id,{signal:abort.signal,cache:'no-store',credentials:'omit',mode:'cors'});
      if(!response.ok)throw Error('HTTP');
      const data=await response.json();if(request!==serial)return;
      if(data?.resultCount!==1||!Array.isArray(data.results)||data.results.length!==1)throw Error('LOOKUP');
      const app=data.results[0];if(app.trackId!==id||app.artistId!==artist||app.kind!=='software')throw Error('ID');
      slides=(Array.isArray(app.screenshotUrls)?app.screenshotUrls:[]).slice(0,3).map(safeImage).filter(Boolean);orig.push(...slides);
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
