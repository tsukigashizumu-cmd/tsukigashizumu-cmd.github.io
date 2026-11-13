/* R186 BreakThree — illustrative LP-only first-72-hours demo. No data is stored. */
(() => {
  'use strict';
  const APP_ID = '6796486391';
  const ROOT_ID = 'tsz-breakthree-r186';
  if (!document.body || document.body.dataset.p199Id !== APP_ID || document.getElementById(ROOT_ID)) return;
  const phrases = {
    en: {
      brand:'BREAKTHREE', eyebrow:'THE FIRST 72 HOURS', h1:'Not forever.', h2:'Just the next 72 hours.',
      lead:'One decision. One hour at a time.', intro:'A quiet, interactive preview — not your actual quit record.',
      elapsed:'COMPLETED', remaining:'REMAINING', current:'DAY', progress:'OF 72 HOURS',
      control:'Explore the first 72 hours', scrub:'Example elapsed time', less:'− 6 hours', more:'+ 6 hours',
      day1:'DAY 1', day2:'DAY 2', day3:'DAY 3', completed:'DONE', active:'IN PROGRESS', upcoming:'AHEAD',
      startPause:'30-second pause', pauseTitle:'A moment for yourself', ready:'Ready when you are.',
      breatheIn:'Breathe in gently', breatheOut:'Breathe out slowly', breatheHold:'Stay with this moment',
      start:'Start 30s', pause:'Pause', resume:'Resume', resetPause:'Reset pause', reset:'Reset example',
      focus:'One moment. One breath. No pressure.', done:'Thirty seconds completed. You can begin again.',
      help:'This is a manual example; it does not monitor your smoking, save progress, or offer medical treatment.',
      store:'View on the App Store', feature1:'Prepare', feature1Sub:'Make space for a different action.',
      feature2:'Stay with the moment', feature2Sub:'Try a short guided pause.', feature3:'Keep your record',
      feature3Sub:'Your real records belong in the app.', disclaimer:'Support tool, not medical treatment. Sample progress only.'
    },
    ja: {
      brand:'BREAKTHREE', eyebrow:'最初の72時間', h1:'一生分を考えない。', h2:'まず、次の72時間。',
      lead:'一つの決断を、一時間ずつ。', intro:'LP専用の体験例です。実際の禁煙記録ではありません。',
      elapsed:'経過', remaining:'残り', current:'日目', progress:'72時間中',
      control:'最初の72時間を体験', scrub:'サンプル経過時間', less:'− 6時間', more:'＋6時間',
      day1:'1日目', day2:'2日目', day3:'3日目', completed:'完了', active:'進行中', upcoming:'これから',
      startPause:'30秒のひと休み', pauseTitle:'自分のための30秒', ready:'自分のペースで始めよう。',
      breatheIn:'ゆっくり吸う', breatheOut:'ゆっくり吐く', breatheHold:'今の時間に意識を向ける',
      start:'30秒スタート', pause:'一時停止', resume:'再開', resetPause:'30秒をリセット', reset:'表示を初期化',
      focus:'一瞬、一呼吸。急がなくていい。', done:'30秒が経過しました。もう一度始められます。',
      help:'これは手動で動かす説明用デモです。喫煙状態の監視、記録の保存、医療行為は行いません。',
      store:'App Storeで見る', feature1:'準備する', feature1Sub:'別の行動を用意しておく。',
      feature2:'今に集中する', feature2Sub:'短い呼吸ガイドを試す。', feature3:'記録を残す',
      feature3Sub:'実際の記録はアプリで管理。', disclaimer:'医療行為ではありません。進捗はサンプルです。'
    },
    ar: {
      brand:'BREAKTHREE', eyebrow:'الساعات الـ72 الأولى', h1:'ليس إلى الأبد.', h2:'فقط الـ72 ساعة القادمة.',
      lead:'قرار واحد، وساعة تلو الأخرى.', intro:'تجربة توضيحية على الموقع، وليست سجلك الحقيقي.',
      elapsed:'انقضت', remaining:'المتبقية', current:'اليوم', progress:'من 72 ساعة',
      control:'استكشف أول 72 ساعة', scrub:'الساعات المنقضية في المثال', less:'− 6 ساعات', more:'+ 6 ساعات',
      day1:'اليوم 1', day2:'اليوم 2', day3:'اليوم 3', completed:'اكتمل', active:'جارٍ', upcoming:'قادم',
      startPause:'استراحة لمدة 30 ثانية', pauseTitle:'لحظة لنفسك', ready:'ابدأ على راحتك.',
      breatheIn:'تنفّس بلطف', breatheOut:'أخرج النفس ببطء', breatheHold:'ابقَ مع هذه اللحظة',
      start:'ابدأ 30 ثانية', pause:'إيقاف مؤقت', resume:'متابعة', resetPause:'إعادة 30 ثانية', reset:'إعادة المثال',
      focus:'لحظة واحدة ونَفَس واحد، دون ضغط.', done:'انقضت ثلاثون ثانية. يمكنك البدء مجدداً.',
      help:'مثال يدوي فقط. لا يراقب التدخين ولا يحفظ التقدم ولا يقدم علاجاً طبياً.',
      store:'عرضه على App Store', feature1:'استعد', feature1Sub:'جهّز بديلاً مناسباً.',
      feature2:'ابقَ في اللحظة', feature2Sub:'جرّب استراحة تنفّس قصيرة.', feature3:'احتفظ بسجلك',
      feature3Sub:'السجل الحقيقي داخل التطبيق.', disclaimer:'أداة مساعدة وليست علاجاً طبياً. التقدم المعروض تجريبي.'
    }
  };
  const root = document.createElement('section');
  root.id = ROOT_ID;
  root.className = 'bt186';
  root.setAttribute('aria-labelledby','bt186-heading');
  root.innerHTML = `
    <div class="bt186-top"><span class="bt186-mark" aria-hidden="true">≋</span><strong data-bt-text="brand"></strong><span class="bt186-topline"></span><span data-bt-text="eyebrow"></span></div>
    <div class="bt186-hero">
      <div class="bt186-copy"><p class="bt186-eyebrow" data-bt-text="eyebrow"></p>
        <h2 id="bt186-heading"><span data-bt-text="h1"></span><em data-bt-text="h2"></em></h2>
        <p class="bt186-lead" data-bt-text="lead"></p><p class="bt186-subnote" data-bt-text="intro"></p>
        <div class="bt186-candles" role="img" aria-label="Three candles showing the first three days of the journey">
          <span class="bt186-candle" data-day="1"><span class="bt186-flame"></span><span class="bt186-wick"></span><span class="bt186-wax"></span></span>
          <span class="bt186-candle" data-day="2"><span class="bt186-flame"></span><span class="bt186-wick"></span><span class="bt186-wax"></span></span>
          <span class="bt186-candle" data-day="3"><span class="bt186-flame"></span><span class="bt186-wick"></span><span class="bt186-wax"></span></span>
        </div>
      </div>
      <div class="bt186-panel"><p class="bt186-panel-head" data-bt-text="eyebrow"></p>
        <div class="bt186-numbers"><div><output id="bt186-elapsed" dir="ltr">24h</output><span data-bt-text="elapsed"></span></div><div><output id="bt186-remaining" dir="ltr">48h</output><span data-bt-text="remaining"></span></div></div>
        <div class="bt186-days" id="bt186-days" aria-label="Three-day progress">
          <div class="bt186-day" data-day="1"><strong data-bt-text="day1"></strong><small></small></div>
          <div class="bt186-day" data-day="2"><strong data-bt-text="day2"></strong><small></small></div>
          <div class="bt186-day" data-day="3"><strong data-bt-text="day3"></strong><small></small></div>
        </div>
        <div class="bt186-progress-row"><div class="bt186-track" role="progressbar" aria-label="72 hour example progress" aria-valuemin="0" aria-valuemax="72" aria-valuenow="24"><span id="bt186-progress"></span></div><output id="bt186-pct" dir="ltr">33%</output></div>
        <div class="bt186-slider-wrap"><label for="bt186-range" data-bt-text="scrub"></label><output id="bt186-hours" for="bt186-range" dir="ltr">24 / 72h</output></div>
        <input type="range" id="bt186-range" min="0" max="72" step="1" value="24" aria-label="Illustrative hours completed">
        <div class="bt186-change"><button id="bt186-minus" type="button" data-bt-text="less"></button><button id="bt186-plus" type="button" data-bt-text="more"></button><button id="bt186-reset" type="button" data-bt-text="reset"></button></div>
        <div class="bt186-pause"><div class="bt186-pause-head"><span class="bt186-pause-icon" aria-hidden="true">◌</span><span data-bt-text="pauseTitle"></span></div>
          <div class="bt186-pause-core"><strong id="bt186-seconds" dir="ltr" aria-live="off">30</strong><span id="bt186-phase" data-bt-text="ready" role="status" aria-live="polite"></span></div>
          <div class="bt186-pause-actions"><button type="button" id="bt186-start" data-bt-text="start"></button><button type="button" id="bt186-pause-reset" data-bt-text="resetPause"></button></div>
          <p class="bt186-pause-caption" data-bt-text="focus"></p>
        </div>
      </div>
    </div>
    <div class="bt186-foot"><div class="bt186-features"><div><b>01</b><strong data-bt-text="feature1"></strong><span data-bt-text="feature1Sub"></span></div><div><b>02</b><strong data-bt-text="feature2"></strong><span data-bt-text="feature2Sub"></span></div><div><b>03</b><strong data-bt-text="feature3"></strong><span data-bt-text="feature3Sub"></span></div></div>
      <a class="bt186-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6796486391"><span aria-hidden="true">●</span><span data-bt-text="store"></span><span aria-hidden="true">↗</span></a>
      <p class="bt186-disclaimer" data-bt-text="disclaimer"></p><p class="bt186-help" data-bt-text="help"></p>
    </div>`;
  const anchor = document.querySelector('.p19-breadcrumb');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {
    const main=document.querySelector('#p199-content')||document.querySelector('main');
    if(main&&main.parentNode) main.parentNode.insertBefore(root,main);
  }
  if (!root.isConnected) return;
  const $ = s => root.querySelector(s);
  const $$ = s => Array.from(root.querySelectorAll(s));
  let elapsed=24, lang='en', seconds=30, clock=null, due=null, isRunning=false, finished=false;
  const locale=() => {
    const v=String(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return v.startsWith('ar')?'ar':v.startsWith('ja')?'ja':'en';
  };
  const country=() => {
    const v=String(document.querySelector('#p199-country')?.value||'us').toLowerCase();
    return /^[a-z]{2}$/.test(v)?v:'us';
  };
  function update72(){
    $('#bt186-elapsed').textContent=`${elapsed}h`;
    $('#bt186-remaining').textContent=`${72-elapsed}h`;
    $('#bt186-hours').textContent=`${elapsed} / 72h`;
    $('#bt186-range').value=String(elapsed);
    const pct=Math.round(100*elapsed/72);
    $('#bt186-progress').style.width=`${100*elapsed/72}%`;
    $('#bt186-pct').textContent=`${pct}%`;
    $('.bt186-track').setAttribute('aria-valuenow',String(elapsed));
    $$('.bt186-day').forEach((el,i)=>{
      const s=elapsed>=(i+1)*24?'completed':elapsed>i*24||(elapsed===0&&i===0)?'active':'upcoming';
      el.dataset.state=s;el.querySelector('small').textContent=phrases[lang][s];
    });
    $$('.bt186-candle').forEach((el,i)=>{el.dataset.state=elapsed>=(i+1)*24?'completed':elapsed>i*24||(elapsed===0&&i===0)?'active':'upcoming';});
    $('#bt186-minus').disabled=elapsed===0;
    $('#bt186-plus').disabled=elapsed===72;
  }
  function pausePhase(){
    if(finished)return phrases[lang].done;
    if(!isRunning && seconds===30)return phrases[lang].ready;
    if(!isRunning)return phrases[lang].breatheHold;
    return (30-seconds)%8<4?phrases[lang].breatheIn:phrases[lang].breatheOut;
  }
  function renderPause(){
    $('#bt186-seconds').textContent=String(seconds).padStart(2,'0');
    $('#bt186-phase').textContent=pausePhase();
    $('#bt186-start').textContent=isRunning?phrases[lang].pause:seconds===30||finished?phrases[lang].start:phrases[lang].resume;
    $('#bt186-pause-reset').textContent=phrases[lang].resetPause;
    $('.bt186-pause').classList.toggle('bt186-running',isRunning);
  }
  function stopClock(){if(clock!==null){window.clearInterval(clock);clock=null;} isRunning=false;due=null;}
  function tick(){
    if(!isRunning)return;
    seconds=Math.max(0,Math.ceil((due-Date.now())/1000));
    if(seconds===0){stopClock();finished=true;}
    renderPause();
  }
  function begin(){
    if(isRunning)return;
    if(finished){seconds=30;finished=false;}
    due=Date.now()+seconds*1000;isRunning=true;
    if(clock!==null)window.clearInterval(clock);
    clock=window.setInterval(tick,100);
    renderPause();
  }
  $('#bt186-range').addEventListener('input',e=>{elapsed=Math.max(0,Math.min(72,Number(e.target.value)||0));update72();});
  $('#bt186-minus').addEventListener('click',()=>{elapsed=Math.max(0,elapsed-6);update72();});
  $('#bt186-plus').addEventListener('click',()=>{elapsed=Math.min(72,elapsed+6);update72();});
  $('#bt186-reset').addEventListener('click',()=>{elapsed=24;update72();});
  $('#bt186-start').addEventListener('click',()=>{
    if(isRunning){seconds=Math.max(0,Math.ceil((due-Date.now())/1000));stopClock();renderPause();}
    else begin();
  });
  $('#bt186-pause-reset').addEventListener('click',()=>{stopClock();seconds=30;finished=false;renderPause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&isRunning){seconds=Math.max(0,Math.ceil((due-Date.now())/1000));stopClock();renderPause();}});
  function translate(){
    lang=locale();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    $$('[data-bt-text]').forEach(el=>{el.textContent=phrases[lang][el.dataset.btText]||'';});
    $('.bt186-store').href=`https://apps.apple.com/${country()}/app/id${APP_ID}`;
    update72();renderPause();
  }
  const languageInput=document.querySelector('#p199-language'),countryInput=document.querySelector('#p199-country');
  if(languageInput)languageInput.addEventListener('change',translate);
  if(countryInput)countryInput.addEventListener('change',translate);
  document.addEventListener('p199:localechange',translate);
  translate();
})();
