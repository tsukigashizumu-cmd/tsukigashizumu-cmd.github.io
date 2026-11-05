/* Herebit P19_9R6R9R32R2. Three actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6781497015') return;
  const host=document.getElementById('tsz-herebit-host');
  const holder=document.getElementById('tsz-herebit-gallery');
  if (!host || !holder) return;
  const APP=6781497015;
  const MANIFEST='./tsz-herebit-images.json?v=p19-r32r2';
  const COPY={"jp":{"ja":[["「ここ」を、丸で示す。","画像を選び、伝えたい一点に赤い丸を置く。位置の説明を長い文章にしなくても、修正箇所を目で伝えられます。"],["範囲なら、四角で囲む。","一部分を示したいときは長方形の枠を使う。画像のどこを見てほしいか、範囲で示せます。"],["枠の縦横を、細かく調整。","四角形の縦と横をスライダーで調整し、緑色の枠で対象部分を囲んで示せます。"]],"en":[["Point to “here” with a circle.","Choose an image and place a red circle around the exact spot you mean. Show the location instead of describing it at length."],["Outline the area you mean.","Use a rectangular mark to highlight a larger part of the image and make the intended area easy to identify."],["Fine-tune the width and height.","Adjust both sides of a rectangular marker with sliders. The green outline makes the selected area visible."]]},"us":{"ja":[["「ここ」を丸で伝える。","赤い丸を置いて、画像の中で見てほしい一点を指定。文章だけでは伝えにくい位置を視覚的に示します。"],["修正範囲を四角く囲む。","赤い長方形で画面の一部分を囲み、どの範囲について伝えたいかを明確にします。"],["大きさを調節して囲む。","上部の縦横スライダーを動かし、緑の四角い枠の大きさを調整できます。"]],"en":[["Circle the exact spot.","Add a red circle to the image to indicate precisely where you want someone—or AI—to look."],["Show the area with a rectangle.","Draw a red rectangular outline around the region you want to point out rather than explaining its position in words."],["Adjust a rectangle to fit.","Use the width and height sliders to shape a green rectangular outline around the area you want to mark."]]}};
  const LOCALIZED_CAPTION_COPY = {"de-DE":{"jp":[["Zeige die Stelle mit einem Kreis.","Wähle ein Bild aus und markiere die genaue Stelle mit einem roten Kreis. So wird sichtbar, was du korrigieren möchtest, ohne den Ort umständlich beschreiben zu müssen."],["Markiere einen Bereich mit einem Rechteck.","Mit einem rechteckigen Rahmen lässt sich ein größerer Bildausschnitt hervorheben. So ist klar, welchen Bereich du meinst."],["Breite und Höhe präzise einstellen.","Passe die Seiten des rechteckigen Markers über die Schieberegler an. Die grüne Umrandung zeigt den ausgewählten Bereich."]],"us":[["Kreise die genaue Stelle ein.","Setze einen roten Kreis auf das Bild, um genau zu zeigen, wohin jemand oder eine KI schauen soll."],["Zeige den Bereich mit einem Rechteck.","Zeichne einen roten rechteckigen Rahmen um die Stelle, die du zeigen möchtest, statt ihre Position mit Worten zu beschreiben."],["Passe das Rechteck an.","Forme mit den Reglern für Breite und Höhe einen grünen rechteckigen Rahmen um den gewünschten Bereich."]]},"ar-SA":{"jp":[["حدّد المكان بدائرة.","اختر صورة وضع دائرة حمراء حول النقطة التي تريد الإشارة إليها. هكذا تُظهر موضع التعديل بوضوح دون الحاجة إلى شرح طويل."],["حدّد النطاق بمستطيل.","استخدم إطارًا مستطيلاً لإبراز جزء أكبر من الصورة، حتى يكون النطاق المقصود واضحًا."],["اضبط العرض والارتفاع بدقة.","اضبط عرض الإطار المستطيل وارتفاعه باستخدام شريطي التمرير. يُظهر الإطار الأخضر النطاق المحدّد بوضوح."]],"us":[["ضع دائرة حول النقطة المطلوبة.","أضف دائرة حمراء إلى الصورة لتوضّح بدقة المكان الذي تريد من شخص أو من الذكاء الاصطناعي النظر إليه."],["وضّح النطاق بمستطيل.","ارسم إطارًا مستطيلاً أحمر حول المنطقة المقصودة بدلًا من وصف موضعها بالكلمات."],["اضبط المستطيل ليناسب المنطقة.","استخدم شريطي تمرير العرض والارتفاع لتشكيل إطار أخضر مستطيل يحيط بالمنطقة التي تريد تحديدها."]]}};
  const UI_LABELS = {"ja":{"kicker":"APP / SCREEN COLLECTION","total":"実画面 {count}","screen":"実画面","enlarge":"画面を拡大","thumb":"画像","imageError":"画像を表示できませんでした。","close":"閉じる","prev":"前の画像","next":"次の画像","alt":"実画面"},"en":{"kicker":"APP / SCREEN COLLECTION","total":"{count} SCREENS","screen":"SCREEN","enlarge":"Enlarge screenshot","thumb":"Screenshot","imageError":"Screenshot could not be displayed.","close":"Close","prev":"Previous screenshot","next":"Next screenshot","alt":"screenshot"},"de-DE":{"kicker":"APP / BILDSCHIRMGALERIE","total":"{count} ANSICHTEN","screen":"ANSICHT","enlarge":"Screenshot vergrößern","thumb":"Screenshot","imageError":"Screenshot konnte nicht angezeigt werden.","close":"Schließen","prev":"Vorheriger Screenshot","next":"Nächster Screenshot","alt":"Screenshot"},"ar-SA":{"kicker":"التطبيق / معرض الشاشات","total":"{count} شاشات","screen":"الشاشة","enlarge":"تكبير لقطة الشاشة","thumb":"لقطة شاشة","imageError":"تعذّر عرض لقطة الشاشة.","close":"إغلاق","prev":"لقطة الشاشة السابقة","next":"لقطة الشاشة التالية","alt":"لقطة شاشة"}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  // Preserve deep-link locale until a genuine user changes the language selector.
  let languageTouched=false;
  const requestedLocale=()=>{const p=document.getElementById('p199-language');const selected=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-herebit-language')?.value||'';const query=new URLSearchParams(location.search).get('language')||'';return languageTouched&&selected?selected:(['de-DE','ar-SA'].includes(selected)?selected:query||selected||navigator.language||'en-US');};
  const lang=()=>/^ja(?:[-_]|$)/i.test(requestedLocale())?'ja':'en';
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-herebit-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',locale:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-herebit-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region,locale){
    const japanese=language==='ja', count=images.length, copy=LOCALIZED_CAPTION_COPY[locale]?.[region]||COPY[region][language];
    const ui=UI_LABELS[locale]||UI_LABELS[language]||UI_LABELS.en;
    const stage=make('section','tsz-herebit-stage');stage.id='tsz-herebit-r32r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);stage.dataset.locale=locale;stage.dataset.region=region;
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-herebit-top');
    top.append(make('span','tsz-herebit-kicker',ui.kicker),make('span','tsz-herebit-total',ui.total.replace('{count}',String(count).padStart(2,'0'))));
    const layout=make('div','tsz-herebit-layout');
    const visual=make('div','tsz-herebit-visual');
    const picture=make('img','tsz-herebit-image');picture.loading='eager';
    const error=make('p','tsz-herebit-image-error',ui.imageError);error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-herebit-side');side.append(top);
    const editorial=make('div','tsz-herebit-editorial');
    const issue=make('span','tsz-herebit-issue');const headline=make('h3','tsz-herebit-headline');const body=make('p','tsz-herebit-body');
    headline.dir=locale==='ar-SA'?'rtl':'auto';body.dir=locale==='ar-SA'?'rtl':'auto';
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-herebit-controls');
    const nav=make('div','tsz-herebit-nav');const expand=make('button','tsz-herebit-expand',ui.enlarge);expand.type='button';
    const prev=make('button','tsz-herebit-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-herebit-counter');counter.dir='ltr';counter.style.unicodeBidi='isolate';
    const next=make('button','tsz-herebit-arrow','›');next.type='button';
    prev.setAttribute('aria-label',ui.prev);next.setAttribute('aria-label',ui.next);
    const navRight=make('div','tsz-herebit-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-herebit-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-herebit-thumb');button.type='button';
      button.title=`${ui.thumb} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-herebit-dialog');
    const close=make('button','tsz-herebit-dialog-close',ui.close);close.type='button';
    const full=make('img','tsz-herebit-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Herebit ${ui.alt} ${String(selected+1).padStart(2,'0')}`;
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
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-herebit-language');const c=document.getElementById('tsz-herebit-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-herebit-language','tsz-herebit-country'])document.getElementById(id)?.addEventListener('change',event=>{if((id==='p199-language'||id==='tsz-herebit-language')&&event.isTrusted)languageTouched=true;queue();});
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.herebitGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-herebit-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('HEREBIT_R32R2_LOAD_HOLD',err);});
})();
