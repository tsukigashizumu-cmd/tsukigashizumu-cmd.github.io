/* TSZ LP R169 / Knotless / original website-only interactive illustration.
   No app source, screenshots, tracking, storage, network requests, or dependencies. */
(()=>{
  'use strict';
  const APP='6778138017', ID='tsz-knotless-r169';
  if(document.body?.dataset.p199Id!==APP || document.getElementById(ID))return;
  const words={
    en:{overline:'A LITTLE MOMENT OF MOVEMENT',title:'Nothing to solve. Just something to touch.',sub:'Tap. Turn. Watch it change.',store:'View on the App Store',none:'No rules. No scores. No ads.',a:'A tactile visual toy',ad:'A simple, wordless experience of light and form.',b:'It moves and shifts',bd:'Tap a tile to change the direction and color of its strands.',c:'A moment to unwind',cd:'No pressure, no goal. Just enjoy the pattern.',touch:'Tap a glowing tile',reset:'Reset the pattern',tiles:'Interactive illustration of nine glowing knot tiles',tile:'Glowing tile',note:'An original interactive illustration for this website, not a capture or exact simulation of the app. Nothing you tap is stored or sent.',ready:'Tap any tile to change its glow.',changed:'The pattern changed.',restored:'The first pattern is back.',explore:'See the experience'},
    ja:{overline:'指先から始まる、小さな時間',title:'解く必要はない。ただ、触れたくなる。',sub:'触れる。回る。光が変わる。',store:'App Storeで見る',none:'ルールなし。スコアなし。広告なし。',a:'指先で楽しむ光の模様',ad:'言葉のいらない、シンプルな光と形の体験。',b:'触れるたびに変わる',bd:'タイルをタップすると、紐の向きと色が変わります。',c:'何もしなくていい時間',cd:'競争も目標もなく、ただ模様を楽しむ。',touch:'光るタイルをタップ',reset:'最初の模様に戻す',tiles:'光る紐模様のタイル9個の体験イラスト',tile:'光るタイル',note:'このLP独自の体験イラストです。実際のアプリ画面や動作を正確に再現したものではありません。タップ情報の保存・送信は行いません。',ready:'好きなタイルをタップしてください。',changed:'模様が変わりました。',restored:'最初の模様に戻しました。',explore:'体験を見る'},
    ar:{overline:'لحظة صغيرة من الضوء والحركة',title:'لا شيء لتحلّه. فقط شيء تلمسه.',sub:'المس. أدر. راقب التغيّر.',store:'عرضه على App Store',none:'بلا قواعد. بلا نقاط. بلا إعلانات.',a:'تجربة بصرية باللمس',ad:'لحظة بسيطة من الضوء والأشكال، بلا كلمات.',b:'يتحوّل مع كل لمسة',bd:'المس مربعًا لتغيير اتجاه الخيط ولونه.',c:'لحظة للاسترخاء',cd:'بلا ضغط ولا أهداف، فقط استمتع بالشكل.',touch:'المس مربعًا مضيئًا',reset:'إعادة الشكل الأول',tiles:'رسم تفاعلي لتسعة مربعات بخيوط مضيئة',tile:'مربع مضيء',note:'هذا رسم تفاعلي أصلي لهذه الصفحة، وليس صورة من التطبيق أو محاكاة دقيقة له. لا نخزّن أو نرسل أي تفاعل.',ready:'المس أي مربع مضيء.',changed:'تغيّر الشكل.',restored:'عاد الشكل الأول.',explore:'اكتشف التجربة'}
  };
  const initial=[0,1,3,1,2,0,2,3,1], angles=initial.slice(), turns=Array(9).fill(0), palette=[185,270,18,312,32,190,14,190,25];
  const section=document.createElement('section');section.id=ID;section.className='kn169';section.setAttribute('aria-labelledby','kn169-title');
  section.innerHTML=`
  <div class="kn169-top"><span class="kn169-brand">Knotless<span aria-hidden="true">.</span></span><span class="kn169-topline" data-kn169="overline"></span><a href="#kn169-experience" data-kn169="explore"></a></div>
  <div class="kn169-hero">
    <div class="kn169-copy"><div class="kn169-kicker">KNOTLESS / TOUCH TO TURN</div><h2 id="kn169-title" data-kn169="title"></h2><p class="kn169-sub" data-kn169="sub"></p><a class="kn169-store" href="https://apps.apple.com/us/app/id6778138017" target="_blank" rel="noopener noreferrer"><span aria-hidden="true" class="kn169-app-icon">✦</span><span data-kn169="store"></span><span aria-hidden="true">↗</span></a></div>
    <div class="kn169-interactive" id="kn169-experience"><div class="kn169-board" id="kn169-board" role="group" dir="ltr"></div><div class="kn169-actions"><span data-kn169="touch"></span><button type="button" class="kn169-reset" id="kn169-reset" data-kn169="reset"></button></div><p class="kn169-live" role="status" aria-live="polite" id="kn169-live"></p></div>
  </div>
  <div class="kn169-divider"><span data-kn169="none"></span></div>
  <div class="kn169-features" id="kn169-highlights"><article><span class="kn169-mini kn169-a" aria-hidden="true"></span><div><h3 data-kn169="a"></h3><p data-kn169="ad"></p></div></article><article><span class="kn169-mini kn169-b" aria-hidden="true"></span><div><h3 data-kn169="b"></h3><p data-kn169="bd"></p></div></article><article><span class="kn169-mini kn169-c" aria-hidden="true"></span><div><h3 data-kn169="c"></h3><p data-kn169="cd"></p></div></article></div>
  <p class="kn169-note" data-kn169="note"></p>`;
  const board=section.querySelector('#kn169-board');const nodes=[];
  function tileSVG(i){
    const id='kn169-grad-'+i;
    return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7ffff"/><stop offset=".5" stop-color="#86e6f6"/><stop offset="1" stop-color="#ffc2b1"/></linearGradient></defs><g class="kn169-rotor"><path class="kn169-glow" d="M -20 53 C 15 53, 21 -15, 52 -15 S 83 53, 120 53 M -20 120 C 33 115, 38 42, 92 42 S 134 120, 140 120"/><path class="kn169-light" stroke="url(#${id})" d="M -20 53 C 15 53, 21 -15, 52 -15 S 83 53, 120 53 M -20 120 C 33 115, 38 42, 92 42 S 134 120, 140 120"/><path class="kn169-core" d="M -20 53 C 15 53, 21 -15, 52 -15 S 83 53, 120 53 M -20 120 C 33 115, 38 42, 92 42 S 134 120, 140 120"/></g></svg>`;
  }
  for(let i=0;i<9;i++){
    const b=document.createElement('button');b.type='button';b.className='kn169-tile';b.dataset.index=String(i);b.innerHTML=tileSVG(i);board.appendChild(b);nodes.push(b);
    b.addEventListener('click',()=>{turns[i]++;angles[i]=(initial[i]+turns[i])%4;paint(i);section.querySelector('#kn169-live').textContent=words[language()].changed;});
  }
  function language(){const selector=document.getElementById('p199-language');const raw=(selector?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';}
  function storeHref(){const raw=(document.getElementById('p199-country')?.value||'us').toLowerCase();const region=/^[a-z]{2}$/.test(raw)?raw:'us';return `https://apps.apple.com/${region}/app/id${APP}`;}
  function paint(i){const b=nodes[i];b.style.setProperty('--kn169-turn',angles[i]*90+'deg');b.style.setProperty('--kn169-hue',((palette[i]+turns[i]*37)%360)+'deg');b.setAttribute('aria-label',`${words[language()].tile} ${i+1}, ${angles[i]*90}°`);b.dataset.turn=String(turns[i]);}
  function translate(){const code=language(),w=words[code];section.lang=code;section.dir=code==='ar'?'rtl':'ltr';section.querySelectorAll('[data-kn169]').forEach(n=>n.textContent=w[n.dataset.kn169]||'');board.setAttribute('aria-label',w.tiles);nodes.forEach((_,i)=>paint(i));section.querySelector('#kn169-live').textContent=w.ready;section.querySelector('.kn169-store').href=storeHref();}
  section.querySelector('#kn169-reset').addEventListener('click',()=>{for(let i=0;i<9;i++){turns[i]=0;angles[i]=initial[i];paint(i)}section.querySelector('#kn169-live').textContent=words[language()].restored;});
  const anchor=document.querySelector('.p19-breadcrumb');if(anchor){anchor.insertAdjacentElement('afterend',section);}else{const main=document.querySelector('#p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(section,main);}
  if(!section.isConnected)return;
  document.body.classList.add('kn169-ready');
  translate();
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',()=>{section.querySelector('.kn169-store').href=storeHref()});
  new MutationObserver(ch=>{if(ch.some(v=>v.attributeName==='lang'))translate()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
