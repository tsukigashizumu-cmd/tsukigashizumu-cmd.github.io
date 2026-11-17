/* R300 Soft Count LP: a temporary, silent visual rhythm illustration. */
(() => {
  'use strict';
  if (document.getElementById('tsz-r300')) return;
  const ID = 'tsz-r300';
  const modes = [
    {id:'natural',s:[4,4,4,4],p:['inhale','hold','exhale','rest']},
    {id:'relaxation',s:[4,7,8],p:['inhale','hold','exhale']},
    {id:'zen',s:[4,6],p:['inhale','exhale']},
    {id:'resonant',s:[5,5],p:['inhale','exhale']},
    {id:'calming',s:[4,8],p:['inhale','exhale']}
  ];
  const L = {
    en:{brow:'SOFT COUNT · SILENT VISUAL BREATHING',title:'Just one minute, at your own rhythm.',intro:'No sound. No pressure to keep up. Choose a rhythm and let the ring quietly guide your next breath.',mode:'CHOOSE A RHYTHM',length:'SESSION LENGTH',names:['Natural','Relaxation','Zen','Resonant','Calming'],min:'min',start:'Start breathing',pause:'Pause',resume:'Continue',reset:'Reset',ready:'READY WHEN YOU ARE',running:'VISUAL GUIDE',paused:'PAUSED',finished:'SESSION COMPLETE',inhale:'Breathe in',hold:'Hold gently',exhale:'Breathe out',rest:'Rest',readyPhase:'At your pace',donePhase:'All done',remaining:'remaining',note:'This is a silent LP illustration. Breathe comfortably; stop if uncomfortable.',disclaimer:'LP-only visual sample. No health assessment, sound, haptics, reminders or saved sessions here. Timing and design may differ from the app.',store:'See Soft Count on the App Store'},
    ja:{brow:'SOFT COUNT · 音のない呼吸ガイド',title:'1分だけ、自分の呼吸に戻る。',intro:'音も、急かす言葉もいらない。リズムを選んで、リングの動きに目を向ける。',mode:'呼吸リズムを選ぶ',length:'セッション時間',names:['Natural','Relaxation','Zen','Resonant','Calming'],min:'分',start:'呼吸を始める',pause:'一時停止',resume:'再開',reset:'最初から',ready:'準備ができたら',running:'静かな視覚ガイド',paused:'一時停止中',finished:'セッション終了',inhale:'吸う',hold:'やさしく保つ',exhale:'吐く',rest:'自然に保つ',readyPhase:'自分のペースで',donePhase:'おつかれさま',remaining:'残り',note:'LP専用の無音デモです。苦しければ無理をせず中止してください。',disclaimer:'このページはLP用の視覚サンプルです。健康判定・触覚・通知・記録保存はありません。実際のアプリの画面・動作とは異なります。',store:'App StoreでSoft Countを見る'},
    ar:{brow:'SOFT COUNT · دليل تنفس بصري هادئ',title:'دقيقة واحدة، بإيقاعك أنت.',intro:'دون صوت أو استعجال. اختر إيقاعاً واتبع حركة الحلقة بهدوء.',mode:'اختر إيقاع التنفس',length:'مدة الجلسة',names:['طبيعي','استرخاء','زن','متناغم','هادئ'],min:'د',start:'ابدأ التنفس',pause:'إيقاف مؤقت',resume:'متابعة',reset:'إعادة',ready:'عندما تكون مستعداً',running:'دليل بصري صامت',paused:'متوقف مؤقتاً',finished:'انتهت الجلسة',inhale:'شهيق',hold:'حبس برفق',exhale:'زفير',rest:'استراحة',readyPhase:'على إيقاعك',donePhase:'انتهيت',remaining:'متبقية',note:'عرض بصري صامت فقط. تنفس براحة وتوقف إذا شعرت بعدم ارتياح.',disclaimer:'هذا نموذج بصري للصفحة فقط. لا يوفر تقييماً صحياً أو أصواتاً أو اهتزازات أو تنبيهات أو تخزيناً. قد تختلف التفاصيل عن التطبيق.',store:'شاهد Soft Count في App Store'}
  };
  const p = new URLSearchParams(location.search);
  const guess=(p.get('r300lang')||p.get('lang')||document.documentElement.lang||'en').toLowerCase();
  const state={lang:guess.startsWith('ar')?'ar':guess.startsWith('ja')?'ja':'en',country:(p.get('r300country')||p.get('country')||'us').toLowerCase()==='jp'?'jp':'us',mode:'natural',minutes:1,elapsed:0,phaseElapsed:0,phaseIndex:0,running:false,complete:false,last:0,handle:null};
  const mount=document.createElement('section');mount.id=ID;
  mount.setAttribute('aria-label','Soft Count silent visual breathing demonstration');
  mount.innerHTML=`<div class="r300-shell"><div class="r300-header"><span class="r300-eyebrow" id="r300-brow"></span><div class="r300-selects"><select id="r300-language" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select><select id="r300-country" aria-label="App Store region"><option value="us">US App Store</option><option value="jp">JP App Store</option></select></div></div><div class="r300-columns"><div class="r300-copy"><h2 class="r300-title" id="r300-title"></h2><p class="r300-intro" id="r300-intro"></p><label class="r300-label" id="r300-mode-label"></label><div class="r300-modes" id="r300-modes" role="group" aria-label="Breathing rhythm"></div><label class="r300-label" id="r300-length-label"></label><div class="r300-lengths" id="r300-lengths" role="group" aria-label="Session length"></div><div class="r300-actions"><button type="button" id="r300-toggle" class="r300-mainbtn"></button><button type="button" id="r300-reset" class="r300-secondary"></button></div></div><div class="r300-stage"><span class="r300-status" id="r300-status"></span><div class="r300-ring" id="r300-ring"><div class="r300-ringcore" role="status" aria-live="off"><span class="r300-phase" id="r300-phase"></span><span class="r300-seconds" id="r300-seconds">4</span></div></div><div class="r300-remaining"><span id="r300-remaining-label"></span> <strong id="r300-remaining" dir="ltr">01:00</strong></div><div class="r300-bar"><div class="r300-fill" id="r300-fill"></div></div><p class="r300-note" id="r300-note"></p></div></div><div class="r300-footer"><p class="r300-disclaimer" id="r300-disclaimer"></p><a class="r300-store" id="r300-store" rel="noopener noreferrer" target="_blank"></a></div></div>`;
  const target=document.querySelector('.p19-footer');
  if(target)target.parentNode.insertBefore(mount,target);
  else (document.querySelector('.p19-shell')||document.body).appendChild(mount);
  const $=id=>mount.querySelector('#'+id);
  const text=(id,val)=>{$(id).textContent=val;};
  const currentMode=()=>modes.find(m=>m.id===state.mode)||modes[0];
  const time=(secs)=>`${String(Math.floor(secs/60)).padStart(2,'0')}:${String(Math.floor(secs%60)).padStart(2,'0')}`;
  const total=()=>state.minutes*60;
  function renderSelectors(){
    const t=L[state.lang];
    const zone=$('r300-modes');zone.replaceChildren();
    modes.forEach((m,i)=>{
      const b=document.createElement('button');b.type='button';b.className='r300-mode';b.dataset.active=String(m.id===state.mode);b.setAttribute('aria-pressed',String(m.id===state.mode));
      const title=document.createElement('strong');title.textContent=t.names[i];
      const sub=document.createElement('small');sub.textContent=m.s.join(' · ');
      b.append(title,sub);b.addEventListener('click',()=>{
        state.mode=m.id;state.phaseIndex=0;state.phaseElapsed=0;
        // Session elapsed is intentionally retained when changing rhythm.
        renderSelectors();renderClock();
      });zone.appendChild(b);
    });
    const lengths=$('r300-lengths');lengths.replaceChildren();
    [1,3,5,10].forEach(n=>{
      const b=document.createElement('button');b.type='button';b.className='r300-length';b.dataset.active=String(n===state.minutes);b.setAttribute('aria-pressed',String(n===state.minutes));b.textContent=n+' '+t.min;
      b.addEventListener('click',()=>{state.minutes=n;restart();renderSelectors();renderClock();});lengths.appendChild(b);
    });
  }
  function renderClock(){
    const t=L[state.lang],mode=currentMode(),duration=mode.s[state.phaseIndex],ratio=Math.min(1,Math.max(0,state.phaseElapsed/duration));
    const phase=mode.p[state.phaseIndex];
    const active=state.running||state.elapsed>0;
    text('r300-status',state.complete?t.finished:state.running?t.running:active?t.paused:t.ready);
    text('r300-phase',state.complete?t.donePhase:active?t[phase]:t.readyPhase);
    text('r300-seconds',state.complete?'✓':String(Math.max(1,Math.ceil(duration-state.phaseElapsed))));
    text('r300-remaining',time(Math.max(0,total()-state.elapsed)));
    $('r300-fill').style.width=Math.max(0,Math.min(100,state.elapsed/total()*100))+'%';
    const scale=state.complete?.82:phase==='inhale'?.79+ratio*.19:phase==='hold'?.98:phase==='exhale'?.98-ratio*.19:.79;
    const ring=$('r300-ring');ring.style.setProperty('--r300-scale',String(scale));ring.style.setProperty('--r300-progress',(ratio*100)+'%');
    ring.style.setProperty('--r300-phase',phase==='inhale'?'#87edc7':phase==='exhale'?'#8bbde9':phase==='hold'?'#d4c4e6':'#c4d6c4');
    text('r300-toggle',state.running?t.pause:state.complete?t.start:state.elapsed>0?t.resume:t.start);
    text('r300-reset',t.reset);
  }
  function updateLanguage(){
    const t=L[state.lang];mount.lang=state.lang;mount.dir=state.lang==='ar'?'rtl':'ltr';
    $('r300-language').value=state.lang;$('r300-country').value=state.country;
    for(const [id,key] of [['r300-brow','brow'],['r300-title','title'],['r300-intro','intro'],['r300-mode-label','mode'],['r300-length-label','length'],['r300-remaining-label','remaining'],['r300-note','note'],['r300-disclaimer','disclaimer'],['r300-store','store']])text(id,t[key]);
    $('r300-store').href=`https://apps.apple.com/${state.country}/app/id6768180849`;
    renderSelectors();renderClock();
  }
  function pause(){state.running=false;state.last=0;if(state.handle!==null){clearInterval(state.handle);state.handle=null;}}
  function restart(){pause();state.elapsed=0;state.phaseIndex=0;state.phaseElapsed=0;state.complete=false;}
  function tick(){if(!state.running)return;const now=performance.now();let dt=Math.min(0.15,Math.max(0,(now-state.last)/1000));state.last=now;
    state.elapsed=Math.min(total(),state.elapsed+dt);
    let mode=currentMode();state.phaseElapsed+=dt;
    while(state.phaseElapsed>=mode.s[state.phaseIndex]){state.phaseElapsed-=mode.s[state.phaseIndex];state.phaseIndex=(state.phaseIndex+1)%mode.s.length;}
    if(state.elapsed>=total()){pause();state.complete=true;state.phaseElapsed=0;}
    renderClock();
  }
  $('r300-toggle').addEventListener('click',()=>{
    if(state.running){pause();renderClock();return;}
    if(state.complete)restart();
    state.running=true;state.last=performance.now();state.handle=setInterval(tick,80);renderClock();
  });
  $('r300-reset').addEventListener('click',()=>{restart();renderClock();});
  $('r300-language').addEventListener('change',e=>{state.lang=e.target.value;updateLanguage();});
  $('r300-country').addEventListener('change',e=>{state.country=e.target.value;updateLanguage();});
  updateLanguage();
  window.addEventListener('pagehide',pause,{once:true});
})();
