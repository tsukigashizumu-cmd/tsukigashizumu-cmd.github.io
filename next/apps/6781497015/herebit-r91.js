/* TSZ LP R91 | Herebit click-to-point illustration. No image processing, network or storage. */
(()=>{
  'use strict';
  const ID='tsz-herebit-r91';
  const WORDS={
    en:{tag:'HEREBIT · INTERACTIVE EXAMPLE',heading:'Point once. Say what should change.',sub:'Tap the mock screen to mark a specific spot. Choose a short instruction to see how a visual pointer reduces long location descriptions.',brand:'Sample layout',board:'Tap this example layout to place a marker',boardHint:'This is a made-up layout, not an image from the app.',target:'Or select a place',header:'Heading',button:'Button',gap:'Empty space',what:'What should change?',fix:'Fix here',remove:'Remove this',space:'Widen this space',preview:'Example instruction to AI',selected:'Selected point',reset:'Reset example',foot:'Illustration only; not the real Herebit interface and no image is created, edited or shared. The actual Herebit app lets you select an image, tap a position and share the marked image. This demonstration does not upload, save, or send anything.',where:'Location'},
    ja:{tag:'Herebit · 操作サンプル',heading:'言葉で迷うより、場所を指す。',sub:'見本画面をタップして修正箇所を指定してください。短い指示と場所がどう組み合わさるかを体験できます。',brand:'架空の画面',board:'見本画面をタップして印を付ける',boardHint:'これは説明用に作成した架空の画面で、実アプリ画面ではありません。',target:'場所を選択',header:'見出し',button:'ボタン',gap:'余白',what:'何をしてほしい？',fix:'ここを直して',remove:'ここを消して',space:'この余白を広げて',preview:'AIへの指示の例',selected:'指した位置',reset:'デモを初期化',foot:'説明用デモであり実際のHerebitの画面ではありません。画像の生成・編集・共有も行いません。実アプリでは画像を選び、位置をタップして印付き画像を共有できます。このページからデータを送信・保存することはありません。',where:'位置'},
    ar:{tag:'Herebit · مثال تفاعلي',heading:'أشِر إلى الموضع بدلاً من وصفه طويلاً.',sub:'اضغط على التصميم التجريبي لتحديد الموضع، ثم اختر تعليمات قصيرة لترى كيف تساعد الإشارة الواضحة.',brand:'واجهة افتراضية',board:'اضغط على التصميم لتحديد نقطة',boardHint:'هذا تصميم توضيحي وليس صورة من التطبيق.',target:'أو اختر موضعاً',header:'العنوان',button:'الزر',gap:'المسافة الفارغة',what:'ماذا تريد تغييره؟',fix:'أصلح هذا',remove:'احذف هذا',space:'وسّع هذه المسافة',preview:'مثال على تعليمات للذكاء الاصطناعي',selected:'النقطة المحددة',reset:'إعادة ضبط المثال',foot:'هذا مثال توضيحي وليس واجهة Herebit الحقيقية. لا ينشئ صوراً ولا يعدّلها أو يشاركها. يتيح التطبيق الحقيقي اختيار صورة والإشارة إلى موضع ثم مشاركة الصورة المعلمة. لا يرسل هذا المثال البيانات ولا يحفظها.',where:'الموضع'}
  };
  const lang=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const clamp=(n)=>Math.min(100,Math.max(0,Math.round(n)));
  function init(){
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;
    if(!host)return;
    const root=document.createElement('section');root.id=ID;
    root.innerHTML=`<div class="hb91-shell"><header><span class="hb91-kicker" data-i="tag"></span><h2 data-i="heading"></h2><p class="hb91-sub" data-i="sub"></p></header><div class="hb91-grid"><div class="hb91-board-shell"><div class="hb91-board" id="hb91-board" role="button" tabindex="0"><div class="hb91-mock-top"><span class="hb91-dots">● ● ●</span><b data-i="brand"></b></div><div class="hb91-mock-content"><div class="hb91-mock-heading"></div><div class="hb91-mock-line"></div><div class="hb91-mock-line short"></div><div class="hb91-mock-card"><div class="hb91-mock-square"></div><div class="hb91-mock-copy"><div class="hb91-mock-line"></div><div class="hb91-mock-line short"></div></div></div><div class="hb91-mock-button">✓</div></div><span class="hb91-marker" id="hb91-marker" aria-hidden="true">1</span></div><p class="hb91-board-caption" data-i="boardHint"></p></div><div class="hb91-control"><div class="hb91-group"><strong data-i="target"></strong><div class="hb91-options" id="hb91-targets"><button type="button" data-target="header" data-i="header"></button><button type="button" data-target="button" data-i="button"></button><button type="button" data-target="gap" data-i="gap"></button></div></div><div class="hb91-group"><strong data-i="what"></strong><div class="hb91-options" id="hb91-actions"><button type="button" data-action="fix" data-i="fix"></button><button type="button" data-action="remove" data-i="remove"></button><button type="button" data-action="space" data-i="space"></button></div></div><div class="hb91-outcome" role="status" aria-live="polite"><small data-i="preview"></small><b id="hb91-sentence"></b><span class="hb91-coordinate" id="hb91-coordinate"></span></div><button type="button" class="hb91-reset" id="hb91-reset" data-i="reset"></button></div></div><p class="hb91-note" data-i="foot"></p></div>`;
    host.appendChild(root);
    const $=id=>root.querySelector('#hb91-'+id);
    const preset={header:[48,24],button:[70,81],gap:[43,61]};
    let x=48,y=24,action='fix',target='header';
    function render(){
      const l=lang(),t=WORDS[l];root.dir=l==='ar'?'rtl':'ltr';root.lang=l;
      root.querySelectorAll('[data-i]').forEach(e=>{const text=t[e.dataset.i];if(typeof text==='string')e.textContent=text;});
      $('board').setAttribute('aria-label',t.board);
      $('marker').style.left=x+'%';$('marker').style.top=y+'%';
      $('sentence').textContent=t[action]+' — '+(target?t[target]:t.selected)+'.';
      $('coordinate').textContent=`${t.where}: ${x}% × ${y}%`;
      root.querySelectorAll('[data-target]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.target===target)));
      root.querySelectorAll('[data-action]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.action===action)));
    }
    $('board').addEventListener('click',e=>{const r=$('board').getBoundingClientRect();if(!r.width||!r.height)return;x=clamp((e.clientX-r.left)/r.width*100);y=clamp((e.clientY-r.top)/r.height*100);target=null;render();});
    $('board').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();x=50;y=50;target=null;render();}});
    root.querySelectorAll('[data-target]').forEach(b=>b.addEventListener('click',()=>{target=b.dataset.target;[x,y]=preset[target];render();}));
    root.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{action=b.dataset.action;render();}));
    $('reset').addEventListener('click',()=>{x=48;y=24;target='header';action='fix';render();});
    new MutationObserver(m=>{if(m.some(r=>r.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
