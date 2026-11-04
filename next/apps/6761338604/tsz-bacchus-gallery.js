/* P19-9R6R9R23R2: Bacchus Karma dedicated preview + 5 high-res Apple screenshots; selection/focus fix from ShopSuggest R22R3. Existing video identity confirmation required before apply.
   Keep the shared gallery untouched; this app alone has a Jiiya Roll-proportion player.
   Scoped to Bacchus Karma; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6761338604') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6761338604;
  const MEDIA = './tsz-apple-preview.mp4';
  const MANIFEST = './tsz-bacchus-images.json?v=p19-r23r2';
  const COPY = {
    ja: [
      ['ルールを作って、遊びはじめる。', 'Bacchus Karmaの実際のプレイ映像。盤面やピースの出現条件を自分で決めて遊ぶ流れをご覧ください。'],
      ['盤面も、ピースも、自分で決める。', '盤面・部品・骨格・出現条件などの作成画面へ。遊ぶ前の準備から自分で組み立てられます。'],
      ['出てくるピースを選ぶ。', '使うピースを選び、出現のしかたを調整。自分が遊びたいルールに近づけます。'],
      ['スタートする盤面を組み立てる。', 'マス目を使って、盤面の初期配置を編集。どこから始めるかも自分で決められます。'],
      ['作った配置を保存する。', '盤面の配置を保存・読み込み。作成した条件を切り替えながら試せます。'],
      ['ピースの出現条件を調整する。', 'ピースごとに出現の設定を確認・編集。組み合わせを変えて、自分だけのパズルに。']
    ],
    en: [
      ['Design the rules. Then play.', 'Watch Bacchus Karma in action. Build a starting board, choose your pieces, and play with the conditions you set.'],
      ['Your board. Your pieces. Your rules.', 'Start with the creation menu for boards, components, and other settings before playing.'],
      ['Choose the pieces that appear.', 'Select available pieces and tune how they enter the game to shape your own challenge.'],
      ['Build your starting board.', 'Edit the starting layout on a grid and choose the positions before the game begins.'],
      ['Save the setups you create.', 'Use save and load to manage your arrangements and return to a configuration.'],
      ['Tune the appearance of pieces.', 'Review and adjust each piece’s appearance settings to create your own puzzle balance.']
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
      if (!Array.isArray(images) || images.length !== 5 || new Set(images).size !== 5) throw Error('FIVE_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region) {
    const japanese = language === 'ja';
    const text = COPY[language];
    const stage = make('section','tsz-bacchus-stage');
    stage.id = 'tsz-bacchus-r23r2';
    stage.dataset.mediaCount = '6';
    stage.dataset.screenshotCount = String(images.length);
    // Focus is a navigation affordance, not a second selected thumbnail.
    stage.dataset.inputMode = 'pointer';
    stage.addEventListener('pointerdown', () => {stage.dataset.inputMode = 'pointer';}, true);
    stage.addEventListener('keydown', () => {stage.dataset.inputMode = 'keyboard';}, true);
    const top = make('div','tsz-bacchus-top');
    top.append(make('span','tsz-bacchus-kicker','APP / SCREEN COLLECTION'),
      make('span','tsz-bacchus-total',japanese ? '動画 01 ＋ 実画面 05' : '01 VIDEO + 05 ORIGINAL SCREENS'));
    const layout = make('div','tsz-bacchus-layout');
    const visual = make('div','tsz-bacchus-visual');
    const video = make('video','tsz-bacchus-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-bacchus-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-bacchus-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-bacchus-side');
    side.append(top);
    const editorial = make('div','tsz-bacchus-editorial');
    const issue = make('span','tsz-bacchus-issue');
    const headline = make('h3','tsz-bacchus-headline');
    const body = make('p','tsz-bacchus-body');
    const origin = make('p','tsz-bacchus-origin',japanese?'Apple App Storeに掲載された実画面・実映像':'Original screenshots and video from the Apple App Store');
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-bacchus-controls');
    const nav = make('div','tsz-bacchus-nav');
    const expand=make('button','tsz-bacchus-expand',japanese?'動画を全画面で見る':'Watch fullscreen');
    expand.type='button';
    const previous=make('button','tsz-bacchus-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-bacchus-counter');
    const next=make('button','tsz-bacchus-arrow','›');next.type='button';
    previous.setAttribute('aria-label',japanese?'前の項目':'Previous');next.setAttribute('aria-label',japanese?'次の項目':'Next');
    const navRight=make('div','tsz-bacchus-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-bacchus-thumbs');
    const buttons=[];
    for (let n=0; n<6; n++) {
      const button=make('button','tsz-bacchus-thumb');button.type='button';
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
    const dialog=make('dialog','tsz-bacchus-dialog');
    const dialogClose=make('button','tsz-bacchus-dialog-close',japanese?'閉じる':'Close');dialogClose.type='button';
    const dialogImg=make('img','tsz-bacchus-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(5,state.selected));
    function show(index) {
      const normalized=(index+6)%6;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Bacchus Karma ${japanese?'実画面':'screenshot'} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?'VIDEO':`${japanese?'実画面':'SCREEN'} ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 06`;
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
    holder.dataset.bacchusGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('BACCHUS_R23R2_LOAD_HOLD',err);
  });
})();
