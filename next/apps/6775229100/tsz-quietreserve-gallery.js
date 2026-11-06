/* Quiet Reserve P19_9R6R9R31R2. Four actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6775229100') return;
  const host=document.getElementById('tsz-quietreserve-host');
  const holder=document.getElementById('tsz-quietreserve-gallery');
  if (!host || !holder) return;
  const APP=6775229100;
  const MANIFEST='./tsz-quietreserve-images.json?v=p19-r31r2';
  const COPY={"jp":{"ja":[["疲れた日の理由を、30秒で残す。","人混みや通知、予定変更など、刺激になったことを選んで、今どれくらい余力があるかを記録。長い日記はいりません。"],["今日の記録と、最近の変化。","残っている余力をスライダーで示して保存。昨日と今日の記録を見返し、無理なく自分の状態を確かめられます。"],["水を飲むだけの日も、記録できる。","「水だけ」の表示では項目を絞り、余力のスライダーと保存ボタン、最近の記録をまとめて確認できます。"],["静かに、ひとつだけ残す。","「無音」の表示では、余力を示すスライダーとチェックボタンだけ。何も説明したくないときにも、少ない操作で残せます。"]],"en":[["Save a hard day in 30 seconds.","Choose what wore you down—crowds, notifications, or a change of plans—and mark how much you have left. No long diary required."],["Your current state, beside recent entries.","Move the slider to capture how much energy remains, save the entry, and glance back at recent records."],["Even a “water only” day counts.","A simpler view keeps the energy slider, Save button, and recent entries close together."],["A quiet way to leave a mark.","Silent mode pares the screen down to one slider and a check button, so a short note takes only a gesture."]]},"us":{"ja":[["疲れた日を、30秒で記録。","人混み、通知、予定変更などの刺激を選び、今どのくらい余力が残っているかをスライダーで示します。"],["余力を保存し、記録を振り返る。","残っている余力をスライダーで選び、保存。最近の記録がその下に並び、昨日と今日の変化が分かります。"],["必要なことだけのシンプルな画面。","「Water only」表示では、余力スライダー、保存、最近の記録に絞って見られます。"],["文字を減らして、静かに記録。","「Silent」表示では、スライダーとチェックボタンが中心。話したくない日にも短く残せます。"]],"en":[["Save a vaguely tired day in 30 seconds.","Choose a recent trigger—crowds, notifications, a change of plans—and slide to show how much you have left."],["Track what remains, not what is missing.","Record how much energy is left, save with one tap, and revisit recent entries below."],["Keep it as simple as you need.","The Water only view keeps the remaining-energy slider, the Save action, and recent entries in focus."],["Less to say. Still a record.","Silent mode offers a slider and a single check button: a minimal way to capture the moment."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["Halte in 30 Sekunden fest, was dich erschöpft hat.","Wähle aus, was dich beansprucht hat – etwa Menschenmengen, Benachrichtigungen oder geänderte Pläne – und halte fest, wie viel Kraft dir noch bleibt. Kein langer Tagebucheintrag nötig."],["Dein heutiger Eintrag und die letzten Tage.","Stelle mit dem Schieberegler ein, wie viel Energie du noch hast, und speichere den Eintrag. Sieh dir die jüngsten Aufzeichnungen an und erkenne Veränderungen von gestern zu heute."],["Auch ein Tag nur mit Wasser zählt.","In der Ansicht „Water only“ beschränkt sich die Oberfläche auf den Energieregler, die Speichern-Schaltfläche und die letzten Einträge."],["Halte einen Moment ganz still fest.","Die Ansicht „Silent“ zeigt im Wesentlichen nur den Energieregler und eine Schaltfläche mit Häkchen. So kannst du etwas festhalten, auch wenn du nichts erklären möchtest."]],"us":[["Halte einen erschöpfenden Tag in 30 Sekunden fest.","Wähle einen Auslöser wie Menschenmengen, Benachrichtigungen oder geänderte Pläne aus und zeige mit dem Schieberegler, wie viel Energie dir noch bleibt."],["Notiere, was noch da ist.","Stelle deine verbleibende Energie ein, speichere sie mit einem Tipp und sieh dir darunter deine letzten Einträge an."],["So einfach, wie du es gerade brauchst.","Die Ansicht „Water only“ konzentriert sich auf den Regler für die verbleibende Energie, die Speicherfunktion und deine letzten Einträge."],["Weniger Worte. Trotzdem ein Eintrag.","In der Ansicht „Silent“ genügen ein Schieberegler und eine Schaltfläche mit Häkchen, um den Moment festzuhalten."]]},"ar-SA":{"jp":[["سجّل سبب إرهاق يومك في 30 ثانية.","اختر ما استنزف طاقتك، مثل الزحام أو الإشعارات أو تغيّر الخطط، ثم سجّل مقدار الطاقة المتبقية لديك. لا حاجة إلى كتابة يوميات طويلة."],["سجّل حالتك اليوم وراجع الأيام الأخيرة.","حرّك شريط التمرير لتحديد ما تبقّى لديك من طاقة ثم احفظ السجل. راجع إدخالاتك الأخيرة ولاحظ ما تغيّر بين الأمس واليوم."],["حتى يوم الاكتفاء بالماء يستحق التسجيل.","تعرض واجهة «Water only» شريط الطاقة وزر الحفظ والسجلات الأخيرة فقط، لتبقى الخطوات بسيطة."],["اترك أثرًا صغيرًا في هدوء.","تعرض واجهة «Silent» شريط الطاقة وزرًا بعلامة صح فحسب تقريبًا، لتسجّل حالتك بأقل قدر من التفاعل عندما لا ترغب في الشرح."]],"us":[["سجّل يومًا متعبًا في 30 ثانية.","اختر سببًا حديثًا للتعب، كالزحام أو الإشعارات أو تغيّر الخطط، ثم حرّك الشريط لتوضيح مقدار الطاقة المتبقية لديك."],["تابع ما تبقّى لديك، لا ما فقدته.","حدّد مقدار طاقتك المتبقية، واحفظه بلمسة واحدة، ثم ارجع إلى سجلاتك الأخيرة أسفل الشاشة."],["بسّط التسجيل بقدر ما تحتاج.","تركّز واجهة «Water only» على شريط الطاقة المتبقية وإجراء الحفظ والسجلات الأخيرة دون عناصر إضافية."],["كلمات أقل، وتسجيل ما زال ممكنًا.","توفّر واجهة «Silent» شريط تمرير وزرًا واحدًا بعلامة صح، لتدوين اللحظة بأبسط طريقة."]]},"es-MX":{"jp":[["Registra lo que te agotó en 30 segundos.","Elige qué te quitó energía, como las multitudes, las notificaciones o un cambio de planes, y señala cuánto ánimo te queda. Sin escribir un diario largo."],["Mira cómo estás hoy y cómo te has sentido.","Ajusta la barra para indicar la energía que te queda, guarda el registro y consulta los días recientes para notar los cambios."],["También cuentan los días de solo agua.","La vista «Solo agua» deja a la mano la barra de energía, el botón Guardar y los registros recientes."],["Un registro breve, sin tener que hablar.","El modo «Silencio» muestra una barra y un botón de verificación. Guarda cómo te sientes con muy pocos pasos."]],"us":[["Anota un día agotador en 30 segundos.","Elige qué te cansó, como el gentío, las alertas o un cambio de planes, y desliza la barra para marcar cuánta energía te queda."],["Registra la energía que todavía tienes.","Indica cuánto te queda, guarda con un toque y revisa tus registros recientes justo debajo."],["Quédate con lo esencial.","En la vista «Solo agua» puedes enfocarte en la barra de energía, el botón Guardar y tus registros recientes."],["Menos palabras, el mismo registro.","El modo «Silencio» ofrece una barra y un botón con una marca de verificación para guardar el momento sin explicarlo."]]},"es-ES":{"jp":[["Apunta qué te ha agotado en 30 segundos.","Elige qué te ha restado energía, como las aglomeraciones, las notificaciones o un cambio de planes, e indica cuántas fuerzas te quedan. Sin escribir un diario interminable."],["Cómo estás hoy y cómo has estado últimamente.","Mueve el control deslizante para señalar la energía que te queda, guarda la entrada y repasa los últimos días para ver los cambios."],["Los días de solo agua también cuentan.","La vista «Solo agua» reúne el control de energía, el botón Guardar y las entradas recientes en una pantalla sencilla."],["Deja constancia sin decir nada más.","El modo «Silencio» se reduce a un control deslizante y un botón de confirmación. Basta un gesto para guardar el momento."]],"us":[["Registra un día de cansancio en 30 segundos.","Elige qué te ha agotado, como las multitudes, los avisos o un cambio de planes, y mueve el control para indicar cuántas fuerzas te quedan."],["Fíjate en la energía que aún conservas.","Indica cuánta energía te queda, guarda con un toque y consulta debajo tus últimas entradas."],["Simplifica todo lo que necesites.","La vista «Solo agua» se centra en el control de energía, la opción Guardar y las entradas recientes."],["Menos que contar, pero queda registrado.","El modo «Silencio» ofrece un control deslizante y un único botón de confirmación para anotar el momento sin explicaciones."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة"},"es-MX":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura","imageError":"No se pudo mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"},"es-ES":{"kicker":"APP / GALERÍA DE PANTALLAS","total":"{count} PANTALLAS","screen":"PANTALLA","enlarge":"Ampliar captura","thumb":"Captura de pantalla","imageError":"No se ha podido mostrar la captura.","close":"Cerrar","prev":"Captura anterior","next":"Captura siguiente","alt":"captura de pantalla"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};

  // The URL locale is authoritative until a real visitor changes a language selector.
  let languageTouched=false;
  const requestedLocale=()=>{const p=document.getElementById('p199-language');const selected=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-quietreserve-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return languageTouched&&selected?selected:(query||selected||navigator.language||'en-US');};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-quietreserve-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==4||new Set(arr).size!==4)throw Error('FOUR_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-quietreserve-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length, copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const stage=make('section','tsz-quietreserve-stage');stage.id='tsz-quietreserve-r31r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-quietreserve-top');
    top.append(make('span','tsz-quietreserve-kicker',ui.kicker),make('span','tsz-quietreserve-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-quietreserve-layout');
    const visual=make('div','tsz-quietreserve-visual');
    const picture=make('img','tsz-quietreserve-image');picture.loading='eager';
    const error=make('p','tsz-quietreserve-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-quietreserve-side');side.append(top);
    const editorial=make('div','tsz-quietreserve-editorial');
    const issue=make('span','tsz-quietreserve-issue');const headline=make('h3','tsz-quietreserve-headline');const body=make('p','tsz-quietreserve-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-quietreserve-controls');
    const nav=make('div','tsz-quietreserve-nav');const expand=make('button','tsz-quietreserve-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-quietreserve-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-quietreserve-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-quietreserve-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-quietreserve-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-quietreserve-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-quietreserve-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-quietreserve-dialog');
    const close=make('button','tsz-quietreserve-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-quietreserve-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Quiet Reserve ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
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
    const loaded=!!main&&!main.hidden;
    host.dataset.legacyLoaded=String(loaded);
    if(loaded){const layout=main.querySelector('.p199-layout');if(layout&&host.parentNode!==main)main.insertBefore(host,layout);}
    else if(shell&&footer&&host.parentNode!==shell)shell.insertBefore(host,footer);
  }
  if(main)new MutationObserver(positionHost).observe(main,{attributes:true,attributeFilter:['hidden']});
  positionHost();
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-quietreserve-language');const c=document.getElementById('tsz-quietreserve-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-quietreserve-language','tsz-quietreserve-country'])document.getElementById(id)?.addEventListener('change',event=>{if((id==='p199-language'||id==='tsz-quietreserve-language')&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.quietreserveGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-quietreserve-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('QUIETRESERVE_R31R2_LOAD_HOLD',err);});
})();
