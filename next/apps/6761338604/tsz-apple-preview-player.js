// TSZ P19-9R6R9R13: Bacchus Karma Apple App Preview in the EXISTING gallery.
// Inspired by approved Hitotsubu R7: one selection across VIDEO and images,
// dynamic image count, arrows and counter shared. App-specific scope ONLY.
(()=>{
 'use strict';
 const APP='6761338604';
 if(document.body?.getAttribute('data-p199-id')!==APP)return;
 const STYLE_ID='tsz-bacchus-r13-style';
 const CSS=String.raw`
body[data-p199-id="6761338604"] .tsz-bacchus-video-slot[hidden]{display:none!important}
body[data-p199-id="6761338604"] .tsz-bacchus-video-slot{
 box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;overflow:hidden;
 padding:0;margin:0;border:0;background:transparent;
}
body[data-p199-id="6761338604"] .tsz-bacchus-video{
 display:block;width:auto;max-width:100%;height:auto;
 max-height:clamp(270px,86cqi,410px);object-fit:contain;
 border-radius:12px;background:#171218;
}
body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb{position:relative;isolation:isolate}
body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.38);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb img{filter:brightness(.72) saturate(.75);border-radius:5px}
body[data-p199-id="6761338604"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-bacchus-current="false"]{
 border-color:#503943!important;background:transparent!important;box-shadow:none!important;
}
body[data-p199-id="6761338604"] .p199r6-stage .p199r6-rail > button.p199r6-thumb[data-tsz-bacchus-current="true"]{
 border-color:#e7bea9!important;background:rgba(231,190,169,.13)!important;
 box-shadow:inset 0 0 0 1px rgba(231,190,169,.22)!important;
}
body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb[data-tsz-bacchus-current="true"] img{filter:none}
body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6761338604"] .tsz-bacchus-video-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6761338604"] .tsz-bacchus-video{height:100%;max-height:100%;object-position:center top}
}
@container (max-width:359px){
 body[data-p199-id="6761338604"] .tsz-bacchus-video{max-height:285px}
 body[data-p199-id="6761338604"] .tsz-bacchus-video-thumb::after{width:24px;height:24px;font-size:10px}
}
`;
 let activeStage=null;
 function mount(){
  const stage=document.querySelector('.p199r6-stage');
  if(!stage||!stage.isConnected)return false;
  if(stage===activeStage && stage.querySelector('.tsz-bacchus-video-thumb'))return true;
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
  if(thumbs.length!==5){stage.dataset.tszBacchusEditorialHold='SCREEN_COUNT_NOT_5';return false;}
  if(!document.getElementById(STYLE_ID)){
   const style=document.createElement('style');style.id=STYLE_ID;style.textContent=CSS;document.head.appendChild(style);
  }
  const total=thumbs.length+1;
  rail.style.gridTemplateColumns='repeat('+total+',minmax(0,1fr))';
  rail.style.width='min(100%, '+Math.min(500,total*96)+'px)';
  const slot=document.createElement('div');slot.className='tsz-bacchus-video-slot';slot.hidden=true;
  const video=document.createElement('video');video.className='tsz-bacchus-video';
  video.controls=true;video.playsInline=true;video.preload='none';
  video.setAttribute('aria-label','Bacchus Karma App Preview');
  video.poster=firstImage.currentSrc||firstImage.src;
  slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
  const tab=document.createElement('button');tab.type='button';
  tab.className='p199r6-thumb tsz-bacchus-video-thumb';tab.setAttribute('aria-label','App Preview video');
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

  // P19-9R6R9R13R1: Image-verified Bacchus-specific copy. Index: VIDEO, screenshots 01–05.
  // Each screenshot was matched with the actual Apple image before authoring.
  const EDITORIAL={
   ja:[
    {eyebrow:'APP PREVIEW / VIDEO',title:'自分で作ったルールで、遊ぼう。',caption:'盤面やピースを設定し、その条件で遊ぶBacchus Karma。ゲームの動きをApp Previewで確かめられます。'},
    {eyebrow:'01 / 6つの作成メニュー',title:'ゲームの中身から、自分で作る。',caption:'盤面、部品、骨牌、運任、因果、応報。6つの作成メニューから、自分だけの落ちモノパズルを組み立てます。'},
    {eyebrow:'02 / 運任作成',title:'次に何が出るかも、自分次第。',caption:'「運任作成」では使う要素を選び、1手の制限時間を調整。画面には30秒の設定と、出現候補が並んでいます。'},
    {eyebrow:'03 / 因果作成',title:'マス目に、思い描いた形を。',caption:'「因果作成」では細かなグリッドに緑や黄色のマスを配置。パターンを組み合わせて、自分なりの盤面を形にできます。'},
    {eyebrow:'04 / 部品作成',title:'ピースの形さえ、手で作れる。',caption:'「部品作成」では番号付きの候補を選び、下のマス目で形を編集。保存と読込の操作も備えています。'},
    {eyebrow:'05 / 骨牌作成',title:'出現確率まで、ルールになる。',caption:'「骨牌作成」では使う候補を選び、∞・×・部品の出現確率を確認。落ちてくるものの組み合わせまで設計できます。'}
   ],
   en:[
    {eyebrow:'APP PREVIEW / VIDEO',title:'Build the rules. Play your puzzle.',caption:'See Bacchus Karma in motion—from configuring the board and pieces to playing with the rules you created.'},
    {eyebrow:'01 / CREATION MENU',title:'Create the game behind the puzzle.',caption:'Six creation tools let you shape the board, parts, tiles, randomness, cause and effect, and more before playing.'},
    {eyebrow:'02 / RANDOMNESS SETUP',title:'Choose what comes next.',caption:'Pick the elements that can appear and set the time for each move. This screen shows a 30-second setting and the available choices.'},
    {eyebrow:'03 / BOARD PATTERNS',title:'Shape your ideas, cell by cell.',caption:'Use a fine grid of green and yellow cells in the pattern editor to design and combine your own arrangements.'},
    {eyebrow:'04 / PART EDITOR',title:'Even the pieces are yours to create.',caption:'Choose from numbered part slots, edit a shape on the grid below, then save or load your arrangement.'},
    {eyebrow:'05 / PIECE PROBABILITIES',title:'Design the odds, not just the board.',caption:'Select the available tiles and inspect the probabilities for infinity, cross, and regular pieces to tune what can appear.'}
   ]
  };
  function applyEditorial(){
   const locale=japanese()?'ja':'en';
   const copy=EDITORIAL[locale][activeIndex];
   if(!copy)throw new Error('BACCHUS_EDITORIAL_MISSING_FOR_SELECTED_ITEM');
   if(number && number.textContent!==copy.eyebrow)number.textContent=copy.eyebrow;
   if(heading && heading.textContent!==copy.title)heading.textContent=copy.title;
   if(caption && caption.textContent!==copy.caption)caption.textContent=copy.caption;
  }
  function sync(){
   choices.forEach((button,i)=>{
    const current=i===activeIndex;
    button.setAttribute('data-tsz-bacchus-current',current?'true':'false');
    button.setAttribute('aria-pressed',current?'true':'false');
    if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
   });
   counter.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
   stage.dataset.tszBacchusSelected=activeIndex===0?'VIDEO':String(activeIndex).padStart(2,'0');
   applyEditorial();
  }
  function videoOn(){
   if(videoMode)return;
   savedText={number:number?.textContent,title:heading?.textContent,
    caption:caption?.textContent,inspect:enlarge.textContent};
   videoMode=true;activeIndex=0;
   visual.style.display='none';slot.hidden=false;
   if(number)number.textContent='APP PREVIEW / VIDEO';
   if(heading)heading.textContent=japanese()?'盤面も、ピースも、自分で決める。':'Create the board. Choose the pieces.';
   if(caption)caption.textContent=japanese()?'盤面の構築からピース配置まで。プレイの様子を動画で。':'See how the custom block puzzle plays.';
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
