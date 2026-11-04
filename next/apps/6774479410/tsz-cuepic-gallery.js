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
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const lang=()=>{const p=document.getElementById('p199-language');const v=p?.selectedOptions?.[0]?.value||document.getElementById('tsz-cuepic-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=p?.selectedOptions?.[0]?.value||document.getElementById('tsz-cuepic-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-cuepic-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region){
    const japanese=language==='ja', count=images.length, copy=COPY[region][language];
    const stage=make('section','tsz-cuepic-stage');stage.id='tsz-cuepic-r30r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-cuepic-top');
    top.append(make('span','tsz-cuepic-kicker','APP / SCREEN COLLECTION'),make('span','tsz-cuepic-total',japanese?`実画面 ${String(count).padStart(2,'0')}`:`${String(count).padStart(2,'0')} SCREENS`));
    const layout=make('div','tsz-cuepic-layout');
    const visual=make('div','tsz-cuepic-visual');
    const picture=make('img','tsz-cuepic-image');picture.loading='eager';
    const error=make('p','tsz-cuepic-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-cuepic-side');side.append(top);
    const editorial=make('div','tsz-cuepic-editorial');
    const issue=make('span','tsz-cuepic-issue');const headline=make('h3','tsz-cuepic-headline');const body=make('p','tsz-cuepic-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-cuepic-controls');
    const nav=make('div','tsz-cuepic-nav');const expand=make('button','tsz-cuepic-expand',japanese?'画面を拡大':'Enlarge screenshot');expand.type='button';
    const prev=make('button','tsz-cuepic-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-cuepic-counter');
    const next=make('button','tsz-cuepic-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の画像':'Previous screenshot');next.setAttribute('aria-label',japanese?'次の画像':'Next screenshot');
    const navRight=make('div','tsz-cuepic-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-cuepic-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-cuepic-thumb');button.type='button';
      button.title=`${japanese?'画像':'Screenshot'} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-cuepic-dialog');
    const close=make('button','tsz-cuepic-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const full=make('img','tsz-cuepic-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`CuePic ${japanese?'実画面':'screenshot'} ${String(selected+1).padStart(2,'0')}`;
      issue.textContent=`${japanese?'実画面':'SCREEN'} ${String(selected+1).padStart(2,'0')}`;
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
    const l=lang(),r=country();if(state.stage?.isConnected&&l===state.lang&&r===state.region)return;
    state.lang=l;state.region=r;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],l,r);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
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
  for(const id of ['p199-language','p199-country','tsz-cuepic-language','tsz-cuepic-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.cuepicGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-cuepic-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('CUEPIC_R30R2_LOAD_HOLD',err);});
})();
