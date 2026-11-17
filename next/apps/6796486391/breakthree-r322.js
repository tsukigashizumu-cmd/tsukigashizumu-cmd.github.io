/* R322 — BreakThree LP-only interactive 72-hour illustration. No persistence/network. */
(function () {
  'use strict';
  const ID = 'bt322';
  if (document.getElementById(ID)) return;
  const translations = {
    en: {
      eyebrow: 'THE FIRST 72 HOURS', title: 'Not forever. Just the next cigarette.',
      intro: 'When “I’ll quit for life” feels impossible, begin with a smaller promise: put the next cigarette out of reach. See what the first three days can look like, one hour at a time.',
      note: 'A quiet illustration of the first 72 hours', day: 'Day', days: ['First day','Second day','Third day'],
      scenarios: ['The first hour', 'The difficult middle', 'The final stretch'],
      input: 'Hours since your starting point', slider: 'Adjust your example', remaining: 'Time left in 72 hours', elapsed: 'Time elapsed',
      completed: 'First 72 hours reached', hour: 'hr', hours: 'hrs', of: 'of',
      reset: 'Reset the example', pause: 'When the urge feels loud', pauseDesc: 'Try a small pause before deciding what to do next.',
      startPause: 'Start a 30-second pause', stopPause: 'End this pause', again: 'Try another 30 seconds',
      gentle1: 'Notice your breath. Let your shoulders soften.', gentle2: 'Breathe at a pace that feels comfortable.',
      gentle3: 'Focus on this moment, not the whole future.', gentleEnd: 'Thirty seconds have passed. You can choose your next step.',
      ready: 'A pause is available whenever you want it.', timer: 'seconds remaining',
      help: 'This is an LP-only, hypothetical progress preview. It does not start a real quit attempt, keep records, send reminders, or save information. The BreakThree app offers a guided preparation flow, three candles with a 72-hour countdown, and a 30-second support screen.',
      health: 'This preview is not medical treatment or a substitute for professional help. If you have concerning symptoms, contact a qualified healthcare professional.',
      invalid: 'Choose a whole number from 0 to 72.'
    },
    ja: {
      eyebrow: '最初の72時間を越える', title: '一生分の決意じゃない。次の一本から。',
      intro: '「一生吸わない」と考える前に、まず次の一本を手の届かない場所へ。最初の3日間を、1時間ずつ見える形にします。',
      note: '最初の72時間を静かに確認する体験', day: '日目', days: ['1日目','2日目','3日目'],
      scenarios: ['最初の1時間', 'つらい中盤', 'あと少しの時間'],
      input: '始めてからの経過時間', slider: '経過時間を動かす', remaining: '72時間までの残り', elapsed: '経過時間',
      completed: '最初の72時間に到達', hour: '時間', hours: '時間', of: '／',
      reset: '最初の例に戻す', pause: '吸いたい気持ちが強くなったら', pauseDesc: '次の行動を決める前に、少しだけ間をつくってみましょう。',
      startPause: '30秒の小休止を始める', stopPause: '小休止を終える', again: 'もう一度30秒',
      gentle1: '呼吸に意識を向け、肩の力をゆるめます。', gentle2: '無理のない速さで、自然に呼吸を続けます。',
      gentle3: '一生のことではなく、いまの一瞬に目を向けます。', gentleEnd: '30秒が過ぎました。次の行動を自分で選べます。',
      ready: '必要なときに、小休止を使えます。', timer: '残り秒数',
      help: 'LP専用の架空の進捗表示です。禁煙開始の記録・通知・情報保存はしません。BreakThree本体には、準備のガイド、3本のろうそくと72時間の進行表示、30秒サポート画面があります。',
      health: '医療行為や禁煙治療の代わりではありません。体調に不安がある場合は医療機関などの専門家に相談してください。',
      invalid: '0から72までの整数を入力してください。'
    },
    ar: {
      eyebrow: 'الساعات الاثنتان والسبعون الأولى', title: 'ليس وعداً للأبد. ابدأ بالسيجارة التالية.',
      intro: 'بدلاً من التفكير في العمر كله، ابدأ بخطوة أصغر: أبعد السيجارة التالية عن متناولك. شاهد أول ثلاثة أيام، ساعةً بعد ساعة.',
      note: 'تصوّر هادئ لأول 72 ساعة', day: 'اليوم', days: ['اليوم الأول','اليوم الثاني','اليوم الثالث'],
      scenarios: ['الساعة الأولى','منتصف الطريق الصعب','المرحلة الأخيرة'],
      input: 'الساعات منذ البداية', slider: 'تعديل الوقت المنقضي', remaining: 'المتبقي حتى 72 ساعة', elapsed: 'الوقت المنقضي',
      completed: 'اكتملت أول 72 ساعة', hour: 'ساعة', hours: 'ساعة', of: 'من',
      reset: 'استعادة المثال الأول', pause: 'عندما تشتد الرغبة', pauseDesc: 'جرّب وقفة قصيرة قبل أن تقرر خطوتك التالية.',
      startPause: 'ابدأ استراحة 30 ثانية', stopPause: 'إنهاء الاستراحة', again: 'استراحة أخرى لمدة 30 ثانية',
      gentle1: 'لاحظ تنفّسك وأرخِ كتفيك بلطف.', gentle2: 'تنفّس بإيقاع مريح لك.',
      gentle3: 'ركّز على هذه اللحظة، لا على المستقبل كله.', gentleEnd: 'مرّت ثلاثون ثانية. يمكنك اختيار خطوتك التالية.',
      ready: 'يمكنك أخذ استراحة كلما أردت.', timer: 'ثانية متبقية',
      help: 'عرض توضيحي افتراضي على صفحة التعريف فقط. لا يبدأ محاولة فعلية للإقلاع ولا يحفظ بيانات أو يرسل تنبيهات. يتضمن تطبيق BreakThree خطوات تحضيرية وثلاث شمعات لعرض تقدم 72 ساعة وشاشة دعم لمدة 30 ثانية.',
      health: 'هذا المثال ليس علاجاً طبياً أو بديلاً عن المختصين. إذا ظهرت أعراض مقلقة، فاستشر مختصاً صحياً.',
      invalid: 'أدخل عدداً صحيحاً من 0 إلى 72.'
    }
  };
  let language='en';
  let hours=1;
  let selected=0;
  let seconds=0;
  let timerId=null;
  let completedPause=false;
  const examples=[1,34,65];
  const host=document.createElement('section');
  host.id=ID;
  host.setAttribute('aria-label','BreakThree first 72 hours interactive preview');
  host.innerHTML=`
    <div class="bt-hdr">
      <div class="bt-titlebox"><div class="bt-kicker" data-i="eyebrow"></div><h2 data-i="title"></h2><p class="bt-intro" data-i="intro"></p></div>
      <div class="bt-languages" role="group" aria-label="Preview language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div>
    </div>
    <div class="bt-stage">
      <div class="bt-visual">
        <p class="bt-quiet" data-i="note"></p>
        <div class="bt-candles" aria-hidden="true">
          <div class="bt-candle-wrap" data-candle="0"><div class="bt-halo"></div><div class="bt-flame"></div><div class="bt-wick"></div><div class="bt-wax"></div><div class="bt-day" data-day="0"></div></div>
          <div class="bt-candle-wrap" data-candle="1"><div class="bt-halo"></div><div class="bt-flame"></div><div class="bt-wick"></div><div class="bt-wax"></div><div class="bt-day" data-day="1"></div></div>
          <div class="bt-candle-wrap" data-candle="2"><div class="bt-halo"></div><div class="bt-flame"></div><div class="bt-wick"></div><div class="bt-wax"></div><div class="bt-day" data-day="2"></div></div>
        </div>
        <div class="bt-result" aria-live="polite"><span data-i="remaining"></span><strong data-result="remaining"></strong><span class="bt-finish" data-result="finish" hidden></span></div>
        <div class="bt-track" role="progressbar" aria-valuemin="0" aria-valuemax="72" aria-valuenow="1" aria-label="Hours completed of 72"><span data-track></span></div>
        <div class="bt-progressline"><span data-i="elapsed"></span><strong data-result="elapsed"></strong></div>
      </div>
      <div class="bt-control">
        <div class="bt-examples" role="group" aria-label="Illustrative stages"><button type="button" data-sample="0"></button><button type="button" data-sample="1"></button><button type="button" data-sample="2"></button></div>
        <div class="bt-adjust"><label for="bt322-hours" data-i="input"></label><div class="bt-inputrow"><input id="bt322-hours" data-hours type="number" inputmode="numeric" min="0" max="72" step="1" value="1"/><span> / 72</span></div><label for="bt322-slider" class="bt-range-label" data-i="slider"></label><input id="bt322-slider" data-range type="range" min="0" max="72" step="1" value="1" aria-label="Elapsed hours"/></div>
        <p class="bt-error" role="alert" hidden></p>
        <button type="button" class="bt-reset" data-reset></button>
        <div class="bt-pause"><div class="bt-pause-title" data-i="pause"></div><p data-i="pauseDesc"></p><div class="bt-pause-readout"><span class="bt-timer" data-timer>30</span><span data-i="timer"></span></div><p class="bt-prompt" data-prompt aria-live="polite"></p><button type="button" class="bt-pause-btn" data-pause></button></div>
      </div>
    </div>
    <div class="bt-notes"><p data-i="help"></p><p data-i="health"></p></div>
  `;
  const anchor=document.querySelector('#related');
  if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(host,anchor);
  else (document.querySelector('#overview') || document.querySelector('main') || document.body).appendChild(host);
  const one=s=>host.querySelector(s);
  const all=s=>Array.from(host.querySelectorAll(s));
  const t=()=>translations[language];
  const format=n=>new Intl.NumberFormat(language==='ja'?'ja-JP':language==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(n);
  function paintLabels(){
    host.setAttribute('dir',language==='ar'?'rtl':'ltr');
    all('[data-i]').forEach(el=>{el.textContent=t()[el.dataset.i];});
    all('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===language)));
    all('[data-day]').forEach(el=>el.textContent=t().days[Number(el.dataset.day)]);
    all('[data-sample]').forEach(el=>{
      const yes=Number(el.dataset.sample)===selected;
      el.setAttribute('aria-pressed',String(yes));
      el.textContent=t().scenarios[Number(el.dataset.sample)];
    });
    one('[data-reset]').textContent=t().reset;
    paintPause();
  }
  function paintProgress(){
    const good=Number.isInteger(hours)&&hours>=0&&hours<=72;
    one('.bt-error').hidden=good;
    one('.bt-error').textContent=good?'':t().invalid;
    host.classList.toggle('bt-invalid',!good);
    if(!good){
      one('[data-result="remaining"]').textContent='—';
      one('[data-result="elapsed"]').textContent='—';
      one('[data-result="finish"]').hidden=true;
      one('[data-track]').style.width='0%';
      one('.bt-track').setAttribute('aria-valuenow','0');
      all('[data-candle]').forEach(el=>el.dataset.state='future');
      return;
    }
    one('[data-result="remaining"]').textContent=format(72-hours)+' '+(72-hours===1?t().hour:t().hours);
    one('[data-result="elapsed"]').textContent=format(hours)+' '+t().of+' '+format(72)+' '+t().hours;
    one('[data-result="finish"]').textContent=t().completed;
    one('[data-result="finish"]').hidden=hours!==72;
    one('[data-track]').style.width=(hours/72*100)+'%';
    one('.bt-track').setAttribute('aria-valuenow',String(hours));
    all('[data-candle]').forEach(el=>{
      const day=Number(el.dataset.candle);
      el.dataset.state=hours>=(day+1)*24?'done':hours>=day*24?'active':'future';
    });
  }
  function paintPause(){
    const running=timerId!==null;
    one('[data-timer]').textContent=format(running?seconds:completedPause?0:30);
    one('[data-prompt]').textContent=running?(seconds>20?t().gentle1:seconds>10?t().gentle2:t().gentle3):(completedPause?t().gentleEnd:t().ready);
    one('[data-pause]').textContent=running?t().stopPause:completedPause?t().again:t().startPause;
    one('.bt-pause').classList.toggle('bt-running',running);
  }
  function stopPause(){if(timerId!==null){clearInterval(timerId);timerId=null;}}
  function choose(n){selected=n;hours=examples[n];one('[data-hours]').value=String(hours);one('[data-range]').value=String(hours);paintLabels();paintProgress();}
  all('[data-lang]').forEach(el=>el.addEventListener('click',()=>{language=el.dataset.lang;paintLabels();paintProgress();}));
  all('[data-sample]').forEach(el=>el.addEventListener('click',()=>choose(Number(el.dataset.sample))));
  one('[data-reset]').addEventListener('click',()=>choose(0));
  one('[data-range]').addEventListener('input',()=>{hours=Number(one('[data-range]').value);selected=-1;one('[data-hours]').value=String(hours);paintLabels();paintProgress();});
  one('[data-hours]').addEventListener('input',()=>{
    const raw=one('[data-hours]').value.trim();
    hours=raw===''?NaN:Number(raw);
    selected=-1;
    if(Number.isInteger(hours)&&hours>=0&&hours<=72)one('[data-range]').value=String(hours);
    paintLabels();paintProgress();
  });
  one('[data-pause]').addEventListener('click',()=>{
    if(timerId!==null){stopPause();completedPause=false;paintPause();return;}
    completedPause=false;seconds=30;
    timerId=setInterval(()=>{
      seconds-=1;
      if(seconds<=0){seconds=0;stopPause();completedPause=true;}
      paintPause();
    },1000);
    paintPause();
  });
  window.addEventListener('pagehide',stopPause,{once:true});
  paintLabels();paintProgress();
})();
