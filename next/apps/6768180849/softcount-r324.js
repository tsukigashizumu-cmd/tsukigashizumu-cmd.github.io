/* TSZ LP R324: Soft Count interactive visual preview. No persistence, network or audio. */
(() => {
  'use strict';
  const ROOT='sc324';
  if(document.getElementById(ROOT)) return;
  const modes=[
    {id:'natural',steps:[['inhale',4],['hold',4],['exhale',4],['hold',4]]},
    {id:'relax',steps:[['inhale',4],['hold',7],['exhale',8]]},
    {id:'zen',steps:[['inhale',4],['exhale',6]]},
    {id:'resonant',steps:[['inhale',5],['exhale',5]]},
    {id:'calming',steps:[['inhale',4],['exhale',8]]}
  ];
  const strings={
    en:{kicker:'A MOMENT WITHOUT THE NOISE', title:'Your breath does not need another notification.',intro:'No sound. No ads. Just a visual rhythm that you can make your own. Choose a pace and watch a quiet, live illustration.',introTag:'INTERACTIVE PREVIEW · NOT A SESSION RECORD',rhythm:'Choose your rhythm',modeNames:['Natural','Relaxation','Zen','Resonant','Calming'],modeSub:['4–4–4–4','4–7–8','4–6','5–5','4–8'],duration:'Session length',minutes:'min',display:'On-screen guidance',showTimer:'Center time',showProgress:'Progress line',showPhase:'Phase label',start:'Start preview',pause:'Pause',resume:'Resume',restart:'Restart',inhale:'Inhale',hold:'Hold',exhale:'Exhale',ready:'Ready to begin',finished:'Session complete',remaining:'Remaining',elapsed:'Elapsed',disclaimer:'This is a silent, local demonstration of the visual breathing rhythm. It saves nothing, emits no audio and gives no medical advice. Choose a comfortable pace; stop if you feel unwell.',source:'Five breathing modes and flexible screen controls are features of the Soft Count app.',step:'SECONDS IN PHASE',now:'CURRENT PHASE'},
    ja:{kicker:'音のない、ひととき',title:'呼吸に、もうひとつの通知はいらない。',intro:'音も広告もない。画面のリズムだけを、自分に合う形で。好きなテンポを選んで、静かな体験を試せます。',introTag:'操作できる体験例 · 記録は保存しません',rhythm:'呼吸リズムを選ぶ',modeNames:['Natural','Relaxation','Zen','Resonant','Calming'],modeSub:['4–4–4–4','4–7–8','4–6','5–5','4–8'],duration:'セッション時間',minutes:'分',display:'画面上の案内',showTimer:'中央の秒数',showProgress:'進行ライン',showPhase:'呼吸フェーズ',start:'体験を開始',pause:'一時停止',resume:'再開する',restart:'最初から',inhale:'吸う',hold:'止める',exhale:'吐く',ready:'開始できます',finished:'体験が終了しました',remaining:'残り時間',elapsed:'経過',disclaimer:'このページは呼吸の視覚リズムを示す無音・端末内の説明用デモです。記録は残らず、医療上の助言ではありません。無理のないペースを選び、不調を感じたら中止してください。',source:'Soft Count本体には5つの呼吸モードと画面表示の個別設定があります。',step:'フェーズの残り秒数',now:'現在のフェーズ'},
    ar:{kicker:'لحظة هادئة بلا ضجيج',title:'تنفّسك لا يحتاج إلى إشعار آخر.',intro:'بلا صوت وبلا إعلانات. اختر إيقاعاً مريحاً وتابع الإرشاد البصري الهادئ بالطريقة التي تناسبك.',introTag:'عرض تفاعلي · لا يحفظ الجلسات',rhythm:'اختر إيقاع التنفس',modeNames:['طبيعي','استرخاء','زن','متناغم','هادئ'],modeSub:['4–4–4–4','4–7–8','4–6','5–5','4–8'],duration:'مدة الجلسة',minutes:'د',display:'الإرشاد على الشاشة',showTimer:'الوقت في الوسط',showProgress:'شريط التقدم',showPhase:'اسم المرحلة',start:'ابدأ التجربة',pause:'إيقاف مؤقت',resume:'متابعة',restart:'إعادة البدء',inhale:'شهيق',hold:'حبس النفس',exhale:'زفير',ready:'جاهز للبدء',finished:'اكتملت الجلسة',remaining:'الوقت المتبقي',elapsed:'الوقت المنقضي',disclaimer:'هذا عرض بصري صامت ومحلي للإيقاع، وليس سجلاً لجلسة تنفس. لا يخزن بيانات ولا يقدم نصائح طبية. اختر ما يناسب راحتك وتوقف إذا شعرت بتوعك.',source:'يتضمن تطبيق Soft Count خمسة أنماط تنفس وخيارات لعرض الإرشادات.',step:'الثواني المتبقية',now:'المرحلة الحالية'}
  };
  let lang='en',mode=0,minutes=1,elapsed=0,running=false,lastTick=0,finished=false;
  const shown={timer:true,progress:true,phase:true};
  const root=document.createElement('section');root.id=ROOT;root.setAttribute('aria-label','Soft Count breathing rhythm demo');
  root.innerHTML=`
  <div class="sc-wrap">
   <div class="sc-header"><div><p class="sc-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="sc-intro" data-t="intro"></p></div><div class="sc-langs" role="group" aria-label="Demo language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div>
   <div class="sc-body">
    <div class="sc-visual"><div class="sc-visual-top"><span data-t="introTag"></span><span class="sc-modeid" data-modeid>4–4–4–4</span></div>
     <div class="sc-orb-stage"><div class="sc-orb-outer"><div class="sc-orb-aura" aria-hidden="true"></div><div class="sc-orb" aria-hidden="true"><div class="sc-orb-inner"></div></div>
      <div class="sc-orb-copy"><span class="sc-orb-mini" data-t="now"></span><strong data-phase>Ready</strong><span data-step>4s</span></div></div></div>
     <div class="sc-footline"><div class="sc-time"><span data-t="remaining"></span><strong data-remaining>01:00</strong></div><div class="sc-time sc-align-end"><span data-t="elapsed"></span><strong data-elapsed>00:00</strong></div></div>
     <div class="sc-progress" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span data-progress></span></div>
    </div>
    <div class="sc-controls">
     <p class="sc-label" data-t="rhythm"></p><div class="sc-modes" role="group" aria-label="Breathing modes"></div>
     <p class="sc-label sc-gap" data-t="duration"></p><div class="sc-lengths" role="group" aria-label="Session length"></div>
     <p class="sc-label sc-gap" data-t="display"></p><div class="sc-options" role="group" aria-label="Display options"><label><input type="checkbox" data-show="timer" checked><span data-t="showTimer"></span></label><label><input type="checkbox" data-show="progress" checked><span data-t="showProgress"></span></label><label><input type="checkbox" data-show="phase" checked><span data-t="showPhase"></span></label></div>
     <div class="sc-actions"><button type="button" class="sc-play" data-action="toggle"><span data-play>Start preview</span></button><button type="button" class="sc-restart" data-action="restart" data-t="restart"></button></div>
     <p class="sc-hint" data-t="source"></p>
    </div>
   </div>
   <p class="sc-disclaimer" data-t="disclaimer"></p>
  </div>`;
  const anchor=document.querySelector('#related');
  if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(root,anchor);
  else (document.querySelector('#overview')||document.querySelector('main')||document.body).appendChild(root);
  const one=s=>root.querySelector(s),all=s=>Array.from(root.querySelectorAll(s));
  const t=()=>strings[lang];
  const num=(n)=>String(Math.max(0,Math.floor(n))).padStart(2,'0');
  const clock=s=>num(s/60)+':'+num(s%60);
  const modeButtons=one('.sc-modes'),lengthButtons=one('.sc-lengths');
  for(let i=0;i<modes.length;i++){const b=document.createElement('button');b.type='button';b.dataset.mode=String(i);b.innerHTML='<strong></strong><small></small>';modeButtons.appendChild(b);}
  for(const m of [1,3,5,10]){const b=document.createElement('button');b.type='button';b.dataset.minutes=String(m);lengthButtons.appendChild(b);}
  function phases(){const steps=modes[mode].steps;const total=steps.reduce((a,v)=>a+v[1],0);let p=elapsed%total;for(const [kind,duration] of steps){if(p<duration)return{kind,seconds:duration-p,fraction:p/duration,duration};p-=duration;}return{kind:'inhale',seconds:4,fraction:0,duration:4};}
  function render(){
    root.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    all('[data-t]').forEach(n=>n.textContent=t()[n.dataset.t]);
    all('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===lang)));
    all('[data-mode]').forEach(n=>{const i=Number(n.dataset.mode);n.setAttribute('aria-pressed',String(i===mode));n.querySelector('strong').textContent=t().modeNames[i];n.querySelector('small').textContent=t().modeSub[i];});
    all('[data-minutes]').forEach(n=>{n.textContent=n.dataset.minutes+' '+t().minutes;n.setAttribute('aria-pressed',String(Number(n.dataset.minutes)===minutes));});
    one('[data-modeid]').textContent=t().modeSub[mode];
    const total=minutes*60;const current=Math.min(total,elapsed);const p=phases();
    one('[data-remaining]').textContent=clock(Math.ceil(total-current));
    one('[data-elapsed]').textContent=clock(Math.floor(current));
    const phaseName=finished?t().finished:(!running && elapsed===0)?t().ready:t()[p.kind];
    one('[data-phase]').textContent=phaseName;
    one('[data-step]').textContent=finished?'—':Math.ceil(p.seconds)+'s';
    one('[data-play]').textContent=running?t().pause:(finished?t().restart:elapsed>0?t().resume:t().start);
    const pct=Math.min(100,Math.max(0,current/total*100));
    one('.sc-progress').setAttribute('aria-valuenow',String(Math.round(pct)));
    one('[data-progress]').style.width=pct+'%';
    const phaseStyles={inhale:['#b9d9e0','#79d4bb'],hold:['#d1c1ea','#cbb2d9'],exhale:['#b0d5b6','#9ad7bd']};
    const style=phaseStyles[p.kind];root.style.setProperty('--sc-accent',style[0]);root.style.setProperty('--sc-accent2',style[1]);
    const scale=p.kind==='inhale'?.82+.23*p.fraction:p.kind==='exhale'?1.05-.23*p.fraction:1.05;
    one('.sc-orb').style.transform='scale('+scale.toFixed(3)+')';
    one('.sc-orb-aura').style.transform='scale('+(scale*1.08).toFixed(3)+')';
    one('[data-step]').style.display=shown.timer?'':'none';
    one('.sc-progress').style.display=shown.progress?'block':'none';
    one('[data-phase]').style.visibility=shown.phase?'visible':'hidden';
    one('.sc-orb-mini').style.visibility=shown.phase?'visible':'hidden';
    all('[data-show]').forEach(n=>n.checked=shown[n.dataset.show]);
  }
  function sync(){if(!running)return;const now=performance.now();const delta=Math.max(0,Math.min(1,(now-lastTick)/1000));lastTick=now;elapsed=Math.min(minutes*60,elapsed+delta);if(elapsed>=minutes*60){running=false;finished=true;}render();}
  let interval=null;
  function tick(){sync();}
  function play(){if(finished){elapsed=0;finished=false;}running=true;lastTick=performance.now();if(!interval)interval=setInterval(tick,100);render();}
  function pause(){sync();running=false;render();}
  function reset(){running=false;elapsed=0;finished=false;render();}
  all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{sync();lang=b.dataset.lang;render();}));
  all('[data-mode]').forEach(b=>b.addEventListener('click',()=>{sync();mode=Number(b.dataset.mode);render();}));
  all('[data-minutes]').forEach(b=>b.addEventListener('click',()=>{sync();minutes=Number(b.dataset.minutes);if(elapsed>=minutes*60){elapsed=minutes*60;running=false;finished=true;}else finished=false;render();}));
  all('[data-show]').forEach(b=>b.addEventListener('change',()=>{shown[b.dataset.show]=b.checked;render();}));
  one('[data-action="toggle"]').addEventListener('click',()=>{if(running)pause();else play();});
  one('[data-action="restart"]').addEventListener('click',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden && running)pause();});
  render();
})();
