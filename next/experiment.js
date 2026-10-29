/* LP P8 copy x color experiment. No telemetry until a collector URL is configured.
   No cookies or user IDs. Storage is only used to keep a stable session-level assignment. */
(() => {
  'use strict';
  const EXPERIMENT = 'lp-copy-color-p8-v1';
  const VARIANTS = ['A', 'B', 'C'];
  const COLORS = ['lime', 'sky'];
  const random = (n) => {
    try { const v = new Uint32Array(1);crypto.getRandomValues(v);return v[0] % n; }
    catch (_) { return Math.floor(Math.random() * n); }
  };
  let assignment = null;
  try {
    const found = JSON.parse(sessionStorage.getItem('tsz-p8-assignment') || 'null');
    if (found && found.experiment === EXPERIMENT && VARIANTS.includes(found.copyId) && COLORS.includes(found.colorId)) assignment = found;
  } catch (_) { /* Private browsing may disable storage. */ }
  if (!assignment) {
    assignment = { experiment: EXPERIMENT, copyId: VARIANTS[random(VARIANTS.length)], colorId: COLORS[random(COLORS.length)] };
    try { sessionStorage.setItem('tsz-p8-assignment', JSON.stringify(assignment)); } catch (_) {}
  }
  document.documentElement.dataset.expColor = assignment.colorId;
  document.documentElement.dataset.expCopy = assignment.copyId;

  let copyCatalog = null, endpoint = '', ready = false;
  const recorded = new Set();
  const onceActions = new Set();
  const qaEvents = [];
  const validHost = ['tsukigashizumu-cmd.github.io'].includes(location.hostname) && !['1','2','3'].includes(new URLSearchParams(location.search).get('atelier')); // P10 visual preview excluded from P8/P9 analytics
  const appIdFromUrl = (link) => {
    const match = /\bid(\d{8,12})\b/.exec(link || '');
    return match ? match[1] : '';
  };
  function send(event, placement, extras = {}) {
    if (!ready || !copyCatalog) return;
    const permitted = ['impression', 'engaged', 'hero_browse', 'hero_free', 'purpose_filter', 'surprise_draw', 'app_store_open'];
    if (!permitted.includes(event)) return;
    const payload = {
      experiment: EXPERIMENT, copyId: assignment.copyId, colorId: assignment.colorId,
      event, placement, locale: window.TSZ_I18N?.locale || 'en-US',
      deviceClass: window.TSZ_LAYOUT?.measurementClass || 'unknown',
      storefront: document.getElementById('storefront-eyebrow')?.textContent?.slice(0, 80) || '',
      appId: /^[0-9]{8,12}$/.test(extras.appId || '') ? extras.appId : ''
    };
    qaEvents.push(payload); // In-memory only, never saved to localStorage.
    // P1B privacy boundary: existing Worker also requires explicit Web analytics consent.
    if (!validHost || !endpoint || window.TSZ_WEB_MEASUREMENT?.allowed !== true) return;
    try { void fetch(endpoint, {method:'POST', mode:'cors', keepalive:true, credentials:'omit',
      headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:JSON.stringify(payload)}).catch(() => {}); }
    catch (_) { /* Analytics must never block navigation. */ }
  }
  function impression(placement) {
    if (recorded.has(placement)) return;
    recorded.add(placement);send('impression',placement);
  }
  function engaged(placement) {
    if (!onceActions.has('engaged')) {onceActions.add('engaged');send('engaged',placement);}
  }
  function track(event, placement, extras = {}) {
    if (!ready) return;
    if (event !== 'impression') engaged(placement);
    send(event, placement, extras);
  }
  function applyCopy() {
    if (!copyCatalog) return;
    const locale = window.TSZ_I18N?.locale || 'en-US';
    const msg = copyCatalog.locales[locale] || copyCatalog.locales['en-US'];
    const idx = VARIANTS.indexOf(assignment.copyId);
    const headline = msg.headlines[idx];
    const set = (id, value) => { const element = document.getElementById(id); if (element) element.textContent = value; };
    set('hero-line1', headline[0]);set('hero-line2', headline[1]);
    set('hero-intro', msg.intro);set('hero-cta-browse',msg.browse);set('hero-cta-free',msg.free);
    set('purpose-title',msg.purpose);set('purpose-caption',msg.purposeCaption);
    set('random-title',msg.chance);set('random-caption',msg.chanceCaption);
    set('pick-button',msg.again);
    if (locale === 'ja') {
      const s1=document.querySelector('#app-count + span'),s2=document.querySelector('#free-count + span');
      if(s1)s1.textContent='公開中のアプリ';if(s2)s2.textContent='価格確認時点で無料';
      const freeTitle=document.querySelector('.free-head [data-i18n="freeAt"]');
      if(freeTitle)freeTitle.textContent='価格確認時点で無料';
      const catalogTitle=document.querySelector('#catalog-title [data-i18n="explore"]');
      if(catalogTitle)catalogTitle.textContent='すべてのアプリ';
    }
    document.title = `${headline[0]} ${headline[1]} · Tsukigashizumu Studio`;
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=msg.intro;
  }
  function watchVisibility() {
    if (!('IntersectionObserver' in window)) { impression('hero');return; }
    const io=new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= .25) {
          impression(entry.target.dataset.expPlacement);io.unobserve(entry.target);
        }
      }
    },{threshold:[.25]});
    for (const [id,placement] of [['headline','hero'],['purpose-title','purpose'],['random-title','surprise']]) {
      const element=document.getElementById(id);
      if(element){ element.dataset.expPlacement=placement;io.observe(element); }
    }
  }
  function bindClicks() {
    document.addEventListener('click',(event)=>{
      const target=event.target instanceof Element ? event.target : null;
      if (!target)return;
      const primary=target.closest('a[href="#choose"]');
      const free=target.closest('.hero-actions a[href="#free-now"]');
      if(primary){track('hero_browse','hero');return;}
      if(free){track('hero_free','hero');return;}
      if(target.closest('#pick-button')){track('surprise_draw','surprise');return;}
      if(target.closest('[data-purpose-category], [data-purpose-price], #purpose-reset')){
        track('purpose_filter','purpose');return;
      }
      const link=target.closest('a[href]');
      if(!link)return;
      if(link.closest('.app-card, .purpose-mini')) {
        const appId=appIdFromUrl(link.href);
        if (appId) track('app_store_open',link.closest('.choice-random')?'surprise':link.closest('.choice-purpose')?'purpose':link.closest('.free-section')?'free':link.closest('.paid-section')?'paid':'catalog',{appId});
      }
    },{capture:true});
    let lastQuery='';
    const search=document.getElementById('purpose-search');
    if(search)search.addEventListener('change',()=>{
      if(search.value.trim() && search.value!==lastQuery){lastQuery=search.value;track('purpose_filter','purpose');}
    });
  }
  async function init() {
    try {
      const response=await fetch('./copy-experiments.json',{cache:'no-store'});
      if(!response.ok)throw Error('copy JSON '+response.status);
      const data=await response.json();
      if(data.schemaVersion!==1||data.experiment!==EXPERIMENT||Object.keys(data.locales||{}).length!==50)throw Error('copy schema');
      for(const msg of Object.values(data.locales)){
        if(!Array.isArray(msg.headlines)||msg.headlines.length!==3||msg.headlines.some(v=>v.length!==2)||!msg.intro||!msg.purpose||!msg.chance) throw Error('incomplete copy catalog');
      }
      copyCatalog=data;
      try {
        const config=await fetch('./analytics-config.json',{cache:'no-store'});
        if(config.ok){const options=await config.json();
          if(options.schemaVersion===1 && typeof options.endpoint==='string' && /^https:\/\/[a-zA-Z0-9.-]+(?:\/[a-zA-Z0-9/_-]*)?$/.test(options.endpoint)) endpoint=options.endpoint;
        }
      }catch(_){ /* Untethered preview always works. */ }
      ready=true;applyCopy();bindClicks();watchVisibility();
      document.addEventListener('tsz-locale-changed',applyCopy);
    } catch (error) {
      // A failed experiment resource MUST leave the already-translated P7 UI usable.
      console.warn('P8 copy experiment unavailable; keeping existing copy:',error);
    }
  }
  window.TSZ_COPY_TEST=Object.freeze({get assignment(){return {...assignment};},get events(){return qaEvents.map(item=>({...item}));},get collectorEnabled(){return Boolean(endpoint && validHost);}});
  void init();
})();
