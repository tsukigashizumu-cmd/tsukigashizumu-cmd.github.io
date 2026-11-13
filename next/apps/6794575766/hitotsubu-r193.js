/* TSZ LP R193 | Hitotsubu — illustrative, ephemeral one-grain demo. */
(() => {
  'use strict';
  const APP='6794575766', ID='tsz-hitotsubu-r193';
  if (!document.body || document.getElementById(ID)) return;
  const bodyApp=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
  if (bodyApp && bodyApp!==APP) return;
  if (!bodyApp && !/Hitotsubu/i.test(document.body.textContent||'')) return;
  const locales={
    en:{eyebrow:'THE MOMENTS YOU KEEP',h1a:'Even today,',h1b:'something remained.',sub:'One small moment. One grain. A life quietly kept.',
      surface:'THE SURFACE',depth:['CLAY LAYER','GREENSTONE','IRON BED','SANDSTONE'],section:'TODAY, I KEPT',choices:['Something tasted good','I smiled','I made it through today'],add:'ADD ONE GRAIN',added:'One grain added. It stays in this demo.',last:'Latest grain',none:'Choose a moment to keep.',count:'Grains in this sample jar',hint:'No edit or delete. Reload to restart this illustrative demo.',flow:['A GRAIN','A BOTTLE','A WAREHOUSE'],store:'View on the App Store',disclaimer:'Illustrative browser demo. No actual records are saved.',label:'A moment you chose',tap:'Choose one moment, then add a grain'},
    ja:{eyebrow:'自分で選んだ時間の粒',h1a:'何もなかったと思う日にも、',h1b:'一粒は残っていた。',sub:'小さな出来事が、一粒ずつ生きた時間になる。',
      surface:'地表',depth:['粘土層','緑色岩','鉄の地層','砂岩層'],section:'今日、残したこと',choices:['おいしいものを食べた','少し笑えた','今日を乗り切った'],add:'一粒を瓶に入れる',added:'一粒を追加しました。このデモでは取り消せません。',last:'最後の一粒',none:'残したい瞬間を選んでください。',count:'このデモの瓶にある粒',hint:'編集・削除はできません。ページ再読み込みでデモが初期化されます。',flow:['一粒','瓶','倉庫'],store:'App Storeで見る',disclaimer:'説明用ブラウザデモです。実際の記録は保存されません。',label:'自分で選んだ一瞬',tap:'残す出来事を選び、一粒を追加してください'},
    ar:{eyebrow:'لحظات تحتفظ بها',h1a:'حتى اليوم،',h1b:'بقي شيء صغير.',sub:'لحظة صغيرة. حبة واحدة. حياة نحفظ أثرها بهدوء.',
      surface:'السطح',depth:['طبقة الطين','حجر أخضر','طبقة الحديد','الحجر الرملي'],section:'اليوم احتفظت بـ',choices:['تذوقت شيئًا لذيذًا','ابتسمت','تجاوزت هذا اليوم'],add:'أضف حبة واحدة',added:'أُضيفت حبة. لا يمكن حذفها في هذا العرض.',last:'آخر حبة',none:'اختر لحظة للاحتفاظ بها.',count:'عدد الحبات في زجاجة العرض',hint:'لا تعديل ولا حذف. أعد تحميل الصفحة للبدء من جديد.',flow:['حبة','زجاجة','مخزن'],store:'عرض في App Store',disclaimer:'عرض توضيحي في المتصفح، ولا تُحفظ أي سجلات حقيقية.',label:'لحظة اخترتها',tap:'اختر لحظة ثم أضف حبة'}
  };
  const root=document.createElement('section');root.id=ID;root.className='ht193';root.setAttribute('aria-labelledby','ht193-title');
  root.innerHTML=`<div class="ht193-shell">
    <div class="ht193-top"><div class="ht193-brand"><span class="ht193-brand-icon" aria-hidden="true">◈</span><b>Hitotsubu</b></div><span class="ht193-top-note" data-ht193="eyebrow"></span></div>
    <div class="ht193-main">
      <div class="ht193-story"><p class="ht193-eyebrow" data-ht193="eyebrow"></p><h2 id="ht193-title"><span data-ht193="h1a"></span><em data-ht193="h1b"></em></h2><p class="ht193-lead" data-ht193="sub"></p>
        <div class="ht193-scene" aria-label="Illustrative glass jar and wooden warehouse">
          <div class="ht193-warehouse" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="ht193-surface-label" data-ht193="surface"></div>
          <div class="ht193-jar"><div class="ht193-cork"></div><div class="ht193-jar-neck"></div><div class="ht193-jar-body"><div class="ht193-glass-shine"></div><div class="ht193-grains" id="ht193-grains" aria-hidden="true"></div></div><div class="ht193-jar-base"></div></div>
          <div class="ht193-table"></div>
        </div>
      </div>
      <div class="ht193-form"><div class="ht193-form-top"><span class="ht193-ornament" aria-hidden="true">✧</span><span data-ht193="section"></span><span class="ht193-ornament" aria-hidden="true">✧</span></div>
        <p class="ht193-instruct" data-ht193="tap"></p><div class="ht193-choices" role="group" aria-label="Choose a moment">
          <button type="button" data-ht193-choice="0"><span class="ht193-symbol" aria-hidden="true">☕</span><span data-ht193-option="0"></span><span class="ht193-check" aria-hidden="true"></span></button>
          <button type="button" data-ht193-choice="1"><span class="ht193-symbol" aria-hidden="true">☼</span><span data-ht193-option="1"></span><span class="ht193-check" aria-hidden="true"></span></button>
          <button type="button" data-ht193-choice="2"><span class="ht193-symbol" aria-hidden="true">✦</span><span data-ht193-option="2"></span><span class="ht193-check" aria-hidden="true"></span></button>
        </div>
        <button type="button" class="ht193-add" id="ht193-add"><span aria-hidden="true">＋</span><span data-ht193="add"></span></button>
        <div class="ht193-count" aria-live="polite"><span data-ht193="count"></span><strong id="ht193-total">3</strong></div>
        <p class="ht193-recent"><span data-ht193="last"></span><b id="ht193-latest"></b></p><p class="ht193-notice" id="ht193-notice" role="status" aria-live="polite"></p><p class="ht193-hint" data-ht193="hint"></p>
      </div>
    </div>
    <div class="ht193-flow"><span data-ht193-flow="0"></span><span aria-hidden="true">➝</span><span data-ht193-flow="1"></span><span aria-hidden="true">➝</span><span data-ht193-flow="2"></span></div>
    <div class="ht193-bottom"><a id="ht193-store" href="https://apps.apple.com/us/app/id6794575766" target="_blank" rel="noopener noreferrer" data-ht193="store"></a><p data-ht193="disclaimer"></p></div>
  </div>`;
  const anchor=document.querySelector('.p19-breadcrumb')||document.querySelector('[class*="breadcrumb"]');
  if(anchor&&anchor.parentNode)anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',root);else document.body.insertBefore(root,document.body.firstChild);}
  if(!root.isConnected)return;
  const $=q=>root.querySelector(q), $$=q=>Array.from(root.querySelectorAll(q));
  const findSelect=kind=>{const candidates=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];for(const name of candidates){const e=document.querySelector(name);if(e?.tagName==='SELECT')return e;}return null;};
  const language=()=>{const s=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return s.startsWith('ja')?'ja':s.startsWith('ar')?'ar':'en';};
  const region=()=>{const s=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(s)?s:'us';};
  const INITIAL=3, CAP=48;
  let chosen=0, records=[0,1,2]; // Three clearly labeled illustrative starter grains, never persisted.
  const grains=$('#ht193-grains');
  function buildGrains(){grains.replaceChildren();for(let i=0;i<Math.min(records.length,CAP);i++){
    const grain=document.createElement('span');grain.className='ht193-grain';const col=i%8,row=Math.floor(i/8);
    grain.style.left=`${12+col*9.4+(i%3)*1.4}%`;grain.style.bottom=`${8+row*10.0+(i%2)*2}%`;
    grain.style.transform=`rotate(${(i*37)%120-60}deg)`;grain.style.animationDelay=`${i*24}ms`;grains.appendChild(grain);
  }}
  function render(){const code=language(),t=locales[code];root.lang=code;root.dir=code==='ar'?'rtl':'ltr';
    $$('[data-ht193]').forEach(el=>{const k=el.dataset.ht193;if(typeof t[k]==='string')el.textContent=t[k];});
    $$('[data-ht193-option]').forEach(el=>el.textContent=t.choices[Number(el.dataset.ht193Option)]);
    $$('[data-ht193-flow]').forEach(el=>el.textContent=t.flow[Number(el.dataset.ht193Flow)]);
    $$('[data-ht193-choice]').forEach(b=>{const active=Number(b.dataset.ht193Choice)===chosen;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active));b.querySelector('.ht193-check').textContent=active?'✓':'○';});
    $('#ht193-total').textContent=String(records.length);
    $('#ht193-latest').textContent=t.choices[records[records.length-1]];
    $('#ht193-store').href='https://apps.apple.com/'+region()+'/app/id'+APP;
  }
  $$('[data-ht193-choice]').forEach(b=>b.addEventListener('click',()=>{const idx=Number(b.dataset.ht193Choice);if(idx>=0&&idx<=2){chosen=idx;render();}}));
  $('#ht193-add').addEventListener('click',()=>{if(records.length>=CAP){$('#ht193-notice').textContent=language()==='ja'?'このデモの瓶は満杯です。':language()==='ar'?'امتلأت زجاجة العرض.':'This sample jar is full.';return;}
    records.push(chosen);buildGrains();render();$('#ht193-notice').textContent=locales[language()].added;
  });
  document.addEventListener('change',ev=>{if(ev.target===findSelect('language')||ev.target===findSelect('country'))render();},true);
  window.addEventListener('popstate',render);
  buildGrains();render();
})();
