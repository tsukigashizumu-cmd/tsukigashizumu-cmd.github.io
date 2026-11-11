/* TSZ LP R140 Knotless: lightweight website-only knot-tile illustration, no storage or network. */
(()=>{
'use strict';
const ID='tsz-knotless-r140';
if(document.getElementById(ID))return;
const params=new URLSearchParams(location.search);
const requested=(params.get('lang')||document.documentElement.lang||navigator.language||'en').toLowerCase();
const lang=requested.startsWith('ar')?'ar':requested.startsWith('ja')?'ja':'en';
const dict={
 ja:{eyebrow:'KNOTLESS · タッチ体験',title:'ほどこうとしなくていい。',intro:'光る紐模様に触れると、タイルが回って線のつながり方が少し変わります。ただ眺めて、また触れるだけ。',touch:'好きなタイルをタップ',prompt:'決まりも、スコアも、ゴールもない。',reset:'最初の模様に戻す',ready:'好きなタイルに触れてみてください。',changed:'模様が少し変わりました。',resetMsg:'最初の模様に戻しました。',sample:'LP専用サンプル',tile:'紐模様のタイル',note:'これはLP上だけの説明用図形です。実際のアプリ画面や回転・色変化のアルゴリズムを再現したものではありません。タップの記録は保存・送信されません。'},
 en:{eyebrow:'KNOTLESS · TOUCH DEMO',title:'Nothing needs untangling.',intro:'Touch a glowing knot tile. It turns, and the strands meet in a slightly different way. Look, touch, repeat.',touch:'Tap any tile',prompt:'No rules. No score. No goal.',reset:'Return to the first pattern',ready:'Touch any glowing tile.',changed:'The pattern shifted a little.',resetMsg:'The first pattern is back.',sample:'Website-only example',tile:'Knot tile',note:'Illustrative shapes on this landing page only. They do not reproduce the native app screen, turning motion or color algorithm. No taps are saved or transmitted.'},
 ar:{eyebrow:'KNOTLESS · تجربة اللمس',title:'لا شيء يحتاج إلى فكّ.',intro:'المس بلاطة من الخيوط المضيئة لتدور ويتغيّر اتصال الخطوط قليلًا. انظر، المس، وكرّر.',touch:'المس أي بلاطة',prompt:'بلا قواعد. بلا نقاط. بلا هدف.',reset:'العودة إلى الشكل الأول',ready:'المس أي بلاطة مضيئة.',changed:'تغيّر الشكل قليلًا.',resetMsg:'عاد الشكل الأول.',sample:'مثال على صفحة الويب',tile:'بلاطة الخيوط',note:'هذه أشكال توضيحية داخل صفحة الويب فقط، وليست محاكاة لشاشة التطبيق أو طريقة الدوران وتغيير الألوان فيه. لا يتم حفظ اللمسات أو إرسالها.'}
};
const w=dict[lang];
const section=document.createElement('section');
section.id=ID;section.className='kn140-section';section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
section.setAttribute('aria-labelledby','kn140-title');
section.innerHTML=`<div class="kn140-head"><div><p class="kn140-eyebrow">${w.eyebrow}</p><h2 id="kn140-title">${w.title}</h2><p class="kn140-intro">${w.intro}</p></div><span class="kn140-sample">${w.sample}</span></div>
<div class="kn140-stage"><div class="kn140-board-wrap"><div class="kn140-board" id="kn140-board" role="group" aria-label="${w.touch}" dir="ltr"></div></div><div class="kn140-aside"><p class="kn140-guide">${w.touch}</p><p class="kn140-prompt">${w.prompt}</p><div class="kn140-line" aria-hidden="true"></div><button type="button" id="kn140-reset">${w.reset}</button><p id="kn140-status" class="kn140-status" role="status" aria-live="polite">${w.ready}</p></div></div>
<p class="kn140-note">${w.note}</p>`;
const board=section.querySelector('#kn140-board');
const palette=['#92dfdd','#d9adff','#ffd3aa','#b6e6c1'];
const initials=[0,1,0,1,1,1,0,0,0,1,1,0,1,0,1,0];
const tiles=[];
function paint(tile){
 tile.button.style.setProperty('--kn140-angle',tile.turn*90+'deg');
 tile.button.style.setProperty('--kn140-hue',palette[tile.hue]);
 tile.button.dataset.angle=String(tile.turn*90);
 tile.button.dataset.hue=String(tile.hue);
}
for(let i=0;i<16;i++){
 const button=document.createElement('button');
 button.type='button';button.className='kn140-tile';
 button.setAttribute('aria-label',`${w.tile} ${i+1}`);
 button.innerHTML='<svg aria-hidden="true" viewBox="0 0 100 100" focusable="false"><path d="M 0 50 A 50 50 0 0 0 50 0"/><path d="M 50 100 A 50 50 0 0 0 100 50"/></svg>';
 const tile={button,turn:initials[i],hue:i%4};
 button.addEventListener('click',()=>{
  tile.turn=(tile.turn+1)%4;
  tile.hue=(tile.hue+1)%palette.length;
  paint(tile);
  section.querySelector('#kn140-status').textContent=w.changed;
 });
 paint(tile);tiles.push(tile);board.appendChild(button);
}
section.querySelector('#kn140-reset').addEventListener('click',()=>{
 tiles.forEach((tile,i)=>{tile.turn=initials[i];tile.hue=i%4;paint(tile)});
 section.querySelector('#kn140-status').textContent=w.resetMsg;
});
const mount=document.querySelector('#p199-content .p199-body')||document.querySelector('main')||document.body;
mount.appendChild(section);
})();
