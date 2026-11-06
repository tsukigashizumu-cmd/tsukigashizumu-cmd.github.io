/* P19-9R6R9R23R2: Bacchus Karma dedicated preview + 5 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Bacchus Karma; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6761338604') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6761338604;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-bacchus-images.json?v=p19-r23r2';
  const COPY = {
    ja: [
      ['ルールを作って、遊びはじめる。', 'Bacchus Karmaの実際のプレイ映像。盤面やピースの出現条件を自分で決めて遊ぶ流れをご覧ください。'],
      ['盤面も、ピースも、自分で決める。', '盤面・部品・骨格・出現条件などの作成画面へ。遊ぶ前の準備から自分で組み立てられます。'],
      ['出てくるピースを選ぶ。', '使うピースを選び、出現のしかたを調整。自分が遊びたいルールに近づけます。'],
      ['スタートする盤面を組み立てる。', 'マス目を使って、盤面の初期配置を編集。どこから始めるかも自分で決められます。'],
      ['作った配置を保存する。', '盤面の配置を保存・読み込み。作成した条件を切り替えながら試せます。'],
      ['ピースの出現条件を調整する。', 'ピースごとに出現の設定を確認・編集。組み合わせを変えて、自分だけのパズルに。']
    ],
    en: [
      ['Design the rules. Then play.', 'Watch Bacchus Karma in action. Build a starting board, choose your pieces, and play with the conditions you set.'],
      ['Your board. Your pieces. Your rules.', 'Start with the creation menu for boards, components, and other settings before playing.'],
      ['Choose the pieces that appear.', 'Select available pieces and tune how they enter the game to shape your own challenge.'],
      ['Build your starting board.', 'Edit the starting layout on a grid and choose the positions before the game begins.'],
      ['Save the setups you create.', 'Use save and load to manage your arrangements and return to a configuration.'],
      ['Tune the appearance of pieces.', 'Review and adjust each piece’s appearance settings to create your own puzzle balance.']
    ]
  };
  const LOCALIZED_CAPTION_COPY = {"de-DE":[["Regeln gestalten. Dann spielen.","Sieh Bacchus Karma in Aktion: Lege das Startspielfeld fest, wähle deine Spielsteine und spiele nach deinen eigenen Regeln."],["Dein Spielfeld. Deine Teile. Deine Regeln.","Im Erstellungsmenü legst du Spielfeld, Bauteile und weitere Einstellungen fest, bevor das Spiel beginnt."],["Bestimme, welche Teile erscheinen.","Wähle die verfügbaren Teile und passe an, wie sie im Spiel auftauchen – für deine eigene Herausforderung."],["Gestalte dein Startspielfeld.","Bearbeite die Ausgangsanordnung im Raster und bestimme, wo die Teile zu Beginn liegen."],["Speichere deine Anordnungen.","Speichere und lade deine Spielfelder, um jederzeit zu einer erstellten Konfiguration zurückzukehren."],["Steuere, wie Teile erscheinen.","Passe die Einstellungen für das Erscheinen jedes Teils an und finde deine eigene Puzzle-Balance."]],"ar-SA":[["اصنع القواعد، ثم ابدأ اللعب.","شاهد Bacchus Karma أثناء اللعب: أنشئ لوحة البداية، واختر القطع، والعب وفق الشروط التي تحددها."],["لوحتك وقطعك وقواعدك.","ابدأ من قائمة الإنشاء لتصميم اللوحات والقطع وضبط الإعدادات الأخرى قبل اللعب."],["اختر القطع التي يمكن أن تظهر.","حدّد القطع المتاحة واضبط طريقة ظهورها في اللعبة لتصنع تحديك الخاص."],["صمّم لوحة البداية.","عدّل الترتيب الأولي على الشبكة وحدّد مواقع القطع قبل بدء اللعبة."],["احفظ الترتيبات التي أنشأتها.","احفظ ترتيبات اللوحة وحمّلها لاحقًا للعودة إلى إعداداتك المفضلة."],["اضبط شروط ظهور القطع.","راجع إعدادات ظهور كل قطعة وعدّلها لتحقيق التوازن الذي تريده في أحجيتك."]],"es-MX":[["Diseña las reglas. Luego juega.","Mira Bacchus Karma en acción. Prepara el tablero inicial, elige las piezas y juega con las condiciones que tú establezcas."],["Tu tablero. Tus piezas. Tus reglas.","Entra al menú de creación para configurar el tablero, las piezas y otros ajustes antes de empezar."],["Elige las piezas que aparecen.","Selecciona las piezas disponibles y ajusta cómo aparecen en el juego para crear tu propio reto."],["Prepara el tablero inicial.","Edita la distribución inicial en la cuadrícula y decide dónde empieza cada pieza."],["Guarda tus configuraciones.","Guarda y carga distribuciones del tablero para probar distintas configuraciones cuando quieras."],["Ajusta la aparición de las piezas.","Revisa y modifica las condiciones de aparición de cada pieza hasta encontrar el equilibrio que buscas."]],"es-ES":[["Diseña las reglas. Después, juega.","Descubre Bacchus Karma en acción. Prepara el tablero inicial, elige las piezas y juega con las condiciones que hayas definido."],["Tu tablero. Tus piezas. Tus reglas.","Abre el menú de creación para preparar el tablero, las piezas y el resto de ajustes antes de empezar a jugar."],["Decide qué piezas aparecen.","Selecciona las piezas disponibles y configura cómo aparecen en la partida para crear tu propio desafío."],["Construye el tablero inicial.","Edita la disposición inicial en la cuadrícula y decide dónde colocar cada pieza antes de empezar."],["Guarda tus configuraciones.","Guarda y carga las disposiciones del tablero para volver a tus configuraciones cuando quieras."],["Configura la aparición de las piezas.","Revisa y ajusta las condiciones de aparición de cada pieza para encontrar el equilibrio de tu puzle."]]};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"動画 01 ＋ 実画面 05","videoIssue":"VIDEO","screen":"SCREEN","watch":"動画を全画面で見る","enlarge":"画面を拡大","thumbVideo":"動画","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の項目","next":"次の項目","alt":"実画面","origin":"Apple App Storeに掲載された実画面・実映像"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"01 VIDEO + 05 ORIGINAL SCREENS","videoIssue":"VIDEO","screen":"SCREEN","watch":"Watch fullscreen","enlarge":"Enlarge screenshot","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous","next":"Next","alt":"screenshot","origin":"Original screenshots and video from the Apple App Store"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"01 VIDEO + 05 ANSICHTEN","videoIssue":"VIDEO","screen":"ANSICHT","watch":"Video im Vollbild ansehen","enlarge":"Screenshot vergrößern","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot konnte nicht geladen werden.","close":"Schließen","prev":"Vorheriges Element","next":"Nächstes Element","alt":"Screenshot","origin":"Originale Screenshots und Video aus dem Apple App Store"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"فيديو واحد + ٥ لقطات شاشة","videoIssue":"فيديو","screen":"لقطة","watch":"عرض الفيديو بملء الشاشة","enlarge":"تكبير لقطة الشاشة","thumbVideo":"فيديو","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"العنصر السابق","next":"العنصر التالي","alt":"لقطة شاشة","origin":"لقطات الشاشة والفيديو الأصلي من متجر App Store"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VIDEO + 05 CAPTURAS","videoIssue":"VIDEO","screen":"CAPTURA","watch":"Ver video en pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Video","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VÍDEO + 05 CAPTURAS","videoIssue":"VÍDEO","screen":"CAPTURA","watch":"Ver vídeo a pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Vídeo","thumb":"Captura de pantalla","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla"}};
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
      if (!Array.isArray(images) || images.length !== 5 || new Set(images).size !== 5) throw Error('FIVE_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region, locale) {
    const japanese = language === 'ja';
    const text = LOCALIZED_CAPTION_COPY[locale] || COPY[language];
    const label = UI_LABELS[locale] || UI_LABELS[language] || UI_LABELS.en;
    const stage = make('section','tsz-bacchus-stage');
    stage.id = 'tsz-bacchus-r23r2';stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.mediaCount = '6';
    stage.dataset.screenshotCount = String(images.length);
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-bacchus-top');
    top.append(make('span','tsz-bacchus-kicker',label.kicker),
      make('span','tsz-bacchus-total',label.total));
    const layout = make('div','tsz-bacchus-layout');
    const visual = make('div','tsz-bacchus-visual');
    const video = make('video','tsz-bacchus-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-bacchus-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-bacchus-image-error',label.imageError);
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-bacchus-side');
    side.append(top);
    const editorial = make('div','tsz-bacchus-editorial');
    const issue = make('span','tsz-bacchus-issue');
    const headline = make('h3','tsz-bacchus-headline');
    const body = make('p','tsz-bacchus-body');
    const origin = make('p','tsz-bacchus-origin',label.origin);
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-bacchus-controls');
    const nav = make('div','tsz-bacchus-nav');
    const expand=make('button','tsz-bacchus-expand',label.watch);
    expand.type='button';
    const previous=make('button','tsz-bacchus-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-bacchus-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-bacchus-arrow','›');next.type='button';
    previous.setAttribute('aria-label',label.prev);next.setAttribute('aria-label',label.next);
    const navRight=make('div','tsz-bacchus-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-bacchus-thumbs');
    const buttons=[];
    for (let n=0; n<6; n++) {
      const button=make('button','tsz-bacchus-thumb');button.type='button';
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
    const dialog=make('dialog','tsz-bacchus-dialog');
    const dialogClose=make('button','tsz-bacchus-dialog-close',label.close);dialogClose.type='button';
    const dialogImg=make('img','tsz-bacchus-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(5,state.selected));
    function show(index) {
      const normalized=(index+6)%6;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Bacchus Karma ${label.alt} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?label.videoIssue:`${label.screen} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?label.watch:label.enlarge;
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 06`;
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
    holder.dataset.bacchusGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('BACCHUS_R23R2_LOAD_HOLD',err);
  });
})();
