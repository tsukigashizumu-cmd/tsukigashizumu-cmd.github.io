/* R246 HaulStamp. A local, illustrative calculator, not a live timer or invoice. */
(function(){
'use strict';
const ID='hs246';if(document.getElementById(ID))return;
const TEXT={
 en:{eyebrow:'A RECORD FOR THE HOURS THAT DISAPPEAR',title:'Dock waiting and cargo work. Two clocks, one clear record.',subtitle:'A truck can wait long before any cargo moves. Keep waiting time and handling time separate, then see a reference amount based on the rates you enter.',input:'WORK SESSION',results:'AT A GLANCE',wait:'Waiting time (minutes)',load:'Handling time (minutes)',waitRate:'Waiting rate / hour',loadRate:'Handling rate / hour',pieces:'Items handled',each:'Weight per item',preset:'TRY A WORKDAY',examples:['Long dock wait','Fast turnaround','All handling'],waitOut:'Waiting',loadOut:'Handling',estimate:'Illustrative combined estimate',weight:'Total handled weight',time:'Total time',reset:'Reset example',unit:'Weight unit',lang:'Language',region:'Currency display',invalid:'Check each input. Time 0–1,440 min; count 0–100,000.',notice:'No running timer. No records are saved, shared, or sent from this demo.',legal:'Reference amounts are simple time × entered hourly rate estimates. They are not invoices, unpaid balances, guaranteed compensation, or legal claims. Currency selection only changes the displayed denomination; there is no exchange conversion.'},
 ja:{eyebrow:'消えてしまう作業時間を、記録に',title:'荷待ちと荷役。2つの時間を、混ぜずに残す。',subtitle:'荷物を動かす前にも、トラックは待っている。荷待ちと荷役を分けて、設定した時間単価から参考額を確認します。',input:'作業記録の例',results:'記録の内訳',wait:'荷待ち時間（分）',load:'荷役時間（分）',waitRate:'荷待ち単価／時',loadRate:'荷役単価／時',pieces:'扱った個数',each:'1個あたりの重量',preset:'例を切り替える',examples:['荷待ちが長い日','短時間の作業','荷役が中心'],waitOut:'荷待ち',loadOut:'荷役',estimate:'時間単価からの参考合計',weight:'合計重量',time:'作業時間合計',reset:'初期値に戻す',unit:'重量の単位',lang:'言語',region:'通貨表示',invalid:'入力を確認してください。時間は0～1,440分、個数は0～100,000です。',notice:'これは作業記録の体験デモです。時間計測・保存・送信は行いません。',legal:'参考額は入力した時間と時間単価による目安です。請求額・未払額・法的に認められる金額を示すものではありません。通貨表示の切替では為替換算を行いません。'},
 ar:{eyebrow:'احتفظ بسجل للوقت الذي يضيع',title:'انتظار الرصيف ومناولة الحمولة. وقتان وسجل واحد.',subtitle:'قد تنتظر الشاحنة طويلاً قبل بدء المناولة. افصل وقت الانتظار عن وقت العمل وشاهد تقديراً حسب الأجر بالساعة الذي أدخلته.',input:'جلسة العمل',results:'ملخص واضح',wait:'مدة الانتظار (دقيقة)',load:'مدة المناولة (دقيقة)',waitRate:'معدل الانتظار / ساعة',loadRate:'معدل المناولة / ساعة',pieces:'عدد الوحدات',each:'وزن الوحدة',preset:'جرّب يوماً مختلفاً',examples:['انتظار طويل','دورة سريعة','مناولة فقط'],waitOut:'انتظار',loadOut:'مناولة',estimate:'مجموع تقديري توضيحي',weight:'الوزن الإجمالي',time:'إجمالي الوقت',reset:'إعادة المثال',unit:'وحدة الوزن',lang:'اللغة',region:'عرض العملة',invalid:'تحقق من القيم. الوقت من 0 إلى 1440 دقيقة والعدد من 0 إلى 100000.',notice:'عرض توضيحي فقط. لا يوجد مؤقت فعلي ولا يتم حفظ السجلات أو إرسالها.',legal:'المبالغ تقديرية حسب الساعات والمعدلات المدخلة، وليست فواتير أو مستحقات أو تعويضات قانونية مضمونة. تغيير العملة يغير طريقة العرض فقط، دون تحويل سعر الصرف.'}
};
const scenarios=[
 {us:[95,40,40,60,24,45],jp:[95,40,4000,6000,24,20]},
 {us:[15,75,40,60,12,30],jp:[15,75,4000,6000,12,14]},
 {us:[0,90,40,60,18,50],jp:[0,90,4000,6000,18,23]}
];
const pars=new URLSearchParams(location.search);
let lang=(pars.get('lang')||(document.documentElement.lang||'en')).slice(0,2).toLowerCase();if(!TEXT[lang])lang='en';
let region=(pars.get('region')||(lang==='ja'?'JP':'US')).toUpperCase();if(!['US','JP'].includes(region))region='US';
let unit=(region==='JP'?'kg':'lb');let values=[...(region==='JP'?scenarios[0].jp:scenarios[0].us)];let scenario=0;
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','HaulStamp work time estimate demonstration');
const mount=document.querySelector('main')||document.querySelector('#overview')||document.body;mount.appendChild(root);
const dict=()=>TEXT[lang];
const cash=n=>!Number.isFinite(n)?'—':new Intl.NumberFormat(lang==='ja'?'ja-JP':'en-US',{style:'currency',currency:region==='JP'?'JPY':'USD',maximumFractionDigits:region==='JP'?0:2,minimumFractionDigits:region==='JP'?0:2}).format(n);
const num=n=>new Intl.NumberFormat(lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:2}).format(n);
const nspan=x=>`<span class="hs-number" dir="ltr">${x}</span>`;
function calculate(v){
 if(v.length!==6||v.some((x)=>!Number.isFinite(x)||x<0))return null;
 const [wait,load,rw,rl,count,each]=v;
 if(wait>1440||load>1440||rw>1000000||rl>1000000||count>100000||count%1!==0||each>1000000)return null;
 return {wait,load,waitMoney:wait*rw/60,loadMoney:load*rl/60,total:(wait*rw+load*rl)/60,weight:count*each,totalMin:wait+load};
}
function tpl(){const d=dict();root.setAttribute('dir',lang==='ar'?'rtl':'ltr');root.setAttribute('lang',lang);
 root.innerHTML=`<div class="hs-shell"><header class="hs-top"><div class="hs-brand"><span class="hs-mark" aria-hidden="true">▥</span><div>HAULSTAMP<small>WORK · TIME · RECORD</small></div></div><div class="hs-settings">
 <label>${d.lang}<select data-hs="lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label>
 <label>${d.region}<select data-hs="region"><option value="US">USD $</option><option value="JP">JPY ¥</option></select></label>
 <label>${d.unit}<select data-hs="unit"><option value="lb">lb</option><option value="kg">kg</option></select></label></div></header>
 <div class="hs-intro"><p class="hs-kicker">${d.eyebrow}</p><h2>${d.title}</h2><p class="hs-sub">${d.subtitle}</p></div>
 <div class="hs-layout"><div class="hs-panel"><p class="hs-panel-title"><b>01</b>${d.input}</p><div class="hs-fields">${[d.wait,d.load,d.waitRate,d.loadRate,d.pieces,d.each].map((label,i)=>`<label class="hs-field"><span>${label}</span><input data-hs-number="${i}" type="number" inputmode="decimal" min="0" max="1000000" step="any" value="${values[i]}" aria-label="${label}"></label>`).join('')}</div>
 <p class="hs-presets-head">${d.preset}</p><div class="hs-presets">${d.examples.map((label,i)=>`<button type="button" data-hs-preset="${i}" aria-pressed="${scenario===i}">${label}</button>`).join('')}</div><p class="hs-mini">${d.notice}</p></div>
 <div class="hs-panel hs-result" aria-live="polite"><p class="hs-panel-title"><b>02</b>${d.results}</p><div class="hs-compare"><div class="hs-stat wait"><small>${d.waitOut}</small><strong data-hs-out="waitTime">—</strong><small data-hs-out="waitPay">—</small></div><div class="hs-stat load"><small>${d.loadOut}</small><strong data-hs-out="loadTime">—</strong><small data-hs-out="loadPay">—</small></div></div><div class="hs-total" data-hs-total><small>${d.estimate}</small><strong data-hs-out="total">—</strong><span data-hs-out="status"></span></div><div class="hs-detail"><span>${d.time}</span><strong data-hs-out="minutes">—</strong></div><div class="hs-detail"><span>${d.weight}</span><strong data-hs-out="weight">—</strong></div><div class="hs-footer"><p>${d.notice}</p><button class="hs-reset" type="button" data-hs-reset>${d.reset}</button></div></div></div><p class="hs-note">${d.legal}</p></div>`;
 root.querySelector('[data-hs="lang"]').value=lang;root.querySelector('[data-hs="region"]').value=region;root.querySelector('[data-hs="unit"]').value=unit;
 root.querySelectorAll('[data-hs-number]').forEach(el=>el.addEventListener('input',()=>{scenario=-1;update()}));
 root.querySelectorAll('[data-hs-preset]').forEach(el=>el.addEventListener('click',()=>{scenario=Number(el.getAttribute('data-hs-preset'));values=[...(region==='JP'?scenarios[scenario].jp:scenarios[scenario].us)];tpl()}));
 root.querySelector('[data-hs="lang"]').addEventListener('change',e=>{lang=e.target.value;tpl()});
 root.querySelector('[data-hs="region"]').addEventListener('change',e=>{region=e.target.value;unit=region==='JP'?'kg':'lb';scenario=0;values=[...(region==='JP'?scenarios[0].jp:scenarios[0].us)];tpl()});
 root.querySelector('[data-hs="unit"]').addEventListener('change',e=>{const next=e.target.value;if(next!==unit){let v=read();if(Number.isFinite(v[5]))v[5]=Number((v[5]*(next==='kg'?0.45359237:2.20462262185)).toFixed(2));values=v;unit=next;scenario=-1;tpl()}});
 root.querySelector('[data-hs-reset]').addEventListener('click',()=>{scenario=0;values=[...(region==='JP'?scenarios[0].jp:scenarios[0].us)];tpl()});update();
}
function read(){return Array.from(root.querySelectorAll('[data-hs-number]')).map(x=>x.value.trim()===''?NaN:Number(x.value))}
function update(){values=read();const o=calculate(values),d=dict();const node=n=>root.querySelector(`[data-hs-out="${n}"]`);const total=root.querySelector('[data-hs-total]');
 root.querySelectorAll('[data-hs-preset]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.getAttribute('data-hs-preset'))===scenario)));
 if(!o){total.classList.add('invalid');['waitTime','loadTime','waitPay','loadPay','total','minutes','weight'].forEach(k=>node(k).textContent='—');node('status').textContent=d.invalid;return}
 total.classList.remove('invalid');node('waitTime').innerHTML=nspan(num(o.wait)+' min');node('loadTime').innerHTML=nspan(num(o.load)+' min');
 node('waitPay').innerHTML=nspan(cash(o.waitMoney));node('loadPay').innerHTML=nspan(cash(o.loadMoney));node('total').innerHTML=nspan(cash(o.total));
 node('minutes').innerHTML=nspan(num(o.totalMin)+' min');node('weight').innerHTML=nspan(num(o.weight)+' '+unit);node('status').textContent=d.notice;
}
tpl();
})();
