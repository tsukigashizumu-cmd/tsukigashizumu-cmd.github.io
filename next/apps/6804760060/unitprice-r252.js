/* R252 UnitPrice: illustrative, in-memory, no API, price tracking or exchange conversion. */
(function(){'use strict';
const I18N={
  en:{kicker:'UNITPRICE / INTERACTIVE COMPARISON',title:'The sticker says B. The final unit price says A.',lead:'Two percentage discounts and tax can change the winner. Compare the price per 100 g, not just the shelf price.',language:'Language',region:'Currency example',a:'OPTION A',b:'OPTION B',details:'Editable inputs',price:'Shelf price',quantity:'Quantity',discount1:'First discount (%)',discount2:'Second discount (%)',tax:'Tax (%)',adjusted:'Adjusted total',outcome:'THE LOWER COST PER 100 g',winsA:'A is cheaper per 100 g',winsB:'B is cheaper per 100 g',equal:'Same unit price',difference:'Difference per 100 g',per:'per 100 g',effective:'Final price / 100 g',presetFlip:'Discount reversal',presetBulk:'Bulk wins',reset:'Reset',invalid:'Enter a positive price and quantity, discounts of 0–100%, and tax of 0–100%.',note:'Illustrative inputs only. Two discounts are applied sequentially, followed by the entered tax. Compatible g/kg quantities only. No live prices, purchase, exchange conversion, or saved records. Store rules may differ.'},
  ja:{kicker:'UNITPRICE / 操作できる比較例',title:'値札ではBが安い。割引後の単価ではAが安い。',lead:'2回の％引きと税率まで入れると、100gあたりの安さが逆転することがあります。',language:'言語',region:'通貨の例',a:'商品 A',b:'商品 B',details:'数値を変更できます',price:'値札の価格',quantity:'内容量',discount1:'1回目の割引（%）',discount2:'2回目の割引（%）',tax:'税率（%）',adjusted:'割引・税込み金額',outcome:'100gあたりの比較結果',winsA:'100g単価は商品Aが安い',winsB:'100g単価は商品Bが安い',equal:'100g単価は同じ',difference:'100gあたりの差',per:'/ 100g',effective:'100gあたりの最終単価',presetFlip:'割引で逆転',presetBulk:'大容量が安い',reset:'初期化',invalid:'価格・内容量は正の数、割引と税率は0〜100%で入力してください。',note:'架空の入力例です。2回の割引を順番に適用し、その後に入力した税率を加算します。g/kgに対応。実売価格取得、決済、為替換算、データ保存は行いません。店舗の割引規則は別途確認してください。'},
  ar:{kicker:'UNITPRICE / مقارنة تفاعلية',title:'السعر الظاهر يفضّل B، لكن سعر الوحدة النهائي قد يفضّل A.',lead:'خصمان متتاليان ثم الضريبة قد يغيّران النتيجة. قارن السعر لكل 100 غرام.',language:'اللغة',region:'مثال العملة',a:'الخيار A',b:'الخيار B',details:'عدّل القيم',price:'سعر الرف',quantity:'الكمية',discount1:'الخصم الأول (%)',discount2:'الخصم الثاني (%)',tax:'الضريبة (%)',adjusted:'السعر النهائي',outcome:'الأقل تكلفة لكل 100 غرام',winsA:'الخيار A أوفر لكل 100 غرام',winsB:'الخيار B أوفر لكل 100 غرام',equal:'السعر لكل وحدة متساوٍ',difference:'الفرق لكل 100 غرام',per:'لكل 100 غرام',effective:'السعر النهائي لكل 100 غرام',presetFlip:'انعكاس بسبب الخصم',presetBulk:'العبوة الأكبر أوفر',reset:'إعادة ضبط',invalid:'أدخل سعرًا وكمية موجبين وخصمًا وضريبة بين 0 و100%.',note:'مثال توضيحي فقط. يُطبّق الخصمان بالتتابع ثم الضريبة. وحدات الغرام والكيلوغرام فقط. لا أسعار مباشرة ولا شراء أو تحويل عملات أو حفظ بيانات. تحقق من قواعد المتجر.'}
};
const ROOT_ID='tsz-r252-root';
function compute(v){
  const good=(value,key)=>Number.isFinite(value)&&(key==='price'||key==='qty'?value>0&&value<=1e7:value>=0&&value<=100);
  if(!['price','qty','d1','d2','tax'].every(k=>good(v[k],k)))return null;
  const grams=v.qty*(v.unit==='kg'?1000:1);
  if(!Number.isFinite(grams)||grams<=0||grams>1e9)return null;
  const total=v.price*(1-v.d1/100)*(1-v.d2/100)*(1+v.tax/100);
  return {total,unit:total*100/grams};
}
const DEFAULTS={us:[{price:5,qty:500,unit:'g',d1:30,d2:10,tax:8},{price:8,qty:1200,unit:'g',d1:0,d2:0,tax:8}],jp:[{price:500,qty:500,unit:'g',d1:30,d2:10,tax:8},{price:800,qty:1200,unit:'g',d1:0,d2:0,tax:8}]};
function init(){
 if(document.getElementById(ROOT_ID))return;
 let root;const target=document.querySelector('#p199-content .p199-body')||document.querySelector('.p199-body');
 if(target){root=document.createElement('section');root.id=ROOT_ID;root.className='tsz-r252';target.insertBefore(root,target.querySelector('#related')||null)}
 else {root=document.querySelector('[data-r252-standalone]');if(!root)return;root.id=ROOT_ID;root.classList.add('tsz-r252')}
 const url=new URLSearchParams(location.search);
 const state={lang:I18N[url.get('lang')]?url.get('lang'):'en',region:url.get('region')==='jp'?'jp':'us',values:[]};
 root.innerHTML=`<div class="u-shell"><header class="u-top"><p class="u-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="u-lead" data-t="lead"></p><div class="u-toolbar"><label><span data-t="language"></span><select id="u252-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="u252-region" aria-label="Example currency"><option value="us">USD example</option><option value="jp">JPY example</option></select></label></div></header><div class="u-grid" id="u252-cards"></div><div class="u-result" role="status" aria-live="polite"><p class="u-overline" data-t="outcome"></p><div class="u-result-main"><h3 class="u-winner" id="u252-winner"></h3><div class="u-saving" id="u252-saving"></div></div><div class="u-compare"><span id="u252-compare-a"></span><span id="u252-compare-b"></span></div><p class="u-error" id="u252-error"></p></div><div class="u-bottom"><button type="button" class="u-primary" data-preset="flip" data-t="presetFlip"></button><button type="button" data-preset="bulk" data-t="presetBulk"></button><button type="button" data-preset="reset" data-t="reset"></button></div><p class="u-foot" data-t="note"></p></div>`;
 const $=(s)=>root.querySelector(s),$all=s=>root.querySelectorAll(s),t=()=>I18N[state.lang];
 function fmt(n,digits=2){return new Intl.NumberFormat('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(n)}
 const sym=()=>state.region==='jp'?'¥':'$';
 function money(n){return sym()+fmt(n)}
 function build(){const dict=t();$('#u252-cards').innerHTML=state.values.map((v,idx)=>`<div class="u-card" data-item="${idx}"><div class="u-card-top"><div class="u-pill">${idx===0?dict.a:dict.b}</div><div class="u-badge">${dict.details}</div></div><div class="u-fields">${field(idx,'price',dict.price,sym())}${field(idx,'qty',dict.quantity,'',true)}${field(idx,'d1',dict.discount1,'%')}${field(idx,'d2',dict.discount2,'%')}${field(idx,'tax',dict.tax,'%')}</div><div class="u-band"><span>${dict.adjusted}</span><strong id="u252-total-${idx}"></strong></div><div class="u-band"><span>${dict.effective}</span><strong id="u252-unit-${idx}"></strong></div></div>`).join('');
  $all('[data-value]').forEach(el=>el.addEventListener('input',()=>{const n=Number(el.dataset.item),k=el.dataset.value;state.values[n][k]=el.value.trim()===''?NaN:Number(el.value);recalc()}));
  $all('[data-unit]').forEach(el=>el.addEventListener('change',()=>{state.values[Number(el.dataset.item)].unit=el.value;recalc()}));
 }
 function field(idx,key,caption,suffix,units=false){const value=state.values[idx][key];return `<label class="u-field"><span>${caption}</span><div class="u-inputwrap"><span class="u-prefix">${units?'':suffix==='%'?'':suffix}</span><input data-value="${key}" data-item="${idx}" type="number" inputmode="decimal" min="${key==='price'||key==='qty'?'0.01':'0'}" max="${key==='price'||key==='qty'?'10000000':'100'}" step="any" value="${value}" aria-label="${caption} ${idx===0?'A':'B'}">${units?`<select data-unit data-item="${idx}" aria-label="Unit ${idx===0?'A':'B'}"><option value="g" ${state.values[idx].unit==='g'?'selected':''}>g</option><option value="kg" ${state.values[idx].unit==='kg'?'selected':''}>kg</option></select>`:suffix==='%'?'<span class="u-prefix">%</span>':''}</div></label>`}
 function recalc(){const dict=t();const results=state.values.map(compute),valid=results.every(Boolean);
 $('#u252-error').textContent=valid?'':dict.invalid;
 if(!valid){for(let i=0;i<2;i++){$('#u252-total-'+i).textContent='—';$('#u252-unit-'+i).textContent='—'}$('#u252-winner').textContent='—';$('#u252-saving').textContent='';$('#u252-compare-a').textContent='';$('#u252-compare-b').textContent='';return}
 for(let i=0;i<2;i++){$('#u252-total-'+i).textContent=money(results[i].total);$('#u252-unit-'+i).textContent=money(results[i].unit)}
 const diff=results[0].unit-results[1].unit,winner=Math.abs(diff)<1e-8?'equal':diff<0?'A':'B';
 $('#u252-winner').textContent=winner==='A'?dict.winsA:winner==='B'?dict.winsB:dict.equal;
 $('#u252-saving').textContent=dict.difference+': '+money(Math.abs(diff));
 $('#u252-compare-a').textContent='A · '+money(results[0].unit)+' '+dict.per;
 $('#u252-compare-b').textContent='B · '+money(results[1].unit)+' '+dict.per;
 }
 function translate(){root.dir=state.lang==='ar'?'rtl':'ltr';const dict=t();$all('[data-t]').forEach(el=>{const key=el.dataset.t;if(dict[key])el.textContent=dict[key]});$('#u252-lang').value=state.lang;$('#u252-region').value=state.region;build();recalc()}
 function load(preset){state.values=DEFAULTS[state.region].map(x=>({...x}));if(preset==='bulk'){state.values[0].d1=0;state.values[0].d2=0}translate()}
 $('#u252-lang').addEventListener('change',e=>{state.lang=e.target.value;translate()});
 $('#u252-region').addEventListener('change',e=>{state.region=e.target.value;load('flip')});
 $all('[data-preset]').forEach(el=>el.addEventListener('click',()=>load(el.dataset.preset==='bulk'?'bulk':'flip')));
 load('flip');
 const pageLang=document.querySelector('#p199-language');if(pageLang)pageLang.addEventListener('change',()=>{const value=String(pageLang.value).toLowerCase();const next=value.startsWith('ja')?'ja':value.startsWith('ar')?'ar':'en';if(next!==state.lang){state.lang=next;translate()}});
 const pageCountry=document.querySelector('#p199-country');if(pageCountry)pageCountry.addEventListener('change',()=>{const v=String(pageCountry.value).toLowerCase().startsWith('jp')?'jp':'us';if(v!==state.region){state.region=v;load('flip')}})
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();}
if(typeof module!=='undefined'&&module.exports)module.exports={compute,defaults:DEFAULTS};
})();
