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
      render();void loadPublicScreens();
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
  function renderHeroScreenshot(verified){
    const hero=$('p19-hero-evidence'),fallback=$('p19-hero-fallback'),img=$('p19-hero-img');
    const entry=verified.find(v=>v.kind==='image');
    if(!entry){hero.hidden=true;fallback.hidden=false;img.removeAttribute('src');return;}
    hero.hidden=false;fallback.hidden=true;
    img.onerror=()=>{hero.hidden=true;fallback.hidden=false;};
    img.src=entry.src;
    img.alt=T().screenCaption+' 1';
    text('p19-hero-img-caption',format(T().screenSource,{country:state.country.toUpperCase(),number:1}));
  }
  function evidenceCopy(index){
    const conf=state.profile.publishedScreenEvidence;
    const entry=state.country===conf?.storefront?conf?.entries?.find(e=>e.index===index):null;
    const editorial=entry?.[state.locale.startsWith('ja')?'ja':'en-US'];
    return editorial||{title:T().genericScreenTitle,detail:T().genericScreenText};
  }
  function zoomScreen(entry,index){
    const dialog=$('p19-zoom-dialog');if(!dialog||typeof dialog.showModal!=='function')return;
    const img=$('p19-zoom-img');img.src=entry.src;
    img.alt=T().screenCaption+' '+(index+1);
    text('p19-zoom-label',T().screenCaption+' '+(index+1));
    text('p19-zoom-source',format(T().screenSource,{country:state.country.toUpperCase(),number:index+1}));
    dialog.showModal();
  }
  function renderMedia(){
    const verified=state.media;
    const wrap=$('p19-media');wrap.replaceChildren();
    $('screens').hidden=verified.length===0;
    renderHeroScreenshot(verified);
    text('p19-media-source',T().mediaLastCheck);
    for(const [idx,entry] of verified.entries()){
      const feature=evidenceCopy(idx);
      const article=create('article','p19-proof-row');
      const detail=create('div','p19-proof-copy');
      detail.append(create('span','p19-proof-index',String(idx+1).padStart(2,'0')),
        create('h3','',feature.title),create('p','',feature.detail));
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
      fig.append(create('figcaption','',format(T().screenSource,{country:state.country.toUpperCase(),number:idx+1})));
      article.append(detail,fig);wrap.append(article);
    }
    renderToc();
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
  }
  function bindChapters(){
    window.addEventListener('scroll',setActiveToc,{passive:true});window.addEventListener('hashchange',setActiveToc);
    $('p19-zoom-close').addEventListener('click',()=>$('p19-zoom-dialog').close());
    $('p19-zoom-dialog').addEventListener('click',ev=>{if(ev.target===$('p19-zoom-dialog'))$('p19-zoom-dialog').close();});
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
  let mediaLoadSerial=0;
  async function loadPublicScreens(){
    const serial=++mediaLoadSerial;
    const approved=state.profile.media.filter(m=>m.verified===true&&m.approvedByOwner===true&&localMediaURL(m.src,m.type))
      .map(m=>({kind:m.type==='video'?'video':'image',src:localMediaURL(m.src,m.type),
        poster:m.poster&&localMediaURL(m.poster,'screenshot')||'',caption:m.captionByLocale?.[state.locale]||m.captionByLocale?.['en-US']||''}));
    if(approved.length){state.media=approved;renderMedia();renderToc();return;}
    state.media=[];renderMedia();renderToc();
    try{
      const url='https://itunes.apple.com/lookup?country='+encodeURIComponent(state.country)+'&entity=software&id='+APP_ID;
      const control=new AbortController();const timer=setTimeout(()=>control.abort(),8000);
      let response;try{response=await fetch(url,{mode:'cors',credentials:'omit',cache:'no-store',signal:control.signal});}finally{clearTimeout(timer);}
      if(!response.ok)throw Error('APPLE_HTTP_'+response.status);
      const body=await response.json();
      if(body?.resultCount!==1||!Array.isArray(body.results)||body.results.length!==1)throw Error('APPLE_LOOKUP_AMBIGUOUS');
      if(serial!==mediaLoadSerial)return;
      state.media=validatePublicShots(body.results[0]);renderMedia();renderToc();
    }catch(_){if(serial===mediaLoadSerial){state.media=[];renderMedia();renderToc();}}
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
      render();void loadPublicScreens();
      if(location.hash){const hash=decodeURIComponent(location.hash.slice(1));if(/^[a-z-]{2,30}$/.test(hash)&&$(hash)&&!$(hash).hidden){requestAnimationFrame(()=>$(hash).scrollIntoView());}}
    }catch(e){
      $('p19-load').textContent=STRINGS['en-US'].error;
      console.warn('P19_DETAIL_DATA_UNAVAILABLE',e.message);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else void start();
})();
