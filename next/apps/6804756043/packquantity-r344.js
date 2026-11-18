/* Pack Quantity R344 / local-only illustrative whole-pack calculator. No persistence, requests or tracking. */
(()=>{'use strict';
const ID='tsz-packquantity-r344';
const LANG={
 en:{brand:'PACK QUANTITY / PLAN THE WHOLE PACK',tag:'THE MATH BETWEEN NEED AND SHELF',title:'You need 2.5 kg. They only sell 700 g bags.',lead:'Three bags look close. They are not enough. Know the exact number of whole packs to buy—before you reach the register.',highlight:'Do not round down what you cannot buy in pieces.',choose:'CHOOSE WHAT YOU ARE BUYING',cases:['Rice · weight','Potting soil · volume','Cable · length','Screws · pieces'],edit:'MAKE IT YOUR OWN',need:'Amount you actually need',pack:'Amount per pack',price:'Price per pack (optional)',output:'YOUR WHOLE-PACK PLAN',count:'PACKS TO BUY',purchased:'You will bring home',leftover:'You will have left over',cost:'Estimated pack cost',math:'WHY THIS NUMBER?',step:'Need ÷ size per pack',round:'Round up to whole packs',proof:'Whole packs × pack quantity',note:'The last pack is still a whole pack.',reset:'Restore the rice example',invalid:'Enter valid positive amounts to see the plan.',limits:'Required amount and pack size: greater than zero, no more than 1,000,000 base units. Price: 0 to 100,000.',disclaimer:'Illustrative LP-only calculation with fictional quantities and USD prices. Compatible units are converted within each example; this is not live stock, tax, packaging advice or an actual purchase. No saved plans, uploads, external requests, tracking or app data. Results assume all purchased packs are full and usable.',foot:'BUY ENOUGH. KNOW WHAT REMAINS.',of:'OF',bars:'OF EACH PACK'},
 ja:{brand:'PACK QUANTITY / 必要なパック数',tag:'必要量と売場の間にある計算',title:'2.5kg必要。でも、売っているのは700g入り。',lead:'3パックでは少し足りない。半端な数では買えないから、何パック必要で、どれだけ余るかを買う前に確かめよう。',highlight:'足りない分を、切り捨てない。',choose:'何を買うか選ぶ',cases:['お米 · 重さ','培養土 · 容量','ケーブル · 長さ','ネジ · 個数'],edit:'必要量を調整',need:'実際に必要な量',pack:'1パックの内容量',price:'1パックの価格（任意）',output:'購入パック数の計算',count:'買うパック数',purchased:'合計購入量',leftover:'余る量',cost:'購入見込み額',math:'計算の根拠',step:'必要量 ÷ 1パック量',round:'端数を切り上げる',proof:'パック数 × 内容量',note:'最後の1パックも、丸ごと購入。',reset:'お米の例に戻す',invalid:'正しい数量を入力してください。',limits:'必要量と内容量は0超〜1,000,000基本単位、価格は0〜100,000です。',disclaimer:'LP内の架空の数量とUSD価格による例です。例ごとに互換単位のみ換算します。在庫・税金・梱包条件・実際の購入を示しません。プラン保存、アップロード、外部通信、追跡、アプリ本体への書き込みは行いません。各パックの内容量がすべて使用可能と仮定します。',foot:'足りる数と、余る量を。',of:'内訳',bars:'1パックずつ'},
 ar:{brand:'PACK QUANTITY / خطط للعبوات الكاملة',tag:'احسب ما تحتاجه قبل الشراء',title:'تحتاج 2.5 كغ. لكن العبوة تحتوي على 700 غرام فقط.',lead:'ثلاث عبوات لا تكفي. لا يمكنك شراء جزء من العبوة، فاحسب العدد الكامل والكمية المتبقية قبل الدفع.',highlight:'لا تقرّب للأسفل عندما تكون العبوات كاملة.',choose:'اختر نوع المشتريات',cases:['أرز · وزن','تربة · حجم','كابل · طول','براغٍ · عدد'],edit:'غيّر الكميات بنفسك',need:'الكمية التي تحتاجها',pack:'الكمية في كل عبوة',price:'سعر العبوة (اختياري)',output:'خطة شراء العبوات',count:'عدد العبوات المطلوبة',purchased:'إجمالي ما ستشتريه',leftover:'الكمية المتبقية',cost:'التكلفة التقديرية',math:'كيف حُسبت النتيجة؟',step:'المطلوب ÷ محتوى العبوة',round:'التقريب للأعلى لعبوات كاملة',proof:'عدد العبوات × كمية العبوة',note:'العبوة الأخيرة تُشترى كاملة.',reset:'استعادة مثال الأرز',invalid:'أدخل كميات موجبة وصحيحة.',limits:'الكمية المطلوبة وحجم العبوة أكبر من صفر ولا يتجاوز كل منهما 1,000,000 وحدة أساسية؛ السعر من 0 إلى 100,000.',disclaimer:'حاسبة توضيحية داخل الصفحة فقط بأرقام وأسعار بالدولار افتراضية. تُحوَّل الوحدات المتوافقة داخل كل مثال. لا تعرض مخزونًا حيًا أو ضرائب أو شروط التغليف أو عملية شراء. لا حفظ أو رفع أو اتصال خارجي أو تتبع أو تعديل لبيانات التطبيق. نفترض أن كل العبوات كاملة وقابلة للاستخدام.',foot:'اشترِ ما يكفي. واعرف المتبقي.',of:'من',bars:'عبوات كاملة'}
};
// [required as displayed, unit for required, pack size as displayed, pack unit, USD price, required multiplier to base unit, pack multiplier, displayed-unit label]
const CASES=[
 {need:'2.5',nunit:'kg',pack:'700',punit:'g',price:'3.8',nf:1000,pf:1,out:'kg',leftout:'g'},
 {need:'8.5',nunit:'L',pack:'2',punit:'L',price:'4.25',nf:1000,pf:1000,out:'L'},
 {need:'5.4',nunit:'m',pack:'150',punit:'cm',price:'9.99',nf:1000,pf:10,out:'m'},
 {need:'37',nunit:'pcs',pack:'12',punit:'pcs',price:'2.1',nf:1,pf:1,out:'pcs'}
];
let host;const state={lang:'en',scenario:0,values:['2.5','700','3.8']};
const t=()=>LANG[state.lang],q=s=>host.querySelector(s),qa=s=>Array.from(host.querySelectorAll(s));
function element(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
const round4=x=>Math.round((x+Number.EPSILON)*10000)/10000;
const number=(n,dec=2)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:dec}).format(n);
function valid(str,allowZero=false){if(str.trim()==='')return null;const v=Number(str);return Number.isFinite(v)&&v<=(allowZero?100000:1000000)&&(allowZero?v>=0:v>0)?v:null}
function choice(i){state.scenario=i;state.lastScenario=i;const c=CASES[i];state.values=[c.need,c.pack,c.price];draw()}
function boot(){if(document.getElementById(ID))return;
host=element('section');host.id=ID;host.setAttribute('aria-label','Pack Quantity whole pack calculator illustration');
host.innerHTML=`<div class="pq-shell"><header class="pq-header"><div class="pq-logo"><span class="pq-icon" aria-hidden="true"><i></i><i></i><i></i></span><span data-t="brand"></span></div><nav class="pq-lang" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></nav></header><div class="pq-body"><div class="pq-story"><span class="pq-kicker"><i></i><span data-t="tag"></span></span><h2 data-t="title"></h2><p class="pq-lead" data-t="lead"></p><div class="pq-insight"><span aria-hidden="true">↗</span><b data-t="highlight"></b></div><div class="pq-brandline"><span>PACK QUANTITY — 01/04</span><span data-t="foot"></span></div></div><div class="pq-work"><div class="pq-topline"><span data-t="choose"></span><span>01 / 04</span></div><div class="pq-examples" data-out="cases"></div><div class="pq-topline pq-dividerline"><span data-t="edit"></span><span>USD · LIVE DEMO</span></div><div class="pq-fields"><label class="pq-field"><span data-t="need"></span><div class="pq-inputrow"><input type="number" inputmode="decimal" step="any" id="pq-r344-need" data-input="0"><span data-out="needunit"></span></div></label><label class="pq-field"><span data-t="pack"></span><div class="pq-inputrow"><input type="number" inputmode="decimal" step="any" id="pq-r344-pack" data-input="1"><span data-out="packunit"></span></div></label><label class="pq-field pq-pricefield"><span data-t="price"></span><div class="pq-inputrow"><input type="number" inputmode="decimal" step="any" id="pq-r344-price" data-input="2"><span>USD</span></div></label></div><div class="pq-result"><div class="pq-topline pq-result-top"><span data-t="output"></span><span>02 / 04</span></div><div class="pq-heroresult"><div class="pq-bignum" data-out="count">—</div><div class="pq-hero-label"><strong data-t="count"></strong><span data-t="note"></span></div></div><div class="pq-packrow" data-out="packdraw" aria-hidden="true"></div><div class="pq-resulttiles"><div class="pq-resulttile"><small data-t="purchased"></small><strong data-out="purchased">—</strong></div><div class="pq-resulttile pq-leftover"><small data-t="leftover"></small><strong data-out="leftover">—</strong></div><div class="pq-resulttile"><small data-t="cost"></small><strong data-out="cost">—</strong></div></div><div class="pq-proof"><div class="pq-topline"><span data-t="math"></span><span>03 / 04</span></div><div><small data-t="step"></small><strong data-out="division">—</strong></div><div><small data-t="round"></small><strong data-out="ceiling">—</strong></div><div><small data-t="proof"></small><strong data-out="multiplication">—</strong></div></div><div class="pq-error" data-out="error" role="status" aria-live="polite"></div></div><button class="pq-reset" type="button" data-reset><span data-t="reset"></span><span aria-hidden="true">↺</span></button></div></div><p class="pq-disclaimer" data-t="disclaimer"></p></div>`;
(document.querySelector('main')||document.body).append(host);
qa('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;draw()}));
q('[data-reset]').addEventListener('click',()=>choice(0));
qa('[data-input]').forEach(input=>input.addEventListener('input',()=>{const i=Number(input.dataset.input);state.values[i]=input.value;state.scenario=-1;qa('.pq-choice').forEach(b=>b.setAttribute('aria-pressed','false'));update()}));
draw();}
function draw(){host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
qa('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]||'');
qa('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
const casebox=q('[data-out="cases"]');casebox.replaceChildren();CASES.forEach((c,i)=>{const b=element('button','pq-choice',t().cases[i]);b.type='button';b.setAttribute('aria-pressed',String(state.scenario===i));b.addEventListener('click',()=>choice(i));casebox.append(b)});
qa('[data-input]').forEach(el=>{el.value=state.values[Number(el.dataset.input)]});update();}
function update(){const c=CASES[state.scenario>=0?state.scenario:state.lastScenario||0];
// Preserve original unit family during manual editing, even after example deselection.
q('[data-out="needunit"]').textContent=c.nunit;q('[data-out="packunit"]').textContent=c.punit;
const n=valid(state.values[0]),p=valid(state.values[1]),priceEntered=state.values[2].trim()!=='';const pr=priceEntered?valid(state.values[2],true):null;
const error=q('[data-out="error"]');const outputs=['count','purchased','leftover','cost','division','ceiling','multiplication'];
if(n===null||p===null||(priceEntered&&pr===null)){error.textContent=t().invalid+' '+t().limits;error.hidden=false;outputs.forEach(k=>q('[data-out="'+k+'"]').textContent='—');q('[data-out="packdraw"]').replaceChildren();return}
const need=n*c.nf,packet=p*c.pf;const ratio=need/packet;const packs=Math.ceil(ratio-1e-10);
if(!Number.isFinite(packs)||packs<=0||packs>1000000){error.hidden=false;error.textContent=t().invalid;outputs.forEach(k=>q('[data-out="'+k+'"]').textContent='—');q('[data-out="packdraw"]').replaceChildren();return}
error.hidden=true;error.textContent='';
const total=packs*packet,remain=Math.max(0,round4(total-need));
const outFact=c.out==='g'||c.out==='pcs'?1:1000;const outUnit=c.out;
const leftUnit=c.leftout||outUnit;const leftFact=leftUnit==='g'||leftUnit==='pcs'?1:1000;
const purchased=number(round4(total/outFact),3)+' '+outUnit,remaining=number(round4(remain/leftFact),3)+' '+leftUnit;
q('[data-out="count"]').textContent=number(packs,0);
q('[data-out="purchased"]').textContent=purchased;
q('[data-out="leftover"]').textContent=remaining;
q('[data-out="cost"]').textContent=pr===null?'—':'$'+(packs*pr).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
q('[data-out="division"]').textContent=number(ratio,3);
q('[data-out="ceiling"]').textContent=number(packs,0);
q('[data-out="multiplication"]').textContent=purchased;
const box=q('[data-out="packdraw"]');box.replaceChildren();
const drawn=Math.min(packs,10);for(let i=0;i<drawn;i++){let chip=element('span','pq-pack');chip.setAttribute('aria-hidden','true');chip.append(element('i'));box.append(chip)}
if(packs>drawn)box.append(element('span','pq-more','+'+number(packs-drawn,0)));
const fraction=remain/packet;
const last=box.querySelector('.pq-pack:last-of-type');if(last&&packs<=10){const fill=last.querySelector('i');if(fill)fill.style.setProperty('--pq-fill',Math.max(0,Math.min(100,(1-fraction)*100))+'%')}
}
function start(){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot()}
start();
})();
