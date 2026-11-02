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
      toc:'このページの目次',about:'このアプリについて',screen:'アプリの画面',features:'もう少し詳しく',full:'詳しい説明',related:'ほかのアプリも見る',screenNote:'',
      noScreen:'', inspect:'画像を拡大',prev:'前の画像',next:'次の画像',close:'閉じる',fit:'画面に合わせる',original:'実ピクセル表示', count:'アプリ画面',
      sourceAsc:'Tsukigashizumu Studio',sourceCatalog:'Tsukigashizumu Studio',fallback:'このページでは、別の言語の説明をご案内しています。',
      aboutCaption:'',proof:'',fullCaption:'',noFeatures:'',
      loading:'アプリの紹介を準備しています…',error:'読み込みに失敗しました。ページを更新するか、アプリ一覧からお探しください。',imageSource:'アプリの画面',quality:'画像サイズ',qualityLimited:'この画像は拡大すると細部が粗く見える場合があります。',
      noReviews:'',more:'こちらのアプリもおすすめ',fullToggle:'説明全文を読む',chap:'読んでいる章'},
    en:{language:'Language',region:'App Store region',all:'All apps',label:'APP STORIES / TSUKIGASHIZUMU STUDIO',store:'View in App Store ↗',back:'Explore other apps',price:'For current pricing and availability, visit the App Store.',
      toc:'ON THIS PAGE',about:'Meet the app',screen:'See the app',features:'A closer look',full:'About this app',related:'Explore more apps',screenNote:'',
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
      state.media=results.filter(Boolean);state.mediaLoaded=true;state.slide=0;renderScreens();
    }catch(e){if(serial===state.mediaSerial){state.media=[];state.mediaLoaded=true;renderScreens();}}
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
    m.forEach((shot,i)=>{const row=make('article','p199-shot-row');row.append(make('div','p199-screen-description',t.imageSource+' '+String(i+1).padStart(2,'0')));
      const btn=make('button','p199-shot-button');btn.type='button';btn.setAttribute('aria-label',t.inspect+' '+(i+1));const img=make('img','');img.src=shot.src;img.alt=t.imageSource+' '+(i+1);img.loading='lazy';img.referrerPolicy='no-referrer';btn.append(img);btn.addEventListener('click',()=>openViewer(i));
      row.append(btn);holder.append(row);});
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
