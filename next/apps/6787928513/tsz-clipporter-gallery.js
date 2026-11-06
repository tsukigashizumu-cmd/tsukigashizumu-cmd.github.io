/* ClipPorter P19_9R6R9R35R2. Three Mac screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6787928513') return;
  const host=document.getElementById('tsz-clipporter-host');
  const holder=document.getElementById('tsz-clipporter-gallery');
  if (!host || !holder) return;
  const APP=6787928513;
  const MANIFEST='./tsz-clipporter-images.json?v=p19-r35r2';
  const COPY={"jp":{"ja":[["MOVを選んで、書き出しを準備。","Mac画面の左側でMOVを選択し、動画の長さやiPhone向けの出力サイズ、元ファイルの保存方法を設定できます。"],["映像を見ながら、開始と終了を決める。","取り込んだ動画を大きく再生し、下部の開始・終了位置を調整。書き出したい範囲を確認します。"],["必要な場面だけ、MP4に。","動画の一場面をプレビューしながら、開始・終了を絞り込み、MP4書き出しボタンへ進みます。"]],"en":[["Choose a MOV and prepare your export.","Import a recording on your Mac, then set the clip-length options, portrait output size, and whether to keep the original."],["Review your start and end points.","Preview the imported recording and adjust the start and end controls beneath the video to choose a precise range."],["Keep the part you want to show.","Inspect the selected section of the recording, fine-tune its boundaries, and prepare the MP4 export."]]},"us":{"ja":[["MOVを読み込んで、設定を選ぶ。","Mac用アプリの初期画面。MOVの選択、動画時間の調整、iPhone縦向きサイズ、元ファイル保存などを指定できます。"],["プレビューと時間範囲を確認。","読み込んだ動画が大きく表示され、開始・終了の位置と書き出す長さを選択できます。"],["短い区間に絞って書き出す。","プレビューの中から必要な部分だけを選び、範囲を確認してMP4書き出しを準備します。"]],"en":[["Start with the original MOV.","Choose a screen recording, select the portrait export size, and decide how to handle the original file."],["See the recording and set its range.","Use the large preview and timeline controls to choose the beginning and end of your App Preview clip."],["Trim down to the moment that matters.","Fine-tune a short excerpt and use the MP4 export control to prepare the selected portion."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["MOV auswählen und Export vorbereiten.","Wähle im linken Bereich der Mac-App eine MOV-Datei und lege die Videolänge, die Hochkant-Auflösung fürs iPhone und den Umgang mit der Originaldatei fest."],["Start und Ende beim Ansehen festlegen.","Sieh dir das importierte Video in der großen Vorschau an. Mit den Reglern darunter bestimmst du Anfang und Ende des gewünschten Ausschnitts."],["Nur den gewünschten Ausschnitt als MP4.","Prüfe die Szene in der Vorschau, verfeinere die Schnittpunkte und bereite den Export als MP4-Datei vor."]],"us":[["Mit der MOV-Originaldatei beginnen.","Wähle eine Bildschirmaufnahme, lege die Hochkant-Ausgabegröße fest und entscheide, was mit der Originaldatei geschehen soll."],["Aufnahme prüfen und Bereich setzen.","Nutze die große Vorschau und die Zeitleistensteuerung, um Beginn und Ende deines App-Preview-Clips festzulegen."],["Auf den entscheidenden Moment kürzen.","Passe einen kurzen Ausschnitt präzise an und bereite ihn über die MP4-Exportfunktion für die Ausgabe vor."]]},"ar-SA":{"jp":[["اختر ملف MOV وجهّز التصدير.","اختر ملف MOV من الجانب الأيسر في تطبيق Mac، ثم اضبط مدة الفيديو ومقاس الإخراج العمودي المناسب لـ iPhone وطريقة الاحتفاظ بالملف الأصلي."],["حدّد البداية والنهاية أثناء المعاينة.","شاهد الفيديو المستورد في نافذة المعاينة الكبيرة، ثم اضبط نقطتي البداية والنهاية باستخدام عناصر التحكم الموجودة أسفله."],["صدّر الجزء المطلوب فقط بصيغة MP4.","راجع المشهد في المعاينة، واضبط حدود المقطع بدقة، ثم جهّز تصديره بصيغة MP4."]],"us":[["ابدأ بملف MOV الأصلي.","اختر تسجيل شاشة، وحدّد حجم الإخراج العمودي، ثم قرّر كيفية التعامل مع الملف الأصلي."],["عاين التسجيل وحدّد نطاقه.","استخدم المعاينة الكبيرة وعناصر التحكم على الخط الزمني لتحديد بداية مقطع معاينة التطبيق ونهايته."],["احتفظ باللحظة الأهم فقط.","اضبط مقتطفًا قصيرًا بدقة، ثم استخدم خيار تصدير MP4 لتجهيز الجزء المحدّد."]]},"es-MX":{"jp":[["Elige un MOV y prepara la exportación.","Selecciona un video MOV en tu Mac. Ajusta la duración del clip, el tamaño vertical para iPhone y qué hacer con el archivo original."],["Revisa el video y define dónde cortar.","Reproduce la grabación en la vista previa y ajusta los controles de inicio y fin para elegir el fragmento que necesitas."],["Exporta solo el segmento que importa.","Comprueba la escena seleccionada, afina el punto de inicio y el de fin y deja listo el archivo para exportarlo como MP4."]],"us":[["Empieza con tu archivo MOV.","Elige una grabación de pantalla, selecciona el tamaño vertical de salida y decide si quieres conservar el archivo original."],["Mira la grabación y elige el tramo.","Usa la vista previa y los controles de tiempo para marcar el inicio y el fin del video que quieres mostrar en App Store."],["Quédate con el momento que necesitas.","Ajusta un fragmento corto de la grabación y usa el botón de exportación a MP4 para preparar el resultado."]]},"es-ES":{"jp":[["Selecciona un MOV y prepara la exportación.","Importa un vídeo MOV en tu Mac. Configura la duración, el tamaño vertical para iPhone y si quieres conservar el archivo original."],["Previsualiza y marca el inicio y el final.","Reproduce la grabación en la vista previa y ajusta los controles de inicio y fin para delimitar el fragmento que quieres utilizar."],["Prepara solo el fragmento para MP4.","Comprueba la escena seleccionada, ajusta los puntos de corte y deja preparado el vídeo para exportarlo en MP4."]],"us":[["Empieza por el MOV original.","Elige una grabación de pantalla, selecciona el tamaño vertical de salida y decide cómo gestionar el archivo original."],["Visualiza y delimita el fragmento.","Utiliza la vista previa y los controles de tiempo para elegir el inicio y el final del vídeo que mostrarás en la App Store."],["Recorta hasta quedarte con lo esencial.","Afina un fragmento breve de la grabación y utiliza el control de exportación a MP4 para preparar la selección."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  // URL locale remains authoritative until the user changes the selector.
  let languageTouched=false;
  const requestedLocale=()=>{const p=document.getElementById('p199-language');const selected=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-clipporter-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return languageTouched&&selected?selected:(['de-DE','ar-SA'].includes(selected)?selected:query||selected||navigator.language||'en-US');};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-clipporter-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-clipporter-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length, copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const stage=make('section','tsz-clipporter-stage');stage.id='tsz-clipporter-r35r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-clipporter-top');
    top.append(make('span','tsz-clipporter-kicker',ui.kicker),make('span','tsz-clipporter-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-clipporter-layout');
    const visual=make('div','tsz-clipporter-visual');
    const picture=make('img','tsz-clipporter-image');picture.loading='eager';
    const error=make('p','tsz-clipporter-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-clipporter-side');side.append(top);
    const editorial=make('div','tsz-clipporter-editorial');
    const issue=make('span','tsz-clipporter-issue');const headline=make('h3','tsz-clipporter-headline');const body=make('p','tsz-clipporter-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-clipporter-controls');
    const nav=make('div','tsz-clipporter-nav');const expand=make('button','tsz-clipporter-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-clipporter-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-clipporter-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-clipporter-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-clipporter-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-clipporter-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-clipporter-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-clipporter-dialog');
    const close=make('button','tsz-clipporter-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-clipporter-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`ClipPorter ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
      issue.textContent=`${ui.screen} ${String(selected+1).padStart(2,'0')}`;
      headline.textContent=copy[selected][0];body.textContent=copy[selected][1];
      counter.textContent=`${String(selected+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
      buttons.forEach((button,n)=>{const active=n===selected;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected=String(selected);
      if(document.activeElement===prev||document.activeElement===next||buttons.includes(document.activeElement))buttons[selected].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
    }
    expand.addEventListener('click',()=>{full.src=images[selected];full.alt=picture.alt;dialog.showModal();});
    prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));
        if(buttons.includes(e.target))buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);return stage;
  }
  function redraw(){state.scheduled=false;if(state.drawing||!state.manifest)return;
    const l=lang(),r=country(),locale=requestedLocale();const fallbackStore=host.querySelector('.tsz-clipporter-fallback a');if(fallbackStore)fallbackStore.href=`https://apps.apple.com/${r}/app/id${APP}`;if(state.stage?.isConnected&&l===state.lang&&r===state.region&&locale===state.locale)return;
    state.lang=l;state.region=r;state.locale=locale;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],l,r,locale);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  // Standalone gallery: do not observe and recursively redraw the gallery itself.
  const main=document.getElementById('p199-content');
  const shell=document.querySelector('.p19-shell');
  const footer=shell?.querySelector('footer.p19-footer');
  function positionHost(){
    const loaded=!!main&&!main.hidden;
    host.dataset.legacyLoaded=String(loaded);
    if(loaded){const layout=main.querySelector('.p199-layout');if(layout&&host.parentNode!==main)main.insertBefore(host,layout);}
    else if(shell&&footer&&host.parentNode!==shell)shell.insertBefore(host,footer);
  }
  if(main)new MutationObserver(positionHost).observe(main,{attributes:true,attributeFilter:['hidden']});
  positionHost();
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-clipporter-language');const c=document.getElementById('tsz-clipporter-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-clipporter-language','tsz-clipporter-country'])document.getElementById(id)?.addEventListener('change',event=>{if((id==='p199-language'||id==='tsz-clipporter-language')&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.clipporterGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-clipporter-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('CLIPPORTER_R35R2_LOAD_HOLD',err);});
})();
