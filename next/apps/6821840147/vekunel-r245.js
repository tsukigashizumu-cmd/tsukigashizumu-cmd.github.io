/* R245 Vekunel: standalone illustration, in-memory only, no data collection or payments. */
(function(){
'use strict';
const ID='vk245';
if(document.getElementById(ID))return;
const D={
 en:{eye:'CHECK THE FULL TOTAL',title:'One more item for free shipping. Is it actually cheaper?',intro:'The free-shipping label can distract from the final amount. Compare what you would pay with and without the extra item.',fields:['Cart subtotal','Ordinary shipping','Free-shipping threshold','Extra item price'],inputs:'FOUR AMOUNTS',presets:'TRY AN EXAMPLE',examples:['Adding saves $2','Adding costs $2','Still below threshold','Already free shipping'],result:'CHECKOUT, SIDE BY SIDE',before:'Without extra item',after:'With extra item',deliveryFree:'Free shipping',deliveryPaid:'Shipping added',less:'Less to pay with the extra item',more:'More to pay with the extra item',same:'Same checkout total',invalid:'Enter four valid amounts',difference:'Difference in checkout total',line1:'Original cart + shipping',line2:'Added cart + shipping',line3:'Free-shipping target reached?',yes:'Yes',no:'No',reset:'Reset example',notice:'Amounts are hypothetical. This demo does not buy products, save data, or contact a store.',legal:'Illustration only. The threshold is assumed to use the entered subtotal. Taxes, coupons, excluded items, fees, refunds and rewards are not included. Changing currency only changes the symbol; there is no exchange-rate conversion.',lang:'Language',region:'Display currency',explain:'The added item is a purchase, not a discount. You decide whether you need it.'},
 ja:{eye:'支払総額で比べる',title:'送料無料のためにもう1点。それ、本当に安い？',intro:'「送料無料」の文字だけで決めない。商品を足す前と足した後、レジで払う総額を比較します。',fields:['現在のカゴ合計','通常送料','送料無料になる金額','追加商品の価格'],inputs:'4つの金額を入力',presets:'具体例で試す',examples:['買い足すと200円安い','買い足すと200円高い','まだ送料無料にならない','元から送料無料'],result:'支払総額を比べる',before:'追加しない',after:'1点追加する',deliveryFree:'送料無料',deliveryPaid:'送料が発生',less:'追加すると支払額が減る',more:'追加すると支払額が増える',same:'支払総額は同じ',invalid:'4つの金額を確認してください',difference:'支払総額の差額',line1:'元のカゴ＋送料',line2:'追加後のカゴ＋送料',line3:'追加後に送料無料？',yes:'はい',no:'いいえ',reset:'初期値に戻す',notice:'架空の例です。購入・データ保存・店舗への接続は行いません。',legal:'説明用デモです。入力した小計が送料無料判定に使われる前提です。税・クーポン・対象外商品・追加手数料・返金・ポイントは含みません。通貨切替は記号表示のみで、為替換算はしません。',lang:'言語',region:'表示通貨',explain:'追加商品にも代金がかかります。必要な商品かどうかは自分で判断します。'},
 ar:{eye:'قارن المبلغ النهائي',title:'قطعة إضافية للشحن المجاني. هل تدفع أقل فعلاً؟',intro:'لا يكفي أن ترى عبارة «شحن مجاني». قارن المبلغ النهائي قبل إضافة المنتج وبعدها.',fields:['مجموع السلة الحالي','رسوم الشحن العادية','حد الشحن المجاني','سعر المنتج الإضافي'],inputs:'أدخل أربعة مبالغ',presets:'جرّب مثالاً',examples:['الإضافة توفر 2','الإضافة تكلف 2 أكثر','الحد لم يتحقق','الشحن مجاني مسبقاً'],result:'إجمالي الدفع بالمقارنة',before:'دون منتج إضافي',after:'مع المنتج الإضافي',deliveryFree:'شحن مجاني',deliveryPaid:'تضاف رسوم الشحن',less:'المبلغ الإجمالي أقل مع الإضافة',more:'المبلغ الإجمالي أعلى مع الإضافة',same:'المبلغان متساويان',invalid:'أدخل أربعة مبالغ صالحة',difference:'فرق إجمالي الدفع',line1:'السلة الأصلية مع الشحن',line2:'السلة الجديدة مع الشحن',line3:'هل تحقق حد الشحن المجاني؟',yes:'نعم',no:'لا',reset:'إعادة الضبط',notice:'مثال توضيحي فقط. لا شراء أو حفظ بيانات أو اتصال بمتجر.',legal:'عرض توضيحي فقط. يُفترض أن حد الشحن المجاني يعتمد على مجموع السلة المُدخل. لا تُحسب الضرائب أو القسائم أو السلع المستثناة أو الرسوم الأخرى أو المبالغ المستردة أو نقاط المكافآت. تغيير العملة يغير الرمز فقط دون تحويل سعر الصرف.',lang:'اللغة',region:'عملة العرض',explain:'المنتج الإضافي له ثمن. أنت تقرر إن كنت بحاجة إليه.'}
};
const scenarios=[
 {us:[47,7,50,5],jp:[4700,700,5000,500]},
 {us:[47,7,50,9],jp:[4700,700,5000,900]},
 {us:[42,7,50,2],jp:[4200,700,5000,200]},
 {us:[55,7,50,5],jp:[5500,700,5000,500]}
];
let lang=new URLSearchParams(location.search).get('lang') || (document.documentElement.lang || 'en').slice(0,2);
if(!D[lang])lang='en';
let region=(new URLSearchParams(location.search).get('region')|| (lang==='ja'?'JP':'US')).toUpperCase();
if(!['US','JP'].includes(region))region='US';
let vals=[...(region==='JP'?scenarios[0].jp:scenarios[0].us)];
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Vekunel free shipping calculator demo');
const mount=document.querySelector('main')||document.querySelector('#overview')||document.body;
mount.appendChild(root);
const d=()=>D[lang];
const currency=()=>region==='JP'?'JPY':'USD';
const money=v=>{if(!Number.isFinite(v))return '—';return new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'en-US':'en-US',{style:'currency',currency:currency(),minimumFractionDigits:region==='JP'?0:2,maximumFractionDigits:region==='JP'?0:2}).format(v)};
const spanMoney=v=>`<span class="vk-money" dir="ltr">${money(v)}</span>`;
const valid=v=>v.every((n,i)=>Number.isFinite(n)&&n>=0&&n<=100000000&& (i!==2||n>0));
function calc(v){if(!valid(v))return null;let [cart,ship,threshold,extra]=v;let bFree=cart>=threshold,aFree=cart+extra>=threshold;let before=cart+(bFree?0:ship),after=cart+extra+(aFree?0:ship);return {before,after,diff:after-before,bFree,aFree};}
function update(){const n=Array.from(root.querySelectorAll('[data-vk-field]')).map(input=>input.value.trim()===''?NaN:Number(input.value));vals=n;
 let c=calc(vals),dict=d();const status=root.querySelector('.vk-outcome');
 const before=root.querySelector('[data-vk-out="before"]'),after=root.querySelector('[data-vk-out="after"]'),diff=root.querySelector('[data-vk-out="diff"]'),label=root.querySelector('[data-vk-out="label"]');
 const bd=root.querySelector('[data-vk-out="b-del"]'),ad=root.querySelector('[data-vk-out="a-del"]'),line1=root.querySelector('[data-vk-out="line1"]'),line2=root.querySelector('[data-vk-out="line2"]'),line3=root.querySelector('[data-vk-out="line3"]');
 if(!c){status.dataset.kind='invalid';label.textContent=dict.invalid;before.textContent='—';after.textContent='—';diff.textContent='—';bd.textContent='';ad.textContent='';line1.textContent='—';line2.textContent='—';line3.textContent='—';return;}
 status.dataset.kind=c.diff>0.004?'more':c.diff<-.004?'less':'same';label.textContent=c.diff>0.004?dict.more:c.diff<-.004?dict.less:dict.same;
 before.textContent=money(c.before);after.textContent=money(c.after);diff.textContent=(c.diff>0?'+':c.diff<0?'−':'')+money(Math.abs(c.diff));
 bd.textContent=c.bFree?dict.deliveryFree:dict.deliveryPaid;ad.textContent=c.aFree?dict.deliveryFree:dict.deliveryPaid;
 line1.textContent=money(c.before);line2.textContent=money(c.after);line3.textContent=c.aFree?dict.yes:dict.no;
}
function draw(){const x=d();root.innerHTML=`<div class="vk-frame" dir="${lang==='ar'?'rtl':'ltr'}">
  <div class="vk-top"><div class="vk-logo"><span class="vk-logo-icon" aria-hidden="true">◎</span><span>VEKUNEL<small>CHECKOUT CLARITY</small></span></div><div class="vk-selects"><label>${x.lang}<select data-vk-select="lang"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></label><label>${x.region}<select data-vk-select="region"><option value="US" ${region==='US'?'selected':''}>USD</option><option value="JP" ${region==='JP'?'selected':''}>JPY</option></select></label></div></div>
  <div class="vk-headline"><p class="vk-eyebrow">${x.eye}</p><h2>${x.title}</h2><p class="vk-sub">${x.intro}</p></div>
  <div class="vk-main"><section class="vk-panel"><p class="vk-panel-heading"><b>01</b>${x.inputs}</p><div class="vk-fields">${x.fields.map((s,i)=>`<label class="vk-field"><span>${s}</span><input inputmode="decimal" type="number" min="0" max="100000000" ${i===2?'step="any"':'step="any"'} data-vk-field="${i}" aria-label="${s}" value="${Number.isFinite(vals[i])?vals[i]:''}"></label>`).join('')}</div><p class="vk-presets-label">${x.presets}</p><div class="vk-presets">${x.examples.map((s,i)=>`<button type="button" data-vk-preset="${i}">${s}</button>`).join('')}</div><p class="vk-formula">${x.explain}</p></section>
  <section class="vk-panel vk-result" aria-live="polite"><p class="vk-panel-heading"><b>02</b>${x.result}</p><div class="vk-comparison"><div class="vk-total"><span>${x.before}</span><strong class="vk-money" data-vk-out="before">—</strong><small data-vk-out="b-del"></small></div><div class="vk-total after"><span>${x.after}</span><strong class="vk-money" data-vk-out="after">—</strong><small data-vk-out="a-del"></small></div></div><div class="vk-outcome" data-kind="less"><span class="vk-outcome-label" data-vk-out="label"></span><strong class="vk-diff vk-money" dir="ltr" data-vk-out="diff"></strong><span class="vk-outcome-detail">${x.difference}</span></div><ul class="vk-steps"><li><span>${x.line1}</span><strong class="vk-money" data-vk-out="line1">—</strong></li><li><span>${x.line2}</span><strong class="vk-money" data-vk-out="line2">—</strong></li><li><span>${x.line3}</span><strong data-vk-out="line3">—</strong></li></ul><div class="vk-foot"><p>${x.notice}</p><button class="vk-reset" type="button" data-vk-reset>${x.reset}</button></div></section></div>
  <p class="vk-legal">${x.legal}</p></div>`;update();}
root.addEventListener('input',e=>{if(e.target.matches('[data-vk-field]'))update()});
root.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-vk-preset')){const index=Number(b.dataset.vkPreset);vals=[...(region==='JP'?scenarios[index].jp:scenarios[index].us)];draw()}if(b.hasAttribute('data-vk-reset')){vals=[...(region==='JP'?scenarios[0].jp:scenarios[0].us)];draw()}});
root.addEventListener('change',e=>{if(!e.target.hasAttribute('data-vk-select'))return;if(e.target.dataset.vkSelect==='lang'&&D[e.target.value])lang=e.target.value;if(e.target.dataset.vkSelect==='region'&&['JP','US'].includes(e.target.value))region=e.target.value;draw()});
draw();
})();
