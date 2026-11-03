// TSZ P19-9R6R9R14: Unit Choice Apple App Preview in the EXISTING gallery.
// Inspired by approved Hitotsubu R7: one selection across VIDEO and images,
// dynamic image count, arrows and counter shared. App-specific scope ONLY.
(()=>{
 'use strict';
 const APP='6762347699';
 if(document.body?.getAttribute('data-p199-id')!==APP)return;
 const STYLE_ID='tsz-unit-r13-style';
 const CSS=String.raw`
body[data-p199-id="6762347699"] .tsz-unit-video-slot[hidden]{display:none!important}
body[data-p199-id="6762347699"] .tsz-unit-video-slot{
 box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;overflow:hidden;
 padding:0;margin:0;border:0;background:transparent;
}
body[data-p199-id="6762347699"] .tsz-unit-video{
 display:block;width:auto;max-width:100%;height:auto;
 max-height:clamp(270px,86cqi,410px);object-fit:contain;
 border-radius:12px;background:#171218;
}
body[data-p199-id="6762347699"] .tsz-unit-video-thumb{position:relative;isolation:isolate}
body[data-p199-id="6762347699"] .tsz-unit-video-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.38);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6762347699"] .tsz-unit-video-thumb img{filter:brightness(.72) saturate(.75);border-radius:5px}
body[data-p199-id="6762347699"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-unit-current="false"]{
 border-color:#503943!important;background:transparent!important;box-shadow:none!important;
}
body[data-p199-id="6762347699"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-unit-current="true"]{
 border-color:#e7bea9!important;background:rgba(231,190,169,.13)!important;
 box-shadow:inset 0 0 0 1px rgba(231,190,169,.22)!important;
}
body[data-p199-id="6762347699"] .tsz-unit-video-thumb[data-tsz-unit-current="true"] img{filter:none}
body[data-p199-id="6762347699"] .tsz-unit-video-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6762347699"] .tsz-unit-video-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6762347699"] .tsz-unit-video{height:100%;max-height:100%;object-position:center top}
}
@container (max-width:359px){
 body[data-p199-id="6762347699"] .tsz-unit-video{max-height:285px}
 body[data-p199-id="6762347699"] .tsz-unit-video-thumb::after{width:24px;height:24px;font-size:10px}
}
`;
 let activeStage=null;
 function mount(){
  const stage=document.querySelector('.p199r6-stage');
  if(!stage||!stage.isConnected)return false;
  if(stage===activeStage && stage.querySelector('.tsz-unit-video-thumb'))return true;
  const layout=stage.querySelector('.p199r6-layout');
  const visual=layout?.querySelector('.p199r6-visual');
  const side=stage.querySelector('.p199r6-side');
  const rail=stage.querySelector('.p199r6-rail');
  const enlarge=stage.querySelector('.p199r6-inspect');
  const controls=stage.querySelector('.p199r6-control');
  const thumbs=rail?Array.from(rail.children).filter(n=>n.matches('button.p199r6-thumb')):[];
  const arrows=Array.from(controls?.querySelectorAll('button')||[]);
  const counter=controls?.querySelector('span');
  if(!layout||!visual||!side||!rail||!enlarge||!controls||!counter||arrows.length!==2||thumbs.length<1||thumbs.length>8)return false;
  const firstImage=thumbs[0].querySelector('img');
  if(!firstImage)return false;
  
  if(!document.getElementById(STYLE_ID)){
   const style=document.createElement('style');style.id=STYLE_ID;style.textContent=CSS;document.head.appendChild(style);
  }
  const total=thumbs.length+1;
  rail.style.gridTemplateColumns='repeat('+total+',minmax(0,1fr))';
  rail.style.width='min(100%, '+Math.min(500,total*96)+'px)';
  const slot=document.createElement('div');slot.className='tsz-unit-video-slot';slot.hidden=true;
  const video=document.createElement('video');video.className='tsz-unit-video';
  video.controls=true;video.playsInline=true;video.preload='none';
  video.setAttribute('aria-label','Unit Choice App Preview');
  video.poster=firstImage.currentSrc||firstImage.src;
  slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
  const tab=document.createElement('button');tab.type='button';
  tab.className='p199r6-thumb tsz-unit-video-thumb';tab.setAttribute('aria-label','App Preview video');
  const poster=firstImage.cloneNode(false);poster.removeAttribute('id');poster.alt='';poster.setAttribute('aria-hidden','true');
  const badge=document.createElement('span');badge.textContent='VIDEO';tab.append(poster,badge);rail.prepend(tab);
  const choices=[tab,...thumbs];
  const initial=counter.textContent.match(/\b0?([1-8])\s*\/\s*0?[1-8]\b/);
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

  // Proposed feature-based copy: VIDEO + screenshot slots 01..08.
  // Every title/caption must be visually checked against the actual Apple screenshot.
  const EDITORIAL={
  "ja": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "単価の違いを、動画で確かめる。",
      "caption": "値段と数量を入力して単価を比較。どちらがお得かを見つける一連の操作を、動画で確認できます。"
    },
    {
      "eyebrow": "01 / 価格と数量",
      "title": "値段と量を入れるだけ。",
      "caption": "商品の価格と数量を入力して、比較の出発点を作れます。容量や個数が違う商品にも対応します。"
    },
    {
      "eyebrow": "02 / 単価の比較",
      "title": "値札ではなく、単価で選ぶ。",
      "caption": "価格だけでは分からない違いを、1個・1単位あたりの金額で比べられます。"
    },
    {
      "eyebrow": "03 / 最安値の確認",
      "title": "本当に安い方が、分かる。",
      "caption": "大容量と小容量、セットと単品。単価と最安値を見て、納得して選べます。"
    },
    {
      "eyebrow": "04 / 平均と中央値",
      "title": "平均との差も、ひと目で。",
      "caption": "比較候補の単価に加えて、平均と中央値も確認できます。価格のばらつきを見る目安になります。"
    },
    {
      "eyebrow": "05 / 比較の保存",
      "title": "比べた結果を、次の買い物へ。",
      "caption": "入力した候補を一覧に保存できます。前に比較した商品を、買い物中に見返せます。"
    },
    {
      "eyebrow": "06 / 容量の違い",
      "title": "サイズが違っても、同じ基準で。",
      "caption": "商品の容量や個数が異なっていても、単価に換算して条件を揃えた比較ができます。"
    },
    {
      "eyebrow": "07 / 比較の再利用",
      "title": "前に買った価格とも、比べる。",
      "caption": "保存した商品を呼び出して、以前の単価と新しい候補の金額を見比べられます。"
    },
    {
      "eyebrow": "08 / 買い物の判断",
      "title": "「こっちがお得」を、納得して。",
      "caption": "単価・最安値・平均・中央値を手掛かりに、買い物中の小さな迷いを減らせます。"
    }
  ],
  "en": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "Watch unit-price comparison in action.",
      "caption": "See the flow from entering prices and quantities to choosing the better value."
    },
    {
      "eyebrow": "01 / PRICE AND QUANTITY",
      "title": "Enter the price. Enter the amount.",
      "caption": "Start with each product’s price and quantity, including different pack sizes and amounts."
    },
    {
      "eyebrow": "02 / UNIT PRICE",
      "title": "Look beyond the price tag.",
      "caption": "Compare costs per unit so products with different sizes can be judged on the same basis."
    },
    {
      "eyebrow": "03 / BEST VALUE",
      "title": "See which option costs less per unit.",
      "caption": "Compare large and small packs, or single items and bundles, using unit prices and the lowest-value result."
    },
    {
      "eyebrow": "04 / AVERAGE AND MEDIAN",
      "title": "Put each price in perspective.",
      "caption": "Alongside the best value, check the average and median unit prices across your comparison."
    },
    {
      "eyebrow": "05 / SAVE COMPARISONS",
      "title": "Keep the comparison for next time.",
      "caption": "Save your entries in a list and review a previous comparison while shopping."
    },
    {
      "eyebrow": "06 / MIXED SIZES",
      "title": "Different quantities. One fair measure.",
      "caption": "Convert different amounts or pack counts into unit prices to compare like with like."
    },
    {
      "eyebrow": "07 / REUSE SAVED ITEMS",
      "title": "Compare today with last time.",
      "caption": "Bring back saved entries and compare the same products again whenever you need."
    },
    {
      "eyebrow": "08 / CONFIDENT CHOICES",
      "title": "Make the call with clearer numbers.",
      "caption": "Use unit price, best value, average and median to reduce hesitation while you shop."
    }
  ]
};
  function applyEditorial(){
   const locale=japanese()?'ja':'en';
   const copy=EDITORIAL[locale][activeIndex];
   if(!copy)throw new Error('UNITCHOICE_EDITORIAL_MISSING_FOR_SELECTED_ITEM');
   if(number && number.textContent!==copy.eyebrow)number.textContent=copy.eyebrow;
   if(heading && heading.textContent!==copy.title)heading.textContent=copy.title;
   if(caption && caption.textContent!==copy.caption)caption.textContent=copy.caption;
  }
  function sync(){
   choices.forEach((button,i)=>{
    const current=i===activeIndex;
    button.setAttribute('data-tsz-unit-current',current?'true':'false');
    button.setAttribute('aria-pressed',current?'true':'false');
    if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
   });
   counter.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
   stage.dataset.tszUnitSelected=activeIndex===0?'VIDEO':String(activeIndex).padStart(2,'0');
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
   videoOff();activeIndex=1;sync();tab.disabled=true;
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
