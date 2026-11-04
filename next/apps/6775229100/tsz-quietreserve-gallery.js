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
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const lang=()=>{const p=document.getElementById('p199-language');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-quietreserve-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-quietreserve-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==4||new Set(arr).size!==4)throw Error('FOUR_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-quietreserve-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region){
    const japanese=language==='ja', count=images.length, copy=COPY[region][language];
    const stage=make('section','tsz-quietreserve-stage');stage.id='tsz-quietreserve-r31r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-quietreserve-top');
    top.append(make('span','tsz-quietreserve-kicker','APP / SCREEN COLLECTION'),make('span','tsz-quietreserve-total',japanese?`実画面 ${String(count).padStart(2,'0')}`:`${String(count).padStart(2,'0')} SCREENS`));
    const layout=make('div','tsz-quietreserve-layout');
    const visual=make('div','tsz-quietreserve-visual');
    const picture=make('img','tsz-quietreserve-image');picture.loading='eager';
    const error=make('p','tsz-quietreserve-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-quietreserve-side');side.append(top);
    const editorial=make('div','tsz-quietreserve-editorial');
    const issue=make('span','tsz-quietreserve-issue');const headline=make('h3','tsz-quietreserve-headline');const body=make('p','tsz-quietreserve-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-quietreserve-controls');
    const nav=make('div','tsz-quietreserve-nav');const expand=make('button','tsz-quietreserve-expand',japanese?'画面を拡大':'Enlarge screenshot');expand.type='button';
    const prev=make('button','tsz-quietreserve-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-quietreserve-counter');
    const next=make('button','tsz-quietreserve-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の画像':'Previous screenshot');next.setAttribute('aria-label',japanese?'次の画像':'Next screenshot');
    const navRight=make('div','tsz-quietreserve-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-quietreserve-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-quietreserve-thumb');button.type='button';
      button.title=`${japanese?'画像':'Screenshot'} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-quietreserve-dialog');
    const close=make('button','tsz-quietreserve-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const full=make('img','tsz-quietreserve-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Quiet Reserve ${japanese?'実画面':'screenshot'} ${String(selected+1).padStart(2,'0')}`;
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
  if(host.dataset.legacyLoaded!=='true'){const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');const l=document.getElementById('tsz-quietreserve-language');const c=document.getElementById('tsz-quietreserve-country');if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';}
  for(const id of ['p199-language','p199-country','tsz-quietreserve-language','tsz-quietreserve-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.quietreserveGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-quietreserve-load-error',lang()==='ja'?'画像の読み込みを確認してください。':'Screenshot loading failed.'));console.error('QUIETRESERVE_R31R2_LOAD_HOLD',err);});
})();
