/* R537R20: Unit Price ONLY. Authenticated ASC names are never fabricated when an optional JSON request fails. */
(()=>{'use strict';
 const APP_ID='6804760060',RTL=new Set(['ar-SA','he','ur-PK']);
 const $=id=>document.getElementById(id);
 const state={locale:'en-US',region:'us',extra:false};
 const appUrl=()=>`https://apps.apple.com/${state.region}/app/id${APP_ID}`;
 const safeRegion=s=>/^[a-z]{2}$/.test(s||'')?s:null;
 // Display language and App Store country are separate. These browser tags have a
 // supported App Store country beyond the 40 countries implied by the 50 LP locales.
 // This is only a first-visit hint, never a statement of the user's Apple ID region
 // or a guarantee that this particular app is available in that country.
 const ALIAS_COUNTRIES=new Set(['hk','mo','sg','be','ie','nz','ar','ao','at','eg']);
 const countryHintFromLanguageTag=raw=>{
  const segments=String(raw||'').trim().replace(/_/g,'-').toLowerCase().split('-');
  for(const segment of segments.slice(1))if(ALIAS_COUNTRIES.has(segment))return segment;
  return null;
 };

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
 let data=null,asc=null;
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
  const verified=asc && asc.locales[state.locale];
  // The fictional comparison works even when the optional ASC name/subtitle asset is missing.
  // Never invent ASC-localized metadata: display a neutral product label in that case.
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
  setText('r537-after-head',verified ? verified.name : 'Unit Price');
  setText('r537-asc-subtitle',verified ? verified.subtitle : '');
  $('r537-asc-subtitle').hidden=!verified;
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
  document.title=verified ? `${verified.name} · ${verified.subtitle} · Tsukigashizumu Studio` :
   `Unit Price · ${t.headline} · Tsukigashizumu Studio`;
  document.querySelector('meta[name="description"]').content=t.lead;
  renderCalculation();
  const rect=$('r537-store-main').getBoundingClientRect();
  document.body.dataset.r537CtaFirstView=String(rect.top>=-2&&rect.bottom<=innerHeight+2);
  document.body.dataset.r537HorizontalFit=String(document.documentElement.scrollWidth<=innerWidth+2);
  document.body.dataset.r537Status='READY';
 }
 // Browser language tags often differ from App Store Connect's 50 supported locale IDs.
 // Resolve only to an existing locale: never add unsupported ASC languages or silently
 // turn Shahmukhi Punjabi (pa-PK) into Gurmukhi Punjabi (pa-IN).
 function resolveLocaleTag(raw,available){
  const tag=String(raw||'').trim().replace(/_/g,'-').toLowerCase();
  if(!tag)return null;
  const exact=available.find(x=>x.toLowerCase()===tag);
  if(exact)return exact;
  const parts=tag.split('-'),lang=parts[0];
  const region=parts.find(x=>/^[a-z]{2}$/.test(x)&&x!==lang)||'';
  const has=id=>available.includes(id)?id:null;
  if(lang==='zh'){
   if(parts.includes('hant'))return has('zh-Hant');
   if(parts.includes('hans'))return has('zh-Hans');
   if(['tw','hk','mo'].includes(region))return has('zh-Hant');
   return has('zh-Hans');
  }
  if(lang==='pa' && (parts.includes('arab')||region==='pk'))return null;
  if(lang==='es'){
   if(parts.includes('419')||(region&&region!=='es'&&region!=='gq'))return has('es-MX');
   return has('es-ES');
  }
  if(lang==='fr')return has(region==='ca'?'fr-CA':'fr-FR');
  if(lang==='en'){
   if(region==='ca')return has('en-CA');
   if(region==='au'||region==='nz')return has('en-AU');
   if(['gb','ie','za'].includes(region))return has('en-GB');
   return has('en-US');
  }
  if(lang==='pt')return has(region==='br'||!region?'pt-BR':'pt-PT');
  if(['no','nb','nn'].includes(lang))return has('no');
  if(lang==='iw')return has('he'); // Older browsers' deprecated Hebrew language tag.
  return available.find(x=>x.split('-')[0].toLowerCase()===lang)||null;
 }
 function chooseLocale(requested,available){
  if(requested)return resolveLocaleTag(requested,available)||'en-US';
  const preferences=Array.isArray(navigator.languages)&&navigator.languages.length?
   navigator.languages:[navigator.language||'en-US'];
  for(const prefer of preferences){
   const match=resolveLocaleTag(prefer,available);
   if(match)return match;
  }
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
   // The ASC snapshot is optional for rendering the editorial demo. Validate it as a
   // complete 50-locale set; on failure discard the entire snapshot rather than mix
   // trusted and unverified labels. No public page needs an ASC credential.
   try {
    // A stalled optional ASC asset must never hold the calculator hostage.
    // Bound both response headers and streaming JSON, then abort late work.
    const controller=new AbortController();
    let watchdog=null;
    let candidate;
    try {
     const timeout=new Promise((_,reject)=>{
      watchdog=setTimeout(()=>{
       controller.abort();
       reject(Error('ASC_ASSET_TIMEOUT'));
      },3000);
     });
     candidate=await Promise.race([
      (async()=>{
       const ascResponse=await fetch('./unitprice-r537-asc.json?v=r537r18-20261122',{
        cache:'no-store',signal:controller.signal
       });
       if(!ascResponse.ok)throw Error('ASC_ASSET_HTTP_ERROR');
       return ascResponse.json();
      })(),timeout
     ]);
    }finally{clearTimeout(watchdog);}
    const ascLocales=Object.keys(candidate.locales||{});
    if(candidate.appId!==APP_ID || candidate.versionString!=='1.0.1' ||
       candidate.source!=='AUTHENTICATED_APP_STORE_CONNECT_API' ||
       candidate.nativeTranslationReview!=='PENDING' ||
       ascLocales.length!==50 ||
       !available.every(loc=>candidate.locales[loc] &&
        ['name','subtitle'].every(key=>typeof candidate.locales[loc][key]==='string'&&candidate.locales[loc][key].trim())))
       throw Error('ASC_ASSET_INVALID');
    asc=candidate;
    document.body.dataset.r537AscStatus='READY';
   } catch (_) {
    // Metadata unavailable is not a fatal error for a fictional calculation demo.
    // Keep truthful, generic product labeling and preserve App Store destinations.
    asc=null;
    document.body.dataset.r537AscStatus='UNAVAILABLE';
    document.body.dataset.r537AscFallback='EDITORIAL_ONLY';
   }
   const params=new URLSearchParams(location.search);
   const requested=params.get('language');
   state.locale=chooseLocale(requested,available);
   // Use the first supported browser language as the country hint only when there
   // is no explicit URL country. Do not take a country from an unsupported language.
   const preferences=Array.isArray(navigator.languages)&&navigator.languages.length?
    navigator.languages:[navigator.language||'en-US'];
   const matchedTag=requested ? (resolveLocaleTag(requested,available)?requested:null) :
    (preferences.find(tag=>resolveLocaleTag(tag,available))||null);
   const hintedCountry=countryHintFromLanguageTag(matchedTag);
   const regions=[...new Set(['us','jp',...Object.values(data.storefrontByLocale),...ALIAS_COUNTRIES])].sort();
   const country=params.get('storefront')?.toLowerCase();
   state.region=(safeRegion(country)&&regions.includes(country))?country:
    (hintedCountry||data.storefrontByLocale[state.locale]);
   $('r537-language').replaceChildren();
   for(const loc of available.sort((a,b)=>a==='en-US'?-1:b==='en-US'?1:a==='ja'?-1:b==='ja'?1:a.localeCompare(b))){const opt=document.createElement('option');opt.value=loc;opt.textContent=nativeLanguageLabel(loc);$('r537-language').add(opt);}
   $('r537-country').replaceChildren();
   for(const region of regions){const opt=document.createElement('option');opt.value=region;opt.textContent=region.toUpperCase();$('r537-country').add(opt);}
   $('r537-language').addEventListener('change',()=>{
    // Language changes affect copy and country names, not a shopper's App Store destination.
    // The initial storefront is still chosen from the locale unless a valid URL override exists.
    state.locale=$('r537-language').value;
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
   if(document.body.dataset.r537AscStatus!=='READY')document.body.dataset.r537AscStatus='ERROR';
   document.body.dataset.r537Error=String(err&&err.message||err).slice(0,100);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
