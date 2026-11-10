/* TSZ LP R122 — Soft Count: website-only educational snapshot of mid-session rhythm switching.
 * No actual breath pacing, health outcome claims, cookies, storage, network or app API. */
(() => {
  'use strict';
  const APP_ID = '6768180849';
  const MODES = Object.freeze({
    natural: [{phase:'inhale',seconds:4},{phase:'hold',seconds:4},{phase:'exhale',seconds:4},{phase:'hold',seconds:4}],
    relaxation: [{phase:'inhale',seconds:4},{phase:'hold',seconds:7},{phase:'exhale',seconds:8}],
    zen: [{phase:'inhale',seconds:4},{phase:'exhale',seconds:6}],
    resonant: [{phase:'inhale',seconds:5},{phase:'exhale',seconds:5}],
    calming: [{phase:'inhale',seconds:4},{phase:'exhale',seconds:8}]
  });
  const LABELS = {
    en: {eyebrow:'BREATHE AT YOUR OWN RHYTHM',badge:'INTERACTIVE LP EXAMPLE',title:'Change the rhythm. Keep the time you’ve already taken.',lead:'Switch between the five breathing patterns during this simulated session. The remaining time and progress stay put. Explore the idea at your own pace.',current:'SESSION SNAPSHOT',remain:'Remaining time',progress:'Session completed',phase:'Current phase',select:'CHOOSE A RHYTHM',natural:'Natural',relaxation:'Relaxation',zen:'Zen',resonant:'Resonant',calming:'Calming',step:'Advance 10 seconds',reset:'Reset example',proof:'Your session time is preserved',proofBody:'Choosing a different pattern does not restart the simulated three-minute session.',complete:'Illustration complete',completeBody:'Reset to explore the five patterns again.',inhale:'Inhale',hold:'Hold',exhale:'Exhale',note:'Website-only demonstration of the concept, not the actual app interface or a live breathing guide. The +10s control moves an example clock; it does not count real time. Never force or prolong your breathing. Nothing is saved or sent.'},
    ja: {eyebrow:'呼吸は、自分のリズムで',badge:'LP専用・操作デモ',title:'途中でリズムを変えても、時間は消えない。',lead:'呼吸の途中で5種類のリズムを切り替えてみてください。残り時間とセッションの進捗はそのまま。自分のペースで試せます。',current:'セッションの状態',remain:'残り時間',progress:'進行済み',phase:'いまのフェーズ',select:'呼吸リズムを選ぶ',natural:'Natural',relaxation:'Relaxation',zen:'Zen',resonant:'Resonant',calming:'Calming',step:'10秒進める',reset:'初期値に戻す',proof:'切り替えても時間を引き継ぐ',proofBody:'呼吸パターンを選び直しても、3分セッションの残り時間はリセットされません。',complete:'説明用セッションが終了',completeBody:'初期値に戻して、別のリズムも試してください。',inhale:'吸う',hold:'止める',exhale:'吐く',note:'これはLP専用の概念デモで、アプリの実画面や実際の呼吸ガイドではありません。「10秒進める」は説明用の時計操作です。無理に呼吸を止めたり長くしたりしないでください。入力の保存・送信はありません。'},
    ar: {eyebrow:'تنفّس بإيقاعك الخاص',badge:'تجربة تفاعلية للموقع',title:'غيّر الإيقاع. واحتفظ بالوقت الذي أمضيته.',lead:'بدّل بين خمسة أنماط تنفّس في هذه الجلسة التوضيحية. يبقى الوقت المتبقي والتقدّم كما هما. جرّب على راحتك.',current:'حالة الجلسة',remain:'الوقت المتبقي',progress:'التقدّم',phase:'المرحلة الحالية',select:'اختر نمط التنفّس',natural:'طبيعي',relaxation:'استرخاء',zen:'زن',resonant:'متناغم',calming:'مهدّئ',step:'تقدّم 10 ثوانٍ',reset:'إعادة المثال',proof:'الوقت محفوظ عند التغيير',proofBody:'تغيير النمط لا يعيد الجلسة التوضيحية ذات الثلاث دقائق إلى البداية.',complete:'انتهى المثال',completeBody:'أعِد المثال لاختبار نمط آخر.',inhale:'شهيق',hold:'حبس',exhale:'زفير',note:'توضيح تفاعلي على الموقع فقط، وليس واجهة التطبيق الحقيقية أو إرشاداً مباشراً للتنفّس. زر العشر ثوانٍ يقدّم ساعة افتراضية ولا يقيس الوقت الحقيقي. لا تُجبر نفسك على حبس النَفَس أو إطالته. لا تُحفظ البيانات ولا تُرسل.'}
  };
  const fmtSeconds = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  function activeLang(){
    const select=document.getElementById('p199-language');
    const val=select?.value || document.documentElement.lang || 'en';
    const lang=String(val).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(LABELS,lang) ? lang : 'en';
  }
  function mount(){
    const body=document.body;
    if (!body || document.getElementById('tsz-sc122')) return;
    const pageId=body.dataset.p199Id || body.dataset.p19AppId || '';
    if (pageId && pageId!==APP_ID) return;
    if (!pageId && !document.querySelector(`a[href*="${APP_ID}"]`)) return;
    const anchor=document.getElementById('tsz-sc84') || document.getElementById('overview');
    const main=document.querySelector('main');
    if (!anchor && !main) return;
    const root=document.createElement('section');
    root.id='tsz-sc122';
    root.dataset.illustration='website-only-not-live-breathing-guide';
    root.setAttribute('aria-label','Mid-session breathing rhythm switch demo');
    root.innerHTML=`
      <div class="sc122-meta"><span data-i="eyebrow"></span><span data-i="badge"></span></div>
      <div class="sc122-intro"><h2 data-i="title"></h2><p data-i="lead"></p></div>
      <div class="sc122-layout">
        <div class="sc122-panel preview" aria-label="Illustrative session snapshot"><div class="sc122-label" data-i="current"></div>
          <div class="sc122-ring"><div class="sc122-ringinner"><strong data-out="remaining"></strong><span data-i="remain"></span></div></div>
          <div><div class="sc122-previewbottom"><div><small data-i="phase"></small><strong data-out="phase"></strong></div><div><small data-i="progress"></small><strong data-out="progress"></strong></div></div><div class="sc122-progress-track"><div class="sc122-progress-fill"></div></div></div>
        </div>
        <div class="sc122-panel"><div class="sc122-label" data-i="select"></div><div class="sc122-modegrid" role="group" aria-label="Breathing patterns">
          <button type="button" data-mode="natural" aria-pressed="true"><strong data-i="natural"></strong><small>4–4–4–4</small></button>
          <button type="button" data-mode="relaxation" aria-pressed="false"><strong data-i="relaxation"></strong><small>4–7–8</small></button>
          <button type="button" data-mode="zen" aria-pressed="false"><strong data-i="zen"></strong><small>4–6</small></button>
          <button type="button" data-mode="resonant" aria-pressed="false"><strong data-i="resonant"></strong><small>5–5</small></button>
          <button type="button" data-mode="calming" aria-pressed="false"><strong data-i="calming"></strong><small>4–8</small></button>
        </div><div class="sc122-controls"><button type="button" data-step data-i="step"></button><button type="button" data-reset data-i="reset"></button></div><div class="sc122-result" role="status" aria-live="polite"><strong data-out="proofTitle"></strong><p data-out="proofBody"></p></div></div>
      </div><p class="sc122-footnote" data-i="note"></p>`;
    if (anchor) anchor.insertAdjacentElement('afterend',root); else main.appendChild(root);
    const out=(name,val)=>root.querySelector(`[data-out="${name}"]`).textContent=val;
    let mode='natural', elapsed=48, prevLang='';
    const duration=180;
    function translate(){
      const lang=activeLang(), t=LABELS[lang];
      root.lang=lang;
      root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-i]').forEach(node=>{node.textContent=t[node.dataset.i];});
      prevLang=lang;
    }
    function phaseAt(pattern,seconds){
      const cycle=pattern.reduce((a,x)=>a+x.seconds,0);
      let pos=seconds%cycle;
      for(const part of pattern){if(pos<part.seconds) return {kind:part.phase,percentage:pos/part.seconds};pos-=part.seconds;}
      return {kind:'inhale',percentage:0};
    }
    function render(){
      translate();
      const t=LABELS[activeLang()], remaining=Math.max(0,duration-elapsed);
      const phase=phaseAt(MODES[mode],elapsed);
      const percent=Math.round(elapsed/duration*100);
      out('remaining',fmtSeconds(remaining));
      out('progress',percent+'%');
      out('phase',remaining===0?'—':t[phase.kind]);
      root.querySelector('.sc122-progress-fill').style.width=percent+'%';
      root.querySelector('.sc122-ring').style.setProperty('--pct',(remaining===0?100:Math.max(4,phase.percentage*100))+'%');
      root.querySelector('.sc122-ring').style.setProperty('--ringcolor',phase.kind==='inhale'?'#8dd7c5':phase.kind==='exhale'?'#a4c2ed':'#ecc9a0');
      root.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
      out('proofTitle',remaining===0?t.complete:t.proof);
      out('proofBody',remaining===0?t.completeBody:t.proofBody);
    }
    root.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;render();}));
    root.querySelector('[data-step]').addEventListener('click',()=>{elapsed=Math.min(duration,elapsed+10);render();});
    root.querySelector('[data-reset]').addEventListener('click',()=>{mode='natural';elapsed=48;render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(activeLang()!==prevLang)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
