/* P19-9R6R9R21R4: independent Apple 10 screenshots + approved Minpick video.
   Fix: the protected shared gallery truncates images to five (.slice(0,5)); do not depend on its DOM.
   Scoped to Minpick; protected shared JS and CSS stay unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6781131521') return;
  const holder = document.getElementById('p199-gallery');
  if (!holder) return;
  const APP = 6781131521;
  const MEDIA = './minpick-apple-preview.mp4';
  const MANIFEST = './minpick-apple-images.json?v=p19-r21r4';
  const COPY = {
    ja: [
      ['実際の動きを見る', 'App Storeに掲載されたMinpickの実映像。時間を選び、候補からひとつを始めるまで。'],
      ['5分ある。その先は？', '何を始めるか迷う時間を、少し短く。今ある時間から始めよう。'],
      ['今の時間に収まる用事だけ', '使える分数を選ぶと、今の時間に合う候補を最大3件表示。'],
      ['ひとつ選んで始める', '候補からひとつを選ぶ。全部を終わらせなくてもいい。'],
      ['できた。', 'ひとつ終わったことを確かめる画面。'],
      ['そのまま次へ。', 'ひとつ終えて、次の一歩を選べる。'],
      ['3分だけ？ それでも十分。', '短い時間にできることを探せる。'],
      ['今ある時間を、そのまま使う。', '使える時間を、自分で選べる。'],
      ['あとでやることは預けておく。', '今やらないことは、リストに残しておける。'],
      ['ホーム画面からすぐ始める。', 'ホーム画面から使える時間を選ぶ。'],
      ['今ある時間で、ひとつ進める。', '今の5分で、一つの用事を始めよう。']
    ],
    en: [
      ['See Minpick in motion', 'The original App Store preview: pick a time, find a fit, and get started.'],
      ['Five minutes appeared', 'Choosing what to start should not consume them. Make a start with the time you have.'],
      ['Only what fits', 'Select the minutes available and see up to three fitting tasks.'],
      ['One task, your choice', 'Choose one to begin. You do not have to finish everything.'],
      ['Done.', 'A simple view of one finished task.'],
      ['On to the next.', 'After one task, choose what comes next.'],
      ['Only three minutes? Still enough.', 'Find something small enough for the time you have.'],
      ['Use the time you have.', 'Choose the amount of time available.'],
      ['Keep the rest for later.', 'Keep tasks you are not doing now in a list.'],
      ['Start from your Home Screen.', 'Choose your available time from the Home Screen.'],
      ['One small step, right now.', 'Start one task with the next five minutes.']
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
      if (!Array.isArray(images) || images.length !== 10 || new Set(images).size !== 10) throw Error('TEN_IMAGES_REQUIRED_'+region);
      if (!images.every(src => /^https:\/\/[^/]+\.mzstatic\.com\//i.test(src))) throw Error('APPLE_IMAGE_ORIGIN_REQUIRED_'+region);
    }
    return value;
  }
  function createStage(images, language, region) {
    const japanese = language === 'ja';
    const text = COPY[language];
    const stage = make('section','tsz-minpick-stage');
    stage.id = 'tsz-minpick-r21r4';
    stage.dataset.mediaCount = '11';
    stage.dataset.screenshotCount = String(images.length);
    const top = make('div','tsz-minpick-top');
    top.append(make('span','tsz-minpick-kicker','APP / SCREEN COLLECTION'),
      make('span','tsz-minpick-total',japanese ? '動画 01 ＋ 実画面 10' : '01 VIDEO + 10 ORIGINAL SCREENS'));
    const layout = make('div','tsz-minpick-layout');
    const visual = make('div','tsz-minpick-visual');
    const video = make('video','tsz-minpick-video');
    video.controls=true; video.playsInline=true; video.preload='metadata'; video.src=MEDIA;
    video.setAttribute('playsinline','');video.poster=images[0];
    const picture = make('img','tsz-minpick-image');
    picture.loading='eager'; picture.referrerPolicy='no-referrer';
    const error = make('p','tsz-minpick-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');
    error.hidden=true;
    picture.addEventListener('load',()=>{if (!picture.hidden) error.hidden=true;});
    picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
    visual.append(video,picture,error);
    const side = make('div','tsz-minpick-side');
    side.append(top);
    const editorial = make('div','tsz-minpick-editorial');
    const issue = make('span','tsz-minpick-issue');
    const headline = make('h3','tsz-minpick-headline');
    const body = make('p','tsz-minpick-body');
    const origin = make('p','tsz-minpick-origin',japanese?'Apple App Storeに掲載された実画面・実映像':'Original screenshots and video from the Apple App Store');
    editorial.append(issue,headline,body,origin);
    const controls = make('div','tsz-minpick-controls');
    const nav = make('div','tsz-minpick-nav');
    const expand=make('button','tsz-minpick-expand',japanese?'動画を全画面で見る':'Watch fullscreen');
    expand.type='button';
    const previous=make('button','tsz-minpick-arrow','‹');previous.type='button';
    const counter=make('strong','tsz-minpick-counter');
    const next=make('button','tsz-minpick-arrow','›');next.type='button';
    previous.setAttribute('aria-label',japanese?'前の項目':'Previous');next.setAttribute('aria-label',japanese?'次の項目':'Next');
    const navRight=make('div','tsz-minpick-nav-right');
    navRight.append(previous,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-minpick-thumbs');
    const buttons=[];
    for (let n=0; n<11; n++) {
      const button=make('button','tsz-minpick-thumb');button.type='button';
      button.title=n===0?(japanese?'動画':'Video'):`${japanese?'画像':'Screenshot'} ${n}`;
      button.setAttribute('aria-label',button.title);
      const thumbnail=make('img','');thumbnail.src=images[n===0?0:n-1];thumbnail.loading='lazy';
      thumbnail.referrerPolicy='no-referrer';thumbnail.alt='';
      button.append(thumbnail,make('span','',n===0?(japanese?'動画':'VIDEO'):String(n).padStart(2,'0')));
      button.addEventListener('click',()=>show(n));
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);
    layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-minpick-dialog');
    const dialogClose=make('button','tsz-minpick-dialog-close',japanese?'閉じる':'Close');dialogClose.type='button';
    const dialogImg=make('img','tsz-minpick-dialog-image');dialogImg.alt='';
    dialog.append(dialogClose,dialogImg);stage.append(dialog);
    dialogClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
    let selected=Math.max(0,Math.min(10,state.selected));
    function show(index) {
      const normalized=(index+11)%11;
      if (selected===0 && normalized!==0) video.pause();
      selected=normalized;state.selected=selected;
      const isVideo=selected===0;
      video.hidden=!isVideo;picture.hidden=isVideo;
      if (!isVideo) {error.hidden=true;picture.src=images[selected-1];
        picture.alt=`Minpick ${japanese?'実画面':'screenshot'} ${String(selected).padStart(2,'0')}`;}
      else error.hidden=true;
      issue.textContent=isVideo?'VIDEO':`SCREEN ${String(selected).padStart(2,'0')}`;
      headline.textContent=text[selected][0];body.textContent=text[selected][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(selected+1).padStart(2,'0')} / 11`;
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
      if(e.key==='ArrowLeft' || e.key==='ArrowRight') {e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));}
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
    holder.dataset.minpickGalleryError=String(err?.message || 'MANIFEST_LOAD_FAILED');
    console.error('MINPICK_R21R3_LOAD_HOLD',err);
  });
})();
