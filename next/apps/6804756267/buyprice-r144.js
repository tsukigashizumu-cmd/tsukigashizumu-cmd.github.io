/* Buy Price R144: web-only price threshold explainer. No store lookup, monitoring, storage, or network. */
(()=>{
'use strict';
const ID='tsz-buyprice-r144';
if(document.getElementById(ID))return;
const langSelect=document.getElementById('p199-language');
const query=new URLSearchParams(window.location.search);
const chooseLang=s=>String(s||'en').toLowerCase().startsWith('ar')?'ar':String(s||'en').toLowerCase().startsWith('ja')?'ja':'en';
let lang=chooseLang(query.get('lang')||(langSelect&&langSelect.value)||document.documentElement.lang||navigator.language);
const tx={
 ja:{eyebrow:'BUY PRICE · BEFORE THE SALE',title:'安く見える。でも、自分の「買う値段」には届いた？',lead:'先に決めた購入上限に、セール価格が本当に届くかを検算。値引き・追加クーポン・税を変えて比べてください。',label:'LP専用シミュレーション · 金額は架空の単位',price:'支払額の試算',target:'自分で決めた購入上限',yes:'上限以下。条件を満たしています。',no:'まだ上限より高い。',same:'ちょうど上限です。',gapAbove:'上限を超える額',gapBelow:'上限より安い額',minimum:'この条件で必要な最初の値引き率',readout:'セール表示よりも、最終的な支払額を見る。',before:'通常価格',sale:'セール値引き（%）',coupon:'追加クーポン（%）',tax:'税率（%）',goal:'購入上限',offer:'セール例を試す',low:'25%引き',high:'32%引き',reset:'LPサンプルを戻す',formula:'適用順：通常価格 → セール値引き → 追加クーポン → 税。2つの値引き率は足し算しません。',error:'入力を確認してください。通常価格と購入上限は0より大きく、購入上限は通常価格以下。割引は0〜99%、税率は0〜30%です。',footer:'ページ内の計算のみ。店舗価格の取得、販売予測、通知、比較の保存、購入処理は行いません。実アプリのデータには影響しません。',units:'単位',off:'%引き'},
 en:{eyebrow:'BUY PRICE · BEFORE THE SALE',title:'It looks cheaper. But does it meet your buy price?',lead:'Check whether an offer really reaches the price you decided before the sale. Change the markdown, extra coupon, and tax.',label:'Website-only simulation · illustrative price units',price:'Estimated final cost',target:'Your buying limit',yes:'At or below your limit.',no:'Still above your limit.',same:'Exactly at your limit.',gapAbove:'Amount above your limit',gapBelow:'Amount below your limit',minimum:'Minimum first markdown with these settings',readout:'Check what you pay, not just the sale label.',before:'Regular price',sale:'Sale discount (%)',coupon:'Extra coupon (%)',tax:'Tax rate (%)',goal:'Your price limit',offer:'Try a sample offer',low:'25% off',high:'32% off',reset:'Reset website sample',formula:'Order: regular price → sale discount → extra coupon → tax. Percentage discounts are multiplied, not added.',error:'Check the inputs. Prices must be above zero; the limit may not exceed regular price. Discounts: 0–99%; tax: 0–30%.',footer:'On-page arithmetic only. No live store prices, sale predictions, alerts, saved comparisons, or purchases. Your app data is untouched.',units:'units',off:'% off'},
 ar:{eyebrow:'سعر الشراء · قبل التخفيض',title:'يبدو أرخص. لكن هل وصل إلى السعر الذي حددته؟',lead:'تحقق مما إذا كان العرض يصل إلى السعر الذي اخترته قبل بدء التخفيض. جرّب تغيير الخصم والقسيمة والضريبة.',label:'محاكاة داخل صفحة الويب · أسعار توضيحية',price:'التكلفة النهائية المتوقعة',target:'الحد الذي حددته للشراء',yes:'السعر ضمن الحد الذي حددته.',no:'السعر ما زال أعلى من الحد.',same:'السعر يساوي الحد تمامًا.',gapAbove:'المبلغ فوق الحد',gapBelow:'المبلغ دون الحد',minimum:'أقل خصم أول مطلوب بهذه الإعدادات',readout:'تحقق من المبلغ النهائي، لا من نسبة الخصم وحدها.',before:'السعر الأصلي',sale:'خصم العرض (%)',coupon:'قسيمة إضافية (%)',tax:'الضريبة (%)',goal:'حد الشراء',offer:'جرّب أحد العروض',low:'خصم 25%',high:'خصم 32%',reset:'إعادة ضبط مثال الويب',formula:'الترتيب: السعر الأصلي ← خصم العرض ← القسيمة الإضافية ← الضريبة. لا تُجمع نسب الخصم مباشرة.',error:'تحقق من المدخلات. يجب أن تكون الأسعار أكبر من صفر، وألا يتجاوز حد الشراء السعر الأصلي. الخصومات 0–99%، والضريبة 0–30%.',footer:'هذه حسابات داخل الصفحة فقط، بلا أسعار مباشرة أو توقعات أو تنبيهات أو حفظ للمقارنات أو عمليات شراء. لا تتغير بيانات التطبيق.',units:'وحدة',off:'% خصم'}
};
const initial=()=>({regular:120,goal:90,sale:25,coupon:0,tax:8,sample:25});
let state=initial();
const section=document.createElement('section');section.id=ID;section.setAttribute('aria-labelledby','bp144-title');
(document.querySelector('#p199-content .p199-body')||document.querySelector('#p199-content')||document.querySelector('main')||document.body).appendChild(section);
const fmt=n=>Number.isFinite(n)?n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';
const num=s=>s===''?NaN:Number(s);
function compute(){const {regular,goal,sale,coupon,tax}=state;
 if(![regular,goal,sale,coupon,tax].every(Number.isFinite)||regular<=0||regular>1000000||goal<=0||goal>regular||sale<0||sale>99||coupon<0||coupon>99||tax<0||tax>30)return {valid:false};
 const out=regular*(1-sale/100)*(1-coupon/100)*(1+tax/100);
 const threshold=Math.max(0,100*(1-goal/(regular*(1-coupon/100)*(1+tax/100))));
 const delta=out-goal;return {valid:true,out,threshold,delta,status:Math.abs(delta)<0.005?'same':delta<0?'yes':'no'};
}
function draw(){const w=tx[lang],r=compute();section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
 const field=(key,label)=>`<label class="bp144-field"><span>${label}</span><input id="bp144-${key}" type="number" inputmode="decimal" step="any" value="${Number.isFinite(state[key])?state[key]:''}" ${['sale','coupon'].includes(key)?'min="0" max="99"':key==='tax'?'min="0" max="30"':'min="0.01"'}></label>`;
 section.innerHTML=`<header class="bp144-head"><p class="bp144-overline">${w.eyebrow}</p><h2 id="bp144-title">${w.title}</h2><p class="bp144-intro">${w.lead}</p><p class="bp144-caption">${w.label}</p></header>
 <div class="bp144-grid"><div class="bp144-stage"><div class="bp144-subhead">${w.price}</div><div class="bp144-big" data-bp144-cost="${r.valid?fmt(r.out):'error'}" dir="ltr">${r.valid?fmt(r.out):'—'}</div><div class="bp144-unit">${w.units}</div>
 <div class="bp144-comparison"><div><span>${w.target}</span><strong dir="ltr" data-bp144-goal>${r.valid?fmt(state.goal):'—'}</strong></div><div><span>${r.valid?(r.delta<0?w.gapBelow:w.gapAbove):w.gapAbove}</span><strong dir="ltr" data-bp144-gap>${r.valid?fmt(Math.abs(r.delta)):'—'}</strong></div></div>
 <div class="bp144-result" data-bp144-status="${r.valid?r.status:'error'}" role="status">${r.valid?w[r.status]:w.error}</div>
 <div class="bp144-progress-label"><span>${w.minimum}</span><strong data-bp144-threshold dir="ltr">${r.valid?fmt(r.threshold)+'%':'—'}</strong></div>
 <div class="bp144-meter" role="presentation"><div class="bp144-meter-fill" style="width:${r.valid?Math.min(100,r.threshold):0}%"></div></div><p class="bp144-insight">${w.readout}</p></div>
 <div class="bp144-form"><h3>${w.offer}</h3><div class="bp144-presets"><button type="button" data-bp144-sale="25" aria-pressed="${state.sample===25}">${w.low}</button><button type="button" data-bp144-sale="32" aria-pressed="${state.sample===32}">${w.high}</button></div>
 <div class="bp144-fields">${field('regular',w.before)}${field('goal',w.goal)}${field('sale',w.sale)}${field('coupon',w.coupon)}${field('tax',w.tax)}</div>
 <p class="bp144-formula">${w.formula}</p><p class="bp144-error" data-bp144-error role="alert">${r.valid?'':w.error}</p><button class="bp144-reset" type="button" id="bp144-reset">${w.reset}</button></div></div>
 <p class="bp144-footer">${w.footer}</p>`;
 section.querySelectorAll('[data-bp144-sale]').forEach(btn=>btn.addEventListener('click',()=>{state.sale=Number(btn.dataset.bp144Sale);state.sample=state.sale;draw();}));
 ['regular','goal','sale','coupon','tax'].forEach(key=>{section.querySelector('#bp144-'+key).addEventListener('change',e=>{state[key]=num(e.target.value.trim());if(key==='sale')state.sample=null;draw();});});
 section.querySelector('#bp144-reset').addEventListener('click',()=>{state=initial();draw();});
}
if(langSelect)langSelect.addEventListener('change',()=>{lang=chooseLang(langSelect.value);draw();});
draw();
})();
