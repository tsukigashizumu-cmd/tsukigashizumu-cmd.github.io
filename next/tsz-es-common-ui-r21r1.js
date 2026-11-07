/* TSZ R39R6P21R1 — Spanish common-UI overlay, never gallery content.
 * Scoped to 17 approved detail pages, es-MX and es-ES only.
 * Does not mutate app assets, gallery state, links, or dynamic descriptions.
 */
(() => {
  'use strict';
  if (!/^\/next\/apps\/\d{10}\/?$/.test(location.pathname)) return;
  const choice = document.querySelector('#p199-language, #p19-language');
  const special = Boolean(document.body?.dataset.p19AppId === '6772130038');
  const terms = {
    'Skip to article': ['Ir al contenido','Saltar al contenido'],
    'Skip to overview': ['Ir al resumen','Ir al resumen'],
    'Language': ['Idioma','Idioma'],
    'App Store region': ['Región de App Store','Región de App Store'],
    'All apps': ['Todas las apps','Todas las aplicaciones'],
    'Meet the app': ['Conoce la app','Conoce la aplicación'],
    'See the app': ['Explora la app','Explora la aplicación'],
    'A closer look': ['Mírala de cerca','Descúbrela en detalle'],
    // R21R3: UI-only strings confirmed against the real app-story provider and Chrome captures.
    'The app in action': ['La app en acción','La aplicación en acción'],
    'This description is available in another language.': ['Esta descripción está disponible en otro idioma.','Esta descripción está disponible en otro idioma.'],
    'Explore other apps': ['Explorar otras apps','Explorar otras aplicaciones'],
    'You might also like': ['También te pueden gustar','También te pueden interesar'],
    'App screens': ['Pantallas de la app','Pantallas de la aplicación'],
    'App screenshot': ['Captura de la app','Captura de la aplicación'],
    'Image size': ['Tamaño de la imagen','Tamaño de la imagen'],
    'Previous image': ['Imagen anterior','Imagen anterior'],
    'Next image': ['Imagen siguiente','Imagen siguiente'],
    'Inspect screenshot': ['Ampliar captura','Ampliar captura'],
    'We couldn’t load this page. Please refresh or browse all apps.': ['No se pudo cargar esta página. Actualiza o explora todas las apps.','No se pudo cargar esta página. Actualiza o explora todas las aplicaciones.'],
    'Some fine details may appear soft when enlarged.': ['Al ampliar, algunos detalles pueden verse borrosos.','Al ampliar, algunos detalles pueden verse borrosos.'],
    'The app in action ↗': ['La app en acción ↗','La aplicación en acción ↗'],
    'Explore by category': ['Explorar por categoría','Explorar por categoría'],
    'App': ['App','Aplicación'],
    'About this app': ['Acerca de esta app','Sobre esta aplicación'],
    'Explore more apps': ['Descubre más apps','Descubre más aplicaciones'],
    'Back to catalog': ['Volver al catálogo','Volver al catálogo'],
    'Browse apps': ['Explorar apps','Explorar aplicaciones'],
    'Browse all apps': ['Explorar todas las apps','Explorar todas las aplicaciones'],
    'What is this app?': ['¿Qué es esta app?','¿Qué es esta aplicación?'],
    'ON THIS PAGE': ['EN ESTA PÁGINA','EN ESTA PÁGINA'],
    'APP STORIES': ['HISTORIAS DE APPS','HISTORIAS DE APLICACIONES'],
    'APP / APP STORE': ['APP / APP STORE','APLICACIÓN / APP STORE'],
    'Read the full description': ['Leer la descripción completa','Leer la descripción completa'],
    'For current pricing and availability, visit the App Store.': ['Consulta el precio y la disponibilidad actuales en App Store.','Consulta el precio y la disponibilidad actuales en App Store.'],
    'Preparing your app story…': ['Preparando la información de la app…','Preparando la información de la aplicación…'],
    'Discover more apps made with care.': ['Descubre más apps creadas con atención al detalle.','Descubre más aplicaciones creadas con atención al detalle.'],
    'Inspect screenshot ↗': ['Ver captura ↗','Ver captura ↗'],
    'Previous screenshot': ['Captura anterior','Captura anterior'],
    'Next screenshot': ['Captura siguiente','Captura siguiente'],
    'Screenshot viewer': ['Visor de capturas','Visor de capturas'],
    'Close': ['Cerrar','Cerrar'],
    'Fit': ['Ajustar','Ajustar'],
    'Actual pixels': ['Píxeles reales','Píxeles reales'],
    'Reading progress': ['Progreso de lectura','Progreso de lectura'],
    'Article chapters': ['Secciones del artículo','Secciones del artículo'],
    'Games': ['Juegos','Juegos'],
    'Utilities': ['Utilidades','Utilidades'],
    'Developer Tools': ['Herramientas para desarrolladores','Herramientas para desarrolladores'],
    'Graphics & Design': ['Diseño gráfico','Diseño gráfico'],
    'Productivity': ['Productividad','Productividad'],
    'Lifestyle': ['Estilo de vida','Estilo de vida'],
    'Shopping': ['Compras','Compras'],
    'Health & Fitness': ['Salud y bienestar','Salud y bienestar'],
    'Start reading': ['Empieza a leer','Empieza a leer'],
    'What it solves': ['Qué problema resuelve','Qué problema soluciona'],
    'What to expect': ['Qué esperar','Qué puedes esperar'],
    'Real app screens': ['Pantallas reales de la app','Capturas reales de la aplicación'],
    'How it works': ['Cómo funciona','Cómo funciona'],
    'When it helps': ['Cuándo te ayuda','Cuándo resulta útil'],
    'Why it was made': ['Por qué se creó','Por qué se creó'],
    'Full App Store description': ['Descripción completa en App Store','Descripción completa en App Store'],
    'Read the complete App Store listing': ['Leer la ficha completa de App Store','Leer la ficha completa de App Store'],
    'Keep exploring': ['Sigue explorando','Sigue explorando'],
    'Return to the catalog': ['Volver al catálogo','Volver al catálogo'],
    'Copy link': ['Copiar enlace','Copiar enlace'],
    'CHAPTER': ['CAPÍTULO','CAPÍTULO'],
    'CURRENT CHAPTER': ['CAPÍTULO ACTUAL','CAPÍTULO ACTUAL'],
    'EXPLORE THE PRODUCT': ['EXPLORA LA APP','EXPLORA LA APLICACIÓN'],
    'PUBLISHED SCREENS': ['CAPTURAS PUBLICADAS','CAPTURAS PUBLICADAS'],
    'SELECTED STOREFRONT': ['TIENDA SELECCIONADA','TIENDA SELECCIONADA'],
    'Checking availability': ['Consultando disponibilidad','Comprobando disponibilidad'],
    'Prices are confirmed on the App Store': ['Consulta los precios en App Store','Consulta los precios en App Store'],
    'THE IDEA': ['LA IDEA','LA IDEA'],
    'THE PROOF': ['LAS PRUEBAS','LAS PRUEBAS'],
    'THE DETAILS': ['LOS DETALLES','LOS DETALLES'],
    'EXPLORE THE APP': ['EXPLORA LA APP','EXPLORA LA APLICACIÓN'],
    'View in App Store': ['Ver en App Store','Ver en App Store'],
    'View in App Store ↗': ['Ver en App Store ↗','Ver en App Store ↗'],
    'Please confirm the current price and availability on the App Store for your selected region.': ['Consulta el precio y la disponibilidad en App Store para la región seleccionada.','Consulta el precio y la disponibilidad en App Store para la región seleccionada.'],
    'Loading the verified app description…': ['Cargando la descripción verificada de la app…','Cargando la descripción verificada de la aplicación…'],
    'SCOPE · NO AUTOMATIC AI ANSWER': ['ALCANCE · SIN RESPUESTA AUTOMÁTICA DE IA','ALCANCE · SIN RESPUESTA AUTOMÁTICA DE IA'],
    'PromptDock creates structured prompts you can copy and reuse. The final AI response is produced separately.': ['PromptDock crea instrucciones estructuradas que puedes copiar y reutilizar. La respuesta final de la IA se genera por separado.','PromptDock crea instrucciones estructuradas que puedes copiar y reutilizar. La respuesta final de la IA se genera por separado.'],
    'Choose a template, fill in the fields, and generate a reusable prompt. Copy it or open ChatGPT; saved prompts remain in history.': ['Elige una plantilla, completa los campos y genera una instrucción reutilizable. Cópiala o abre ChatGPT; el historial conserva las instrucciones guardadas.','Elige una plantilla, rellena los campos y genera una instrucción reutilizable. Cópiala o abre ChatGPT; el historial conserva las instrucciones guardadas.'],
    'App Store information may change. Check the current listing before downloading.': ['La información de App Store puede cambiar. Consulta la ficha actual antes de descargar.','La información de App Store puede cambiar. Consulta la ficha actual antes de descargar.'],
    'One clear purpose.': ['Un propósito claro.','Un propósito claro.'],
    'A SMALL TOOL. A BETTER FLOW.': ['UNA APP PEQUEÑA. UN MEJOR PROCESO.','UNA APLICACIÓN PEQUEÑA. UN MEJOR PROCESO.'],
    'SCREEN STUDY': ['GALERÍA DE CAPTURAS','GALERÍA DE CAPTURAS'],
    'Close image viewer': ['Cerrar visor de imágenes','Cerrar visor de imágenes'],
    'Zoom in': ['Acercar','Ampliar'],
    'Zoom out': ['Alejar','Reducir'],
    'Zoomable screenshot; scroll to inspect': ['Captura ampliable; desplázate para examinarla','Captura ampliable; desplázate para examinarla'],
    'Screenshot selection': ['Selección de capturas','Selección de capturas'],
    'Page chapters': ['Secciones de la página','Secciones de la página'],
    'Chapter overview': ['Resumen de capítulos','Resumen de capítulos'],
    'Chapter navigation progress': ['Progreso de capítulos','Progreso de capítulos'],
    'Current chapter': ['Capítulo actual','Capítulo actual'],
    'Product scope': ['Alcance del producto','Alcance del producto'],
    'App Store visual evidence': ['Imágenes publicadas en App Store','Imágenes publicadas en App Store'],
    'App Store screenshot gallery': ['Galería de capturas de App Store','Galería de capturas de App Store'],
    '見どころを、画面で。': ['Descubre la app en imágenes.','Descubre la aplicación en imágenes.'],
  };
  // Provider renders a category + App Store brand; localize only the category.
  for (const k of ['Games','Utilities','Developer Tools','Graphics & Design','Productivity','Lifestyle','Shopping','Health & Fitness','App']) {
    if (terms[k]) terms[k + ' / App Store'] = terms[k].map(v => v + ' / App Store');
  }
  // Some 50-locale providers already render localized Spanish before this overlay starts.
  // Recognize their existing values as well as English. Only the Spanish selectors activate us.
  const aliasToEnglish = new Map();
  for (const [english, variants] of Object.entries(terms)) {
    aliasToEnglish.set(english, english);
    for (const variant of variants) if (variant && !aliasToEnglish.has(variant)) aliasToEnglish.set(variant, english);
  }
  const staticSourceKeys = {
    'p199-language-label':'Language','p199-all':'All apps',
    'p199-eyebrow':'APP STORIES',
    'p199-about-head':'Meet the app','p199-screen-head':'The app in action',
    'p199-features-head':'A closer look','p199-full-head':'About this app',
    'p199-related-head':'Explore more apps','p199-full-toggle':'Read the full description',
    'p199-country-label':'App Store region','p199-related-caption':'You might also like',
    'p199-back':'Browse apps','p199-store':'View in App Store ↗',
    'p199-bottom-store':'View in App Store ↗','p199-price-note':'For current pricing and availability, visit the App Store.',
    'p199-hero-image-action':'Inspect screenshot ↗','p199-toc-head':'ON THIS PAGE',
    'p199-modal-close-label':'Close','p199-fit':'Fit','p199-actual':'Actual pixels',
    'p19-language-label':'Language','p19-all-apps':'All apps',
    'p19-overview-heading':'What it solves','p19-screens-heading':'Real app screens',
    'p19-workflow-heading':'How it works','p19-usecases-heading':'When it helps',
    'p19-story-heading':'Why it was made','p19-description-heading':'Full App Store description',
    'p19-related-heading':'Keep exploring','p19-limit-heading':'What to expect',
    'p19-contents-heading':'ON THIS PAGE',
    'p19-price-note':'Please confirm the current price and availability on the App Store for your selected region.',
    'p19-related-back':'Return to the catalog','p19-back-link':'Browse all apps',
    'p19-store-link':'View in App Store ↗','p19-bottom-store':'View in App Store',
    'p19-expectation-copy':'PromptDock creates structured prompts you can copy and reuse. The final AI response is produced separately.',
    'p196-start-link':'Start reading','p196-rail-label':'CHAPTER',
    'p196-dash-kicker':'EXPLORE THE PRODUCT',
    'p196-chapter-label':'CURRENT CHAPTER',
    'p196-media-label':'PUBLISHED SCREENS',
    'p196-storefront-label':'SELECTED STOREFRONT','p196-country-foot':'Prices are confirmed on the App Store',
    'p196-disclosure-title':'Read the complete App Store listing',
    'p193-stage-cta':'EXPLORE THE APP','p193-viewer-kicker':'SCREEN STUDY',
    'tsz-promptdock-heading':'見どころを、画面で。',
    'tsz-promptdock-safe-description':'Choose a template, fill in the fields, and generate a reusable prompt. Copy it or open ChatGPT; saved prompts remain in history.',
    'tsz-promptdock-safe-store':'View in App Store ↗',
    'tsz-promptdock-safe-catalog':'Browse all apps',
  };
  const staticIds = special ? [
    'p19-language-label','p19-all-apps','p19-overview-heading','p19-screens-heading','p19-workflow-heading',
    'p19-usecases-heading','p19-story-heading','p19-description-heading','p19-related-heading',
    'p19-limit-heading','p19-contents-heading','p19-price-note','p19-load','p19-related-back',
    'p19-back-link','p19-store-link','p19-bottom-store','p19-expectation-copy','p196-start-link',
    'p196-rail-label','p196-rail-name','p196-dash-kicker','p196-chapter-label','p196-active-name',
    'p196-media-label','p196-media-foot','p196-storefront-label','p196-country-foot',
    'p196-disclosure-title','p193-stage-cta','p193-viewer-kicker','tsz-promptdock-heading',
    'tsz-promptdock-safe-description','tsz-promptdock-safe-store','tsz-promptdock-safe-catalog',
  ] : [
    'p199-language-label','p199-all','p199-progress-name','p199-eyebrow','p199-category',
    'p199-about-head','p199-screen-head','p199-features-head','p199-full-head','p199-related-head',
    'p199-full-toggle','p199-back','p199-store','p199-bottom-store','p199-price-note',
    'p199-hero-image-action','p199-toc-head','p199-modal-close-label','p199-fit','p199-actual',
    'p199-status', 'p199-country-label','p199-related-caption','p199-fallback',
    'p199-image-count-label','p199-modal-quality','p199-image-fallback','p199-image-unavailable',
  ];
  const trackedText = new WeakMap();
  const trackedAttrs = new WeakMap();
  const trackedNodes = new Set();
  let lastAppliedLocale = null;
  let timer = null;
  let running = false;
  let observer = null;
  const localeNow = () => {
    const raw = String(choice?.value || new URLSearchParams(location.search).get('language') || '');
    return raw === 'es-MX' || raw === 'es-ES' ? raw : null;
  };
  function directTextNode(el) {
    return Array.from(el.childNodes).find(n => n.nodeType === 3 && n.nodeValue.trim()) || null;
  }
  function textValue(en, locale) {
    const row = terms[en];
    return row ? row[locale === 'es-MX' ? 0 : 1] : null;
  }
  function setText(el, locale, term) {
    if (!el) return;
    const node = directTextNode(el);
    if (!node) return;
    const observed = node.nodeValue.trim();
    let item = trackedText.get(node);
    const sourceKey = (term && terms[term] ? term : null) || aliasToEnglish.get(observed) || item?.sourceKey;
    if (!sourceKey || !terms[sourceKey]) return;
    const translated = textValue(sourceKey, locale);
    if (!item) {
      item = {original: node.nodeValue, sourceKey, current:null};
      trackedText.set(node,item);trackedNodes.add(node);
    } else if (aliasToEnglish.has(observed) && observed !== item.current && !term) {
      // Async provider replaced the label with an English or localized canonical phrase.
      item.original=node.nodeValue;item.sourceKey=aliasToEnglish.get(observed);
    }
    const output = textValue(item.sourceKey, locale);
    if (observed === output) {item.current=output;return;}
    // Do not overwrite unknown copy written later by the app itself.
    if(item.current && observed !== item.current && !aliasToEnglish.has(observed) && observed !== item.original.trim())return;
    const before = node.nodeValue.match(/^\s*/)?.[0] || '';
    const after = node.nodeValue.match(/\s*$/)?.[0] || '';
    node.nodeValue = before + output + after;
    item.current=output;
  }
  function setAttr(el, attr, locale) {
    if (!el || !el.hasAttribute(attr)) return;
    const existing=el.getAttribute(attr);
    let map=trackedAttrs.get(el);
    let item=map?.get(attr);
    const sourceKey=aliasToEnglish.get(existing) || item?.sourceKey;
    if(!sourceKey || !terms[sourceKey])return;
    if(!item){
      if(!map){map=new Map();trackedAttrs.set(el,map);trackedNodes.add(el);}
      item={original:existing,sourceKey,current:null};map.set(attr,item);
    } else if(aliasToEnglish.has(existing) && existing!==item.current){item.sourceKey=aliasToEnglish.get(existing);item.original=existing;}
    const value=textValue(item.sourceKey,locale);
    if(existing!==value){el.setAttribute(attr,value);item.current=value;}else item.current=value;
  }
  function restore() {
    for (const node of trackedNodes) {
      if (node.nodeType===3) {
        const item=trackedText.get(node);
        if (item && node.isConnected && node.nodeValue.trim() === item.current) {
          node.nodeValue=item.original;
        }
        if (item) item.current=null;
      } else {
        const map=trackedAttrs.get(node);
        if (map) for (const [name,item] of map) {
          if(node.isConnected && node.getAttribute(name)===item.current) node.setAttribute(name,item.original);
          item.current=null;
        }
      }
    }
    if (document.documentElement.lang==='es-MX'||document.documentElement.lang==='es-ES') document.documentElement.lang='en-US';
    lastAppliedLocale=null;
  }
  function translateLeaves(root, locale, allowed) {
    if (!root) return;
    const leaves = root.querySelectorAll('*');
    for (const el of leaves) {
      if (el.children.length || el.tagName==='SCRIPT' || el.tagName==='STYLE') continue;
      if (allowed && !allowed.has(el.textContent.trim()) && !aliasToEnglish.has(el.textContent.trim()) && !trackedText.has(directTextNode(el))) continue;
      setText(el,locale);
    }
  }
  const categories = new Set(['Games','Utilities','Developer Tools','Graphics & Design','Productivity','Lifestyle','Shopping','Health & Fitness']);
  const anchors = new Set(['Meet the app','See the app','The app in action','A closer look','About this app','Explore more apps',
    'What it solves','Real app screens','How it works','When it helps','Why it was made','Full App Store description','Keep exploring']);
  function apply() {
    if(running)return;
    running = true;
    try {
      const locale=localeNow();
      if(!locale){if(lastAppliedLocale)restore();return;}
      for(const id of staticIds)setText(document.getElementById(id),locale,staticSourceKeys[id]);
      const skip=document.querySelector('a.p19-skip');setText(skip,locale,special?'Skip to overview':'Skip to article');
      if (special) {
        for (const el of document.querySelectorAll('.p19-copy')) setText(el,locale);
        for (const sel of ['.p196-kicker','#p19-detail .p193-section-interlude > span','#p19-footer-home ~ span',
          '.p19-expectation-kicker','.p193-fallback-small','.p19-hero-fallback strong',
          '.p193-viewer-close span','#p196-reading-rail .p196-rail-name', '.p193-viewer-kicker']) {
          for (const el of document.querySelectorAll(sel)) setText(el,locale);
        }
      } else {
        setText(document.getElementById('p199-fallback'),locale);
        setText(document.querySelector('.p19-footer > span'),locale);
        translateLeaves(document.getElementById('p199-related-list'),locale,categories);
      }
      for(const sel of ['#p199-toc a','#p19-toc-links a']){
        for(const el of document.querySelectorAll(sel)){
          const n=directTextNode(el);if(n && (anchors.has(n.nodeValue.trim()) || aliasToEnglish.has(n.nodeValue.trim()) || trackedText.has(n))) setText(el,locale);
        }
      }
      for(const el of document.querySelectorAll('a.p19-secondary[href="../../#catalog"]'))setText(el,locale);
      const ariaSelectors = special ? [
        '.p19-skip','a.p19-brand','#p19-language','#p19-region','.p19-breadcrumb','#p196-reading-rail',
        '#p196-dashboard','#p196-progress-track','.p19-toc','#p19-hero-fallback','#p19-hero-art',
        '#p19-zoom-dialog','#p19-zoom-close','#p193-prev','#p193-next','#p193-zoom-minus',
        '#p193-zoom-plus','#p193-zoom-viewport','.p193-stage-dots',
      ] : [
        '.p19-skip','#p199-language','#p199-country','.p199-progress','.p199-toc',
        '#p199-dialog','#p199-slide-prev','#p199-slide-next',
      ];
      for(const selector of ariaSelectors)for(const el of document.querySelectorAll(selector))setAttr(el,'aria-label',locale);
      for(const el of document.querySelectorAll('.p19-copy,[aria-label="Screenshot viewer"],[aria-label="Close image viewer"]'))setAttr(el,'aria-label',locale);
      if(document.documentElement.lang !== locale)document.documentElement.lang=locale;
      lastAppliedLocale=locale;
    } finally {running=false;}
  }
  function schedule() {
    if(timer!==null)return;
    timer=setTimeout(()=>{timer=null;apply();},60);
  }
  function init() {
    apply();
    document.addEventListener('change',e=>{if(e.target?.matches?.('#p199-language,#p19-language')){schedule();setTimeout(schedule,180);setTimeout(schedule,700)}},true);
    for(const ev of ['tsz-locale-changed','popstate','pageshow'])addEventListener(ev,schedule);
    observer=new MutationObserver(schedule);
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    setTimeout(schedule,250);setTimeout(schedule,1100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
