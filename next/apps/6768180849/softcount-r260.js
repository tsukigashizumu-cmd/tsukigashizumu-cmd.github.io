/* TSZ R260 Soft Count: visual-only sample breathing guide, no saved data, no network. */
(()=>{'use strict';
const ID='tsz-r260-root';
const LANG={
 en:{eyebrow:'SOFT COUNT  /  A QUIETER MINUTE',hero:'You set the pace. The screen follows.',intro:'No voice, no score, no pressure. Pick a gentle rhythm and follow the light for a moment.',language:'Language',region:'Store region',session:'SESSION',minute:'min',one:'1 minute',three:'3 minutes',five:'5 minutes',choose:'CHOOSE YOUR RHYTHM',modes:'Five ways to begin. None is a goal.',natural:'Natural',relax:'Relaxation',zen:'Zen',resonant:'Resonant',calming:'Calming',sublabel:'THE BREATHING GUIDE',ready:'Ready when you are',inhale:'Breathe in',hold:'Hold',exhale:'Breathe out',go:'Begin quietly',pause:'Pause',resume:'Continue',reset:'Reset',phase:'Current phase',clock:'Session left',current:'CURRENT RHYTHM',options:'VIEW OPTIONS',showTimer:'Center timer',showRing:'Progress ring',showLabels:'Phase labels',notice:'Illustrative LP demo. The light is a visual timing guide, not a medical device. Breathe at a pace that feels comfortable; stop if you feel unwell. No sound, accounts, storage, tracking or notifications.',store:'See Soft Count on the App Store',complete:'Session complete',step:'seconds',sec:'s'},
 ja:{eyebrow:'SOFT COUNT  /  静かなひととき',hero:'呼吸は、自分のリズムで。',intro:'音も、点数も、急かすものもいらない。心地よいリズムを選んで、光の変化に少しだけ目を向ける。',language:'言語',region:'ストア地域',session:'セッション',minute:'分',one:'1分',three:'3分',five:'5分',choose:'呼吸リズム',modes:'5種類のリズムから、いまの自分に合うものを。',natural:'ナチュラル',relax:'リラックス',zen:'禅',resonant:'レゾナント',calming:'カーミング',sublabel:'呼吸のガイド',ready:'あなたのタイミングで',inhale:'吸う',hold:'止める',exhale:'吐く',go:'静かに始める',pause:'一時停止',resume:'再開',reset:'最初に戻す',phase:'いまのフェーズ',clock:'残り時間',current:'選択中のリズム',options:'表示するもの',showTimer:'中央のタイマー',showRing:'進行リング',showLabels:'フェーズ表示',notice:'LP専用の体験用デモです。光は時間を示すガイドで、医療機器ではありません。苦しくない自然なペースで行い、違和感があれば中止してください。音・保存・アカウント・追跡・通知はありません。',store:'App StoreでSoft Countを見る',complete:'セッション完了',step:'秒',sec:'秒'},
 ar:{eyebrow:'SOFT COUNT  /  لحظة هادئة',hero:'اختر إيقاعك، ودع الضوء يتبعه.',intro:'لا صوت ولا نقاط ولا ضغط. اختر إيقاع تنفس مريحاً وتابع الضوء للحظات.',language:'اللغة',region:'منطقة المتجر',session:'الجلسة',minute:'د',one:'دقيقة',three:'3 دقائق',five:'5 دقائق',choose:'اختر الإيقاع',modes:'خمسة إيقاعات لطيفة. لا يوجد هدف يجب بلوغه.',natural:'طبيعي',relax:'استرخاء',zen:'زن',resonant:'متناغم',calming:'مهدئ',sublabel:'دليل التنفس البصري',ready:'عندما تكون مستعداً',inhale:'شهيق',hold:'حبس النفس',exhale:'زفير',go:'ابدأ بهدوء',pause:'إيقاف مؤقت',resume:'متابعة',reset:'إعادة البدء',phase:'المرحلة الحالية',clock:'الوقت المتبقي',current:'الإيقاع المحدد',options:'خيارات العرض',showTimer:'مؤقت الوسط',showRing:'حلقة التقدم',showLabels:'تسمية المراحل',notice:'تجربة توضيحية للصفحة فقط. الضوء إرشاد بصري وليس جهازاً طبياً. تنفس بوتيرة مريحة وتوقف إذا شعرت بتعب. بلا صوت أو تخزين أو حسابات أو تتبع أو إشعارات.',store:'شاهد Soft Count على App Store',complete:'اكتملت الجلسة',step:'ثانية',sec:'ث'}
};
const MODES=[{id:'natural',seq:[['inhale',4],['hold',4],['exhale',4],['hold',4]],desc:'4 · 4 · 4 · 4'},
{id:'relax',seq:[['inhale',4],['hold',7],['exhale',8]],desc:'4 · 7 · 8'},
{id:'zen',seq:[['inhale',4],['exhale',6]],desc:'4 · 6'},
{id:'resonant',seq:[['inhale',5],['exhale',5]],desc:'5 · 5'},
{id:'calming',seq:[['inhale',4],['exhale',8]],desc:'4 · 8'}];
function boot(){
 if(document.getElementById(ID))return;
 const host=document.querySelector('#p199-content .p199-body')||document.querySelector('.p199-body');
 let root;
 if(host){root=document.createElement('section');root.id=ID;root.className='tsz-r260';host.insertBefore(root,host.querySelector('#related')||null)}
 else{root=document.querySelector('[data-r260-standalone]');if(!root)return;root.id=ID;root.classList.add('tsz-r260')}
 const args=new URLSearchParams(location.search), state={lang:LANG[args.get('lang')]?args.get('lang'):'en',region:args.get('region')==='jp'?'jp':'us',mode:'natural',duration:60,elapsed:0,running:false,lastTime:0,interval:null,showTimer:true,showRing:true,showLabels:true};
 root.innerHTML=`<div class="sc-shell"><header class="sc-header"><div><p class="sc-eyebrow" data-sc="eyebrow"></p><h2 data-sc="hero"></h2><p class="sc-intro" data-sc="intro"></p></div><div class="sc-locale"><label><span data-sc="language"></span><select id="sc260-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-sc="region"></span><select id="sc260-region" aria-label="Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div></header><div class="sc-main"><section class="sc-visual"><div class="sc-visual-top"><span class="sc-kicker" data-sc="sublabel"></span><span id="sc260-clock" class="sc-left">01:00</span></div><div class="sc-orb-stage"><div class="sc-stars" aria-hidden="true"></div><div class="sc-ring-wrap" id="sc260-ring-wrap"><svg viewBox="0 0 320 320" aria-hidden="true"><circle class="sc-track" cx="160" cy="160" r="145"/><circle class="sc-progress" id="sc260-ring" cx="160" cy="160" r="145"/></svg></div><div class="sc-orb" id="sc260-orb" aria-hidden="true"><div class="sc-orb-core"></div></div><div class="sc-orb-readout"><span id="sc260-phase" class="sc-phase" role="status">Ready when you are</span><strong id="sc260-seconds" class="sc-seconds">4</strong><span id="sc260-phaseunit" class="sc-phase-unit" data-sc="sec"></span></div></div><div class="sc-controls"><button type="button" id="sc260-run" class="sc-start" data-sc="go"></button><button type="button" id="sc260-reset" class="sc-reset" data-sc="reset"></button></div><div id="sc260-status" class="sc-status" role="status" aria-live="polite"></div></section><section class="sc-settings"><p class="sc-kicker" data-sc="choose"></p><h3 data-sc="modes"></h3><div class="sc-modes" id="sc260-modes" role="group" aria-label="Breathing rhythms"></div><div class="sc-subpanel"><p class="sc-kicker" data-sc="session"></p><div class="sc-duration" role="group" aria-label="Session duration"><button type="button" data-duration="60" data-sc="one"></button><button type="button" data-duration="180" data-sc="three"></button><button type="button" data-duration="300" data-sc="five"></button></div></div><div class="sc-subpanel"><p class="sc-kicker" data-sc="options"></p><div class="sc-toggles"><label><input type="checkbox" id="sc260-timer" checked><span data-sc="showTimer"></span></label><label><input type="checkbox" id="sc260-ring-toggle" checked><span data-sc="showRing"></span></label><label><input type="checkbox" id="sc260-labels" checked><span data-sc="showLabels"></span></label></div></div></section></div><footer class="sc-footer"><p data-sc="notice"></p><a id="sc260-store" href="https://apps.apple.com/us/app/soft-count/id6768180849" target="_blank" rel="noopener noreferrer" data-sc="store"></a></footer></div>`;
 const $=id=>root.querySelector('#'+id), all=q=>Array.from(root.querySelectorAll(q)),tr=()=>LANG[state.lang];
 MODES.forEach(mode=>{const button=document.createElement('button');button.type='button';button.dataset.mode=mode.id;button.className='sc-mode';button.innerHTML=`<span class="sc-mode-dot" aria-hidden="true"></span><span class="sc-mode-name"></span><span class="sc-mode-seq">${mode.desc}</span>`;button.addEventListener('click',()=>{if(state.mode!==mode.id){state.mode=mode.id;state.elapsed=0;state.running=false;state.lastTime=0;}render();});$('sc260-modes').appendChild(button)});
 const modeData=()=>MODES.find(x=>x.id===state.mode);
 function phaseData(){const seq=modeData().seq,total=seq.reduce((a,p)=>a+p[1],0),within=Math.max(0,state.elapsed)%total;let cumulative=0;for(const [phase,seconds] of seq){if(within<cumulative+seconds){return {phase,remaining:Math.max(1,Math.ceil(seconds-(within-cumulative))),part:(within-cumulative)/seconds};}cumulative+=seconds;}return {phase:'inhale',remaining:4,part:0}}
 function translate(){const t=tr();root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';all('[data-sc]').forEach(el=>{const v=t[el.dataset.sc];if(v)el.textContent=v});$('sc260-lang').value=state.lang;$('sc260-region').value=state.region;all('[data-mode]').forEach((b)=>{const mode=MODES.find(x=>x.id===b.dataset.mode);b.querySelector('.sc-mode-name').textContent=t[mode.id];b.setAttribute('aria-pressed',String(mode.id===state.mode))});all('[data-duration]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.duration)===state.duration)));$('sc260-store').href=`https://apps.apple.com/${state.region}/app/soft-count/id6768180849`;update()}
 function clock(n){n=Math.max(0,Math.ceil(n));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
 function update(){const p=phaseData(),t=tr(),end=state.elapsed>=state.duration;
  $('sc260-phase').textContent=end?t.complete:!state.running&&state.elapsed===0?t.ready:t[p.phase];
  $('sc260-seconds').textContent=end?'0':p.remaining;
  $('sc260-clock').textContent=clock(state.duration-state.elapsed);
  $('sc260-run').textContent=state.running?t.pause:(state.elapsed>0&&!end?t.resume:t.go);
  $('sc260-run').disabled=end;
  $('sc260-seconds').hidden=!state.showTimer;
  $('sc260-phaseunit').hidden=!state.showTimer;
  $('sc260-phase').hidden=!state.showLabels;
  $('sc260-ring-wrap').hidden=!state.showRing;
  $('sc260-timer').checked=state.showTimer;$('sc260-ring-toggle').checked=state.showRing;$('sc260-labels').checked=state.showLabels;
  const percent=Math.min(1,state.elapsed/state.duration),ring=$('sc260-ring');ring.style.strokeDasharray=String(2*Math.PI*145);ring.style.strokeDashoffset=String(2*Math.PI*145*(1-percent));
  const scale=p.phase==='inhale'?.83+.17*p.part:p.phase==='exhale'?1-.17*p.part:1;
  $('sc260-orb').style.transform=`scale(${scale})`;
  $('sc260-orb').dataset.phase=p.phase;
  $('sc260-status').textContent=end?t.complete:'';
 }
 function render(){translate()}
 function tick(){if(!state.running)return;const now=performance.now();if(state.lastTime){state.elapsed=Math.min(state.duration,state.elapsed+(now-state.lastTime)/1000)}state.lastTime=now;if(state.elapsed>=state.duration){state.running=false;state.lastTime=0;}update()}
 $('sc260-run').addEventListener('click',()=>{if(state.elapsed>=state.duration)return;state.running=!state.running;state.lastTime=state.running?performance.now():0;update()});
 $('sc260-reset').addEventListener('click',()=>{state.running=false;state.elapsed=0;state.lastTime=0;update()});
 all('[data-duration]').forEach(b=>b.addEventListener('click',()=>{state.duration=Number(b.dataset.duration);state.elapsed=0;state.running=false;state.lastTime=0;render()}));
 $('sc260-lang').addEventListener('change',e=>{state.lang=LANG[e.target.value]?e.target.value:'en';translate()});
 $('sc260-region').addEventListener('change',e=>{state.region=e.target.value==='jp'?'jp':'us';translate()});
 [['sc260-timer','showTimer'],['sc260-ring-toggle','showRing'],['sc260-labels','showLabels']].forEach(([id,key])=>$(id).addEventListener('change',e=>{state[key]=e.target.checked;update()}));
 state.interval=setInterval(tick,90);
 root.addEventListener('tsz-r260-stop',()=>{clearInterval(state.interval);state.running=false;state.lastTime=0});
 render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
