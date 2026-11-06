/* P19-9R6R9R25R2: PuddingScoop dedicated preview + US5/JP7 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to PuddingScoop; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6763169050') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6763169050;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-pudding-images.json?v=p19-r25r2';
  const COPY = {
  "jp": {
    "ja": [
      [
        "プリンをすくう、その瞬間を見る。",
        "ドラッグでプリンを少しずつすくい、カラメルが出る前にやめるか続けるかを決める。短いプレイ映像です。"
      ],
      [
        "ここでやめる？ もうひとすくい？",
        "「Stop here?」の確認画面。ここで終了するか、もう少しすくうかを選べます。"
      ],
      [
        "無事に終えた結果を確認。",
        "カラメルが出る前に終了したときの結果画面。合計、すくった回数、平均、ベストが並びます。"
      ],
      [
        "カラメルが出たら、そこで終了。",
        "失敗時の「Reached caramel」結果画面。すくった回数やスコアを確認できます。"
      ],
      [
        "履歴や遊び方をメニューから。",
        "メニューには履歴、操作説明、記録のコピーなどの項目が並びます。"
      ],
      [
        "すくった数も、記録も振り返る。",
        "履歴画面に合計スコア、すくった回数、平均、ベストなどの集計が表示されています。"
      ],
      [
        "時間ごとのベストを見比べる。",
        "直近5分・10分・30分から長期間まで、期間別の記録が並びます。"
      ],
      [
        "直近の結果を振り返る。",
        "安全終了とカラメル到達の記録を、各プレイの結果とともに確認できます。"
      ]
    ],
    "en": [
      [
        "Watch every scoop count.",
        "Drag to scoop pudding. Decide whether to stop before caramel appears."
      ],
      [
        "Stop now—or scoop once more?",
        "The stop confirmation lets you cancel or end the current run."
      ],
      [
        "Return safely and check your result.",
        "A safe stop displays the total, number of scoops, average, and best."
      ],
      [
        "Reach caramel, and the run ends.",
        "The failed-run screen summarizes your score and scoop count."
      ],
      [
        "Open the menu for more options.",
        "The menu includes history, instructions, copying images and tags, and other controls."
      ],
      [
        "Review your totals and records.",
        "The History screen displays overall scores, scoop totals, averages, and personal records."
      ],
      [
        "Compare your best over time.",
        "Time-record panels show results for different periods, from minutes to long-term history."
      ],
      [
        "Review recent results.",
        "See runs that ended safely or reached caramel, with their scores and scoop counts."
      ]
    ]
  },
  "us": {
    "ja": [
      [
        "プリンをすくう、その瞬間を見る。",
        "ドラッグしてプリンをすくう実際のプレイ映像。カラメルが出る前にやめるか判断します。"
      ],
      [
        "やめるか、もう少しすくうか。",
        "終了するか続けるかを選ぶ確認画面です。"
      ],
      [
        "合計や平均をまとめて確認。",
        "履歴画面に合計、すくった回数、平均、最高記録などが表示されています。"
      ],
      [
        "安全に終了した結果。",
        "カラメルが出る前に戻った結果画面。合計や回数などを振り返れます。"
      ],
      [
        "時間別の記録を並べて見る。",
        "直近の数分から長期間まで、期間別のベスト記録を比較できます。"
      ],
      [
        "直近のプレイ履歴。",
        "カラメル到達による終了など、直近の結果を確認できます。"
      ]
    ],
    "en": [
      [
        "Watch every scoop count.",
        "Drag to scoop the pudding, then decide whether to stop before reaching caramel. See the game in action."
      ],
      [
        "Stop here—or scoop again?",
        "The stop confirmation offers a choice between ending the run and taking another scoop."
      ],
      [
        "See the numbers behind each run.",
        "The History screen shows totals, scoop counts, averages, and personal records."
      ],
      [
        "A safe stop, a result to keep.",
        "A returned-safely result summarizes your total, scoop count, average, and best."
      ],
      [
        "See your best by time period.",
        "Compare records from recent minutes to longer periods on the History screen."
      ],
      [
        "Look back at the latest runs.",
        "Recent entries include caramel encounters and the scores and scoop counts from each run."
      ]
    ]
  }
};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["Jeder Löffel zählt.","Ziehe über den Pudding und schöpfe ihn Stück für Stück. Entscheide, ob du vor dem Karamell aufhörst oder weitermachst. Das Video zeigt eine kurze Spielrunde."],["Jetzt aufhören oder noch einmal schöpfen?","Im Dialog „Stop here?“ entscheidest du, ob du die Runde beendest oder noch einmal schöpfst."],["Sicher aufgehört? Sieh dir dein Ergebnis an.","Nach einem sicheren Stopp zeigt der Ergebnisbildschirm die Gesamtpunktzahl, die Anzahl der Löffel, den Durchschnitt und den Bestwert."],["Karamell erreicht – die Runde ist vorbei.","Der Ergebnisbildschirm „Reached caramel“ zeigt nach einer gescheiterten Runde deine Punktzahl und die Anzahl der Löffel."],["Verlauf und Anleitung im Menü.","Im Menü findest du den Verlauf, eine Spielanleitung und Optionen zum Kopieren deiner Aufzeichnungen."],["Sieh deine gesammelten Ergebnisse an.","Der Verlauf zeigt die Gesamtpunktzahl, die Anzahl der Löffel, den Durchschnitt und persönliche Bestwerte."],["Vergleiche Bestwerte nach Zeitraum.","Vergleiche Bestwerte für die letzten 5, 10 oder 30 Minuten sowie längere Zeiträume."],["Blicke auf die letzten Runden zurück.","Sieh dir sichere Stopps und Runden mit erreichtem Karamell samt ihren Ergebnissen an."]],"us":[["Jeder Löffel zählt.","Sieh das Spiel in Aktion: Schöpfe den Pudding per Ziehbewegung und entscheide, ob du vor dem Karamell aufhörst."],["Jetzt aufhören oder weiterschöpfen?","Im Bestätigungsdialog entscheidest du, ob du die Runde beendest oder noch einmal schöpfst."],["Die Zahlen hinter jeder Runde.","Der Verlauf zeigt Gesamtpunktzahlen, die Anzahl der Löffel, Durchschnittswerte und persönliche Rekorde."],["Sicher gestoppt, Ergebnis gesichert.","Nach einem sicheren Stopp siehst du die Gesamtpunktzahl, die Anzahl der Löffel, den Durchschnitt und den Bestwert."],["Deine Bestwerte nach Zeitraum.","Vergleiche deine Rekorde im Verlauf – von den letzten Minuten bis zu längeren Zeiträumen."],["Deine letzten Spielrunden.","Der Verlauf zeigt auch Runden, die am Karamell endeten, mit Punktzahl und Anzahl der Löffel."]]},"ar-SA":{"jp":[["راقب كل ملعقة من البودينغ.","اسحب لتغرف البودينغ شيئًا فشيئًا، ثم قرّر هل تتوقف قبل ظهور الكراميل أم تواصل. هذا مقطع قصير من اللعب."],["هل تتوقف الآن أم تغرف مرة أخرى؟","تتيح لك شاشة «Stop here?» الاختيار بين إنهاء الجولة أو متابعة الغرف."],["توقفت بأمان؟ راجع نتيجتك.","تعرض شاشة النتيجة بعد التوقف الآمن المجموع وعدد الملاعق والمتوسط وأفضل نتيجة."],["عند الوصول إلى الكراميل تنتهي الجولة.","تعرض شاشة «Reached caramel» نتيجة الجولة غير الناجحة، بما فيها النقاط وعدد الملاعق."],["السجل وطريقة اللعب في القائمة.","تضم القائمة السجل وإرشادات اللعب وخيارات نسخ السجلات."],["راجع مجموعك وأرقامك القياسية.","تعرض شاشة السجل مجموع النقاط وعدد الملاعق والمتوسط وأفضل النتائج."],["قارن أفضل نتائجك حسب الفترة.","قارن أرقامك القياسية خلال آخر ٥ أو ١٠ أو ٣٠ دقيقة، أو عبر فترات أطول."],["راجع نتائج الجولات الأخيرة.","اطّلع على الجولات التي انتهت بأمان أو عند الكراميل مع نتائج كل جولة."]],"us":[["راقب كل ملعقة من البودينغ.","شاهد اللعب الفعلي: اسحب لتغرف البودينغ، ثم قرّر هل تتوقف قبل الوصول إلى الكراميل."],["هل تتوقف هنا أم تغرف مجددًا؟","تتيح لك شاشة التأكيد الاختيار بين إنهاء الجولة وغرف ملعقة أخرى."],["الأرقام وراء كل جولة.","تعرض شاشة السجل مجموع النقاط وعدد الملاعق والمتوسط والأرقام القياسية الشخصية."],["توقف آمن ونتيجة محفوظة.","تعرض نتيجة التوقف الآمن المجموع وعدد الملاعق والمتوسط وأفضل نتيجة."],["أفضل نتائجك حسب الفترة الزمنية.","قارن الأرقام القياسية من الدقائق الأخيرة إلى الفترات الأطول على شاشة السجل."],["استرجع أحدث جولاتك.","تشمل السجلات الأخيرة جولات الوصول إلى الكراميل مع النقاط وعدد الملاعق في كل جولة."]]},"es-MX":{"jp":[["Cada cucharada cuenta.","Desliza para sacar el pudín poco a poco. Decide si parar antes de que aparezca el caramelo o seguir. El video muestra una partida breve."],["¿Paras aquí o sacas otra cucharada?","En la pantalla «Stop here?» puedes terminar la partida o sacar una cucharada más."],["Terminaste a tiempo: revisa tu resultado.","Si paras antes de llegar al caramelo, verás el total, el número de cucharadas, el promedio y tu mejor resultado."],["Si llegas al caramelo, termina la partida.","La pantalla «Reached caramel» muestra el puntaje y las cucharadas de la partida que terminó al llegar al caramelo."],["Encuentra el historial y las instrucciones.","En el menú puedes consultar el historial, ver cómo jugar y copiar tus registros."],["Revisa tus cucharadas y tus récords.","La pantalla Historial muestra el puntaje total, el número de cucharadas, el promedio y los mejores resultados."],["Compara tus récords por periodo.","Consulta los mejores resultados de los últimos 5, 10 o 30 minutos y de periodos más largos."],["Mira los resultados recientes.","Revisa las partidas que terminaste a salvo o en las que llegaste al caramelo, junto con sus resultados."]],"us":[["Cada cucharada cuenta.","Mira el juego en acción: desliza para sacar el pudín y decide si parar antes de llegar al caramelo."],["¿Paras aquí o sacas otra cucharada?","La confirmación te permite terminar la partida o continuar con otra cucharada."],["Los números de cada partida.","El Historial muestra puntos totales, cucharadas, promedios y récords personales."],["Una parada a tiempo, un resultado guardado.","El resultado de una parada segura resume el total, las cucharadas, el promedio y el mejor puntaje."],["Consulta tus récords por periodo.","Compara tus marcas en el Historial, desde los minutos recientes hasta periodos más largos."],["Repasa tus últimas partidas.","El historial reciente incluye las partidas que llegaron al caramelo, con sus puntajes y cucharadas."]]},"es-ES":{"jp":[["Cada cucharada cuenta.","Arrastra para sacar el pudin poco a poco. Decide si detenerte antes de que aparezca el caramelo o continuar. El vídeo muestra una partida breve."],["¿Lo dejas aquí o sacas otra cucharada?","En la pantalla «Stop here?» puedes terminar la partida o sacar una cucharada más."],["Has parado a tiempo: comprueba el resultado.","Si te detienes antes de llegar al caramelo, verás el total, el número de cucharadas, la media y tu mejor resultado."],["Si llegas al caramelo, la partida termina.","La pantalla «Reached caramel» muestra la puntuación y las cucharadas de la partida que terminó al llegar al caramelo."],["Consulta el historial y las instrucciones.","Desde el menú puedes ver el historial, consultar cómo jugar y copiar tus registros."],["Revisa tus cucharadas y tus récords.","El Historial muestra la puntuación total, el número de cucharadas, la media y las mejores marcas."],["Compara tus récords por periodos.","Consulta las mejores marcas de los últimos 5, 10 o 30 minutos y de periodos más largos."],["Repasa los resultados recientes.","Consulta las partidas que acabaron a salvo o al llegar al caramelo, con los resultados de cada una."]],"us":[["Cada cucharada cuenta.","Mira cómo se juega: arrastra para sacar el pudin y decide si detenerte antes de llegar al caramelo."],["¿Te detienes o sacas otra cucharada?","La confirmación permite terminar la partida o continuar con otra cucharada."],["Las cifras de cada partida.","El Historial muestra las puntuaciones totales, las cucharadas, las medias y los récords personales."],["Una parada a tiempo, un resultado registrado.","El resultado de una parada segura resume el total, las cucharadas, la media y la mejor puntuación."],["Consulta tus récords por periodo.","Compara tus marcas en el Historial, desde los últimos minutos hasta periodos más largos."],["Repasa tus últimas partidas.","El historial reciente incluye partidas que llegaron al caramelo, con sus puntuaciones y cucharadas."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"動画 01 ＋ 実画面 {count}","video":"VIDEO","screen":"実画面","fullscreen":"動画を全画面で見る","enlarge":"画面を拡大","thumbVideo":"動画","thumbScreen":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の項目","next":"次の項目","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"01 VIDEO + {count} SCREENS","video":"VIDEO","screen":"SCREEN","fullscreen":"Watch fullscreen","enlarge":"Enlarge screenshot","thumbVideo":"VIDEO","thumbScreen":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous","next":"Next","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"01 VIDEO + {count} ANSICHTEN","video":"VIDEO","screen":"ANSICHT","fullscreen":"Video im Vollbild ansehen","enlarge":"Screenshot vergrößern","thumbVideo":"VIDEO","thumbScreen":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriges Element","next":"Nächstes Element","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"فيديو 01 + {count} شاشات","video":"فيديو","screen":"الشاشة","fullscreen":"مشاهدة الفيديو بملء الشاشة","enlarge":"تكبير لقطة الشاشة","thumbVideo":"فيديو","thumbScreen":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"العنصر السابق","next":"العنصر التالي","alt":"لقطة شاشة"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VIDEO + {count} PANTALLAS","video":"VIDEO","screen":"PANTALLA","fullscreen":"Ver video en pantalla completa","enlarge":"Ampliar captura","thumbVideo":"VIDEO","thumbScreen":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"01 VÍDEO + {count} PANTALLAS","video":"VÍDEO","screen":"PANTALLA","fullscreen":"Ver el vídeo a pantalla completa","enlarge":"Ampliar captura","thumbVideo":"VÍDEO","thumbScreen":"Captura","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Elemento anterior","next":"Elemento siguiente","alt":"captura de pantalla"}};
  const make = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const requestedLocale = () => document.getElementById('p199-language')?.value || new URLSearchParams(location.search).get('language') || document.documentElement.lang || 'en-US';
  const lang = () => /^ja(?:[-_]|$)/i.test(requestedLocale()) ? 'ja' : 'en';
  const country = () => /^jp$/i.test(document.getElementById('p199-country')?.value || '') ? 'jp' : 'us';
  const state = { manifest:null, selected:0, lang:'', locale:'', region:'', stage:null, scheduled:false, drawing:false };
  function validateManifest(value) {
    if (!value || value.apple_id !== APP || !value.regions) throw Error('MANIFEST_WRONG_APP');
    for (const region of ['us','jp']) {
      const images = value.regions[region];
      if (!Array.isArray(images) || images.length !== (region==='jp'?7:5) || new Set(images).size !== images.length) throw Error('REGION_IMAGE_COUNT_MISMATCH_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region, locale) {
    const japanese = language === 'ja';
    const ui = UI_LABELS[locale] || UI_LABELS[language] || UI_LABELS.en;
    const text = LOCALIZED_CAPTION_COPY[locale]?.[region] || COPY[region][language];
    const stage = make('section','tsz-pudding-stage');
    stage.id = 'tsz-pudding-r25r2';
    stage.dataset.mediaCount = String(images.length+1);
    stage.dataset.screenshotCount = String(images.length);
    const mediaCount=images.length+1;
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-pudding-top');
    top.append(make('span','tsz-pudding-kicker',ui.kicker),
      make('span','tsz-pudding-total',ui.total.replace('{count}',String(images.length).padStart(2,'0'))));
    const layout = make('div','tsz-pudding-layout');
    const visual = make('div','tsz-pudding-visual');
    const video = make('video','tsz-pudding-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-pudding-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-pudding-image-error',ui.imageError);
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-pudding-side');
    side.append(top);
    const editorial = make('div','tsz-pudding-editorial');
    const issue = make('span','tsz-pudding-issue');
    const headline = make('h3','tsz-pudding-headline');
    const body = make('p','tsz-pudding-body');
    // Caption direction only: preserve all player and thumbnail geometry.
    const captionDir = locale === 'ar-SA' ? 'rtl' : 'auto';
    headline.dir = captionDir; body.dir = captionDir;
    editorial.append(issue,headline,body);
    const controls = make('div','tsz-pudding-controls');
    const nav = make('div','tsz-pudding-nav');
    const expand=make('button','tsz-pudding-expand',ui.fullscreen);
    expand.type='button';
    const previous=make('button','tsz-pudding-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-pudding-counter');
    const next=make('button','tsz-pudding-arrow','›');next.type='button';
    previous.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-pudding-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-pudding-thumbs');
    const buttons=[];
    for (let n=0; n<mediaCount; n++) {
      const button=make('button','tsz-pudding-thumb');button.type='button';
      button.title=n===0?(japanese?'動画':(ui.thumbVideo==='VIDEO'?'Video':ui.thumbVideo)):`${ui.thumbScreen} ${n}`;
      button.setAttribute('aria-label',button.title);
      const thumbnail=make('img','');thumbnail.src=images[n===0?0:n-1];thumbnail.loading='lazy';
      thumbnail.referrerPolicy='no-referrer';thumbnail.alt='';
      button.append(thumbnail,make('span','',n===0?ui.thumbVideo:String(n).padStart(2,'0')));
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
    const dialog=make('dialog','tsz-pudding-dialog');
    const dialogClose=make('button','tsz-pudding-dialog-close',ui.close);dialogClose.type='button';
    const dialogImg=make('img','tsz-pudding-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(mediaCount-1,state.selected));
    function show(index) {
      const normalized=(index+mediaCount)%mediaCount;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`PuddingScoop ${ui.alt} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?ui.video:`${ui.screen} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?ui.fullscreen:ui.enlarge;
      counter.textContent=`${String(selected+1).padStart(2,'0')} / ${String(mediaCount).padStart(2,'0')}`;
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
  for (const id of ['p199-language','p199-country']) document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(response=>{
    if(!response.ok) throw Error('MANIFEST_HTTP_'+response.status);
    return response.json();
  }).then(json=>{state.manifest=validateManifest(json);queue();}).catch(err=>{
    holder.dataset.puddingGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('PUDDINGSCOOP_R25R2_LOAD_HOLD',err);
  });
})();
