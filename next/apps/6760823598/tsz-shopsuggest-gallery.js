/* P19-9R6R9R22R3: selection/focus visual fix; based on R22R2. independent Apple 3 screenshots + existing ShopSuggest video (identity confirmation required before apply).
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to ShopSuggest; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6760823598') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6760823598;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-shopsuggest-images.json?v=p19-r22r2';
  const COPY = {
    ja: [
      ['買うものを、ひとつの画面で。', 'App Store掲載のShopSuggest動画。店ごとのリストやチェック操作がどのように動くかをご覧ください。'],
      ['買う場所ごとに、整理する。', 'スーパーなど、行くお店に合わせてリストを分けられます。進み具合もひと目で確認。'],
      ['項目を開いて、ひとつずつ。', '買うものを一覧で確認。終わった項目と残った項目を見分けながら進められます。'],
      ['使い方も、見た目も自分らしく。', 'メニューから表示や操作を調整。文字・色・アイコンなどもカスタマイズできます。']
    ],
    en: [
      ['Your shopping lists in motion.', 'The ShopSuggest App Store preview shows store-based lists and the way checking off items works.'],
      ['A list for every store.', 'Keep shopping organized by destination and see progress at a glance.'],
      ['Open your list. Check things off.', 'Review what you need, distinguish completed items, and keep track of what remains.'],
      ['Make your lists yours.', 'Open the menu to adjust the view and controls. Customize text, colors, and icons.']
    ]
  };
  const LOCALIZED_CAPTION_COPY = {"de-DE":[["Einkaufslisten in Bewegung.","Im App-Store-Video von ShopSuggest siehst du Einkaufslisten nach Geschäften und wie Artikel abgehakt werden."],["Für jedes Geschäft eine eigene Liste.","Ordne deine Einkäufe nach dem jeweiligen Geschäft und sieh auf einen Blick, was bereits erledigt ist."],["Liste öffnen. Artikel abhaken.","Behalte benötigte und erledigte Artikel im Blick und erkenne, was noch auf der Liste steht."],["Passe deine Listen an.","Über das Menü kannst du Ansicht und Bedienung anpassen – etwa Texte, Farben und Symbole."]],"ar-SA":[["قوائم التسوق أثناء الاستخدام.","يعرض فيديو ShopSuggest في App Store قوائم التسوق حسب المتجر وكيفية وضع علامة على العناصر التي اشتريتها."],["قائمة مستقلة لكل متجر.","رتّب مشترياتك بحسب المتجر وتابع ما أنجزته بنظرة واحدة."],["افتح القائمة وحدّد ما اشتريته.","راجع العناصر المطلوبة وميّز ما اكتمل منها عمّا لا يزال متبقيًا."],["خصّص قوائمك كما تحب.","افتح القائمة لتعديل طريقة العرض والتحكّم، بما في ذلك النصوص والألوان والأيقونات."]],"es-MX":[["Tus listas de compras, en acción.","El video de ShopSuggest en App Store muestra listas por tienda y cómo marcar los artículos que ya compraste."],["Una lista para cada tienda.","Organiza tus compras según a dónde vas y revisa el avance de un vistazo."],["Abre la lista y marca lo que compraste.","Consulta lo que necesitas, distingue los artículos completados y lleva el control de lo que falta."],["Ajusta tus listas a tu gusto.","Desde el menú puedes cambiar la vista y los controles, incluidos textos, colores e íconos."]],"es-ES":[["Tus listas de la compra en movimiento.","En el vídeo de ShopSuggest de la App Store puedes ver listas por tienda y cómo marcar los productos que ya has comprado."],["Una lista para cada tienda.","Organiza la compra según el establecimiento y comprueba de un vistazo lo que llevas hecho."],["Abre tu lista y marca cada producto.","Consulta lo que necesitas, distingue los productos completados y controla lo que te queda por comprar."],["Personaliza tus listas.","Desde el menú puedes ajustar la vista y los controles, incluidos los textos, los colores y los iconos."]]};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"動画 01 ＋ 実画面 03","videoIssue":"VIDEO","screen":"SCREEN","watch":"動画を全画面で見る","enlarge":"画面を拡大","thumbVideo":"動画","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の項目","next":"次の項目","alt":"実画面","origin":"Apple App Storeに掲載された実画面・実映像"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"01 VIDEO + 03 ORIGINAL SCREENS","videoIssue":"VIDEO","screen":"SCREEN","watch":"Watch fullscreen","enlarge":"Enlarge screenshot","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous","next":"Next","alt":"screenshot","origin":"Original screenshots and video from the Apple App Store"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"01 VIDEO + 03 ANSICHTEN","videoIssue":"VIDEO","screen":"ANSICHT","watch":"Video im Vollbild ansehen","enlarge":"Screenshot vergrößern","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot konnte nicht geladen werden.","close":"Schließen","prev":"Vorheriges Element","next":"Nächstes Element","alt":"Screenshot","origin":"Originale Screenshots und Video aus dem Apple App Store"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"فيديو واحد + ٣ لقطات شاشة","videoIssue":"فيديو","screen":"لقطة","watch":"عرض الفيديو بملء الشاشة","enlarge":"تكبير لقطة الشاشة","thumbVideo":"فيديو","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"العنصر السابق","next":"العنصر التالي","alt":"لقطة شاشة","origin":"لقطات الشاشة والفيديو الأصلي من متجر App Store"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VIDEO + 03 CAPTURAS","videoIssue":"VIDEO","screen":"CAPTURA","watch":"Ver video en pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Video","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla","origin":"Capturas y video originales de App Store"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VÍDEO + 03 CAPTURAS","videoIssue":"VÍDEO","screen":"CAPTURA","watch":"Ver vídeo a pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Vídeo","thumb":"Captura de pantalla","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla","origin":"Capturas y vídeo originales de la App Store"}};
  const make = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  let languageTouched = false;
  const requestedLocale = () => {
    const choice=document.getElementById('p199-language')?.value||'';
    const query=new URLSearchParams(location.search).get('language')||'';
    return languageTouched&&choice?choice:((choice==='de-DE'||choice==='ar-SA')?choice:((query==='de-DE'||query==='ar-SA')?query:(choice||query||document.documentElement.lang||navigator.language||'en-US')));
  };
  const lang = () => /^ja(?:[-_]|$)/i.test(requestedLocale()) ? 'ja' : 'en';
  const country = () => /^jp$/i.test(document.getElementById('p199-country')?.value || '') ? 'jp' : 'us';
  const state = { manifest:null, selected:0, lang:'', locale:'', region:'', stage:null, scheduled:false, drawing:false };
  function validateManifest(value) {
    if (!value || value.apple_id !== APP || !value.regions) throw Error('MANIFEST_WRONG_APP');
    for (const region of ['us','jp']) {
      const images = value.regions[region];
      if (!Array.isArray(images) || images.length !== 3 || new Set(images).size !== 3) throw Error('THREE_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region, locale) {
    const japanese = language === 'ja';
    const text = LOCALIZED_CAPTION_COPY[locale] || COPY[language];
    const label = UI_LABELS[locale] || UI_LABELS[language] || UI_LABELS.en;
    const stage = make('section','tsz-shop-stage');
    stage.id = 'tsz-shop-r22r2';stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.mediaCount = '4';
    stage.dataset.screenshotCount = String(images.length);
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-shop-top');
    top.append(make('span','tsz-shop-kicker',label.kicker),
      make('span','tsz-shop-total',label.total));
    const layout = make('div','tsz-shop-layout');
    const visual = make('div','tsz-shop-visual');
    const video = make('video','tsz-shop-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-shop-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-shop-image-error',label.imageError);
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-shop-side');
    side.append(top);
    const editorial = make('div','tsz-shop-editorial');
    const issue = make('span','tsz-shop-issue');
    const headline = make('h3','tsz-shop-headline');
    const body = make('p','tsz-shop-body');
    const origin = make('p','tsz-shop-origin',label.origin);
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-shop-controls');
    const nav = make('div','tsz-shop-nav');
    const expand=make('button','tsz-shop-expand',label.watch);
    expand.type='button';
    const previous=make('button','tsz-shop-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-shop-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-shop-arrow','›');next.type='button';
    previous.setAttribute('aria-label',label.prev);next.setAttribute('aria-label',label.next);
    const navRight=make('div','tsz-shop-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-shop-thumbs');
    const buttons=[];
    for (let n=0; n<4; n++) {
      const button=make('button','tsz-shop-thumb');button.type='button';
      button.title=n===0?label.thumbVideo:`${label.thumb} ${n}`;
      button.setAttribute('aria-label',button.title);
      const thumbnail=make('img','');thumbnail.src=images[n===0?0:n-1];thumbnail.loading='lazy';
      thumbnail.referrerPolicy='no-referrer';thumbnail.alt='';
      button.append(thumbnail,make('span','',n===0?(locale==='ja'?label.thumbVideo:(locale==='en-US'||locale==='en'||locale==='fr-FR'?'VIDEO':label.thumbVideo)):String(n).padStart(2,'0')));
      button.addEventListener('click',(event)=>{
        show(n);
        // Pointer focus should not linger after selecting or moving to another thumbnail.
        // Keep genuine keyboard focus so Tab/Enter/Space remain usable.
        if(event.detail > 0 && document.activeElement===button) button.blur();
      });
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);
    layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-shop-dialog');
    const dialogClose=make('button','tsz-shop-dialog-close',label.close);dialogClose.type='button';
    const dialogImg=make('img','tsz-shop-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(3,state.selected));
    function show(index) {
      const normalized=(index+4)%4;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`ShopSuggest ${label.alt} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?label.videoIssue:`${label.screen} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?label.watch:label.enlarge;
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 04`;
      buttons.forEach((button,n)=>{const active=n===selected;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected = String(selected);
      if (document.activeElement===previous || document.activeElement===next || buttons.includes(document.activeElement)) {
        buttons[selected].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
      }
    }
    expand.addEventListener('click',()=>{
      if(selected===0) {
        if (typeof video.requestFullscreen==='function') {video.requestFullscreen().catch(()=>{});} 
        else if(typeof video.webkitEnterFullscreen==='function') video.webkitEnterFullscreen();
      } else {
        dialogImg.src=images[selected-1];dialogImg.alt=picture.alt;
        if(typeof dialog.showModal==='function') dialog.showModal();
      }
    });
    previous.addEventListener('click',()=>show(selected-1));
    next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if(e.key==='ArrowLeft' || e.key==='ArrowRight') {
        e.preventDefault();
        show(selected+(e.key==='ArrowRight'?1:-1));
        // Arrow-key navigation focuses the newly selected thumbnail, not the old one.
        if(buttons.includes(e.target)) buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);
    return stage;
  }
  function redraw() {
    state.scheduled=false;
    if (state.drawing || !state.manifest) return;
    const l=lang(),r=country(),locale=requestedLocale();
    if (state.stage?.isConnected && state.lang===l && state.region===r && state.locale===locale) return;
    state.lang=l;state.region=r;state.locale=locale;state.drawing=true;
    try {state.stage=createStage(state.manifest.regions[r],l,r,locale);holder.replaceChildren(state.stage);}
    finally {state.drawing=false;}
  }
  function queue() {
    if (state.scheduled) return;
    state.scheduled=true;requestAnimationFrame(redraw);
  }
  new MutationObserver(queue).observe(holder,{childList:true});
  for (const id of ['p199-language','p199-country']) document.getElementById(id)?.addEventListener('change',event=>{if(id==='p199-language'&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(response=>{
    if(!response.ok) throw Error('MANIFEST_HTTP_'+response.status);
    return response.json();
  }).then(json=>{state.manifest=validateManifest(json);queue();}).catch(err=>{
    holder.dataset.shopGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('SHOP_R22R2_LOAD_HOLD',err);
  });
})();
