/* P19-9R6R9R26R2: Palette Spin dedicated preview + US2/JP2 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Palette Spin; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6767983547') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6767983547;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-palette-images.json?v=p19-r26r2';
  const COPY = {
  "us": {
    "ja": [
      [
        "壁紙が変わっていく、その動きを見る。",
        "写真を選び、色パレットを切り替えて壁紙の表情を変える。Palette Spinの操作を動画で見られます。"
      ],
      [
        "色の組み合わせから、壁紙をつくる。",
        "カード状のパレットを並べた編集画面。色の組み合わせと壁紙プレビューを同時に見られます。"
      ],
      [
        "写真と色を、ひとつの画面に。",
        "写真を背景にした編集画面。Glow、Effect、Photo、Text、Markなどの項目が並び、表示を調整できます。"
      ]
    ],
    "en": [
      [
        "Watch a wallpaper take shape.",
        "See a photo selected and color palettes changed as the wallpaper design develops."
      ],
      [
        "Build a wallpaper from color.",
        "Color-palette cards and wallpaper previews share the editing screen."
      ],
      [
        "Bring photo and color together.",
        "A photo-backed design with controls for Glow, Effect, Photo, Text, Mark, and more."
      ]
    ]
  },
  "jp": {
    "ja": [
      [
        "壁紙が変わっていく、その動きを見る。",
        "写真を選び、色パレットを切り替えて壁紙の表情を変える。Palette Spinの操作を動画で見られます。"
      ],
      [
        "色の組み合わせから、壁紙をつくる。",
        "カード状のパレットを並べた編集画面。色の組み合わせと壁紙プレビューを同時に見られます。"
      ],
      [
        "写真と色を、ひとつの画面に。",
        "写真を背景にした編集画面。Glow、Effect、Photo、Text、Markなどの項目が並び、表示を調整できます。"
      ]
    ],
    "en": [
      [
        "Watch a wallpaper take shape.",
        "See a photo selected and color palettes changed as the wallpaper design develops."
      ],
      [
        "Build a wallpaper from color.",
        "Color-palette cards and wallpaper previews share the editing screen."
      ],
      [
        "Bring photo and color together.",
        "A photo-backed design with controls for Glow, Effect, Photo, Text, Mark, and more."
      ]
    ]
  }
};
  const make = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const lang = () => /^ja(?:[-_]|$)/i.test(document.getElementById('p199-language')?.value || document.documentElement.lang || '') ? 'ja' : 'en';
  const country = () => /^jp$/i.test(document.getElementById('p199-country')?.value || '') ? 'jp' : 'us';
  const state = { manifest:null, selected:0, lang:'', region:'', stage:null, scheduled:false, drawing:false };
  function validateManifest(value) {
    if (!value || value.apple_id !== APP || !value.regions) throw Error('MANIFEST_WRONG_APP');
    for (const region of ['us','jp']) {
      const images = value.regions[region];
      if (!Array.isArray(images) || images.length !== 2 || new Set(images).size !== images.length) throw Error('REGION_IMAGE_COUNT_MISMATCH_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region) {
    const japanese = language === 'ja';
    const text = COPY[region][language];
    const stage = make('section','tsz-palette-stage');
    stage.id = 'tsz-palette-r26r2';
    stage.dataset.mediaCount = String(images.length+1);
    stage.dataset.screenshotCount = String(images.length);
    const mediaCount=images.length+1;
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-palette-top');
    top.append(make('span','tsz-palette-kicker','APP / SCREEN COLLECTION'),
      make('span','tsz-palette-total',japanese ? `動画 01 ＋ 実画面 ${String(images.length).padStart(2,'0')}` : `01 VIDEO + ${String(images.length).padStart(2,'0')} SCREENS`));
    const layout = make('div','tsz-palette-layout');
    const visual = make('div','tsz-palette-visual');
    const video = make('video','tsz-palette-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-palette-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-palette-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-palette-side');
    side.append(top);
    const editorial = make('div','tsz-palette-editorial');
    const issue = make('span','tsz-palette-issue');
    const headline = make('h3','tsz-palette-headline');
    const body = make('p','tsz-palette-body');
    editorial.append(issue,headline,body);
    const controls = make('div','tsz-palette-controls');
    const nav = make('div','tsz-palette-nav');
    const expand=make('button','tsz-palette-expand',japanese?'動画を全画面で見る':'Watch fullscreen');
    expand.type='button';
    const previous=make('button','tsz-palette-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-palette-counter');
    const next=make('button','tsz-palette-arrow','›');next.type='button';
    previous.setAttribute('aria-label',japanese?'前の項目':'Previous');next.setAttribute('aria-label',japanese?'次の項目':'Next');
    const navRight=make('div','tsz-palette-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-palette-thumbs');
    const buttons=[];
    for (let n=0; n<mediaCount; n++) {
      const button=make('button','tsz-palette-thumb');button.type='button';
      button.title=n===0?(japanese?'動画':'Video'):`${japanese?'画像':'Screenshot'} ${n}`;
      button.setAttribute('aria-label',button.title);
      const thumbnail=make('img','');thumbnail.src=images[n===0?0:n-1];thumbnail.loading='lazy';
      thumbnail.referrerPolicy='no-referrer';thumbnail.alt='';
      button.append(thumbnail,make('span','',n===0?(japanese?'動画':'VIDEO'):String(n).padStart(2,'0')));
      button.addEventListener('click',(event)=>{
        show(n);
        // Pointer focus should not linger after selecting or moving to another thumbnail.
        // Keep genuine keyboard focus so Tab/Enter/Space remain usable.
        if(event.detail > 0 && document.activeElement===button) button.blur();
      });
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);
    layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-palette-dialog');
    const dialogClose=make('button','tsz-palette-dialog-close',japanese?'閉じる':'Close');dialogClose.type='button';
    const dialogImg=make('img','tsz-palette-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(mediaCount-1,state.selected));
    function show(index) {
      const normalized=(index+mediaCount)%mediaCount;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Palette Spin ${japanese?'実画面':'screenshot'} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?'VIDEO':`${japanese?'実画面':'SCREEN'} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(selected+1).padStart(2,'0')} / ${String(mediaCount).padStart(2,'0')}`;
      buttons.forEach((button,n)=>{const active=n===selected;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected = String(selected);
      if (document.activeElement===previous || document.activeElement===next || buttons.includes(document.activeElement)) {
        buttons[selected].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
      }
    }
    expand.addEventListener('click',()=>{
      if(selected===0) {
        if (typeof video.requestFullscreen==='function') {video.requestFullscreen().catch(()=>{});} 
        else if(typeof video.webkitEnterFullscreen==='function') video.webkitEnterFullscreen();
      } else {
        dialogImg.src=images[selected-1];dialogImg.alt=picture.alt;
        if(typeof dialog.showModal==='function') dialog.showModal();
      }
    });
    previous.addEventListener('click',()=>show(selected-1));
    next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if(e.key==='ArrowLeft' || e.key==='ArrowRight') {
        e.preventDefault();
        show(selected+(e.key==='ArrowRight'?1:-1));
        // Arrow-key navigation focuses the newly selected thumbnail, not the old one.
        if(buttons.includes(e.target)) buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);
    return stage;
  }
  function redraw() {
    state.scheduled=false;
    if (state.drawing || !state.manifest) return;
    const l=lang(),r=country();
    if (state.stage?.isConnected && state.lang===l && state.region===r) return;
    state.lang=l;state.region=r;state.drawing=true;
    try {state.stage=createStage(state.manifest.regions[r],l,r);holder.replaceChildren(state.stage);}
    finally {state.drawing=false;}
  }
  function queue() {
    if (state.scheduled) return;
    state.scheduled=true;requestAnimationFrame(redraw);
  }
  new MutationObserver(queue).observe(holder,{childList:true});
  for (const id of ['p199-language','p199-country']) document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(response=>{
    if(!response.ok) throw Error('MANIFEST_HTTP_'+response.status);
    return response.json();
  }).then(json=>{state.manifest=validateManifest(json);queue();}).catch(err=>{
    holder.dataset.paletteGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('PALETTESPIN_R26R2_LOAD_HOLD',err);
  });
})();
