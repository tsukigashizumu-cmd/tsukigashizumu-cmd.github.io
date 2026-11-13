/* Jiiya Roll — R185 website-only illustrative dice-and-staff demo. No tracking or persistence. */
(() => {
  'use strict';
  const APP_ID = '6765972725';
  const ROOT_ID = 'tsz-jiiyaroll-r185';
  if (!document.body || document.body.dataset.p199Id !== APP_ID || document.getElementById(ROOT_ID)) return;
  const langMap = {
    en: {
      brand:'JIIYA ROLL', overline:'24-HOUR CHALLENGE', headline1:'One more roll', headline2:'changes the story.',
      strap:'Roll dice. Earn demo funds. Hire Jiiya. Keep growing.', demo:'INTERACTIVE WEBSITE DEMO',
      roll:'ROLL AGAIN', rolling:'ROLLING…', hire:'HIRE JIIYA', reset:'Reset demo',
      result:'LAST ROLL', earn:'EARNED', wallet:'DEMO FUNDS', team:'JIIYA STAFF', price:'NEXT HIRE COST',
      ready:'Make a roll, then hire a helper.', hired:'A Jiiya joined your team!',
      short:'Roll again to earn more demo funds.', rollStatus:'Roll complete. Earned {amount} demo funds.',
      cap:'The demo team is full.', rollStep:'ROLL', earnStep:'EARN', hireStep:'HIRE', moreStep:'ROLL MORE',
      store:'View on the App Store', disclaimer:'Illustrative gameplay concept. Demo funds have no cash value. No gambling, real-money betting, or saved progress.',
      game:'Roll → Earn → Hire → Roll more', next:'Each helper adds +1 to later rolls.',
      video:'See the real game on the App Store.'
    },
    ja: {
      brand:'JIIYA ROLL', overline:'24時間チャレンジ', headline1:'もう一回振れば、', headline2:'展開が変わる。',
      strap:'サイコロを振る。資金を得る。じいやを雇う。', demo:'LP専用の体験デモ',
      roll:'サイコロを振る', rolling:'回転中…', hire:'じいやを雇う', reset:'初期化',
      result:'直近の出目', earn:'獲得', wallet:'サンプル資金', team:'じいやスタッフ', price:'次の雇用費用',
      ready:'サイコロを振って、スタッフを雇ってみよう。', hired:'じいやが仲間に加わりました！',
      short:'資金が足りません。サイコロを振りましょう。', rollStatus:'出目が決まり、サンプル資金を{amount}獲得しました。',
      cap:'デモのスタッフ数が上限に達しました。', rollStep:'振る', earnStep:'稼ぐ', hireStep:'雇う', moreStep:'また振る',
      store:'App Storeで見る', disclaimer:'LP専用の架空のゲーム例です。資金に現金価値はなく、賭博・現金の賭け・実ゲームの進行保存はありません。',
      game:'振る → 稼ぐ → 雇う → また振る', next:'スタッフ1人につき次回以降の獲得に＋1。',
      video:'実際のゲーム内容はApp Storeでご覧ください。'
    },
    ar: {
      brand:'JIIYA ROLL',overline:'تحدي 24 ساعة',headline1:'رمية أخرى',headline2:'تغيّر الحكاية.',
      strap:'ارمِ النرد. اكسب رصيداً تجريبياً. وظّف مساعداً.',demo:'تجربة توضيحية على الموقع',
      roll:'ارمِ النرد',rolling:'جارٍ الرمي…',hire:'وظّف مساعداً',reset:'إعادة ضبط المثال',
      result:'آخر رمية',earn:'المكتسب',wallet:'رصيد تجريبي',team:'عدد المساعدين',price:'تكلفة المساعد التالي',
      ready:'ارمِ النرد ثم جرّب توظيف مساعد.',hired:'انضم مساعد إلى فريقك!',
      short:'الرصيد غير كافٍ. ارمِ النرد مرة أخرى.',rollStatus:'اكتملت الرمية. كسبت {amount} نقطة تجريبية.',
      cap:'وصل فريق التجربة إلى الحد الأقصى.',rollStep:'ارمِ',earnStep:'اكسب',hireStep:'وظّف',moreStep:'كرر',
      store:'عرضه على App Store',disclaimer:'مثال توضيحي للموقع فقط. الرصيد بلا قيمة نقدية. لا توجد مراهنات أو مقامرة بالمال أو حفظ للتقدم.',
      game:'ارمِ ← اكسب ← وظّف ← كرر',next:'يضيف كل مساعد نقطة واحدة إلى المكسب في الرميات التالية.',
      video:'اطّلع على اللعبة الفعلية على App Store.'
    }
  };
  const root = document.createElement('section');
  root.id = ROOT_ID;
  root.className = 'jr185';
  root.setAttribute('aria-labelledby','jr185-headline');
  root.innerHTML = `
    <header class="jr185-top"><span class="jr185-icon" aria-hidden="true">⚄</span><span class="jr185-name" data-jr-text="brand">JIIYA ROLL</span><span class="jr185-top-mark" data-jr-text="overline"></span></header>
    <div class="jr185-scene" aria-hidden="true"><span class="jr185-orbit jr185-orbit-a"></span><span class="jr185-orbit jr185-orbit-b"></span><span class="jr185-fan"></span><span class="jr185-coin jr185-coin-1">✦</span><span class="jr185-coin jr185-coin-2">✦</span></div>
    <div class="jr185-body"><div class="jr185-head"><p class="jr185-eyebrow" data-jr-text="overline"></p><h2 id="jr185-headline"><span data-jr-text="headline1"></span><em data-jr-text="headline2"></em></h2><p data-jr-text="strap" class="jr185-strap"></p></div>
      <div class="jr185-board"><div class="jr185-board-head"><span class="jr185-ornament">✧</span><span data-jr-text="demo"></span><span class="jr185-ornament">✧</span></div>
        <div class="jr185-main"><div class="jr185-dice-wrap"><div id="jr185-die" class="jr185-die" data-face="6" role="img" aria-label="Dice showing six"><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span><span class="jr185-pip"></span></div></div>
          <div class="jr185-stats"><div><small data-jr-text="result"></small><output id="jr185-last" dir="ltr">6</output></div><div><small data-jr-text="earn"></small><output id="jr185-gain" dir="ltr">+6</output></div><div><small data-jr-text="team"></small><output id="jr185-staff" dir="ltr">03</output></div></div>
        </div>
        <div class="jr185-resources"><div><small data-jr-text="wallet"></small><output id="jr185-funds" dir="ltr">15</output></div><div><small data-jr-text="price"></small><output id="jr185-cost" dir="ltr">18</output></div></div>
        <p class="jr185-status" id="jr185-status" role="status" aria-live="polite"></p>
        <div class="jr185-controls"><button type="button" id="jr185-roll"><span aria-hidden="true">⚄</span> <span data-jr-text="roll"></span></button><button type="button" id="jr185-hire"><span aria-hidden="true">＋</span> <span data-jr-text="hire"></span></button><button type="button" id="jr185-reset" data-jr-text="reset"></button></div>
      </div>
      <div class="jr185-steps"><span data-jr-text="rollStep"></span><span aria-hidden="true">→</span><span data-jr-text="earnStep"></span><span aria-hidden="true">→</span><span data-jr-text="hireStep"></span><span aria-hidden="true">→</span><span data-jr-text="moreStep"></span></div>
      <p class="jr185-small" data-jr-text="next"></p>
      <a class="jr185-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6765972725"><span aria-hidden="true">●</span><span data-jr-text="store"></span><span aria-hidden="true">↗</span></a>
      <p class="jr185-note" data-jr-text="disclaimer"></p><p class="jr185-real" data-jr-text="video"></p>
    </div>`;
  const anchor = document.querySelector('.p19-breadcrumb');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else { const main = document.querySelector('#p199-content') || document.querySelector('main'); if(main && main.parentNode) main.parentNode.insertBefore(root,main); }
  if (!root.isConnected) return;
  const $ = sel => root.querySelector(sel);
  const $$ = sel => Array.from(root.querySelectorAll(sel));
  const original = () => ({ funds:15, staff:3, face:6, gain:6, rolls:0 });
  let game = original(), locale='en', busy=false, pending=null;
  const getLang = () => {const l=String(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase(); return l.startsWith('ar')?'ar':l.startsWith('ja')?'ja':'en';};
  const getCountry = () => {const v=String(document.querySelector('#p199-country')?.value || 'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  const nextCost = () => 6 * game.staff;
  function show(){
    $('#jr185-last').textContent=String(game.face);
    $('#jr185-gain').textContent='+'+String(game.gain);
    $('#jr185-staff').textContent=String(game.staff).padStart(2,'0');
    $('#jr185-funds').textContent=String(game.funds);
    $('#jr185-cost').textContent=game.staff>=12?'—':String(nextCost());
    $('#jr185-die').dataset.face=String(game.face);
    $('#jr185-die').setAttribute('aria-label','Dice showing '+game.face);
    $('#jr185-hire').disabled=busy||game.staff>=12||game.funds<nextCost();
    $('#jr185-roll').disabled=busy;
  }
  function message(key, amount){$('#jr185-status').textContent=langMap[locale][key].replace('{amount}',String(amount??''));}
  function translate(){
    locale=getLang();const txt=langMap[locale];root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';
    $$('[data-jr-text]').forEach(e=>{e.textContent=txt[e.dataset.jrText]||'';});
    $('.jr185-store').href=`https://apps.apple.com/${getCountry()}/app/id${APP_ID}`;
    if (!busy)message('ready');
    show();
  }
  $('#jr185-roll').addEventListener('click',()=>{
    if (busy)return;
    busy=true;show();$('#jr185-die').classList.add('jr185-rolling');
    $('[data-jr-text="roll"]').textContent=langMap[locale].rolling;
    pending=window.setTimeout(()=>{
      const face=1+Math.floor(Math.random()*6);
      const gain=face+game.staff;
      game={...game,face,gain,rolls:game.rolls+1,funds:game.funds+gain};
      busy=false;pending=null;$('#jr185-die').classList.remove('jr185-rolling');
      $('[data-jr-text="roll"]').textContent=langMap[locale].roll;
      show();message('rollStatus',gain);
    },410);
  });
  $('#jr185-hire').addEventListener('click',()=>{
    if(busy)return;
    if(game.staff>=12){message('cap');return;}
    if(game.funds<nextCost()){message('short');return;}
    game.funds-=nextCost(); game.staff+=1;show();message('hired');
  });
  $('#jr185-reset').addEventListener('click',()=>{
    if(pending!==null){window.clearTimeout(pending);pending=null;}
    busy=false;game=original();$('#jr185-die').classList.remove('jr185-rolling');
    $('[data-jr-text="roll"]').textContent=langMap[locale].roll;show();message('ready');
  });
  const languageInput=document.querySelector('#p199-language');const countryInput=document.querySelector('#p199-country');
  if(languageInput)languageInput.addEventListener('change',translate);
  if(countryInput)countryInput.addEventListener('change',translate);
  document.addEventListener('p199:localechange',translate);
  translate();
})();
