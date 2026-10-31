/* TSZ LP P1B. Basic Consent Mode. No GA4 or Worker network unless explicit consent and verified config. */
(() => {
  'use strict';
  const CONFIG='./web-measurement-config.json';
  const LOCALES='./web-measurement-locales.json';
  const STORAGE='tsz-web-analytics-consent-v1';
  const allowedHost = location.hostname === 'tsukigashizumu-cmd.github.io';
  const preview = ['127.0.0.1','localhost'].includes(location.hostname) && new URLSearchParams(location.search).get('analytics_preview') === '1';
  const supportedContents = new Set(['post_result_lp_footer','config_footer_lp']);
  // Fixed app-only UTM source allowlist; do not relay arbitrary query text to Google.
  const allowedAppSources = new Set(['buy_price_138','app_6802308517','app_6798447816','app_6778138017','app_6772130038','app_6760823598','app_6821840147','app_6802814389','app_6794575766','app_6781131521','app_6804757195','app_6804757287','app_6795788626','app_6774479410','app_6804756535','app_6822927747','app_6781497015','app_6804756267','app_6767983547','app_6769388691','app_6804756043','app_6787928513','app_6820674560','app_6804756968','app_6768180849','app_6768219693','app_6762347699','app_6808427228','app_6786129971','app_6763169050','app_6761338604','app_6775229100','app_6765972725','app_6781817734','app_6796486391']);
  let enabled = false, id = '', granted = false, choice = null, ui=null, localizations=null, initialized=false;
  let state='pending', tagLoaded=false, eventCount=0;
  function readChoice(){try{const s=localStorage.getItem(STORAGE);return ['granted','denied'].includes(s)?s:null;}catch(_){return null;}}
  function saveChoice(value){try{localStorage.setItem(STORAGE,value);}catch(_){/* private mode remains per-page */}}
  function consentObject(value){return {analytics_storage:value,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};}
  function sanitizedPageUrl(){
    const u=new URL(location.origin+location.pathname);
    const p=new URLSearchParams(location.search);
    const source=p.get('utm_source'), medium=p.get('utm_medium'), campaign=p.get('utm_campaign'), content=p.get('utm_content');
    if (allowedAppSources.has(source) && medium==='owned_app' && campaign==='daily_offers_v1' && supportedContents.has(content)) {
      u.searchParams.set('utm_source',source);u.searchParams.set('utm_medium',medium);
      u.searchParams.set('utm_campaign',campaign);u.searchParams.set('utm_content',content);
    }
    return u.href;
  }
  // APPDOCK_DYNAMIC_ALLOWLIST_V1: backward-compatible dynamic reader.
  // APPDOCK_ALL_SOURCES_V2: AppDock is the sole source of UTM sender tokens.
  // Public data contains only opaque tokens, never development app metadata.
  async function loadAppDockSources() {
    const validSource = (value) => typeof value === 'string' && /^[a-z0-9][a-z0-9_]{0,127}$/.test(value);
    async function readLegacy() {
      try {
        const response = await fetch('./published_candidates.json', {cache:'no-store'});
        if (!response.ok) return false;
        const entries = await response.json();
        if (!Array.isArray(entries) || entries.length === 0 || entries.length > 1000) return false;
        const additions = new Set();
        const base = new URL(location.origin + '/next/');
        for (const item of entries) {
          if (!item || item.rollout !== 'PUBLISHED_CANDIDATE' || item.appDockReleaseStatus !== 'published' ||
              !Array.isArray(item.issues) || item.issues.length !== 0 ||
              !validSource(item.utmSource) || additions.has(item.utmSource)) return false;
          for (const [key, placement] of [['mainURL','post_result_lp_footer'],['settingsURL','config_footer_lp']]) {
            if (typeof item[key] !== 'string') return false;
            let u;
            try { u = new URL(item[key]); } catch (_) { return false; }
            if (u.origin !== base.origin || u.pathname !== base.pathname || u.hash ||
                [...u.searchParams].length !== 4 ||
                u.searchParams.get('utm_source') !== item.utmSource ||
                u.searchParams.get('utm_medium') !== 'owned_app' ||
                u.searchParams.get('utm_campaign') !== 'daily_offers_v1' ||
                u.searchParams.get('utm_content') !== placement) return false;
          }
          additions.add(item.utmSource);
        }
        for (const source of additions) allowedAppSources.add(source);
        return true;
      } catch (_) { return false; }
    }
    try {
      const response = await fetch('./appdock_source_allowlist.json', {cache:'no-store'});
      // P6 deployments had no all-source file. Keep legacy support until first P7 sync.
      if (!response.ok) return response.status === 404 ? readLegacy() : false;
      const document = await response.json();
      if (!document || document.schemaVersion !== 1 || !Array.isArray(document.sources) ||
          document.sources.length === 0 || document.sources.length > 1000) return false;
      const additions = new Set();
      for (const source of document.sources) {
        if (!validSource(source) || additions.has(source)) return false;
        additions.add(source);
      }
      // Apply atomically: never allow a valid prefix of a damaged JSON registry.
      for (const source of additions) allowedAppSources.add(source);
      return true;
    } catch (_) { return false; }
  }
  function loadTag(){
    if (tagLoaded || !enabled || !granted || !allowedHost || !/^G-[A-Z0-9]{6,15}$/.test(id)) return;
    tagLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',consentObject('denied'));
    window.gtag('consent','update',consentObject('granted'));
    window.gtag('js',new Date());
    window.gtag('config',id,{page_location:sanitizedPageUrl(),allow_google_signals:false,allow_ad_personalization_signals:false});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    script.onerror=()=>{state='tag_error';};
    document.head.append(script);
    state='active';
  }
  function msg(index){const locale=window.TSZ_I18N?.locale||'en-US';return (localizations?.locales?.[locale]||localizations?.locales?.['en-US']||[])[index]||['Website analytics','With your permission, we use Google Analytics to understand visits and App Store link clicks. You can decline and still use this site.','Allow analytics','Decline','Analytics choices','Website privacy'][index];}
  function createUI(){
    if(ui)return;
    const panel=document.createElement('section');panel.id='tsz-consent-panel';panel.className='tsz-consent-panel';panel.hidden=true;panel.setAttribute('role','region');panel.setAttribute('aria-labelledby','tsz-consent-heading');
    const head=document.createElement('h2');head.id='tsz-consent-heading';
    const desc=document.createElement('p');desc.id='tsz-consent-desc';
    const actions=document.createElement('div');actions.className='tsz-consent-actions';
    const decline=document.createElement('button');decline.type='button';decline.id='tsz-consent-decline';
    const allow=document.createElement('button');allow.type='button';allow.className='tsz-accept';allow.id='tsz-consent-allow';
    const privacy=document.createElement('a');privacy.href='./web-privacy.html';privacy.id='tsz-consent-privacy';
    actions.append(decline,allow);panel.append(head,desc,actions,privacy);document.body.append(panel);
    ui={panel,head,desc,decline,allow,privacy};
    function choose(value){
      choice=value;granted=value==='granted';saveChoice(value);panel.hidden=true;
      const opener=document.getElementById('tsz-consent-reopen');if(opener)opener.hidden=false;
      if(granted){
        if(enabled){loadTag();}
        else {state=preview?'local_preview':'disabled';}
      }else if(tagLoaded){
        window.gtag?.('consent','update',consentObject('denied'));
        // Reload removes the previously loaded Google script from the active document.
        location.reload();
      }
      else state='declined';
    }
    allow.addEventListener('click',()=>choose('granted'));
    decline.addEventListener('click',()=>choose('denied'));
    const opener=document.getElementById('tsz-consent-reopen');
    if(opener)opener.addEventListener('click',()=>{panel.hidden=false;head.tabIndex=-1;head.focus();});
    document.addEventListener('tsz-locale-changed',relabel);
    relabel();
  }
  function relabel(){
    // Localize the footer even when GA4 has been deliberately disabled.
    const footer=document.getElementById('tsz-web-privacy-link');if(footer)footer.textContent=msg(5);
    if(!ui)return;
    ui.head.textContent=msg(0);ui.desc.textContent=msg(1);ui.allow.textContent=msg(2);ui.decline.textContent=msg(3);ui.privacy.textContent=msg(5);
    const opener=document.getElementById('tsz-consent-reopen');if(opener)opener.textContent=msg(4);
  }
  function handleClick(e){
    if (!enabled || !granted || !tagLoaded || !allowedHost || typeof window.gtag!=='function')return;
    const a=(e.target instanceof Element ? e.target : null)?.closest('a[data-tsz-app-id]');
    if(!a)return;
    // Only the two trusted product-link constructors annotate anchors.
    const appId=a.dataset.tszAppId, slug=a.dataset.tszAppSlug;
    if(!/^\d{8,12}$/.test(appId||'') || slug!=='app_'+appId)return;
    let url;try{url=new URL(a.href);}catch(_){return;}
    if(url.protocol!=='https:' || url.hostname!=='apps.apple.com' || !new RegExp('/id'+appId+'(?:[/?#]|$)').test(url.pathname))return;
    const place=a.closest('#appdock-original-shelf')?'original_shelf':a.closest('#free-apps')?'daily_free':a.closest('#paid-apps')?'price_drop':'app_catalog';
    const offer=a.dataset.tszOfferType==='free'?'free':'unknown';
    const payload={target_app_id:appId,target_app_slug:slug,offer_type:offer,placement:place};
    // Snapshot annotation comes only from the trusted LP app-card constructors.
    // Stale/unsupported data must never become a made-up click price.
    const amount=a.dataset.tszShownPrice, currency=a.dataset.tszShownCurrency;
    const country=a.dataset.tszShownStorefront, checked=a.dataset.tszShownPriceCheckedUtc;
    const checkedMs=Date.parse(checked||'');
    const age=Date.now()-checkedMs;
    const urlCountry=url.pathname.split('/')[1]?.toUpperCase();
    if (amount && /^\d{1,6}(?:\.\d{1,4})?$/.test(amount) && Number.isFinite(Number(amount)) &&
        /^[A-Z]{3}$/.test(currency||'') && /^[A-Z]{2}$/.test(country||'') &&
        country===urlCountry && Number.isFinite(checkedMs) &&
        age>=-60*1000 && age<=5*60*1000 &&
        new Date(checkedMs).toISOString()===checked) {
      payload.clicked_price=currency+':'+amount; // GA4 event-scope custom dimension
      payload.clicked_price_amount=Number(amount); // numeric, no FX conversion
      payload.price_currency=currency;
      payload.price_storefront=country;
      payload.price_checked_utc=checked; // source snapshot timestamp; do NOT register as dimension
      payload.price_status='lp_display_verified';
    } else {
      payload.price_status='unverified';
    }
    window.gtag('event','app_store_outbound',payload);
    eventCount++;
  }
  async function init(){
    await loadAppDockSources();
    choice=readChoice();
    try {
      const r=await fetch(CONFIG,{cache:'no-store'});
      if(!r.ok)throw Error('Config HTTP '+r.status);
      const c=await r.json();
      enabled=Boolean(allowedHost && c.schemaVersion===1 && c.enabled===true && c.privacyReviewed===true && c.localeReviewed===true && c.ga4PropertyVerified===true && typeof c.measurementId==='string' && /^G-[A-Z0-9]{6,15}$/.test(c.measurementId));
      if(enabled)id=c.measurementId;
    }catch(_){enabled=false;}
    if(!enabled&&!preview){
      // Fetch only first-party translation text. Do not load GA4 or show consent UI.
      try{const r=await fetch(LOCALES,{cache:'no-store'});if(r.ok){const d=await r.json();if(d.schemaVersion===1 && Object.keys(d.locales||{}).length===50)localizations=d;}}catch(_){}
      relabel();document.addEventListener('tsz-locale-changed',relabel);
      state='disabled';initialized=true;return;
    }
    try {const r=await fetch(LOCALES,{cache:'no-store'});if(r.ok){const d=await r.json();if(d.schemaVersion===1 && Object.keys(d.locales||{}).length===50)localizations=d;}}catch(_){ /* English fallback in local preview only */ }
    createUI();
    const opener=document.getElementById('tsz-consent-reopen');if(opener)opener.hidden=false;
    if(choice==='granted'){
      granted=true;ui.panel.hidden=true;
      if(enabled)loadTag();else state='local_preview';
    }else if(choice==='denied') {ui.panel.hidden=true;state='declined';}
    else {ui.panel.hidden=false;state='choice_required';}
    document.addEventListener('click',handleClick,true);
    initialized=true;
  }
  window.TSZ_WEB_MEASUREMENT=Object.freeze({
    get allowed(){return enabled && granted;},
    get status(){return state;},
    get preview(){return preview;},
    get choice(){return choice||'unset';},
    get eventCount(){return eventCount;},
    get initialized(){return initialized;}
  });
  void init();
})();
