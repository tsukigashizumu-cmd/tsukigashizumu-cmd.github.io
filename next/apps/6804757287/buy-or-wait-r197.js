/* TSZ LP R197 P2 / P1-approved comparison, integrated after existing breadcrumb. No storage/tracking. */
(()=>{'use strict';
const APP='6804757287', MOUNT='tsz-buy-or-wait-r197';
function init(){
 const id=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
 if(id!==APP||document.getElementById(MOUNT))return;
 const anchor=document.querySelector('.p19-breadcrumb');
 if(!anchor?.parentNode)return;
 const mount=document.createElement('section');mount.id=MOUNT;mount.setAttribute('aria-label','Buy or Wait Calculator interactive preview');
 mount.innerHTML="<div class=\"bw197-shell\" id=\"bw197-preview-top\">\n<div aria-hidden=\"true\" class=\"bw197-aura\"></div>\n\n<div class=\"bw197-main\">\n<section aria-labelledby=\"bw197-title\" class=\"bw197-hero\">\n<div class=\"bw197-eyebrow\"><span aria-hidden=\"true\" class=\"bw197-mini-line\"></span><span id=\"bw197-kicker\">A BETTER QUESTION BEFORE BUYING</span></div>\n<h2 id=\"bw197-title\">Is the saving<br/><em>worth the wait?</em></h2>\n<p class=\"bw197-lead\" id=\"bw197-lead\">What would you save by waiting?<br/>How long would that take?</p>\n<p class=\"bw197-body\" id=\"bw197-description\">Compare a price today with a price you'd be happy to pay. Your time belongs in the decision too.</p>\n<a class=\"bw197-primary\" href=\"https://apps.apple.com/us/app/buy-or-wait-calculator/id6804757287\" id=\"bw197-hero-link\" rel=\"noopener noreferrer\" target=\"_blank\"><span id=\"bw197-hero-cta\">View on App Store</span><span aria-hidden=\"true\">↗</span></a>\n<div class=\"bw197-points\"><div><span>01</span><span id=\"bw197-point1\">Set your price</span></div><div><span>02</span><span id=\"bw197-point2\">Choose the wait</span></div><div><span>03</span><span id=\"bw197-point3\">See the trade-off</span></div></div>\n</section>\n<section aria-labelledby=\"bw197-demo-title\" class=\"bw197-demo\">\n<div class=\"bw197-panel-head\"><div><span class=\"bw197-panel-kicker\" id=\"bw197-demo-kicker\">TRY THE IDEA</span><h3 id=\"bw197-demo-title\">A decision, made clearer.</h3></div><span class=\"bw197-demo-pill\" id=\"bw197-demo-pill\">INTERACTIVE PREVIEW</span></div>\n<div class=\"bw197-fields\">\n<label class=\"bw197-numberfield\" for=\"bw197-now\"><span aria-hidden=\"true\" class=\"bw197-field-icon\">◈</span><span class=\"bw197-field-label\" id=\"bw197-now-label\">Today's price</span><span class=\"bw197-price-entry\"><span aria-hidden=\"true\" class=\"bw197-symbol\" id=\"bw197-now-symbol\">$</span><input aria-describedby=\"bw197-error\" id=\"bw197-now\" inputmode=\"decimal\" max=\"1000000\" min=\"0.01\" step=\"0.01\" type=\"number\" value=\"120\"/></span></label>\n<label class=\"bw197-numberfield\" for=\"bw197-target\"><span aria-hidden=\"true\" class=\"bw197-field-icon\">◎</span><span class=\"bw197-field-label\" id=\"bw197-target-label\">Your target price</span><span class=\"bw197-price-entry\"><span aria-hidden=\"true\" class=\"bw197-symbol\" id=\"bw197-target-symbol\">$</span><input aria-describedby=\"bw197-error\" id=\"bw197-target\" inputmode=\"decimal\" max=\"1000000\" min=\"0\" step=\"0.01\" type=\"number\" value=\"100\"/></span></label>\n</div>\n<p aria-live=\"polite\" class=\"bw197-input-error\" id=\"bw197-error\" role=\"status\"></p>\n<div class=\"bw197-wait-top\"><div><span aria-hidden=\"true\" class=\"bw197-wait-icon\">◷</span><span id=\"bw197-wait-label\">How long are you willing to wait?</span></div><span aria-live=\"off\" class=\"bw197-day-selected\" id=\"bw197-day-selected\">14 days</span></div>\n<div aria-label=\"Days you are willing to wait\" class=\"bw197-wait-buttons\" id=\"bw197-wait-buttons\" role=\"group\"><button aria-pressed=\"false\" data-days=\"7\" type=\"button\">7 days</button><button aria-pressed=\"true\" data-days=\"14\" type=\"button\">14 days</button><button aria-pressed=\"false\" data-days=\"30\" type=\"button\">30 days</button></div>\n<div class=\"bw197-custom-wait\"><label for=\"bw197-days\" id=\"bw197-custom-label\">Or choose any number of days</label><input aria-describedby=\"bw197-error\" id=\"bw197-days\" inputmode=\"numeric\" max=\"365\" min=\"1\" step=\"1\" type=\"number\" value=\"14\"/><span id=\"bw197-custom-days\">days</span></div>\n<div class=\"bw197-divider\"></div>\n<div aria-atomic=\"true\" aria-live=\"polite\" class=\"bw197-result\">\n<div class=\"bw197-result-item\"><span class=\"bw197-result-label\" id=\"bw197-saved-label\">POTENTIAL SAVING</span><strong class=\"bw197-saving\" dir=\"ltr\" id=\"bw197-saving\">$20.00</strong></div>\n<div class=\"bw197-result-item\"><span class=\"bw197-result-label\" id=\"bw197-perday-label\">SAVING PER DAY OF WAIT</span><strong dir=\"ltr\" id=\"bw197-perday\">$1.43</strong></div>\n</div>\n<div aria-label=\"Comparison between current and target prices\" class=\"bw197-graph\"><svg aria-hidden=\"true\" preserveaspectratio=\"none\" viewbox=\"0 0 500 100\"><defs><lineargradient id=\"bw197-line-grad\" x1=\"0\" x2=\"1\" y1=\"0\" y2=\"0\"><stop offset=\"0%\" stop-color=\"#ffcc9a\"></stop><stop offset=\"100%\" stop-color=\"#ac99e8\"></stop></lineargradient></defs><path d=\"M22 28 Q200 32 478 68\" fill=\"none\" stroke=\"url(#bw197-line-grad)\" stroke-linecap=\"round\" stroke-width=\"2.5\"></path><circle cx=\"22\" cy=\"28\" fill=\"#ffcc9a\" r=\"7\"></circle><circle cx=\"478\" cy=\"68\" fill=\"#d2b9ff\" r=\"7\"></circle></svg><div class=\"bw197-graph-bottom\"><span><small id=\"bw197-now-bottom\">NOW</small><strong dir=\"ltr\" id=\"bw197-now-bottom-value\">$120.00</strong></span><span><small id=\"bw197-wait-bottom\">IF TARGET PRICE IS REACHED</small><strong dir=\"ltr\" id=\"bw197-target-bottom-value\">$100.00</strong></span></div></div>\n<div class=\"bw197-result-foot\"><p id=\"bw197-no-prediction\">The target is your scenario, not a forecast or a sale prediction.</p><button id=\"bw197-reset\" type=\"button\">Reset ↺</button></div>\n</section>\n</div>\n<div aria-hidden=\"true\" class=\"bw197-ribbon\"><svg preserveaspectratio=\"none\" viewbox=\"0 0 1440 260\"><defs><lineargradient id=\"bw197-ribbon-grad\" x1=\"0\" x2=\"1\" y1=\"0\" y2=\"0\"><stop offset=\"0%\" stop-color=\"#3f2b78\" stop-opacity=\".12\"></stop><stop offset=\"40%\" stop-color=\"#a78add\" stop-opacity=\".42\"></stop><stop offset=\"63%\" stop-color=\"#ffbd92\" stop-opacity=\".31\"></stop><stop offset=\"100%\" stop-color=\"#513c82\" stop-opacity=\".05\"></stop></lineargradient></defs><path d=\"M0 144C220 15 344 257 540 157S838 61 1030 152 1306 239 1440 122V260H0Z\" fill=\"url(#bw197-ribbon-grad)\"></path><path d=\"M0 142C220 13 344 255 540 155S838 59 1030 150 1306 237 1440 120\" fill=\"none\" stroke=\"#d5afeb\" stroke-opacity=\".56\" stroke-width=\"1.7\"></path></svg></div>\n<div class=\"bw197-footer\"><p id=\"bw197-footer-text\">No predictions. Just your price, your time, your choice.</p><a href=\"https://apps.apple.com/us/app/buy-or-wait-calculator/id6804757287\" id=\"bw197-footer-link\" rel=\"noopener noreferrer\" target=\"_blank\">Buy or Wait Calculator on the App Store ↗</a></div>\n</div>";
 anchor.insertAdjacentElement('afterend',mount);
 const root=mount.querySelector('.bw197-shell');
 if(!root)return;
 root.dataset.ready='1';
 const $=id=>root.querySelector('#bw197-'+id);

const TEXT={
 en:{brand:'Make the trade-off visible',header:'App Store',kicker:'A BETTER QUESTION BEFORE BUYING',title:'Is the saving<br><em>worth the wait?</em>',lead:'What would you save by waiting?<br>How long would that take?',description:"Compare a price today with a price you'd be happy to pay. Your time belongs in the decision too.",hero:'View on App Store',point1:'Set your price',point2:'Choose the wait',point3:'See the trade-off',demoKicker:'TRY THE IDEA',demoTitle:'A decision, made clearer.',demoPill:'INTERACTIVE PREVIEW',now:'Today\'s price',target:'Your target price',wait:'How long are you willing to wait?',day:'day',days:'days',custom:'Or choose any number of days',saved:'POTENTIAL SAVING',perday:'SAVING PER DAY OF WAIT',nowBottom:'NOW',waitBottom:'IF TARGET PRICE IS REACHED',disclaimer:'The target is your scenario, not a forecast or a sale prediction.',reset:'Reset ↺',footer:'No predictions. Just your price, your time, your choice.',footerLink:'Buy or Wait Calculator on the App Store ↗',error:'Enter a valid price and 1–365 whole days.',noSaving:'Your target is not below today’s price. This scenario shows no saving.'},
 ja:{brand:'待つ価値を数字で見えるように',header:'App Store',kicker:'買う前に、もう一つの問いを',title:'その節約は、<br><em>待つ価値がある？</em>',lead:'待てば、いくら節約できる？<br>そのために、何日待つ？',description:'今日の価格と、納得できる希望価格。待つ時間も含めて、自分で判断するための比較です。',hero:'App Storeで見る',point1:'価格を決める',point2:'待つ日数を選ぶ',point3:'差を見える化',demoKicker:'体験してみる',demoTitle:'判断の材料を、ひと目で。',demoPill:'操作できるモック',now:'今日の価格',target:'希望する価格',wait:'何日まで待てますか？',day:'日',days:'日',custom:'日数を自由に入力',saved:'節約できる差額',perday:'待機1日あたりの節約額',nowBottom:'今',waitBottom:'希望価格になった場合',disclaimer:'希望価格は想定値であり、将来の価格やセールを予測するものではありません。',reset:'初期化 ↺',footer:'未来は予測しない。価格と時間を比べて、自分で決める。',footerLink:'Buy or Wait Calculator をApp Storeで見る ↗',error:'有効な金額と1〜365の整数日数を入力してください。',noSaving:'希望価格は今日の価格未満ではないため、この想定では節約額はありません。'},
 ar:{brand:'اجعل المفاضلة أوضح',header:'متجر التطبيقات',kicker:'سؤال أفضل قبل الشراء',title:'هل يستحق التوفير<br><em>كل هذا الانتظار؟</em>',lead:'كم ستوفّر إذا انتظرت؟<br>وكم يوماً ستنتظر؟',description:'قارن سعر اليوم بالسعر الذي ترغب في دفعه. الوقت جزء من القرار أيضاً.',hero:'عرض في App Store',point1:'حدّد السعر',point2:'اختر المدة',point3:'قارن الخيارات',demoKicker:'جرّب الفكرة',demoTitle:'قرار أكثر وضوحاً.',demoPill:'معاينة تفاعلية',now:'سعر اليوم',target:'السعر المستهدف',wait:'كم يوماً يمكنك الانتظار؟',day:'يوم',days:'يوماً',custom:'أو أدخل عدد الأيام',saved:'التوفير المحتمل',perday:'التوفير لكل يوم انتظار',nowBottom:'الآن',waitBottom:'إذا تحقق السعر المستهدف',disclaimer:'السعر المستهدف مجرد افتراض منك، وليس توقعاً للسعر أو التخفيضات.',reset:'إعادة ضبط ↺',footer:'بلا توقعات. سعرك ووقتك وقرارك.',footerLink:'Buy or Wait Calculator على App Store ↗',error:'أدخل أسعاراً صحيحة وعدد أيام صحيحاً بين 1 و365.',noSaving:'السعر المستهدف ليس أقل من سعر اليوم، فلا يوجد توفير في هذا الافتراض.'}
};
const fields={'brand-sub':'brand','header-cta':'header',kicker:'kicker',lead:'lead',description:'description','hero-cta':'hero',point1:'point1',point2:'point2',point3:'point3','demo-kicker':'demoKicker','demo-title':'demoTitle','demo-pill':'demoPill','now-label':'now','target-label':'target','wait-label':'wait','custom-label':'custom','custom-days':'days','saved-label':'saved','perday-label':'perday','now-bottom':'nowBottom','wait-bottom':'waitBottom','no-prediction':'disclaimer',reset:'reset','footer-text':'footer','footer-link':'footerLink'};
const state={language:'en',region:'us',days:14};
const sample={us:{now:120,target:100,precision:2,symbol:'$',locale:'en-US'},jp:{now:18000,target:15000,precision:0,symbol:'¥',locale:'ja-JP'}};
function money(value){const s=sample[state.region];const v=Number.isFinite(value)?value:0;return new Intl.NumberFormat(s.locale,{style:'currency',currency:state.region==='us'?'USD':'JPY',minimumFractionDigits:s.precision,maximumFractionDigits:s.precision}).format(v)}
function resetSample(){const s=sample[state.region];$('now').value=String(s.now);$('target').value=String(s.target);state.days=14;$('days').value='14';render()}
function errorMsg(s){$('error').textContent=s||''}
function render(){const t=TEXT[state.language];root.lang=state.language;root.dir=state.language==='ar'?'rtl':'ltr';
 Object.entries(fields).forEach(([id,key])=>{const el=$(id);if(el)el.textContent=t[key]});
 $('title').innerHTML=t.title;$('lead').innerHTML=t.lead;
 for(const linkId of ['header-link','hero-link','footer-link'])if($(linkId))$(linkId).href=`https://apps.apple.com/${state.region}/app/buy-or-wait-calculator/id6804757287`;
 const smp=sample[state.region];$('now-symbol').textContent=smp.symbol;$('target-symbol').textContent=smp.symbol;
 const now=Number($('now').value),target=Number($('target').value),d=Number($('days').value);
 const valid=$('now').value.trim()!==''&&$('target').value.trim()!==''&&$('days').value.trim()!==''&&Number.isFinite(now)&&Number.isFinite(target)&&now>0&&now<=1000000&&target>=0&&target<=1000000&&Number.isInteger(d)&&d>=1&&d<=365;
 $('wait-buttons').setAttribute('aria-label',t.wait);root.querySelectorAll('#bw197-wait-buttons [data-days]').forEach(b=>{const n=Number(b.dataset.days);b.textContent=`${n} ${state.language==='ja'?'日':state.language==='ar'?'يوماً':'days'}`;b.setAttribute('aria-pressed',String(valid&&d===n))});
 $('day-selected').textContent=valid?`${d} ${d===1?t.day:t.days}`:'—';
 root.classList.toggle('bw197-invalid',!valid);if(!valid){errorMsg(t.error);$('saving').textContent='—';$('perday').textContent='—';$('now-bottom-value').textContent='—';$('target-bottom-value').textContent='—';return}
 const diff=Math.max(0,now-target);errorMsg(target>=now?t.noSaving:'');
 // Reflect the direction of the hypothetical comparison, not a price prediction.
 const a=now<target?68:now===target?48:28,b=now<target?28:now===target?48:68;
 const graph=root.querySelector('.bw197-graph svg');graph.querySelector('path').setAttribute('d',`M22 ${a} Q200 48 478 ${b}`);
 const circles=graph.querySelectorAll('circle');circles[0].setAttribute('cy',String(a));circles[1].setAttribute('cy',String(b));
 $('saving').textContent=money(diff);$('perday').textContent=money(diff/d);$('now-bottom-value').textContent=money(now);$('target-bottom-value').textContent=money(target)}
 for(const id of ['now','target','days'])$(id).addEventListener('input',render);
 $('wait-buttons').addEventListener('click',e=>{const btn=e.target.closest('button[data-days]');if(!btn)return;state.days=Number(btn.dataset.days);$('days').value=String(state.days);render()});
 $('reset').addEventListener('click',resetSample);

function findSelect(kind){
 const selectors=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
 for(const selector of selectors){const node=document.querySelector(selector);if(node?.tagName==='SELECT'&&!mount.contains(node))return node;}
 return null;
}
function currentLocale(){
 const raw=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
 return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';
}
function currentRegion(){
 const raw=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();
 return raw==='jp'?'jp':'us';
}
function sync(){
 const lang=currentLocale(),region=currentRegion();
 if(lang===state.language&&region===state.region)return;
 const regionChanged=region!==state.region;
 state.language=lang;state.region=region;
 if(regionChanged)resetSample();else render();
}
document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))sync()},true);
window.addEventListener('popstate',sync);
for(const kind of ['language','country']){
 const node=findSelect(kind);
 if(node){const obs=new MutationObserver(sync);obs.observe(node,{attributes:true,childList:true,subtree:true});}
}
resetSample();sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
