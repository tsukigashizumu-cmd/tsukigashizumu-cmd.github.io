/* R250 BreakThree — interactive 72-hour illustration and 30-second breathing support.
   Scoped UI only. No storage, accounts, analytics, or medical advice. */
(() => {
  'use strict';
  const ID='brk250';
  if (document.getElementById(ID)) return;
  const words={
    en:{strap:'QUIT SMOKING · FIRST 72 HOURS',head:'Not forever. Just the next 72 hours.',lead:'You do not have to face the rest of your life today. See the first three days, one quiet moment at a time.',journey:'THE FIRST THREE DAYS',minutes:'hours passed',remaining:'hours remaining',days:['FIRST LIGHT','KEEP THE FLAME','THIRD DAY'],ready:'First step',moving:'One moment at a time',complete:'72-hour milestone',choose:'Move through an example',presets:['At the start','24 hours','48 hours','72 hours'],time:'Adjust example progress',helper:'A sample journey, not a live quit tracker. Your real start time and experience will differ.',craving:'WHEN AN URGE ARRIVES',breathTitle:'Only the next 30 seconds.',breathLead:'Let the next moment be a small pause. This breathing screen is an illustration, not treatment.',breath:'BREATHE',breathHint:'A gentle visual rhythm. Breathe at a pace that feels comfortable.',start:'Start 30-second pause',pause:'Pause',resume:'Resume',restart:'Reset pause',finished:'Pause finished',phaseIn:'Breathe in gently',phaseOut:'Breathe out gently',phaseRest:'Pause and notice',prepare:'ONE ACTION BEFORE THE NEXT CIGARETTE',choices:['Put it out of reach','Drink a glass of water','Take a short walk'],choiceNote:'You chose:',note:'The demonstration does not track abstinence, save a plan, send notifications, or make medical claims. For severe withdrawal symptoms or feeling unwell, seek advice from a qualified healthcare professional.',cta:'See BreakThree on the App Store',lang:'Language',region:'Example',reset:'Reset demo',tag:'A LITTLE SPACE TO CHOOSE'},
    ja:{strap:'禁煙 · 最初の72時間',head:'一生分じゃない。まず、次の72時間。',lead:'今日、一生分の決意をしなくてもいい。最初の3日間を、小さな時間に区切って進める。',journey:'最初の3日間',minutes:'経過時間',remaining:'残り時間',days:['最初の灯り','火を絶やさず','3日目'],ready:'最初の一歩',moving:'次のひとときへ',complete:'72時間の節目',choose:'例を切り替える',presets:['スタート','24時間','48時間','72時間'],time:'サンプルの進み具合',helper:'これは架空の進行例です。実際の禁煙開始日時とは連動しません。',craving:'吸いたくなったとき',breathTitle:'次の30秒だけ。',breathLead:'今この瞬間にできる、小さな間をつくる。これは医療的な治療ではありません。',breath:'呼吸の目安',breathHint:'落ち着いた視覚リズム。無理のない自然な呼吸をしてください。',start:'30秒を始める',pause:'一時停止',resume:'再開する',restart:'最初から',finished:'30秒が終わりました',phaseIn:'ゆっくり吸う',phaseOut:'ゆっくり吐く',phaseRest:'少し休む',prepare:'次の一本の前にできること',choices:['手の届かない所に置く','水を一杯飲む','少し歩く'],choiceNote:'選んだ行動：',note:'操作デモです。禁煙の経過記録・予定の保存・通知・治療効果の判定は行いません。強い離脱症状や体調不良には、医療機関などの専門家へ相談してください。',cta:'App StoreでBreakThreeを見る',lang:'言語',region:'サンプル',reset:'デモを初期化',tag:'選べる余白をつくる'},
    ar:{strap:'الإقلاع عن التدخين · أول 72 ساعة',head:'ليس إلى الأبد. فقط الساعات الـ72 القادمة.',lead:'لا تحتاج إلى مواجهة العمر كله اليوم. شاهد الأيام الثلاثة الأولى، لحظة هادئة بعد أخرى.',journey:'الأيام الثلاثة الأولى',minutes:'ساعات مرّت',remaining:'ساعات متبقية',days:['البداية','أبقِ الشعلة','اليوم الثالث'],ready:'الخطوة الأولى',moving:'لحظة بعد أخرى',complete:'إنجاز 72 ساعة',choose:'اختر مرحلة تجريبية',presets:['البداية','24 ساعة','48 ساعة','72 ساعة'],time:'تقدّم المثال',helper:'هذه رحلة توضيحية وليست متابعة حقيقية للإقلاع عن التدخين.',craving:'عندما تأتي الرغبة',breathTitle:'فقط الثلاثون ثانية التالية.',breathLead:'امنح نفسك وقفة قصيرة. هذه الشاشة توضيحية وليست علاجاً طبياً.',breath:'تَنَفَّس',breathHint:'إيقاع بصري لطيف. تنفّس وفق الوتيرة المريحة لك.',start:'ابدأ وقفة 30 ثانية',pause:'إيقاف مؤقت',resume:'متابعة',restart:'إعادة ضبط',finished:'انتهت الوقفة',phaseIn:'شهيق لطيف',phaseOut:'زفير لطيف',phaseRest:'توقّف ولاحظ',prepare:'خطوة قبل السيجارة التالية',choices:['أبعدها عن متناول يدك','اشرب كوب ماء','امشِ قليلاً'],choiceNote:'اخترت:',note:'عرض توضيحي فقط: لا يتتبع الامتناع أو يحفظ خطة أو يرسل تنبيهات أو يقدم علاجاً. إذا كانت أعراض الانسحاب شديدة، فاستشر مختصاً طبياً.',cta:'شاهد BreakThree على App Store',lang:'اللغة',region:'المثال',reset:'إعادة البداية',tag:'مساحة صغيرة للاختيار'}
  };
  const qs = new URLSearchParams(location.search);
  let lang=(qs.get('lang')||document.documentElement.lang||'en').slice(0,2).toLowerCase(); if(!words[lang])lang='en';
  let region=(qs.get('region')||(lang==='ja'?'JP':'US')).toUpperCase();if(!['US','JP'].includes(region))region='US';
  let elapsed=24,action=0,remaining=30,running=false,handle=null;
  const host=document.createElement('section'); host.id=ID; host.setAttribute('aria-label','BreakThree interactive illustration');
  (document.querySelector('main')||document.body).appendChild(host);
  const t=()=>words[lang],q=s=>host.querySelector(s),qa=s=>Array.from(host.querySelectorAll(s));
  const localNumber=n=>new Intl.NumberFormat(lang==='ar'?'en-US':lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:0}).format(n);
  function stopTimer(){if(handle!==null){clearInterval(handle);handle=null}running=false}
  function stateLabel(){return elapsed===0?t().ready:elapsed>=72?t().complete:t().moving}
  function renderNumbers(){
    q('[data-brk-elapsed]').textContent=localNumber(elapsed);
    q('[data-brk-remaining]').textContent=localNumber(72-elapsed);
    q('[data-brk-percent]').textContent=localNumber(Math.round(elapsed/72*100))+'%';
    q('[data-brk-state]').textContent=stateLabel();
    q('[data-brk-slider]').value=String(elapsed);
    q('[data-brk-progress]').style.width=(elapsed/72*100)+'%';
    qa('[data-brk-candle]').forEach((el,i)=>{
      el.dataset.lit=elapsed>=i*24&&elapsed<=(i+1)*24?'true':'false';
      el.dataset.completed=elapsed>=(i+1)*24?'true':'false';
    });
    qa('[data-brk-preset]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.brkPreset)===elapsed)));
  }
  function paintTimer(){
    const m=t(),s=30-remaining;
    q('[data-brk-clock]').textContent=localNumber(remaining).padStart(2,'0');
    q('[data-brk-ring]').style.setProperty('--brk-angle',(s/30*360)+'deg');
    const phase = s%10;
    const word = remaining===0?m.finished: phase<4?m.phaseIn:phase<8?m.phaseOut:m.phaseRest;
    q('[data-brk-phase]').textContent=word;
    q('[data-brk-breathe]').dataset.phase=remaining===0?'rest':phase<4?'in':phase<8?'out':'rest';
    q('[data-brk-start]').textContent=remaining===0?m.restart:running?m.pause:remaining===30?m.start:m.resume;
    q('[data-brk-start]').setAttribute('aria-pressed',String(running));
  }
  function startPause(){
    if(remaining===0){remaining=30;stopTimer();paintTimer();return}
    if(running){stopTimer();paintTimer();return}
    running=true;paintTimer();
    handle=setInterval(()=>{remaining=Math.max(0,remaining-1);if(remaining===0)stopTimer();paintTimer()},1000);
  }
  function build(){
    const m=t();host.lang=lang;host.dir=lang==='ar'?'rtl':'ltr';
    host.innerHTML=`<div class="brk-shell">
    <header class="brk-top"><div class="brk-brand"><span class="brk-glyph" aria-hidden="true">✳</span><div><strong>BreakThree</strong><small>${m.strap}</small></div></div><div class="brk-switch"><label>${m.lang}<select data-brk-lang><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label>${m.region}<select data-brk-region><option value="US">US</option><option value="JP">JP</option></select></label></div></header>
    <div class="brk-hero"><span class="brk-tag"><i></i>${m.tag}</span><h2>${m.head}</h2><p>${m.lead}</p></div>
    <div class="brk-grid"><section class="brk-card brk-journey"><div class="brk-kicker"><span>01</span><b>${m.journey}</b></div>
    <div class="brk-candles">${m.days.map((d,i)=>`<div class="brk-candle" data-brk-candle="${i}"><span class="brk-candle-visual" aria-hidden="true"><i class="brk-flame"></i><i class="brk-wick"></i><i class="brk-wax"></i></span><small>${d}</small><b>${i*24}–${(i+1)*24}h</b></div>`).join('')}</div>
    <div class="brk-timebar"><div class="brk-time-main"><div><small>${m.minutes}</small><b><span data-brk-elapsed>24</span><em> / 72h</em></b></div><span class="brk-state" data-brk-state></span></div><div class="brk-track"><div data-brk-progress></div></div><div class="brk-time-sub"><span>${m.remaining}</span><strong><span data-brk-remaining></span>h</strong><span data-brk-percent></span></div></div>
    <div class="brk-control"><label for="brk250-progress">${m.time}</label><input id="brk250-progress" data-brk-slider type="range" min="0" max="72" step="1" value="24"/><div class="brk-presets">${m.presets.map((a,i)=>`<button type="button" data-brk-preset="${i*24}">${a}</button>`).join('')}</div><p class="brk-subnote">${m.helper}</p></div></section>
    <section class="brk-card brk-pause"><div class="brk-kicker"><span>02</span><b>${m.craving}</b></div><h3>${m.breathTitle}</h3><p class="brk-pauselead">${m.breathLead}</p><div class="brk-breath-circle" data-brk-breathe data-phase="rest"><div class="brk-rim" data-brk-ring><div class="brk-breath-core"><span>${m.breath}</span><strong data-brk-clock>30</strong><small>SECONDS</small></div></div></div><div class="brk-phase" data-brk-phase></div><p class="brk-breathnote">${m.breathHint}</p><div class="brk-timer-actions"><button type="button" data-brk-start></button><button type="button" class="brk-secondary" data-brk-timer-reset>${m.restart}</button></div></section></div>
    <section class="brk-bottom"><div><p class="brk-kicker"><span>03</span><b>${m.prepare}</b></p><div class="brk-options">${m.choices.map((name,i)=>`<button type="button" data-brk-choice="${i}">${name}</button>`).join('')}</div><p class="brk-chosen"><span>${m.choiceNote}</span><strong data-brk-choice-label></strong></p></div><button class="brk-reset" type="button" data-brk-reset>${m.reset} ↺</button></section>
    <footer class="brk-footer"><p>${m.note}</p><a href="https://apps.apple.com/us/app/breakthree/id6796486391" target="_blank" rel="noopener noreferrer">${m.cta} <span aria-hidden="true">↗</span></a></footer></div>`;
    q('[data-brk-lang]').value=lang;q('[data-brk-region]').value=region;
    renderNumbers();paintTimer();
    qa('[data-brk-preset]').forEach(el=>el.addEventListener('click',()=>{elapsed=Number(el.dataset.brkPreset);renderNumbers()}));
    q('[data-brk-slider]').addEventListener('input',el=>{elapsed=Number(el.target.value);renderNumbers()});
    q('[data-brk-start]').addEventListener('click',startPause);
    q('[data-brk-timer-reset]').addEventListener('click',()=>{stopTimer();remaining=30;paintTimer()});
    qa('[data-brk-choice]').forEach(el=>el.addEventListener('click',()=>{action=Number(el.dataset.brkChoice);paintAction()}));
    q('[data-brk-reset]').addEventListener('click',()=>{stopTimer();elapsed=24;remaining=30;action=0;build()});
    q('[data-brk-lang]').addEventListener('change',el=>{lang=el.target.value;build()});
    q('[data-brk-region]').addEventListener('change',el=>{region=el.target.value;build()});
    paintAction();
  }
  function paintAction(){
    q('[data-brk-choice-label]').textContent=t().choices[action];
    qa('[data-brk-choice]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.brkChoice)===action)));
  }
  build();
})();
