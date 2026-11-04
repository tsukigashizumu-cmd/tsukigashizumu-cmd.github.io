/* P19-9R6R9R27R2: Stockout Zero dedicated preview + US2/JP2 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Stockout Zero; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6768219693') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6768219693;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-stockout-images.json?v=p19-r27r2';
  const COPY = {
  "us": {
    "ja": [
      [
        "欠品ゼロへ、チェックから始める。",
        "欠品チェックを繰り返し、資金やレベルを伸ばしていくStockout Zero。動画では成長と自動化への流れを見られます。"
      ],
      [
        "欠品を確認し、次の成長へ。",
        "欠品チェック、資金、レベル、次の目標をまとめて確認できるホーム画面です。"
      ],
      [
        "成長を、数字で確かめる。",
        "最終目標の達成度や進行状況、統計を確認。欠品ゼロに近づくための現在地が分かります。"
      ],
      [
        "アップグレードで自動化を進める。",
        "設備や拡張機能を購入し、棚チェックから自動化へ。必要資金と購入状況を比較できます。"
      ]
    ],
    "en": [
      [
        "From small stock checks to automation.",
        "See the checks, upgrades, and progress that build an inventory operation toward zero stockouts."
      ],
      [
        "Start with a stock check.",
        "The home screen shows stock-check actions alongside funds, level, and the next milestone."
      ],
      [
        "Watch the numbers change.",
        "Track progress, statistics, and the final goal as the stockout prevention operation grows."
      ],
      [
        "Invest in the next upgrade.",
        "Browse purchasable expansions and automation systems, with their costs and available funds."
      ]
    ]
  },
  "jp": {
    "ja": [
      [
        "欠品ゼロへ、チェックから始める。",
        "タップで欠品を確認し、資金を貯めてアップグレードするゲームの進行を動画で見られます。"
      ],
      [
        "欠品だけは、出したくない。",
        "欠品の確認ボタンとレベル、資金などが並ぶホーム画面。小さな在庫チェックから始まります。"
      ],
      [
        "進み具合を数字で確認。",
        "在庫管理の進行状況や集計値を確認。次のアップグレードへ進むための現在地が分かります。"
      ],
      [
        "資金を使って、仕組みを拡張。",
        "購入できる設備・自動化の一覧と必要資金を確認し、在庫チェックを広げていきます。"
      ]
    ],
    "en": [
      [
        "From a tiny stock check to more.",
        "Watch stock checks earn funds and lead to upgrades in Stockout Zero."
      ],
      [
        "Keep stockouts in check.",
        "The Japanese home screen shows the stock-check action, level, funds, and current progress."
      ],
      [
        "Read the progress at a glance.",
        "View the statistics and current stage before deciding where to invest next."
      ],
      [
        "Build systems with your funds.",
        "Browse upgrade choices and required funds to expand the operation beyond manual checks."
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
      if (!Array.isArray(images) || images.length !== 3 || new Set(images).size !== images.length) throw Error('REGION_IMAGE_COUNT_MISMATCH_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region) {
    const japanese = language === 'ja';
    const text = COPY[region][language];
    const stage = make('section','tsz-stockout-stage');
    stage.id = 'tsz-stockout-r27r2';
    stage.dataset.mediaCount = String(images.length+1);
    stage.dataset.screenshotCount = String(images.length);
    const mediaCount=images.length+1;
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-stockout-top');
    top.append(make('span','tsz-stockout-kicker','APP / SCREEN COLLECTION'),
      make('span','tsz-stockout-total',japanese ? `動画 01 ＋ 実画面 ${String(images.length).padStart(2,'0')}` : `01 VIDEO + ${String(images.length).padStart(2,'0')} SCREENS`));
    const layout = make('div','tsz-stockout-layout');
    const visual = make('div','tsz-stockout-visual');
    const video = make('video','tsz-stockout-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-stockout-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-stockout-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-stockout-side');
    side.append(top);
    const editorial = make('div','tsz-stockout-editorial');
    const issue = make('span','tsz-stockout-issue');
    const headline = make('h3','tsz-stockout-headline');
    const body = make('p','tsz-stockout-body');
    editorial.append(issue,headline,body);
    const controls = make('div','tsz-stockout-controls');
    const nav = make('div','tsz-stockout-nav');
    const expand=make('button','tsz-stockout-expand',japanese?'動画を全画面で見る':'Watch fullscreen');
    expand.type='button';
    const previous=make('button','tsz-stockout-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-stockout-counter');
    const next=make('button','tsz-stockout-arrow','›');next.type='button';
    previous.setAttribute('aria-label',japanese?'前の項目':'Previous');next.setAttribute('aria-label',japanese?'次の項目':'Next');
    const navRight=make('div','tsz-stockout-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-stockout-thumbs');
    const buttons=[];
    for (let n=0; n<mediaCount; n++) {
      const button=make('button','tsz-stockout-thumb');button.type='button';
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
    const dialog=make('dialog','tsz-stockout-dialog');
    const dialogClose=make('button','tsz-stockout-dialog-close',japanese?'閉じる':'Close');dialogClose.type='button';
    const dialogImg=make('img','tsz-stockout-dialog-image');dialogImg.alt='';
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
        picture.alt=`Stockout Zero ${japanese?'実画面':'screenshot'} ${String(selected).padStart(2,'0')}`;}
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
    holder.dataset.stockoutGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('STOCKOUTZERO_R27R2_LOAD_HOLD',err);
  });
})();
