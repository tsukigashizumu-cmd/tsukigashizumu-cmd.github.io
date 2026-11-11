/* TSZ LP R156: Discount Stack / independent language, numeral and currency presentation.
   Educational local-only example. Currency selection is NOT exchange-rate conversion. */
(()=>{'use strict';
const ID='tsz-discountstack-r156';if(document.getElementById(ID))return;
const translations={
 ja:{eyebrow:'DISCOUNT STACK / FORMAT LENS',heading:'計算は同じ。表示は、自分で選べる。',intro:'言語・数字表記・通貨ラベルは別々に選べます。割引の計算結果と、画面での見え方をそれぞれ確認してください。',language:'画面の言語',numerals:'数字の形',currency:'通貨ラベル',latn:'0123456789',arab:'٠١٢٣٤٥٦٧٨٩',before:'定価',first:'1回目の割引',second:'2回目の割引',tax:'税率',net:'2回の割引後',result:'支払見込み額（税込）',rate:'実質の割引率',demo:'表示を変えて試す',formula:'計算の順序',reset:'最初の例に戻す',tip:'言語・数字・通貨ラベルを変えても、割引計算に使用する数量は同じです。',notice:'通貨を選び直しても、為替換算は行いません。「JPY」「USD」「EUR」は表示用ラベルです。',invalid:'定価は0より大きい数字、割引率・税率は0〜100で入力してください。',sample:'初期例：定価1,000／30%引き→さらに20%引き／税8%',footer:'説明用Webデモです。実アプリ画面ではなく、入力は端末に保存・送信しません。通貨ラベルの変更は換算ではありません。店舗ごとの税・割引条件は異なります。'},
 en:{eyebrow:'DISCOUNT STACK / FORMAT LENS',heading:'Same calculation. Your choice of display.',intro:'Language, numeral style and currency label are independent. Change how the example looks without changing the arithmetic.',language:'Interface language',numerals:'Numeral style',currency:'Currency label',latn:'0123456789',arab:'٠١٢٣٤٥٦٧٨٩',before:'Shelf price',first:'First discount',second:'Second discount',tax:'Tax rate',net:'After both discounts',result:'Estimated checkout (incl. tax)',rate:'Effective discount',demo:'Change the presentation',formula:'Order of calculation',reset:'Reset example',tip:'Language, numeral style and currency label can change independently. The underlying amount stays the same.',notice:'Choosing a different currency label does NOT convert exchange rates. “JPY”, “USD” and “EUR” are display labels only.',invalid:'Enter a positive shelf price and discount and tax rates from 0 to 100.',sample:'Example: 1,000 / 30% off, then 20% off / 8% tax',footer:'Website illustration only, not an actual app screen. No inputs are stored or sent. Currency labels are not conversions; store-specific discount and tax rules vary.'},
 ar:{eyebrow:'DISCOUNT STACK / FORMAT LENS',heading:'الحساب نفسه. طريقة العرض حسب اختيارك.',intro:'يمكن تغيير لغة الواجهة وشكل الأرقام ورمز العملة بشكل مستقل، من دون تغيير الحساب نفسه.',language:'لغة الواجهة',numerals:'شكل الأرقام',currency:'رمز العملة',latn:'0123456789',arab:'٠١٢٣٤٥٦٧٨٩',before:'السعر الأساسي',first:'الخصم الأول',second:'الخصم الثاني',tax:'الضريبة',net:'بعد الخصمين',result:'المبلغ المتوقع بعد الضريبة',rate:'نسبة الخصم الفعلية',demo:'غيّر طريقة العرض',formula:'ترتيب الحساب',reset:'إعادة المثال',tip:'تغيير اللغة أو الأرقام أو رمز العملة لا يغيّر المبلغ المحسوب.',notice:'تغيير رمز العملة لا يُجري أي تحويل بسعر الصرف. رموز JPY وUSD وEUR للتوضيح فقط.',invalid:'أدخل سعراً موجباً ونسب خصم وضريبة بين 0 و100.',sample:'مثال: ١٬٠٠٠ / خصم ٣٠٪ ثم ٢٠٪ / ضريبة ٨٪',footer:'مثال تفاعلي على الموقع فقط، وليس شاشة التطبيق. لا تُحفظ المدخلات أو تُرسل. رموز العملات ليست تحويلات؛ تختلف الضرائب وشروط العروض.'}
};
const defaults={language:'ja',numerals:'latn',currency:'USD',price:'1000',first:'30',second:'20',tax:'8'};
const state={...defaults};
const host=document.querySelector('#overview')||document.querySelector('main')||document.body;
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Discount Stack independent display formats website demonstration');host.insertAdjacentElement('afterend',root);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmt(n,decimals=2){return new Intl.NumberFormat(state.numerals==='arab'?'ar-EG':'en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals,useGrouping:true}).format(Math.abs(n)<1e-9?0:n);}
function value(){const nums=['price','first','second','tax'].map(k=>state[k].trim()===''?NaN:Number(state[k]));let [price,first,second,tax]=nums;
 if(!nums.every(Number.isFinite)||price<=0||price>1e10||[first,second,tax].some(x=>x<0||x>100))return null;
 const net=price*(1-first/100)*(1-second/100),total=net*(1+tax/100),rate=(1-(1-first/100)*(1-second/100))*100;
 return {price,first,second,tax,net,total,rate};}
