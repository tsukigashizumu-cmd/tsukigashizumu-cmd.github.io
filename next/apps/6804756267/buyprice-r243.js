/* R243 — Buy Price threshold preview: educational only, no tracking / storage / purchases. */
(function(){'use strict';
const ID='bp243';if(document.getElementById(ID))return;
const DICT={
 en:{kicker:'INTERACTIVE BUY-PRICE RULE',head:'Decide your price before the sale decides for you.',sub:'A discount can look tempting. Choose your buy price first, then check whether the offer actually meets your rule.',inputs:'YOUR PRICE RULE',regular:'Regular price',target:'Your buy price',sale:'Sale discount shown',hint:'Example only: these are not live store prices or forecasts.',preset:'Try a scenario',p1:'20% off — wait',p2:'25% off — meets rule',p3:'35% off — below target',required:'DISCOUNT YOU NEED',requiredCap:'To reach the price you chose',now:'Price after sale',goal:'Your target',miss:'Still {x} above your buy price. Keep your rule.',hit:'This offer meets your chosen buy price.',invalid:'Enter a valid regular price, a buy price not above it, and a discount from 0 to 100%.',disclaimer:'Demo only. No store tracking, price predictions, alerts, saved data or purchases.',reset:'Reset example',lang:'Language',region:'Region',note:'Switching region loads a new example. No currency conversion.'},
 ja:{kicker:'購入基準を試せるデモ',head:'セールが始まる前に、買う値段を決める。',sub:'「割引されているから買う」ではなく、自分が納得できる金額を先に決める。その基準とセール価格を比較します。',inputs:'自分の購入基準',regular:'通常価格',target:'買ってもいい金額',sale:'店頭の割引率',hint:'例示用の価格です。実店舗の販売価格や予測ではありません。',preset:'比較例を試す',p1:'20%引き・まだ待つ',p2:'25%引き・条件に到達',p3:'35%引き・目標以下',required:'必要な割引率',requiredCap:'自分が決めた金額に届く条件',now:'セール後の価格',goal:'購入希望額',miss:'希望額より{x}高い。決めた基準を守る。',hit:'この価格は、あなたが決めた条件を満たします。',invalid:'通常価格と購入希望額を正しく入力してください（希望額は通常価格以下）。割引率は0〜100%。',disclaimer:'説明用のデモです。価格追跡・予測・通知・保存・購入は行いません。',reset:'例に戻す',lang:'言語',region:'地域',note:'地域を変えると例示値を読み替えます。為替換算ではありません。'},
 ar:{kicker:'تجربة تفاعلية لسعر الشراء',head:'حدد سعر الشراء قبل أن يبدأ التخفيض.',sub:'قد يبدو الخصم مغريًا. اختر السعر الذي يناسبك أولًا، ثم تحقق إن كان العرض يطابق قرارك.',inputs:'قاعدة الشراء الخاصة بك',regular:'السعر الأصلي',target:'السعر الذي تقبل شراءه',sale:'الخصم المعروض',hint:'أرقام توضيحية، وليست أسعار متاجر حية أو توقعات.',preset:'جرّب مثالًا',p1:'خصم 20% — انتظر',p2:'خصم 25% — مناسب',p3:'خصم 35% — أقل من الهدف',required:'الخصم المطلوب',requiredCap:'للوصول إلى السعر الذي اخترته',now:'السعر بعد الخصم',goal:'السعر المستهدف',miss:'ما زال أعلى من هدفك بمقدار {x}. التزم بقرارك.',hit:'هذا العرض يلبي السعر الذي اخترته.',invalid:'أدخل سعرًا أصليًا صالحًا وهدفًا لا يتجاوزه، ونسبة خصم بين 0 و100%.',disclaimer:'عرض توضيحي فقط. لا تتبع للأسعار ولا توقعات ولا تنبيهات ولا حفظ أو شراء.',reset:'إعادة المثال',lang:'اللغة',region:'المنطقة',note:'تبديل المنطقة يحمّل مثالًا مختلفًا، وليس تحويل عملة.'}
};
let lang=(document.documentElement.lang||'en').slice(0,2).toLowerCase();if(!DICT[lang])lang='en';
let region=lang==='ja'?'JP':'US',preset='p1';
const example=r=>r==='JP'?{regular:12000,target:9000,sale:20}:{regular:120,target:90,sale:20};
let state=example(region);
const t=k=>DICT[lang][k];
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Buy Price Calculator interactive price threshold');
(document.querySelector('main')||document.body).appendChild(root);
function money(n){if(!Number.isFinite(n))return '—';return new Intl.NumberFormat(lang==='ar'?'en-US':region==='JP'?'ja-JP':'en-US',{style:'currency',currency:region==='JP'?'JPY':'USD',maximumFractionDigits:region==='JP'?0:2}).format(n)}
function str(n){return Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n):'—'}
function fmtNumeric(n){return Number.isFinite(n)?(Math.round(n*100)/100).toString():''}
function evaluate(){const r=Number(state.regular),g=Number(state.target),d=Number(state.sale);
 const valid=[r,g,d].every(Number.isFinite)&&r>0&&g>0&&g<=r&&d>=0&&d<=100;
 return {valid,needed:valid?(1-g/r)*100:NaN,price:valid?r*(1-d/100):NaN, gap:valid?r*(1-d/100)-g:NaN,discount:d};}
function refresh(){let a=evaluate();let q=(s)=>root.querySelector('[data-bp-out="'+s+'"]');
 q('required').textContent=a.valid?str(a.needed)+'%':'—';q('price').textContent=money(a.price);q('goal').textContent=money(Number(state.target));
 q('fill').style.width=a.valid?Math.max(0,Math.min(100,a.discount))+'%':'0%';
 q('saleTick').textContent=a.valid?str(a.discount)+'%':'—';q('needTick').textContent=a.valid?str(a.needed)+'%':'—';
 const v=q('verdict');let good=a.valid&&a.gap<=.000001;v.dataset.good=a.valid?String(good):'error';v.textContent=!a.valid?t('invalid'):good?t('hit'):t('miss').replace('{x}',money(a.gap));}
function render(){root.dir=lang==='ar'?'rtl':'ltr';root.lang=lang;const d=DICT[lang];
root.innerHTML=`<div class="bp243-frame"><div class="bp243-top"><div><p class="bp243-kicker"><span class="bp243-pin"></span>${d.kicker}</p><h2>${d.head}</h2><p class="bp243-sub">${d.sub}</p></div><div class="bp243-locale"><select data-bp-select="lang" aria-label="${d.lang}"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select><select data-bp-select="region" aria-label="${d.region}"><option value="US" ${region==='US'?'selected':''}>US · USD</option><option value="JP" ${region==='JP'?'selected':''}>JP · JPY</option></select></div></div><div class="bp243-body"><div class="bp243-card"><p class="bp243-heading">${d.inputs}</p>
<label class="bp243-field"><span>${d.regular}</span><div class="bp243-inputwrap"><span class="bp243-currency" aria-hidden="true">${region==='JP'?'¥':'$'}</span><input data-bp-in="regular" inputmode="decimal" type="number" min="0.01" step="any" value="${state.regular}"></div></label>
<label class="bp243-field"><span>${d.target}</span><div class="bp243-inputwrap"><span class="bp243-currency" aria-hidden="true">${region==='JP'?'¥':'$'}</span><input data-bp-in="target" inputmode="decimal" type="number" min="0.01" step="any" value="${state.target}"></div></label>
<label class="bp243-field"><span>${d.sale}</span><div class="bp243-inputwrap"><span class="bp243-currency" aria-hidden="true">%</span><input data-bp-in="sale" inputmode="decimal" type="number" min="0" max="100" step="any" value="${state.sale}"></div></label>
<p class="bp243-hint">${d.hint}</p><p class="bp243-heading">${d.preset}</p><div class="bp243-presets">${['p1','p2','p3'].map((k,i)=>`<button type="button" data-bp-preset="${k}" aria-pressed="${preset===k}">${d[k]}</button>`).join('')}</div></div>
<div class="bp243-card bp243-result"><p class="bp243-overline">${d.required}</p><div class="bp243-required" data-bp-out="required">25%</div><p class="bp243-required-caption">${d.requiredCap}</p><div class="bp243-track"><span class="bp243-fill" data-bp-out="fill"></span></div><div class="bp243-ticks"><span>0%</span><span data-bp-out="saleTick">20%</span><span data-bp-out="needTick">25%</span><span>100%</span></div><div class="bp243-resultline"><div class="bp243-stat"><small>${d.now}</small><strong data-bp-out="price"></strong></div><div class="bp243-stat"><small>${d.goal}</small><strong data-bp-out="goal"></strong></div></div><div role="status" aria-live="polite" class="bp243-verdict" data-bp-out="verdict"></div></div></div>
<div class="bp243-footer"><p class="bp243-footnote">${d.disclaimer} ${d.note}</p><button type="button" class="bp243-reset" data-bp-reset>${d.reset}</button></div></div>`;
refresh();}
root.addEventListener('input',e=>{const k=e.target.dataset.bpIn;if(!k)return;state[k]=e.target.value===''?NaN:Number(e.target.value);preset='';root.querySelectorAll('[data-bp-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));refresh()});
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-bp-reset')){state=example(region);preset='p1';render();return}const p=b.dataset.bpPreset;if(p){state=example(region);state.sale={p1:20,p2:25,p3:35}[p];preset=p;render()}});
root.addEventListener('change',e=>{let k=e.target.dataset.bpSelect;if(k==='lang'&&DICT[e.target.value])lang=e.target.value;
if(k==='region'&&['JP','US'].includes(e.target.value)){region=e.target.value;state=example(region);preset='p1'}
if(k)render()});render();
})();
