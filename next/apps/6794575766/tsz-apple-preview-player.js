// P19-9R6R9R10R5 — Hitotsubu gallery-integrated Apple App Preview.
// R4 downloaded the video; this file ONLY redesigns its presentation.
(()=>{
  'use strict';
  const APP='6794575766';
  if(document.body?.getAttribute('data-p199-id')!==APP)return;
  const CSS=String.raw`
body[data-p199-id="6794575766"] .p199r10r5-slot[hidden]{display:none!important}
body[data-p199-id="6794575766"] .p199r10r5-slot{
 box-sizing:border-box;min-width:0;width:100%;max-width:100%;height:auto;
 display:flex;align-items:center;justify-content:center;padding:0;margin:0;
 border:0;background:transparent;overflow:hidden;
}
body[data-p199-id="6794575766"] .p199r10r5-player{
 display:block;box-sizing:border-box;width:auto;max-width:100%;
 height:auto;max-height:clamp(270px,86cqi,410px);
 object-fit:contain;border-radius:12px;background:#171218;
 box-shadow:0 10px 28px rgba(0,0,0,.20)
}
body[data-p199-id="6794575766"] .p199r6-rail.p199r10r5-rail{
 grid-template-columns:repeat(4,minmax(0,1fr));width:min(100%,440px);
}
body[data-p199-id="6794575766"] .p199r10r5-thumb{
 position:relative;color:inherit;isolation:isolate;
}
body[data-p199-id="6794575766"] .p199r10r5-thumb::after{
 content:'▶';position:absolute;top:31%;left:50%;transform:translate(-50%,-50%);
 display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
 color:#261924;background:#f1d7c7;box-shadow:0 4px 16px rgba(0,0,0,.45);
 font-size:12px;text-indent:2px;pointer-events:none;
}
body[data-p199-id="6794575766"] .p199r10r5-thumb img{
 filter:brightness(.72) saturate(.75);border-radius:5px;
}
body[data-p199-id="6794575766"] .p199r10r5-thumb[data-selected="true"]{
 border-color:#e7bea9;background:rgba(231,190,169,.13);
}
body[data-p199-id="6794575766"] .p199r10r5-thumb[data-selected="true"] img{filter:none}
body[data-p199-id="6794575766"] .p199r10r5-thumb span{font-size:10px;letter-spacing:.08em;font-weight:700}
@container (min-width:690px){
 body[data-p199-id="6794575766"] .p199r10r5-slot{
  grid-column:1;grid-row:1 / 4;align-self:start;justify-self:stretch;
  height:var(--p199r9r1-image-height,650px);padding:0 10px 0 0;
  border-right:1px solid rgba(224,192,183,.17)
 }
 body[data-p199-id="6794575766"] .p199r10r5-player{
  height:100%;max-height:100%;max-width:100%;object-position:center top
 }
}
@container (max-width:359px){
 body[data-p199-id="6794575766"] .p199r10r5-player{max-height:285px}
 body[data-p199-id="6794575766"] .p199r10r5-thumb::after{width:24px;height:24px;font-size:10px}
}
@media (prefers-reduced-motion:reduce){
 body[data-p199-id="6794575766"] .p199r10r5-thumb{transition:none}
}`;
  const STY='p199r10r5-css';
  let activeStage=null;
  function mount(){
    const stage=document.querySelector('.p199r6-stage');
    if(!stage||!stage.isConnected)return false;
    if(stage===activeStage&&stage.querySelector('.p199r10r5-thumb'))return true;
    const layout=stage.querySelector('.p199r6-layout');
    const visual=layout?.querySelector('.p199r6-visual');
    const side=stage.querySelector('.p199r6-side');
    const rail=stage.querySelector('.p199r6-rail');
    const enlarge=stage.querySelector('.p199r6-inspect');
    const controls=stage.querySelector('.p199r6-control');
    const thumbs=rail?Array.from(rail.children).filter(n=>n.matches('button.p199r6-thumb')):[];
    if(!layout||!visual||!side||!rail||!enlarge||!controls||thumbs.length!==3)return false;
    if(!document.getElementById(STY)){
      const style=document.createElement('style');style.id=STY;style.textContent=CSS;document.head.appendChild(style);
    }
    const firstImage=thumbs[0].querySelector('img');
    if(!firstImage)return false;
    const slot=document.createElement('div');slot.className='p199r10r5-slot';slot.hidden=true;
    const video=document.createElement('video');video.className='p199r10r5-player';
    video.controls=true;video.playsInline=true;video.preload='none';
    video.setAttribute('aria-label','Hitotsubu App Preview');
    video.poster=firstImage.currentSrc||firstImage.src;
    slot.appendChild(video);visual.insertAdjacentElement('afterend',slot);
    const tab=document.createElement('button');tab.type='button';tab.className='p199r6-thumb p199r10r5-thumb';
    tab.setAttribute('aria-label','App Preview video');tab.setAttribute('aria-pressed','false');
    const picture=firstImage.cloneNode(false);picture.removeAttribute('id');picture.alt='';picture.setAttribute('aria-hidden','true');
    const badge=document.createElement('span');badge.textContent='VIDEO';
    tab.append(picture,badge);rail.prepend(tab);rail.classList.add('p199r10r5-rail');
    let selected=false,saved=null;
    const number=side.querySelector('.p199r6-number');
    const heading=side.querySelector('.p199r6-title');
    const caption=side.querySelector('.p199r6-caption');
    const locale=()=>/^ja(?:-|$)/i.test(document.documentElement.lang||'ja');
    const collectionCount=stage.querySelector('.p199r6-mast > span:last-child');
    if(collectionCount)collectionCount.textContent=locale()?'03 枚の画像 · 01 本の動画':'03 screenshots · 01 video';
    function selectVideo(){
      if(selected)return;
      saved={n:number?.textContent,h:heading?.textContent,c:caption?.textContent,b:enlarge.textContent};
      selected=true;
      visual.style.display='none';slot.hidden=false;
      tab.dataset.selected='true';tab.setAttribute('aria-pressed','true');
      thumbs.forEach(t=>{t.dataset.tszPreviewPrevious=t.getAttribute('aria-current')||'';t.removeAttribute('aria-current');});
      if(number)number.textContent='APP PREVIEW / VIDEO';
      if(heading)heading.textContent=locale()?'ひと粒が、積み重なる。':'Watch the little moments grow.';
      if(caption)caption.textContent=locale()?'瓶から木箱、コンテナ、倉庫へ。記録が形になる様子を、動画で。':'See how tiny moments fill jars, crates, containers, and a warehouse.';
      enlarge.textContent=locale()?'動画を全画面で見る':'Full-screen video';
      video.src='./tsz-apple-preview.mp4';
      video.play().catch(()=>{});
    }
    function restore(){
      if(!selected)return;
      selected=false;video.pause();video.removeAttribute('src');video.load();
      slot.hidden=true;visual.style.removeProperty('display');
      tab.removeAttribute('data-selected');tab.setAttribute('aria-pressed','false');
      if(saved){if(number)number.textContent=saved.n;if(heading)heading.textContent=saved.h;if(caption)caption.textContent=saved.c;enlarge.textContent=saved.b;}
      thumbs.forEach(t=>{if(t.dataset.tszPreviewPrevious)t.setAttribute('aria-current',t.dataset.tszPreviewPrevious);else t.removeAttribute('aria-current');delete t.dataset.tszPreviewPrevious;});
    }
    tab.addEventListener('click',()=>{if(selected){video.paused?video.play().catch(()=>{}):video.pause();}else selectVideo();});
    rail.addEventListener('click',event=>{if(selected&&thumbs.some(t=>t.contains(event.target)))restore();},true);
    controls.addEventListener('click',()=>{if(selected)restore();},true);
    enlarge.addEventListener('click',event=>{if(!selected)return;event.preventDefault();event.stopImmediatePropagation();
      if(video.requestFullscreen)video.requestFullscreen().catch(()=>{});
      else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
    },true);
    video.addEventListener('error',()=>{if(!selected)return;restore();tab.disabled=true;tab.title=locale()?'動画を再生できません':'Video unavailable';});
    activeStage=stage;
    return true;
  }
  function boot(){mount();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  // Gallery stage can be rendered after DOM ready or recreated for a locale switch.
  let scheduled=false;
  const observer=new MutationObserver(()=>{
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;if(!activeStage?.isConnected)activeStage=null;mount();});
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
