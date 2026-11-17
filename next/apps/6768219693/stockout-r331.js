/* Stockout Zero · R331 · LP-only illustrative tap/upgrades/automation. No persistence, no networking. */
(()=>{
 'use strict';
 const ID='tsz-sz331';
 const words={
  en:{over:'STOCKOUT ZERO / INTERACTIVE FIELD NOTE',title:'One stock check. Then the whole store starts moving.',lead:'Every system starts with one small action. Tap to check stock, unlock a faster routine, then see a tiny automation take over.',try:'CHOOSE A STARTING POINT',start:'Start small',busy:'Busy shift',auto:'Automation',tap:'Check one shelf',tapReward:'Earn +{n} sample credits per tap',upgrade:'Faster checks',upgradeDetail:'Double each tap reward',autoUpgrade:'Auto-check station',autoDetail:'2 checks every second',cost:'Spend {n} credits',unlocked:'Unlocked',maxed:'Already upgraded',credits:'AVAILABLE CREDITS',rewardLabel:'Credits per tap',checks:'Stock checks',manual:'Manual checks',stations:'Auto stations',goal:'TOWARD YOUR FIRST 50 CHECKS',notice:'Illustrative goal · no Game Center connection',explain:'That is the idea behind the actual game: tap, improve, then automate. These credits, upgrade costs and rates are invented for this landing-page demo.',pause:'Pause automation',resume:'Resume automation',reset:'Start this example over',running:'SIMULATION RUNNING',paused:'SIMULATION PAUSED',manualOnly:'MANUAL MODE',foot:'LP-only interactive demonstration, not gameplay footage. Sample credits, prices, milestones and automation rates are invented. State lasts only while this page is open; there is no saving, account, game sync, tracking or network request.'},
  ja:{over:'STOCKOUT ZERO / 操作型デモ',title:'たった一回の在庫確認から、店が自動で動き出す。',lead:'最初は、たった一回の確認。タップで資金を増やし、確認作業を強化し、小さな自動化を動かしてみよう。',try:'開始状態を選ぶ',start:'最初の一歩',busy:'忙しい現場',auto:'自動化済み',tap:'棚をひとつ確認',tapReward:'1タップでサンプル資金 +{n}',upgrade:'チェックを強化',upgradeDetail:'1タップの獲得額が2倍',autoUpgrade:'自動チェック設備',autoDetail:'1秒ごとに2回確認',cost:'資金 {n} を使う',unlocked:'強化済み',maxed:'強化済み',credits:'利用できる資金',rewardLabel:'1タップの獲得額',checks:'在庫確認数',manual:'手動チェック',stations:'自動設備',goal:'まずは50回の確認へ',notice:'体験用目標 · Game Center未接続',explain:'タップから始まり、改善し、やがて自動化する。これはゲームの流れを伝えるLP専用例です。資金・価格・速度はゲーム本体と異なる架空の値です。',pause:'自動化を一時停止',resume:'自動化を再開',reset:'この例を最初から',running:'デモ自動化中',paused:'一時停止中',manualOnly:'手動モード',foot:'LP限定の操作体験です。資金・価格・達成目標・速度は説明用の架空の値であり、ゲーム実画面ではありません。進行は保存・送信されず、アカウント・Game Center・追跡・外部通信もありません。'},
  ar:{over:'STOCKOUT ZERO / تجربة تفاعلية',title:'فحص واحد للمخزون… ثم يبدأ المتجر بالعمل تلقائياً.',lead:'كل نظام يبدأ بخطوة صغيرة. افحص الرفوف بالنقر، وطوّر سرعة العمل، ثم جرّب أتمتة بسيطة.',try:'اختر نقطة البداية',start:'ابدأ صغيراً',busy:'وردية مزدحمة',auto:'أتمتة',tap:'افحص رفاً واحداً',tapReward:'اكسب {n} رصيداً تجريبياً لكل نقرة',upgrade:'تسريع الفحص',upgradeDetail:'مضاعفة مكافأة كل نقرة',autoUpgrade:'محطة فحص آلية',autoDetail:'فحصان كل ثانية',cost:'أنفق {n} رصيداً',unlocked:'تم الترقية',maxed:'تمت الترقية',credits:'الرصيد المتاح',rewardLabel:'رصيد لكل نقرة',checks:'عمليات الفحص',manual:'فحوصات يدوية',stations:'محطات آلية',goal:'نحو أول 50 فحصاً',notice:'هدف توضيحي · دون اتصال بـ Game Center',explain:'هذه فكرة اللعبة: انقر، وطوّر، ثم شغّل الأتمتة. جميع الأرصدة والتكاليف ومعدلات العمل هنا افتراضية للتوضيح فقط.',pause:'إيقاف الأتمتة مؤقتاً',resume:'استئناف الأتمتة',reset:'البدء من جديد',running:'المحاكاة تعمل',paused:'المحاكاة متوقفة',manualOnly:'الوضع اليدوي',foot:'هذا عرض تفاعلي للصفحة فقط وليس لقطة من اللعبة. الأرصدة والأسعار والأهداف والسرعات أمثلة افتراضية. لا يتم حفظ الحالة أو إرسالها، ولا يوجد اتصال بحساب أو Game Center أو أي شبكة.'}
 };
 const examples={start:{credits:0,manual:0,autoChecks:0,boost:0,stations:0,paused:false},busy:{credits:35,manual:10,autoChecks:0,boost:0,stations:0,paused:false},auto:{credits:95,manual:12,autoChecks:20,boost:1,stations:1,paused:false}};
 const state={lang:'en',preset:'start',...examples.start};
 const t=()=>words[state.lang];
 const total=()=>state.manual+state.autoChecks;
 const reward=()=>5*(state.boost?2:1);
 const templ=(key,n)=>t()[key].replace('{n}',String(n));
 function mount(){
  let host=document.getElementById(ID);
  if(!host){host=document.createElement('section');host.id=ID;const at=document.getElementById('related');if(at&&at.parentNode)at.parentNode.insertBefore(host,at);else (document.querySelector('main')||document.body).appendChild(host)}
  if(host.dataset.ready==='yes')return;
  host.dataset.ready='yes';host.setAttribute('lang','en');host.setAttribute('dir','ltr');
  host.innerHTML='<div class="sz-shell"><header class="sz-hero"><div class="sz-kicker"><span class="sz-dot" aria-hidden="true"></span><span data-t="over"></span></div><h2 data-t="title"></h2><p class="sz-sub" data-t="lead"></p><div class="sz-lang" role="group" aria-label="Language"><button type="button" data-lang="en">English</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></header><div class="sz-main"><section class="sz-controls"><p class="sz-label" data-t="try"></p><div class="sz-presets" role="group" aria-label="Demo starting points"><button type="button" data-preset="start"></button><button type="button" data-preset="busy"></button><button type="button" data-preset="auto"></button></div><button class="sz-tap" type="button" data-action="tap"><span class="sz-tap-icon" aria-hidden="true">✓</span><strong data-t="tap"></strong><small data-out="reward"></small></button><div class="sz-upgrades"><button type="button" class="sz-upgrade" data-action="boost"><strong data-t="upgrade"></strong><span class="sz-meta" data-t="upgradeDetail"></span><span class="sz-cost" data-out="boostCost"></span></button><button type="button" class="sz-upgrade" data-action="buyAuto"><strong data-t="autoUpgrade"></strong><span class="sz-meta" data-t="autoDetail"></span><span class="sz-cost" data-out="autoCost"></span></button></div></section><section class="sz-screen"><div class="sz-minihead"><p class="sz-label" data-t="credits"></p><span class="sz-indicator" data-out="state"></span></div><div class="sz-total" data-out="credits">0</div><p class="sz-total-label" data-t="credits"></p><div class="sz-grid"><div class="sz-stat"><b data-out="checks">0</b><span data-t="checks"></span></div><div class="sz-stat"><b data-out="manual">0</b><span data-t="manual"></span></div><div class="sz-stat"><b data-out="stations">0</b><span data-t="stations"></span></div><div class="sz-stat"><b data-out="rewardValue">5</b><span data-t="rewardLabel"></span></div></div><div class="sz-progress-title"><span data-t="goal"></span><b data-out="goalPercent">0%</b></div><div class="sz-progress"><div data-meter></div></div><p class="sz-explain" data-t="explain"></p><div class="sz-actions"><button type="button" data-action="pause"></button><button type="button" data-action="reset" data-t="reset"></button></div></section></div><footer class="sz-note" data-t="foot"></footer></div>';
  const q=s=>host.querySelector(s),all=s=>Array.from(host.querySelectorAll(s));
  const sync=()=>{
   host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
   all('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]||'');
   all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
   all('[data-preset]').forEach(b=>{b.textContent=t()[b.dataset.preset];b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset))});
   q('[data-out="credits"]').textContent=state.credits.toLocaleString('en-US');
   q('[data-out="checks"]').textContent=total().toLocaleString('en-US');
   q('[data-out="manual"]').textContent=state.manual.toLocaleString('en-US');
   q('[data-out="stations"]').textContent=String(state.stations);
   q('[data-out="rewardValue"]').textContent=String(reward());
   q('[data-out="reward"]').textContent=templ('tapReward',reward());
   const boost=q('[data-action="boost"]'),machine=q('[data-action="buyAuto"]');
   boost.disabled=Boolean(state.boost)||state.credits<25;
   machine.disabled=state.credits<60||state.stations>=4;
   q('[data-out="boostCost"]').textContent=state.boost?t().unlocked:templ('cost',25);
   q('[data-out="autoCost"]').textContent=state.stations>=4?t().maxed:templ('cost',60);
   q('[data-out="state"]').textContent=!state.stations?t().manualOnly:state.paused?t().paused:t().running;
   q('[data-action="pause"]').disabled=!state.stations;
   q('[data-action="pause"]').textContent=state.paused?t().resume:t().pause;
   const percentage=Math.min(100,Math.round(total()/50*100));
   q('[data-meter]').style.width=percentage+'%';
   q('[data-out="goalPercent"]').textContent=percentage+'%';
  };
  const select=name=>{Object.assign(state,examples[name]);state.preset=name;sync()};
  all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;sync()}));
  all('[data-preset]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.preset)));
  q('[data-action="tap"]').addEventListener('click',()=>{state.manual++;state.credits+=reward();sync()});
  q('[data-action="boost"]').addEventListener('click',()=>{if(state.boost||state.credits<25)return;state.credits-=25;state.boost=1;sync()});
  q('[data-action="buyAuto"]').addEventListener('click',()=>{if(state.credits<60||state.stations>=4)return;state.credits-=60;state.stations++;state.paused=false;sync()});
  q('[data-action="pause"]').addEventListener('click',()=>{if(!state.stations)return;state.paused=!state.paused;sync()});
  q('[data-action="reset"]').addEventListener('click',()=>select(state.preset));
  window.setInterval(()=>{if(!document.hidden&&host.isConnected&&state.stations&&!state.paused){state.autoChecks+=2*state.stations;state.credits+=2*state.stations;sync()}},1000);
  sync();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
