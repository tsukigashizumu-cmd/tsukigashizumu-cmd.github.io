/* TSZ LP R94 | Knotless interactive illustration. No storage, score, ads, remote calls or real app assets. */
(()=>{
 'use strict';
 const ID='tsz-knotless-r94';
 const WORDS={
  ja:{kicker:'KNOTLESS · TOUCH TO TURN',title:'ただ、回す。',intro:'考えることも、勝つこともありません。光る紐模様に触れると、向きが変わる。もう一度触れると、色が少し変わる。',hint:'好きなタイルをタップしてください。',reset:'最初の模様に戻す',board:'光る紐模様のタイル',tile:'タイル',orientation:'向き',stage:'目的も、得点も、終わりもありません。',note:'これはLP専用に描いた体験サンプルです。実際のアプリ画面ではありません。保存・送信・外部通信は行いません。'},
  en:{kicker:'KNOTLESS · TOUCH TO TURN',title:'Just turn.',intro:'Nothing to solve. Nothing to win. Touch a glowing strand to turn it. Touch it again and its color quietly changes.',hint:'Tap any tile to turn the strands.',reset:'Restore the first pattern',board:'Glowing strand tile pattern',tile:'Tile',orientation:'orientation',stage:'No goals. No scores. No finish line.',note:'This is an illustrated LP-only demo, not the actual app screen. Nothing is saved or sent; no external requests.'},
  ar:{kicker:'KNOTLESS · المس للتدوير',title:'فقط أدرها.',intro:'لا ألغاز ولا فوز. المس خيطًا مضيئًا ليتغيّر اتجاهه. المس مرة أخرى وسيتغيّر لونه بهدوء.',hint:'المس أي مربّع لتدوير الخيوط.',reset:'استعادة النمط الأول',board:'نمط من المربعات ذات الخيوط المضيئة',tile:'مربّع',orientation:'الاتجاه',stage:'لا أهداف. لا نقاط. لا خط نهاية.',note:'هذه تجربة توضيحية خاصة بصفحة التعريف، وليست شاشة التطبيق الفعلية. لا حفظ ولا إرسال ولا اتصالات خارجية.'}
 };
 const starting=[0,1,0,3,2,0,1,2,1,3,2,0,3,2,3,1];
 const locale=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en'};
 const escapeHTML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function mount(){
  if(document.getElementById(ID))return;
  const host=document.querySelector('main')||document.body;if(!host)return;
  const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Knotless interactive demo');
  root.innerHTML=`<div class="kn94-grid"><div class="kn94-copy"><p class="kn94-kicker" data-kn94="kicker"></p><h2 data-kn94="title"></h2><p class="kn94-intro" data-kn94="intro"></p><p class="kn94-caption"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 16a6 6 0 0 1 12 0M9 7a6 6 0 0 1 11 3M12 17l4-4m-4 4 4 1"/></svg><span data-kn94="hint"></span></p><button type="button" class="kn94-reset" id="kn94-reset"><span aria-hidden="true">↺</span><span data-kn94="reset"></span></button><p class="kn94-note" data-kn94="note"></p></div><div class="kn94-stage"><div class="kn94-frame"><div class="kn94-board" id="kn94-board" role="group"></div></div><p class="kn94-stage-note" data-kn94="stage"></p></div></div>`;
  host.append(root);
  const board=root.querySelector('#kn94-board');
  // Each tile has two quarter-circle strands, turning in 90-degree increments.
  // An SVG symbol would require shared ID references, so the gradient is scoped to the section.
  const tileSVG=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="kn94-rotate"><path class="kn94-glow" d="M50 0 A50 50 0 0 1 100 50 M0 50 A50 50 0 0 1 50 100"/><path class="kn94-strand" d="M50 0 A50 50 0 0 1 100 50 M0 50 A50 50 0 0 1 50 100"/><path class="kn94-spark" d="M50 0 A50 50 0 0 1 100 50 M0 50 A50 50 0 0 1 50 100"/></g></svg>`;
  const svgNS='http://www.w3.org/2000/svg';
  const defSvg=document.createElementNS(svgNS,'svg');defSvg.setAttribute('width','0');defSvg.setAttribute('height','0');defSvg.setAttribute('aria-hidden','true');defSvg.style.position='absolute';
  const defs=document.createElementNS(svgNS,'defs');const grad=document.createElementNS(svgNS,'linearGradient');grad.id='kn94-strand-r94';grad.setAttribute('x1','0%');grad.setAttribute('y1','15%');grad.setAttribute('x2','100%');grad.setAttribute('y2','90%');
  [['0%','#dffeff'],['50%','#74dfff'],['100%','#a084f4']].forEach(([offset,color])=>{const stop=document.createElementNS(svgNS,'stop');stop.setAttribute('offset',offset);stop.setAttribute('stop-color',color);grad.append(stop)});
  defs.append(grad);defSvg.append(defs);root.append(defSvg);
  let turns=starting.map(()=>0);
  const tiles=starting.map((n,i)=>{const b=document.createElement('button');b.type='button';b.className='kn94-tile';b.innerHTML=tileSVG;b.dataset.tile=String(i);b.addEventListener('click',()=>{turns[i]++;paint(i)});board.append(b);return b});
  const word=()=>WORDS[locale()];
  function paint(i){const b=tiles[i];const q=(starting[i]+turns[i])%4;b.style.setProperty('--kn94-rotate',(90*q)+'deg');b.style.setProperty('--kn94-hue',((i*14+turns[i]*32)%155)+'deg');const w=word();b.setAttribute('aria-label',`${w.tile} ${i+1}, ${w.orientation}: ${q*90}°`);b.title=`${w.tile} ${i+1}`;}
  function translate(){const lang=locale(),w=word();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';root.querySelectorAll('[data-kn94]').forEach(e=>{e.textContent=w[e.dataset.kn94]||''});board.setAttribute('aria-label',w.board);root.setAttribute('aria-label',w.board);tiles.forEach((_,i)=>paint(i));}
  root.querySelector('#kn94-reset').addEventListener('click',()=>{turns=starting.map(()=>0);tiles.forEach((_,i)=>paint(i))});
  new MutationObserver(changes=>{if(changes.some(x=>x.attributeName==='lang'))translate()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  translate();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
