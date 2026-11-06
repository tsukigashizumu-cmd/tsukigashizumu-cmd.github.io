/* Kizami P19_9R6R9R37R2. Three actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6795788626') return;
  const host=document.getElementById('tsz-kizami-host');
  const holder=document.getElementById('tsz-kizami-gallery');
  if (!host || !holder) return;
  const APP=6795788626;
  const MANIFEST='./tsz-kizami-images.json?v=p19-r37r2';
  const COPY={"jp":{"ja":[["その時間を、自分の記録に。","「寝た」「休んだ」「歩いた」などの行動と、使った分数を選ぶ。今日の記録に、ひとつずつ残せます。"],["積み重ねた時間が、深さになる。","今日の記録を深度表示で眺める。「読んだ10分」「話した15分」などを選ぶと、記録時刻と増えた深さを確かめられます。"],["深さを、身近な目印と比べる。","自由の女神像やロンドン・アイなど、アプリ内の参照点を並べて深さを確認。月別カレンダーから記録した日も振り返れます。"]],"en":[["Choose an action. Mark the minutes.","Select an activity such as sleeping, resting, walking, or reading, then tap how many minutes it took. Today’s records appear below."],["Watch your chosen time turn into depth.","The Depth View layers your entries below the surface. Open one to revisit the action, minutes, time, and added depth."],["Give your depth a familiar reference.","See app reference points such as the Statue of Liberty and London Eye alongside your depth, then browse your records by month."]]},"us":{"ja":[["行動と分数を選んで、時間を記録。","英語版の「Slept」「Rested」「Walked」などから行動を選び、使った分数をタップ。今日の記録が下に並びます。"],["記録した時間を、地下の深さで見る。","「Read 10 min」「Talked 15 min」などの記録が深度表示に積み重なります。各項目の時刻や深さも確認できます。"],["世界の目印と、月別の記録。","自由の女神像やロンドン・アイなどの参照点と深さを比べながら、月別カレンダーで記録日を振り返れます。"]],"en":[["Dig out your own time.","Tap an activity—Slept, Rested, Walked, Read, and more—then choose its duration. See the entries accumulate in Today’s Records."],["Your minutes, shown as depth.","Explore the Depth View as recorded time builds below the surface. Open an entry to see what you did, when, and how much depth it added."],["Compare depths and revisit your month.","Use references such as the Statue of Liberty, London Eye, and Big Ben to see your position, then browse the By Month calendar."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["Mach deine Minuten zu Einträgen.","Wähle eine Tätigkeit wie Schlafen, Ausruhen oder Gehen und die dafür aufgewendeten Minuten. So hältst du jeden Schritt in der heutigen Übersicht fest."],["Gesammelte Zeit wird als Tiefe sichtbar.","Sieh dir deine heutigen Einträge in der Tiefenansicht an. Öffne zum Beispiel „10 Minuten gelesen“ oder „15 Minuten gesprochen“, um Uhrzeit und hinzugekommene Tiefe zu prüfen."],["Vergleiche deine Tiefe mit bekannten Größen.","Nutze Bezugspunkte in der App, etwa die Freiheitsstatue und das London Eye, um deine Tiefe einzuordnen. Über den Monatskalender findest du Tage mit Einträgen wieder."]],"us":[["Halte Aktivität und Dauer fest.","Tippe auf eine Aktivität wie „Slept“, „Rested“ oder „Walked“ und wähle die Minuten. Die Einträge erscheinen darunter in „Today’s Records“."],["Deine Minuten als Schichten unter der Erde.","In der Tiefenansicht sammeln sich Einträge wie „Read 10 min“ und „Talked 15 min“. Öffne sie, um Uhrzeit und hinzugefügte Tiefe zu sehen."],["Tiefe vergleichen, den Monat durchsehen.","Vergleiche deine Tiefe mit der Freiheitsstatue, dem London Eye oder Big Ben. Anschließend kannst du deine aufgezeichneten Tage im Monatskalender durchsehen."]]},"ar-SA":{"jp":[["حوّل وقتك إلى سجلّ شخصي.","اختر نشاطًا مثل النوم أو الراحة أو المشي، ثم حدّد عدد الدقائق التي قضيته فيه. تُضاف أنشطتك واحدًا تلو الآخر إلى سجلّ اليوم."],["تظهر الدقائق المتراكمة على هيئة عمق.","استعرض إدخالات اليوم في عرض العمق. افتح نشاطًا مثل «قرأت 10 دقائق» أو «تحدّثت 15 دقيقة» لمعرفة وقت تسجيله والعمق الذي أضافه."],["قارن عمقك بمعالم مألوفة.","اعرض العمق إلى جانب معالم مرجعية داخل التطبيق مثل تمثال الحرية وعجلة لندن. ويمكنك العودة إلى أيام التسجيل من خلال التقويم الشهري."]],"us":[["سجّل النشاط وعدد الدقائق.","اختر نشاطًا من الخيارات الإنجليزية مثل Slept أو Rested أو Walked، ثم حدّد مدته. ستظهر الإدخالات أسفل الشاشة في Today’s Records."],["شاهد الوقت المسجّل على هيئة عمق.","تتراكم إدخالات مثل Read 10 min وTalked 15 min في عرض العمق. افتح أي إدخال لعرض وقته ومقدار العمق الذي أضافه."],["قارن العمق وراجع أيام الشهر.","استخدم تمثال الحرية وعجلة لندن وبيغ بن كمعالم مرجعية لمقارنة عمقك، ثم راجع الأيام المسجّلة من التقويم الشهري."]]},"es-MX":{"jp":[["Registra los minutos que dedicas a cada actividad.","En la app en japonés, elige una actividad como dormir, descansar, caminar o leer. Marca los minutos y revisa los registros de hoy."],["Tus minutos se convierten en profundidad.","La vista de profundidad muestra los registros acumulados bajo la superficie. Abre uno para ver la actividad, los minutos, la hora y la profundidad agregada."],["Compara tu profundidad y revisa el mes.","Consulta referencias de la app, como la Estatua de la Libertad y el London Eye, junto a tu profundidad. El calendario mensual te permite volver a los días registrados."]],"us":[["Elige una actividad y registra su duración.","En la app en inglés, toca Slept, Rested, Walked o Read, elige los minutos y revisa los registros en Today’s Records."],["Mira cómo el tiempo registrado forma profundidad.","Explora la vista Depth View y abre una entrada para conocer la actividad, la hora, los minutos y la profundidad que agregó."],["Usa referencias conocidas y consulta tus registros.","Compara tu profundidad con referencias como la Estatua de la Libertad, el London Eye y el Big Ben. Después, explora el calendario By Month."]]},"es-ES":{"jp":[["Anota los minutos de cada actividad.","En la aplicación en japonés, selecciona una actividad como dormir, descansar, caminar o leer. Indica los minutos y consulta los registros del día."],["El tiempo acumulado se representa como profundidad.","La vista de profundidad muestra tus anotaciones bajo la superficie. Abre una para comprobar la actividad, los minutos, la hora y la profundidad añadida."],["Compara profundidades y repasa el mes.","Observa referencias de la aplicación, como la Estatua de la Libertad y el London Eye, junto a tu profundidad. Consulta también los días del calendario mensual."]],"us":[["Selecciona una actividad y su duración.","En la aplicación en inglés, pulsa Slept, Rested, Walked o Read, indica los minutos y consulta la lista Today’s Records."],["Tus minutos aparecen como profundidad.","En Depth View, el tiempo registrado se acumula bajo la superficie. Abre una entrada para revisar qué hiciste, cuándo y la profundidad que añadió."],["Compara tu profundidad y revisa el calendario.","Utiliza referencias como la Estatua de la Libertad, el London Eye y el Big Ben para comparar profundidades. Después, consulta las entradas de By Month."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura de pantalla","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura de pantalla","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  // Preserve the URL language until the user explicitly selects another language.
  let languageTouched=false;
  const requestedLocale=()=>{const p=document.getElementById('p199-language');const selected=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-kizami-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return languageTouched&&selected?selected:(['de-DE','ar-SA'].includes(selected)?selected:query||selected||navigator.language||'en-US');};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-kizami-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-kizami-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length, copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const stage=make('section','tsz-kizami-stage');stage.id='tsz-kizami-r37r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-kizami-top');
    top.append(make('span','tsz-kizami-kicker',ui.kicker),make('span','tsz-kizami-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-kizami-layout');
    const visual=make('div','tsz-kizami-visual');
    const picture=make('img','tsz-kizami-image');picture.loading='eager';
    const error=make('p','tsz-kizami-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-kizami-side');side.append(top);
    const editorial=make('div','tsz-kizami-editorial');
    const issue=make('span','tsz-kizami-issue');const headline=make('h3','tsz-kizami-headline');const body=make('p','tsz-kizami-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-kizami-controls');
    const nav=make('div','tsz-kizami-nav');const expand=make('button','tsz-kizami-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-kizami-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-kizami-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-kizami-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-kizami-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-kizami-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-kizami-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-kizami-dialog');
    const close=make('button','tsz-kizami-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-kizami-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Kizami ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
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
    const l=lang(),r=country(),locale=requestedLocale();if(state.stage?.isConnected&&l===state.lang&&r===state.region&&locale===state.locale)return;
    state.lang=l;state.region=r;state.locale=locale;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],l,r,locale);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  // Standalone gallery: do not observe and recursively redraw the gallery itself.
  const main=document.getElementById('p199-content');
  const shell=document.querySelector('.p19-shell');
  const footer=shell?.querySelector('footer.p19-footer');
  function positionHost(){
    const prior=host.dataset.legacyLoaded;
    const loaded=!!main&&!main.hidden;
    host.dataset.legacyLoaded=String(loaded);
    if(loaded){const layout=main.querySelector('.p199-layout');if(layout&&host.parentNode!==main)main.insertBefore(host,layout);}
    else if(shell&&footer&&host.parentNode!==shell)shell.insertBefore(host,footer);
    if(prior!==host.dataset.legacyLoaded)queue();
  }
  if(main)new MutationObserver(positionHost).observe(main,{attributes:true,attributeFilter:['hidden']});
  positionHost();
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-kizami-language');const c=document.getElementById('tsz-kizami-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-kizami-language','tsz-kizami-country'])document.getElementById(id)?.addEventListener('change',event=>{if((id==='p199-language'||id==='tsz-kizami-language')&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.kizamiGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-kizami-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('QUIETRESERVE_R37R2_LOAD_HOLD',err);});
})();
