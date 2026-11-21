/* R537: Unit Price ONLY. Locale-specific editorial is separate from unavailable ASC metadata. */
(()=>{'use strict';
 const APP_ID='6804760060',RTL=new Set(['ar-SA','he','ur-PK']);
 const $=id=>document.getElementById(id);
 const state={locale:'en-US',region:'us',extra:false};
 const appUrl=()=>`https://apps.apple.com/${state.region}/app/id${APP_ID}`;
 const safeRegion=s=>/^[a-z]{2}$/.test(s||'')?s:null;
 const money=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
 const nativeLanguageLabel=locale=>{
  // Show a recognizable endonym, retaining the exact App Store locale code for disambiguation.
  const base=locale.startsWith('zh-')?locale:locale.split('-')[0];
  const fallbacks={'en':'English','ja':'日本語','ar':'العربية','he':'עברית','pa':'ਪੰਜਾਬੀ','zh-Hans':'简体中文','zh-Hant':'繁體中文'};
  let label=fallbacks[base]||base;
  try{
   if(typeof Intl.DisplayNames==='function'){
    const proposed=new Intl.DisplayNames([locale],{type:'language'}).of(base);
    if(proposed && proposed.toLowerCase()!==base.toLowerCase())label=proposed;
   }
  }catch(_){/* Supported locale codes are always retained. */}
  return label+' · '+locale;
 };

 const regionDisplayName=(region,locale)=>{
  // Preserve the ISO code first, so compact controls remain unambiguous.
  const code=region.toUpperCase();
  if(typeof Intl.DisplayNames==='function'){
   for(const tag of [locale,'en']){
    try{
     const label=new Intl.DisplayNames([tag],{type:'region'}).of(code);
     if(label&&label.toUpperCase()!==code)return code+' · '+label;
    }catch(_){/* Fall through to an English name or ISO code. */}
   }
  }
  return code;
 };
 function renderRegionOptions(){
  const picker=$('r537-country');
  for(const option of picker.options){
   option.textContent=regionDisplayName(option.value,state.locale);
   option.title=option.textContent;
  }
  picker.value=state.region;
  picker.title=picker.selectedOptions.length?picker.selectedOptions[0].textContent:state.region.toUpperCase();
 }

 const setText=(id,val)=>{const node=$(id);if(node)node.textContent=val;};
 const percentExtra=()=>state.extra ? 0.9 : 1;
 let data=null;
 function renderCalculation(){
  const a=9*.9*percentExtra()*1.08/.75,b=10.5*1.08;
  const aWins=a<b, winner=aWins?'A':'B';
  state.extra=!!state.extra;
  setText('r537-unit-a',money(a));setText('r537-unit-b',money(b));
  setText('r537-extra-a',state.extra?'−10%':'+0%');
  $('r537-extra-a').dataset.active=String(state.extra);
  $('r537-item-a').dataset.winner=String(aWins);$('r537-item-b').dataset.winner=String(!aWins);
  setText('r537-winner',winner);setText('r537-difference',money(Math.abs(a-b))+' / kg');
  setText('r537-factor',state.extra?'0.90':'1.00');
  $('r537-toggle').checked=state.extra;
  setText('r537-math-a','= '+money(a)+' / kg');
  setText('r537-math-b','= '+money(b)+' / kg');
  setText('r537-check',state.extra?'✓':'＋');
 }
 function writeUrl(){
  const u=new URL(window.location.href);
  u.searchParams.set('language',state.locale);
  u.searchParams.set('storefront',state.region);
  history.replaceState(null,'',u.pathname+u.search+u.hash);
 }
 function renderLocale(){
  if(!data||!data.locales[state.locale])return;
  const t=data.locales[state.locale];
  document.documentElement.lang=state.locale;
  document.documentElement.dir=RTL.has(state.locale)?'rtl':'ltr';
  $('r537-language').value=state.locale;
  renderRegionOptions();
  $('r537-language-label').textContent=t.language;
  $('r537-country-label').textContent=t.region;
  $('r537-headline').textContent=t.headline;
  $('r537-lead').textContent=t.lead;
  $('r537-store-label').textContent=t.store;
  $('r537-store-bottom-label').textContent=t.store;
  $('r537-all').textContent=t.features;
  $('r537-benefits-head').textContent=t.features;
  $('r537-benefit-units').textContent=t.benefitUnits;
  $('r537-benefit-discounts').textContent=t.benefitDiscounts;
  $('r537-benefit-history').textContent=t.benefitHistory;
  $('r537-footer-all').textContent=t.all;
  $('r537-lower').textContent=t.lower;
  $('r537-action').textContent=t.action;
  $('r537-skip').textContent='↓ '+t.headline;
  $('r537-note-top').textContent=t.note;
  $('r537-note-bottom').textContent=t.note;
  $('r537-demo').setAttribute('aria-label',t.headline+' '+t.note);
  for(const link of document.querySelectorAll('[data-r537-store]'))link.href=appUrl();
  document.title=`Unit Price · ${t.headline} · Tsukigashizumu Studio`;
  document.querySelector('meta[name="description"]').content=t.lead;
  renderCalculation();
  const rect=$('r537-store-main').getBoundingClientRect();
  document.body.dataset.r537CtaFirstView=String(rect.top>=-2&&rect.bottom<=innerHeight+2);
  document.body.dataset.r537HorizontalFit=String(document.documentElement.scrollWidth<=innerWidth+2);
  document.body.dataset.r537Status='READY';
 }
 function chooseLocale(requested,available){
  if(requested&&available.includes(requested))return requested;
  if(requested){const near=available.find(x=>x.toLowerCase()===requested.toLowerCase());if(near)return near;}
  if(!requested){for(const prefer of (navigator.languages||[navigator.language||'en-US'])){
    const exact=available.find(x=>x.toLowerCase()===String(prefer).toLowerCase());if(exact)return exact;
    const partial=available.find(x=>x.split('-')[0].toLowerCase()===String(prefer).split('-')[0].toLowerCase());if(partial)return partial;
  }}
  return 'en-US';
 }
 async function init(){
  if(document.body.dataset.p199Id!==APP_ID)return;
  try{
   const response=await fetch('./unitprice-r537-locales.json?v=r537r6-20261122',{cache:'no-store'});
   if(!response.ok)throw Error('LOCALE_FETCH_'+response.status);
   data=await response.json();
   const available=Object.keys(data.locales||{});
   if(data.appId!==APP_ID||available.length!==50||Object.keys(data.storefrontByLocale||{}).length!==50||
      !available.every(k=>data.storefrontByLocale[k]&&['headline','lead','lower','action','note','language','region','all','store','features','benefitUnits','benefitDiscounts','benefitHistory'].every(f=>typeof data.locales[k][f]==='string'&&data.locales[k][f].trim())))throw Error('LOCALE_DATA_INVALID');
   const params=new URLSearchParams(location.search);
   const requested=params.get('language');
   state.locale=chooseLocale(requested,available);
   const regions=[...new Set(['us','jp',...Object.values(data.storefrontByLocale)])].sort();
   const country=params.get('storefront')?.toLowerCase();
   state.region=(safeRegion(country)&&regions.includes(country))?country:data.storefrontByLocale[state.locale];
   $('r537-language').replaceChildren();
   for(const loc of available.sort((a,b)=>a==='en-US'?-1:b==='en-US'?1:a==='ja'?-1:b==='ja'?1:a.localeCompare(b))){const opt=document.createElement('option');opt.value=loc;opt.textContent=nativeLanguageLabel(loc);$('r537-language').add(opt);}
   $('r537-country').replaceChildren();
   for(const region of regions){const opt=document.createElement('option');opt.value=region;opt.textContent=region.toUpperCase();$('r537-country').add(opt);}
   $('r537-language').addEventListener('change',()=>{
    state.locale=$('r537-language').value;
    state.region=data.storefrontByLocale[state.locale];
    renderLocale();writeUrl();
   });
   $('r537-country').addEventListener('change',()=>{
    state.region=$('r537-country').value;
    if(!safeRegion(state.region)||!regions.includes(state.region))state.region='us';
    renderLocale();writeUrl();
   });
   $('r537-toggle').addEventListener('change',()=>{state.extra=$('r537-toggle').checked;renderCalculation()});
   window.addEventListener('resize',()=>{if(!data)return;requestAnimationFrame(()=>{
     const rect=$('r537-store-main').getBoundingClientRect();
     document.body.dataset.r537CtaFirstView=String(rect.top>=-2&&rect.bottom<=innerHeight+2);
     document.body.dataset.r537HorizontalFit=String(document.documentElement.scrollWidth<=innerWidth+2);
   })},{passive:true});
   renderLocale();
  }catch(err){
   document.body.dataset.r537Status='ERROR';
   document.body.dataset.r537Error=String(err&&err.message||err).slice(0,100);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
