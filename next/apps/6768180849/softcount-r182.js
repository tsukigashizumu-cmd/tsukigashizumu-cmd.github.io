/* Soft Count R182: illustration-only breathing timer, no storage, sound, vibration, tracking or network. */
(() => {
  'use strict';
  const APP = '6768180849', ID = 'tsz-softcount-r182';
  if (!document.body || document.body.dataset.p199Id !== APP || document.getElementById(ID)) return;

  // This is a website illustration. Patterns are examples, not claims about the app's exact preset timings.
  const patterns = [
    {key:'natural', rhythm:'4 · 4 · 4 · 4', steps:[['inhale',4],['hold',4],['exhale',4],['rest',4]]},
    {key:'relax', rhythm:'4 · 7 · 8', steps:[['inhale',4],['hold',7],['exhale',8]]},
    {key:'zen', rhythm:'4 · 6', steps:[['inhale',4],['exhale',6]]},
    {key:'resonant', rhythm:'5 · 5', steps:[['inhale',5],['exhale',5]]},
    {key:'calming', rhythm:'4 · 8', steps:[['inhale',4],['exhale',8]]}
  ];
  const translations = {
    en: {
      brand:'SOFT COUNT', tag:'A QUIET MOMENT, YOUR WAY', title1:'Your breath.', title2:'Your rhythm.', title3:'Your space.',
      lead:'A quiet breathing timer, shaped around you.', select:'BREATHING RHYTHM', session:'SESSION DURATION',
      natural:'Natural', relax:'Relaxation', zen:'Zen', resonant:'Resonant', calming:'Calming',
      inhale:'BREATHE IN', hold:'HOLD', exhale:'BREATHE OUT', rest:'REST',
      start:'Start', pause:'Pause', reset:'Reset', minutes:'MIN', duration:'Time remaining',
      running:'Session in progress', paused:'Paused', ready:'Ready when you are', finished:'Session complete',
      feature1:'5 rhythm examples', feature2:'Visual breathing guide', feature3:'Your own pace',
      store:'View on the App Store', last:'No rush. No noise. Just your rhythm.',
      note:'Interactive website illustration only. Timing examples may differ from the app’s presets. No audio, haptics, medical advice, or session data is stored.'
    },
    ja: {
      brand:'SOFT COUNT', tag:'自分のペースで、静かな時間', title1:'自分の呼吸。', title2:'自分のリズム。', title3:'自分だけの時間。',
      lead:'自分のペースで整える、静かな呼吸タイマー。', select:'呼吸リズム', session:'セッション時間',
      natural:'ナチュラル', relax:'リラックス', zen:'禅', resonant:'ゆったり', calming:'穏やか',
      inhale:'吸う', hold:'止める', exhale:'吐く', rest:'休む',
      start:'開始', pause:'一時停止', reset:'初期化', minutes:'分', duration:'残り時間',
      running:'進行中', paused:'一時停止中', ready:'いつでも始められます', finished:'終了しました',
      feature1:'5つのリズム例', feature2:'呼吸を目でガイド', feature3:'自分のペースで',
      store:'App Storeで見る', last:'急がず、無理せず、自分のリズムで。',
      note:'これはLP上の操作デモです。呼吸時間は説明用の例で、実アプリの設定と異なる場合があります。音・振動・医療助言・セッション保存はありません。'
    },
    ar: {
      brand:'SOFT COUNT', tag:'لحظة هادئة بإيقاعك', title1:'تنفّسك.', title2:'إيقاعك.', title3:'مساحتك.',
      lead:'مؤقت تنفّس هادئ يناسب إيقاعك.', select:'إيقاع التنفّس', session:'مدة الجلسة',
      natural:'طبيعي', relax:'استرخاء', zen:'زن', resonant:'متوازن', calming:'هادئ',
      inhale:'شهيق', hold:'حبس', exhale:'زفير', rest:'راحة',
      start:'ابدأ', pause:'إيقاف مؤقت', reset:'إعادة الضبط', minutes:'دقيقة', duration:'الوقت المتبقي',
      running:'الجلسة جارية', paused:'متوقف مؤقتاً', ready:'ابدأ حين تشاء', finished:'اكتملت الجلسة',
      feature1:'٥ أمثلة للإيقاع', feature2:'دليل تنفّس بصري', feature3:'على وتيرتك',
      store:'عرضه على App Store', last:'لا استعجال ولا ضوضاء، فقط إيقاعك.',
      note:'عرض تفاعلي توضيحي للموقع فقط. قد تختلف أمثلة التوقيت عن إعدادات التطبيق. لا صوت أو اهتزاز أو نصيحة طبية أو حفظ لبيانات الجلسة.'
    }
  };
  const root = document.createElement('section');
  root.id = ID; root.className = 'sc182'; root.setAttribute('aria-labelledby','sc182-title');
  root.innerHTML = `
    <div class="sc182-head"><div class="sc182-brand"><span class="sc182-brand-icon" aria-hidden="true"><i></i></span><strong data-t="brand">SOFT COUNT</strong></div><span class="sc182-head-tag" data-t="tag"></span></div>
    <div class="sc182-content">
      <div class="sc182-left">
        <p class="sc182-overline" data-t="tag"></p>
        <h2 id="sc182-title"><span data-t="title1"></span><span data-t="title2"></span><em data-t="title3"></em></h2>
        <p class="sc182-lead" data-t="lead"></p>
        <div class="sc182-settings" role="group" aria-label="Breathing settings">
          <div class="sc182-setting-label"><span class="sc182-mini-icon" aria-hidden="true">◉</span><span data-t="select">BREATHING RHYTHM</span></div>
          <div id="sc182-modes" class="sc182-modes" role="group" aria-label="Breathing rhythm"></div>
          <div class="sc182-setting-label sc182-setting-label-duration"><span class="sc182-mini-icon" aria-hidden="true">◷</span><span data-t="session">SESSION DURATION</span></div>
          <div id="sc182-durations" class="sc182-durations" role="group" aria-label="Session duration"></div>
        </div>
        <div class="sc182-controls">
          <button type="button" id="sc182-start" class="sc182-start"><span aria-hidden="true">▶</span><span data-t="start">Start</span></button>
          <button type="button" id="sc182-pause" class="sc182-pause" disabled><span aria-hidden="true">Ⅱ</span><span data-t="pause">Pause</span></button>
          <button type="button" id="sc182-reset" class="sc182-reset" data-t="reset">Reset</button>
        </div>
        <div class="sc182-status"><span id="sc182-status" aria-live="polite"></span><span id="sc182-remaining-label" data-t="duration"></span> <span id="sc182-remaining" class="sc182-mono" aria-live="off">03:00</span></div>
      </div>
      <div class="sc182-stage" aria-label="Animated breathing guide">
        <div class="sc182-sky" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="sc182-orb" id="sc182-orb" data-phase="inhale">
          <div class="sc182-orb-halo"></div><div class="sc182-orb-main"><div class="sc182-orb-core"></div></div>
          <div class="sc182-orb-copy"><span id="sc182-phase" aria-live="off">BREATHE IN</span><strong id="sc182-count" class="sc182-mono" aria-live="off">04</strong><span class="sc182-orb-caption" id="sc182-phase-caption">4 · 4 · 4 · 4</span></div>
        </div>
        <div class="sc182-landscape" aria-hidden="true"></div>
      </div>
    </div>
    <div class="sc182-bottom"><div class="sc182-feature"><span>◎</span><b data-t="feature1"></b></div><div class="sc182-feature"><span>◉</span><b data-t="feature2"></b></div><div class="sc182-feature"><span>◌</span><b data-t="feature3"></b></div></div>
    <div class="sc182-footer"><a id="sc182-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6768180849"><span aria-hidden="true">●</span><span data-t="store"></span><span aria-hidden="true">↗</span></a><p data-t="last"></p><small data-t="note"></small></div>`;
  const anchor = document.querySelector('.p19-breadcrumb');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const next=document.querySelector('#p199-content') || document.querySelector('main'); if(next&&next.parentNode)next.parentNode.insertBefore(root,next);}
  if (!root.isConnected) return;
  const $ = s => root.querySelector(s);
  const language = () => {const code=String(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase(); return code.startsWith('ar')?'ar':code.startsWith('ja')?'ja':'en';};
  const country = () => {const value=String(document.querySelector('#p199-country')?.value || 'us').toLowerCase();return /^[a-z]{2}$/.test(value)?value:'us';};
  let lang='en', mode=0, duration=180, elapsed=0, running=false, startedAt=0, raf=0, lastStatus='';
  const $modes=$('#sc182-modes'), $durations=$('#sc182-durations');
  patterns.forEach((pattern,i)=>{const b=document.createElement('button');b.type='button';b.className='sc182-mode';b.dataset.index=String(i);b.innerHTML='<span class="sc182-mode-ornament" aria-hidden="true">'+['◇','✧','△','≋','☾'][i]+'</span><strong></strong><small class="sc182-mono">'+pattern.rhythm+'</small>';b.addEventListener('click',()=>{mode=i;rewind();translate();});$modes.append(b);});
  [1,3,5,10].forEach(min=>{const b=document.createElement('button');b.type='button';b.className='sc182-duration sc182-mono';b.dataset.minutes=String(min);b.addEventListener('click',()=>{duration=min*60;rewind();translate();});$durations.append(b);});
  const pad=n=>String(n).padStart(2,'0');
  const formatSeconds=s=>`${pad(Math.floor(s/60))}:${pad(s%60)}`;
  const frame=()=>{
    const pattern=patterns[mode];let cycle=0;for(const part of pattern.steps)cycle+=part[1];
    let pos=elapsed%cycle, kind='inhale', left=pattern.steps[0][1], fraction=0;
    for(const [step,seconds] of pattern.steps){if(pos < seconds){kind=step;left=seconds-pos;fraction=pos/seconds;break;}pos-=seconds;}
    let scale=kind==='inhale'?.84+.16*fraction:kind==='exhale'?1-.16*fraction:kind==='hold'?1:.84;
    const complete=elapsed>=duration;
    if(complete){running=false;kind='rest';left=0;scale=.84;}
    $('#sc182-orb').dataset.phase=kind;
    $('#sc182-orb').style.setProperty('--sc182-breath-scale',scale.toFixed(4));
    $('#sc182-orb').style.setProperty('--sc182-progress',(Math.min(1,fraction)*100).toFixed(2)+'%');
    $('#sc182-phase').textContent=translations[lang][kind];
    $('#sc182-count').textContent=pad(Math.ceil(left));
    $('#sc182-phase-caption').textContent=pattern.rhythm;
    $('#sc182-remaining').textContent=formatSeconds(Math.max(0,Math.ceil(duration-elapsed)));
    $('#sc182-start').disabled=running;
    $('#sc182-pause').disabled=!running;
    const status=complete?'finished':running?'running':elapsed>0?'paused':'ready';
    if(lastStatus!==status){$('#sc182-status').textContent=translations[lang][status];lastStatus=status;}
  };
  function tick(now){
    if(!running)return;
    if(!root.isConnected){running=false;return;}
    elapsed=Math.min(duration,(now-startedAt)/1000);
    frame();
    if(running)raf=requestAnimationFrame(tick);
  }
  function pause(){if(!running)return;elapsed=Math.min(duration,(performance.now()-startedAt)/1000);running=false;cancelAnimationFrame(raf);frame();}
  function rewind(){running=false;cancelAnimationFrame(raf);elapsed=0;lastStatus='';frame();}
  function translate(){
    lang=language();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';const t=translations[lang];
    root.querySelectorAll('[data-t]').forEach(el=>{if(t[el.dataset.t]!==undefined)el.textContent=t[el.dataset.t];});
    $modes.querySelectorAll('button').forEach((b,i)=>{b.querySelector('strong').textContent=t[patterns[i].key];b.setAttribute('aria-pressed',String(i===mode));b.classList.toggle('selected',i===mode);});
    $durations.querySelectorAll('button').forEach(b=>{const min=Number(b.dataset.minutes);b.textContent=min+' '+t.minutes;b.setAttribute('aria-pressed',String(min*60===duration));b.classList.toggle('selected',min*60===duration);});
    $('#sc182-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
    lastStatus='';frame();
  }
  $('#sc182-start').addEventListener('click',()=>{if(running)return;if(elapsed>=duration)elapsed=0;startedAt=performance.now()-elapsed*1000;running=true;cancelAnimationFrame(raf);frame();raf=requestAnimationFrame(tick);});
  $('#sc182-pause').addEventListener('click',pause);
  $('#sc182-reset').addEventListener('click',()=>{mode=0;duration=180;rewind();translate();});
  document.querySelector('#p199-language')?.addEventListener('change',translate);
  document.querySelector('#p199-country')?.addEventListener('change',translate);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  translate();
})();
