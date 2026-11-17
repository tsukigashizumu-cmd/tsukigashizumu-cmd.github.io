/* R321 IkmahLog LP only — fictional service-distance planner, no data persistence. */
(function(){
'use strict';
const ID='ik321';
if(document.getElementById(ID))return;
const text={
 en:{eyebrow:'YOUR NEXT SERVICE, IN VIEW',title:'The last service is in your records. How far until the next?',intro:'Use three numbers to see the distance since the last service, the next mileage you chose, and what remains. No guessing from memory.',examples:['Oil change example','Tire rotation example','Already past the plan'],last:'Mileage at last service',interval:'Your chosen distance interval',now:'Current odometer',unit:'Distance unit',next:'Next planned mileage',remain:'Distance remaining',overdue:'Past your chosen distance by',since:'Driven since last service',done:'of the interval reached',status:'Your plan at a glance',onTrack:'Still ahead',pastDue:'Past the plan',reset:'Restore example',invalid:'Enter valid odometer readings and a positive interval. Current mileage must be at least the last service mileage. Maximum is 2,000,000 miles (or its km equivalent).',note:'Fictional LP-only distance calculator. You choose the interval; this example does not recommend maintenance schedules, diagnose a vehicle, create a reminder, save a record, or transmit data. IkmahLog stores the vehicle records and next date/mileage you set.',miles:'Miles',km:'Kilometres',disclaimer:'Actual maintenance requirements depend on your vehicle and its manufacturer. This is a planning illustration, not maintenance advice.'},
 ja:{eyebrow:'次の整備まで、あとどれくらい？',title:'前回の整備は記録した。次は、あと何km？',intro:'前回・現在・自分で決めた整備間隔を入力するだけ。次の予定距離と、あとどれだけ走れるかを数字で確認。',examples:['オイル交換の例','タイヤローテーションの例','予定距離を過ぎた例'],last:'前回整備時の走行距離',interval:'自分で決める整備間隔',now:'現在の走行距離',unit:'距離の単位',next:'次の予定距離',remain:'残りの距離',overdue:'予定距離を超過',since:'前回から走った距離',done:'整備間隔に対する進捗',status:'次の予定を見える化',onTrack:'予定距離まで',pastDue:'予定距離を超過',reset:'最初の例に戻す',invalid:'正しい走行距離と0より大きい整備間隔を入力してください。現在距離は前回整備時以上、上限は200万マイル相当です。',note:'架空の条件によるLP専用計算です。整備間隔は利用者が決めるもので、この例は整備時期の推奨・車両診断・通知・記録保存・外部送信をしません。IkmahLog本体では次回の日付・距離などを記録できます。',miles:'マイル',km:'キロメートル',disclaimer:'実際の整備要件は車両とメーカーの指定に従って確認してください。整備アドバイスではありません。'},
 ar:{eyebrow:'اعرف المسافة المتبقية للخدمة',title:'سجّلت آخر صيانة. كم تبقّى حتى التالية؟',intro:'ثلاثة أرقام فقط: عداد المسافة عند آخر صيانة، والفاصل الذي تختاره، والعداد الحالي. اعرف ما قطعته وما تبقّى.',examples:['مثال تغيير الزيت','مثال تدوير الإطارات','تجاوز المسافة المخططة'],last:'العداد عند آخر صيانة',interval:'المسافة الدورية التي تختارها',now:'قراءة العداد الحالية',unit:'وحدة المسافة',next:'العداد المخطط للصيانة التالية',remain:'المسافة المتبقية',overdue:'تجاوزت المسافة المخططة بمقدار',since:'المسافة منذ آخر صيانة',done:'من الفترة المخططة',status:'خطتك بنظرة واحدة',onTrack:'الموعد لا يزال أمامك',pastDue:'تجاوزت المسافة المخططة',reset:'استعادة المثال الأول',invalid:'أدخل قراءات صحيحة وفترة أكبر من الصفر. يجب ألا تقل القراءة الحالية عن قراءة آخر صيانة. الحد الأعلى يعادل مليونَي ميل.',note:'حاسبة توضيحية فقط بأرقام افتراضية. أنت من يحدد فترة الصيانة. لا يوصي هذا المثال بمواعيد الصيانة، ولا يشخّص السيارة أو ينشئ تنبيهاً أو يحفظ سجلاً أو يرسل بيانات. يحفظ تطبيق IkmahLog السجلات والمواعيد والمسافات التي تختارها.',miles:'ميل',km:'كيلومتر',disclaimer:'متطلبات الصيانة الفعلية تعتمد على سيارتك وتعليمات الشركة المصنّعة. هذا المثال ليس نصيحة صيانة.'}
};
const MILE_TO_KM=1.609344;
const samples=[{last:15000,interval:5000,now:18240},{last:44000,interval:6000,now:48300},{last:28000,interval:8000,now:36650}];
let lang='en',unit='mi',active=0,state={...samples[0]};
const host=document.createElement('section');host.id=ID;host.setAttribute('aria-label','IkmahLog example service-distance planner');
host.innerHTML=`<div class="ik-head"><div><div class="ik-eyebrow" data-i="eyebrow"></div><h2 data-i="title"></h2><p class="ik-intro" data-i="intro"></p></div><div class="ik-language" role="group" aria-label="Demo language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div>
<div class="ik-choose" role="group" aria-label="Service examples"><button type="button" data-ex="0"></button><button type="button" data-ex="1"></button><button type="button" data-ex="2"></button></div>
<div class="ik-workspace"><div class="ik-entry"><div class="ik-unit"><span data-i="unit"></span><div class="ik-unit-controls" role="group" aria-label="Distance unit"><button type="button" data-unit="mi"></button><button type="button" data-unit="km"></button></div></div><div class="ik-inputs"><label><span data-i="last"></span><input type="number" data-field="last" min="0" step="1" inputmode="numeric"></label><label><span data-i="interval"></span><input type="number" data-field="interval" min="1" step="1" inputmode="numeric"></label><label><span data-i="now"></span><input type="number" data-field="now" min="0" step="1" inputmode="numeric"></label></div><button class="ik-reset" type="button" data-reset></button></div>
<div class="ik-output" aria-live="polite"><div class="ik-output-title"><span data-i="status"></span><strong data-result="badge"></strong></div><div class="ik-major"><small data-result="main-label"></small><strong data-result="main"></strong></div><div class="ik-gauge"><span data-gauge></span></div><p class="ik-progress" data-result="progress"></p><div class="ik-stats"><div><span data-i="next"></span><strong data-result="next"></strong></div><div><span data-i="since"></span><strong data-result="since"></strong></div></div></div></div>
<p class="ik-error" role="alert" hidden></p><div class="ik-foot"><p data-i="note"></p><p data-i="disclaimer"></p></div>`;
const anchor=document.querySelector('#related');
if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(host,anchor);
else (document.querySelector('#overview')||document.querySelector('main')||document.body).appendChild(host);
const one=s=>host.querySelector(s),all=s=>[...host.querySelectorAll(s)];
const strings=()=>text[lang];
const factor=()=>unit==='km'?MILE_TO_KM:1;
const format=n=>new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(Math.round(n));
const asShown=n=>Math.round(n*factor());
function labels(){
 const t=strings();host.setAttribute('dir',lang==='ar'?'rtl':'ltr');
 all('[data-i]').forEach(e=>e.textContent=t[e.dataset.i]);
 all('[data-ex]').forEach(e=>{const is=Number(e.dataset.ex)===active;e.textContent=t.examples[Number(e.dataset.ex)];e.setAttribute('aria-pressed',String(is));});
 all('[data-lang]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.lang===lang)));
 all('[data-unit]').forEach(e=>{e.textContent=e.dataset.unit==='mi'?t.miles:t.km;e.setAttribute('aria-pressed',String(e.dataset.unit===unit));});
 one('[data-reset]').textContent=t.reset;
}
function inputs(){all('[data-field]').forEach(e=>{const n=state[e.dataset.field];e.value=Number.isFinite(n)?String(asShown(n)):'';});}
function result(key,value){one('[data-result="'+key+'"]').textContent=value;}
function render(){
 const last=state.last,interval=state.interval,now=state.now,t=strings();
 const valid=[last,interval,now].every(Number.isFinite)&&last>=0&&last<=2e6&&now>=last&&now<=2e6&&interval>0&&interval<=2e5;
 one('.ik-error').hidden=valid;one('.ik-error').textContent=valid?'':t.invalid;
 host.classList.toggle('ik-invalid',!valid);
 if(!valid){for(const k of ['badge','main-label','main','progress','next','since'])result(k,'—');one('[data-gauge]').style.width='0%';host.classList.remove('ik-overdue');return;}
 const next=last+interval,diff=next-now,overdue=diff<0,used=now-last,pct=Math.round(used/interval*100);
 const displayUnit=unit==='km'?t.km:t.miles;
 host.classList.toggle('ik-overdue',overdue);
 result('badge',overdue?t.pastDue:t.onTrack);
 result('main-label',overdue?t.overdue:t.remain);
 result('main',format(Math.abs(diff)*factor())+' '+displayUnit);
 result('next',format(next*factor())+' '+displayUnit);
 result('since',format(used*factor())+' '+displayUnit);
 result('progress',format(pct)+'% '+t.done);
 one('[data-gauge]').style.width=Math.max(0,Math.min(100,pct))+'%';
}
all('[data-field]').forEach(e=>e.addEventListener('input',()=>{
 const raw=e.value.trim();const num=raw===''?NaN:Number(raw);
 // Users enter whole odometer values in the currently selected distance unit.
 state[e.dataset.field]=Number.isFinite(num)&&Number.isInteger(num)?num/factor():NaN;
 active=-1;labels();render();
}));
all('[data-ex]').forEach(e=>e.addEventListener('click',()=>{active=Number(e.dataset.ex);state={...samples[active]};labels();inputs();render();}));
all('[data-unit]').forEach(e=>e.addEventListener('click',()=>{if(unit===e.dataset.unit)return;unit=e.dataset.unit;labels();inputs();render();}));
all('[data-lang]').forEach(e=>e.addEventListener('click',()=>{lang=e.dataset.lang;labels();render();}));
one('[data-reset]').addEventListener('click',()=>{active=0;state={...samples[0]};labels();inputs();render();});
labels();inputs();render();
})();