function opt(val,label,current){return `<option value="${esc(val)}" ${val===current?'selected':''}>${esc(label)}</option>`;}
function field(id,label,min,max){return `<label class="ds156-field" for="ds156-${id}"><span>${label}</span><input id="ds156-${id}" type="number" inputmode="decimal" step="any" min="${min}" max="${max}" value="${esc(state[id])}"></label>`;}
function mount(){const t=translations[state.language];root.lang=state.language;root.dir=state.language==='ar'?'rtl':'ltr';
 root.innerHTML=`<div class="ds156-wrap"><div class="ds156-intro"><p class="ds156-eyebrow">${t.eyebrow}</p><h2>${t.heading}</h2><p>${t.intro}</p></div>
 <div class="ds156-chooser" aria-label="${t.demo}">
 <label>${t.language}<select id="ds156-language">${opt('ja','日本語',state.language)}${opt('en','English',state.language)}${opt('ar','العربية',state.language)}</select></label>
 <label>${t.numerals}<select id="ds156-numerals">${opt('latn',t.latn,state.numerals)}${opt('arab',t.arab,state.numerals)}</select></label>
 <label>${t.currency}<select id="ds156-currency">${opt('USD','USD',state.currency)}${opt('JPY','JPY',state.currency)}${opt('EUR','EUR',state.currency)}</select></label></div>
 <div class="ds156-grid"><div class="ds156-editor"><p class="ds156-section-label">01 / ${t.before} → ${t.first} → ${t.second}</p><p class="ds156-small">${t.sample}</p><div class="ds156-fields">${field('price',t.before,'0.01','10000000000')}${field('first',t.first+' (%)','0','100')}${field('second',t.second+' (%)','0','100')}${field('tax',t.tax+' (%)','0','100')}</div><button id="ds156-reset" type="button" class="ds156-reset">↺ ${t.reset}</button></div>
 <div class="ds156-results"><p class="ds156-section-label">02 / ${t.result}</p><div class="ds156-outcome"><span data-test="currency">${state.currency}</span><strong data-test="total">—</strong></div><div class="ds156-breakdown"><div><span>${t.net}</span><strong data-test="net">—</strong></div><div><span>${t.rate}</span><strong data-test="rate">—</strong></div></div><p class="ds156-formula-label">${t.formula}</p><p class="ds156-formula" data-test="formula"></p><p class="ds156-status" role="status" data-test="status"></p><div class="ds156-tip">${t.tip}</div></div></div>
 <div class="ds156-note"><span aria-hidden="true">ⓘ</span><div><strong>${t.notice}</strong><p>${t.footer}</p></div></div></div>`;
 for(const k of ['language','numerals','currency'])root.querySelector('#ds156-'+k).addEventListener('change',e=>{state[k]=e.target.value;mount()});
 for(const k of ['price','first','second','tax'])root.querySelector('#ds156-'+k).addEventListener('input',e=>{state[k]=e.target.value;render()});
 root.querySelector('#ds156-reset').addEventListener('click',()=>{Object.assign(state,defaults);mount()});render();}
function render(){const t=translations[state.language],r=value();const one=k=>root.querySelector('[data-test="'+k+'"]');one('currency').textContent=state.currency;
 if(!r){for(const k of ['total','net','rate','formula'])one(k).textContent='—';one('status').textContent=t.invalid;return;}
 one('total').textContent=fmt(r.total);one('net').textContent=fmt(r.net);one('rate').textContent=fmt(r.rate)+'%';
 one('formula').textContent=fmt(r.price)+' × (1−'+fmt(r.first,0)+'%) × (1−'+fmt(r.second,0)+'%) × (1+'+fmt(r.tax,0)+'%)';one('status').textContent='';}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
