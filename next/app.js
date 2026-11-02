(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const i18n = window.TSZ_I18N;
  const t = (key, vars) => i18n ? i18n.t(key, vars) : key;
  const DEVELOPER_ID = 1817908735;
  const model = { base: null, apps: [], country: 'us', filter: 'all', query: '', sort: 'price', stale: true,
    catalogReady: false, loading: true, priceLoading: false, statusType: 'loading', checkedUTC: null, fallbackUS: false, category: 'all', pickId: null };
  // Storefront selection and interface language are independent.
  // Only a manually chosen region is persisted; no user or device identifier is transmitted.
  const STORE_KEY='tsz-next-storefront-manual-v1';
  let manualCountry=null;
  try { const saved=localStorage.getItem(STORE_KEY); if(/^[a-z]{2}$/.test(saved||'')) manualCountry=saved; } catch(_){}
  let availableCountries=[];
  let lastLocale=null;
  let storeMessage='';
  let lastPublishedStorefront=null;
  // No cross-visit or in-tab price cache: price offers must come from a fresh lookup.
  const PRICE_MAX_AGE_MS=5*60*1000;
  let lastPriceFetchStarted=0;
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
    if (!priceVerified() || !Number.isFinite(app.price) || !/^[A-Z]{3}$/.test(app.currency || '')) return t('checkPrice');
    if (app.price === 0) return t('freePrice');
    // Format the verified numeric amount and ISO currency ourselves. The upstream
    // formattedPrice is not authoritative (it could contradict price/currency).
    let amount;
    try { amount = new Intl.NumberFormat(i18n.locale || 'en-US',
      {style:'currency',currency:app.currency,currencyDisplay:'symbol'}).format(app.price); }
    catch (_) { return t('checkPrice'); }
    // ¥ and $ are shared by multiple currencies: keep the ISO currency explicit.
    return String(amount).toUpperCase().includes(app.currency) ? String(amount) : app.currency + ' ' + amount;
  }
  // Public App Store product IDs only. Keep data off the query string and never infer a discount from a paid price.
  function markMeasurementLink(anchor, app) {
    if (!Number.isSafeInteger(app.id) || !/^\d{8,12}$/.test(String(app.id))) return;
    anchor.dataset.tszAppId = String(app.id);
    anchor.dataset.tszAppSlug = 'app_' + String(app.id); // stable across locale and storefront
    anchor.dataset.tszOfferType = priceVerified() && app.price === 0 ? 'free' : 'unknown';
    // The price shown on this LP, NOT the App Store checkout/purchase price.
    // Only annotate verified same-storefront display data; never infer from text/US fallback.
    const checked=Date.parse(model.checkedUTC||'');
    const age=Date.now()-checked;
    if (priceVerified() && /^[a-z]{2}$/.test(model.country) &&
        Number.isFinite(checked) && age>=-5*60*1000 && age<=PRICE_MAX_AGE_MS &&
        Number.isFinite(app.price) && app.price>=0 && app.price<=999999 &&
        /^\d{1,6}(?:\.\d{1,4})?$/.test(String(app.price)) &&
        /^[A-Z]{3}$/.test(app.currency||'')) {
      anchor.dataset.tszShownPrice=String(app.price);
      anchor.dataset.tszShownCurrency=app.currency;
      anchor.dataset.tszShownStorefront=model.country.toUpperCase();
      anchor.dataset.tszShownPriceCheckedUtc=new Date(checked).toISOString();
    }
  }
  function card(app) {
    const article = el('article', 'app-card');
    const top = el('div', 'app-top');
    const art = trustedUrl(app.artworkUrl,'art');
    if (art) { const img=el('img','app-art');img.src=art;img.alt=app.name || 'App';img.loading='lazy';top.append(img); }
    else top.append(el('div','app-art app-art-placeholder',(app.name || '?').charAt(0)));
    const p=el('span','price'+(!priceVerified() || app.price === null ? ' unknown':''),priceLabel(app));p.dir='auto';top.append(p);
    const category=el('div','category',app.category || 'App');category.dir='auto';
    const title=el('h3','app-title',app.name || 'App');title.dir='auto';
    const subtitle=app.subtitle ? el('p','app-subtitle',app.subtitle) : null;
    if(subtitle){subtitle.dir='auto';subtitle.style.cssText='margin:-7px 0 0;font-size:12px;color:#b5babb;line-height:1.45;overflow-wrap:anywhere';}
    const description=(window.TSZ_FULL_DESCRIPTION && window.TSZ_FULL_DESCRIPTION.create(app,i18n?.locale)) || el('p','app-description',String(app.description || '').replace(/\s+/g,' ').trim() || t('viewApp'));
    description.dir='auto';
    const bottom=el('div','app-footer');bottom.append(el('span','',model.fallbackUS ? 'US App Store · Reference' : regionName() + ' App Store'));
    const link=trustedUrl(app.appStoreUrl,'store');
    if (link) { const a=el('a','',t('viewApp')+' ↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',t('viewApp')+': '+app.name);markMeasurementLink(a,app);bottom.append(a); }
    article.append(top,category,title);if(subtitle)article.append(subtitle);article.append(description,bottom);return article;
  }
  function categoryKey(app) { return String(app.category || 'App').trim() || 'App'; }
  function priceVerified() { return model.catalogReady && !model.fallbackUS && !model.stale && !isStale(model.checkedUTC); }
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
    if (!candidates.length){target.replaceChildren(el('p','section-note',model.loading ? t('loading') : t('noMatch')));return;}
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
  // P19-7R3: a failed or pending live price lookup must never leave an empty
  // decorative shelf that looks like missing products. This is NOT a FREE claim.
  function showUnverifiedShelf(target) {
    const panel=el('div','tsz-price-unverified');
    panel.setAttribute('role','status');
    const head=el('strong','tsz-price-unverified-head',model.priceLoading?t('checkPrice'):t('stale'));
    const summary=el('p','tsz-price-unverified-note',
      t('shown',{count:model.apps.length})+' · '+t('catalogNote'));
    const link=el('a','tsz-price-unverified-action',t('explore')+' ↗');
    link.href='#catalog';
    panel.append(head,summary,link);target.replaceChildren(panel);
  }
  // P19-8E: verified storefront price tiers only; no background DOM observer.
  // Price values are NEVER cached here across refreshes or storefront changes.
  const paidMoreLabels={
    'ar-SA':'عرض المزيد','bn-BD':'আরও দেখুন','ca':'Mostra’n més','cs':'Zobrazit více','da':'Vis flere',
    'de-DE':'Mehr anzeigen','el':'Εμφάνιση περισσότερων','en-AU':'Show more','en-CA':'Show more',
    'en-GB':'Show more','en-US':'Show more','es-ES':'Ver más','es-MX':'Ver más','fi':'Näytä lisää',
    'fr-CA':'Voir plus','fr-FR':'Voir plus','gu-IN':'વધુ જુઓ','he':'הצג עוד','hi':'और देखें',
    'hr':'Prikaži više','hu':'Több megjelenítése','id':'Tampilkan lainnya','it':'Mostra altro',
    'ja':'さらに表示','kn-IN':'ಇನ್ನಷ್ಟು ನೋಡಿ','ko':'더 보기','ml-IN':'കൂടുതൽ കാണുക',
    'mr-IN':'आणखी पहा','ms':'Lihat lagi','nl-NL':'Meer tonen','no':'Vis mer',
    'or-IN':'ଅଧିକ ଦେଖନ୍ତୁ','pa-IN':'ਹੋਰ ਵੇਖੋ','pl':'Pokaż więcej','pt-BR':'Ver mais',
    'pt-PT':'Ver mais','ro':'Afișează mai multe','ru':'Показать ещё','sk':'Zobraziť viac',
    'sl-SI':'Prikaži več','sv':'Visa fler','ta-IN':'மேலும் காட்டு','te-IN':'మరిన్ని చూడండి',
    'th':'ดูเพิ่มเติม','tr':'Daha fazla göster','uk':'Показати більше','ur-PK':'مزید دیکھیں',
    'vi':'Xem thêm','zh-Hans':'显示更多','zh-Hant':'顯示更多'
  };
  // P19-8E3: 50-localized descending price order, independent of price data.
  const highToLowLabels={"ar-SA":"السعر: من الأعلى إلى الأقل","bn-BD":"দাম: বেশি থেকে কম","ca":"Preu: de més alt a més baix","cs":"Cena: od nejvyšší","da":"Pris: høj til lav","de-DE":"Preis: hoch bis niedrig","el":"Τιμή: από υψηλή σε χαμηλή","en-AU":"Price: high to low","en-CA":"Price: high to low","en-GB":"Price: high to low","en-US":"Price: high to low","es-ES":"Precio: de mayor a menor","es-MX":"Precio: de mayor a menor","fi":"Hinta: korkein ensin","fr-CA":"Prix : du plus élevé au plus bas","fr-FR":"Prix : du plus élevé au plus bas","gu-IN":"કિંમત: ઊંચીથી નીચી","he":"מחיר: מהגבוה לנמוך","hi":"कीमत: अधिक से कम","hr":"Cijena: od više prema nižoj","hu":"Ár: csökkenő sorrendben","id":"Harga: tertinggi ke terendah","it":"Prezzo: dal più alto al più basso","ja":"価格：高い順","kn-IN":"ಬೆಲೆ: ಹೆಚ್ಚಿನದರಿಂದ ಕಡಿಮೆಗೆ","ko":"가격: 높은 순","ml-IN":"വില: ഉയർന്നതിൽ നിന്ന് താഴേക്ക്","mr-IN":"किंमत: जास्त ते कमी","ms":"Harga: tinggi ke rendah","nl-NL":"Prijs: hoog naar laag","no":"Pris: høyest først","or-IN":"ମୂଲ୍ୟ: ଅଧିକରୁ କମ୍","pa-IN":"ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ","pl":"Cena: od najwyższej","pt-BR":"Preço: do maior para o menor","pt-PT":"Preço: do mais alto para o mais baixo","ro":"Preț: de la mare la mic","ru":"Цена: по убыванию","sk":"Cena: od najvyššej","sl-SI":"Cena: od najvišje","sv":"Pris: högst först","ta-IN":"விலை: அதிகம் முதல் குறைவு","te-IN":"ధర: ఎక్కువ నుంచి తక్కువ","th":"ราคา: สูงไปต่ำ","tr":"Fiyat: yüksekten düşüğe","uk":"Ціна: від найвищої","ur-PK":"قیمت: زیادہ سے کم","vi":"Giá: từ cao xuống thấp","zh-Hans":"价格：从高到低","zh-Hant":"價格：由高至低"};
  const highToLowLabel=()=>highToLowLabels[i18n?.locale]||highToLowLabels['en-US'];
  function setDescendingOrderLabels(){
    // A descending-price claim is meaningful only while fresh prices exist.
    const label=priceVerified()?highToLowLabel():t('checkPrice');
    document.querySelectorAll('[data-tsz-high-to-low]').forEach(node=>{if(node.textContent!==label)node.textContent=label;});
    const sort=$('sort');
    if(sort){
      // Describe the selected sort mode, not a different (unselected) option.
      const selectedLabel=sort.selectedOptions?.[0]?.textContent?.trim() || label;
      if(sort.getAttribute('aria-label')!==selectedLabel)sort.setAttribute('aria-label',selectedLabel);
    }
  }
  const paidTierState={country:'',key:'all',visible:4};
  const paidTierKey=app=>app.currency+':'+String(app.price);
  function renderLowestPaid() {
    const list=$('paid-apps'), floor=$('paid-floor'), note=$('paid-status');
    const buttons=$('paid-tier-buttons'), count=$('paid-tier-count'), more=$('paid-tier-more');
    const verified=priceVerified();
    buttons.setAttribute('aria-label',highToLowLabel());
    $('paid-tier-explorer').setAttribute('aria-label',highToLowLabel());
    if(paidTierState.country!==model.country){
      paidTierState.country=model.country;paidTierState.key='all';paidTierState.visible=4;
    }
    const known=verified ? model.apps.filter(a=>Number.isFinite(a.price)&&a.price>=0&&/^[A-Z]{3}$/.test(a.currency||'')) : [];
    const partial=verified && known.length<model.base.apps.length;
    const candidates=known.filter(a=>a.price>0);
    const collator=new Intl.Collator(i18n.locale,{sensitivity:'base'});
    candidates.sort((a,b)=>b.price-a.price || collator.compare(a.name||'',b.name||''));
    const tiers=new Map();
    for(const app of candidates){const key=paidTierKey(app);
      if(!tiers.has(key))tiers.set(key,[]);tiers.get(key).push(app);
    }
    if(verified && paidTierState.key!=='all'&&!tiers.has(paidTierState.key)){
      paidTierState.key='all';paidTierState.visible=4;
    }
    const highestKnown=candidates[0]||null;
    floor.textContent=highestKnown ? priceLabel(highestKnown)+' ↓' : '—';
    floor.dir='auto';floor.disabled=!verified||!highestKnown;
    floor.setAttribute('aria-pressed',String(Boolean(highestKnown)&&paidTierState.key===paidTierKey(highestKnown)));
    floor.setAttribute('aria-label',highestKnown ? t('paid')+' · '+highToLowLabel()+' · '+priceLabel(highestKnown)+' · '+(partial?storefrontUiText('partial')+' · ':'')+t('explore') : t('checkPrice'));
    const chips=document.createDocumentFragment();
    if(verified&&candidates.length){
      const addChip=(key,label,quantity)=>{
        const b=el('button','tsz-paid-tier-chip',label);
        b.type='button';b.dataset.tier=key;
        b.setAttribute('aria-pressed',String(paidTierState.key===key));
        b.setAttribute('aria-label',label+' · '+t('shown',{count:quantity}));
        b.addEventListener('click',()=>{
          if(!priceVerified()) { if(!model.priceLoading) void refreshLocale(); return; }
          paidTierState.key=key!=='all'&&paidTierState.key===key?'all':key;paidTierState.visible=4;renderLowestPaid();
        });chips.append(b);
      };
      addChip('all',t('all'),candidates.length);
      for(const [key,apps] of tiers)addChip(key,priceLabel(apps[0])+' · '+apps.length,apps.length);
    }
    buttons.replaceChildren(chips);
    buttons.hidden=!verified||!candidates.length;
    const matches=paidTierState.key==='all'?candidates:(tiers.get(paidTierState.key)||[]);
    const visible=matches.slice(0,paidTierState.visible);
    const frag=document.createDocumentFragment();
    visible.forEach(a=>frag.append(card(a)));
    if(verified)list.replaceChildren(frag);
    else showUnverifiedShelf(list);
    count.textContent=verified ? t('shown',{count:visible.length})+' / '+matches.length:t('checkPrice');
    const remaining=matches.length-visible.length;
    more.hidden=!verified||remaining<=0;
    if(!more.hidden){more.textContent='＋ '+(paidMoreLabels[i18n.locale]||paidMoreLabels['en-US'])+' ('+remaining+')';
      more.setAttribute('aria-label',more.textContent);}
    note.classList.toggle('warning',!verified);
    note.textContent=!verified ? (model.priceLoading?t('checkPrice'):(model.fallbackUS?t('referenceOnly'):t('stale')))
      : (partial ? storefrontUiText('partial')+' ('+known.length+'/'+model.base.apps.length+') · ' : '')+
        (!candidates.length ? t('noMatch') : t('catalogNote'));
  }
  function renderHighlights() {
    const list=$('free-apps'), count=$('free-total'), note=$('free-status');
    const verified=priceVerified();
    const known=verified ? model.apps.filter(a=>Number.isFinite(a.price)&&a.price>=0&&/^[A-Z]{3}$/.test(a.currency||'')) : [];
    const partial=verified && known.length<model.base.apps.length;
    const free=verified ? known.filter(a=>a.price===0) : [];
    // A partially confirmed catalog cannot assert an overall free count of zero.
    count.textContent=verified ? (partial ? (free.length ? String(free.length)+'+' : '—') : String(free.length)) : '—';
    const frag=document.createDocumentFragment();
    free.forEach(a=>frag.append(card(a)));
    if(verified)list.replaceChildren(frag);
    else showUnverifiedShelf(list);
    note.classList.toggle('warning',!verified);
    if(!verified) note.textContent=model.priceLoading?t('checkPrice'):(model.fallbackUS?t('referenceOnly'):t('stale'));
    else if(partial) note.textContent=storefrontUiText('partial')+' ('+known.length+'/'+model.base.apps.length+')'+
      (free.length ? ' · '+t('catalogNote') : '');
    else if(!free.length) note.textContent=t('noMatch');
    else note.textContent=t('catalogNote');
    pickApp();
  }
  function statusUpdate(count) {
    if (model.loading) { status.textContent=t('loading');return; }
    if (model.statusType==='checking') { status.textContent=t('shown',{count})+' · '+t('checkPrice');return; }
    if (model.statusType==='unsynced') { status.textContent=t('fetchFailed')+' ('+regionName()+') · US App Store · '+t('referenceOnly');return; }
    if (model.statusType==='price-unavailable') { status.textContent=t('shown',{count})+' · '+t('checkPrice')+' · '+t('stale');return; }
    if (model.statusType==='failed') { status.textContent=t('fetchFailed')+' · US App Store · '+t('referenceOnly');return; }
    if (count===0) { status.textContent=t('noMatch');return; }
    status.textContent=t('shown',{count})+' · '+t('catalogNote')+(model.stale?' '+t('stale'):'');
  }
  function render() {
    let apps=model.apps.filter(matchesChoices);
    let collator;try{collator=new Intl.Collator(i18n.locale,{sensitivity:'base'});}catch(_){collator=new Intl.Collator('en-US');}
    apps=apps.slice().sort(model.sort==='name'
      ? (a,b)=>collator.compare(a.name,b.name)
      : (a,b)=>((Number.isFinite(b.price)?b.price:-Infinity)-(Number.isFinite(a.price)?a.price:-Infinity)) || collator.compare(a.name,b.name));
    const area=$('apps');const frag=document.createDocumentFragment();
    apps.forEach(app=>frag.append(card(app)));area.replaceChildren(frag);
    statusUpdate(apps.length);
    renderPurpose(apps);
  }
  function paint() {
    setDescendingOrderLabels();
    $('app-count').textContent=!model.loading && model.base ? String(model.apps.length):'—';
    const knownFree=model.apps.filter(a=>Number.isFinite(a.price)&&a.price===0&&/^[A-Z]{3}$/.test(a.currency||''));
    const knownTotal=model.apps.filter(a=>Number.isFinite(a.price)&&a.price>=0&&/^[A-Z]{3}$/.test(a.currency||''));
    const partialFree=priceVerified() && model.base && knownTotal.length<model.base.apps.length;
    $('free-count').textContent=priceVerified() ? (partialFree ? (knownFree.length ? String(knownFree.length)+'+' : '—') : String(knownFree.length)):'—';
    if (model.checkedUTC) { try{$('checked-at').textContent=new Intl.DateTimeFormat(i18n.locale,{timeZone:'UTC',dateStyle:'medium',timeStyle:'short'}).format(new Date(model.checkedUTC))+' UTC';}
      catch(_){$('checked-at').textContent=model.checkedUTC;} }
    else $('checked-at').textContent='—';
    $('storefront-eyebrow').textContent='APP STORE · '+regionName().toLocaleUpperCase(i18n.locale);
    $('developer-link').href='https://apps.apple.com/'+model.country+'/developer/makoto-fukuoka/id'+DEVELOPER_ID;
    // Publish only when the selected storefront changes. Independent editorial
    // shelf listens once; this does not observe/replace the catalog DOM.
    if(lastPublishedStorefront!==model.country){
      lastPublishedStorefront=model.country;
      document.dispatchEvent(new CustomEvent('tsz-storefront-changed',{detail:{country:model.country}}));
    }
    const footer=document.querySelector('footer [data-i18n="footer"]');
    if(footer)footer.textContent=t('footer',{region:regionName()});
    $('description-source').hidden=!model.catalogReady || model.fallbackUS;
    if (!priceVerified() && model.filter !== 'all') model.filter='all';
    document.querySelectorAll('[data-filter]').forEach(b=>{b.disabled=!priceVerified() && b.dataset.filter!=='all';b.setAttribute('aria-pressed', b.dataset.filter===model.filter?'true':'false');});
    status.classList.toggle('warning',!priceVerified() || model.statusType!=='ok');
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
  function isStale(iso) { const millis=Date.parse(iso||'');return !Number.isFinite(millis) || Date.now()-millis>PRICE_MAX_AGE_MS || millis>Date.now()+60*1000; }
  async function fetchLiveStorefront(country) {
    // Lookup uses public product IDs only. Never pass language, device IDs, user IDs, UTM, or history.
    lastPriceFetchStarted=Date.now();
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
    if(!raw || !Array.isArray(raw.results) || raw.results.length>ids.length*2 || raw.resultCount!==raw.results.length)
      throw Error('INVALID_LOOKUP_RESPONSE');
    const baseline=new Map(model.base.apps.map(a=>[a.id,a]));
    const seen=new Set(), duplicates=new Set(), prices=new Map(), rejectionReasons={};
    function reject(reason) { rejectionReasons[reason]=(rejectionReasons[reason]||0)+1; }
    for(const item of raw.results) {
      if(!item || typeof item!=='object') {reject('bad_row');continue;}
      const id=item.trackId;
      if(!Number.isSafeInteger(id) || !baseline.has(id)) {reject('unknown_app');continue;}
      if(seen.has(id)) { // Ambiguous duplicate: quarantine BOTH copies of this ID.
        duplicates.add(id);prices.delete(id);reject('duplicate_id');continue;
      }
      seen.add(id);
      // An invalid row must not erase other apps' freshly verified prices.
      if(item.artistId!==DEVELOPER_ID || item.kind!=='software' ||
          !/^[A-Z]{3}$/.test(item.currency||'') ||
          !Number.isFinite(item.price) || item.price<0 || item.price>999999) {
        reject('invalid_identity_or_price');continue;
      }
      // A returned ID/price alone does not prove this territory: validate Apple's URL.
      let link;try{link=new URL(item.trackViewUrl);}catch(_){reject('invalid_url');continue;}
      if(link.protocol!=='https:' || link.hostname!=='apps.apple.com' || link.username || link.password || link.port ||
         !link.pathname.startsWith('/'+country+'/') || !new RegExp('/id'+id+'(?:[/?#]|$)').test(link.pathname)){
        reject('wrong_storefront_or_url');continue;
      }
      // Reject non-ISO currency codes that Intl cannot safely format. Apple
      // formattedPrice is informational only and never used to label a price.
      try { new Intl.NumberFormat('en-US',{style:'currency',currency:item.currency}).format(item.price); }
      catch (_) { reject('unsupported_currency'); continue; }
      prices.set(id,{price:item.price,currency:item.currency,formattedPrice:''});
    }
    // Mixed ISO currencies under one country make numeric ordering and formattedPrice
    // ambiguous (e.g. 'USD ¥50'). Fail closed instead of publishing a false floor.
    if(new Set([...prices.values()].map(row=>row.currency)).size>1){
      prices.clear();reject('mixed_currency_storefront');
    }
    const results=model.base.apps.map(base=>{
      const verified=duplicates.has(base.id)?null:prices.get(base.id);
      // Keep all catalog cards and trusted App Store destinations, but never invent
      // unknown prices or borrow them from a prior snapshot / another storefront.
      return {...base,...(verified||{price:null,currency:'',formattedPrice:''}),
        appStoreUrl:'https://apps.apple.com/'+country+'/app/id'+base.id};
    });
    const diagnostic={country,requested:ids.length,returned:raw.results.length,
      verified:prices.size,missing:ids.length-seen.size,rejected:rejectionReasons};
    // Aggregated public data only: no visitor identity or pricing payload logged.
    console.info('TSZ_PRICE_LOOKUP_SUMMARY',diagnostic);
    return {apps:results,lastCheckedUTC:new Date().toISOString(),country,live:true,
      listedCount:prices.size,requestedCount:ids.length,rejectedCount:Object.values(rejectionReasons).reduce((a,b)=>a+b,0)};
  }
  // P19-7: public catalog first. Live prices and large ASC translations must not gate cards.
  // The first paint uses trusted baseline IDs with UNKNOWN prices; it never calls them FREE.
  function catalogWithoutPrices(country, locale) {
    return model.base.apps.map(a => withReleasedTranslation({
      ...a, price:null, currency:'', formattedPrice:'',
      appStoreUrl:'https://apps.apple.com/'+country+'/app/id'+a.id
    },locale));
  }
  async function refreshLocale() {
    const serial=++requestSerial;
    model.loading=!model.base;
    model.priceLoading=true;
    model.statusType='loading';model.stale=true;model.catalogReady=false;
    model.checkedUTC=null;model.fallbackUS=false;
    // Erase old storefront price data immediately. Never retain old price badges while switching.
    model.apps=model.base ? catalogWithoutPrices(model.country,i18n.locale) : [];
    // An empty initial render previously showed a false "catalog read failed" message
    // and needlessly repainted every section before any local data could arrive.
    if(model.base)paint();
    else status.textContent=t('loading');
    try {
      // P19-7R2: catalog is the ONLY dependency of the first useful paint.
      if(!model.base){
        model.base=verifyBase(await readJson('./data/apps.json'));
        if(serial!==requestSerial)return;
        model.apps=catalogWithoutPrices(model.country,i18n.locale);
        model.loading=false;model.statusType='checking';model.catalogReady=false;
        paint(); // Before storefront map, Apple, ASC metadata, and extra locale data.
      }
      if(!mappings){const config=await readJson('./data/locale-storefronts.json');
        if(config.schemaVersion!==1 || config.developerId!==DEVELOPER_ID || Object.keys(config.storefrontByLocale||{}).length!==50)throw Error('Bad locale map');
        mappings=config.storefrontByLocale;
        availableCountries=[...new Set(['us',...Object.values(mappings)])].filter(c=>/^[a-z]{2}$/.test(c));
        if(manualCountry&&!availableCountries.includes(manualCountry))manualCountry=null;
      }
      if(serial!==requestSerial)return;
      const locale=i18n.locale;
      const suggested=mappings[locale];
      if(!/^[a-z]{2}$/.test(suggested||''))throw Error('Missing storefront country');
      const localeChanged=locale!==lastLocale;
      const previousCountry=model.country;
      const ambiguous=ambiguousLocales.has(locale) && !manualCountry;
      if(manualCountry)model.country=manualCountry;
      else if(ambiguous && lastLocale===null)model.country='us';
      else if(ambiguous && localeChanged && lastLocale!==null)model.country=previousCountry;
      else if(!ambiguous)model.country=suggested;
      lastLocale=locale;
      if(model.country!==previousCountry){model.pickId=null;model.category='all';}

      // FIRST USEFUL PAINT. All baseline apps, no speculative prices, no ASC 3MB wait.
      model.apps=catalogWithoutPrices(model.country,locale);
      model.loading=false;
      model.statusType='checking';
      model.catalogReady=false;model.fallbackUS=false;model.stale=true;
      updateStoreSelector();
      if(localeChanged && !manualCountry)showStoreMessage(ambiguous?'choose':'auto');
      paint();

      // Both optional datasets may finish later. They must not delay the catalog or prices.
      void loadStoreUi().then(()=>{if(serial===requestSerial){updateStoreSelector();
        const note=$('paid-status');
        const known=model.apps.filter(a=>Number.isFinite(a.price)&&a.price>=0&&/^[A-Z]{3}$/.test(a.currency||''));
        if(note && priceVerified() && known.length<model.base.apps.length)
          note.textContent=storefrontUiText('partial')+' ('+known.length+'/'+model.base.apps.length+') · '+t('catalogNote');
        // Translation arrival should not recreate cards and reset an open overview.
        const freeNote=$('free-status');
        if(freeNote && priceVerified() && known.length<model.base.apps.length)
          freeNote.textContent=storefrontUiText('partial')+' ('+known.length+'/'+model.base.apps.length+')'+
            (known.some(a=>a.price===0) ? ' · '+t('catalogNote') : '');
      }})
        .catch(e=>console.warn('Storefront UI translations unavailable:',e.message));
      void loadAscMetadata().then(()=>{
        if(serial!==requestSerial || !ascMetadata)return;
        model.apps=model.apps.map(a=>withReleasedTranslation(a,locale));
        paint();
      }).catch(e=>console.warn('ASC localizations unavailable:',e.message));

      let data=null,liveError=null;
      try { data=await fetchLiveStorefront(model.country); }
      catch(e) { liveError=e; }
      if(serial!==requestSerial)return;
      if(!data || data.listedCount===0)data=null;
      if(data && data.apps?.length){
        model.apps=data.apps.map(a=>withReleasedTranslation(a,locale));
        model.stale=isStale(data.lastCheckedUTC);
        model.checkedUTC=data.lastCheckedUTC;
        model.catalogReady=true;model.statusType='ok';model.fallbackUS=false;
        if(data.live && data.listedCount<model.base.apps.length)showStoreMessage('partial');
      } else {
        // Keep ALL baseline cards visible when Apple is slow, offline or returns no valid rows.
        model.apps=catalogWithoutPrices(model.country,locale);
        model.catalogReady=false;model.fallbackUS=false;model.stale=true;model.checkedUTC=null;
        model.filter='all';model.statusType='price-unavailable';showStoreMessage('offline');
        if(liveError)console.info('TSZ_PRICE_UNAVAILABLE',String(liveError.message||liveError));
      }
    } catch(e) {
      if(serial!==requestSerial)return;
      // Only a missing/invalid local catalog is allowed to leave the catalog empty.
      // Baseline success and optional map failure are different states. Do not erase
      // the local catalog or claim that it could not be read when 34 IDs are present.
      if(model.base){
        model.country='us';model.apps=catalogWithoutPrices('us',i18n.locale);
        model.statusType='price-unavailable';model.fallbackUS=true;
      } else {
        model.apps=[];model.statusType='failed';model.fallbackUS=true;
      }
      model.loading=false;model.catalogReady=false;
      model.stale=true;model.checkedUTC=null;model.filter='all';
      showStoreMessage('offline');
      console.warn('Local catalog or storefront configuration unavailable:',e);
    } finally {
      if(serial===requestSerial){model.loading=false;model.priceLoading=false;updateStoreSelector();paint();}
    }
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
  $('paid-floor').addEventListener('click',()=>{
    if(!priceVerified()) { if(!model.priceLoading) void refreshLocale(); return; }
    const priced=model.apps.filter(a=>Number.isFinite(a.price)&&a.price>0&&/^[A-Z]{3}$/.test(a.currency||''));
    priced.sort((a,b)=>b.price-a.price);
    if(!priced.length)return;
    const highest=paidTierKey(priced[0]);
    paidTierState.key=paidTierState.key===highest?'all':highest;
    paidTierState.visible=4;renderLowestPaid();
  });
  $('paid-tier-more').addEventListener('click',()=>{
    if(!priceVerified()) { if(!model.priceLoading) void refreshLocale(); return; }
    paidTierState.visible+=4;renderLowestPaid();
  });
  $('sort').addEventListener('change',e=>{model.sort=e.target.value;setDescendingOrderLabels();render();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    model.filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b===button?'true':'false'));
    render();
  }));
  $('pick-button').addEventListener('click',()=>pickApp(true));
  initStoreControls();
  document.addEventListener('tsz-locale-changed',()=>{model.category='all';void refreshLocale();});
  // Refresh on every navigation/load, on return to the tab, and while it remains open.
  // Browser/server/Apple upstream caches can still exist; these requests do not guarantee
  // that Apple has propagated a scheduled price change to every customer.
  function recheckVisiblePrice(force) {
    if(document.visibilityState==='hidden' || model.loading || model.priceLoading) return;
    if(Date.now()-lastPriceFetchStarted < (force?10000:PRICE_MAX_AGE_MS)) return;
    void refreshLocale();
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible')recheckVisiblePrice(true);
  });
  window.addEventListener('pageshow',event=>{
    if(event.persisted)recheckVisiblePrice(true);
  });
  window.setInterval(()=>recheckVisiblePrice(false),30000);
  void refreshLocale();
})();
