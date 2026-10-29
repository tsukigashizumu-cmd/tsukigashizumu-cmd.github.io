(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const i18n = window.TSZ_I18N;
  const t = (key, vars) => i18n ? i18n.t(key, vars) : key;
  const DEVELOPER_ID = 1817908735;
  const model = { base: null, apps: [], country: 'us', filter: 'all', query: '', sort: 'price', stale: true,
    catalogReady: false, loading: true, statusType: 'loading', checkedUTC: null, fallbackUS: false, category: 'all', pickId: null };
  // Storefront selection and interface language are independent.
  // Only a manually chosen region is persisted; no user or device identifier is transmitted.
  const STORE_KEY='tsz-next-storefront-manual-v1';
  let manualCountry=null;
  try { const saved=localStorage.getItem(STORE_KEY); if(/^[a-z]{2}$/.test(saved||'')) manualCountry=saved; } catch(_){}
  let availableCountries=[];
  let lastLocale=null;
  let storeMessage='';
  const liveSnapshots=new Map();
  const LIVE_CACHE_MS=15*60*1000;
  const APPLE_LOOKUP_HOST='https://itunes.apple.com/lookup';
  const ambiguousLocales=new Set(['ca','el','no','sv','ms']);
    const status = $('status');
  const el = (tag, cls, value) => { const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = String(value);
    return node; };
  let mappings = null;
  let ascMetadata = null;
  let ascMetadataPromise = null;
  function checkedAscMetadata(data) {
    if (!data || data.schemaVersion !== 1 || data.developerId !== DEVELOPER_ID ||
        !data.apps || typeof data.apps !== 'object' || !Array.isArray(data.baselineIds))
      throw Error('Invalid ASC metadata');
    const ids = model.base.apps.map(a => a.id).sort((a,b)=>a-b);
    if (JSON.stringify(ids) !== JSON.stringify(data.baselineIds)) throw Error('ASC baseline mismatch');
    return data;
  }
  async function loadAscMetadata() {
    if (ascMetadataPromise) return ascMetadataPromise;
    ascMetadataPromise = (async () => {
      try { return checkedAscMetadata(await readJson('./data/asc-localizations.json')); }
      catch(e) { console.info('ASC localizations not yet available (public catalog continues):', e.message); return null; }
    })();
    ascMetadata = await ascMetadataPromise;
    return ascMetadata;
  }
  function withReleasedTranslation(app, locale) {
    const row = ascMetadata?.apps?.[String(app.id)];
    if (!row) return app;
    // Exact match only: don't mislabel fallback English or another language as localized.
    const name = row.nameByLocale?.[locale];
    const subtitle = row.subtitleByLocale?.[locale];
    const desc = row.descriptionByLocale?.[locale];
    return {...app, name: (typeof name==='string' && name.trim()) ? name : app.name,
      description: (typeof desc==='string' && desc.trim()) ? desc : app.description,
      subtitle: (typeof subtitle==='string' && subtitle.trim()) ? subtitle : '',
      ascLocalizedName: Boolean(name), ascLocalizedDescription: Boolean(desc)};
  }
  let requestSerial = 0;
  const snapshots = new Map();
  function trustedUrl(url, type) {
    try { const u = new URL(url);
      if (u.protocol !== 'https:' || u.username || u.password || u.port) return '';
      if (type === 'store' && !['apps.apple.com', 'itunes.apple.com'].includes(u.hostname)) return '';
      if (type === 'art' && !(u.hostname === 'mzstatic.com' || u.hostname.endsWith('.mzstatic.com'))) return '';
      return u.href;
    } catch (_) { return ''; }
  }
  function regionLabel(country) {
    try { return new Intl.DisplayNames([i18n.locale],{type:'region'}).of(country.toUpperCase())||country.toUpperCase(); }
    catch(_) {return country.toUpperCase();}
  }
  // P1NE2: new storefront-specific copy in all 50 existing interface languages.
  // Locale JSON is kept intact; this same-origin bundle contains public UI text only.
  let storeUiBundle=null;
  let storeUiPromise=null;
  const storeUiKeys=['choose','manual','auto','unlisted','offline','partial','label','reset'];
  const storeUiEnglish={
    choose:'Choose an App Store country or region',
    manual:'App Store: {region} selected',
    auto:'App Store: {region} (language default)',
    unlisted:'Listing and price not confirmed in {region}',
    offline:'Latest prices unavailable for {region}',
    partial:'Only verified listings for {region} are shown',
    label:'App Store country or region',
    reset:'Match App Store to language'
  };
  async function loadStoreUi() {
    if(storeUiBundle)return storeUiBundle;
    if(!storeUiPromise)storeUiPromise=(async()=>{
      const data=await readJson('./storefront-ui-locales.json');
      if(data?.schemaVersion!==1 || data.kind!=='tsz-storefront-ui' ||
          !data.locales || typeof data.locales!=='object' || Object.keys(data.locales).length!==50 ||
          JSON.stringify(data.keys)!==JSON.stringify(storeUiKeys))throw Error('Invalid storefront UI language bundle');
      const baseKeys=Object.keys(storeUiEnglish).sort().join('|');
      for(const row of Object.values(data.locales)){
        if(!row || typeof row!=='object' || Object.keys(row).sort().join('|')!==baseKeys ||
            storeUiKeys.some(k=>typeof row[k]!=='string' || !row[k].trim()))
          throw Error('Incomplete storefront UI language bundle');
        for(const key of storeUiKeys){
          const expected=storeUiEnglish[key].includes('{region}')?1:0;
          if(row[key].split('{region}').length-1!==expected)throw Error('Invalid storefront placeholder');
        }
      }
      storeUiBundle=data;return data;
    })();
    try{return await storeUiPromise;}
    catch(e){storeUiPromise=null;throw e;}
  }
  function storefrontUiText(key,region) {
    const row=storeUiBundle?.locales?.[i18n.locale] || storeUiBundle?.locales?.['en-US'];
    const pattern=row?.[key] || storeUiEnglish[key] || '';
    return pattern.replaceAll('{region}',region||regionLabel(model.country));
  }
  function storeMessageText(mode){return storefrontUiText(storeUiKeys.includes(mode)?mode:'manual');}
  function showStoreMessage(mode) {
    storeMessage=mode;
    const area=$('tsz-storefront-message'); if(area)area.textContent=storeMessageText(mode);
  }
  function updateStoreSelector() {
    const sel=$('tsz-storefront-select'); if(!sel)return;
    const available=new Set(availableCountries);
    // Only regions actually represented by the 50-locale mapping (plus US) are offered in this pilot.
    const sorted=[...available].sort((a,b)=>regionLabel(a).localeCompare(regionLabel(b),i18n.locale));
    const current=sel.value;
    const needsRebuild=sel.options.length!==sorted.length || sorted.some((s,i)=>sel.options[i]?.value!==s);
    if(needsRebuild){ const fragment=document.createDocumentFragment();
      for(const country of sorted){const option=document.createElement('option');option.value=country;
        option.textContent=regionLabel(country);fragment.append(option);}
      sel.replaceChildren(fragment);
    } else {for(const option of sel.options)option.textContent=regionLabel(option.value);}
    if(available.has(model.country))sel.value=model.country;
    sel.setAttribute('aria-label',storefrontUiText('label'));
    const auto=$('tsz-storefront-auto'); if(auto){auto.hidden=!manualCountry;
      const title=storefrontUiText('reset');
      auto.title=title;auto.setAttribute('aria-label',title);}
    if(storeMessage)showStoreMessage(storeMessage);
  }
  function manualStoreChange(country) {
    if(!availableCountries.includes(country))return;
    manualCountry=country;
    try{localStorage.setItem(STORE_KEY,country);}catch(_){}
    model.country=country;model.pickId=null;model.category='all';
    updateStoreSelector();showStoreMessage('manual');void refreshLocale();
  }
  function initStoreControls() {
    const sel=$('tsz-storefront-select'),auto=$('tsz-storefront-auto');
    if(sel)sel.addEventListener('change',()=>manualStoreChange(sel.value));
    if(auto)auto.addEventListener('click',()=>{manualCountry=null;
      try{localStorage.removeItem(STORE_KEY);}catch(_){}
      const mapped=mappings?.[i18n.locale];
      if(mapped&&availableCountries.includes(mapped)){model.country=mapped;model.pickId=null;model.category='all';
        updateStoreSelector();showStoreMessage('auto');void refreshLocale();}
    });
  }
    function regionName() {
    try { return new Intl.DisplayNames([i18n.locale], {type: 'region'}).of(model.country.toUpperCase()); }
    catch (_) { return model.country.toUpperCase(); }
  }
  function priceLabel(app) {
    if (model.stale || !Number.isFinite(app.price) || !/^[A-Z]{3}$/.test(app.currency || '')) return t('checkPrice');
    if (app.price === 0) return t('freePrice');
    const amount = app.formattedPrice || new Intl.NumberFormat(i18n.locale, {style:'currency',currency:app.currency}).format(app.price);
    // ¥ and $ are shared by several currencies: always make the ISO currency explicit.
    return String(amount).toUpperCase().includes(app.currency) ? String(amount) : app.currency + ' ' + amount;
  }
  // Public App Store product IDs only. Keep data off the query string and never infer a discount from a paid price.
  function markMeasurementLink(anchor, app) {
    if (!Number.isSafeInteger(app.id) || !/^\d{8,12}$/.test(String(app.id))) return;
    anchor.dataset.tszAppId = String(app.id);
    anchor.dataset.tszAppSlug = 'app_' + String(app.id); // stable across locale and storefront
    anchor.dataset.tszOfferType = priceVerified() && app.price === 0 ? 'free' : 'unknown';
  }
  function card(app) {
    const article = el('article', 'app-card');
    const top = el('div', 'app-top');
    const art = trustedUrl(app.artworkUrl,'art');
    if (art) { const img=el('img','app-art');img.src=art;img.alt=app.name || 'App';img.loading='lazy';top.append(img); }
    else top.append(el('div','app-art app-art-placeholder',(app.name || '?').charAt(0)));
    const p=el('span','price'+(model.stale || app.price === null ? ' unknown':''),priceLabel(app));p.dir='auto';top.append(p);
    const category=el('div','category',app.category || 'App');category.dir='auto';
    const title=el('h3','app-title',app.name || 'App');title.dir='auto';
    const subtitle=app.subtitle ? el('p','app-subtitle',app.subtitle) : null;
    if(subtitle){subtitle.dir='auto';subtitle.style.cssText='margin:-7px 0 0;font-size:12px;color:#b5babb;line-height:1.45;overflow-wrap:anywhere';}
    const description=el('p','app-description',String(app.description || '').replace(/\s+/g,' ').trim() || t('viewApp'));
    description.dir='auto';
    const bottom=el('div','app-footer');bottom.append(el('span','',model.fallbackUS ? 'US App Store · Reference' : regionName() + ' App Store'));
    const link=trustedUrl(app.appStoreUrl,'store');
    if (link) { const a=el('a','',t('viewApp')+' ↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',t('viewApp')+': '+app.name);markMeasurementLink(a,app);bottom.append(a); }
    article.append(top,category,title);if(subtitle)article.append(subtitle);article.append(description,bottom);return article;
  }
  function categoryKey(app) { return String(app.category || 'App').trim() || 'App'; }
  function priceVerified() { return model.catalogReady && !model.fallbackUS && !model.stale; }
  function matchesChoices(app) {
    if (model.category !== 'all' && categoryKey(app) !== model.category) return false;
    if (model.filter === 'free' && (!priceVerified() || app.price !== 0)) return false;
    if (model.filter === 'paid' && (!priceVerified() || !(app.price > 0))) return false;
    return !model.query || [app.name,app.subtitle,app.category,app.description]
      .some(s=>String(s||'').toLocaleLowerCase().includes(model.query));
  }
  function miniCard(app) {
    const holder=el('div','purpose-mini');
    const art=trustedUrl(app.artworkUrl,'art');
    if(art){const img=el('img','purpose-art');img.src=art;img.alt='';img.loading='lazy';holder.append(img);}
    else holder.append(el('span','purpose-art purpose-placeholder',(app.name||'?').charAt(0)));
    const detail=el('div','purpose-mini-copy');
    const name=el('strong','',app.name||'App');name.dir='auto';detail.append(name);
    const price=el('span','',priceLabel(app));price.dir='auto';detail.append(price);
    holder.append(detail);
    const link=trustedUrl(app.appStoreUrl,'store');
    if(link){const a=el('a','purpose-mini-link','↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',t('viewApp')+': '+app.name);markMeasurementLink(a,app);holder.append(a);}
    return holder;
  }
  function renderPurpose(apps) {
    $('purpose-count').textContent=model.loading?'—':String(apps.length);
    const preview=$('purpose-preview');const frag=document.createDocumentFragment();
    if(model.loading) frag.append(el('p','section-note',t('loading')));
    else if(!apps.length) frag.append(el('p','purpose-empty',t('noMatch')));
    else apps.slice(0,2).forEach(a=>frag.append(miniCard(a)));
    preview.replaceChildren(frag);
    document.querySelectorAll('[data-purpose-price]').forEach(b=>{
      b.disabled=b.dataset.purposePrice!=='all' && !priceVerified();
      b.setAttribute('aria-pressed',b.dataset.purposePrice===model.filter?'true':'false');
    });
    $('purpose-search').value=$('search').value;
  }
  function renderPurposeCategories(categories) {
    const container=$('purpose-categories');
    const options=[['all',t('all'),model.apps.length],...Array.from(categories)
      .sort((a,b)=>a[0].localeCompare(b[0],i18n.locale))
      .map(([name,count])=>[name,name,count])];
    const frag=document.createDocumentFragment();
    options.forEach(([value,label,count])=>{
      const b=el('button','',label);b.type='button';b.dataset.purposeCategory=value;
      b.setAttribute('aria-pressed',String(value===model.category));
      b.append(el('span','cat-total',count));
      b.addEventListener('click',()=>{model.category=value;renderCategories();render();});
      frag.append(b);
    });
    container.replaceChildren(frag);container.setAttribute('aria-label',t('lpCategories'));
  }
  function renderCategories() {
    const target=$('category-filters');
    const categories=new Map();
    model.apps.forEach(a=>categories.set(categoryKey(a),(categories.get(categoryKey(a))||0)+1));
    if(model.category!=='all'&&!categories.has(model.category)) model.category='all';
    const options=[['all',t('all'),model.apps.length],...Array.from(categories).sort((a,b)=>a[0].localeCompare(b[0],i18n.locale))
      .map(([name,count])=>[name,name,count])];
    const frag=document.createDocumentFragment();
    for (const [value,label,count] of options) {
      const button=el('button','',label);button.type='button';button.dataset.category=value;
      button.setAttribute('aria-pressed',value===model.category?'true':'false');
      button.append(el('span','cat-total',count));
      button.addEventListener('click',()=>{model.category=value;renderCategories();render();});frag.append(button);
    }
    target.replaceChildren(frag);target.setAttribute('aria-label',t('lpCategories'));
    renderPurposeCategories(categories);
  }
  function pickApp(advance=false) {
    const candidates=model.apps;
    const target=$('pick-content');
    if (!candidates.length){target.replaceChildren(el('p','section-note',t('fetchFailed')));return;}
    let selected=candidates.find(a=>a.id===model.pickId);
    if (!selected || advance) {
      const options=candidates.filter(a=>a.id!==model.pickId);
      if (advance) selected=options.length ? options[Math.floor(Math.random()*options.length)] : candidates[0];
      else { const day=Math.floor(Date.now()/86400000);const countryHash=Array.from(model.country).reduce((s,c)=>s+c.charCodeAt(0),0);
        selected=candidates[(day+countryHash)%candidates.length]; }
      model.pickId=selected.id;
    }
    target.replaceChildren(card(selected));
  }
  function renderLowestPaid() {
    const list=$('paid-apps'), floor=$('paid-floor'), note=$('paid-status');
    const verified=model.catalogReady&&!model.fallbackUS&&!model.stale;
    const candidates=verified ? model.apps.filter(a=>Number.isFinite(a.price)&&a.price>0&&/^[A-Z]{3}$/.test(a.currency||'')) : [];
    const collator=new Intl.Collator(i18n.locale,{sensitivity:'base'});
    candidates.sort((a,b)=>a.price-b.price || collator.compare(a.name||'',b.name||''));
    const selected=candidates.slice(0,4);
    floor.textContent=selected.length ? priceLabel(selected[0]) : '—';
    floor.dir='ltr';
    const frag=document.createDocumentFragment();
    selected.forEach(a=>frag.append(card(a)));
    list.replaceChildren(frag);
    note.classList.toggle('warning',!verified);
    note.textContent=!verified ? (model.loading?t('loading'):(model.fallbackUS?t('referenceOnly'):t('stale')))
      : !selected.length ? t('noMatch') : t('catalogNote');
  }
  function renderHighlights() {
    const list=$('free-apps'), count=$('free-total'), note=$('free-status');
    const verified=model.catalogReady&&!model.fallbackUS&&!model.stale;
    const free=verified ? model.apps.filter(a=>a.price===0) : [];
    count.textContent=verified ? String(free.length) : '—';
    const frag=document.createDocumentFragment();
    free.forEach(a=>frag.append(card(a)));
    list.replaceChildren(frag);
    note.classList.toggle('warning',!verified);
    if(!verified) note.textContent=model.loading?t('loading'):(model.fallbackUS?t('referenceOnly'):t('stale'));
    else if(!free.length) note.textContent=t('noMatch');
    else note.textContent=t('catalogNote');
    pickApp();
  }
  function statusUpdate(count) {
    if (model.loading) { status.textContent=t('loading');return; }
    if (model.statusType==='unsynced') { status.textContent=t('fetchFailed')+' ('+regionName()+') · US App Store · '+t('referenceOnly');return; }
    if (model.statusType==='failed') { status.textContent=t('fetchFailed')+' · US App Store · '+t('referenceOnly');return; }
    if (count===0) { status.textContent=t('noMatch');return; }
    status.textContent=t('shown',{count})+' · '+t('catalogNote')+(model.stale?' '+t('stale'):'');
  }
  function render() {
    let apps=model.apps.filter(matchesChoices);
    let collator;try{collator=new Intl.Collator(i18n.locale,{sensitivity:'base'});}catch(_){collator=new Intl.Collator('en-US');}
    apps=apps.slice().sort(model.sort==='name'
      ? (a,b)=>collator.compare(a.name,b.name)
      : (a,b)=>((a.price??Infinity)-(b.price??Infinity)) || collator.compare(a.name,b.name));
    const area=$('apps');const frag=document.createDocumentFragment();
    apps.forEach(app=>frag.append(card(app)));area.replaceChildren(frag);
    statusUpdate(apps.length);
    renderPurpose(apps);
  }
  function paint() {
    $('app-count').textContent=model.catalogReady?String(model.apps.length):'—';
    $('free-count').textContent=model.catalogReady && !model.stale ? String(model.apps.filter(a=>a.price===0).length):'—';
    if (model.checkedUTC) { try{$('checked-at').textContent=new Intl.DateTimeFormat(i18n.locale,{timeZone:'UTC',dateStyle:'medium',timeStyle:'short'}).format(new Date(model.checkedUTC))+' UTC';}
      catch(_){$('checked-at').textContent=model.checkedUTC;} }
    else $('checked-at').textContent='—';
    $('storefront-eyebrow').textContent='APP STORE · '+regionName().toLocaleUpperCase(i18n.locale);
    $('developer-link').href='https://apps.apple.com/'+model.country+'/developer/makoto-fukuoka/id'+DEVELOPER_ID;
    const footer=document.querySelector('footer [data-i18n="footer"]');
    if(footer)footer.textContent=t('footer',{region:regionName()});
    $('description-source').hidden=!model.catalogReady || model.fallbackUS;
    if (!priceVerified() && model.filter !== 'all') model.filter='all';
    document.querySelectorAll('[data-filter]').forEach(b=>{b.disabled=!priceVerified() && b.dataset.filter!=='all';b.setAttribute('aria-pressed', b.dataset.filter===model.filter?'true':'false');});
    status.classList.toggle('warning',model.stale || model.statusType!=='ok');
    renderCategories();renderHighlights();renderLowestPaid();render();
  }
  async function readJson(path) { const r=await fetch(path,{cache:'no-store'});if (!r.ok) throw Error('HTTP '+r.status);return r.json(); }
  function verifyBase(data) {
    if (!data || data.status!=='ok' || data.country!=='us' || data.currency!=='USD' || data.developerId!==DEVELOPER_ID || !Array.isArray(data.apps)) throw Error('Invalid US catalog');
    const ids=data.apps.map(a=>a.id);
    if (!ids.length || ids.some(id=>!Number.isSafeInteger(id)) || new Set(ids).size!==ids.length)throw Error('Invalid US ids');
    return data;
  }
  function verifyRegion(data,country) {
    if (!data || data.schemaVersion!==1 || data.status!=='ok' || data.country!==country || data.developerId!==DEVELOPER_ID || !Array.isArray(data.apps) || !Array.isArray(data.baselineIds))throw Error('Invalid regional snapshot');
    const baseIds=model.base.apps.map(a=>a.id).sort((a,b)=>a-b);
    if (JSON.stringify(baseIds)!==JSON.stringify(data.baselineIds))throw Error('US catalog changed; refresh region');
    const allowed=new Set(baseIds);
    const seen=new Set();
    for(const app of data.apps){if(!Number.isSafeInteger(app.id) || !allowed.has(app.id) || seen.has(app.id) || typeof app.name!=='string' || !/^[A-Z]{3}$/.test(app.currency || '') || (app.price!==null && !Number.isFinite(app.price)))throw Error('Invalid app in snapshot');seen.add(app.id);}
    return data;
  }
  function isStale(iso) { const millis=Date.parse(iso||'');return !Number.isFinite(millis) || Date.now()-millis>48*3600*1000 || millis>Date.now()+5*60*1000; }
  async function fetchLiveStorefront(country) {
    // Lookup uses public product IDs only. Never pass language, device IDs, user IDs, UTM, or history.
    const cached=liveSnapshots.get(country);
    if(cached && Date.now()-cached.stamp<LIVE_CACHE_MS)return cached.data;
    const ids=model.base.apps.map(a=>a.id);
    const url=new URL(APPLE_LOOKUP_HOST);
    url.searchParams.set('country',country);url.searchParams.set('entity','software');url.searchParams.set('id',ids.join(','));
    const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),12000);
    let raw;
    try {
      const response=await fetch(url.href,{mode:'cors',credentials:'omit',cache:'no-store',signal:ctl.signal});
      if(!response.ok)throw Error('APPLE_HTTP_'+response.status);
      raw=await response.json();
    } finally {clearTimeout(timer);}
    if(!raw || !Array.isArray(raw.results) || raw.results.length>ids.length || raw.resultCount!==raw.results.length)
      throw Error('INVALID_LOOKUP_RESPONSE');
    const baseline=new Map(model.base.apps.map(a=>[a.id,a]));
    const seen=new Set();const results=[];let rejected=0;
    for(const item of raw.results) {
      const id=item.trackId;
      if(!Number.isSafeInteger(id) || !baseline.has(id) || seen.has(id) || item.artistId!==DEVELOPER_ID ||
          item.kind!=='software' || !/^[A-Z]{3}$/.test(item.currency||'') ||
          !Number.isFinite(item.price) || item.price<0) {rejected++;continue;}
      // A returned ID/price does not prove this territory: validate the actual Apple store link.
      let link;try{link=new URL(item.trackViewUrl);}catch(_){rejected++;continue;}
      if(link.protocol!=='https:' || link.hostname!=='apps.apple.com' || link.username || link.password || link.port ||
         !link.pathname.startsWith('/'+country+'/') || !new RegExp('/id'+id+'(?:[/?#]|$)').test(link.pathname)){
        rejected++;continue;
      }
      seen.add(id);
      // Never borrow a US price, nor trust a potentially mismatched URL from a response.
      const base=baseline.get(id);
      results.push({...base,price:item.price,currency:item.currency,formattedPrice:typeof item.formattedPrice==='string'?item.formattedPrice:'',
        appStoreUrl:'https://apps.apple.com/'+country+'/app/id'+id});
    }
    // Reject suspicious partial responses, not only network errors.
    if(rejected)throw Error('UNTRUSTED_LOOKUP_ROWS');
    const data={apps:results,lastCheckedUTC:new Date().toISOString(),country,live:true,listedCount:results.length};
    liveSnapshots.set(country,{stamp:Date.now(),data});
    return data;
  }
  async function refreshLocale() {
    const serial=++requestSerial;
    // Never display an old region's prices while a new country is loading.
    model.loading=true;model.statusType='loading';model.stale=true;model.catalogReady=false;model.apps=[];model.checkedUTC=null;paint();
    try {
      if(!model.base)model.base=verifyBase(await readJson('./data/apps.json'));
      if(!mappings){const config=await readJson('./data/locale-storefronts.json');
        if(config.schemaVersion!==1 || config.developerId!==DEVELOPER_ID || Object.keys(config.storefrontByLocale||{}).length!==50)throw Error('Bad locale map');
        mappings=config.storefrontByLocale;
        availableCountries=[...new Set(['us',...Object.values(mappings)])].filter(c=>/^[a-z]{2}$/.test(c));
        if(manualCountry&&!availableCountries.includes(manualCountry))manualCountry=null;
      }
      // Translation bundle is non-critical to price fetch: English fallback remains safe.
      try { await loadStoreUi(); } catch(e) { console.warn('Storefront UI translations unavailable:',e.message); }
      if(serial!==requestSerial)return;
      const locale=i18n.locale;
      const suggested=mappings[locale];
      if(!/^[a-z]{2}$/.test(suggested||''))throw Error('Missing storefront country');
      const localeChanged=locale!==lastLocale;
      const previousCountry=model.country;
      // Ambiguous bare locale codes require an explicit choice on first use.
      const ambiguous=ambiguousLocales.has(locale) && !manualCountry;
      if(manualCountry)model.country=manualCountry;
      else if(ambiguous && lastLocale===null)model.country='us';
      else if(ambiguous && localeChanged && lastLocale!==null)model.country=previousCountry;
      else if(!ambiguous)model.country=suggested;
      lastLocale=locale;
      if(model.country!==previousCountry){model.pickId=null;model.category='all';}
      updateStoreSelector();
      if(localeChanged && !manualCountry)showStoreMessage(ambiguous?'choose':'auto');
      if(serial!==requestSerial)return;
      let data=null,liveError=null;
      try{data=await fetchLiveStorefront(model.country);}catch(e){liveError=e;}
      if(serial!==requestSerial)return;
      if(!data || data.listedCount===0) {
        // Same-country verified JSON only; no cross-country prices.
        try {
          if(model.country==='us')data=model.base;
          else { const cached=snapshots.get(model.country);
            data=cached?verifyRegion(cached,model.country):verifyRegion(await readJson('./data/storefronts/'+model.country+'.json'),model.country);
            snapshots.set(model.country,data);
          }
          if(isStale(data.lastCheckedUTC))data=null;
        } catch(_){data=null;}
      }
      if(serial!==requestSerial)return;
      await loadAscMetadata();
      if(serial!==requestSerial)return;
      if(data && data.apps?.length){
        model.apps=data.apps.map(a=>withReleasedTranslation(a,locale));model.stale=isStale(data.lastCheckedUTC);
        model.checkedUTC=data.lastCheckedUTC;model.catalogReady=true;model.statusType='ok';model.fallbackUS=false;
        if(data.live && data.listedCount<model.base.apps.length)showStoreMessage('partial');
        else if(liveError)showStoreMessage('offline');
      } else {
        model.apps=model.base.apps.map(a=>withReleasedTranslation({...a,price:null,formattedPrice:'',currency:'',
          appStoreUrl:a.appStoreUrl},locale));
        model.catalogReady=false;model.fallbackUS=true;model.stale=true;model.checkedUTC=null;
        model.filter='all';model.statusType='unsynced';showStoreMessage('unlisted');
      }
    } catch(e) {
      if(serial!==requestSerial)return;
      model.apps=model.base?model.base.apps.map(a=>withReleasedTranslation({...a,price:null,formattedPrice:'',currency:'',
        appStoreUrl:a.appStoreUrl},i18n.locale)):[];
      model.catalogReady=false;model.fallbackUS=true;model.stale=true;model.checkedUTC=null;
      model.filter='all';model.statusType='failed';showStoreMessage('offline');
      console.warn('Storefront lookup failed:',e);
    } finally {if(serial===requestSerial){model.loading=false;updateStoreSelector();paint();}}
  }
  $('search').addEventListener('input',e=>{model.query=e.target.value.trim().toLocaleLowerCase();$('purpose-search').value=e.target.value;render();});
  $('purpose-search').addEventListener('input',e=>{
    $('search').value=e.target.value;
    model.query=e.target.value.trim().toLocaleLowerCase();render();
  });
  document.querySelectorAll('[data-purpose-price]').forEach(b=>b.addEventListener('click',()=>{
    if(b.disabled)return;
    model.filter=b.dataset.purposePrice;render();
    document.querySelectorAll('[data-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other.dataset.filter===model.filter)));
  }));
  $('purpose-reset').addEventListener('click',()=>{
    model.category='all';model.filter='all';model.query='';$('search').value='';$('purpose-search').value='';
    renderCategories();render();document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all')));
  });
  $('sort').addEventListener('change',e=>{model.sort=e.target.value;render();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    model.filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b===button?'true':'false'));
    render();
  }));
  $('pick-button').addEventListener('click',()=>pickApp(true));
  initStoreControls();
  document.addEventListener('tsz-locale-changed',()=>{model.category='all';void refreshLocale();});
  void refreshLocale();
})();
