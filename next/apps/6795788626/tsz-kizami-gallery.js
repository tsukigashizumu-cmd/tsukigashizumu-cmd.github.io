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
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const lang=()=>{const p=document.getElementById('p199-language');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-kizami-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-kizami-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==3||new Set(arr).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-kizami-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region){
    const japanese=language==='ja', count=images.length, copy=COPY[region][language];
    const stage=make('section','tsz-kizami-stage');stage.id='tsz-kizami-r37r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-kizami-top');
    top.append(make('span','tsz-kizami-kicker','APP / SCREEN COLLECTION'),make('span','tsz-kizami-total',japanese?`実画面 ${String(count).padStart(2,'0')}`:`${String(count).padStart(2,'0')} SCREENS`));
    const layout=make('div','tsz-kizami-layout');
    const visual=make('div','tsz-kizami-visual');
    const picture=make('img','tsz-kizami-image');picture.loading='eager';
    const error=make('p','tsz-kizami-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-kizami-side');side.append(top);
    const editorial=make('div','tsz-kizami-editorial');
    const issue=make('span','tsz-kizami-issue');const headline=make('h3','tsz-kizami-headline');const body=make('p','tsz-kizami-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-kizami-controls');
    const nav=make('div','tsz-kizami-nav');const expand=make('button','tsz-kizami-expand',japanese?'画面を拡大':'Enlarge screenshot');expand.type='button';
    const prev=make('button','tsz-kizami-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-kizami-counter');
    const next=make('button','tsz-kizami-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の画像':'Previous screenshot');next.setAttribute('aria-label',japanese?'次の画像':'Next screenshot');
    const navRight=make('div','tsz-kizami-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-kizami-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-kizami-thumb');button.type='button';
      button.title=`${japanese?'画像':'Screenshot'} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-kizami-dialog');
    const close=make('button','tsz-kizami-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const full=make('img','tsz-kizami-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Kizami ${japanese?'実画面':'screenshot'} ${String(selected+1).padStart(2,'0')}`;
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
  for(const id of ['p199-language','p199-country','tsz-kizami-language','tsz-kizami-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.kizamiGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-kizami-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('QUIETRESERVE_R37R2_LOAD_HOLD',err);});
})();
