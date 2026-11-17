/* R304 Knotless LP-only tactile toy: no scores, persistence, analytics, or network. */
(() => {
  'use strict';
  const APP='6778138017';
  if (document.body.dataset.p199Id!==APP && document.body.dataset.p19AppId!==APP && document.body.dataset.kn304Preview!==APP) return;
  if (document.getElementById('tsz-knotless-r304')) return;
  const languages={
    en:{kicker:'KNOTLESS · AN INTERACTIVE MOMENT',title:'No score. No finish line. Just touch.',body:'A glowing strand turns when you tap. Tap again, and the colors wander. You do not need to solve anything.',shuffle:'Change the pattern',quiet:'Reduce motion',resume:'Restore motion',note:'Tap any tile. Nothing to win, nothing to lose.',fine:'A short LP-only simulation. This is not the actual app.',store:'Explore Knotless in the App Store',tile:'Rotate glowing knot tile'},
    ja:{kicker:'KNOTLESS · 触れるだけの時間',title:'点数も、ゴールも、いらない。',body:'光る紐模様を一つタップすると、向きが変わる。もう一度触ると色が移ろう。何かを完成させなくていい。',shuffle:'模様を変える',quiet:'動きを抑える',resume:'動きを戻す',note:'好きなタイルに触れてください。勝ち負けはありません。',fine:'LP専用の簡易体験です。アプリ本体の画面ではありません。',store:'App StoreでKnotlessを見る',tile:'光る紐模様を回す'},
    ar:{kicker:'KNOTLESS · لحظة تفاعل هادئة',title:'لا نقاط. لا خط نهاية. فقط المس.',body:'المس خيطًا مضيئًا ليدور. المس مرة أخرى لتتغير الألوان بهدوء. لا تحتاج إلى حل أي شيء.',shuffle:'غيّر النمط',quiet:'تقليل الحركة',resume:'إعادة الحركة',note:'المس أي بلاطة. لا فوز ولا خسارة.',fine:'تجربة توضيحية داخل الصفحة فقط، وليست التطبيق الفعلي.',store:'شاهد Knotless على App Store',tile:'تدوير بلاطة الخيوط المضيئة'}
  };
  const host=document.createElement('section');host.id='tsz-knotless-r304';host.setAttribute('aria-label','Knotless interactive preview');
  host.innerHTML=`<div class="kn304-shell"><div class="kn304-gridline" aria-hidden="true"></div><div class="kn304-top"><div class="kn304-copy"><p class="kn304-kicker" data-kn304-text="kicker"></p><h2 data-kn304-text="title"></h2><p class="kn304-sub" data-kn304-text="body"></p><div class="kn304-actions"><button type="button" id="kn304-shuffle" data-kn304-text="shuffle"></button><button type="button" id="kn304-quiet" data-kn304-text="quiet" aria-pressed="false"></button></div></div><div class="kn304-board-wrap"><div id="kn304-board" class="kn304-board" role="group" aria-label="Touch tiles"></div><p class="kn304-board-note" data-kn304-text="note"></p></div></div><div class="kn304-bottom"><p class="kn304-disclaimer" data-kn304-text="fine"></p><a class="kn304-store" href="https://apps.apple.com/us/app/id${APP}" target="_blank" rel="noopener noreferrer" data-kn304-text="store"></a></div></div>`;
  const anchor=document.querySelector('.p19-hero') || document.getElementById('kn304-preview-anchor');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',host);
  else (document.getElementById('p199-content')||document.querySelector('main')||document.body).appendChild(host);
  const board=host.querySelector('#kn304-board');
  const tiles=[];
  let quiet=false;
  for(let i=0;i<16;i++){
    const b=document.createElement('button');b.type='button';b.className='kn304-tile';b.dataset.kn304Index=String(i);
    const knot=document.createElement('span');knot.className='kn304-knot';knot.setAttribute('aria-hidden','true');
    b.appendChild(knot);board.appendChild(b);tiles.push(b);
    b.dataset.kn304Turn='0';b.style.setProperty('--kn304-hue',String(164+(i*17)%65));
    b.addEventListener('click',()=>{
      const turn=(Number(b.dataset.kn304Turn)+1)%8;b.dataset.kn304Turn=String(turn);
      knot.style.setProperty('--kn304-turn',String(turn*45)+'deg');
      b.style.setProperty('--kn304-hue',String(157+((turn*29+i*17)%85)));
    });
  }
  function currentLanguage(){
    const select=document.getElementById('p199-language');
    const v=select && select.value ? String(select.value).toLowerCase() : '';
    if(v.startsWith('ja')||v.includes('japanese'))return 'ja';
    if(v.startsWith('ar')||v.includes('arabic'))return 'ar';
    const d=(document.documentElement.lang||'').toLowerCase();
    return d.startsWith('ja')?'ja':d.startsWith('ar')?'ar':'en';
  }
  function render(){
    const lang=currentLanguage(),t=languages[lang];host.dataset.kn304Lang=lang;
    const country=(document.getElementById('p199-country')?.value||'us').toLowerCase();
    host.querySelector('.kn304-store').href='https://apps.apple.com/'+(country.startsWith('jp')||country==='japan'?'jp':'us')+'/app/id'+APP;
    host.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    host.querySelectorAll('[data-kn304-text]').forEach(n=>{const k=n.dataset.kn304Text;n.textContent=k==='quiet'&&quiet?t.resume:t[k];});
    tiles.forEach((b,i)=>b.setAttribute('aria-label',`${t.tile} ${i+1}`));
  }
  host.querySelector('#kn304-shuffle').addEventListener('click',()=>{
    tiles.forEach((b,i)=>{
      const t=(Number(b.dataset.kn304Turn)+i%3+1)%8;
      b.dataset.kn304Turn=String(t);
      b.querySelector('.kn304-knot').style.setProperty('--kn304-turn',String(t*45)+'deg');
      b.style.setProperty('--kn304-hue',String(157+((t*29+i*17)%85)));
    });
  });
  host.querySelector('#kn304-quiet').addEventListener('click',e=>{
    quiet=!quiet;host.dataset.kn304Calm=String(quiet);e.currentTarget.setAttribute('aria-pressed',String(quiet));render();
  });
  document.getElementById('p199-language')?.addEventListener('change',render);
  document.getElementById('p199-country')?.addEventListener('change',render);
  document.addEventListener('change',e=>{if(e.target && e.target.id==='p199-language')render();});
  // The main page populates language choices asynchronously: check once after its initialization.
  document.addEventListener('tsz-locale-change',render);
  render();
  window.TSZ_KNOTLESS_R304={render};
})();
