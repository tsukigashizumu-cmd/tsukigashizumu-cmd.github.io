/* MealDrift P19_9R6R9R33R2. Eight actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6781817734') return;
  const host=document.getElementById('tsz-mealdrift-host');
  const holder=document.getElementById('tsz-mealdrift-gallery');
  if (!host || !holder) return;
  const APP=6781817734;
  const MANIFEST='./tsz-mealdrift-images.json?v=p19-r33r2';
  const COPY={"jp":{"ja":[["今日のごはんを、候補から選ぶ。","「ゆるく決める」から、登録した食事候補を一つ選ぶ。タグの包含・除外も指定して、今の気分に合う候補に絞れます。"],["選ばれた一品を、今日の候補に。","表示された「中華」をそのまま選ぶことも、もう一度選び直すこともできます。"],["食べた感想を記録する。","食べた日時、うまさ、また食べたい度、量などを選んで記録します。"],["候補を一覧で管理。","うどん、そば、カレーなどの候補を一覧で確認。検索して、編集したい候補を開けます。"],["タグから探しやすく。","「コンビニ」「パン」「冷たい」などのタグ別に、登録された候補を確認できます。"],["出やすさと季節を設定。","候補を追加するときに頻度を3段階から選び、出す月や季節を設定できます。"],["食事の履歴を振り返る。","これまでに食べた内容を日時とともに表示。料理名で検索して、過去の記録を見直せます。"],["JSONでバックアップと移行。","候補・タグ・履歴・設定をJSONに書き出し、読み込みで復元できます。読み込みは既存データを置き換えます。"]],"en":[["Let your saved meals decide.","Use the Choose screen to pick from your saved meal options. Include or exclude tags to narrow down what can appear."],["A suggestion for today.","Accept the suggested Chinese food option, or try again to draw another choice."],["Log what you ate.","Save the date and time, how it tasted, whether you would eat it again, and the portion."],["See all your candidates.","Browse options such as udon, soba, and curry in one list. Search for a specific meal to edit it."],["Organize meals by tags.","Browse tags such as convenience store, bread, and cold food to find grouped candidates."],["Set frequency and seasons.","When adding a meal option, choose one of three frequency levels and the months when it should appear."],["Look back at meal history.","Browse past meals with dates and times. Search the history by meal name."],["Back up and transfer with JSON.","Export candidates, tags, history, and settings to JSON, or import a file to restore them. Import replaces existing data."]]},"us":{"ja":[["食事選びの負担を減らす。","登録した食事候補から「Choose for me」で選択。タグを含めたり除外したりして、今日の候補を絞れます。"],["候補を選ぶ、もう一度試す。","「Convenience store」が表示された画面。採用するか、もう一度候補を選び直せます。"],["食べた内容を残す。","食べた日時、味、また食べたいか、量を選んで記録できます。"],["候補を検索・管理。","弁当、バーガー、中華などの候補を一覧表示。必要な候補を検索できます。"],["タグごとに候補を整理。","家で食べる・パン・軽めなど、登録したタグと候補数を一覧で確認できます。"],["候補の出やすさと月を選ぶ。","よく出す・ときどき・たまに、の3段階と、候補を出す季節や月を指定できます。"],["履歴から次の食事を考える。","いつ何を食べたか、味の評価や再び食べたい度も含めて確認できます。"],["JSONでデータを移す。","候補・タグ・履歴などをJSONで書き出し、別の端末へ移行できます。読み込み時は現在のデータが置き換わります。"]],"en":[["Choose a meal without the extra decisions.","Tap Choose for me to pick from meals you saved earlier. Use tags to include or exclude types of food."],["One pick, or another try.","The app suggests a convenience store meal. Take that option or tap Try again for a different one."],["Remember the meal afterward.","Log the date, taste, whether you would eat it again, and the portion you had."],["Keep meal candidates in one place.","Browse and search options such as bento, burgers, Chinese food, and home cooking."],["Find meals using tags.","View saved tags like At home, Bread, and Light, along with their candidate counts."],["Choose frequency and best months.","Set how often a meal should appear, then choose the seasons or months that suit it."],["Review what you have eaten.","Search your meal history and see past entries with dates, taste, and eat-again notes."],["Transfer your list with JSON.","Export or import candidates, tags, history, and settings. An import replaces the current data."]]}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const lang=()=>{const p=document.getElementById('p199-language');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-mealdrift-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-mealdrift-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==8||new Set(arr).size!==8)throw Error('EIGHT_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-mealdrift-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region){
    const japanese=language==='ja', count=images.length, copy=COPY[region][language];
    const stage=make('section','tsz-mealdrift-stage');stage.id='tsz-mealdrift-r33r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-mealdrift-top');
    top.append(make('span','tsz-mealdrift-kicker','APP / SCREEN COLLECTION'),make('span','tsz-mealdrift-total',japanese?`実画面 ${String(count).padStart(2,'0')}`:`${String(count).padStart(2,'0')} SCREENS`));
    const layout=make('div','tsz-mealdrift-layout');
    const visual=make('div','tsz-mealdrift-visual');
    const picture=make('img','tsz-mealdrift-image');picture.loading='eager';
    const error=make('p','tsz-mealdrift-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-mealdrift-side');side.append(top);
    const editorial=make('div','tsz-mealdrift-editorial');
    const issue=make('span','tsz-mealdrift-issue');const headline=make('h3','tsz-mealdrift-headline');const body=make('p','tsz-mealdrift-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-mealdrift-controls');
    const nav=make('div','tsz-mealdrift-nav');const expand=make('button','tsz-mealdrift-expand',japanese?'画面を拡大':'Enlarge screenshot');expand.type='button';
    const prev=make('button','tsz-mealdrift-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-mealdrift-counter');
    const next=make('button','tsz-mealdrift-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の画像':'Previous screenshot');next.setAttribute('aria-label',japanese?'次の画像':'Next screenshot');
    const navRight=make('div','tsz-mealdrift-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-mealdrift-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-mealdrift-thumb');button.type='button';
      button.title=`${japanese?'画像':'Screenshot'} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-mealdrift-dialog');
    const close=make('button','tsz-mealdrift-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const full=make('img','tsz-mealdrift-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`MealDrift ${japanese?'実画面':'screenshot'} ${String(selected+1).padStart(2,'0')}`;
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
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-mealdrift-language');const c=document.getElementById('tsz-mealdrift-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-mealdrift-language','tsz-mealdrift-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.mealdriftGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-mealdrift-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('MEALDRIFT_R33R2_LOAD_HOLD',err);});
})();
