/* Hitotsubu P19-9R6R9R36R2: JP/US regional Apple preview MP4 + 3 real Apple screenshots. App-scoped, common files unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6794575766') return;
  const host=document.getElementById('tsz-hitotsubu-host');
  const holder=document.getElementById('tsz-hitotsubu-gallery');
  if (!host || !holder) return;
  const APP=6794575766;
  const MANIFEST='./tsz-hitotsubu-images.json?v=p19-r36r2';
  const COPY={"jp":{"ja":[["今日の小さな出来事を、一粒に。","日本語版の実操作映像。出来事に色を付けて瓶へ一粒ずつ記録し、集まった瓶のコレクションや過去の記録を開きます。"],["日々の出来事を、色で残す。","色の粒を選び、短い出来事と一緒にガラス瓶へためていく画面。瓶の中の粒の数も見えます。"],["ためた一粒が、コレクションになる。","小さな瓶、木箱、コンテナ、船など、集めた粒の進み具合を一覧で見渡せます。"],["瓶と棚の景色を楽しむ。","さまざまな色の粒を入れたガラス瓶と、小瓶を並べた棚・木箱のイメージを3つの大きさで紹介します。"]],"en":[["Keep one little moment each day.","Watch the Japanese-language app choose a colored bead, add it to a jar, open the growing collection, and revisit past entries."],["Give an everyday moment a color.","Choose a colored bead and keep a brief moment in the glass jar. The jar count and color choices are visible."],["See your collection grow.","View a progression of jars, wooden crates, cargo containers, and ships as the collection fills."],["A colorful world of jars and shelves.","Three differently sized illustrations show jars filled with colored beads alongside shelves and wooden crates."]]},"us":{"ja":[["Small moments, one bead at a time.","英語版の実操作映像。色を選んで出来事を記録し、瓶にたまった粒やコレクション、過去の記録を確認します。"],["日々の小さな出来事を、色で残す。","一粒を選んで瓶に入れる画面。色の選択と、その日に記録した出来事の短い文章が表示されます。"],["増えていく瓶のコレクション。","ガラス瓶、木箱、コンテナ、船へと続くコレクションの進み具合が一覧に並びます。"],["瓶と棚を、いろいろな大きさで。","色とりどりの粒を詰めた瓶と棚のイメージが、複数のサイズで並ぶ紹介画面です。"]],"en":[["Small moments, one bead at a time.","Watch the English-language app choose a color, capture a small moment, explore its collection, and review previous entries."],["Collect everyday moments in a jar.","Pick a colored bead and record a small moment. The app shows the jar, its count, and the color choices."],["From jars to a larger collection.","Browse the collection as small jars lead to wooden crates, containers, and ships."],["Explore jars in different arrangements.","Three illustrations show colorful jars and shelves at different sizes, from a single jar to larger displays."]]}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const language=()=>{const p=document.getElementById('p199-language');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-hitotsubu-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-hitotsubu-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(m){
    if(!m||m.apple_id!==APP||m.version!=='P19_9R6R9R36R2'||!m.regions||!m.videos)throw Error('MANIFEST_ID_MISMATCH');
    for(const r of ['us','jp']){
      const a=m.regions[r],v=m.videos[r];
      if(!Array.isArray(a)||a.length!==3||new Set(a).size!==3)throw Error('THREE_UNIQUE_SCREENSHOTS_REQUIRED_'+r);
      if(!a.every(u=>new RegExp('^\\./tsz-hitotsubu-assets/'+r.toUpperCase()+'/[0-9]{2}\\.jpg$').test(u)))throw Error('INVALID_IMAGE_PATH_'+r);
      if(v!==`./tsz-hitotsubu-preview-${r.toUpperCase()}.mp4`)throw Error('WRONG_REGION_VIDEO_'+r);
    }
    return m;
  }
  function createStage(images,videoUrl,lang,region){
    const japanese=lang==='ja', count=images.length+1, copy=COPY[region][lang];
    if(copy.length!==count)throw Error('COPY_MEDIA_MISMATCH');
    const stage=make('section','tsz-hitotsubu-stage');stage.id='tsz-hitotsubu-r36r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(images.length);
    stage.dataset.region=region;stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-hitotsubu-top');
    top.append(make('span','tsz-hitotsubu-kicker','APP / SCREEN COLLECTION'),make('span','tsz-hitotsubu-total',japanese?'動画 01 ＋ 実画面 03':'01 VIDEO + 03 SCREENS'));
    const layout=make('div','tsz-hitotsubu-layout');
    const visual=make('div','tsz-hitotsubu-visual');
    const video=make('video','tsz-hitotsubu-video');
    video.controls=true;video.playsInline=true;video.preload='metadata';video.src=videoUrl;video.poster=images[0];
    video.setAttribute('playsinline','');video.setAttribute('aria-label',japanese?'Hitotsubu 動画':'Hitotsubu preview video');
    const picture=make('img','tsz-hitotsubu-image');picture.loading='eager';picture.hidden=true;
    const error=make('p','tsz-hitotsubu-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(video,picture,error);
    const side=make('div','tsz-hitotsubu-side');side.append(top);
    const editorial=make('div','tsz-hitotsubu-editorial');
    const issue=make('span','tsz-hitotsubu-issue'),headline=make('h3','tsz-hitotsubu-headline'),body=make('p','tsz-hitotsubu-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-hitotsubu-controls'),nav=make('div','tsz-hitotsubu-nav');
    const expand=make('button','tsz-hitotsubu-expand');expand.type='button';
    const prev=make('button','tsz-hitotsubu-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-hitotsubu-counter');
    const next=make('button','tsz-hitotsubu-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の項目':'Previous item');next.setAttribute('aria-label',japanese?'次の項目':'Next item');
    const navRight=make('div','tsz-hitotsubu-nav-right');navRight.append(prev,counter,next);nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-hitotsubu-thumbs'),buttons=[];
    for(let n=0;n<count;n++){
      const btn=make('button','tsz-hitotsubu-thumb'+(n===0?' tsz-hitotsubu-thumb-video':''));btn.type='button';
      btn.title=n===0?(japanese?'動画':'Video'):`${japanese?'画面':'Screen'} ${String(n).padStart(2,'0')}`;
      btn.setAttribute('aria-label',btn.title);
      const img=make('img','');img.src=images[Math.max(0,n-1)];img.loading='lazy';img.alt='';
      btn.append(img,make('span','',n===0?(japanese?'動画':'VIDEO'):String(n).padStart(2,'0')));
      btn.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===btn)btn.blur();});
      buttons.push(btn);thumbs.append(btn);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-hitotsubu-dialog');
    const close=make('button','tsz-hitotsubu-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const large=make('img','tsz-hitotsubu-dialog-image');large.alt='';dialog.append(close,large);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(i){
      const n=(i+count)%count;
      if(selected===0&&n!==0)video.pause();
      selected=n;state.selected=n;
      const isVideo=n===0;video.hidden=!isVideo;picture.hidden=isVideo;error.hidden=true;
      if(!isVideo){picture.src=images[n-1];picture.alt=`Hitotsubu ${japanese?'実画面':'screenshot'} ${String(n).padStart(2,'0')}`;}
      issue.textContent=isVideo?'VIDEO':`${japanese?'実画面':'SCREEN'} ${String(n).padStart(2,'0')}`;
      headline.textContent=copy[n][0];body.textContent=copy[n][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(n+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
      buttons.forEach((b,k)=>{const active=k===n;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected=String(n);
      if(document.activeElement===prev||document.activeElement===next||buttons.includes(document.activeElement))buttons[n].scrollIntoView({block:'nearest',inline:'nearest'});
    }
    expand.addEventListener('click',()=>{
      if(selected===0){
        if(typeof video.requestFullscreen==='function')video.requestFullscreen().catch(()=>{});
        else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      } else {large.src=images[selected-1];large.alt=picture.alt;dialog.showModal();}
    });
    prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement||e.target instanceof HTMLVideoElement||dialog.open)return;
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));
        if(buttons.includes(e.target))buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);
    stage._stopVideo=()=>video.pause();
    return stage;
  }
  function redraw(){state.scheduled=false;if(state.drawing||!state.manifest)return;
    const l=language(),r=country();if(state.stage?.isConnected&&l===state.lang&&r===state.region)return;
    if(state.stage)state.stage._stopVideo?.();
    state.lang=l;state.region=r;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],state.manifest.videos[r],l,r);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  const main=document.getElementById('p199-content'),shell=document.querySelector('.p19-shell'),footer=shell?.querySelector('footer.p19-footer');
  function positionHost(){
    const loaded=!!main&&!main.hidden;
    host.dataset.legacyLoaded=String(loaded);
    if(loaded){const target=main.querySelector('.p199-layout');if(target&&host.parentNode!==main)main.insertBefore(host,target);}
    else if(shell&&footer&&host.parentNode!==shell)shell.insertBefore(host,footer);
  }
  if(main)new MutationObserver(()=>{positionHost();queue();}).observe(main,{attributes:true,attributeFilter:['hidden']});
  positionHost();
  if(host.dataset.legacyLoaded!=='true'){
    const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');
    const l=document.getElementById('tsz-hitotsubu-language'),c=document.getElementById('tsz-hitotsubu-country');
    if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';
  }
  for(const id of ['p199-language','p199-country','tsz-hitotsubu-language','tsz-hitotsubu-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'})
    .then(res=>{if(!res.ok)throw Error('MANIFEST_HTTP_'+res.status);return res.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.hitotsubuGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-hitotsubu-load-error',language()==='ja'?'画像と動画を読み込めませんでした。':'Gallery media could not be loaded.'));console.error('HITOTSUBU_R36R2_LOAD_HOLD',err);});
})();
