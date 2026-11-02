/* P19-9: reusable, evidence-based app story. No mutation observers, no price claims. */
(() => {
  'use strict';
  const id=document.body.dataset.p199Id;
  if(!/^\d{8,12}$/.test(id))return;
  const ARTIST=1817908735;
  const $=x=>document.getElementById(x);
  const make=(tag,cl,txt)=>{const n=document.createElement(tag);if(cl)n.className=cl;if(txt!==undefined)n.textContent=String(txt);return n;};
  const state={apps:null,asc:null,map:null,locale:'en-US',country:'us',media:[],mediaSerial:0,mediaLoaded:false,slide:0};
  const rtl=new Set(['ar-SA','he','ur-PK']);
  const strings={
    ja:{language:'言語',region:'App Storeの国',all:'アプリ一覧',label:'APP STORIES / TSUKIGASHIZUMU STUDIO',store:'App Storeで見る ↗',back:'アプリ一覧へ戻る',price:'価格・提供状況はApp Storeでご確認ください。',
      toc:'このページの目次',about:'このアプリについて',screen:'見どころを、画面で。',features:'もう少し詳しく',full:'詳しい説明',related:'ほかのアプリも見る',screenNote:'',
      noScreen:'', inspect:'画像を拡大',prev:'前の画像',next:'次の画像',close:'閉じる',fit:'画面に合わせる',original:'実ピクセル表示', count:'アプリ画面',
      sourceAsc:'Tsukigashizumu Studio',sourceCatalog:'Tsukigashizumu Studio',fallback:'このページでは、別の言語の説明をご案内しています。',
      aboutCaption:'',proof:'',fullCaption:'',noFeatures:'',
      loading:'アプリの紹介を準備しています…',error:'読み込みに失敗しました。ページを更新するか、アプリ一覧からお探しください。',imageSource:'アプリの画面',quality:'画像サイズ',qualityLimited:'この画像は拡大すると細部が粗く見える場合があります。',
      noReviews:'',more:'こちらのアプリもおすすめ',fullToggle:'説明全文を読む',chap:'読んでいる章'},
    en:{language:'Language',region:'App Store region',all:'All apps',label:'APP STORIES / TSUKIGASHIZUMU STUDIO',store:'View in App Store ↗',back:'Explore other apps',price:'For current pricing and availability, visit the App Store.',
      toc:'ON THIS PAGE',about:'Meet the app',screen:'The app in action',features:'A closer look',full:'About this app',related:'Explore more apps',screenNote:'',
      noScreen:'',inspect:'Inspect screenshot',prev:'Previous image',next:'Next image',close:'Close',fit:'Fit',original:'Actual pixels',count:'App screens',
      sourceAsc:'Tsukigashizumu Studio',sourceCatalog:'Tsukigashizumu Studio',fallback:'This description is available in another language.',
      aboutCaption:'',proof:'',fullCaption:'',noFeatures:'',
      loading:'Preparing your app story…',error:'We couldn’t load this page. Please refresh or browse all apps.',imageSource:'App screenshot',quality:'Image size',qualityLimited:'Some fine details may appear soft when enlarged.',
      noReviews:'',more:'You might also like',fullToggle:'Read the full description',chap:'Reading progress'}
  };
  const tx=()=>/^ja(?:-|$)/i.test(state.locale)?strings.ja:strings.en;
  const set=(id,v)=>{const x=$(id);if(x)x.textContent=String(v??'');};
  const validText=x=>typeof x==='string'&&Boolean(x.trim());
  const escLocale=(t,obj)=>String(t).replace(/\{(\w+)\}/g,(_,k)=>String(obj[k]??''));
  function imageURL(raw){try{const u=new URL(raw);return u.protocol==='https:'&&!u.port&&!u.username&&!u.password&&(u.hostname==='mzstatic.com'||u.hostname.endsWith('.mzstatic.com'))?u.href:'';}catch(_){return '';}}
  function nameFor(code){try{return new Intl.DisplayNames([state.locale],{type:'region'}).of(code.toUpperCase())||code.toUpperCase();}catch(_){return code.toUpperCase();}}
  function langFor(code){try{return new Intl.DisplayNames([state.locale],{type:'language'}).of(code.split('-')[0])||code;}catch(_){return code;}}
  function storeLink(){return 'https://apps.apple.com/'+state.country+'/app/id'+id;}
  function readJSON(path){return fetch('../../'+path,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP_'+r.status);return r.json();});}
  function getApp(){return state.apps.apps.find(a=>String(a.id)===id);}
  function desc(){
    const row=state.asc.apps?.[id]||null;const by=row?.descriptionByLocale||{};
    let loc=validText(by[state.locale])?state.locale:(validText(by['en-US'])?'en-US':Object.keys(by).find(k=>validText(by[k])));
    if(!loc)return {value:getApp().description||'',locale:'en-US',source:'catalog',fallback:state.locale!=='en-US'};
    return {value:by[loc],locale:loc,source:'asc',fallback:loc!==state.locale};
  }
  function title(){return state.asc.apps?.[id]?.nameByLocale?.[state.locale]||getApp().name;}
  function subtitle(){return state.asc.apps?.[id]?.subtitleByLocale?.[state.locale]||'';}
  function paras(s){return String(s||'').replace(/\r\n/g,'\n').trim().split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);}
  function opening(s){
    const p=paras(s)[0]||'';
    if(p.length<=360)return p;
    const prefix=p.slice(0,360);
    const endings=[...prefix.matchAll(/[。！？!?]|\.(?=\s|$)/g)];
    if(endings.length)return p.slice(0,endings[endings.length-1].index+1);
    return prefix.replace(/\s+\S*$/,'').trim()+'…';
  }
  function heroSummary(s,sub){
    const first=opening(s).replace(/\s+/g,' ').trim();
    if(sub)return {lead:sub,intro:first};
    const m=first.match(/^(.+?[。！？!?]|.+?\.(?=\s|$))/);
    if(m&&first.length>m[0].length+16)return {lead:m[0],intro:first.slice(m[0].length).trim()};
    return {lead:first,intro:''};
  }
  function renderDescription(value){const root=$('p199-full');root.replaceChildren();for(const p of paras(value)){const node=make('p','',p);node.dir='auto';root.append(node);}if(!root.children.length)root.append(make('p','',tx().error));}
  function renderHighlights(value){
    // Actual paragraphs, not inferred steps or fabricated user cases.
    const list=$('p199-points');list.replaceChildren();const chunks=paras(value).slice(1,4);
    chunks.forEach((p,i)=>{const row=make('article','p199-point');row.append(make('span','p199-point-num',String(i+1).padStart(2,'0')));const copy=make('p','',p);copy.dir='auto';row.append(copy);list.append(row);});
    $('features').hidden=chunks.length===0;
  }
  function makeRelated(){
    const own=getApp();const target=$('p199-related-list');target.replaceChildren();
    const matches=state.apps.apps.filter(a=>String(a.id)!==id).sort((a,b)=>Number(a.category!==own.category)-Number(b.category!==own.category)||String(a.name).localeCompare(String(b.name))).slice(0,3);
    matches.forEach(a=>{const link=make('a','p199-related-card');link.href='../../apps/'+a.id+'/';
      const url=imageURL(a.artworkUrl);if(url){const img=make('img','p199-related-icon');img.src=url;img.loading='lazy';img.alt='';link.append(img);}
      const stack=make('span','p199-related-copy');stack.append(make('strong','',state.asc.apps?.[String(a.id)]?.nameByLocale?.[state.locale]||a.name),make('span','',a.category||'App'));link.append(stack,make('span','p199-related-arrow','↗'));target.append(link);
    });
  }
  function selectLabel(){const lp=state.locale;return /^ja(?:-|$)/i.test(lp)?'日本語':'English';}
  function updateChapters(){const nodes=[...document.querySelectorAll('[data-p199-chapter]')].filter(a=>{const e=$(a.dataset.p199Chapter);return e&&!e.hidden;});let active=0;nodes.forEach((a,i)=>{if($(a.dataset.p199Chapter).getBoundingClientRect().top<190)active=i;});nodes.forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});set('p199-progress-current',String(active+1).padStart(2,'0'));set('p199-progress-total',String(nodes.length).padStart(2,'0'));set('p199-progress-name',nodes[active]?.textContent||'');$('p199-progress-fill').style.width=(100*(active+1)/Math.max(1,nodes.length))+'%';}
  function render(){
    const t=tx(),d=desc(),app=getApp();document.documentElement.lang=state.locale;document.documentElement.dir=rtl.has(state.locale)?'rtl':'ltr';
    document.title=title()+' · Tsukigashizumu Studio';set('p199-title',title());set('p199-crumb',title());
    const icon=$('p199-icon'),url=imageURL(app.artworkUrl);if(url){icon.src=url;icon.hidden=false;icon.onerror=()=>{icon.hidden=true;};}else icon.hidden=true;
    const summary=heroSummary(d.value,subtitle());set('p199-lead',summary.lead||title());set('p199-intro',summary.intro);
    set('p199-category',(app.category||'App')+' / App Store');set('p199-eyebrow',t.label);
    set('p199-all',t.all);set('p199-back',t.back);set('p199-store',t.store);set('p199-bottom-store',t.store);set('p199-price-note',t.price);
    $('p199-store').href=storeLink();$('p199-bottom-store').href=storeLink();set('p199-language-label',t.language);set('p199-country-label',t.region);
    for(const opt of $('p199-country').options)opt.textContent=nameFor(opt.value)+' ('+opt.value.toUpperCase()+')';
    for(const opt of $('p199-language').options)opt.textContent=opt.value+' · '+langFor(opt.value);
    set('p199-source','');
    const fall=$('p199-fallback');fall.hidden=!d.fallback;if(d.fallback)fall.textContent=escLocale(t.fallback,{locale:d.locale});
    set('p199-about-head',t.about);set('p199-screen-head',t.screen);set('p199-features-head',t.features);set('p199-full-head',t.full);set('p199-related-head',t.related);
    set('p199-section-lead',opening(d.value));set('p199-about-caption',t.aboutCaption);set('p199-full-caption',t.fullCaption);set('p199-proof-caption',t.noReviews);
    set('p199-image-note',t.screenNote);set('p199-image-fallback',t.noScreen);set('p199-image-unavailable',t.noScreen);set('p199-image-count-label',t.count);
    set('p199-toc-head',t.toc);set('p199-details-label',t.full);set('p199-full-toggle',t.fullToggle);set('p199-related-caption',t.more);
    renderDescription(d.value);renderHighlights(d.value);makeRelated();
    const chapters=[['overview',t.about],['screens',t.screen],['features',t.features],['full-description',t.full],['related',t.related]];
    const toc=$('p199-toc');toc.replaceChildren();for(const [key,label] of chapters){if($(key).hidden)continue;const a=make('a','',label);a.href='#'+key;a.dataset.p199Chapter=key;toc.append(a);}
    renderScreens();updateChapters();
  }
  function screenshotResolution(src){
    try{const u=new URL(src);if(!imageURL(u.href)||!u.pathname.includes('/image/thumb/'))return '';
      if(!/\/\d{2,4}x\d{2,4}bb\.(?:webp|png|jpe?g)$/i.test(u.pathname))return '';
      u.pathname=u.pathname.replace(/\/\d{2,4}x\d{2,4}bb\.(webp|png|jpe?g)$/i,'/1290x2796bb.$1');return imageURL(u.href);
    }catch(_){return '';}
  }
  function probe(src){return new Promise(resolve=>{const i=new Image();let finished=false;const finish=(x)=>{if(finished)return;finished=true;clearTimeout(timeout);i.onload=null;i.onerror=null;resolve(x);};const timeout=setTimeout(()=>finish(null),3200);i.referrerPolicy='no-referrer';i.onload=()=>finish({src,w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>finish(null);i.src=src;if(i.complete&&i.naturalWidth)finish({src,w:i.naturalWidth,h:i.naturalHeight});});}
  async function upgrade(src){const big=screenshotResolution(src);const [small,large]=await Promise.all([probe(src),big?probe(big):Promise.resolve(null)]);
    if(!small)return null;const ok=large&&large.w>=small.w*1.5&&large.h>=small.h*1.5&&Math.abs(large.w/large.h-small.w/small.h)<.035;return ok?large:small;
  }
  async function loadScreens(){const serial=++state.mediaSerial;state.media=[];state.mediaLoaded=false;renderScreens();
    try{
      const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),8500);let resp;try{resp=await fetch('https://itunes.apple.com/lookup?country='+encodeURIComponent(state.country)+'&entity=software&id='+id,{mode:'cors',credentials:'omit',cache:'no-store',signal:ctrl.signal});}finally{clearTimeout(timer);}
      if(!resp.ok)throw Error('APPLE_HTTP_'+resp.status);const body=await resp.json();const item=body.resultCount===1&&body.results?.length===1?body.results[0]:null;
      if(!item||item.trackId!==Number(id)||item.artistId!==ARTIST||item.kind!=='software')throw Error('MISMATCHED_APP');
      const urls=(Array.isArray(item.screenshotUrls)?item.screenshotUrls:[]).slice(0,5).map(imageURL).filter(Boolean);
      const results=await Promise.all(urls.map(upgrade));if(serial!==state.mediaSerial)return;
      state.media=results.map((shot,i)=>shot?{...shot,sourceIndex:i}:null).filter(Boolean);state.mediaLoaded=true;state.slide=0;renderScreens();
    }catch(e){if(serial===state.mediaSerial){state.media=[];state.mediaLoaded=true;renderScreens();}}
  }
  function sentenceFrom(text){
    const value=String(text||'').replace(/\s+/g,' ').trim();
    if(!value)return '';
    // A complete source sentence is preferable to a truncated marketing claim.
    const m=value.match(/^.{1,115}?[。！？!?](?=\s|$|[^\s])|^.{1,115}?[.](?=\s|$)/);
    if(m)return m[0].trim();
    return value.length<=115?value:'';
  }
  function compactSource(text,limit=210){
    const value=String(text||'').replace(/\s+/g,' ').trim();
    if(value.length<=limit)return value;
    const fragments=value.match(/[^。！？!?]+[。！？!?]|[^.!?]+[.!?](?=\s|$)/g)||[];
    const whole=[];let total=0;
    for(const s of fragments){if(total+s.length>limit)break;whole.push(s.trim());total+=s.length;}
    return whole.join(' ').trim();
  }
  function storyText(i,n){
    const jp=/^ja(?:-|$)/i.test(state.locale);
    const d=desc().value,ps=paras(d),sub=subtitle().trim();
    const usable=ps.map(p=>p.replace(/\s+/g,' ').trim()).filter(p=>p.length>24);
    const lead=usable[0]||'';
    const next=usable[1]||usable[0]||'';
    if(n===0){
      const heading=(sub.length>=4&&sub.length<=80?sub:sentenceFrom(lead))||title();
      const body=compactSource(lead===heading?next:lead)||compactSource(next)||'';
      return {heading,body:body===heading?'':body};
    }
    const heading=sentenceFrom(next)|| (jp?'このアプリでできること':'What this app can do');
    const body=compactSource(next===heading?(usable[2]||lead):next)||compactSource(lead)||'';
    return {heading,body:body===heading?'':body};
  }
  function storyRow(i,n,isExtra){
    const t=tx(),shot=state.media[i],jp=/^ja(?:-|$)/i.test(state.locale),row=make('article','p199-shot-row'+(n%2?' p199-shot-reverse':''));
    if(isExtra)row.classList.add('p199-shot-extra');
    const copy=make('div','p199-shot-copy');
    const kicker=make('span','p199-shot-kicker',jp?'このアプリの見どころ':'A CLOSER LOOK');
    const item=isExtra?{heading:jp?'ほかの操作画面':'More app screens',body:jp?'画像を押すと、画面全体を拡大して見られます。':'Open an image to see the full screen.'}:storyText(i,n);
    const head=make('h3','p199-shot-title',item.heading);
    const detail=make('p','p199-shot-description',item.body);
    head.dir='auto';detail.dir='auto';
    const hint=make('span','p199-shot-hint',(jp?'画面を拡大して見る':'Tap to view full screen')+' ↗');
    copy.append(kicker,head,detail,hint);
    const btn=make('button','p199-shot-button');btn.type='button';
    btn.setAttribute('aria-label',t.inspect+' '+(i+1));
    const img=make('img','');img.src=shot.src;img.alt=t.imageSource+' '+(i+1);img.loading='lazy';img.referrerPolicy='no-referrer';btn.append(img);
    btn.addEventListener('click',()=>openViewer(i));
    row.append(copy,btn);return row;
  }
  // P19-9R6R1: captions only where the app's real purpose is verified.
  // Unverified screenshots show their real original number without invented claims.
  function sharedEditorialDetail(shot, jp, num){
    if(id==='6804757287'){
      const ja=[
        ['価格と待ち時間を、同時に見る','現在価格・目標価格・待てる日数を入力して、節約額と時間の関係を比べます。'],
        ['条件を変えて、納得して選ぶ','金額や日数を変えて、いま買うか待つかを自分の基準で考えられます。'],
        ['数字を変えて、もう一度比べる','別の価格条件でも、差額と待つ時間の関係を確認できます。'],
        ['値下がりは予測しない','未来のセール価格ではなく、入力した価格と日数をもとに比較します。'],
        ['待つ価値を、自分で決める','節約できる金額と待つ時間を見ながら、購入のタイミングを考えます。']
      ];
      const en=[
        ['See the cost of waiting','Compare today’s price, your target price, and how many days you could wait.'],
        ['Change the inputs, own the choice','Try different prices and time windows before deciding whether to buy or wait.'],
        ['Compare another scenario','See how the difference in price relates to the time you would spend waiting.'],
        ['Not a price prediction','The calculation uses your inputs, not a guess about future sales.'],
        ['Decide what your time is worth','Consider both possible savings and the time you are willing to wait.']
      ];
      const idx=Math.max(0,Math.min(4,shot.sourceIndex));
      const d=(jp?ja:en)[idx];return {heading:d[0],body:d[1]};
    }
    return {heading:(jp?'実画面 ':'Screen ')+num,body:''};
  }
  // P19-9R6: shared editorial gallery pilot, no invented per-screenshot claims.
  const R6_PILOTS=new Set(["6760823598","6761338604","6762347699","6763169050","6765972725","6767983547","6768180849","6768219693","6769388691","6774479410","6775229100","6778138017","6781131521","6781497015","6781817734","6786129971","6787928513","6794575766","6795788626","6796486391","6798447816","6802814389","6804756043","6804756267","6804756535","6804756968","6804757195","6804757287","6808427228","6820674560","6821840147","6822927747"]);
  function sharedStoryStage(indexes){
    const jp=/^ja(?:-|$)/i.test(state.locale),m=state.media;
    const section=make('section','p199r6-stage');
    const mast=make('div','p199r6-mast');
    mast.append(make('span','p199r6-kicker','APP / SCREEN COLLECTION'),
      make('span','p199r6-total',String(indexes.length).padStart(2,'0')+' '+(jp?'枚の掲載画像':'ORIGINAL SCREENS')));
    const stage=make('div','p199r6-layout');
    const visual=make('button','p199r6-visual');visual.type='button';
    const image=make('img','p199r6-image');image.loading='eager';image.decoding='async';image.referrerPolicy='no-referrer';
    const failText=make('span','p199r6-image-fail',jp?'画像を読み込めませんでした':'Screenshot unavailable');failText.hidden=true;
    image.addEventListener('error',()=>{image.hidden=true;failText.hidden=false;});
    image.addEventListener('load',()=>{image.hidden=false;failText.hidden=true;});
    visual.append(image,failText);
    const narrative=make('div','p199r6-side');
    const issue=make('span','p199r6-number');
    const heading=make('h3','p199r6-title',title());heading.dir='auto';
    const sub=make('p','p199r6-caption',jp?'App Storeに掲載されているアプリの実画面です。':'An original app screenshot shown on the App Store.');
    const hint=make('p','p199r6-hint',jp?'番号を選ぶと、表示する画面が切り替わります。':'Select a number to switch screenshots.');
    const inspect=make('button','p199r6-inspect',jp?'画面を拡大':'Enlarge screenshot');inspect.type='button';
    const nav=make('div','p199r6-control');
    const prev=make('button','p199r6-prev','‹'),next=make('button','p199r6-next','›');
    prev.type='button';next.type='button';
    prev.title=jp?'前の画像':'Previous screenshot';next.title=jp?'次の画像':'Next screenshot';
    const count=make('span','p199r6-current');
    nav.append(prev,count,next);
    narrative.append(issue,heading,sub,hint,inspect,nav);stage.append(visual,narrative);
    const rail=make('div','p199r6-rail');
    let selected=0;
    const buttons=indexes.map((original,k)=>{
      const shot=m[original],number=String(shot.sourceIndex+1).padStart(2,'0');
      const button=make('button','p199r6-thumb');button.type='button';
      button.setAttribute('aria-label',(jp?'画面 ':'Screenshot ')+number);
      const pic=make('img','');pic.loading='lazy';pic.decoding='async';pic.referrerPolicy='no-referrer';pic.alt='';pic.src=shot.src;
      button.append(pic,make('span','',number));
      button.addEventListener('click',()=>show(k));rail.append(button);return button;
    });
    function show(k){
      selected=(k+indexes.length)%indexes.length;
      const shot=m[indexes[selected]],num=String(shot.sourceIndex+1).padStart(2,'0');
      image.hidden=false;failText.hidden=true;image.src=shot.src;
      image.alt=(jp?'実際のアプリ画面 ':'App screenshot ')+num;
      issue.textContent=(jp?'実画面 ':'SCREEN ')+num;
      const editorial=sharedEditorialDetail(shot, jp, num);
      heading.textContent=editorial.heading;
      sub.textContent=editorial.body;
      hint.hidden=(id==='6804757287');
      count.textContent=num+' / '+String(indexes.length).padStart(2,'0');
      buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===selected);b.setAttribute('aria-pressed',String(i===selected));});
      visual.onclick=()=>openViewer(indexes[selected]);inspect.onclick=()=>openViewer(indexes[selected]);
    }
    prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    section.append(mast,stage,rail);show(0);return section;
  }

  // P19-9R4: One real-image editorial stage with a compact five-screen navigator.
  // Special descriptions only belong to verified original Apple screenshot slots 03/04.
  let discountFocus=2;
  function discountStoryStage(indexes){
    const jp=/^ja(?:-|$)/i.test(state.locale),t=tx(),m=state.media;
    const root=make('section','p199r4-stage');
    const top=make('div','p199r4-top');
    top.append(make('span','p199r4-brand','DISCOUNT STACK  /  SCREEN STORIES'),
               make('span','p199r4-total',String(indexes.length).padStart(2,'0')+' '+(jp?'枚の実画面':'REAL SCREENS')));
    const display=make('div','p199r4-display');
    const copy=make('div','p199r4-copy');
    const eyebrow=make('span','p199r4-eyebrow');
    const heading=make('h3','p199r4-heading');
    const description=make('p','p199r4-description');
    const inspect=make('button','p199r4-inspect',jp?'画面を拡大して見る ↗':'Enlarge screenshot ↗');inspect.type='button';
    copy.append(eyebrow,heading,description,inspect);
    const imageButton=make('button','p199r4-visual');imageButton.type='button';
    const image=make('img','p199r4-image');image.loading='eager';image.referrerPolicy='no-referrer';
    imageButton.append(image);display.append(copy,imageButton);
    const nav=make('div','p199r4-nav');
    const current=make('span','p199r4-current');
    const controls=make('div','p199r4-controls');
    const prev=make('button','p199r4-prev','‹'),next=make('button','p199r4-next','›');
    prev.type='button';next.type='button';
    prev.title=jp?'前の画面':'Previous screen';next.title=jp?'次の画面':'Next screen';
    controls.append(prev,next);nav.append(current,controls);
    const rail=make('div','p199r4-rail');
    const thumbnailButtons=indexes.map((idx,k)=>{
      const shot=m[idx],number=String(shot.sourceIndex+1).padStart(2,'0');
      const button=make('button','p199r4-thumb');button.type='button';
      button.setAttribute('aria-label',(jp?'実画面 ':'Screenshot ')+number);
      const picture=make('img','');picture.src=shot.src;
      picture.referrerPolicy='no-referrer';picture.loading='lazy';picture.alt='';
      button.append(picture,make('span','',number));
      button.addEventListener('click',()=>update(k));rail.append(button);return button;
    });
    function contentFor(shot){
      const num=String(shot.sourceIndex+1).padStart(2,'0');
      if(shot.sourceIndex===2)return jp?
        {eyebrow:'03 / FINAL AMOUNT',heading:'割引の先にある、支払額まで。',body:'割引と税を順番に反映。最終的に支払う金額を、ひと目で確認できます。'}:
        {eyebrow:'03 / FINAL AMOUNT',heading:'What will you actually pay?',body:'Apply discounts and tax in sequence, then see the final amount.'};
      if(shot.sourceIndex===3)return jp?
        {eyebrow:'04 / STACKED DISCOUNTS',heading:'割引が重なっても、見失わない。',body:'複数の割引を順番に反映し、金額と節約額の変化を確認できます。'}:
        {eyebrow:'04 / STACKED DISCOUNTS',heading:'Follow every discount.',body:'See how each successive discount changes the final price and savings.'};
      // All five screen slots have copy; each statement is supported by the actual calculator UI.
      if(shot.sourceIndex===0)return jp?
        {eyebrow:'01 / PRICE TO PAY',heading:'元値から、支払額へ。',body:'元の金額と割引後の支払見込み額を、同じ画面で確認できます。'}:
        {eyebrow:'01 / PRICE TO PAY',heading:'From price to amount due.',body:'See the original price and estimated amount after discounts on one screen.'};
      if(shot.sourceIndex===1)return jp?
        {eyebrow:'02 / DISCOUNT RESULT',heading:'条件が変わると、結果も変わる。',body:'割引の条件を調整したあと、支払見込み額をその場で確かめられます。'}:
        {eyebrow:'02 / DISCOUNT RESULT',heading:'Change the terms. See the result.',body:'Adjust discount conditions and check the estimated amount to pay.'};
      if(shot.sourceIndex===4)return jp?
        {eyebrow:'05 / ANOTHER EXAMPLE',heading:'違う金額でも、同じように。',body:'金額を変えた計算例でも、元値と計算後の金額を見比べられます。'}:
        {eyebrow:'05 / ANOTHER EXAMPLE',heading:'Another price, same clear result.',body:'Compare the starting price with the calculated result in another example.'};
      return jp?
        {eyebrow:num+' / ORIGINAL SCREEN',heading:'支払見込み額を確認。',body:'計算した金額を、元の価格とあわせて確認できます。'}:
        {eyebrow:num+' / ORIGINAL SCREEN',heading:'Review the amount to pay.',body:'See the calculated amount alongside the original price.'};
    }
    function update(k){
      discountFocus=k;const shot=m[indexes[k]],item=contentFor(shot);
      // Neutral slots are actual screenshots: no unverified feature copy.
      root.classList.toggle('is-neutral-screen',shot.sourceIndex!==2 && shot.sourceIndex!==3);
      eyebrow.textContent=item.eyebrow;heading.textContent=item.heading;
      description.textContent=item.body;description.hidden=!item.body;
      image.src=shot.src;
      image.alt=(jp?'割引スタックの実際の操作画面 ':'Discount Stack screenshot ')+(shot.sourceIndex+1);
      current.textContent=String(shot.sourceIndex+1).padStart(2,'0')+' / '+String(m.length).padStart(2,'0');
      thumbnailButtons.forEach((button,i)=>{
        button.classList.toggle('is-active',i===k);button.setAttribute('aria-pressed',String(i===k));
      });
      const open=()=>openViewer(indexes[k]);imageButton.onclick=open;inspect.onclick=open;
    }
    prev.addEventListener('click',()=>update((discountFocus+indexes.length-1)%indexes.length));
    next.addEventListener('click',()=>update((discountFocus+1)%indexes.length));
    root.append(top,display,nav,rail);update(Math.min(discountFocus,indexes.length-1));return root;
  }
  function renderScreens(){
    const t=tx(),m=state.media;
    const has=m.length>0;$('screens').hidden=!has;$('p199-hero-media').hidden=!has;$('p199-hero-fallback').hidden=has;
    $('p199-image-fallback').hidden=true;
    if(!has){set('p199-fallback-title',title());set('p199-fallback-subtitle',subtitle()||getApp().category||'Tsukigashizumu Studio');}
    if(!has){$('p199-hero-image').removeAttribute('src');set('p199-count','—');updateChapters();return;}
    set('p199-count',String(m.length).padStart(2,'0'));
    state.slide=Math.min(state.slide,m.length-1);
    const item=m[state.slide],image=$('p199-hero-image');image.src=item.src;image.referrerPolicy='no-referrer';image.alt=t.imageSource+' '+(state.slide+1);
    set('p199-slide-count',String(state.slide+1).padStart(2,'0')+' / '+String(m.length).padStart(2,'0'));
    set('p199-hero-caption',t.count+' '+String(state.slide+1)+' / '+String(m.length));
    const holder=$('p199-gallery');holder.replaceChildren();
    // Two editorial highlights, with the remaining original Apple screenshots still accessible.
    // Never infer screenshot capabilities: generic text comes directly from the active ASC description.
    const discountIndexes=id==='6802308517'?[2,3].map(srcIndex=>m.findIndex(shot=>shot.sourceIndex===srcIndex)):[];
    const hasDiscountStage=id==='6802308517'&&discountIndexes.every(i=>i>=0)&&discountIndexes.length===2;
    const preferred=hasDiscountStage?discountIndexes:m.map((_,i)=>i).slice(0,2);
    const extra=m.map((_,i)=>i).filter(i=>!preferred.includes(i));
    if(id==='6802308517'){
      // Original Apple screenshots in numeric order; start on 03 when possible.
      const ordered=m.map((_,i)=>i).sort((a,b)=>m[a].sourceIndex-m[b].sourceIndex);
      holder.append(discountStoryStage(ordered));
    } else if(R6_PILOTS.has(id)){
      const ordered=m.map((_,i)=>i).sort((a,b)=>m[a].sourceIndex-m[b].sourceIndex);
      holder.append(sharedStoryStage(ordered));
    } else preferred.forEach((i,n)=>holder.append(storyRow(i,n,false)));
    if(extra.length && id!=='6802308517' && !R6_PILOTS.has(id)){
      const more=make('details','p199-more-screens');
      const summary=make('summary','',/^ja(?:-|$)/i.test(state.locale)?'ほかの画面を見る（'+extra.length+'枚）':'See more screenshots ('+extra.length+')');
      const list=make('div','p199-extra-screens');
      extra.forEach((i,n)=>list.append(storyRow(i,n,true)));
      more.append(summary,list);holder.append(more);
    }
    set('p199-hero-image-action',t.inspect);$('p199-hero-open').onclick=()=>openViewer(state.slide);
    $('p199-slide-prev').disabled=m.length<2;$('p199-slide-next').disabled=m.length<2;
    updateChapters();
  }
  let viewerIndex=0,oneToOne=false;
  function viewerShow(i){const m=state.media;viewerIndex=(i+m.length)%m.length;const t=tx(),shot=m[viewerIndex],img=$('p199-modal-image');img.src=shot.src;img.alt=t.imageSource+' '+(viewerIndex+1);
    img.classList.toggle('p199-one-to-one',oneToOne);if(oneToOne){img.style.width=shot.w+'px';img.style.height=shot.h+'px';}else{img.style.width='';img.style.height='';}
    set('p199-modal-count',String(viewerIndex+1)+' / '+String(m.length));set('p199-modal-quality',t.quality+': '+shot.w+' × '+shot.h+' px'+((shot.w<800||shot.h<1600)?' · '+t.qualityLimited:''));
    set('p199-fit',t.fit);set('p199-actual',t.original);set('p199-modal-close-label',t.close);
    $('p199-modal-prev').disabled=m.length<2;$('p199-modal-next').disabled=m.length<2;
  }
  function openViewer(i){const dialog=$('p199-dialog');if(!dialog||!state.media.length)return;oneToOne=false;viewerShow(i);if(!dialog.open)dialog.showModal();}
  function bind(){
    $('p199-slide-prev').addEventListener('click',()=>{state.slide=(state.slide-1+state.media.length)%state.media.length;renderScreens();});
    $('p199-slide-next').addEventListener('click',()=>{state.slide=(state.slide+1)%state.media.length;renderScreens();});
    $('p199-modal-close').addEventListener('click',()=>$('p199-dialog').close());
    $('p199-modal-prev').addEventListener('click',()=>viewerShow(viewerIndex-1));$('p199-modal-next').addEventListener('click',()=>viewerShow(viewerIndex+1));
    $('p199-fit').addEventListener('click',()=>{oneToOne=false;viewerShow(viewerIndex);});$('p199-actual').addEventListener('click',()=>{oneToOne=true;viewerShow(viewerIndex);});
    $('p199-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();viewerShow(viewerIndex+1);}else if(e.key==='ArrowLeft'){e.preventDefault();viewerShow(viewerIndex-1);}});
    window.addEventListener('scroll',()=>{if(!window.__p199Frame){window.__p199Frame=requestAnimationFrame(()=>{window.__p199Frame=0;updateChapters();});}},{passive:true});
    $('p199-language').addEventListener('change',()=>{state.locale=$('p199-language').value;try{localStorage.setItem('tsz-next-language',state.locale);}catch(_){}render();});
    $('p199-country').addEventListener('change',()=>{state.country=$('p199-country').value;try{localStorage.setItem('tsz-next-storefront-manual-v1',state.country);}catch(_){}render();void loadScreens();});
    $('p199-dialog').addEventListener('click',e=>{if(e.target===$('p199-dialog'))$('p199-dialog').close();});
  }
  async function start(){
    bind();try{
      const [apps,asc,map]=await Promise.all([readJSON('data/apps.json'),readJSON('data/asc-localizations.json'),readJSON('data/locale-storefronts.json')]);
      if(apps.developerId!==ARTIST||!Array.isArray(apps.apps)||apps.apps.length!==34||!apps.apps.find(a=>String(a.id)===id&&a.artistId===ARTIST))throw Error('INVALID_CATALOG');
      if(asc.developerId!==ARTIST||asc.schemaVersion!==1||!asc.apps||!Array.isArray(asc.baselineIds))throw Error('INVALID_ASC');
      if(map.developerId!==ARTIST||Object.keys(map.storefrontByLocale||{}).length!==50)throw Error('INVALID_STOREFRONTS');
      state.apps=apps;state.asc=asc;state.map=map;
      const locales=Object.keys(map.storefrontByLocale),search=new URLSearchParams(location.search);let saved='';try{saved=localStorage.getItem('tsz-next-language')||'';}catch(_){}
      const browser=[...(navigator.languages||[]),navigator.language].filter(Boolean);
      const find=v=>locales.find(c=>c.toLowerCase()===String(v).toLowerCase())||locales.find(c=>c.split('-')[0]===String(v).split('-')[0]);
      state.locale=find(search.get('language'))||find(saved)||browser.map(find).find(Boolean)||'en-US';
      let manual='';try{manual=localStorage.getItem('tsz-next-storefront-manual-v1')||'';}catch(_){}
      const countries=[...new Set(['us',...Object.values(map.storefrontByLocale)])].sort();state.country=countries.includes(manual)?manual:(map.storefrontByLocale[state.locale]||'us');
      for(const locale of locales){const opt=make('option','',locale);opt.value=locale;$('p199-language').append(opt);}
      for(const country of countries){const opt=make('option','',country);opt.value=country;$('p199-country').append(opt);}
      $('p199-language').value=state.locale;$('p199-country').value=state.country;
      $('p199-status').hidden=true;$('p199-content').hidden=false;render();void loadScreens();
      if(location.hash){const key=location.hash.slice(1);if(/^[a-z-]+$/.test(key)&&$(key)){requestAnimationFrame(()=>$(key).scrollIntoView());}}
    }catch(e){console.warn('P199_DATA_UNAVAILABLE',e.message);$('p199-status').textContent=strings.en.error;}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else void start();
})();
