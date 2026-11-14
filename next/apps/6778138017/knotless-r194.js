/* TSZ LP R194 P2 | Knotless approved P1 immersive hero, strictly scoped integration. */
(() => {
  'use strict';
  const APP='6778138017';
  const ROOT='tsz-knotless-r194';
  const MARK='TSZ_KNOTLESS_R194_P2';
  const messages = {
    en: {
      languageLabel:'LANGUAGE',storeLabel:'APP STORE',eyebrow:'A SMALL DIGITAL RITUAL',headline1:'Nothing to solve.',headline2:'Just something to touch.',
      lead:'Tap a glowing knot and watch the strands turn. No rules. No scores. No finish line. Just a small, beautiful pause.',
      cta:'Discover on the App Store',try:'Try the pattern',priceNote:'See the App Store for current pricing and availability.',
      tag1:'NO RULES',tag2:'NO SCORES',tag3:'NO ADS',live:'INTERACTIVE PREVIEW',tapToTurn:'TAP TO TURN',
      hint:'Choose any tile. Watch it turn.',hintAfter:'The strands shifted. Try another.',reset:'Start again',
      concept:'A tiny browser illustration of the app’s tap-to-turn idea.',feeling:'THE FEELING',statement:'You can leave a pattern unfinished.',
      statementBody:"Some moments don't need to become anything. Turn a strand. Follow the light. Stop whenever you like.",
      lastKicker:'A LITTLE SPACE, JUST FOR YOU',lastTitle:"Touch. Turn. Repeat. Or don't.",cta2:'Open Knotless on the App Store',ariaBoard:'Interactive knot board',ariaTile:'Turn knot tile'
    },
    ja: {
      languageLabel:'言語',storeLabel:'APP STORE',eyebrow:'ただ触れるだけの、小さな時間',headline1:'ほどかなくていい。',headline2:'ただ、触れればいい。',
      lead:'光る紐模様をタップすると、少しずつ向きが変わる。ルールも、スコアも、ゴールもない。ただ静かに触れるための時間。',
      cta:'App Storeで見る',try:'模様に触れてみる',priceNote:'最新の価格・提供状況はApp Storeでご確認ください。',
      tag1:'ルールなし',tag2:'スコアなし',tag3:'広告なし',live:'操作できるプレビュー',tapToTurn:'タップで回転',
      hint:'好きなタイルをタップしてください。',hintAfter:'紐模様が変わりました。もう一度。',reset:'最初から',
      concept:'タップで模様が回る体験を、ブラウザ上で簡略再現しています。',feeling:'このアプリの感覚',statement:'完成させなくてもいい模様。',
      statementBody:'何かを達成しなくてもいい時間があります。一本の紐を回して、光を眺めて。やめたいときに、やめればいい。',
      lastKicker:'あなたのための、ちいさな余白',lastTitle:'触って、回して、また触る。',cta2:'KnotlessをApp Storeで見る',ariaBoard:'操作できる紐模様',ariaTile:'紐模様のタイルを回転'
    },
    ar: {
      languageLabel:'اللغة',storeLabel:'متجر التطبيقات',eyebrow:'لحظة رقمية هادئة',headline1:'لا شيء عليك حلّه.',headline2:'فقط المس النمط.',
      lead:'المس عقدة مضيئة وشاهد الخيوط تدور. بلا قواعد، بلا نقاط، بلا خط نهاية. مجرد لحظة صغيرة من الهدوء.',
      cta:'اكتشفه على App Store',try:'جرّب النمط',priceNote:'تحقّق من السعر والتوفّر الحاليين في App Store.',
      tag1:'بلا قواعد',tag2:'بلا نقاط',tag3:'بلا إعلانات',live:'معاينة تفاعلية',tapToTurn:'المس للتدوير',
      hint:'اختر أي مربع وشاهد دورانه.',hintAfter:'تغيّر مسار الخيوط. جرّب مرة أخرى.',reset:'ابدأ من جديد',
      concept:'تجربة مبسّطة في المتصفح لفكرة تدوير العقد باللمس.',feeling:'الإحساس',statement:'ليس عليك إكمال كل نمط.',
      statementBody:'بعض اللحظات لا تحتاج إلى إنجاز. أدر خيطًا، واتبع الضوء، وتوقّف متى شئت.',
      lastKicker:'مساحة صغيرة لك وحدك',lastTitle:'المس. أدر. كرّر. أو لا تفعل.',cta2:'افتح Knotless في App Store',ariaBoard:'لوحة العقد التفاعلية',ariaTile:'تدوير مربع العقدة'
    }
  };
  const initial = [0,1,3,2,1,3,0,2,2,0,3,1,3,2,1,0];
  function init(){
    const bodyId=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
    if(bodyId!==APP || document.getElementById(ROOT))return;
    const anchor=document.querySelector('.p19-breadcrumb');
    if(!anchor?.parentNode)return;
    const root=document.createElement('section');
    root.id=ROOT;root.className='kl194';root.setAttribute('aria-labelledby','kl194-hero-title');
    root.innerHTML="<div class=\"kl194-topbar shell\"><div class=\"kl194-brand\"><span class=\"kl194-symbol\" aria-hidden=\"true\">✳</span><strong>Knotless</strong></div><span class=\"kl194-top-note\" data-i18n=\"live\">INTERACTIVE PREVIEW</span></div>\n<div class=\"ambient ambient-a\" aria-hidden=\"true\"></div><div class=\"ambient ambient-b\" aria-hidden=\"true\"></div>\n<section aria-labelledby=\"kl194-hero-title\" class=\"hero shell\">\n<div class=\"hero-copy\">\n<div class=\"eyebrow\"><span class=\"tiny-glow\"></span><span data-i18n=\"eyebrow\">A SMALL DIGITAL RITUAL</span><span class=\"eyebrow-line\"></span></div>\n<p class=\"product-name\">Knotless <span class=\"product-symbol\">✳</span></p>\n<h1 id=\"kl194-hero-title\"><span data-i18n=\"headline1\">Nothing to solve.</span><em data-i18n=\"headline2\">Just something to touch.</em></h1>\n<p class=\"lead\" data-i18n=\"lead\">Tap a glowing knot and watch the strands turn. No rules. No scores. No finish line. Just a small, beautiful pause.</p>\n<div class=\"hero-actions\">\n<a class=\"primary store-link\" href=\"https://apps.apple.com/us/app/id6778138017\" rel=\"noopener noreferrer\" target=\"_blank\"><span data-i18n=\"cta\">Discover on the App Store</span><span aria-hidden=\"true\" class=\"cta-icon\">↗</span></a>\n<a class=\"secondary\" href=\"#kl194-experience\"><span data-i18n=\"try\">Try the pattern</span><span aria-hidden=\"true\">↓</span></a>\n</div>\n<p class=\"price-note\" data-i18n=\"priceNote\">See the App Store for current pricing and availability.</p>\n<div aria-label=\"App characteristics\" class=\"quiet-marks\"><span data-i18n=\"tag1\">NO RULES</span><i></i><span data-i18n=\"tag2\">NO SCORES</span><i></i><span data-i18n=\"tag3\">NO ADS</span></div>\n</div>\n<div class=\"demo-side\" id=\"kl194-experience\">\n<div aria-hidden=\"true\" class=\"side-orbit orbit-one\"></div><div aria-hidden=\"true\" class=\"side-orbit orbit-two\"></div>\n<div class=\"demo-window\">\n<div class=\"demo-top\"><div class=\"demo-title\"><span class=\"demo-bullet\"></span><span>KNOTLESS <b>/</b> <span data-i18n=\"live\">INTERACTIVE PREVIEW</span></span></div><span class=\"demo-chip\" data-i18n=\"tapToTurn\">TAP TO TURN</span></div>\n<div class=\"panel-stage\">\n<div aria-hidden=\"true\" class=\"panel-halo\"></div>\n<div class=\"board-wrap\"><div aria-label=\"Interactive knot board\" class=\"knot-board\" id=\"kl194-knot-board\" role=\"group\"></div></div>\n<div aria-hidden=\"true\" class=\"board-corner top-left\"></div><div aria-hidden=\"true\" class=\"board-corner top-right\"></div><div aria-hidden=\"true\" class=\"board-corner bottom-left\"></div><div aria-hidden=\"true\" class=\"board-corner bottom-right\"></div>\n</div>\n<div class=\"demo-bottom\"><div class=\"demo-footline\"><span class=\"pulse-ring\"></span><span aria-live=\"polite\" data-i18n=\"hint\" id=\"kl194-live-status\">Choose any tile. Watch it turn.</span></div><button class=\"reset\" id=\"kl194-reset\" type=\"button\"><span aria-hidden=\"true\">↺</span><span data-i18n=\"reset\">Start again</span></button></div>\n</div>\n<div class=\"stage-caption\"><span class=\"stage-line\"></span><span data-i18n=\"concept\">A tiny browser illustration of the app’s tap-to-turn idea.</span></div>\n</div>\n</section>\n<section aria-labelledby=\"kl194-statement-title\" class=\"statement shell\">\n<div class=\"statement-top\"><span class=\"section-kicker\">01 / <span data-i18n=\"feeling\">THE FEELING</span></span><span aria-hidden=\"true\" class=\"section-rule\"></span><span class=\"section-kicker\">KNOTLESS · 2026</span></div>\n<div class=\"statement-content\"><div><h2 data-i18n=\"statement\" id=\"kl194-statement-title\">You can leave a pattern unfinished.</h2><p data-i18n=\"statementBody\">Some moments don't need to become anything. Turn a strand. Follow the light. Stop whenever you like.</p></div><div aria-hidden=\"true\" class=\"big-motif\"><svg fill=\"none\" viewbox=\"0 0 280 280\"><path d=\"M20 140C20 20 140 20 140 140S260 260 260 140S140 20 140 140S20 260 20 140\" stroke=\"url(#motifgrad)\" stroke-linecap=\"round\" stroke-width=\"15\"></path><path d=\"M20 140C20 20 140 20 140 140S260 260 260 140S140 20 140 140S20 260 20 140\" stroke=\"#e7f2ff\" stroke-opacity=\".8\" stroke-width=\"2.3\"></path><defs><lineargradient id=\"motifgrad\" x1=\"10\" x2=\"270\" y1=\"20\" y2=\"260\"><stop stop-color=\"#75dfeb\"></stop><stop offset=\".49\" stop-color=\"#ba8dfb\"></stop><stop offset=\"1\" stop-color=\"#ffb48b\"></stop></lineargradient></defs></svg></div></div>\n</section>\n<section class=\"last-cta shell\"><div><span class=\"section-kicker\" data-i18n=\"lastKicker\">A LITTLE SPACE, JUST FOR YOU</span><h2 data-i18n=\"lastTitle\">Touch. Turn. Repeat. Or don't.</h2></div><a class=\"last-link store-link\" href=\"https://apps.apple.com/us/app/id6778138017\" rel=\"noopener noreferrer\" target=\"_blank\"><span data-i18n=\"cta2\">Open Knotless on the App Store</span><span aria-hidden=\"true\">↗</span></a></section>";
    anchor.insertAdjacentElement('afterend',root);
    const $=sel=>root.querySelector(sel),$$=sel=>Array.from(root.querySelectorAll(sel));
    const board=$('#kl194-knot-board'),hint=$('#kl194-live-status');
    function findSelect(kind){const names=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
      for(const name of names){const el=document.querySelector(name);if(el?.tagName==='SELECT')return el;}return null;}
    function locale(){const val=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
      return val.startsWith('ja')?'ja':val.startsWith('ar')?'ar':'en';}
    function region(){const val=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(val)?val:'us';}
    function message(key){return messages[locale()][key];}
    const tileSVG=`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><linearGradient id="kl194-knotgrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#71e2e3"/><stop offset=".5" stop-color="#b3a9ff"/><stop offset="1" stop-color="#f8aa9b"/></linearGradient></defs><g class="glow"><path d="M0 50A50 50 0 0 0 50 0"/><path d="M50 100A50 50 0 0 0 100 50"/></g><g class="strand-a"><path d="M0 50A50 50 0 0 0 50 0"/><path d="M50 100A50 50 0 0 0 100 50"/></g><g class="strand-b"><path d="M0 50A50 50 0 0 0 50 0"/><path d="M50 100A50 50 0 0 0 100 50"/></g></svg>`;
    const tiles=[];let taps=0;
    initial.forEach((turn,index)=>{
      const button=document.createElement('button');button.type='button';button.className='knot-tile';button.dataset.index=String(index);button.dataset.turn=String(turn);
      button.style.setProperty('--angle',`${turn*90}deg`);button.style.setProperty('--hue',`${((index*23)%84)-36}deg`);
      button.innerHTML=tileSVG.replace(/kl194-knotgrad/g,`kl194-knotgrad-${index}`);
      button.addEventListener('click',()=>rotate(button));board.appendChild(button);tiles.push(button);
    });
    function updateAria(){board.setAttribute('aria-label',message('ariaBoard'));tiles.forEach((b,i)=>b.setAttribute('aria-label',`${message('ariaTile')} ${i+1}`));}
    function rotate(b){const n=Number(b.dataset.turn)+1;b.dataset.turn=String(n);b.style.setProperty('--angle',`${n*90}deg`);b.style.setProperty('--hue',`${((Number(b.dataset.index)*23+n*19)%120)-40}deg`);taps++;hint.textContent=message('hintAfter');}
    function reset(){taps=0;tiles.forEach((b,i)=>{b.dataset.turn=String(initial[i]);b.style.setProperty('--angle',`${initial[i]*90}deg`);b.style.setProperty('--hue',`${((i*23)%84)-36}deg`);});hint.textContent=message('hint');}
    function render(){const lang=locale();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      $$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(typeof messages[lang][k]==='string')el.textContent=messages[lang][k];});
      hint.textContent=message(taps?'hintAfter':'hint');updateAria();
      $$('a.store-link').forEach(a=>a.href=`https://apps.apple.com/${region()}/app/id${APP}`);
    }
    $('#kl194-reset').addEventListener('click',reset);
    document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))render();},true);
    window.addEventListener('popstate',render);
    // app-story may populate the preexisting selectors after this defer script begins.
    const sel=findSelect('language');if(sel){const obs=new MutationObserver(render);obs.observe(sel,{attributes:true,childList:true,subtree:true});}
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
