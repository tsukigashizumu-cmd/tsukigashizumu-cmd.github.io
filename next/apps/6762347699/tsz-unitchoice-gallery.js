/* P19-9R6R9R24R2: Unit Choice dedicated preview + 5 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Unit Choice; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6762347699') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6762347699;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-unitchoice-images.json?v=p19-r24r2';
  const COPY = {
    "ja": [
        [
            "価格と数量から、単価を比較。",
            "Unit Choiceの実操作映像。店舗名・商品名・数量・価格を入力し、単価を比較するまでの流れをご覧ください。"
        ],
        [
            "配色を見比べて選ぶ。",
            "カード状のプレビューとスライダーで、色の組み合わせを確認している画面です。"
        ],
        [
            "単価を数字とグラフで確認。",
            "商品と店舗ごとに単価を表示。最小・最大・平均・中央値をひとつの画面で見比べられます。"
        ],
        [
            "数量の入力例を確認。",
            "メニュー上に数量入力の説明が表示された画面。複数の欄を使った計算例を確認できます。"
        ],
        [
            "文字の大きさを調整。",
            "文字サイズと表示スタイルを選ぶ画面。複数の候補を見比べながら読みやすさを調整できます。"
        ],
        [
            "データをJSONで保存。",
            "保存・読込メニューから、現在の一覧をJSONファイルとして書き出す操作を確認できます。"
        ],
        [
            "商品名を指定して探す。",
            "入力済みの商品名を使って検索する確認画面。目的の商品を一覧から探せます。"
        ],
        [
            "店舗名を指定して探す。",
            "店舗名を入力して検索する確認画面。特定の店舗の記録を探す操作を示しています。"
        ],
        [
            "グラフの凡例を確認。",
            "単価・最小・最大・平均・中央値など、グラフ内のアイコンが表す指標を確認できます。"
        ]
    ],
    "en": [
        [
            "Compare unit prices as you enter.",
            "See Unit Choice in action: enter a store, product, quantity, and price, then review the comparison."
        ],
        [
            "Preview combinations of colors.",
            "A palette screen with card-shaped previews and sliders for reviewing different color combinations."
        ],
        [
            "Unit prices, numbers, and graphs.",
            "Compare unit price, minimum, maximum, average, and median for saved products and stores."
        ],
        [
            "See an example of quantity entry.",
            "An explanatory dialog shows how several quantity fields work together in a calculation."
        ],
        [
            "Adjust how the text appears.",
            "Compare font size and display-style options in a visual preview."
        ],
        [
            "Export your list as JSON.",
            "The Save/Load menu shows how to export the current list as a JSON file."
        ],
        [
            "Search by product name.",
            "A confirmation dialog for finding saved entries using the product name."
        ],
        [
            "Search by store name.",
            "A confirmation dialog for looking up records from a specific store."
        ],
        [
            "Understand each graph label.",
            "A help dialog explains the icons for unit price, minimum, maximum, average, and median."
        ]
    ]
};
  const LOCALIZED_CAPTION_COPY = {"de-DE":[["Stückpreise direkt vergleichen.","Sieh Unit Choice in Aktion: Gib Geschäft, Produkt, Menge und Preis ein und vergleiche anschließend die Stückpreise."],["Farbkombinationen ansehen.","Auf dieser Palette kannst du Farbkombinationen anhand von Karten und Schiebereglern prüfen."],["Stückpreise als Zahlen und Diagramme.","Vergleiche Stückpreis, Minimum, Maximum, Durchschnitt und Median für gespeicherte Produkte und Geschäfte."],["Ein Beispiel für die Mengeneingabe.","Ein Hinweisfenster erläutert, wie mehrere Mengenfelder bei der Berechnung zusammenwirken."],["Die Textdarstellung anpassen.","Vergleiche Schriftgrößen und Anzeigeoptionen in der visuellen Vorschau."],["Deine Liste als JSON exportieren.","Im Menü „Speichern/Laden“ siehst du, wie du die aktuelle Liste als JSON-Datei exportierst."],["Nach Produktnamen suchen.","Ein Bestätigungsdialog zeigt die Suche nach gespeicherten Einträgen anhand des Produktnamens."],["Nach Geschäftsnamen suchen.","Ein Bestätigungsdialog zeigt, wie du Einträge für ein bestimmtes Geschäft findest."],["Diagrammsymbole verstehen.","Ein Hilfefenster erklärt die Symbole für Stückpreis, Minimum, Maximum, Durchschnitt und Median."]],"ar-SA":[["قارن سعر الوحدة أثناء الإدخال.","شاهد Unit Choice أثناء الاستخدام: أدخل المتجر والمنتج والكمية والسعر، ثم راجع مقارنة أسعار الوحدات."],["عاين تنسيقات الألوان.","توضح هذه الشاشة مجموعات الألوان باستخدام معاينات على شكل بطاقات وأشرطة تمرير."],["أسعار الوحدات بالأرقام والرسوم.","قارن سعر الوحدة والحد الأدنى والأقصى والمتوسط والوسيط للمنتجات والمتاجر المحفوظة."],["شاهد مثالًا لإدخال الكمية.","تشرح نافذة إرشادية كيف تعمل عدة حقول للكمية معًا لإجراء الحساب."],["اضبط طريقة عرض النص.","قارن أحجام الخطوط وأنماط العرض المختلفة باستخدام معاينة مرئية."],["صدّر قائمتك بصيغة JSON.","توضح قائمة الحفظ والتحميل كيفية تصدير القائمة الحالية إلى ملف JSON."],["ابحث باسم المنتج.","تعرض نافذة تأكيد طريقة العثور على السجلات المحفوظة باستخدام اسم المنتج."],["ابحث باسم المتجر.","تعرض نافذة تأكيد كيفية البحث عن السجلات التابعة لمتجر محدد."],["تعرّف إلى رموز الرسم البياني.","توضح نافذة المساعدة رموز سعر الوحدة والحد الأدنى والأقصى والمتوسط والوسيط."]],"es-MX":[["Compara el precio por unidad.","Mira Unit Choice en acción: ingresa la tienda, el producto, la cantidad y el precio para comparar cuánto cuesta cada unidad."],["Prueba combinaciones de colores.","Revisa distintas combinaciones con vistas previas en tarjetas y controles deslizantes."],["Precios por unidad y estadísticas.","Compara el precio unitario, el mínimo, el máximo, el promedio y la mediana de productos y tiendas guardados."],["Aprende a ingresar cantidades.","Un cuadro de ayuda explica cómo se combinan varios campos de cantidad para realizar el cálculo."],["Ajusta cómo se ve el texto.","Compara tamaños de letra y estilos de visualización con una vista previa."],["Exporta tu lista como JSON.","Desde el menú Guardar/Cargar puedes exportar la lista actual a un archivo JSON."],["Busca por nombre de producto.","Un cuadro de confirmación muestra cómo localizar registros guardados por nombre de producto."],["Busca por nombre de tienda.","Encuentra registros de una tienda específica usando su nombre."],["Entiende los símbolos de la gráfica.","La ayuda explica los indicadores de precio por unidad, mínimo, máximo, promedio y mediana."]],"es-ES":[["Compara precios por unidad.","Mira Unit Choice en funcionamiento: introduce la tienda, el producto, la cantidad y el precio para comparar el coste por unidad."],["Prueba combinaciones de colores.","Consulta distintas combinaciones con vistas previas en tarjetas y controles deslizantes."],["Precios unitarios y estadísticas.","Compara el precio por unidad, el mínimo, el máximo, la media y la mediana de productos y tiendas guardados."],["Descubre cómo introducir cantidades.","Una ventana de ayuda explica cómo se combinan varios campos de cantidad en el cálculo."],["Ajusta la apariencia del texto.","Compara los tamaños de letra y las opciones de visualización en una vista previa."],["Exporta tu lista a JSON.","Desde el menú Guardar/Cargar puedes exportar la lista actual a un archivo JSON."],["Busca por nombre de producto.","Una ventana de confirmación muestra cómo encontrar registros guardados por el nombre del producto."],["Busca por nombre de tienda.","Consulta los registros de una tienda concreta usando su nombre."],["Interpreta los símbolos del gráfico.","La ayuda explica qué indican los iconos de precio unitario, mínimo, máximo, media y mediana."]]};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"動画 01 ＋ 実画面 08","videoIssue":"VIDEO","screen":"実画面","watch":"動画を全画面で見る","enlarge":"画面を拡大","thumbVideo":"動画","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の項目","next":"次の項目","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"01 VIDEO + 08 ORIGINAL SCREENS","videoIssue":"VIDEO","screen":"SCREEN","watch":"Watch fullscreen","enlarge":"Enlarge screenshot","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous","next":"Next","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"01 VIDEO + 08 ANSICHTEN","videoIssue":"VIDEO","screen":"ANSICHT","watch":"Video im Vollbild ansehen","enlarge":"Screenshot vergrößern","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot konnte nicht geladen werden.","close":"Schließen","prev":"Vorheriges Element","next":"Nächstes Element","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"فيديو واحد + ٨ لقطات شاشة","videoIssue":"فيديو","screen":"لقطة","watch":"عرض الفيديو بملء الشاشة","enlarge":"تكبير لقطة الشاشة","thumbVideo":"فيديو","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"العنصر السابق","next":"العنصر التالي","alt":"لقطة شاشة"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VIDEO + 08 CAPTURAS","videoIssue":"VIDEO","screen":"CAPTURA","watch":"Ver video en pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Video","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Anterior","next":"Siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VÍDEO + 08 CAPTURAS","videoIssue":"VÍDEO","screen":"CAPTURA","watch":"Ver vídeo a pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Vídeo","thumb":"Captura","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Anterior","next":"Siguiente","alt":"captura de pantalla"}};
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
      if (!Array.isArray(images) || images.length !== 8 || new Set(images).size !== 8) throw Error('EIGHT_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region, locale) {
    const japanese = language === 'ja';
    const text = LOCALIZED_CAPTION_COPY[locale] || COPY[language];
    const label = UI_LABELS[locale] || UI_LABELS[language] || UI_LABELS.en;
    const stage = make('section','tsz-unitchoice-stage');
    stage.id = 'tsz-unitchoice-r24r2';stage.dataset.locale=locale;stage.dataset.region=region;stage.dir=locale==='ar-SA'?'rtl':'ltr';
    stage.dataset.mediaCount = '9';
    stage.dataset.screenshotCount = String(images.length);
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-unitchoice-top');
    top.append(make('span','tsz-unitchoice-kicker',label.kicker),
      make('span','tsz-unitchoice-total',label.total));
    const layout = make('div','tsz-unitchoice-layout');
    const visual = make('div','tsz-unitchoice-visual');
    const video = make('video','tsz-unitchoice-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-unitchoice-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-unitchoice-image-error',label.imageError);
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-unitchoice-side');
    side.append(top);
    const editorial = make('div','tsz-unitchoice-editorial');
    const issue = make('span','tsz-unitchoice-issue');
    const headline = make('h3','tsz-unitchoice-headline');
    const body = make('p','tsz-unitchoice-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls = make('div','tsz-unitchoice-controls');
    const nav = make('div','tsz-unitchoice-nav');
    const expand=make('button','tsz-unitchoice-expand',label.watch);
    expand.type='button';
    const previous=make('button','tsz-unitchoice-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-unitchoice-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-unitchoice-arrow','›');next.type='button';
    previous.setAttribute('aria-label',label.prev);next.setAttribute('aria-label',label.next);
    const navRight=make('div','tsz-unitchoice-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-unitchoice-thumbs');
    const buttons=[];
    for (let n=0; n<9; n++) {
      const button=make('button','tsz-unitchoice-thumb');button.type='button';
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
    const dialog=make('dialog','tsz-unitchoice-dialog');
    const dialogClose=make('button','tsz-unitchoice-dialog-close',label.close);dialogClose.type='button';
    const dialogImg=make('img','tsz-unitchoice-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(8,state.selected));
    function show(index) {
      const normalized=(index+9)%9;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Unit Choice ${label.alt} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?label.videoIssue:`${label.screen} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?label.watch:label.enlarge;
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 09`;
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
    const l=lang(),r=country(),loc=requestedLocale();
    if (state.stage?.isConnected && state.lang===l && state.region===r && state.locale===loc) return;
    state.lang=l;state.region=r;state.locale=loc;state.drawing=true;
    try {state.stage=createStage(state.manifest.regions[r],l,r,loc);holder.replaceChildren(state.stage);}
    finally {state.drawing=false;}
  }
  function queue() {
    if (state.scheduled) return;
    state.scheduled=true;requestAnimationFrame(redraw);
  }
  new MutationObserver(queue).observe(holder,{childList:true});
  document.getElementById('p199-language')?.addEventListener('change',()=>{languageTouched=true;queue();});
  document.getElementById('p199-country')?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(response=>{
    if(!response.ok) throw Error('MANIFEST_HTTP_'+response.status);
    return response.json();
  }).then(json=>{state.manifest=validateManifest(json);queue();}).catch(err=>{
    holder.dataset.unitchoiceGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('UNIT_CHOICE_R24R2_LOAD_HOLD',err);
  });
})();
