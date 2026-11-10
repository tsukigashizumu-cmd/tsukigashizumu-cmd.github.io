/* TSZ LP R80 / BreakThree — website-only 72-hour progress & 30-second pause illustration.
   Not an app screen, quit tracker, treatment, or medical advice. No data is stored/sent. */
(() => {
  'use strict';
  const APP = '6796486391';
  const COPY = {
    en: {
      eyebrow:'FIRST 72 HOURS', badge:'INTERACTIVE WEBSITE EXAMPLE',
      title:'Not forever. Just the next moment.',
      intro:'Explore the first three days one hour at a time. When an urge comes, try a quiet 30-second pause.',
      progress:'Explore the hours', hour:'hours', completed:'72 hours explored',
      day:'Day', candle:'Day', zero:'Starting point',
      remaining:'Remaining in this example', step:'Current chapter',
      chapter1:'Begin with the next cigarette out of reach',
      chapter2:'Keep your alternative action nearby',
      chapter3:'Focus on the next manageable moment',
      chapter4:'Three-day preview complete',
      pause:'A quiet 30-second pause', pauseInfo:'Take a moment. Breathe comfortably at your own pace.',
      start:'Start 30-second pause', cancel:'End pause', again:'Start again',
      ready:'Ready when you are', running:'Pause in progress', finished:'30-second example finished',
      unit:'sec', reset:'Reset example',
      note:'This is a website-only interactive illustration, not a BreakThree app screen. The hours are manually selected examples, not your actual smoke-free time. The pause is not a treatment, does not measure breathing, and stores or sends no information. BreakThree is not a substitute for medical care. Seek professional help for severe withdrawal symptoms or feeling unwell.'
    },
    ja: {
      eyebrow:'最初の72時間', badge:'LP専用・操作できる説明例',
      title:'一生ではなく、次のひとときへ。',
      intro:'最初の3日間を、1時間ずつ動かして確かめる。吸いたくなったときは、静かな30秒を試せます。',
      progress:'時間を動かしてみる', hour:'時間', completed:'72時間の例を表示しました',
      day:'日目', candle:'日目', zero:'スタート地点',
      remaining:'残り時間（説明例）', step:'この段階のヒント',
      chapter1:'次の一本を手の届かない場所へ',
      chapter2:'代わりの行動を手元に用意する',
      chapter3:'次の小さなひとときに集中する',
      chapter4:'3日間のプレビューが完了',
      pause:'静かな30秒', pauseInfo:'無理なく、自分のペースで自然に呼吸してください。',
      start:'30秒をはじめる', cancel:'途中で終える', again:'もう一度30秒',
      ready:'準備できたら始める', running:'30秒の進行中', finished:'30秒の説明例が終了',
      unit:'秒', reset:'例を最初に戻す',
      note:'これはLP専用の説明例で、BreakThreeアプリの実画面ではありません。時間は手動で選ぶ架空の経過であり、実際の禁煙時間ではありません。30秒の操作は治療や呼吸測定ではなく、入力情報は保存・送信されません。BreakThreeは医療行為の代替ではありません。強い離脱症状や体調不良がある場合は専門家に相談してください。'
    },
    ar: {
      eyebrow:'الساعات الاثنتان والسبعون الأولى', badge:'مثال تفاعلي خاص بالموقع',
      title:'ليس إلى الأبد. فقط هذه اللحظة.',
      intro:'استكشف الأيام الثلاثة الأولى ساعةً بساعة. وعندما تأتي الرغبة جرّب وقفة هادئة لمدة 30 ثانية.',
      progress:'استكشف الساعات', hour:'ساعة', completed:'اكتمل المثال حتى 72 ساعة',
      day:'اليوم', candle:'اليوم', zero:'نقطة البداية',
      remaining:'الوقت المتبقي في المثال', step:'فكرة لهذه المرحلة',
      chapter1:'أبعد السيجارة التالية عن متناول يدك',
      chapter2:'جهّز فعلًا بديلًا قريبًا منك',
      chapter3:'ركّز على اللحظة الصغيرة التالية',
      chapter4:'اكتملت معاينة الأيام الثلاثة',
      pause:'وقفة هادئة لمدة 30 ثانية', pauseInfo:'خذ لحظة وتنفّس براحة وفق إيقاعك الطبيعي.',
      start:'ابدأ وقفة 30 ثانية', cancel:'إنهاء الوقفة', again:'ابدأ من جديد',
      ready:'ابدأ عندما تكون مستعدًا', running:'الوقفة جارية', finished:'انتهى المثال بعد 30 ثانية',
      unit:'ثانية', reset:'إعادة المثال',
      note:'هذا مثال تفاعلي على الموقع وليس شاشة فعلية من تطبيق BreakThree. الساعات أمثلة تُختار يدويًا وليست مدة الإقلاع الحقيقية. الوقفة ليست علاجًا ولا تقيس التنفس. لا يتم حفظ أي معلومات أو إرسالها. التطبيق لا يحل محل الرعاية الطبية. اطلب المساعدة المختصة عند ظهور أعراض انسحاب شديدة أو الشعور بتوعك.'
    }
  };
  const language = () => {
    const value = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const code = String(value).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(COPY,code) ? code : 'en';
  };
  const fmt = (n) => Number(n).toLocaleString(language()==='ar'?'ar-EG':language()==='ja'?'ja-JP':'en-US');
  function mount() {
    if (!document.body || (document.body.dataset.p199Id!==APP && document.body.dataset.p19AppId!==APP)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-bt80')) return;
    const root = document.createElement('section');
    root.id='tsz-bt80';
    root.dataset.illustration='not-an-app-screen';
    root.setAttribute('aria-label','BreakThree website-only 72-hour illustration');
    root.innerHTML = `<div class="bt80-heading"><span class="bt80-eyebrow" data-copy="eyebrow"></span><span class="bt80-badge" data-copy="badge"></span></div>
    <div class="bt80-main"><div class="bt80-left"><h2 data-copy="title"></h2><p class="bt80-intro" data-copy="intro"></p>
      <div class="bt80-candles" aria-hidden="true">
        <div class="bt80-candle" data-candle="0"><span class="bt80-flame"></span><span class="bt80-wax"></span><small data-candle-label="0"></small></div>
        <div class="bt80-candle" data-candle="1"><span class="bt80-flame"></span><span class="bt80-wax"></span><small data-candle-label="1"></small></div>
        <div class="bt80-candle" data-candle="2"><span class="bt80-flame"></span><span class="bt80-wax"></span><small data-candle-label="2"></small></div>
      </div>
      <div class="bt80-track"><div class="bt80-track-fill" data-out="fill"></div></div>
      <div class="bt80-progress-header"><strong data-out="elapsed"></strong><span data-out="remaining"></span></div>
      <label class="bt80-range-label" for="bt80-hours" data-copy="progress"></label>
      <input id="bt80-hours" type="range" min="0" max="72" step="1" value="0" aria-describedby="bt80-example-note">
      <div class="bt80-range-ends"><span>0h</span><span>24h</span><span>48h</span><span>72h</span></div>
      <div class="bt80-chapter"><span data-copy="step"></span><strong data-out="chapter"></strong></div>
      <button class="bt80-reset" type="button" data-action="reset" data-copy="reset"></button>
    </div>
    <div class="bt80-right"><div class="bt80-pause-symbol" aria-hidden="true"><div class="bt80-pause-ring" data-ring></div><span class="bt80-pause-center">30</span></div>
      <h3 data-copy="pause"></h3><p data-copy="pauseInfo"></p>
      <div class="bt80-countdown" role="timer" aria-label="Seconds remaining" data-out="seconds">30</div>
      <div class="bt80-status" role="status" data-out="status"></div>
      <button class="bt80-cta" type="button" data-action="pause"></button>
    </div></div>
    <p class="bt80-note" id="bt80-example-note" data-copy="note"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    const hoursInput = root.querySelector('#bt80-hours');
    const out = (key,value) => {const n=root.querySelector(`[data-out="${key}"]`);if(n)n.textContent=value;};
    const timerBtn = root.querySelector('[data-action="pause"]');
    const ring = root.querySelector('[data-ring]');
    let remainingSec=30, endTime=0, interval=null, finished=false;
    let lastLanguage=language();
    function renderHours(){
      const t=COPY[language()];
      const h=Number(hoursInput.value);
      root.querySelector('[data-out="fill"]').style.width=`${h/72*100}%`;
      out('elapsed',fmt(h)+' / 72 '+t.hour);
      out('remaining',h===72?t.completed:fmt(72-h)+' '+t.hour);
      const idx=h===72?3:Math.floor(h/24);
      out('chapter',[t.chapter1,t.chapter2,t.chapter3,t.chapter4][idx]);
      root.querySelectorAll('[data-candle]').forEach(node=>{
        const i=Number(node.dataset.candle);
        node.classList.toggle('is-active',h>=i*24 && h<72 && h<(i+1)*24);
        node.classList.toggle('is-done',h>=(i+1)*24);
      });
    }
    function stopTimer(){if(interval!==null){clearInterval(interval);interval=null;}endTime=0;}
    function renderTimer(){
      const t=COPY[language()];
      out('seconds',fmt(remainingSec));
      out('status',interval!==null?t.running:finished?t.finished:t.ready);
      timerBtn.textContent=interval!==null?t.cancel:finished?t.again:t.start;
      ring.style.setProperty('--bt80-progress',String((30-remainingSec)/30*100)+'%');
      root.classList.toggle('bt80-ticking',interval!==null);
    }
    function tick(){
      remainingSec=Math.max(0,Math.ceil((endTime-Date.now())/1000));
      if(remainingSec===0){stopTimer();finished=true;}
      renderTimer();
    }
    function renderLanguage(){
      const t=COPY[language()];
      root.dir=language()==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(node=>{
        if(Object.prototype.hasOwnProperty.call(t,node.dataset.copy))node.textContent=t[node.dataset.copy];
      });
      root.querySelectorAll('[data-candle-label]').forEach((node,i)=>{
        node.textContent=t.day==='日目'?`${i+1}${t.day}`:`${t.day} ${fmt(i+1)}`;
      });
      renderHours();renderTimer();
    }
    hoursInput.addEventListener('input',renderHours);
    root.querySelector('[data-action="reset"]').addEventListener('click',()=>{
      hoursInput.value='0';stopTimer();remainingSec=30;finished=false;renderHours();renderTimer();
    });
    timerBtn.addEventListener('click',()=>{
      if(interval!==null){stopTimer();remainingSec=30;finished=false;renderTimer();return;}
      remainingSec=30;finished=false;endTime=Date.now()+30000;
      interval=setInterval(tick,125);renderTimer();
    });
    document.getElementById('p199-language')?.addEventListener('change',()=>{lastLanguage=language();renderLanguage();});
    new MutationObserver(()=>{
      const current=language();
      if(current!==lastLanguage){lastLanguage=current;renderLanguage();}
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    window.addEventListener('pagehide',stopTimer,{once:true});
    renderLanguage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
