/* R318 — Pack Quantity Calculator | no persistence, no network, LP-only two-choice comparison. */
(function(){'use strict';
const ID='pq318', APP='6804756043';
const translations={
 en:{kicker:'THE PACK-SIZE DECISION',title:'A smaller bill. Or less left over?',intro:'You need a certain amount. The store sells whole packs. Compare what you will pay with what you will have left.',example:'Choose an example',unit:'Unit conversion',rice:'2.5 kg of ingredients',water:'4.8 L of water',cable:'11 m of cable',pieces:'27 pieces',required:'Quantity you need',currency:'Display currency',amount:'Amount per pack',price:'Price per pack',optionA:'Option A · smaller pack',optionB:'Option B · larger pack',packs:'whole packs',buy:'Quantity bought',left:'Left over',cost:'Total to pay',cheaper:'Lower total cost',less:'Less left over',equal:'Equal',conclusion:'Compare the trade-off',note:'This is a side-by-side LP example. Pack Quantity Calculator lets you calculate whole packs, leftovers and estimated cost for a plan. This page does not store your entries. Currency selection changes the symbol only, not exchange rates.',reset:'Reset example',copy:'Copy result',copied:'Copied',unavailable:'Copy unavailable',invalid:'Enter valid, non-negative prices and positive quantities. Check that the required amount and pack sizes are compatible with the example.',deal:'{cheap} costs {money} less; {waste} leaves {qty} less unused.',sameCost:'Both cost the same.',sameLeft:'Both leave the same amount unused.',and:' ',more:'',notApplicable:'Check your values to see the comparison.'},
 ja:{kicker:'買う前の、袋数と余り',title:'安く済ませる？ 余りを減らす？',intro:'必要な量は決まっていても、商品は袋単位。支払額と余る量を、買う前に比べてみる。',example:'例を選ぶ',unit:'単位換算',rice:'材料 2.5kg',water:'水 4.8L',cable:'ケーブル 11m',pieces:'部品 27個',required:'必要な量',currency:'表示通貨',amount:'1袋あたりの量',price:'1袋の価格',optionA:'A・小さい袋',optionB:'B・大きい袋',packs:'袋必要',buy:'合計購入量',left:'余る量',cost:'支払総額',cheaper:'支払額が少ない',less:'余りが少ない',equal:'同じ',conclusion:'どちらを優先する？',note:'2商品の同時比較はLP専用の例です。実アプリでは袋数・余り・費用を計算できます。このページには入力を保存しません。通貨切替は為替換算ではありません。',reset:'初期化',copy:'結果をコピー',copied:'コピーしました',unavailable:'コピーできません',invalid:'必要量・袋の内容量は0より大きく、価格は0以上で入力してください。',deal:'{cheap}なら{money}安い。一方、{waste}なら余りが{qty}少ない。',sameCost:'支払総額は同じ。',sameLeft:'余る量は同じ。',and:' ',more:'',notApplicable:'数値を修正すると比較できます。'},
 ar:{kicker:'قرار حجم العبوة',title:'سعر أقل، أم كمية متبقية أقل؟',intro:'تعرف الكمية التي تحتاجها، لكن المتجر يبيع عبوات كاملة. قارن ما ستدفعه وما سيتبقى.',example:'اختر مثالاً',unit:'تحويل الوحدات',rice:'مكونات 2.5 كغ',water:'ماء 4.8 لتر',cable:'كابل 11 م',pieces:'27 قطعة',required:'الكمية المطلوبة',currency:'عملة العرض',amount:'كمية العبوة',price:'سعر العبوة',optionA:'الخيار A · عبوة أصغر',optionB:'الخيار B · عبوة أكبر',packs:'عبوات كاملة',buy:'إجمالي المشتريات',left:'الكمية المتبقية',cost:'إجمالي الدفع',cheaper:'تكلفة إجمالية أقل',less:'بقايا أقل',equal:'متساويان',conclusion:'قارن ما يهمك',note:'المقارنة الجانبية مثال خاص بهذه الصفحة. يحسب التطبيق عدد العبوات الكاملة والباقي والتكلفة المقدرة لكل خطة. لا يحفظ الموقع مدخلاتك. تغيير العملة يغير الرمز فقط، دون تحويل الصرف.',reset:'إعادة الضبط',copy:'نسخ النتيجة',copied:'تم النسخ',unavailable:'النسخ غير متاح',invalid:'أدخل كميات موجبة وأسعاراً غير سالبة وصحيحة.',deal:'{cheap} أقل تكلفة بمقدار {money}؛ بينما {waste} يترك كمية أقل بمقدار {qty}.',sameCost:'التكلفة الإجمالية متساوية.',sameLeft:'الكمية المتبقية متساوية.',and:' ',more:'',notApplicable:'عدّل الأرقام للمقارنة.'}
};
const presets={
 rice:{need:2.5,needUnit:'kg',sizeA:700,sizeB:900,packUnit:'g',priceA:3.2,priceB:4.4,baseUnit:'g',needScale:1000,packScale:1,integer:false},
 water:{need:4.8,needUnit:'L',sizeA:750,sizeB:1000,packUnit:'mL',priceA:0.9,priceB:1.25,baseUnit:'mL',needScale:1000,packScale:1,integer:false},
 cable:{need:11,needUnit:'m',sizeA:2,sizeB:3,packUnit:'m',priceA:3.5,priceB:4.9,baseUnit:'m',needScale:1,packScale:1,integer:false},
 pieces:{need:27,needUnit:'pcs',sizeA:8,sizeB:10,packUnit:'pcs',priceA:2.5,priceB:3.2,baseUnit:'pcs',needScale:1,packScale:1,integer:true}
};
let state={locale:'en',preset:'rice',currency:'USD',values:null};
const html=`<div class="pq-wrap"><div class="pq-top"><div><p class="pq-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="pq-intro" data-t="intro"></p></div><div class="pq-lang" role="group" aria-label="Demo language"><button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="ja" aria-pressed="false">日本語</button><button type="button" data-lang="ar" aria-pressed="false">العربية</button></div></div><div class="pq-sectionlabel" data-t="example"></div><div class="pq-preset" role="group"><button type="button" data-preset="rice" data-t="rice"></button><button type="button" data-preset="water" data-t="water"></button><button type="button" data-preset="cable" data-t="cable"></button><button type="button" data-preset="pieces" data-t="pieces"></button></div><div class="pq-inputs"><label class="pq-field"><span data-t="required"></span><input data-field="need" type="number" inputmode="decimal" min="0.001" max="1000000000" step="any" aria-label="Quantity needed"></label><label class="pq-field"><span data-t="currency"></span><select data-field="currency"><option value="USD">USD · $</option><option value="JPY">JPY · ¥</option></select></label><label class="pq-field"><span data-t="unit"></span><span class="pq-qtysmall" data-fieldlabel="needUnit"></span></label></div><div class="pq-options"><div class="pq-option" data-side="a"><div class="pq-optionhead"><i class="pq-dot" aria-hidden="true"></i><span data-t="optionA"></span></div><div class="pq-optioninputs"><label class="pq-field"><span data-t="amount"></span><input data-field="sizeA" type="number" inputmode="decimal" min="0.001" step="any"></label><label class="pq-field"><span data-t="price"></span><input data-field="priceA" type="number" inputmode="decimal" min="0" step="any"></label></div><div class="pq-result"><div class="pq-qty" data-result="packsA">—</div><div class="pq-qtysmall" data-result="unitA"></div><div class="pq-summaryline"><span data-t="buy"></span><strong data-result="boughtA">—</strong></div><div class="pq-summaryline"><span data-t="left"></span><strong data-result="leftA">—</strong></div><div class="pq-summaryline"><span data-t="cost"></span><strong data-result="costA">—</strong></div><div class="pq-flag" data-result="flagA"></div></div></div><div class="pq-option" data-side="b"><div class="pq-optionhead"><i class="pq-dot" aria-hidden="true"></i><span data-t="optionB"></span></div><div class="pq-optioninputs"><label class="pq-field"><span data-t="amount"></span><input data-field="sizeB" type="number" inputmode="decimal" min="0.001" step="any"></label><label class="pq-field"><span data-t="price"></span><input data-field="priceB" type="number" inputmode="decimal" min="0" step="any"></label></div><div class="pq-result"><div class="pq-qty" data-result="packsB">—</div><div class="pq-qtysmall" data-result="unitB"></div><div class="pq-summaryline"><span data-t="buy"></span><strong data-result="boughtB">—</strong></div><div class="pq-summaryline"><span data-t="left"></span><strong data-result="leftB">—</strong></div><div class="pq-summaryline"><span data-t="cost"></span><strong data-result="costB">—</strong></div><div class="pq-flag" data-result="flagB"></div></div></div></div><div class="pq-conclusion" aria-live="polite"><strong data-t="conclusion"></strong><p data-result="compare"></p></div><div class="pq-error" role="status" data-error hidden></div><div class="pq-actions"><button type="button" data-copy data-t="copy"></button><button type="button" data-reset data-t="reset"></button><span class="pq-qtysmall" data-feedback aria-live="polite"></span></div><p class="pq-disclaimer" data-t="note"></p></div>`;
function localeFrom(value){const x=String(value||'').toLowerCase();return x.startsWith('ja')?'ja':x.startsWith('ar')?'ar':'en';}
function format(n,max=2){return new Intl.NumberFormat(state.locale==='ja'?'ja-JP':state.locale==='ar'?'ar-EG':'en-US',{maximumFractionDigits:max}).format(n);}
function money(n){const s=state.currency==='JPY'?'¥':'$';return s+format(n,state.currency==='JPY'?2:2);}
function phrase(str,vars){return str.replace(/\{(\w+)\}/g,(_,k)=>vars[k]??'');}
function calculate(need,size,price,preset){const nb=need*preset.needScale,sb=size*preset.packScale;
 if(![need,size,price].every(Number.isFinite)||need<=0||size<=0||price<0||need>1e9||size>1e9||price>1e8||(preset.integer&&(need%1!==0||size%1!==0)))return null;
 const ratio=nb/sb;if(!Number.isFinite(ratio)||ratio>1e6)return null;
 const packs=Math.ceil(ratio-1e-11);if(packs<1)return null;
 const purchased=packs*sb,remaining=Math.max(0,purchased-nb);
 return{packs,purchased,remaining,cost:packs*price};
}
function mount(){if(document.getElementById(ID))return;
 let container=document.querySelector('.p199-body')||document.querySelector('main')||document.body;
 const section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','Pack quantity comparison demo');section.innerHTML=html;
 const related=document.getElementById('related');if(related&&related.parentNode===container)container.insertBefore(section,related);else container.appendChild(section);
 const $=(s)=>section.querySelector(s),$$=(s)=>Array.from(section.querySelectorAll(s));
 function text(){const tr=translations[state.locale];section.setAttribute('dir',state.locale==='ar'?'rtl':'ltr');section.setAttribute('lang',state.locale);
  $$('[data-t]').forEach(el=>{const key=el.getAttribute('data-t');if(tr[key])el.textContent=tr[key];});
  $$('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===state.locale)));
  $$('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preset===state.preset)));
  $('[data-fieldlabel="needUnit"]').textContent=presets[state.preset].needScale===1000?('1 '+presets[state.preset].needUnit+' = 1,000 '+presets[state.preset].packUnit):('1 '+presets[state.preset].needUnit+' = 1 '+presets[state.preset].packUnit);
 }
 function inputs(){const p=presets[state.preset];$$('[data-field]').forEach(el=>{const k=el.dataset.field;el.value=k==='currency'?state.currency:state.values[k];});
  $$('[data-field="sizeA"],[data-field="sizeB"]').forEach(el=>el.setAttribute('aria-label',translations[state.locale].amount+' ('+p.packUnit+')'));
 }
 function render(){const tr=translations[state.locale],p=presets[state.preset],v=state.values;
  const a=calculate(Number(v.need),Number(v.sizeA),Number(v.priceA),p),b=calculate(Number(v.need),Number(v.sizeB),Number(v.priceB),p);
  const valid=!!(a&&b&&v.need!==''&&v.sizeA!==''&&v.sizeB!==''&&v.priceA!==''&&v.priceB!=='');
  $('[data-error]').hidden=valid;$('[data-error]').textContent=valid?'':tr.invalid;
  for(const [side,r] of [['A',a],['B',b]]){
   const ok=valid&&r;
   $('[data-result="packs'+side+'"]').textContent=ok?format(r.packs,0)+' '+tr.packs:'—';
   $('[data-result="unit'+side+'"]').textContent=ok?(format(Number(v['size'+side]))+' '+p.packUnit+' × '+format(r.packs,0)):'';
   $('[data-result="bought'+side+'"]').textContent=ok?format(r.purchased)+' '+p.baseUnit:'—';
   $('[data-result="left'+side+'"]').textContent=ok?format(r.remaining)+' '+p.baseUnit:'—';
   $('[data-result="cost'+side+'"]').textContent=ok?money(r.cost):'—';
   $('[data-result="flag'+side+'"]').textContent='';
  }
  if(!valid){$('[data-result="compare"]').textContent=tr.notApplicable;return;}
  const ac=a.cost<b.cost-1e-8,bc=b.cost<a.cost-1e-8,al=a.remaining<b.remaining-1e-8,bl=b.remaining<a.remaining-1e-8;
  if(ac)$('[data-result="flagA"]').textContent=tr.cheaper;if(bc)$('[data-result="flagB"]').textContent=tr.cheaper;
  if(al)$('[data-result="flagA"]').textContent+=($('[data-result="flagA"]').textContent?' · ':'')+tr.less;
  if(bl)$('[data-result="flagB"]').textContent+=($('[data-result="flagB"]').textContent?' · ':'')+tr.less;
  const cheap=ac?'A':bc?'B':tr.equal,waste=al?'A':bl?'B':tr.equal;
  if(!ac&&!bc)$('[data-result="compare"]').textContent=tr.sameCost+' '+(al||bl?phrase(tr.deal,{cheap:tr.equal,money:money(0),waste,qty:format(Math.abs(a.remaining-b.remaining))+' '+p.baseUnit}):tr.sameLeft);
  else if(!al&&!bl)$('[data-result="compare"]').textContent=phrase(tr.deal,{cheap,money:money(Math.abs(a.cost-b.cost)),waste:tr.equal,qty:format(0)+' '+p.baseUnit});
  else $('[data-result="compare"]').textContent=phrase(tr.deal,{cheap,money:money(Math.abs(a.cost-b.cost)),waste,qty:format(Math.abs(a.remaining-b.remaining))+' '+p.baseUnit});
 }
 function setPreset(key){state.preset=key;const p=presets[key];state.values={need:p.need,sizeA:p.sizeA,sizeB:p.sizeB,priceA:p.priceA,priceB:p.priceB};text();inputs();render();$('[data-feedback]').textContent='';}
 function setLang(lang){state.locale=translations[lang]?lang:'en';text();inputs();render();}
 $$('[data-lang]').forEach(el=>el.addEventListener('click',()=>setLang(el.dataset.lang)));
 $$('[data-preset]').forEach(el=>el.addEventListener('click',()=>setPreset(el.dataset.preset)));
 $$('[data-field]').forEach(el=>el.addEventListener('input',()=>{if(el.dataset.field==='currency')state.currency=el.value;else state.values[el.dataset.field]=el.value;render();}));
 $('[data-field="currency"]').addEventListener('change',el=>{state.currency=el.target.value;render();});
 $('[data-reset]').addEventListener('click',()=>{state.currency='USD';setPreset('rice');});
 $('[data-copy]').addEventListener('click',()=>{const s=$('[data-result="compare"]').textContent;if(!s||s===translations[state.locale].notApplicable)return;
  const copyText='Pack Quantity — '+s;
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(copyText).then(()=>$('[data-feedback]').textContent=translations[state.locale].copied).catch(()=>$('[data-feedback]').textContent=translations[state.locale].unavailable);
  else $('[data-feedback]').textContent=translations[state.locale].unavailable;
 });
 const globalLang=document.getElementById('p199-language');if(globalLang)globalLang.addEventListener('change',()=>setLang(localeFrom(globalLang.value)));
 state.currency='USD';state.locale=localeFrom(globalLang&&globalLang.value||document.documentElement.lang||'en');setPreset('rice');
 }
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
