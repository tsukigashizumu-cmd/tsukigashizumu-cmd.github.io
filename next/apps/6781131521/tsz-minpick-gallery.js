/* P19-9R6R9R21R4: independent Apple 10 screenshots + approved Minpick video.
   Fix: the protected shared gallery truncates images to five (.slice(0,5)); do not depend on its DOM.
   Scoped to Minpick; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6781131521') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6781131521;
  const MEDIA = './minpick-apple-preview.mp4';
  const MANIFEST = './minpick-apple-images.json?v=p19-r21r4';
  const COPY = {
    ja: [
      ['実際の動きを見る', 'App Storeに掲載されたMinpickの実映像。時間を選び、候補からひとつを始めるまで。'],
      ['5分ある。その先は？', '何を始めるか迷う時間を、少し短く。今ある時間から始めよう。'],
      ['今の時間に収まる用事だけ', '使える分数を選ぶと、今の時間に合う候補を最大3件表示。'],
      ['ひとつ選んで始める', '候補からひとつを選ぶ。全部を終わらせなくてもいい。'],
      ['できた。', 'ひとつ終わったことを確かめる画面。'],
      ['そのまま次へ。', 'ひとつ終えて、次の一歩を選べる。'],
      ['3分だけ？ それでも十分。', '短い時間にできることを探せる。'],
      ['今ある時間を、そのまま使う。', '使える時間を、自分で選べる。'],
      ['あとでやることは預けておく。', '今やらないことは、リストに残しておける。'],
      ['ホーム画面からすぐ始める。', 'ホーム画面から使える時間を選ぶ。'],
      ['今ある時間で、ひとつ進める。', '今の5分で、一つの用事を始めよう。']
    ],
    en: [
      ['See Minpick in motion', 'The original App Store preview: pick a time, find a fit, and get started.'],
      ['Five minutes appeared', 'Choosing what to start should not consume them. Make a start with the time you have.'],
      ['Only what fits', 'Select the minutes available and see up to three fitting tasks.'],
      ['One task, your choice', 'Choose one to begin. You do not have to finish everything.'],
      ['Done.', 'A simple view of one finished task.'],
      ['On to the next.', 'After one task, choose what comes next.'],
      ['Only three minutes? Still enough.', 'Find something small enough for the time you have.'],
      ['Use the time you have.', 'Choose the amount of time available.'],
      ['Keep the rest for later.', 'Keep tasks you are not doing now in a list.'],
      ['Start from your Home Screen.', 'Choose your available time from the Home Screen.'],
      ['One small step, right now.', 'Start one task with the next five minutes.']
    ]
  };
  const LOCALIZED_CAPTION_COPY = {"de-DE":[["Minpick in Aktion ansehen","Die Originalvorschau aus dem App Store: Wähle die verfügbare Zeit, finde eine passende Aufgabe und leg los."],["Fünf Minuten frei. Und jetzt?","Die Entscheidung, womit du anfängst, sollte nicht die ganze Zeit kosten. Fang mit den Minuten an, die du hast."],["Nur Aufgaben, die zeitlich passen","Wähle aus, wie viele Minuten du hast, und sieh bis zu drei passende Aufgaben."],["Eine Aufgabe auswählen und loslegen","Entscheide dich für eine Aufgabe. Du musst nicht alles auf einmal erledigen."],["Erledigt.","Eine einfache Ansicht für die Aufgabe, die du gerade abgeschlossen hast."],["Weiter zur nächsten Aufgabe.","Ist eine Aufgabe erledigt, kannst du den nächsten Schritt auswählen."],["Nur drei Minuten? Auch das reicht.","Finde eine kleine Aufgabe, die in die verfügbare Zeit passt."],["Nutze die Zeit, die du hast.","Lege selbst fest, wie viele Minuten dir gerade zur Verfügung stehen."],["Alles andere für später aufheben.","Aufgaben, die du jetzt nicht angehst, bleiben in deiner Liste."],["Direkt vom Home-Bildschirm starten.","Wähle deine verfügbare Zeit direkt auf dem Home-Bildschirm."],["Jetzt einen kleinen Schritt machen.","Nutze die nächsten fünf Minuten, um eine Aufgabe anzufangen."]],"ar-SA":[["شاهد Minpick أثناء الاستخدام","معاينة التطبيق الأصلية من App Store: اختر الوقت المتاح، واعثر على مهمة تناسبه، ثم ابدأ."],["لديك خمس دقائق. ماذا بعد؟","لا تدع الحيرة بشأن ما تبدأ به تستهلك وقتك. ابدأ بما يمكنك فعله الآن."],["مهام تناسب وقتك فقط","اختر عدد الدقائق المتاحة لترى ما يصل إلى ثلاث مهام تناسب وقتك."],["اختر مهمة واحدة وابدأ","اختر مهمة واحدة لتبدأ بها. لست مضطرًا إلى إنجاز كل شيء."],["أنجزتها.","شاشة بسيطة تُظهر المهمة الواحدة التي أكملتها."],["انتقل إلى الخطوة التالية.","بعد إنهاء مهمة، يمكنك اختيار ما تفعله بعد ذلك."],["ثلاث دقائق فقط؟ تكفي أيضًا.","اعثر على مهمة صغيرة يمكنك إنجازها في الوقت المتاح."],["استفد من الوقت المتاح لك.","حدّد بنفسك عدد الدقائق التي يمكنك تخصيصها الآن."],["اترك البقية لوقت لاحق.","احتفظ في قائمتك بالمهام التي لن تبدأ بها الآن."],["ابدأ من الشاشة الرئيسية.","اختر الوقت المتاح لك مباشرة من الشاشة الرئيسية."],["خطوة صغيرة الآن.","ابدأ مهمة واحدة خلال الدقائق الخمس القادمة."]],"es-MX":[["Mira Minpick en acción","Video original de App Store: elige cuánto tiempo tienes, encuentra una tarea que encaje y empieza."],["¿Tienes cinco minutos?","Que decidir por dónde empezar no se lleve todo ese tiempo. Da el primer paso con los minutos que tienes."],["Solo tareas que caben en tu tiempo","Elige los minutos disponibles y descubre hasta tres tareas que puedes hacer ahora."],["Elige una y empieza","Escoge una tarea para comenzar. No tienes que terminar todo de una vez."],["¡Listo!","Una pantalla sencilla para confirmar que terminaste una tarea."],["Sigue con la siguiente","Después de completar una tarea, elige tu próximo paso."],["¿Solo tres minutos? También cuentan.","Encuentra algo pequeño que puedas hacer en ese tiempo."],["Aprovecha el tiempo que tienes","Tú eliges cuántos minutos tienes disponibles."],["Deja lo demás para después","Guarda en tu lista las tareas que no harás ahora."],["Empieza desde tu pantalla de inicio","Elige tu tiempo disponible directamente desde la pantalla de inicio."],["Avanza un poco, ahora mismo","Aprovecha los próximos cinco minutos para comenzar una tarea."]],"es-ES":[["Mira Minpick en acción","Vídeo original de la App Store: elige el tiempo disponible, encuentra una tarea que encaje y ponte a ello."],["¿Tienes cinco minutos?","Que decidir por dónde empezar no te haga perderlos. Da el primer paso con el tiempo que tienes."],["Solo tareas que encajan en tu tiempo","Selecciona los minutos disponibles y consulta hasta tres tareas que puedes hacer ahora."],["Elige una tarea y empieza","Escoge una para ponerte manos a la obra. No hace falta hacerlo todo de golpe."],["Hecho.","Una pantalla sencilla que confirma que has completado una tarea."],["A por la siguiente","Cuando termines una tarea, decide cuál será el siguiente paso."],["¿Solo tres minutos? También sirven.","Encuentra una tarea pequeña que puedas hacer en ese rato."],["Aprovecha el tiempo que tienes","Decide tú cuántos minutos tienes disponibles."],["Deja el resto para más tarde","Guarda en tu lista las tareas que no vas a hacer ahora."],["Empieza desde la pantalla de inicio","Elige el tiempo disponible directamente desde la pantalla de inicio."],["Da un pequeño paso ahora","Aprovecha los próximos cinco minutos para empezar una tarea."]]};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"動画 01 ＋ 実画面 10","videoIssue":"VIDEO","screen":"SCREEN","watch":"動画を全画面で見る","enlarge":"画面を拡大","thumbVideo":"動画","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の項目","next":"次の項目","alt":"実画面","origin":"Apple App Storeに掲載された実画面・実映像"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"01 VIDEO + 10 ORIGINAL SCREENS","videoIssue":"VIDEO","screen":"SCREEN","watch":"Watch fullscreen","enlarge":"Enlarge screenshot","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous","next":"Next","alt":"screenshot","origin":"Original screenshots and video from the Apple App Store"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"01 VIDEO + 10 ANSICHTEN","videoIssue":"VIDEO","screen":"ANSICHT","watch":"Video im Vollbild ansehen","enlarge":"Screenshot vergrößern","thumbVideo":"Video","thumb":"Screenshot","imageError":"Screenshot konnte nicht geladen werden.","close":"Schließen","prev":"Vorheriges Element","next":"Nächstes Element","alt":"Screenshot","origin":"Originalbilder und -video aus dem Apple App Store"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"فيديو واحد + ١٠ لقطات شاشة","videoIssue":"فيديو","screen":"لقطة","watch":"مشاهدة الفيديو بملء الشاشة","enlarge":"تكبير لقطة الشاشة","thumbVideo":"فيديو","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"العنصر السابق","next":"العنصر التالي","alt":"لقطة شاشة","origin":"صور وفيديو أصليان من Apple App Store"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VIDEO + 10 CAPTURAS","videoIssue":"VIDEO","screen":"CAPTURA","watch":"Ver video en pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Video","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Anterior","next":"Siguiente","alt":"captura de pantalla","origin":"Pantallas y video originales de App Store"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VÍDEO + 10 CAPTURAS","videoIssue":"VÍDEO","screen":"CAPTURA","watch":"Ver vídeo a pantalla completa","enlarge":"Ampliar captura","thumbVideo":"Vídeo","thumb":"Captura","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Anterior","next":"Siguiente","alt":"captura de pantalla","origin":"Capturas y vídeo originales de la App Store"}};
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
      if (!Array.isArray(images) || images.length !== 10 || new Set(images).size !== 10) throw Error('TEN_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region, locale) {
    const japanese = language === 'ja';
    const text = LOCALIZED_CAPTION_COPY[locale] || COPY[language];
    const label = UI_LABELS[locale] || UI_LABELS[language] || UI_LABELS.en;
    const stage = make('section','tsz-minpick-stage');
    stage.id = 'tsz-minpick-r21r4';stage.dataset.locale=locale;stage.dataset.region=region;stage.dir=locale==='ar-SA'?'rtl':'ltr';
    stage.dataset.mediaCount = '11';
    stage.dataset.screenshotCount = String(images.length);
    const top = make('div','tsz-minpick-top');
    top.append(make('span','tsz-minpick-kicker',label.kicker),
      make('span','tsz-minpick-total',label.total));
    const layout = make('div','tsz-minpick-layout');
    const visual = make('div','tsz-minpick-visual');
    const video = make('video','tsz-minpick-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-minpick-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-minpick-image-error',label.imageError);
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-minpick-side');
    side.append(top);
    const editorial = make('div','tsz-minpick-editorial');
    const issue = make('span','tsz-minpick-issue');
    const headline = make('h3','tsz-minpick-headline');
    const body = make('p','tsz-minpick-body');
    const origin = make('p','tsz-minpick-origin',label.origin);
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-minpick-controls');
    const nav = make('div','tsz-minpick-nav');
    const expand=make('button','tsz-minpick-expand',label.watch);
    expand.type='button';
    const previous=make('button','tsz-minpick-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-minpick-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-minpick-arrow','›');next.type='button';
    previous.setAttribute('aria-label',label.prev);next.setAttribute('aria-label',label.next);
    const navRight=make('div','tsz-minpick-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-minpick-thumbs');
    const buttons=[];
    for (let n=0; n<11; n++) {
      const button=make('button','tsz-minpick-thumb');button.type='button';
      button.title=n===0?label.thumbVideo:`${label.thumb} ${n}`;
      button.setAttribute('aria-label',button.title);
      const thumbnail=make('img','');thumbnail.src=images[n===0?0:n-1];thumbnail.loading='lazy';
      thumbnail.referrerPolicy='no-referrer';thumbnail.alt='';
      button.append(thumbnail,make('span','',n===0?(locale==='ja'||locale==='ar-SA'?label.thumbVideo:'VIDEO'):String(n).padStart(2,'0')));
      button.addEventListener('click',()=>show(n));
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);
    layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-minpick-dialog');
    const dialogClose=make('button','tsz-minpick-dialog-close',label.close);dialogClose.type='button';
    const dialogImg=make('img','tsz-minpick-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(10,state.selected));
    function show(index) {
      const normalized=(index+11)%11;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Minpick ${label.alt} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?label.videoIssue:`${label.screen} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?label.watch:label.enlarge;
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 11`;
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
      if(e.key==='ArrowLeft' || e.key==='ArrowRight') {e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));}
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
    holder.dataset.minpickGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('MINPICK_R21R3_LOAD_HOLD',err);
  });
})();
