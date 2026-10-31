/* P19-1: isolated product article. Never interprets /next/apps/ID/ as an inbound app source. */
(() => {
  'use strict';
  const APP_ID='6772130038', ARTIST_ID=1817908735;
  const HOME='/next/', PATH='/next/apps/'+APP_ID+'/';
  const $=id=>document.getElementById(id);
  const base='../../';
  const STRINGS={
    'en-US':{
      language:'Language',region:'App Store',all:'All apps',store:'View in App Store ↗',back:'Browse all apps',
      note:'Current price and availability vary by region. Confirm both on the App Store.',
      toc:'ON THIS PAGE',overview:'What it solves',screens:'Real app screens',workflow:'How it works',usecases:'When it helps',story:'Why it was made',description:'Full App Store description',related:'Keep exploring',
      constraint:'What to expect',steps:['Choose a template','Fill in the fields','Generate and copy your prompt'],
      screensNote:'Screenshots published for this app in the selected App Store. Individual screens may change with updates.',
      screenCaption:'App Store screenshot', fallback:'This description is shown in {language} because a {requested} description is not available in the current metadata.',
      source:'Source: App Store description, locale {language}; not an invented testimonial.',
      relatedText:'Explore the other apps by purpose, price and category in the catalog.',
      copied:'Link copied',copy:'Copy link', copyFail:'Copy this chapter link:',error:'Verified app data is unavailable. Please open its App Store page.',
      footer:'App Store information may change. Check the current listing before downloading.',
      editorialFallback:'This page’s editorial explanation is in English. The App Store description below uses the available listing language.',
      screenZoom:'Enlarge screenshot',screenClose:'Close ×',screenSource:'Apple App Store · {country} storefront · published image {number}',screenHint:'Tap a screen to inspect it. Images are from the selected App Store, not a simulated demo.',
      genericScreenTitle:'A real screen from the app',genericScreenText:'This is a published App Store screen. Read the listing below for the complete feature details.',
      usecaseSource:'Usage examples based on published features—not user testimonials.',mediaLastCheck:'App Store screenshots may change when the app is updated.',expectation:'PromptDock generates prompts for copying and reuse. It does not automatically provide an AI answer.'
    },
    'ja':{
      language:'言語',region:'App Storeの国',all:'アプリ一覧',store:'App Storeで見る ↗',back:'アプリを探す',
      note:'価格・公開状況はストア国によって異なります。現在の情報はApp Storeで確認してください。',
      toc:'このページの目次',overview:'何を解決する？',screens:'実際の画面',workflow:'使い方',usecases:'役立つ場面',story:'なぜ作ったか',description:'App Storeの説明全文',related:'ほかのアプリを探す',
      constraint:'できること・できないこと',steps:['テンプレートを選ぶ','項目を入力する','プロンプトを生成・コピーする'],
      screensNote:'選択したストアで公開されている実際のスクリーンショット。アプリ更新で画面が変わる場合があります。',
      screenCaption:'App Storeの公開画像',fallback:'{requested} の説明が登録されていないため、{language} の原文を表示しています。',
      source:'出典：App Store掲載説明文（{language}）。創作した体験談ではありません。',
      relatedText:'目的・価格・カテゴリから、ほかのアプリを探せます。',
      copied:'リンクをコピーしました',copy:'章リンクをコピー',copyFail:'この章のURLをコピーしてください：',error:'検証済みの商品情報を読み込めません。App Storeをご確認ください。',
      footer:'価格・公開情報は変わる場合があります。ダウンロード前にApp Storeで確認してください。',
      editorialFallback:'この短い紹介は英語版を代替表示しています。App Storeの説明全文は登録されている言語で表示します。',
      screenZoom:'画像を拡大',screenClose:'閉じる ×',screenSource:'Apple App Store · {country} ストア · 公開画像 {number}',screenHint:'画像を押すと拡大できます。選択中のストアで公開されている画像で、作成したデモ画像ではありません。',
      genericScreenTitle:'実際のアプリ画面',genericScreenText:'App Storeで公開されている実画面です。機能の詳細は掲載説明全文も確認してください。',
      usecaseSource:'公開されている機能説明に基づく使用例です。利用者の体験談ではありません。',mediaLastCheck:'アプリ更新により公開画像の内容が変わる場合があります。',expectation:'PromptDockはコピー・再利用できるプロンプトを生成します。AIの回答を自動生成するものではありません。'
    }
  };
  const state={base:null,asc:null,profile:null,mappings:null,locale:'en-US',country:'us',media:[]};
  const RTL=new Set(['ar-SA','he','ur-PK']);
  const text=(id,value)=>{const e=$(id);if(e)e.textContent=String(value??'');};
  const isStr=x=>typeof x==='string'&&Boolean(x.trim());
  function safeURL(raw,type){
    try{
      const u=new URL(raw);
      if(u.protocol!=='https:'||u.username||u.password||u.port)return '';
      if(type==='image'&&!(u.hostname==='mzstatic.com'||u.hostname.endsWith('.mzstatic.com')))return '';
      if(type==='apple'&&u.hostname!=='apps.apple.com')return '';
      return u.href;
    }catch(_){return '';}
  }
  // Owner-approved local media only: static files managed separately from text-only ONE_SHOT.
  function localMediaURL(path,type){
    if(typeof path!=='string'||!path.startsWith('/next/media/')||path.includes('..')||/[?#\\]/.test(path))return '';
    if(!/\.(?:png|jpg|jpeg|webp)$/i.test(path)&&type==='screenshot')return '';
    if(!/\.(?:mp4|webm)$/i.test(path)&&type==='video')return '';
    return path;
  }
  function localeLabel(code){
    try{return new Intl.DisplayNames([code],{type:'language'}).of(code.split('-')[0])||code;}catch(_){return code;}
  }
  function regionLabel(code){
    try{return new Intl.DisplayNames([state.locale],{type:'region'}).of(code.toUpperCase())||code.toUpperCase();}catch(_){return code.toUpperCase();}
  }
  function format(s,vars){return String(s).replace(/\{(\w+)\}/g,(_,k)=>vars[k]??'');}
  const T=()=>STRINGS[state.locale]||STRINGS[state.locale.startsWith('ja')?'ja':'en-US'];
  async function json(path){const r=await fetch(base+path,{cache:'no-store'});if(!r.ok)throw Error('DATA_HTTP_'+r.status);return r.json();}
  function verify(baseData,asc,profile,map){
    if(!baseData||baseData.developerId!==ARTIST_ID||!Array.isArray(baseData.apps))throw Error('INVALID_BASE');
    const app=baseData.apps.find(a=>a.id===Number(APP_ID));
    if(!app||!safeURL(app.appStoreUrl,'apple')||!safeURL(app.artworkUrl,'image'))throw Error('UNVERIFIED_APP');
    if(!asc||asc.developerId!==ARTIST_ID||asc.schemaVersion!==1||!asc.apps?.[APP_ID]||!asc.baselineIds?.includes(Number(APP_ID)))throw Error('INVALID_ASC');
    if(!profile||profile.schemaVersion!==1||profile.appId!==APP_ID||profile.developerId!==ARTIST_ID||!profile.editorial?.['en-US']||!Array.isArray(profile.media))throw Error('INVALID_PROFILE');
    if(!map||map.developerId!==ARTIST_ID||Object.keys(map.storefrontByLocale||{}).length<40)throw Error('INVALID_REGION_MAP');
    for(const m of profile.media){
      if(!m||!isStr(m.id)||!['screenshot','video'].includes(m.type)||m.verified!==true||m.approvedByOwner!==true||!Array.isArray(m.featureIds)||!isStr(m.sourceReference)||!/^\/Users\/tsuki\//.test(m.sourceAbsolutePath||''))throw Error('INVALID_MEDIA');
      if(!localMediaURL(m.src,m.type))throw Error('UNSAFE_MEDIA_PATH');
    }
    return app;
  }
  function pickLocale(){
    const choices=Object.keys(state.mappings.storefrontByLocale);
    const url=new URLSearchParams(location.search).get('language');
    let saved='';try{saved=localStorage.getItem('tsz-next-language')||'';}catch(_){}
    const browser=[...(navigator.languages||[]),navigator.language].filter(Boolean);
    const match=v=>choices.find(c=>c.toLowerCase()===String(v).toLowerCase())||choices.find(c=>c.split('-')[0]===String(v).split('-')[0]);
    state.locale=match(url)||match(saved)||browser.map(match).find(Boolean)||'en-US';
    let manual='';try{manual=localStorage.getItem('tsz-next-storefront-manual-v1')||'';}catch(_){}
    const countries=[...new Set(['us',...Object.values(state.mappings.storefrontByLocale)])];
    state.country=countries.includes(manual)?manual:(state.mappings.storefrontByLocale[state.locale]||'us');
  }
  function buildSelectors(){
    const langs=$('p19-language');
    Object.keys(state.mappings.storefrontByLocale).forEach(c=>{
      const opt=document.createElement('option');opt.value=c;opt.textContent=c+' · '+localeLabel(c);langs.append(opt);
    });
    langs.value=state.locale;
    langs.addEventListener('change',()=>{
      state.locale=langs.value;
      try{localStorage.setItem('tsz-next-language',state.locale);}catch(_){}
      // Country stays independent, regardless of language changes.
      render();
    });
    const region=$('p19-region');
    const countries=[...new Set(['us',...Object.values(state.mappings.storefrontByLocale)])].sort();
    countries.forEach(c=>{const opt=document.createElement('option');opt.value=c;opt.textContent=regionLabel(c)+' ('+c.toUpperCase()+')';region.append(opt);});
    region.value=state.country;
    region.addEventListener('change',()=>{
      state.country=region.value;
      try{localStorage.setItem('tsz-next-storefront-manual-v1',state.country);}catch(_){}
      render();setupMotion();void loadPublicScreens();
    });
  }
  function canonicalLink(id){return HOME+'apps/'+id+'/';}
  function storeLink(){return 'https://apps.apple.com/'+state.country+'/app/id'+APP_ID;}
  function descValue(){
    const row=state.asc.apps[APP_ID];const by=row.descriptionByLocale||{};
    const requested=state.locale;
    const resolved=isStr(by[requested])?requested:(isStr(by['en-US'])?'en-US':Object.keys(by).find(c=>isStr(by[c])));
    return {value:resolved?by[resolved]:'',locale:resolved||'en-US',fallback:resolved!==requested};
  }
  function sourceFullDescription(raw){
    const block=$('p19-description');block.replaceChildren();
    // Render real list structure without turning externally sourced text into HTML.
    for(const paragraph of raw.trim().split(/\n\s*\n/)){
      const lines=paragraph.split('\n');let list=null;
      for(const rawLine of lines){
        const line=rawLine.trim();if(!line)continue;
        const bullet=line.match(/^[-•]\s+(.+)$/);
        if(bullet){
          if(!list){list=create('ul','p19-description-list');block.append(list);}
          list.append(create('li','',bullet[1]));
        }else{
          list=null;
          block.append(create('p',line.endsWith(':')?'p19-description-subhead':'',line));
        }
      }
    }
  }
  function create(el,cl,txt){const n=document.createElement(el);if(cl)n.className=cl;if(txt!==undefined)n.textContent=String(txt);return n;}
  function editable(){return state.profile.editorial[state.locale]||state.profile.editorial['en-US'];}
  function addSteps(target,rows){target.replaceChildren();rows.forEach((s,i)=>{
    const li=create('li','');const n=create('span','p19-step-num',String(i+1).padStart(2,'0'));li.append(n,create('span','',s));target.append(li);
  });}
  function renderCases(rows){const target=$('p19-usecases');target.replaceChildren();rows.forEach((row,i)=>{
    const a=create('article','p19-case');a.append(create('span','p19-case-num',String(i+1).padStart(2,'0')),create('h3','',row.title),create('p','',row.detail));target.append(a);
  });}
  function renderStory(){
    const copy=state.profile.story;const story=copy?.approved===true&&(copy.byLocale?.[state.locale]||copy.byLocale?.['en-US']);
    const good=isStr(story);
    $('story').hidden=!good;
    if(good)text('p19-story-body',story);
  }
  let heroSlide=0;
  function renderHeroScreenshot(verified){
    const hero=$('p19-hero-evidence'),fallback=$('p19-hero-fallback'),img=$('p19-hero-img');
    const entries=verified.filter(v=>v.kind==='image');
    if(!entries.length){hero.hidden=true;fallback.hidden=false;img.removeAttribute('src');return;}
    heroSlide=Math.min(heroSlide,entries.length-1);
    hero.hidden=false;fallback.hidden=true;
    const entry=entries[heroSlide];img.src=entry.src;img.alt=T().screenCaption+' '+(heroSlide+1);
    img.referrerPolicy='no-referrer';img.onerror=()=>{hero.hidden=true;fallback.hidden=false;};
    $('p193-stage-stack').replaceChildren();
    entries.slice(0,3).forEach((shot,i)=>{if(i===heroSlide)return;
      const el=create('div','p193-stack-card');el.style.setProperty('--p193-i',String(i));
      const preview=create('img','');preview.alt='';preview.src=shot.src;preview.referrerPolicy='no-referrer';
      el.append(preview);$('p193-stage-stack').append(el);
    });
    const dots=$('p193-stage-dots');dots.replaceChildren();
    entries.forEach((_,i)=>{const b=create('button','p193-stage-dot',String(i+1).padStart(2,'0'));b.type='button';b.setAttribute('aria-label',(T().screenCaption)+' '+(i+1));b.setAttribute('aria-pressed',String(i===heroSlide));
      b.addEventListener('click',()=>{heroSlide=i;renderHeroScreenshot(verified);});dots.append(b);});
    const heroCaption=format(T().screenSource,{country:state.country.toUpperCase(),number:heroSlide+1});
    text('p19-hero-img-caption',heroCaption+(entry.quality==='limited'?(state.locale.startsWith('ja')?' · 縮小版画像':' · reduced-size preview'):''));
    $('p193-stage-primary').onclick=()=>zoomScreen(entries[heroSlide],verified.indexOf(entries[heroSlide]));
    text('p193-stage-cta',state.locale.startsWith('ja')?'実画面を詳しく見る ↗':'EXPLORE THE SCREEN ↗');
  }
  function evidenceCopy(index){
    const conf=state.profile.publishedScreenEvidence;
    const entry=state.country===conf?.storefront?conf?.entries?.find(e=>e.index===index):null;
    const editorial=entry?.[state.locale.startsWith('ja')?'ja':'en-US'];
    return editorial||{title:T().genericScreenTitle,detail:T().genericScreenText};
  }

// P19-4 image quality contract: source resolution is checked before scaling.
// A larger viewer does NOT mean more source pixels. Try an Apple-hosted higher
// resolution rendition of the SAME thumbnail; verify dimensions and aspect.
let viewerIndex=0, viewerZoom=1, viewerRequest=0;
function viewerItems(){return state.media.filter(v=>v.kind==='image');}
function qualityText(japanese, kind, width, height){
  const dimensions=width&&height ? width+' × '+height+' px' : '';
  if(kind==='loading')return japanese?'画像の解像度を確認しています…':'Checking screenshot resolution…';
  if(kind==='high')return japanese?'高解像度版を表示中：'+dimensions:'Higher-resolution image: '+dimensions;
  if(kind==='limited')return japanese?'元画像が小さいため拡大を制限：'+dimensions+'。拡大しても文字の情報量は増えません。':'Limited by source image: '+dimensions+'. Enlarging cannot restore text detail.';
  return japanese?'公開画像の実解像度：'+dimensions:'Published screenshot resolution: '+dimensions;
}
function setViewerQuality(kind){
  const img=$('p19-zoom-img'),note=$('p194-quality-note');if(!note)return;
  note.textContent=qualityText(state.locale.startsWith('ja'),kind,img.naturalWidth,img.naturalHeight);
  note.dataset.quality=kind;
}
function higherAppleImage(src){
  try{
    const u=new URL(src);
    if(!safeURL(u.href,'image')||!u.pathname.includes('/image/thumb/'))return '';
    const match=u.pathname.match(/\/(\d{2,4})x(\d{2,4})bb\.(webp|png|jpe?g)$/i);
    if(!match)return '';
    if(Number(match[1])>=1200 && Number(match[2])>=2200)return '';
    u.pathname=u.pathname.replace(/\/\d{2,4}x\d{2,4}bb\.(webp|png|jpe?g)$/i,'/1290x2796bb.'+match[3]);
    return safeURL(u.href,'image');
  }catch(_){return '';}
}
function viewerFit(){
  const viewport=$('p193-zoom-viewport'),img=$('p19-zoom-img');
  const nw=img.naturalWidth||1,nh=img.naturalHeight||1;
  // Never enlarge beyond original pixel dimensions at Fit, including on tall screens.
  const fit=Math.min(1,Math.max(100,viewport.clientHeight-24)/nh,Math.max(100,viewport.clientWidth-24)/nw);
  return {fit,maxZoom:Math.min(4,Math.max(1,1/Math.max(fit,.01)))};
}
function viewerSize(keepCenter=false){
  const viewport=$('p193-zoom-viewport'),img=$('p19-zoom-img');
  if(!img.naturalWidth||!img.naturalHeight)return;
  const oldX=viewport.scrollWidth?(viewport.scrollLeft+viewport.clientWidth/2)/viewport.scrollWidth:.5;
  const oldY=viewport.scrollHeight?(viewport.scrollTop+viewport.clientHeight/2)/viewport.scrollHeight:.5;
  const f=viewerFit();viewerZoom=Math.min(Math.max(1,viewerZoom),f.maxZoom);
  const ratio=f.fit*viewerZoom;
  img.style.width=Math.round(img.naturalWidth*ratio)+'px';
  img.style.height=Math.round(img.naturalHeight*ratio)+'px';
  text('p193-zoom-level',Math.round(viewerZoom*100)+'%');
  if(keepCenter){viewport.scrollLeft=oldX*viewport.scrollWidth-viewport.clientWidth/2;viewport.scrollTop=oldY*viewport.scrollHeight-viewport.clientHeight/2;}
  else{viewport.scrollLeft=(viewport.scrollWidth-viewport.clientWidth)/2;viewport.scrollTop=(viewport.scrollHeight-viewport.clientHeight)/2;}
  $('p193-zoom-minus').disabled=viewerZoom<=1.015;
  $('p193-zoom-plus').disabled=viewerZoom>=f.maxZoom-.015;
}
function viewerStep(delta){
  viewerZoom=Math.max(1,Math.min(viewerFit().maxZoom,Math.round((viewerZoom+delta)*100)/100));viewerSize(true);
}
function tryHigherResolution(entry,request){
  const upgraded=higherAppleImage(entry.src);if(!upgraded)return;
  const probe=new Image();probe.referrerPolicy='no-referrer';
  probe.onload=()=>{
    if(request!==viewerRequest||!$('p19-zoom-dialog').open)return;
    const img=$('p19-zoom-img');
    const w=img.naturalWidth,h=img.naturalHeight;
    const aspectOld=w/Math.max(1,h),aspectNew=probe.naturalWidth/Math.max(1,probe.naturalHeight);
    if(probe.naturalWidth>=w*1.5&&probe.naturalHeight>=h*1.5&&Math.abs(aspectNew-aspectOld)<.035){
      img.onload=()=>{if(request!==viewerRequest)return;viewerZoom=1;viewerSize();setViewerQuality('high');};
      img.src=upgraded;
      if(img.complete&&img.naturalWidth){viewerZoom=1;viewerSize();setViewerQuality('high');}
    }
  };
  probe.onerror=()=>{};
  probe.src=upgraded;
}
function viewerShow(index){
  const items=viewerItems();if(!items.length)return;
  const request=++viewerRequest;
  viewerIndex=(index+items.length)%items.length;viewerZoom=1;
  const entry=items[viewerIndex],img=$('p19-zoom-img');
  img.style.width='';img.style.height='';
  img.onload=()=>{
    if(request!==viewerRequest)return;
    viewerSize();
    setViewerQuality(entry.quality==='high'?'high':(img.naturalWidth<800||img.naturalHeight<1600?'limited':'normal'));
    if(entry.quality!=='high')tryHigherResolution(entry,request);
  };
  img.onerror=()=>{if(request===viewerRequest){const n=$('p194-quality-note');n.textContent=state.locale.startsWith('ja')?'画像を読み込めませんでした。':'Unable to load screenshot.';n.dataset.quality='limited';}};
  img.referrerPolicy='no-referrer';img.src=entry.src;img.alt=T().screenCaption+' '+(viewerIndex+1);
  text('p193-viewer-count',String(viewerIndex+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0'));
  text('p19-zoom-label',evidenceCopy(state.media.indexOf(entry)).title);
  text('p19-zoom-source',format(T().screenSource,{country:state.country.toUpperCase(),number:state.media.indexOf(entry)+1}));
  $('p194-view-store').href=storeLink();
  $('p193-prev').disabled=items.length<2;$('p193-next').disabled=items.length<2;
  setViewerQuality('loading');
  if(img.complete&&img.naturalWidth)img.onload();
}
function zoomScreen(entry,index){
  const dialog=$('p19-zoom-dialog');if(!dialog||typeof dialog.showModal!=='function')return;
  const items=viewerItems(),target=items.indexOf(entry);if(target<0)return;
  if(!dialog.open)dialog.showModal();
  viewerShow(target);
  $('p193-zoom-viewport').focus({preventScroll:true});
}
  function renderMedia(){
    const verified=state.media;
    heroSlide=Math.min(heroSlide,Math.max(verified.length-1,0));
    const wrap=$('p19-media');wrap.replaceChildren();
    $('screens').hidden=verified.length===0;
    renderHeroScreenshot(verified);
    text('p19-media-source',T().mediaLastCheck);
    for(const [idx,entry] of verified.entries()){
      const feature=evidenceCopy(idx);
      const article=create('article','p19-proof-row');
      const detail=create('div','p19-proof-copy');
      detail.append(create('span','p19-proof-index','SCREEN / '+String(idx+1).padStart(2,'0')),
        create('h3','',feature.title),create('p','',feature.detail));
      detail.append(create('div','p193-proof-accent'));
      detail.append(create('span','p193-proof-instruction',state.locale.startsWith('ja')?'画像を開いて操作を確認 ↗':'OPEN SCREEN TO EXPLORE ↗'));
      const fig=create('figure','p19-shot');
      if(entry.kind==='image'){
        const btn=create('button','p19-shot-open');btn.type='button';btn.setAttribute('aria-label',T().screenZoom+' '+(idx+1));
        const img=create('img','');img.src=entry.src;img.alt=T().screenCaption+' '+(idx+1);
        img.loading='lazy';img.referrerPolicy='no-referrer';
        img.addEventListener('error',()=>{
          article.remove();
          if(!wrap.children.length){$('screens').hidden=true;renderHeroScreenshot([]);renderToc();}
        });
        btn.append(img,create('span','p19-shot-zoom',T().screenZoom+' ↗'));
        btn.addEventListener('click',()=>zoomScreen(entry,idx));fig.append(btn);
      }else if(entry.kind==='video'){
        const video=create('video','');video.controls=true;video.preload='none';video.autoplay=false;
        video.loop=false;video.src=entry.src;if(entry.poster)video.poster=entry.poster;fig.append(video);
      }
      const originalCaption=format(T().screenSource,{country:state.country.toUpperCase(),number:idx+1});
      const qualitySuffix=entry.quality==='limited'?(state.locale.startsWith('ja')?' · 元画像の解像度が不足':' · low-resolution source'):'';
      fig.append(create('figcaption','',originalCaption+qualitySuffix));
      article.append(detail,fig);wrap.append(article);
      if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){article.classList.add('p193-proof-ready');requestAnimationFrame(()=>article.classList.add('p193-proof-visible'));}
    }
    renderToc();
  }
  // P19-6: chapter progress is navigation position, NOT tasks completed or scroll percentage.
  // Only visible sections participate. Hidden story/media never inflate the denominator.
  let p196MediaLoaded=false;
  const p196Text=()=>state.locale.startsWith('ja')?{
    kicker:'この商品のガイド',start:'最初から読む',chapter:'現在の章',media:'公開スクリーンショット',store:'選択したストア',
    loading:'公開画像を確認しています',unavailable:'公開画像を取得できませんでした',available:'実際に確認できた公開画像',
    country:'価格・公開状況はApp Storeで確認',details:'App Storeの説明全文を展開',progress:'現在の章'
  }:{
    kicker:'EXPLORE THE PRODUCT',start:'Start reading',chapter:'CURRENT CHAPTER',media:'PUBLISHED SCREENS',store:'SELECTED STOREFRONT',
    loading:'Checking availability',unavailable:'Public screens unavailable',available:'Published App Store images',
    country:'Confirm pricing in the App Store',details:'Expand the complete App Store listing',progress:'Current chapter'
  };
  function p196Chapters(){return [...document.querySelectorAll('[data-p19-chapter]')].filter(a=>!$(a.dataset.p19Chapter)?.hidden);}
  function p196UpdateProgress(currentId){
    const chapters=p196Chapters();if(!chapters.length)return;
    const index=Math.max(0,chapters.findIndex(a=>a.dataset.p19Chapter===currentId));
    const current=index+1,total=chapters.length,fmt=n=>String(n).padStart(2,'0');
    text('p196-current',fmt(current));text('p196-total',fmt(total));
    text('p196-mini-current',fmt(current));text('p196-mini-total',fmt(total));
    text('p196-rail-current',fmt(current));text('p196-rail-total',fmt(total));
    text('p196-rail-name',chapters[index].textContent);
    $('p196-rail-fill').style.width=(100*current/total)+'%';
    text('p196-active-name',chapters[index].textContent);
    $('p196-bar').style.width=(100*current/total)+'%';
    $('p196-progress-track').setAttribute('aria-valuemax',String(total));
    $('p196-progress-track').setAttribute('aria-valuenow',String(current));
    $('p196-progress-track').setAttribute('aria-label',p196Text().progress);
    // Keep the active chapter visible in horizontal mobile navigation.
    const active=chapters[index];
    if(active&&window.matchMedia('(max-width: 820px)').matches&&active.getAttribute('aria-current')==='location'){
      const nav=$('p19-toc-links');const left=active.offsetLeft-nav.offsetLeft;
      if(left<nav.scrollLeft||left+active.offsetWidth>nav.scrollLeft+nav.clientWidth)nav.scrollTo({left:Math.max(0,left-25),behavior:'auto'});
    }
  }
  function p196RefreshLabels(){
    const t=p196Text();
    text('p196-dash-kicker',t.kicker);text('p196-start-link',t.start+' ↗');
    text('p196-chapter-label',t.chapter);text('p196-rail-label',t.chapter);text('p196-media-label',t.media);text('p196-storefront-label',t.store);
    text('p196-country',state.country.toUpperCase());text('p196-country-foot',t.country);
    text('p196-disclosure-title',t.details);
    text('p196-media-count',p196MediaLoaded?String(state.media.filter(m=>m.kind==='image').length).padStart(2,'0'):'—');
    text('p196-media-foot',!p196MediaLoaded?t.loading:state.media.filter(m=>m.kind==='image').length?t.available:t.unavailable);
  }
  function renderToc(){
    const ids=['overview','screens','workflow','use-cases','story','full-description','related'];
    const labels=[T().overview,T().screens,T().workflow,T().usecases,T().story,T().description,T().related];
    const wrap=$('p19-toc-links');wrap.replaceChildren();
    let visibleIndex=0;
    ids.forEach((id,i)=>{
      const section=$(id);if(section.hidden)return;
      visibleIndex++;
      const number=section.querySelector('.p19-section-number');
      if(number)number.textContent=String(visibleIndex).padStart(2,'0');
      const a=create('a','',labels[i]);a.href='#'+id;a.dataset.p19Chapter=id;wrap.append(a);
    });
    p196RefreshLabels();p196UpdateProgress(wrap.querySelector('[aria-current="location"]')?.dataset.p19Chapter||wrap.querySelector('a')?.dataset.p19Chapter);
  }
  function render(){
    const copy=T(), ed=editable(), desc=descValue(), app=state.base.apps.find(x=>x.id===Number(APP_ID));
    document.documentElement.lang=state.locale;
    document.documentElement.dir=RTL.has(state.locale)?'rtl':'ltr';
    document.title=(state.asc.apps[APP_ID].nameByLocale?.[state.locale]||app.name)+' · Tsukigashizumu Studio';
    text('p19-language-label',copy.language);text('p19-region-label',copy.region);
    $('p19-region').setAttribute('aria-label',copy.region);$('p19-language').setAttribute('aria-label',copy.language);
    for(const option of $('p19-region').options)option.textContent=regionLabel(option.value)+' ('+option.value.toUpperCase()+')';
    text('p19-all-apps',copy.all);text('p19-related-back',copy.all);text('p19-back-link',copy.back);
    text('p19-store-link',copy.store);$('p19-store-link').href=storeLink();
    text('p19-price-note',copy.note);text('p19-contents-heading',copy.toc);
    text('p19-overview-heading',copy.overview);text('p19-screens-heading',copy.screens);
    text('p19-workflow-heading',copy.workflow);text('p19-usecases-heading',copy.usecases);
    text('p19-story-heading',copy.story);text('p19-description-heading',copy.description);text('p19-related-heading',copy.related);
    text('p19-limit-heading',copy.constraint);text('p19-oneline',ed.oneLine);text('p19-problem',ed.problem);
    text('p19-intro',ed.intro);text('p19-constraints',ed.constraints);text('p19-category',app.category+' / App Store');
    const editorialFallback=!state.profile.editorial[state.locale];
    $('p19-editorial-source').hidden=!editorialFallback;
    if(editorialFallback)text('p19-editorial-source',copy.editorialFallback);
    text('p19-title',state.asc.apps[APP_ID].nameByLocale?.[state.locale]||app.name);
    text('p19-crumb',app.name);
    const icon=$('p19-icon'),src=safeURL(app.artworkUrl,'image');if(src){icon.src=src;icon.hidden=false;icon.onerror=()=>{icon.hidden=true;};}
    text('p19-screens-note',copy.screenHint+' '+copy.screensNote);
    addSteps($('p19-workflow'),copy.steps);text('p19-expectation-copy',copy.expectation);
    renderCases(ed.useCases||[]);renderStory();renderMedia();
    sourceFullDescription(desc.value);
    const notice=desc.fallback?format(copy.fallback,{requested:state.locale,language:desc.locale}):format(copy.source,{language:desc.locale});
    text('p19-description-source',notice);
    text('p19-related-copy',copy.relatedText);
    text('p19-usecase-source',copy.usecaseSource);
    text('p19-bottom-store',copy.store);$('p19-bottom-store').href=storeLink();
    text('p19-zoom-close',copy.screenClose);
    for(const btn of document.querySelectorAll('[data-p19-copy]'))btn.textContent=copy.copy;
    text('p19-contents-heading',copy.toc);
    document.querySelector('.p19-footer span').textContent=copy.footer;
    renderToc();setActiveToc();
  }
  function setActiveToc(){
    const links=[...document.querySelectorAll('[data-p19-chapter]')];
    let current=links[0]?.dataset.p19Chapter||'';
    for(const l of links){
      const section=$(l.dataset.p19Chapter);
      if(section&&section.getBoundingClientRect().top<185)current=l.dataset.p19Chapter;
    }
    for(const l of links){if(l.dataset.p19Chapter===current)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current');}
    p196UpdateProgress(current);
  }
  let p196MotionInstalled=false;
  function setupMotion(){
    if(p196MotionInstalled){setActiveToc();return;}p196MotionInstalled=true;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced && 'IntersectionObserver' in window){
      const io=new IntersectionObserver(items=>{
        for(const it of items)if(it.isIntersecting){it.target.classList.add('p193-entered');io.unobserve(it.target);}
      },{rootMargin:'0px 0px -30px 0px',threshold:.08});
      document.querySelectorAll('.p19-hero,.p19-section,.p19-proof-row,.p19-case').forEach(el=>{el.classList.add('p193-reveal');io.observe(el);});
    }
    let ticking=false;
    const update=()=>{
      ticking=false;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const fraction=Math.min(1,Math.max(0,scrollY/max));
      $('p193-progress').style.transform='scaleX('+fraction+')';
      $('p193-toc-fill').style.transform='scaleX('+fraction+')';
      setActiveToc();
    };
    window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
  }
  function bindChapters(){
    window.addEventListener('scroll',setActiveToc,{passive:true});
    window.addEventListener('hashchange',()=>{
      if(location.hash==='#full-description')$('p196-description-disclosure').open=true;
      setActiveToc();
    });
    if(location.hash==='#full-description')$('p196-description-disclosure').open=true;
    const dialog=$('p19-zoom-dialog');
    $('p19-zoom-close').addEventListener('click',()=>dialog.close());
    $('p193-prev').addEventListener('click',()=>viewerShow(viewerIndex-1));
    $('p193-next').addEventListener('click',()=>viewerShow(viewerIndex+1));
    $('p193-zoom-plus').addEventListener('click',()=>viewerStep(.32));
    $('p193-zoom-minus').addEventListener('click',()=>viewerStep(-.32));
    $('p193-zoom-fit').addEventListener('click',()=>{viewerZoom=1;viewerSize();});
    dialog.addEventListener('keydown',ev=>{
      if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){
        if(viewerItems().length>1){ev.preventDefault();viewerShow(viewerIndex+(ev.key==='ArrowLeft'?-1:1));}
      }else if(ev.key==='+'||ev.key==='='){ev.preventDefault();viewerStep(.25);}
      else if(ev.key==='-'){ev.preventDefault();viewerStep(-.25);}
      else if(ev.key==='0'){ev.preventDefault();viewerZoom=1;viewerSize();}
    });
    $('p193-zoom-viewport').addEventListener('dblclick',()=>viewerStep(.5));
    window.addEventListener('resize',()=>{if(dialog.open)viewerSize(true);});
    // Pointer/touch pinch-zoom in the image viewport, without external libraries.
    const vp=$('p193-zoom-viewport');let startDistance=0,startZoom=1;
    vp.addEventListener('touchstart',ev=>{
      if(ev.touches.length===2){startDistance=Math.hypot(ev.touches[0].clientX-ev.touches[1].clientX,ev.touches[0].clientY-ev.touches[1].clientY);startZoom=viewerZoom;}
    },{passive:true});
    vp.addEventListener('touchmove',ev=>{
      if(ev.touches.length===2&&startDistance>0){ev.preventDefault();const d=Math.hypot(ev.touches[0].clientX-ev.touches[1].clientX,ev.touches[0].clientY-ev.touches[1].clientY);viewerZoom=Math.max(1,Math.min(viewerFit().maxZoom,startZoom*d/startDistance));viewerSize(true);}
    },{passive:false});
    vp.addEventListener('touchend',ev=>{if(ev.touches.length<2)startDistance=0;},{passive:true});
    dialog.addEventListener('close',()=>{vp.scrollTop=0;vp.scrollLeft=0;});
    for(const btn of document.querySelectorAll('[data-p19-copy]'))btn.addEventListener('click',async()=>{
      const id=btn.dataset.p19Copy;if(!$(id)||$(id).hidden)return;
      const url=location.origin+PATH+'#'+id; // no UTM, no tracking query; real permanent chapter URL
      try{if(!navigator.clipboard?.writeText)throw Error('NO_CLIPBOARD');await navigator.clipboard.writeText(url);btn.textContent=T().copied;}
      catch(_){window.prompt(T().copyFail,url);}
    });
  }
  function validatePublicShots(item){
    if(item?.trackId!==Number(APP_ID)||item?.artistId!==ARTIST_ID||item?.kind!=='software')return [];
    const urls=Array.isArray(item.screenshotUrls)?item.screenshotUrls:[];
    return urls.slice(0,5).map(url=>safeURL(url,'image')).filter(Boolean)
      .map((src,i)=>({kind:'image',src,caption:T().screenCaption+' '+(i+1)}));
  }
  // P19-5: All published screen surfaces must be driven by the SAME
  // successfully decoded image resolution. P19-4 only upgraded the viewer.
  // No image is bundled, generated, replaced with a fake UI, or copied to disk.
  function probeScreenshot(url, timeoutMs=3200){
    return new Promise(resolve=>{
      const image=new Image();let settled=false;
      const done=(info)=>{if(settled)return;settled=true;clearTimeout(timer);image.onload=null;image.onerror=null;resolve(info);};
      const timer=setTimeout(()=>done(null),timeoutMs);
      image.referrerPolicy='no-referrer';
      image.onload=()=>done({src:url,width:image.naturalWidth,height:image.naturalHeight});
      image.onerror=()=>done(null);
      image.src=url;
      if(image.complete&&image.naturalWidth)done({src:url,width:image.naturalWidth,height:image.naturalHeight});
    });
  }
  async function resolvePublishedScreenshot(entry){
    if(entry.kind!=='image')return entry;
    // Local publisher-approved sources have their own media integrity contract.
    if(!safeURL(entry.src,'image'))return entry;
    const largeURL=higherAppleImage(entry.src);
    const [source,larger]=await Promise.all([
      probeScreenshot(entry.src),
      largeURL?probeScreenshot(largeURL):Promise.resolve(null)
    ]);
    if(!source){return {...entry,quality:'unverified'};}
    const sameAspect=larger&&Math.abs((larger.width/larger.height)-(source.width/source.height))<.035;
    const improved=Boolean(larger&&sameAspect&&larger.width>=source.width*1.5&&larger.height>=source.height*1.5);
    const chosen=improved?larger:source;
    return {...entry,src:chosen.src,thumbnailSrc:source.src,
      originalWidth:source.width,originalHeight:source.height,
      pixelWidth:chosen.width,pixelHeight:chosen.height,
      quality:improved?'high':(chosen.width<800||chosen.height<1600?'limited':'source')};
  }
  async function resolveAllPublishedScreens(entries){
    // Resolve each rendition once, then use it in hero, stack, feature rows,
    // and the viewer. No visual element silently retains the low-res thumbnail.
    return Promise.all(entries.map(resolvePublishedScreenshot));
  }
  let mediaLoadSerial=0;
  async function loadPublicScreens(){
    const serial=++mediaLoadSerial;
    const approved=state.profile.media.filter(m=>m.verified===true&&m.approvedByOwner===true&&localMediaURL(m.src,m.type))
      .map(m=>({kind:m.type==='video'?'video':'image',src:localMediaURL(m.src,m.type),
        poster:m.poster&&localMediaURL(m.poster,'screenshot')||'',caption:m.captionByLocale?.[state.locale]||m.captionByLocale?.['en-US']||''}));
    if(approved.length){state.media=approved;p196MediaLoaded=true;renderMedia();renderToc();return;}
    p196MediaLoaded=false;state.media=[];renderMedia();renderToc();
    try{
      const url='https://itunes.apple.com/lookup?country='+encodeURIComponent(state.country)+'&entity=software&id='+APP_ID;
      const control=new AbortController();const timer=setTimeout(()=>control.abort(),8000);
      let response;try{response=await fetch(url,{mode:'cors',credentials:'omit',cache:'no-store',signal:control.signal});}finally{clearTimeout(timer);}
      if(!response.ok)throw Error('APPLE_HTTP_'+response.status);
      const body=await response.json();
      if(body?.resultCount!==1||!Array.isArray(body.results)||body.results.length!==1)throw Error('APPLE_LOOKUP_AMBIGUOUS');
      if(serial!==mediaLoadSerial)return;
      const validated=validatePublicShots(body.results[0]);
      const resolved=await resolveAllPublishedScreens(validated);
      if(serial!==mediaLoadSerial)return;
      state.media=resolved;p196MediaLoaded=true;renderMedia();renderToc();
    }catch(_){if(serial===mediaLoadSerial){state.media=[];p196MediaLoaded=true;renderMedia();renderToc();}}
  }
  async function start(){
    if(location.pathname!==PATH && location.pathname!==PATH+'index.html')return;
    bindChapters();
    try{
      const [baseData,asc,profile,map]=await Promise.all([
        json('data/apps.json'),json('data/asc-localizations.json'),json('content/app-profiles/'+APP_ID+'.json'),json('data/locale-storefronts.json')
      ]);
      verify(baseData,asc,profile,map);
      Object.assign(state,{base:baseData,asc,profile,mappings:map});
      pickLocale();buildSelectors();
      $('p19-load').hidden=true;$('p19-detail').hidden=false;
      render();setupMotion();void loadPublicScreens();
      if(location.hash){const hash=decodeURIComponent(location.hash.slice(1));if(/^[a-z-]{2,30}$/.test(hash)&&$(hash)&&!$(hash).hidden){requestAnimationFrame(()=>$(hash).scrollIntoView());}}
    }catch(e){
      $('p19-load').textContent=STRINGS['en-US'].error;
      console.warn('P19_DETAIL_DATA_UNAVAILABLE',e.message);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else void start();
})();
