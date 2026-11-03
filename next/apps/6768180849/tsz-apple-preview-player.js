// TSZ P19-9R6R9R19: Soft Count Apple App Preview in the EXISTING gallery.
// Inspired by approved Hitotsubu R7: one selection across VIDEO and images,
// dynamic image count, arrows and counter shared. App-specific scope ONLY.
(()=>{
 'use strict';
 const APP='6768180849';
 if(document.body?.getAttribute('data-p199-id')!==APP)return;
 const STYLE_ID='tsz-softcount-r19-style';
 const CSS=String.raw`
body[data-p199-id="6768180849"] .tsz-softcount-video-slot[hidden]{display:none!important}
body[data-p199-id="6768180849"] .tsz-softcount-video-slot{
 box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;overflow:hidden;
 padding:0;margin:0;border:0;background:transparent;
}
body[data-p199-id="6768180849"] .tsz-softcount-video{
 display:block;width:auto;max-width:100%;height:auto;
 max-height:clamp(270px,86cqi,410px);object-fit:contain;
 border-radius:12px;background:#171218;
}
body[data-p199-id="6768180849"] .tsz-softcount-video-thumb{position:relative;isolation:isolate}
body[data-p199-id="6768180849"] .tsz-softcount-video-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.38);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6768180849"] .tsz-softcount-video-thumb img{filter:brightness(.72) saturate(.75);border-radius:5px}
body[data-p199-id="6768180849"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-softcount-current="false"]{
 border-color:#503943!important;background:transparent!important;box-shadow:none!important;
}
body[data-p199-id="6768180849"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-softcount-current="true"]{
 border-color:#e7bea9!important;background:rgba(231,190,169,.13)!important;
 box-shadow:inset 0 0 0 1px rgba(231,190,169,.22)!important;
}
body[data-p199-id="6768180849"] .tsz-softcount-video-thumb[data-tsz-softcount-current="true"] img{filter:none}
body[data-p199-id="6768180849"] .tsz-softcount-video-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6768180849"] .tsz-softcount-video-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6768180849"] .tsz-softcount-video{height:100%;max-height:100%;object-position:center top}
}
@container (max-width:359px){
 body[data-p199-id="6768180849"] .tsz-softcount-video{max-height:285px}
 body[data-p199-id="6768180849"] .tsz-softcount-video-thumb::after{width:24px;height:24px;font-size:10px}
}
`;
 let activeStage=null;
 function mount(){
  const stage=document.querySelector('.p199r6-stage');
  if(!stage||!stage.isConnected)return false;
  if(stage===activeStage && stage.querySelector('.tsz-softcount-video-thumb'))return true;
  const layout=stage.querySelector('.p199r6-layout');
  const visual=layout?.querySelector('.p199r6-visual');
  const side=stage.querySelector('.p199r6-side');
  const rail=stage.querySelector('.p199r6-rail');
  const enlarge=stage.querySelector('.p199r6-inspect');
  const controls=stage.querySelector('.p199r6-control');
  const thumbs=rail?Array.from(rail.children).filter(n=>n.matches('button.p199r6-thumb')):[];
  const arrows=Array.from(controls?.querySelectorAll('button')||[]);
  const counter=controls?.querySelector('span');
  if(!layout||!visual||!side||!rail||!enlarge||!controls||!counter||arrows.length!==2||thumbs.length<1||thumbs.length>10)return false;
  const firstImage=thumbs[0].querySelector('img');
  if(!firstImage)return false;
  
  if(!document.getElementById(STYLE_ID)){
   const style=document.createElement('style');style.id=STYLE_ID;style.textContent=CSS;document.head.appendChild(style);
  }
  const total=thumbs.length+1;
  rail.style.gridTemplateColumns='repeat('+Math.min(6,total)+',minmax(0,1fr))';
  rail.style.width='min(100%, '+Math.min(570,Math.min(6,total)*96)+'px)';
  const slot=document.createElement('div');slot.className='tsz-softcount-video-slot';slot.hidden=true;
  const video=document.createElement('video');video.className='tsz-softcount-video';
  video.controls=true;video.playsInline=true;video.preload='none';
  video.setAttribute('aria-label','Soft Count App Preview');
  video.poster=firstImage.currentSrc||firstImage.src;
  slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
  const tab=document.createElement('button');tab.type='button';
  tab.className='p199r6-thumb tsz-softcount-video-thumb';tab.setAttribute('aria-label','App Preview video');
  const poster=firstImage.cloneNode(false);poster.removeAttribute('id');poster.alt='';poster.setAttribute('aria-hidden','true');
  const badge=document.createElement('span');badge.textContent='VIDEO';tab.append(poster,badge);rail.prepend(tab);
  const choices=[tab,...thumbs];
  const initial=counter.textContent.match(/\b(\d{1,2})\s*\/\s*\d{1,2}\b/);
  const selectedImage=thumbs.findIndex(t=>t.getAttribute('aria-current')==='true'||t.getAttribute('aria-current')==='page');
  let activeIndex=selectedImage>=0?selectedImage+1:(initial?Math.min(thumbs.length,Number(initial[1])):1);
  let videoMode=false;
  let savedText=null;
  const number=side.querySelector('.p199r6-number');
  const heading=side.querySelector('.p199r6-title');
  const caption=side.querySelector('.p199r6-caption');
  const collectionCount=stage.querySelector('.p199r6-mast > span:last-child');
  const japanese=()=>/^ja(?:-|$)/i.test(document.documentElement.lang||'ja');
  if(collectionCount)collectionCount.textContent=(japanese()?(thumbs.length+' 枚の画像 · 01 本の動画'):(thumbs.length+' screenshots · 01 video'));

  // Feature-based candidate copy: VIDEO and screenshot slots 01..10; verify actual image order.
  // Every title/caption is subject to human image-to-copy review of the actual Apple screenshot.
  const EDITORIAL={
  "ja": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "呼吸を、自分のリズムで。",
      "caption": "セッションの開始から呼吸のガイド、画面の調整まで。Soft Countの動きを動画で確かめられます。"
    },
    {
      "eyebrow": "01 / 呼吸ガイド",
      "title": "静かな画面が、呼吸の道しるべ。",
      "caption": "吸う・保持する・吐くの切り替わりを、やわらかな色と進行表示で見ながら呼吸できます。"
    },
    {
      "eyebrow": "02 / 呼吸リズム",
      "title": "今日の呼吸に合う、5つのリズム。",
      "caption": "Natural・Relaxation・Zen・Resonant・Calmingから、そのときの気分に合うリズムを選べます。"
    },
    {
      "eyebrow": "03 / セッション時間",
      "title": "1分から、自分の時間をつくる。",
      "caption": "1・3・5・10分のセッションを選択。短い休憩にも、ゆったりした時間にも使えます。"
    },
    {
      "eyebrow": "04 / リズム切替",
      "title": "途中で変えても、呼吸は続く。",
      "caption": "セッションを止めずに呼吸リズムを切り替えられます。残り時間と進行も引き継がれます。"
    },
    {
      "eyebrow": "05 / Focus Studio",
      "title": "呼吸リングまで、好きな表情に。",
      "caption": "Focus Studioでリング、マーカー、Glow、太さ、サイズや回転を調整し、自分らしい表示にできます。"
    },
    {
      "eyebrow": "06 / 表示を選ぶ",
      "title": "必要なガイドだけ、画面に。",
      "caption": "中央の秒数、進行表示、タイミングバー、フェーズラベルなど、表示する要素を選べます。"
    },
    {
      "eyebrow": "07 / ハプティクス",
      "title": "画面を見続けなくても、区切りが分かる。",
      "caption": "吸う・保持する・吐くなどの切り替わりを、ハプティクスでも確認できます。設定から切り替え可能です。"
    },
    {
      "eyebrow": "08 / ホーム画面Widget",
      "title": "ホーム画面から、そのまま始める。",
      "caption": "Widgetで時間と呼吸リズムを選び、アプリを探す手間なくセッションを開始できます。"
    },
    {
      "eyebrow": "09 / リマインダー",
      "title": "呼吸する時間を、忘れない。",
      "caption": "毎日の呼吸リマインダーを設定して、自分のタイミングに合わせて続けられます。"
    },
    {
      "eyebrow": "10 / 表示と言語",
      "title": "見た目も言葉も、自分に合わせる。",
      "caption": "ライト・ダークの外観やアプリ内言語を選択。右から左へ読む言語の表示にも対応しています。"
    }
  ],
  "en": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "Breathe at your own rhythm.",
      "caption": "Watch a session begin, follow its visual guidance, and see how Soft Count adapts to you."
    },
    {
      "eyebrow": "01 / BREATHING GUIDE",
      "title": "A quiet guide for every breath.",
      "caption": "Gentle colors and visual progress show when to inhale, hold, and exhale."
    },
    {
      "eyebrow": "02 / FIVE RHYTHMS",
      "title": "Five rhythms. Your choice.",
      "caption": "Select Natural, Relaxation, Zen, Resonant, or Calming to suit the moment."
    },
    {
      "eyebrow": "03 / SESSION LENGTH",
      "title": "Make room for one minute or ten.",
      "caption": "Choose a 1, 3, 5, or 10-minute session, from a quick pause to a longer break."
    },
    {
      "eyebrow": "04 / CHANGE MID-SESSION",
      "title": "Change the rhythm, keep your progress.",
      "caption": "Switch breathing patterns during a session without losing your remaining time."
    },
    {
      "eyebrow": "05 / FOCUS STUDIO",
      "title": "Shape the breathing ring your way.",
      "caption": "Tune rings, markers, glow, thickness, size, and rotation in Focus Studio."
    },
    {
      "eyebrow": "06 / VISUAL LAYERS",
      "title": "Keep only the guidance you want.",
      "caption": "Choose whether to show the center timer, progress, timing bar, and phase labels."
    },
    {
      "eyebrow": "07 / HAPTICS",
      "title": "Feel each shift in the breathing cycle.",
      "caption": "Optional haptic guidance helps mark inhale, hold, exhale, and other phases."
    },
    {
      "eyebrow": "08 / HOME SCREEN WIDGET",
      "title": "Start breathing from your Home Screen.",
      "caption": "Pick a duration and rhythm in the widget, then launch your session directly."
    },
    {
      "eyebrow": "09 / REMINDERS",
      "title": "Save a moment for your breath.",
      "caption": "Set a daily breathing reminder at a time that fits your routine."
    },
    {
      "eyebrow": "10 / APPEARANCE & LANGUAGE",
      "title": "Make the display feel like yours.",
      "caption": "Choose light or dark appearance and switch languages within the app, including right-to-left scripts."
    }
  ]
};
  function applyEditorial(){
   const locale=japanese()?'ja':'en';
   const copy=EDITORIAL[locale][activeIndex];
   if(!copy)throw new Error('SOFTCOUNT_EDITORIAL_MISSING_FOR_SELECTED_ITEM');
   if(number && number.textContent!==copy.eyebrow)number.textContent=copy.eyebrow;
   if(heading && heading.textContent!==copy.title)heading.textContent=copy.title;
   if(caption && caption.textContent!==copy.caption)caption.textContent=copy.caption;
  }
  function sync(){
   choices.forEach((button,i)=>{
    const current=i===activeIndex;
    button.setAttribute('data-tsz-softcount-current',current?'true':'false');
    button.setAttribute('aria-pressed',current?'true':'false');
    if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
   });
   counter.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
   stage.dataset.tszSoftCountSelected=activeIndex===0?'VIDEO':String(activeIndex).padStart(2,'0');
   applyEditorial();
  }
  function videoOn(){
   if(videoMode)return;
   savedText={number:number?.textContent,title:heading?.textContent,
    caption:caption?.textContent,inspect:enlarge.textContent};
   videoMode=true;activeIndex=0;
   visual.style.display='none';slot.hidden=false;
   if(number)number.textContent='APP PREVIEW / VIDEO';
   if(heading)heading.textContent=EDITORIAL[japanese()?'ja':'en'][0].title;
   if(caption)caption.textContent=EDITORIAL[japanese()?'ja':'en'][0].caption;
   enlarge.textContent=japanese()?'動画を全画面で見る':'Full-screen video';
   video.src='./tsz-apple-preview.mp4';sync();
   video.play().catch(()=>{});
  }
  function videoOff(){
   if(!videoMode)return;
   videoMode=false;video.pause();video.removeAttribute('src');video.load();
   slot.hidden=true;visual.style.removeProperty('display');
   if(savedText){
    if(number)number.textContent=savedText.number;
    if(heading)heading.textContent=savedText.title;
    if(caption)caption.textContent=savedText.caption;
    enlarge.textContent=savedText.inspect;
   }
  }
  function chooseImage(i){
   if(i<1||i>=total)return;
   videoOff();activeIndex=i;
   thumbs[i-1].click();
   sync();queueMicrotask(sync);requestAnimationFrame(sync);
  }
  function navigate(delta){
   const to=(activeIndex+delta+total)%total;
   if(to===0)videoOn();else chooseImage(to);
  }
  tab.addEventListener('click',e=>{
   e.stopPropagation();
   if(videoMode){video.paused?video.play().catch(()=>{}):video.pause();}
   else videoOn();
  });
  rail.addEventListener('click',e=>{
   const button=e.target.closest('button.p199r6-thumb');
   const i=thumbs.indexOf(button);
   if(i<0)return;
   videoOff();activeIndex=i+1;
   queueMicrotask(sync);requestAnimationFrame(sync);
  },true);
  controls.addEventListener('click',e=>{
   const button=e.target.closest('button');
   const delta=button===arrows[0]?-1:button===arrows[1]?1:0;
   if(!delta)return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   navigate(delta);
  },true);
  enlarge.addEventListener('click',e=>{
   if(!videoMode)return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   if(video.requestFullscreen)video.requestFullscreen().catch(()=>{});
   else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
  },true);
  video.addEventListener('error',()=>{
   if(!videoMode)return;
   chooseImage(1);tab.disabled=true;
   tab.title=japanese()?'動画を再生できません':'Video unavailable';
  });
  sync();activeStage=stage;return true;
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
 let scheduled=false;
 const observer=new MutationObserver(()=>{
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;if(!activeStage?.isConnected)activeStage=null;mount();});
 });
 observer.observe(document.body,{childList:true,subtree:true});
})();
