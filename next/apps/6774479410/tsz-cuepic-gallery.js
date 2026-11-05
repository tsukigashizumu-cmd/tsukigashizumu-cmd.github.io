/* CuePic P19_9R6R9R30R2. Three actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6774479410') return;
  const host=document.getElementById('tsz-cuepic-host');
  const holder=document.getElementById('tsz-cuepic-gallery');
  if (!host || !holder) return;
  const APP=6774479410;
  const MANIFEST='./tsz-cuepic-images.json?v=p19-r30r2';
  const COPY={"jp":{"ja":[["画像に「ここだよ」を。","画像を選んで、押してほしい場所に印を付け、相手に送る。言葉だけでは伝わらない位置を、ひと目で示せます。"],["画像を選ぶ。印を調整。共有。","編集画面では、画像を選び直し、目印の位置を調整して、仕上がった画像を共有できます。"],["赤丸で、押す場所を明確に。","ホーム画面のアプリアイコンを赤丸で示した手順。相手は画像を見ながら操作する場所を確認できます。"]],"en":[["Make “tap here” visible.","Choose an image, mark the spot to tap, and share it. Show exactly where you mean without a long explanation."],["Choose, mark, and share.","An editing screen for changing the image, adjusting the marked spot, and sharing the finished visual."],["A red circle shows the way.","A guide highlights an app icon on the home screen, so the recipient can see exactly where to tap."]]},"us":{"ja":[["「ここを押して」を画像で伝える。","画像を選び、場所に印を付けて共有。口頭で何度も説明する代わりに、目印を添えられます。"],["選択、調整、共有の3ステップ。","画像を変更し、タップ位置の目印を整え、その画像を相手に送るまでの流れ。"],["手順の中でタップ位置を示す。","赤い丸でホーム画面のアイコンを強調。相手が押す場所を見つけやすくなります。"]],"en":[["Show “tap here” on an image.","Choose an image, mark exactly where to tap, and send it. A clear visual can be easier than explaining the spot again."],["Three steps to a clearer instruction.","Change the image, adjust the tap point, and share the marked result with someone who needs guidance."],["The marked spot is easy to find.","A red circle highlights the app icon on a home screen inside a shareable step-by-step guide."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["Zeige mit einem Bild, wo es langgeht.","Wähle ein Bild aus, markiere die Stelle, auf die jemand tippen soll, und teile das Ergebnis. So wird die gemeinte Position sofort deutlich – auch ohne lange Erklärung."],["Bild auswählen, Markierung anpassen, teilen.","Auf dem Bearbeitungsbildschirm kannst du ein anderes Bild wählen, die Markierung verschieben und das fertige Bild weitergeben."],["Ein roter Kreis zeigt die richtige Stelle.","Ein Beispiel zeigt ein App-Symbol auf dem Home-Bildschirm mit einem roten Kreis. Wer die Anleitung erhält, erkennt direkt, wo getippt werden soll."]],"us":[["„Hier tippen“ direkt im Bild zeigen.","Wähle ein Bild, markiere die genaue Stelle zum Tippen und versende es. Ein klarer visueller Hinweis kann wiederholte Erklärungen ersetzen."],["Drei Schritte zu einer klaren Anweisung.","Ändere das Bild, richte die Tippmarkierung aus und teile das markierte Ergebnis mit der Person, die Hilfe benötigt."],["Die markierte Stelle ist leicht zu finden.","Ein roter Kreis hebt ein App-Symbol auf dem Home-Bildschirm hervor – als Teil einer bebilderten Schritt-für-Schritt-Anleitung."]]},"ar-SA":{"jp":[["وضّح موضع الضغط على الصورة.","اختر صورة وحدّد المكان الذي تريد من الطرف الآخر الضغط عليه، ثم شاركها معه. تُظهر العلامة الموضع المقصود بوضوح دون شرح طويل."],["اختر الصورة، واضبط العلامة، ثم شارك.","في شاشة التحرير، يمكنك اختيار صورة أخرى وتحريك العلامة إلى الموضع المناسب ثم مشاركة الصورة النهائية."],["دائرة حمراء توضّح المكان المطلوب.","يعرض المثال أيقونة تطبيق على الشاشة الرئيسية محاطة بدائرة حمراء، ليعرف المستلم أين يضغط أثناء اتباع الخطوات."]],"us":[["أظهر عبارة «اضغط هنا» على الصورة.","اختر صورة وحدّد موضع الضغط بدقة ثم أرسلها. قد يكون التوضيح المرئي أسهل من تكرار وصف المكان بالكلمات."],["ثلاث خطوات لتعليمات أوضح.","غيّر الصورة، واضبط علامة موضع الضغط، ثم شارك النتيجة مع الشخص الذي يحتاج إلى الإرشاد."],["اعثر على الموضع المحدّد بسهولة.","تُبرز دائرة حمراء أيقونة تطبيق على الشاشة الرئيسية ضمن دليل مصوّر قابل للمشاركة خطوة بخطوة."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  // Read explicit locale from URL until the visitor changes the language control.
  // The existing legacy selector only covers the old language subset.
  let languageTouched=false;
  const requestedLocale=()=>{const p=document.getElementById('p199-language');const selected=p?.selectedOptions?.[0]?.value||document.getElementById('tsz-cuepic-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return languageTouched&&selected?selected:(['de-DE','ar-SA'].includes(selected)?selected:query||selected||navigator.language||'en-US');};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const p=document.getElementById('p199-country');const v=p?.selectedOptions?.[0]?.value||document.getElementById('tsz-cuepic-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-cuepic-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length, copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const stage=make('section','tsz-cuepic-stage');stage.id='tsz-cuepic-r30r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-cuepic-top');
    top.append(make('span','tsz-cuepic-kicker',ui.kicker),make('span','tsz-cuepic-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-cuepic-layout');
    const visual=make('div','tsz-cuepic-visual');
    const picture=make('img','tsz-cuepic-image');picture.loading='eager';
    const error=make('p','tsz-cuepic-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-cuepic-side');side.append(top);
    const editorial=make('div','tsz-cuepic-editorial');
    const issue=make('span','tsz-cuepic-issue');const headline=make('h3','tsz-cuepic-headline');const body=make('p','tsz-cuepic-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-cuepic-controls');
    const nav=make('div','tsz-cuepic-nav');const expand=make('button','tsz-cuepic-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-cuepic-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-cuepic-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-cuepic-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-cuepic-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-cuepic-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-cuepic-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-cuepic-dialog');
    const close=make('button','tsz-cuepic-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-cuepic-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`CuePic ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
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
  for(const id of ['p199-language','p199-country','tsz-cuepic-language','tsz-cuepic-country'])document.getElementById(id)?.addEventListener('change',event=>{if((id==='p199-language'||id==='tsz-cuepic-language')&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.cuepicGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-cuepic-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('CUEPIC_R30R2_LOAD_HOLD',err);});
})();
