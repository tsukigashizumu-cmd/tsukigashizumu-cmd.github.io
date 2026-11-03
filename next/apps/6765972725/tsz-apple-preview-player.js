// TSZ P19-9R6R9R17: Jiiya Roll Apple App Preview in the EXISTING gallery.
// Inspired by approved Hitotsubu R7: one selection across VIDEO and images,
// dynamic image count, arrows and counter shared. App-specific scope ONLY.
(()=>{
 'use strict';
 const APP='6765972725';
 if(document.body?.getAttribute('data-p199-id')!==APP)return;
 const STYLE_ID='tsz-jiiya-r17-style';
 const CSS=String.raw`
body[data-p199-id="6765972725"] .tsz-jiiya-video-slot[hidden]{display:none!important}
body[data-p199-id="6765972725"] .tsz-jiiya-video-slot{
 box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;overflow:hidden;
 padding:0;margin:0;border:0;background:transparent;
}
body[data-p199-id="6765972725"] .tsz-jiiya-video{
 display:block;width:auto;max-width:100%;height:auto;
 max-height:clamp(270px,86cqi,410px);object-fit:contain;
 border-radius:12px;background:#171218;
}
body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb{position:relative;isolation:isolate}
body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.38);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb img{filter:brightness(.72) saturate(.75);border-radius:5px}
body[data-p199-id="6765972725"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-jiiya-current="false"]{
 border-color:#503943!important;background:transparent!important;box-shadow:none!important;
}
body[data-p199-id="6765972725"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-jiiya-current="true"]{
 border-color:#e7bea9!important;background:rgba(231,190,169,.13)!important;
 box-shadow:inset 0 0 0 1px rgba(231,190,169,.22)!important;
}
body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb[data-tsz-jiiya-current="true"] img{filter:none}
body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6765972725"] .tsz-jiiya-video-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6765972725"] .tsz-jiiya-video{height:100%;max-height:100%;object-position:center top}
}
@container (max-width:359px){
 body[data-p199-id="6765972725"] .tsz-jiiya-video{max-height:285px}
 body[data-p199-id="6765972725"] .tsz-jiiya-video-thumb::after{width:24px;height:24px;font-size:10px}
}
`;
 let activeStage=null;
 function mount(){
  const stage=document.querySelector('.p199r6-stage');
  if(!stage||!stage.isConnected)return false;
  if(stage===activeStage && stage.querySelector('.tsz-jiiya-video-thumb'))return true;
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
  const slot=document.createElement('div');slot.className='tsz-jiiya-video-slot';slot.hidden=true;
  const video=document.createElement('video');video.className='tsz-jiiya-video';
  video.controls=true;video.playsInline=true;video.preload='none';
  video.setAttribute('aria-label','Jiiya Roll App Preview');
  video.poster=firstImage.currentSrc||firstImage.src;
  slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
  const tab=document.createElement('button');tab.type='button';
  tab.className='p199r6-thumb tsz-jiiya-video-thumb';tab.setAttribute('aria-label','App Preview video');
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

  // Proposed feature-based copy: VIDEO + screenshot slots 01..05.
  // Every title/caption is subject to human image-to-copy review of the actual Apple screenshot.
  const EDITORIAL={
  "ja": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "サイコロひと振りから、チームが育つ。",
      "caption": "サイコロで資金を集め、個性的なスタッフを増やしていくJiiya Roll。小さな一手から広がる成長の流れを動画で見られます。"
    },
    {
      "eyebrow": "01 / サイコロ",
      "title": "振るたびに、次の展開が始まる。",
      "caption": "サイコロを振って資金を集めるシンプルな操作。積み重ねた一回が、チームを育てる最初のきっかけになります。"
    },
    {
      "eyebrow": "02 / 資金を集める",
      "title": "数字が増える楽しさを、少しずつ。",
      "caption": "出た目をきっかけに資金を積み上げていきます。集まった資金をどう使うかが、次の成長につながります。"
    },
    {
      "eyebrow": "03 / スタッフを雇う",
      "title": "仲間が増えると、景色も変わる。",
      "caption": "個性的なスタッフを雇い、少しずつチームを拡大。次に誰を迎えるかを考える楽しさがあります。"
    },
    {
      "eyebrow": "04 / 効率を高める",
      "title": "育てるほど、できることが増える。",
      "caption": "スタッフと環境を強化して効率を上げる。短いプレイでも前に進んだ実感を積み重ねられます。"
    },
    {
      "eyebrow": "05 / イベント",
      "title": "思いがけない展開も、遊びの一部。",
      "caption": "進行中に現れるイベントでは、そのときの状況を見て選択。毎回同じ流れにはならない育成を楽しめます。"
    },
    {
      "eyebrow": "06 / 選択する",
      "title": "次の一手は、自分で決める。",
      "caption": "イベントや育成の場面で選択を重ねる。サイコロを振るだけでは終わらないチーム運営の要素です。"
    },
    {
      "eyebrow": "07 / 時間を意識",
      "title": "24時間で、どこまで育てられる？",
      "caption": "最初のロールから始まる24時間の挑戦。限られた時間で試行回数と資金をどこまで伸ばせるか挑めます。"
    },
    {
      "eyebrow": "08 / ランキング",
      "title": "育てた成果を、記録に残そう。",
      "caption": "Game Centerのランキングでは、試行回数や最終資金などの結果を振り返れます。"
    },
    {
      "eyebrow": "09 / 実績",
      "title": "小さな達成も、次の目標に。",
      "caption": "Game Centerの実績が、プレイの積み重ねを別の楽しさに変えてくれます。"
    },
    {
      "eyebrow": "10 / チームの成長",
      "title": "ひと振りずつ、自分のチームへ。",
      "caption": "資金を集め、スタッフを増やし、効率を上げる。少しずつ積み上がるチームの成長を味わえます。"
    }
  ],
  "en": [
    {
      "eyebrow": "APP PREVIEW / VIDEO",
      "title": "One roll can grow a whole team.",
      "caption": "Roll dice, earn funds, and hire quirky staff. Watch a simple start develop into a growing team in Jiiya Roll."
    },
    {
      "eyebrow": "01 / ROLL THE DICE",
      "title": "Every roll starts the next move.",
      "caption": "Roll the dice to collect funds. Each small action can become the first step toward a stronger team."
    },
    {
      "eyebrow": "02 / COLLECT FUNDS",
      "title": "Enjoy seeing the numbers grow.",
      "caption": "Build up funds one roll at a time, then decide where those resources should go next."
    },
    {
      "eyebrow": "03 / HIRE STAFF",
      "title": "More teammates, more possibilities.",
      "caption": "Hire quirky staff members and expand your team step by step. Each addition changes how you grow."
    },
    {
      "eyebrow": "04 / IMPROVE EFFICIENCY",
      "title": "Make every step count.",
      "caption": "Improve your team and environment to boost efficiency, with progress that fits into short sessions."
    },
    {
      "eyebrow": "05 / EVENTS",
      "title": "Surprises keep the run moving.",
      "caption": "Encounter events as you play, then choose how to respond to the changing situation."
    },
    {
      "eyebrow": "06 / MAKE CHOICES",
      "title": "The next decision is yours.",
      "caption": "Choose how to manage events and your growing team. There is more to the game than simply rolling."
    },
    {
      "eyebrow": "07 / 24-HOUR RUN",
      "title": "How far can you grow in 24 hours?",
      "caption": "The challenge starts with your first roll. Build attempts and funds before the time runs out."
    },
    {
      "eyebrow": "08 / LEADERBOARDS",
      "title": "See what your progress adds up to.",
      "caption": "Game Center leaderboards let you compare results such as attempts and final funds."
    },
    {
      "eyebrow": "09 / ACHIEVEMENTS",
      "title": "Small wins give you new goals.",
      "caption": "Game Center achievements add milestones to the progress you make while playing."
    },
    {
      "eyebrow": "10 / TEAM PROGRESS",
      "title": "Build your team, one roll at a time.",
      "caption": "Earn funds, recruit staff, and improve efficiency. The team grows through steady, visible steps."
    }
  ]
};
  function applyEditorial(){
   const locale=japanese()?'ja':'en';
   const copy=EDITORIAL[locale][activeIndex];
   if(!copy)throw new Error('JIIYA_EDITORIAL_MISSING_FOR_SELECTED_ITEM');
   if(number && number.textContent!==copy.eyebrow)number.textContent=copy.eyebrow;
   if(heading && heading.textContent!==copy.title)heading.textContent=copy.title;
   if(caption && caption.textContent!==copy.caption)caption.textContent=copy.caption;
  }
  function sync(){
   choices.forEach((button,i)=>{
    const current=i===activeIndex;
    button.setAttribute('data-tsz-jiiya-current',current?'true':'false');
    button.setAttribute('aria-pressed',current?'true':'false');
    if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
   });
   counter.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
   stage.dataset.tszJiiyaSelected=activeIndex===0?'VIDEO':String(activeIndex).padStart(2,'0');
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
