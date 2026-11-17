/* TSZ R336 PuddingScoop — self-contained illustrative demo. No API, tracking or persistence. */
(()=>{
  'use strict';
  const ROOT='tsz-ps336';
  const T={
    en:{brand:'PUDDINGSCOOP / ONE MORE SPOON?',eyebrow:'A TINY GAME OF KNOWING WHEN TO STOP',title:'One more scoop. Or keep the score you already have?',lead:'Every spoon feels harmless, until the caramel appears. Take a little more—or stop now and keep what you earned.',choose:'CHOOSE A PUDDING',classic:'Classic',risky:'Risky',deep:'Deep cup',demo:'Try the feeling',tapping:'Tap or drag across the pudding to scoop.',scoop:'SCOOP AGAIN',bank:'KEEP MY SCORE',retry:'TRY AGAIN',score:'THIS ROUND',best:'BEST KEPT',scoops:'SCOOPS',round:'ROUND',ready:'The first spoon is yours.',continue:'Still pudding. Would you dare one more?',caramel:'Caramel! This round is over.',saved:'You stopped in time. Score kept!',risk:'The next spoon could be the caramel.',legal:'Illustrative LP mini-game with fixed sample outcomes and invented scores. Not the actual app rules, odds or your game history. No data is stored or sent.',tip:'Tip: You can stop after any successful scoop. Tap “Keep my score” before the caramel.',end:'A single spoon can change everything.',shop:'PuddingScoop on the App Store',aria:'Scoop pudding'},
    ja:{brand:'PUDDINGSCOOP / あと一口？',eyebrow:'やめどきを試す、小さなゲーム',title:'あと一口いく？ それとも、今の得点を守る？',lead:'プリンはまだ残っている。でも、次のひとすくいでカラメルが出るかもしれない。進むか、ここで確定するか。',choose:'プリンを選ぶ',classic:'定番',risky:'冒険',deep:'深め',demo:'ひとすくいを体験',tapping:'プリンをタップ、または指でなぞってすくえます。',scoop:'もう一口すくう',bank:'得点を確定する',retry:'もう一度',score:'今回の得点',best:'確定済みの最高得点',scoops:'すくった回数',round:'ラウンド',ready:'最初の一口をどうぞ。',continue:'まだプリン。でも、次はどうする？',caramel:'カラメルが出た！ 今回の得点は失われました。',saved:'ここでストップ。得点を確定しました。',risk:'次のひとすくいでカラメルかもしれません。',legal:'LP専用の説明用ミニゲームです。出現タイミングと得点は架空で、アプリ本体のルール・確率・プレイ記録とは異なります。保存・送信は行いません。',tip:'カラメルが出る前なら、いつでも得点を確定できます。',end:'たった一口が、全部を変える。',shop:'App StoreでPuddingScoopを見る',aria:'プリンをすくう'},
    ar:{brand:'PUDDINGSCOOP / ملعقة أخرى؟',eyebrow:'تجربة صغيرة عن اختيار وقت التوقف',title:'ملعقة إضافية، أم تحتفظ بالنقاط التي جمعتها؟',lead:'تبدو كل ملعقة آمنة، لكن الكراميل قد يظهر في التالية. هل تتابع أم تتوقف وتحافظ على نقاطك؟',choose:'اختر نوع الحلوى',classic:'كلاسيكية',risky:'مغامرة',deep:'كوب عميق',demo:'جرّب شعور المغامرة',tapping:'اضغط على الحلوى أو اسحب فوقها لتأخذ ملعقة.',scoop:'ملعقة أخرى',bank:'احتفظ بنقاطي',retry:'حاول مجددًا',score:'نقاط الجولة',best:'أفضل نقاط محفوظة',scoops:'عدد الملاعق',round:'الجولة',ready:'الملعقة الأولى بانتظارك.',continue:'ما زالت الحلوى موجودة. هل تحاول مرة أخرى؟',caramel:'ظهر الكراميل! انتهت هذه الجولة.',saved:'توقفت في الوقت المناسب واحتفظت بنقاطك!',risk:'قد يظهر الكراميل في الملعقة التالية.',legal:'لعبة توضيحية خاصة بصفحة العرض مع نتائج ثابتة ونقاط افتراضية. ليست قواعد التطبيق أو احتمالاته أو سجل اللعب الحقيقي. لا يتم حفظ البيانات أو إرسالها.',tip:'يمكنك التوقف بعد أي ملعقة ناجحة. اختر الاحتفاظ بالنقاط قبل ظهور الكراميل.',end:'ملعقة واحدة قد تغيّر كل شيء.',shop:'شاهد PuddingScoop على App Store',aria:'خذ ملعقة من الحلوى'}
  };
  const CUPS={classic:{limit:7,points:10},risky:{limit:4,points:16},deep:{limit:9,points:7}};
  const state={lang:'en',cup:'classic',scoops:0,score:0,best:0,round:1,end:false,lost:false};
  let host,down=null,suppressClick=false;
  const q=s=>host.querySelector(s),all=s=>[...host.querySelectorAll(s)],tr=()=>T[state.lang];
  const conf=()=>CUPS[state.cup];
  function nextRound(){state.scoops=0;state.score=0;state.end=false;state.lost=false;state.round++;render();}
  function scoop(){
    if(state.end)return;
    state.scoops++;
    if(state.scoops>=conf().limit){state.end=true;state.lost=true;state.score=0;}
    else state.score+=conf().points;
    render();
  }
  function bank(){if(state.end||state.score<=0)return;state.best=Math.max(state.best,state.score);state.end=true;state.lost=false;render();}
  function mount(){
    if(document.getElementById(ROOT))return;
    host=document.createElement('section');host.id=ROOT;host.setAttribute('aria-label','PuddingScoop landing page demonstration');
    host.innerHTML=`<div class="ps-shell"><div class="ps-top"><div class="ps-brand"><span class="ps-brandmark" aria-hidden="true">◒</span><span data-t="brand"></span></div><div class="ps-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><header class="ps-hero"><p class="ps-eyebrow" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="ps-lead" data-t="lead"></p></header><div class="ps-layout"><div class="ps-display ps-panel"><div class="ps-showtop"><p data-t="demo"></p><span class="ps-count"><span data-t="round"></span> <b data-out="round">1</b></span></div><button class="ps-pudding" type="button" data-action="scoop-cup"><span class="ps-shine" aria-hidden="true"></span><span class="ps-pudding-top" aria-hidden="true"></span><span class="ps-pudding-body" aria-hidden="true"><span class="ps-caramel" aria-hidden="true"></span></span><span class="ps-spoon" aria-hidden="true">◔</span><span class="ps-drips" aria-hidden="true"></span></button><div class="ps-progress"><div class="ps-progressfill" data-out="fill"></div></div><p class="ps-instruction" data-t="tapping"></p><p class="ps-message" data-out="message" role="status" aria-live="polite"></p></div><div class="ps-control ps-panel"><p class="ps-kicker" data-t="choose"></p><div class="ps-presets"><button type="button" data-cup="classic" data-t="classic"></button><button type="button" data-cup="risky" data-t="risky"></button><button type="button" data-cup="deep" data-t="deep"></button></div><div class="ps-stats"><div class="ps-scorebox"><span data-t="score"></span><strong data-out="score">0</strong></div><div class="ps-sidebox"><span data-t="best"></span><strong data-out="best">0</strong></div><div class="ps-sidebox"><span data-t="scoops"></span><strong data-out="scoops">0</strong></div></div><div class="ps-buttons"><button type="button" class="ps-scoopbtn" data-action="scoop" data-t="scoop"></button><button type="button" class="ps-bankbtn" data-action="bank" data-t="bank"></button><button type="button" class="ps-retrybtn" data-action="retry" data-t="retry"></button></div><p class="ps-tip" data-t="tip"></p></div></div><p class="ps-legal" data-t="legal"></p></div>`;
    (document.querySelector('main')||document.body).appendChild(host);
    all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;render()}));
    all('[data-cup]').forEach(b=>b.addEventListener('click',()=>{if(state.cup!==b.dataset.cup){state.cup=b.dataset.cup;nextRound()}}));
    q('[data-action="scoop"]').addEventListener('click',scoop);
    q('[data-action="bank"]').addEventListener('click',bank);
    q('[data-action="retry"]').addEventListener('click',nextRound);
    const cup=q('[data-action="scoop-cup"]');
    cup.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
    cup.addEventListener('pointerup',e=>{if(down && Math.hypot(e.clientX-down.x,e.clientY-down.y)>14){suppressClick=true;scoop();}down=null;});
    cup.addEventListener('pointercancel',()=>{down=null;});
    cup.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}scoop();});
    render();
  }
  function render(){
    host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
    all('[data-t]').forEach(el=>{el.textContent=tr()[el.dataset.t]||''});
    all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
    all('[data-cup]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cup===state.cup)));
    q('[data-out="round"]').textContent=String(state.round);
    q('[data-out="scoops"]').textContent=String(state.scoops);
    q('[data-out="score"]').textContent=String(state.score);
    q('[data-out="best"]').textContent=String(state.best);
    q('[data-out="message"]').textContent=state.end?(state.lost?tr().caramel:tr().saved):(state.scoops===0?tr().ready:tr().continue);
    q('[data-out="message"]').classList.toggle('ps-lost',state.end&&state.lost);
    q('[data-out="message"]').classList.toggle('ps-saved',state.end&&!state.lost);
    host.classList.toggle('ps-ended',state.end);
    host.classList.toggle('ps-failed',state.end&&state.lost);
    q('[data-out="fill"]').style.width=`${Math.max(0,100-Math.round(state.scoops/conf().limit*100))}%`;
    q('[data-action="scoop"]').disabled=state.end;
    q('[data-action="scoop-cup"]').disabled=state.end;
    q('[data-action="scoop-cup"]').setAttribute('aria-label',tr().aria);
    q('[data-action="bank"]').disabled=state.end||state.score<=0;
    q('[data-action="retry"]').hidden=!state.end;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
