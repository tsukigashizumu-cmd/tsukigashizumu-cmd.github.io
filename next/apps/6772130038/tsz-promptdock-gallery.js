/* PromptDock AI P19_9R6R9R29R3. Three exact Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p19AppId !== '6772130038') return;
  const holder=document.getElementById('tsz-promptdock-gallery');
  if (!holder) return;
  const APP=6772130038;
  const MANIFEST='./tsz-promptdock-images.json?v=p19-r29r3';
  const COPY={"jp":{"ja":[["使い方が、ひと目でわかる。","テンプレート選択、項目入力、プロンプト生成、コピーやChatGPTへの移動まで。最初に使い方を確認できるガイド画面。"],["用途から、テンプレートを選ぶ。","App Store文章、X投稿、YouTube Shortsタイトル、SwiftUIエラー修正など。使いたい形を一覧から選択。"],["入力から、使えるプロンプトへ。","必要な項目を埋めて生成。結果をコピーしたりChatGPTで開いたりでき、プロンプト履歴にも残る画面。"]],"en":[["See the flow before you begin.","The Japanese quick-start guide shows template selection, entering fields, generating a prompt, and copying or opening ChatGPT."],["Choose a template for the job.","The Japanese template list includes App Store copy, X posts, YouTube Shorts titles, SwiftUI error fixes, and more."],["Turn fields into a reusable prompt.","Fill in the details, generate the structured prompt, then copy it or open ChatGPT. The history appears below the output."]]},"us":{"ja":[["まずは、使い方を確認。","英語版のクイックガイド。テンプレートを選び、項目を入力して生成。コピーやChatGPTへの移動までの流れが分かる。"],["書きたいものから選ぶ。","英語版のテンプレート一覧。App Store Copy、X Post、YouTube Shorts Title、SwiftUI Error Fixなどが並ぶ。"],["生成・コピー・履歴まで。","入力欄からプロンプトを生成。CopyとChatGPTボタンがあり、生成結果の下で過去の履歴も確認できる。"]],"en":[["A quick start, from start to finish.","Pick a template, fill in the fields, generate a prompt, then copy it or open ChatGPT. The guide explains the steps at a glance."],["Templates for familiar tasks.","Browse App Store Copy, X Post, YouTube Shorts Title, SwiftUI Error Fix, Localization, Image Prompt, and custom templates."],["Generate once. Copy or revisit.","Enter the details, create a structured prompt, copy it or open ChatGPT, then find the result in your prompt history."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["So funktioniert es – auf einen Blick.","Die japanische Kurzanleitung zeigt, wie du eine Vorlage auswählst, Felder ausfüllst, einen Prompt erstellst und ihn kopierst oder in ChatGPT öffnest."],["Die passende Vorlage für deine Aufgabe.","Die japanische Vorlagenliste enthält unter anderem App-Store-Texte, X-Beiträge, Titel für YouTube Shorts und die Behebung von SwiftUI-Fehlern."],["Aus Eingabefeldern wird ein nutzbarer Prompt.","Trage die Angaben ein und erstelle einen strukturierten Prompt. Kopiere ihn oder öffne ihn in ChatGPT; darunter findest du deinen Prompt-Verlauf."]],"us":[["Ein Schnellstart von Anfang bis Ende.","Wähle eine Vorlage, fülle die Felder aus und erstelle einen Prompt. Anschließend kannst du ihn kopieren oder in ChatGPT öffnen. Die Anleitung zeigt alle Schritte im Überblick."],["Vorlagen für vertraute Aufgaben.","Entdecke App Store Copy, X Post, YouTube Shorts Title, SwiftUI Error Fix, Localization, Image Prompt und eigene Vorlagen."],["Einmal erstellen, später wiederverwenden.","Gib deine Angaben ein, generiere einen strukturierten Prompt und kopiere ihn oder öffne ChatGPT. Im Verlauf findest du ihn später wieder."]]},"ar-SA":{"jp":[["تعرّف على طريقة العمل من النظرة الأولى.","يوضّح الدليل السريع الياباني اختيار القالب، وإدخال الحقول، وإنشاء المطالبة، ثم نسخها أو فتحها في ChatGPT."],["اختر قالبًا يناسب مهمتك.","تتضمن قائمة القوالب اليابانية نصوص App Store ومنشورات X وعناوين YouTube Shorts وإصلاح أخطاء SwiftUI وغير ذلك."],["حوّل الحقول إلى مطالبة جاهزة للاستخدام.","أدخل التفاصيل وأنشئ مطالبة منظّمة، ثم انسخها أو افتحها في ChatGPT. يمكنك أيضًا الرجوع إلى سجل المطالبات أسفل النتيجة."]],"us":[["دليل سريع من البداية إلى النهاية.","اختر قالبًا، واملأ الحقول، وأنشئ مطالبة، ثم انسخها أو افتحها في ChatGPT. يوضّح الدليل جميع الخطوات بإيجاز."],["قوالب لمهام تستخدمها باستمرار.","استعرض قوالب App Store Copy وX Post وYouTube Shorts Title وSwiftUI Error Fix وLocalization وImage Prompt، بالإضافة إلى القوالب المخصّصة."],["أنشئ المطالبة ثم انسخها أو عُد إليها.","أدخل التفاصيل وأنشئ مطالبة منظّمة، ثم انسخها أو افتحها في ChatGPT. وستجد النتيجة لاحقًا في سجل المطالبات."]]},"es-MX":{"jp":[["Conoce el proceso de principio a fin.","La guía rápida en japonés muestra cómo elegir una plantilla, llenar los campos, generar un prompt y copiarlo o abrirlo en ChatGPT."],["Elige una plantilla para lo que necesitas.","La lista en japonés incluye textos para App Store, publicaciones en X, títulos para YouTube Shorts y correcciones de errores de SwiftUI."],["De los campos a un prompt listo para usar.","Completa los datos y genera un prompt estructurado. Cópialo o ábrelo en ChatGPT; también puedes consultar el historial debajo del resultado."]],"us":[["Empieza en unos cuantos pasos.","Elige una plantilla, llena los campos, genera el prompt y luego cópialo o ábrelo en ChatGPT. La guía resume todo el proceso."],["Plantillas para tareas cotidianas.","Explora App Store Copy, X Post, YouTube Shorts Title, SwiftUI Error Fix, Localization, Image Prompt y plantillas personalizadas."],["Genera, copia y vuelve a consultarlo.","Ingresa los datos, crea un prompt estructurado, cópialo o ábrelo en ChatGPT y recupéralo después desde tu historial."]]},"es-ES":{"jp":[["Descubre cómo funciona de un vistazo.","La guía rápida en japonés muestra cómo elegir una plantilla, rellenar los campos, generar un prompt y copiarlo o abrirlo en ChatGPT."],["Escoge una plantilla para cada tarea.","La lista japonesa incluye textos para App Store, publicaciones en X, títulos para YouTube Shorts y corrección de errores de SwiftUI, entre otras opciones."],["Convierte los datos en un prompt útil.","Rellena los campos y genera un prompt estructurado. Cópialo o ábrelo en ChatGPT y consulta el historial debajo del resultado."]],"us":[["Guía rápida, de principio a fin.","Elige una plantilla, rellena los campos y genera un prompt. Después, cópialo o ábrelo en ChatGPT. La guía reúne todos los pasos."],["Plantillas para tareas habituales.","Explora App Store Copy, X Post, YouTube Shorts Title, SwiftUI Error Fix, Localization, Image Prompt y plantillas personalizadas."],["Crea el prompt y recupéralo cuando quieras.","Introduce los datos, genera un prompt estructurado, cópialo o ábrelo en ChatGPT y vuelve a encontrarlo en el historial."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面","heading":"見どころを、画面で。","hero":"テンプレートを選び、項目を入力してプロンプトを作成。コピーやChatGPTでの利用、履歴の確認まで、ひとつの流れで。","store":"App Storeで見る","catalog":"アプリ一覧へ戻る"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot","heading":"See it on screen.","hero":"Choose a template, fill in the fields, and generate a reusable prompt. Copy it or open ChatGPT, and revisit your saved history.","store":"View in App Store","catalog":"Browse all apps"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot","heading":"So sieht es in der App aus.","hero":"Wähle eine Vorlage, fülle die Felder aus und erstelle einen wiederverwendbaren Prompt. Kopiere ihn oder öffne ChatGPT und rufe frühere Ergebnisse im Verlauf auf.","store":"Im App Store ansehen","catalog":"Alle Apps ansehen"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة الشاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة","heading":"شاهد طريقة العمل داخل التطبيق.","hero":"اختر قالبًا واملأ الحقول لإنشاء مطالبة قابلة لإعادة الاستخدام. انسخها أو افتحها في ChatGPT، وارجع إلى نتائجك السابقة من السجل.","store":"عرض في App Store","catalog":"استعراض جميع التطبيقات"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla","heading":"Mira cómo funciona, pantalla por pantalla.","hero":"Elige una plantilla, llena los campos y genera un prompt reutilizable. Cópialo o ábrelo en ChatGPT y vuelve a consultar tu historial.","store":"Ver en App Store","catalog":"Ver todas las apps"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla","heading":"Así se utiliza, paso a paso.","hero":"Elige una plantilla, rellena los campos y genera un prompt reutilizable. Cópialo o ábrelo en ChatGPT y consulta tus resultados anteriores en el historial.","store":"Ver en el App Store","catalog":"Ver todas las apps"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  // Before a user changes the legacy language selector, an explicit ?language= takes priority.
  // Afterwards an actual selector change wins. This also supports pages whose legacy
  // select exposes only ja/en without inventing new options in the page.
  let languageTouched=false;
  const requestedLocale=()=>{const selected=document.getElementById('p19-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return (languageTouched&&selected?selected:(selected==='de-DE'||selected==='ar-SA'?selected:query||selected||document.documentElement.lang||'en-US'));};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const v=(document.getElementById('p19-region')?.value||'').toLowerCase();return v==='jp'||v==='jpn'||v==='japan'?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  // R29R3: the legacy #p19-detail remains hidden when app-detail.js cannot finish.
  // This gallery must not live inside that hidden ancestor. Keep a working fallback
  // hero and local screenshots independent of remote catalogue/description lookups.
  const feature=document.getElementById('tsz-promptdock-feature');
  const fallback=document.getElementById('tsz-promptdock-safe-hero');
  const detail=document.getElementById('p19-detail');
  const load=document.getElementById('p19-load');
  const jcopy={
    ja:'テンプレートを選び、項目を入力してプロンプトを作成。コピーやChatGPTでの利用、履歴の確認まで、ひとつの流れで。',
    en:'Choose a template, fill in the fields, and generate a reusable prompt. Copy it or open ChatGPT, and revisit your saved history.'
  };
  function ensureLegacySelectors(){
    // Only add fallback choices if the old loader left the selectors empty.
    const l=document.getElementById('p19-language');
    const r=document.getElementById('p19-region');
    if(l && l.options.length===0){
      l.add(new Option('日本語','ja'));
      l.add(new Option('English','en'));
      l.value=/^ja/i.test(navigator.language||'')?'ja':'en';
    }
    if(r && r.options.length===0){
      r.add(new Option('日本 (JP)','jp'));
      r.add(new Option('United States (US)','us'));
      r.value=/^ja/i.test(navigator.language||'')?'jp':'us';
    }
  }
  function syncLegacyPlacement(){
    if(!detail || !feature || !fallback)return;
    const originalReady=!detail.hidden;
    fallback.hidden=originalReady;
    document.body.classList.toggle('tsz-promptdock-fallback-ready',!originalReady && !!state.manifest);
    if(originalReady){
      const before=detail.querySelector('.p193-section-interlude');
      if(before && feature.nextElementSibling!==before)before.before(feature);
    }else{
      // Outside hidden #p19-detail so there is always a visible gallery.
      if(fallback.nextElementSibling!==feature)fallback.after(feature);
      ensureLegacySelectors();
    }
    const l=lang(), ui=UI_LABELS[requestedLocale()]||UI_LABELS[l];
    const description=document.getElementById('tsz-promptdock-safe-description');
    if(description)description.textContent=ui.hero;
    const primary=document.getElementById('tsz-promptdock-safe-store');
    if(primary){
      primary.textContent=ui.store;
      primary.href='https://apps.apple.com/'+(country()==='jp'?'jp':'us')+'/app/id6772130038';
    }
    const catalog=document.getElementById('tsz-promptdock-safe-catalog');
    if(catalog)catalog.textContent=ui.catalog;
    if(state.manifest && !originalReady && load)load.setAttribute('data-tsz-gallery-ready','yes');
  }
  if(detail)new MutationObserver(syncLegacyPlacement).observe(detail,{attributes:true,attributeFilter:['hidden']});
  document.getElementById('p19-language')?.addEventListener('change',event=>{if(event.isTrusted)languageTouched=true;syncLegacyPlacement();});
  document.getElementById('p19-region')?.addEventListener('change',syncLegacyPlacement);
  ensureLegacySelectors();
  syncLegacyPlacement();

  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-promptdock-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length;
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const stage=make('section','tsz-promptdock-stage');stage.id='tsz-promptdock-r29r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-promptdock-top');
    top.append(make('span','tsz-promptdock-kicker',ui.kicker),make('span','tsz-promptdock-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-promptdock-layout');
    const visual=make('div','tsz-promptdock-visual');
    const picture=make('img','tsz-promptdock-image');picture.loading='eager';
    const error=make('p','tsz-promptdock-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-promptdock-side');side.append(top);
    const editorial=make('div','tsz-promptdock-editorial');
    const issue=make('span','tsz-promptdock-issue');const headline=make('h3','tsz-promptdock-headline');const body=make('p','tsz-promptdock-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-promptdock-controls');
    const nav=make('div','tsz-promptdock-nav');const expand=make('button','tsz-promptdock-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-promptdock-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-promptdock-counter');
    const next=make('button','tsz-promptdock-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-promptdock-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-promptdock-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-promptdock-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-promptdock-dialog');
    const close=make('button','tsz-promptdock-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-promptdock-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`PromptDock AI ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
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
    state.lang=l;state.region=r;state.locale=locale;const ui=UI_LABELS[locale]||UI_LABELS[l]||UI_LABELS.en;const title=document.getElementById('tsz-promptdock-heading');if(title)title.textContent=ui.heading;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],l,r,locale);holder.replaceChildren(state.stage);syncLegacyPlacement();const legacy=document.getElementById('screens');if(legacy){legacy.dataset.promptdockSuperseded='yes';}document.querySelectorAll('a[href="#screens"]').forEach(a=>a.setAttribute('href','#tsz-promptdock-feature'));}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  new MutationObserver(queue).observe(holder,{childList:true});
  for(const id of ['p19-language','p19-region'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.promptdockGalleryError=String(err?.message||'MANIFEST_FAILED');console.error('PROMPTDOCK_R29R3_LOAD_HOLD',err);if(load)load.setAttribute('data-tsz-gallery-ready','yes');if(holder){holder.textContent='Gallery assets could not be loaded; the App Store link remains available.';}});
})();
