/* Quiet Reserve R332: short-form, LP-only interactive stimulus ledger. No storage, network or diagnosis. */
(()=>{
 'use strict';
 const ID='tsz-qr332';
 const stressors=[{id:'crowds',cost:34},{id:'noise',cost:18},{id:'notifications',cost:14},{id:'plans',cost:20},{id:'tone',cost:24},{id:'waiting',cost:12}];
 const examples={afterCrowds:['crowds','noise','notifications'],manyPings:['notifications','plans','waiting'],hardTalk:['tone','crowds']};
 const locales={
  en:{eyebrow:'QUIET RESERVE  /  THE MOMENT AFTER',title:'You held it together outside. Then you got home.',lead:'Crowds, sharp sounds and one more notification can add up. Try naming what drained you, without writing a long diary.',try:'START WITH A DAY',afterCrowds:'After a crowd',manyPings:'Too many pings',hardTalk:'Hard conversation',stimuli:'WHAT TOOK SOMETHING OUT OF YOU?',crowds:'A crowded place',noise:'Unexpected sounds',notifications:'Notifications',plans:'Last-minute changes',tone:'Someone’s tone',waiting:'Waiting for a reply',start:'YOUR STARTING CAPACITY',out:'ILLUSTRATIVE CAPACITY LEFT',left:'remaining',count:'STRESSORS SELECTED',spent:'ILLUSTRATIVE ENERGY USED',reflect:'A small record can explain why getting home felt harder than being out.',sub:'There is no right number. Each example uses arbitrary weights that you can change by toggling events; this is not a psychological test.',reset:'Clear this day',note:'Landing-page demo only. The weights and capacity are invented to show the idea, not a clinical scale or a claim about the app’s scoring. This page does not save or send any response. Use the app to keep your own records.',selected:'selected',empty:'Select what happened today to see a sample balance.',low:'Many things stacked up in this example. You can name them without having to justify them.',mid:'Several small events used up some of this example day’s capacity.',high:'This example leaves more capacity. Your real experience may differ.'},
  ja:{eyebrow:'QUIET RESERVE / 帰宅してから',title:'外では平気だったのに。家に帰ったら、もう動けない。',lead:'人混み、突然の音、増え続ける通知。「何に消耗したか」を長い日記なしで見つめる短い体験です。',try:'今日の例を選ぶ',afterCrowds:'人混みのあと',manyPings:'通知が続いた日',hardTalk:'しんどい会話',stimuli:'何が余力を使った？',crowds:'人混み',noise:'突然の音',notifications:'通知',plans:'急な予定変更',tone:'相手の口調',waiting:'返信待ち',start:'今日の最初の余力（例）',out:'残った余力の目安',left:'残り',count:'選んだ出来事',spent:'使った余力の例',reflect:'家に帰ってから急に疲れた理由に、短い言葉を与える。',sub:'正解の数値はありません。出来事の重みは説明用に仮定した値です。診断や心理テストではありません。',reset:'この日の選択を消す',note:'LP専用の操作体験です。点数と出来事の重みは説明用の架空の値で、アプリ本体の算出方法ではありません。入力内容の保存・送信は行いません。記録を残すにはアプリをご利用ください。',selected:'選択済み',empty:'今日あった出来事を選ぶと、参考値が変化します。',low:'いくつもの出来事が重なった例です。理由を説明しなくても、まず名前を付けられます。',mid:'小さな出来事が重なって余力を使った例です。',high:'この例では余力が多めに残ります。実際の感じ方とは異なることがあります。'},
  ar:{eyebrow:'QUIET RESERVE / بعد العودة',title:'تماسكت في الخارج. ثم وصلت إلى المنزل بلا طاقة.',lead:'الازدحام والأصوات المفاجئة والإشعارات المتتالية قد تتراكم. جرّب تسمية ما استنزفك من دون كتابة يوميات طويلة.',try:'اختر مثالاً ليومك',afterCrowds:'بعد الزحام',manyPings:'إشعارات كثيرة',hardTalk:'محادثة مرهقة',stimuli:'ما الذي استهلك طاقتك؟',crowds:'مكان مزدحم',noise:'أصوات مفاجئة',notifications:'إشعارات',plans:'تغيير مفاجئ للخطط',tone:'نبرة شخص آخر',waiting:'انتظار رد',start:'الطاقة عند البداية (مثال)',out:'الطاقة المتبقية — مثال',left:'متبقية',count:'الأحداث المحددة',spent:'الطاقة المستخدمة — مثال',reflect:'قد تساعدك ملاحظة صغيرة على فهم شعورك بعد العودة إلى المنزل.',sub:'لا توجد درجة صحيحة. أوزان الأحداث افتراضية للتوضيح فقط وليست اختباراً نفسياً أو تشخيصاً.',reset:'مسح اختيارات اليوم',note:'تجربة توضيحية للصفحة فقط. النقاط والأوزان أمثلة افتراضية ولا تمثل طريقة حساب التطبيق. لا تُحفظ إجاباتك ولا تُرسل. استخدم التطبيق للاحتفاظ بسجلاتك.',selected:'محدد',empty:'اختر ما حدث اليوم لتتغير النتيجة التوضيحية.',low:'تراكمت أحداث عديدة في هذا المثال. يمكنك تسميتها من دون الحاجة إلى تبريرها.',mid:'استهلكت عدة أحداث صغيرة جزءاً من طاقة هذا المثال.',high:'تبقى طاقة أكبر في هذا المثال، لكن تجربتك الحقيقية قد تختلف.'}
 };
 const state={lang:'en',preset:'afterCrowds',start:100,events:new Set(examples.afterCrowds)};
 const t=()=>locales[state.lang];
 function mount(){
  let host=document.getElementById(ID);
  if(!host){host=document.createElement('section');host.id=ID;const anchor=document.getElementById('related');if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(host,anchor);else(document.querySelector('main')||document.body).appendChild(host)}
  if(host.dataset.ready==='yes')return;
  host.dataset.ready='yes';
  host.innerHTML=`<div class="qr-shell"><div class="qr-glow" aria-hidden="true"></div><header class="qr-hero"><div class="qr-overline"><span class="qr-signal" aria-hidden="true"></span><span data-t="eyebrow"></span></div><h2 data-t="title"></h2><p class="qr-lead" data-t="lead"></p><div class="qr-languages" role="group" aria-label="Language"><button type="button" data-lang="en">English</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></header><div class="qr-work"><section class="qr-inputs"><p class="qr-caption" data-t="try"></p><div class="qr-examples" role="group" aria-label="Sample days"><button type="button" data-preset="afterCrowds"></button><button type="button" data-preset="manyPings"></button><button type="button" data-preset="hardTalk"></button></div><div class="qr-field-top"><p class="qr-caption" data-t="stimuli"></p><span class="qr-count" data-out="countSmall"></span></div><div class="qr-events" role="group" aria-label="Events"></div><div class="qr-sliderlabel"><label for="qr332-capacity" data-t="start"></label><strong data-out="start">100</strong></div><input class="qr-slider" id="qr332-capacity" type="range" min="50" max="100" step="5" value="100" aria-label="Starting illustrative capacity"><div class="qr-sliderticks"><span>50</span><span>100</span></div></section><section class="qr-result"><div class="qr-caption" data-t="out"></div><div class="qr-orbit"><div class="qr-orbit-inner"><div class="qr-number" data-out="left">34</div><div class="qr-units" data-t="left"></div></div></div><div class="qr-progress-meta"><span data-t="out"></span><strong data-out="percent">34%</strong></div><div class="qr-progress"><div data-progress></div></div><div class="qr-metrics"><div><strong data-out="count">3</strong><span data-t="count"></span></div><div><strong data-out="spent">66</strong><span data-t="spent"></span></div></div><p class="qr-reflect" data-t="reflect"></p><p class="qr-insight" data-out="insight"></p><button type="button" class="qr-clear" data-action="clear" data-t="reset"></button></section></div><div class="qr-bottom"><p data-t="sub"></p><p data-t="note"></p></div></div>`;
  const q=sel=>host.querySelector(sel),all=sel=>[...host.querySelectorAll(sel)];
  const eventBox=q('.qr-events');
  eventBox.innerHTML=stressors.map(e=>`<button type="button" data-event="${e.id}" aria-pressed="false"><span class="qr-ico" aria-hidden="true">+</span><span data-label="${e.id}"></span><span class="qr-event-score" aria-hidden="true">−${e.cost}</span></button>`).join('');
  const remaining=()=>Math.max(0,state.start-stressors.reduce((sum,e)=>sum+(state.events.has(e.id)?e.cost:0),0));
  function render(){
   host.setAttribute('lang',state.lang);host.setAttribute('dir',state.lang==='ar'?'rtl':'ltr');
   all('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]||'');
   all('[data-label]').forEach(el=>el.textContent=t()[el.dataset.label]||'');
   all('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===state.lang)));
   all('[data-preset]').forEach(el=>{el.textContent=t()[el.dataset.preset];el.setAttribute('aria-pressed',String(el.dataset.preset===state.preset))});
   all('[data-event]').forEach(el=>{let on=state.events.has(el.dataset.event);el.setAttribute('aria-pressed',String(on));el.querySelector('.qr-ico').textContent=on?'✓':'+'});
   const left=remaining(), spent=state.start-left, percent=Math.round(left/state.start*100);
   q('[data-out="left"]').textContent=left;
   q('[data-out="start"]').textContent=state.start;
   q('[data-out="count"]').textContent=state.events.size;
   q('[data-out="countSmall"]').textContent=state.events.size+' / 6';
   q('[data-out="spent"]').textContent=spent;
   q('[data-out="percent"]').textContent=percent+'%';
   q('[data-progress]').style.width=percent+'%';
   q('.qr-orbit').style.setProperty('--qr-level',percent+'%');
   q('[data-out="insight"]').textContent=state.events.size===0?t().empty:percent<=35?t().low:percent<=65?t().mid:t().high;
   q('#qr332-capacity').value=state.start;
   q('[data-action="clear"]').disabled=state.events.size===0;
  }
  all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;render()}));
  all('[data-preset]').forEach(b=>b.addEventListener('click',()=>{state.preset=b.dataset.preset;state.events=new Set(examples[state.preset]);state.start=100;render()}));
  all('[data-event]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.event;if(state.events.has(v))state.events.delete(v);else state.events.add(v);render()}));
  q('#qr332-capacity').addEventListener('input',e=>{let n=Number(e.target.value);if(Number.isFinite(n))state.start=Math.min(100,Math.max(50,Math.round(n/5)*5));render()});
  q('[data-action="clear"]').addEventListener('click',()=>{state.events.clear();render()});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
