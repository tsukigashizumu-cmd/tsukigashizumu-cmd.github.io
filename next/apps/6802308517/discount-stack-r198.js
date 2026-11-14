/* R198 P2 Discount Stack: scoped P1-approved interactive calculator integrated with existing LP controls.
   No persistent storage, global document changes, tracking, deployment or external fetches. */
(()=>{'use strict';
const APP='6802308517',MOUNT='tsz-discount-stack-r198';
function init(){
 const id=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
 if(id!==APP||document.getElementById(MOUNT))return;
 const anchor=document.querySelector('.p19-breadcrumb');if(!anchor?.parentNode)return;
 const mount=document.createElement('section');mount.id=MOUNT;
 mount.setAttribute('aria-label','Discount Stack interactive preview');
 mount.innerHTML=
"<div class=\"ds198-root\" dir=\"ltr\" id=\"ds198\">\n<div aria-hidden=\"true\" class=\"ds198-aurora\"></div>\n<div class=\"ds198-shell\">\n\n<main class=\"ds198-main\" id=\"ds198-top\">\n<section aria-labelledby=\"ds198-title\" class=\"ds198-intro\">\n<p class=\"ds198-overline\"><span class=\"ds198-stroke\"></span><span data-i18n=\"eyebrow\">A CLEARER WAY TO CHECK OUT</span></p>\n<h1 data-i18n-html=\"headline\" id=\"ds198-title\">Two discounts.<br/><em>One real price.</em></h1>\n<p class=\"ds198-deck\" data-i18n=\"subheadline\">30% off, then 20% off. That's 44% before tax — not 50%.</p>\n<div aria-label=\"Two discount comparison\" class=\"ds198-comparison\">\n<div class=\"ds198-assumed\"><span data-i18n=\"assumed\">Added together</span><b id=\"ds198-summed\">50%</b></div>\n<span aria-hidden=\"true\" class=\"ds198-versus\">≠</span>\n<div class=\"ds198-actual\"><span data-i18n=\"actual\">Actual discount</span><b id=\"ds198-effective\">44%</b></div>\n</div>\n<p class=\"ds198-intro-note\" data-i18n=\"introNote\">The second discount applies to the price that's left — not the original price.</p>\n<a class=\"ds198-primary\" href=\"https://apps.apple.com/us/app/discount-stack/id6802308517\" id=\"ds198-store-main\" rel=\"noopener noreferrer\" target=\"_blank\"><span aria-hidden=\"true\" class=\"ds198-primary-apple\">◈</span><span data-i18n=\"store\">View on App Store</span><span aria-hidden=\"true\">↗</span></a>\n<p class=\"ds198-undercta\" data-i18n=\"undercta\">Save, search and reuse calculations in the app.</p>\n</section>\n<section aria-labelledby=\"ds198-calc-title\" class=\"ds198-calc\" id=\"ds198-try\">\n<div class=\"ds198-calc-header\"><div><p class=\"ds198-calc-eyebrow\" data-i18n=\"tryLabel\">INTERACTIVE PREVIEW</p><h2 data-i18n=\"calculator\" id=\"ds198-calc-title\">Watch the price change</h2></div><span aria-hidden=\"true\" class=\"ds198-live-dot\"></span></div>\n<div class=\"ds198-entry\">\n<label data-i18n=\"startingPrice\" for=\"ds198-price\">Starting price</label>\n<span class=\"ds198-money-entry\"><span id=\"ds198-currency-symbol\">$</span><input aria-describedby=\"ds198-price-error\" id=\"ds198-price\" inputmode=\"decimal\" max=\"99999999\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"100\"/></span>\n</div>\n<p aria-live=\"polite\" class=\"ds198-error\" id=\"ds198-price-error\" role=\"status\"></p>\n<div class=\"ds198-step\">\n<div class=\"ds198-stephead\"><span class=\"ds198-stepnum\">01</span><div><span class=\"ds198-step-label\" data-i18n=\"firstDiscount\">First discount</span><span class=\"ds198-step-explain\" data-i18n=\"firstDesc\">Applied to the original price</span></div></div>\n<div aria-label=\"First discount\" class=\"ds198-chipgroup\" id=\"ds198-first-chips\"><button data-first=\"10\" type=\"button\">10%</button><button data-first=\"20\" type=\"button\">20%</button><button aria-pressed=\"true\" class=\"is-active\" data-first=\"30\" type=\"button\">30%</button></div>\n<div class=\"ds198-after\"><span data-i18n=\"afterFirst\">Price after first discount</span><strong id=\"ds198-after-first\">$70.00</strong></div>\n</div>\n<div class=\"ds198-step\">\n<div class=\"ds198-stephead\"><span class=\"ds198-stepnum\">02</span><div><span class=\"ds198-step-label\" data-i18n=\"secondDiscount\">Second discount</span><span class=\"ds198-step-explain\" data-i18n=\"secondDesc\">Applied to the reduced price</span></div></div>\n<div aria-label=\"Second discount\" class=\"ds198-chipgroup\" id=\"ds198-second-chips\"><button data-second=\"10\" type=\"button\">10%</button><button data-second=\"15\" type=\"button\">15%</button><button aria-pressed=\"true\" class=\"is-active\" data-second=\"20\" type=\"button\">20%</button></div>\n<div class=\"ds198-after\"><span data-i18n=\"afterSecond\">Price after both discounts</span><strong id=\"ds198-after-second\">$56.00</strong></div>\n</div>\n<div class=\"ds198-taxline\"><label class=\"ds198-tax-toggle\" for=\"ds198-tax-enabled\"><input checked=\"\" id=\"ds198-tax-enabled\" type=\"checkbox\"/><span aria-hidden=\"true\" class=\"ds198-tax-check\">✓</span><span data-i18n=\"taxLabel\">Add optional sales tax</span></label><label class=\"ds198-tax-rate\"><span class=\"ds198-sr\" data-i18n=\"taxRate\">Tax rate</span><select aria-label=\"Tax rate\" id=\"ds198-tax-rate\"><option value=\"0\">0%</option><option value=\"5\">5%</option><option selected=\"\" value=\"8\">8%</option><option value=\"10\">10%</option><option value=\"12\">12%</option></select></label></div>\n<div aria-live=\"polite\" class=\"ds198-total\"><div class=\"ds198-total-main\"><span data-i18n=\"pay\">Estimated checkout price</span><strong id=\"ds198-final\">$60.48</strong></div><div class=\"ds198-total-sub\"><div><span data-i18n=\"netSavings\">Saved after tax</span><b id=\"ds198-savings\">$39.52</b></div><div><span data-i18n=\"netRate\">Net savings</span><b id=\"ds198-rate\">39.52%</b></div></div></div>\n<div class=\"ds198-calc-footer\"><p data-i18n=\"sampleNote\">Sample only · No prices are forecast. Tax treatment varies by location.</p><button data-i18n=\"reset\" id=\"ds198-reset\" type=\"button\">Reset ↺</button></div>\n<p class=\"ds198-region-note\" data-i18n=\"regionNote\" id=\"ds198-region-note\">US and JP use separate sample amounts. This is not currency conversion.</p>\n</section>\n</main>\n<div class=\"ds198-footer\" id=\"ds198-explain\"><div aria-hidden=\"true\" class=\"ds198-footer-mark\">01 <span>→</span> 02 <span>→</span> ✓</div><p data-i18n=\"footer\">The real price, before you pay.</p><a href=\"https://apps.apple.com/us/app/discount-stack/id6802308517\" id=\"ds198-store-bottom\" rel=\"noopener noreferrer\" target=\"_blank\"><span data-i18n=\"store\">View on App Store</span> ↗</a></div>\n</div>\n</div>";
 anchor.insertAdjacentElement('afterend',mount);
 const root=mount.querySelector('#ds198');if(!root)return;root.dataset.ready='1';
 const $=id=>root.querySelector('#'+id);
const tr={
 en:{navTry:'Try it',navWhy:'How it works',languageLabel:'Language',regionLabel:'Region',storeShort:'App Store',eyebrow:'A CLEARER WAY TO CHECK OUT',headline:'Two discounts.<br><em>One real price.</em>',subheadline:"30% off, then 20% off. That's 44% before tax — not 50%.",assumed:'Added together',actual:'Actual discount',introNote:"The second discount applies to the price that's left — not the original price.",store:'View on App Store',undercta:'Save, search and reuse calculations in the app.',tryLabel:'INTERACTIVE PREVIEW',calculator:'Watch the price change',startingPrice:'Starting price',firstDiscount:'First discount',firstDesc:'Applied to the original price',secondDiscount:'Second discount',secondDesc:'Applied to the reduced price',afterFirst:'After first discount',afterSecond:'After both discounts',taxLabel:'Add optional sales tax',taxRate:'Tax rate',pay:'Estimated checkout price',netSavings:'Saved after tax',netRate:'Net savings',sampleNote:'Sample only · No prices are forecast. Tax treatment varies by location.',reset:'Reset ↺',regionNote:'US and JP use separate sample amounts. This is not currency conversion.',footer:'The real price, before you pay.',priceError:'Enter a positive price.',priceTooHigh:'Enter a price below 100,000,000.',noteDifference:'Two discounts are applied one after another.'},
 ja:{navTry:'試してみる',navWhy:'仕組み',languageLabel:'言語',regionLabel:'地域',storeShort:'App Store',eyebrow:'支払う前に、金額をはっきりと',headline:'割引は2回。<br><em>答えはひとつ。</em>',subheadline:'30%引きのあと20%引き。合計50%ではなく、実際は44%引き。',assumed:'足しただけの割引率',actual:'実際の割引率',introNote:'2回目の割引は元の価格ではなく、1回目の割引後の価格に適用されます。',store:'App Storeで見る',undercta:'アプリでは計算条件の保存・検索・再利用もできます。',tryLabel:'操作できるプレビュー',calculator:'支払額の変化を試す',startingPrice:'元の価格',firstDiscount:'1回目の割引',firstDesc:'元の価格から計算',secondDiscount:'2回目の割引',secondDesc:'値引き後の価格から計算',afterFirst:'1回目の割引後',afterSecond:'2回目の割引後',taxLabel:'税金を加える（任意）',taxRate:'税率',pay:'支払見込み額',netSavings:'税込みでの節約額',netRate:'実質節約率',sampleNote:'計算例です · 将来価格の予測ではありません。税の扱いは地域で異なります。',reset:'初期化 ↺',regionNote:'USとJPは別々のサンプル金額です。為替換算ではありません。',footer:'レジの前に、本当の金額を。',priceError:'0より大きい金額を入力してください。',priceTooHigh:'100,000,000未満の金額を入力してください。',noteDifference:'割引は順番に適用します。'},
 ar:{navTry:'جرّب الآن',navWhy:'كيف يعمل',languageLabel:'اللغة',regionLabel:'المنطقة',storeShort:'App Store',eyebrow:'اعرف السعر قبل الدفع',headline:'خصمان متتاليان.<br><em>سعر واحد واضح.</em>',subheadline:'خصم 30٪ ثم 20٪ يعني خصمًا فعليًا 44٪ قبل الضريبة، لا 50٪.',assumed:'الجمع البسيط',actual:'الخصم الفعلي',introNote:'يُطبَّق الخصم الثاني على السعر بعد الخصم الأول، وليس على السعر الأصلي.',store:'عرض في App Store',undercta:'احفظ الحسابات وابحث عنها وأعد استخدامها داخل التطبيق.',tryLabel:'تجربة تفاعلية',calculator:'شاهد تغيّر السعر',startingPrice:'السعر الأصلي',firstDiscount:'الخصم الأول',firstDesc:'من السعر الأصلي',secondDiscount:'الخصم الثاني',secondDesc:'من السعر بعد الخصم الأول',afterFirst:'بعد الخصم الأول',afterSecond:'بعد الخصمين',taxLabel:'إضافة ضريبة اختيارية',taxRate:'نسبة الضريبة',pay:'السعر التقديري للدفع',netSavings:'المبلغ الموفَّر بعد الضريبة',netRate:'نسبة التوفير النهائية',sampleNote:'مثال فقط · لا نتنبأ بالأسعار. تختلف الضرائب حسب المنطقة.',reset:'إعادة ضبط ↺',regionNote:'للولايات المتحدة واليابان مبالغ تجريبية منفصلة. لا يتم تحويل العملات.',footer:'السعر الحقيقي قبل الدفع.',priceError:'أدخل سعرًا أكبر من الصفر.',priceTooHigh:'أدخل سعرًا أقل من 100,000,000.',noteDifference:'يُطبَّق الخصمان بالتتابع.'}
};
const state={lang:'en',region:'us',d1:30,d2:20,tax:8,withTax:true};
const sample=r=>r==='jp'?12000:100;
const el={price:$('ds198-price'),tax:$('ds198-tax-rate'),enabled:$('ds198-tax-enabled'),error:$('ds198-price-error')};
const money=x=>{const n=Number.isFinite(x)?x:0;return new Intl.NumberFormat(state.lang==='ja'?'ja-JP':state.lang==='ar'?'en-US':'en-US',{style:'currency',currency:state.region==='jp'?'JPY':'USD',minimumFractionDigits:state.region==='jp'?0:2,maximumFractionDigits:state.region==='jp'?0:2}).format(n);};
const percent=n=>(Math.round((n+Number.EPSILON)*100)/100).toLocaleString('en-US',{maximumFractionDigits:2})+'%';
function storeLinks(){const url='https://apps.apple.com/'+state.region+'/app/discount-stack/id6802308517';['ds198-store-main','ds198-store-bottom'].forEach(id=>{const link=$(id);if(link)link.href=url;});}
function refresh(){const price=Number(el.price.value);const valid=el.price.value.trim()!==''&&Number.isFinite(price)&&price>0&&price<100000000;
 el.error.textContent=valid?'':(price>=100000000?tr[state.lang].priceTooHigh:tr[state.lang].priceError);
 el.price.setAttribute('aria-invalid',String(!valid));
 const effective=(1-(1-state.d1/100)*(1-state.d2/100))*100;
 $('ds198-summed').textContent=percent(state.d1+state.d2);
 $('ds198-effective').textContent=percent(effective);
 const outputs=['ds198-after-first','ds198-after-second','ds198-final','ds198-savings','ds198-rate'];
 if(!valid){outputs.forEach(id=>$(id).textContent='—');return;}
 const first=price*(1-state.d1/100),second=first*(1-state.d2/100),final=second*(1+(state.withTax?state.tax:0)/100);
 $('ds198-after-first').textContent=money(first);$('ds198-after-second').textContent=money(second);$('ds198-final').textContent=money(final);$('ds198-savings').textContent=money(price-final);$('ds198-rate').textContent=percent((1-final/price)*100);
 root.querySelectorAll('[data-first]').forEach(b=>{const selected=Number(b.dataset.first)===state.d1;b.classList.toggle('is-active',selected);b.setAttribute('aria-pressed',String(selected))});
 root.querySelectorAll('[data-second]').forEach(b=>{const selected=Number(b.dataset.second)===state.d2;b.classList.toggle('is-active',selected);b.setAttribute('aria-pressed',String(selected))});
}
function translate(){root.setAttribute('dir',state.lang==='ar'?'rtl':'ltr');root.setAttribute('lang',state.lang);
 root.querySelectorAll('[data-i18n]').forEach(n=>{const s=tr[state.lang][n.dataset.i18n];if(s!==undefined)n.textContent=s});
 root.querySelectorAll('[data-i18n-html]').forEach(n=>{const s=tr[state.lang][n.dataset.i18nHtml];if(s!==undefined)n.innerHTML=s});
 $('ds198-currency-symbol').textContent=state.region==='jp'?'¥':'$';
 storeLinks();refresh();}
function reset(){state.d1=30;state.d2=20;state.withTax=true;state.tax=8;el.price.value=String(sample(state.region));el.tax.value='8';el.enabled.checked=true;translate();}
el.price.addEventListener('input',refresh);
root.querySelectorAll('[data-first]').forEach(b=>b.addEventListener('click',()=>{state.d1=Number(b.dataset.first);refresh()}));
root.querySelectorAll('[data-second]').forEach(b=>b.addEventListener('click',()=>{state.d2=Number(b.dataset.second);refresh()}));
el.tax.addEventListener('change',()=>{state.tax=Number(el.tax.value);refresh()});
el.enabled.addEventListener('change',()=>{state.withTax=el.enabled.checked;el.tax.disabled=!state.withTax;refresh()});
$('ds198-reset').addEventListener('click',()=>{el.tax.disabled=false;reset()});

function findSelect(kind){
 const selectors=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
 for(const selector of selectors){const n=document.querySelector(selector);if(n?.tagName==='SELECT'&&!mount.contains(n))return n;}
 return null;
}
function currentLanguage(){
 const value=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
 return value.startsWith('ja')?'ja':value.startsWith('ar')?'ar':'en';
}
function currentRegion(){
 const value=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();
 return value==='jp'?'jp':'us';
}
function sync(){
 const language=currentLanguage(),region=currentRegion();
 if(language===state.lang&&region===state.region)return;
 const regionChanged=region!==state.region;
 state.lang=language;state.region=region;
 if(regionChanged){el.tax.disabled=false;reset();}else translate();
}
document.addEventListener('change',event=>{if(event.target===findSelect('language')||event.target===findSelect('country'))sync()},true);
window.addEventListener('popstate',sync);
for(const kind of ['language','country']){
 const node=findSelect(kind);
 if(node){const observer=new MutationObserver(sync);observer.observe(node,{attributes:true,childList:true,subtree:true});}
}
reset();sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
