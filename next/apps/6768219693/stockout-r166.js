/* TSZ LP R166 Stockout Zero: illustrative choices, not actual game economy. No storage, network, analytics or external dependencies. */
(()=>{'use strict';
const ID='tsz-sz166',APP='6768219693';
const T={
 ja:{eyebrow:'STOCKOUT ZERO  /  次の一手',badge:'このページだけの体験版',title:'発注するか。設備を強化するか。',lead:'足りない在庫を補うか、将来の自動補充を育てるか。次の営業日を進めながら、小さな判断が欠品をどう変えるか試してみよう。',shift:'営業日',stock:'手元の在庫',funds:'資金',miss:'累計欠品',auto:'自動補充',demand:'次の需要',order:'発注 +3',orderInfo:'資金 −15 / 在庫 +3',upgrade:'設備を強化',upgradeInfo:'資金 −40 / 毎日 +2',next:'次の営業日へ',undo:'1手戻す',reset:'最初から',logTitle:'今回の結果',intro:'在庫4・資金60からスタート。需要は毎日3。',after:'次の営業日に需要3を処理しました。',sold:'販売',short:'欠品',earned:'収入',hint:'発注は今すぐ在庫が増えます。設備強化は次の営業日から補充されます。',note:'LP専用の架空ルールです。実アプリの数値・ゲーム進行・クリア条件ではありません。実際のデータ保存や送信、通知はありません。',cashShort:'資金が足りません',levelMax:'設備は最大2段階です',level:'レベル',units:'個',credits:'C',none:'なし',actionOrder:'発注 +3：資金15を使用',actionUpgrade:'設備強化：次の日から自動補充',actionUndo:'1手戻しました',actionReset:'初期状態に戻しました',autoHint:'営業日の最初に、自動補充（レベル×2）が入ります。',feedback:'操作結果'},
 en:{eyebrow:'STOCKOUT ZERO  /  YOUR NEXT MOVE',badge:'INTERACTIVE WEB EXAMPLE',title:'Place an order—or invest in automation?',lead:'Top up stock right now, or build automatic replenishment for tomorrow. Advance each day to see how small decisions affect stockouts.',shift:'Day',stock:'Stock on hand',funds:'Credits',miss:'Total stockouts',auto:'Auto replenishment',demand:'Demand per day',order:'Order +3',orderInfo:'−15 credits / +3 stock',upgrade:'Upgrade system',upgradeInfo:'−40 credits / +2 each day',next:'Advance one day',undo:'Undo one move',reset:'Reset example',logTitle:'Latest result',intro:'Start with 4 units and 60 credits. Demand is 3 per day.',after:'The next day processed demand for 3 units.',sold:'Sold',short:'Shortfall',earned:'Earned',hint:'Ordering adds stock now. Upgrading adds stock at the start of future days.',note:'Illustrative web-only rules, NOT the actual app economy or completion requirements. No game data is read, saved, sent or notified.',cashShort:'Not enough credits',levelMax:'Maximum upgrade level: 2',level:'Level',units:'units',credits:'C',none:'None',actionOrder:'Ordered 3 units for 15 credits',actionUpgrade:'Upgraded auto refill for future days',actionUndo:'Undid the last move',actionReset:'Restored the sample',autoHint:'At the start of each day, automation adds 2 × its level.',feedback:'Last action'},
 ar:{eyebrow:'STOCKOUT ZERO  /  خطوتك التالية',badge:'تجربة توضيحية داخل الموقع',title:'هل تطلب بضاعة أم تطوّر الأتمتة؟',lead:'أضف المخزون الآن، أو استثمر في التعبئة التلقائية للمستقبل. تقدّم يومًا بعد يوم لترى أثر كل قرار على النقص.',shift:'اليوم',stock:'المخزون الحالي',funds:'الرصيد',miss:'النقص التراكمي',auto:'التعبئة التلقائية',demand:'الطلب اليومي',order:'طلب +3',orderInfo:'خصم 15 / إضافة 3 وحدات',upgrade:'تطوير النظام',upgradeInfo:'خصم 40 / إضافة 2 يوميًا',next:'الانتقال لليوم التالي',undo:'تراجع عن خطوة',reset:'إعادة المثال',logTitle:'النتيجة الأخيرة',intro:'البداية: 4 وحدات ورصيد 60. الطلب 3 وحدات يوميًا.',after:'تمت معالجة طلب 3 وحدات في اليوم التالي.',sold:'المبيعات',short:'النقص',earned:'العائد',hint:'الطلب يزيد المخزون فورًا؛ التطوير يضيف مخزونًا تلقائيًا في بداية الأيام التالية.',note:'قواعد توضيحية لهذا الموقع فقط؛ لا تمثل أرقام اللعبة الفعلية أو شروط إنهائها. لا يتم حفظ بيانات أو إرسالها أو إرسال إشعارات.',cashShort:'الرصيد لا يكفي',levelMax:'الحد الأقصى للتطوير: 2',level:'المستوى',units:'وحدات',credits:'C',none:'لا شيء',actionOrder:'إضافة 3 وحدات مقابل 15',actionUpgrade:'تطوير التعبئة التلقائية للأيام القادمة',actionUndo:'تم التراجع عن آخر خطوة',actionReset:'إعادة الحالة الأولية',autoHint:'في بداية كل يوم تُضاف وحدتان مضروبتان في مستوى الأتمتة.',feedback:'آخر إجراء'}
};
const initial=()=>({day:1,stock:4,credits:60,miss:0,level:0,sold:0,short:0,earned:0,last:'intro'});
function locale(){const val=document.getElementById('p199-language')?.value||document.documentElement.lang||'en';return /^ar/i.test(val)?'ar':/^ja/i.test(val)?'ja':'en';}
function mount(){
 if(document.getElementById(ID))return;
 const owner=document.querySelector('[data-p199-id="'+APP+'"]');if(!owner)return;
 const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
 const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Stockout Zero stock and automation illustrative simulation');
 root.innerHTML=`<div class="sz166-hero"><div class="sz166-tags"><strong data-t="eyebrow"></strong><span data-t="badge"></span></div><h2 data-t="title"></h2><p data-t="lead"></p></div>
 <div class="sz166-body"><div class="sz166-top"><div class="sz166-shift"><span data-t="shift"></span><strong data-num="day">1</strong></div><div class="sz166-mini"><span data-t="demand"></span><strong>3</strong></div></div>
 <div class="sz166-metrics"><div><span data-t="stock"></span><strong data-num="stock">4</strong><i class="sz166-bar"><em data-fill="stock"></em></i></div><div><span data-t="funds"></span><strong data-num="credits">60</strong><small>C</small></div><div><span data-t="miss"></span><strong data-num="miss">0</strong><small data-t="units"></small></div><div class="sz166-upgraded"><span data-t="auto"></span><strong data-num="level">0</strong><small data-t="level"></small></div></div>
 <div class="sz166-prompt"><div class="sz166-lines"><div><b data-t="order"></b><small data-t="orderInfo"></small></div><button type="button" data-action="order" class="sz166-order" aria-label="Order 3 units"><span>+</span><span data-t="order"></span></button></div><div class="sz166-lines"><div><b data-t="upgrade"></b><small data-t="upgradeInfo"></small></div><button type="button" data-action="upgrade" class="sz166-upgrade"><span>✦</span><span data-t="upgrade"></span></button></div></div>
 <p class="sz166-hint" data-t="hint"></p><button class="sz166-advance" type="button" data-action="next"><span>→</span><span data-t="next"></span></button>
 <div class="sz166-result" aria-live="polite"><div class="sz166-result-top"><h3 data-t="logTitle"></h3><strong data-val="feedback"></strong></div><p data-val="description"></p><div class="sz166-result-row"><div><span data-t="sold"></span><strong data-num="sold">0</strong></div><div><span data-t="short"></span><strong data-num="short">0</strong></div><div><span data-t="earned"></span><strong data-num="earned">0</strong></div></div></div>
 <div class="sz166-actions"><button type="button" data-action="undo" data-t="undo"></button><button type="button" data-action="reset" data-t="reset"></button></div><div class="sz166-footer"><p data-t="autoHint"></p><p data-t="note"></p></div></div>`;
 anchor.insertAdjacentElement('afterend',root);
 let state=initial(),history=[],action='intro',message='';
 const $=(sel)=>root.querySelector(sel);
 const esc=(v)=>String(v);
 function save(){history.push({state:{...state},action,message});if(history.length>40)history.shift();}
 function update(){const L=locale(),t=T[L];root.dir=L==='ar'?'rtl':'ltr';root.lang=L;
  root.querySelectorAll('[data-t]').forEach(n=>{n.textContent=t[n.dataset.t]||''});
  root.querySelectorAll('[data-num]').forEach(n=>{n.textContent=esc(state[n.dataset.num])});
  $('[data-fill="stock"]').style.width=Math.min(100,state.stock/12*100)+'%';
  $('[data-action="order"]').disabled=state.credits<15;
  $('[data-action="upgrade"]').disabled=state.credits<40||state.level>=2;
  $('[data-action="undo"]').disabled=history.length===0;
  $('[data-val="feedback"]').textContent=message?t[message]||message:'';
  $('[data-val="description"]').textContent=action==='next'?`${t.after} ${t.sold}: ${state.sold} · ${t.short}: ${state.short} · ${t.earned}: ${state.earned} C.`:t[action]||t.intro;
 }
 root.addEventListener('click',e=>{const button=e.target.closest('button[data-action]');if(!button||!root.contains(button))return;
  const a=button.dataset.action;message='';
  if(a==='undo'){if(!history.length)return;const p=history.pop();state=p.state;action=p.action;message='actionUndo';update();return;}
  if(a==='reset'){save();state=initial();action='intro';message='actionReset';update();return;}
  if(a==='order'){if(state.credits<15){message='cashShort';update();return;}save();state.stock+=3;state.credits-=15;action='actionOrder';message='actionOrder';}
  else if(a==='upgrade'){if(state.level>=2){message='levelMax';update();return;}if(state.credits<40){message='cashShort';update();return;}save();state.level++;state.credits-=40;action='actionUpgrade';message='actionUpgrade';}
  else if(a==='next'){save();state.day++;state.stock+=state.level*2;const sold=Math.min(3,state.stock);state.stock-=sold;state.sold=sold;state.short=3-sold;state.earned=sold*10;state.miss+=state.short;state.credits+=state.earned;action='next';}
  update();
 });
 document.getElementById('p199-language')?.addEventListener('change',update);
 let old=locale();new MutationObserver(()=>{if(old!==locale()){old=locale();update()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
