/* P19-9R6R9R24R2: Unit Choice dedicated preview + 5 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Unit Choice; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6762347699') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6762347699;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-unitchoice-images.json?v=p19-r24r2';
  const COPY = {
    "ja": [
        [
            "価格と数量から、単価を比較。",
            "Unit Choiceの実操作映像。店舗名・商品名・数量・価格を入力し、単価を比較するまでの流れをご覧ください。"
        ],
        [
            "配色を見比べて選ぶ。",
            "カード状のプレビューとスライダーで、色の組み合わせを確認している画面です。"
        ],
        [
            "単価を数字とグラフで確認。",
            "商品と店舗ごとに単価を表示。最小・最大・平均・中央値をひとつの画面で見比べられます。"
        ],
        [
            "数量の入力例を確認。",
            "メニュー上に数量入力の説明が表示された画面。複数の欄を使った計算例を確認できます。"
        ],
        [
            "文字の大きさを調整。",
            "文字サイズと表示スタイルを選ぶ画面。複数の候補を見比べながら読みやすさを調整できます。"
        ],
        [
            "データをJSONで保存。",
            "保存・読込メニューから、現在の一覧をJSONファイルとして書き出す操作を確認できます。"
        ],
        [
            "商品名を指定して探す。",
            "入力済みの商品名を使って検索する確認画面。目的の商品を一覧から探せます。"
        ],
        [
            "店舗名を指定して探す。",
            "店舗名を入力して検索する確認画面。特定の店舗の記録を探す操作を示しています。"
        ],
        [
            "グラフの凡例を確認。",
            "単価・最小・最大・平均・中央値など、グラフ内のアイコンが表す指標を確認できます。"
        ]
    ],
    "en": [
        [
            "Compare unit prices as you enter.",
            "See Unit Choice in action: enter a store, product, quantity, and price, then review the comparison."
        ],
        [
            "Preview combinations of colors.",
            "A palette screen with card-shaped previews and sliders for reviewing different color combinations."
        ],
        [
            "Unit prices, numbers, and graphs.",
            "Compare unit price, minimum, maximum, average, and median for saved products and stores."
        ],
        [
            "See an example of quantity entry.",
            "An explanatory dialog shows how several quantity fields work together in a calculation."
        ],
        [
            "Adjust how the text appears.",
            "Compare font size and display-style options in a visual preview."
        ],
        [
            "Export your list as JSON.",
            "The Save/Load menu shows how to export the current list as a JSON file."
        ],
        [
            "Search by product name.",
            "A confirmation dialog for finding saved entries using the product name."
        ],
        [
            "Search by store name.",
            "A confirmation dialog for looking up records from a specific store."
        ],
        [
            "Understand each graph label.",
            "A help dialog explains the icons for unit price, minimum, maximum, average, and median."
        ]
    ]
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
      if (!Array.isArray(images) || images.length !== 8 || new Set(images).size !== 8) throw Error('EIGHT_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region) {
    const japanese = language === 'ja';
    const text = COPY[language];
    const stage = make('section','tsz-unitchoice-stage');
    stage.id = 'tsz-unitchoice-r24r2';
    stage.dataset.mediaCount = '9';
    stage.dataset.screenshotCount = String(images.length);
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-unitchoice-top');
    top.append(make('span','tsz-unitchoice-kicker','APP / SCREEN COLLECTION'),
      make('span','tsz-unitchoice-total',japanese ? '動画 01 ＋ 実画面 08' : '01 VIDEO + 08 ORIGINAL SCREENS'));
    const layout = make('div','tsz-unitchoice-layout');
    const visual = make('div','tsz-unitchoice-visual');
    const video = make('video','tsz-unitchoice-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-unitchoice-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-unitchoice-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-unitchoice-side');
    side.append(top);
    const editorial = make('div','tsz-unitchoice-editorial');
    const issue = make('span','tsz-unitchoice-issue');
    const headline = make('h3','tsz-unitchoice-headline');
    const body = make('p','tsz-unitchoice-body');
    const origin = make('p','tsz-unitchoice-origin',japanese?'Apple App Storeに掲載された実画面・実映像':'Original screenshots and video from the Apple App Store');
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-unitchoice-controls');
    const nav = make('div','tsz-unitchoice-nav');
    const expand=make('button','tsz-unitchoice-expand',japanese?'動画を全画面で見る':'Watch fullscreen');
    expand.type='button';
    const previous=make('button','tsz-unitchoice-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-unitchoice-counter');
    const next=make('button','tsz-unitchoice-arrow','›');next.type='button';
    previous.setAttribute('aria-label',japanese?'前の項目':'Previous');next.setAttribute('aria-label',japanese?'次の項目':'Next');
    const navRight=make('div','tsz-unitchoice-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-unitchoice-thumbs');
    const buttons=[];
    for (let n=0; n<9; n++) {
      const button=make('button','tsz-unitchoice-thumb');button.type='button';
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
    const dialog=make('dialog','tsz-unitchoice-dialog');
    const dialogClose=make('button','tsz-unitchoice-dialog-close',japanese?'閉じる':'Close');dialogClose.type='button';
    const dialogImg=make('img','tsz-unitchoice-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(8,state.selected));
    function show(index) {
      const normalized=(index+9)%9;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Unit Choice ${japanese?'実画面':'screenshot'} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?'VIDEO':`${japanese?'実画面':'SCREEN'} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 09`;
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
    holder.dataset.unitchoiceGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('UNIT_CHOICE_R24R2_LOAD_HOLD',err);
  });
})();
