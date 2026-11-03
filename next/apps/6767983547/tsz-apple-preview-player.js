// TSZ P19-9R6R9R18: Palette Spin Apple App Preview in the EXISTING gallery.
// Inspired by approved Hitotsubu R7: one selection across VIDEO and images,
// dynamic image count, arrows and counter shared. App-specific scope ONLY.
(()=>{
 'use strict';
 const APP='6767983547';
 if(document.body?.getAttribute('data-p199-id')!==APP)return;
 const STYLE_ID='tsz-palette-r18-style';
 const CSS=String.raw`
body[data-p199-id="6767983547"] .tsz-palette-video-slot[hidden]{display:none!important}
body[data-p199-id="6767983547"] .tsz-palette-video-slot{
 box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;overflow:hidden;
 padding:0;margin:0;border:0;background:transparent;
}
body[data-p199-id="6767983547"] .tsz-palette-video{
 display:block;width:auto;max-width:100%;height:auto;
 max-height:clamp(270px,86cqi,410px);object-fit:contain;
 border-radius:12px;background:#171218;
}
body[data-p199-id="6767983547"] .tsz-palette-video-thumb{position:relative;isolation:isolate}
body[data-p199-id="6767983547"] .tsz-palette-video-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.38);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6767983547"] .tsz-palette-video-thumb img{filter:brightness(.72) saturate(.75);border-radius:5px}
body[data-p199-id="6767983547"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-palette-current="false"]{
 border-color:#503943!important;background:transparent!important;box-shadow:none!important;
}
body[data-p199-id="6767983547"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-palette-current="true"]{
 border-color:#e7bea9!important;background:rgba(231,190,169,.13)!important;
 box-shadow:inset 0 0 0 1px rgba(231,190,169,.22)!important;
}
body[data-p199-id="6767983547"] .tsz-palette-video-thumb[data-tsz-palette-current="true"] img{filter:none}
body[data-p199-id="6767983547"] .tsz-palette-video-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6767983547"] .tsz-palette-video-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6767983547"] .tsz-palette-video{height:100%;max-height:100%;object-position:center top}
}
@container (max-width:359px){
 body[data-p199-id="6767983547"] .tsz-palette-video{max-height:285px}
 body[data-p199-id="6767983547"] .tsz-palette-video-thumb::after{width:24px;height:24px;font-size:10px}
}
`;
 let activeStage=null;
 function mount(){
  const stage=document.querySelector('.p199r6-stage');
  if(!stage||!stage.isConnected)return false;
  if(stage===activeStage && stage.querySelector('.tsz-palette-video-thumb'))return true;
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
  const slot=document.createElement('div');slot.className='tsz-palette-video-slot';slot.hidden=true;
  const video=document.createElement('video');video.className='tsz-palette-video';
  video.controls=true;video.playsInline=true;video.preload='none';
  video.setAttribute('aria-label','Palette Spin App Preview');
  video.poster=firstImage.currentSrc||firstImage.src;
  slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
  const tab=document.createElement('button');tab.type='button';
  tab.className='p199r6-thumb tsz-palette-video-thumb';tab.setAttribute('aria-label','App Preview video');
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
      "title": "色を回して、壁紙をつくろう。",
      "caption": "パレットを回し、グラデーションに写真や文字を重ねる。色から壁紙を完成させるまでの操作を動画で確かめられます。"
    },
    {
      "eyebrow": "01 / 色を選ぶ",
      "title": "好きな色から、始めよう。",
      "caption": "気になる色を選ぶところがスタート。壁紙づくりを、難しい設定なしで始められます。"
    },
    {
      "eyebrow": "02 / パレットを回す",
      "title": "回すたび、配色が変わる。",
      "caption": "パレットの組み合わせをスピンして、色が見せる違う表情を探せます。"
    },
    {
      "eyebrow": "03 / グラデーション",
      "title": "色の重なりを、背景に。",
      "caption": "グラデーションを使えば、なめらかな色の移り変わりを壁紙としてデザインできます。"
    },
    {
      "eyebrow": "04 / 写真を加える",
      "title": "写真にも、好きな色の気配を。",
      "caption": "手持ちの写真を背景レイヤーに追加。色と写真を組み合わせた壁紙を作れます。"
    },
    {
      "eyebrow": "05 / 合成を調整",
      "title": "重ね方ひとつで、印象が変わる。",
      "caption": "写真の合成モードや透明度を調整して、背景とのなじみ方を細かく変えられます。"
    },
    {
      "eyebrow": "06 / 位置とサイズ",
      "title": "見せたい場所に、ぴったり。",
      "caption": "写真の拡大率や位置を動かし、壁紙に使いたい構図へ整えられます。"
    },
    {
      "eyebrow": "07 / テキスト",
      "title": "言葉も、デザインの一部に。",
      "caption": "文字を加えて、フォント・色・縁取り・影・回転を調整。言葉の見せ方まで作り込めます。"
    },
    {
      "eyebrow": "08 / 壁紙をプレビュー",
      "title": "画面に置いた姿を、先に見る。",
      "caption": "iPhone風のプレビューで縦向き・横向きの構図を確認しながら仕上げられます。"
    },
    {
      "eyebrow": "09 / 写真へ保存",
      "title": "仕上げた一枚を、写真へ。",
      "caption": "完成した壁紙は写真アプリへ保存。使いたい色と構図をそのまま持ち出せます。"
    },
    {
      "eyebrow": "10 / タイルに分割",
      "title": "一枚でも、分割しても。",
      "caption": "壁紙全体として保存するほか、デザインをタイルに分けて書き出すこともできます。"
    }
  ],
  "en": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "Spin colors into your own wallpaper.",
      "caption": "Explore palettes, gradients, photos, and typography. See the wallpaper-making workflow in motion."
    },
    {
      "eyebrow": "01 / PICK COLORS",
      "title": "Start with the colors you love.",
      "caption": "Choose colors that feel right and begin creating without a complicated setup."
    },
    {
      "eyebrow": "02 / SPIN THE PALETTE",
      "title": "A fresh combination with every spin.",
      "caption": "Spin through color patterns to discover how a different palette can change the mood."
    },
    {
      "eyebrow": "03 / GRADIENTS",
      "title": "Let the colors flow together.",
      "caption": "Use soft transitions and bold color combinations to build a wallpaper background."
    },
    {
      "eyebrow": "04 / ADD A PHOTO",
      "title": "Bring your photos into the palette.",
      "caption": "Add a photo as a background layer and combine it with your chosen color design."
    },
    {
      "eyebrow": "05 / BLEND EFFECTS",
      "title": "Change the mood by changing the blend.",
      "caption": "Tune blend mode and opacity to decide how photos and colors work together."
    },
    {
      "eyebrow": "06 / POSITION & SCALE",
      "title": "Make the composition yours.",
      "caption": "Adjust photo position and scale to choose what stands out in your wallpaper."
    },
    {
      "eyebrow": "07 / ADD TEXT",
      "title": "Make your words part of the design.",
      "caption": "Customize font, color, outline, shadow, and rotation to give text its own character."
    },
    {
      "eyebrow": "08 / PREVIEW",
      "title": "See how it looks on a phone.",
      "caption": "Preview portrait and landscape layouts on an iPhone-style screen before saving."
    },
    {
      "eyebrow": "09 / SAVE TO PHOTOS",
      "title": "Keep your finished wallpaper.",
      "caption": "Save the final wallpaper to Photos, ready to use on your device."
    },
    {
      "eyebrow": "10 / TILE EXPORT",
      "title": "Export the whole design or its pieces.",
      "caption": "Save a complete wallpaper or split your design into tiles for more options."
    }
  ]
};
  function applyEditorial(){
   const locale=japanese()?'ja':'en';
   const copy=EDITORIAL[locale][activeIndex];
   if(!copy)throw new Error('PALETTE_EDITORIAL_MISSING_FOR_SELECTED_ITEM');
   if(number && number.textContent!==copy.eyebrow)number.textContent=copy.eyebrow;
   if(heading && heading.textContent!==copy.title)heading.textContent=copy.title;
   if(caption && caption.textContent!==copy.caption)caption.textContent=copy.caption;
  }
  function sync(){
   choices.forEach((button,i)=>{
    const current=i===activeIndex;
    button.setAttribute('data-tsz-palette-current',current?'true':'false');
    button.setAttribute('aria-pressed',current?'true':'false');
    if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
   });
   counter.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
   stage.dataset.tszPaletteSelected=activeIndex===0?'VIDEO':String(activeIndex).padStart(2,'0');
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
