/* R247 Nokarvo: illustrative usable-quantity unit-price comparison. No storage or network. */
(()=>{
'use strict';
const ID='nk247'; if(document.getElementById(ID))return;
const words={
 en:{eyebrow:'THE PRICE ON THE LABEL IS ONLY HALF THE STORY',title:'Cheaper on the shelf. More expensive after the waste.',intro:'Peels, cores, bones and spoiled parts change what you actually get. Compare the cost of the amount you can use—not just the amount you buy.',choice:'Choose an example',cases:['A cheaper on the label','A really is cheaper','The same usable price'],data:'SET UP YOUR COMPARISON',a:'OPTION A',b:'OPTION B',price:'Shelf price',mass:'Purchased amount (g)',discard:'Unusable portion (%)',result:'THE ACTUAL COMPARISON',shelf:'Shelf cost / 100g',usable:'Usable cost / 100g',quantity:'Usable quantity',waste:'Unusable amount',winner:'BETTER COST PER USABLE 100g',reverse:'THE WINNER CHANGES',normal:'SHELF PRICE AND USABLE PRICE AGREE',same:'THE USABLE PRICE IS THE SAME',winA:'Option A costs less per usable 100g.',winB:'Option B costs less per usable 100g.',winTie:'There is no price advantage at this precision.',savings:'Difference per usable 100g',reset:'Reset comparison',invalid:'Enter valid values: price above 0, weight above 0, and unusable portion from 0% to less than 100%.',lang:'Language',region:'Display currency',note:'A simplified estimate using your inputs. Actual usable amount depends on the item. This demo does not fetch prices, convert currencies, save data or predict purchases.',foot:'What matters is not what you paid for the package, but what is left to use.',app:'View on the App Store'},
 ja:{eyebrow:'値札だけでは、本当の単価は決まらない',title:'売り場ではAが安い。使える量ではBが安い。',intro:'皮・芯・骨・傷みなど、使わない部分は買った量に含まれています。残った「使える量」だけで比べると、選ぶ商品が変わることがあります。',choice:'比較例を選ぶ',cases:['値札と実質で逆転','Aがそのまま安い','使える単価が同じ'],data:'比較する条件',a:'商品 A',b:'商品 B',price:'店頭価格',mass:'購入量（g）',discard:'使わない割合（%）',result:'使える量で比較',shelf:'表示単価／100g',usable:'使える量の単価／100g',quantity:'使える量',waste:'使わない量',winner:'使える100gあたりで安い方',reverse:'安い方が逆転しました',normal:'表示単価と実質単価の勝者は同じ',same:'使える量の単価は同じ',winA:'商品Aのほうが、使える100gあたりで安くなります。',winB:'商品Bのほうが、使える100gあたりで安くなります。',winTie:'表示精度上は同じ単価です。',savings:'使える100gあたりの差',reset:'初期値に戻す',invalid:'入力を確認してください。価格・購入量は0より大きく、使わない割合は0%以上100%未満です。',lang:'表示言語',region:'通貨表示',note:'入力値による単純な概算です。実際に使える量は商品ごとに異なります。価格取得・通貨換算・保存・購入予測は行いません。',foot:'比較したいのは「買った量」よりも、「残って使える量」。',app:'App Storeで見る'},
 ar:{eyebrow:'السعر على الملصق ليس القصة كلها',title:'أرخص عند الشراء، لكنه أغلى بعد استبعاد الهدر.',intro:'القشور والعظام والأجزاء التالفة تقلل الكمية التي يمكنك استعمالها. قارن السعر لكل كمية صالحة للاستخدام، لا لكل كمية مشتراة.',choice:'اختر مثالاً',cases:['انعكاس الخيار الأرخص','الخيار أ أرخص بالفعل','تكلفة صالحة متساوية'],data:'إعداد المقارنة',a:'الخيار أ',b:'الخيار ب',price:'سعر العبوة',mass:'الكمية المشتراة (غ)',discard:'النسبة غير المستخدمة (%)',result:'مقارنة الكمية القابلة للاستخدام',shelf:'سعر 100 غ على الملصق',usable:'تكلفة 100 غ قابلة للاستخدام',quantity:'الكمية الصالحة',waste:'الكمية المستبعدة',winner:'الأقل تكلفة لكل 100 غ صالحة',reverse:'تغيّر الخيار الأرخص',normal:'نتيجة الملصق والكمية الصالحة متفقة',same:'التكلفة الصالحة متساوية',winA:'الخيار أ أقل تكلفة لكل 100 غ صالحة.',winB:'الخيار ب أقل تكلفة لكل 100 غ صالحة.',winTie:'لا فرق سعري عند هذه الدقة.',savings:'الفرق لكل 100 غ صالحة',reset:'إعادة القيم',invalid:'أدخل قيماً صحيحة: السعر والوزن أكبر من صفر، والنسبة المستبعدة بين 0 وأقل من 100%.',lang:'اللغة',region:'العملة المعروضة',note:'تقدير مبسط حسب القيم التي أدخلتها. تختلف الكمية القابلة للاستخدام حسب المنتج. لا يجلب العرض أسعاراً أو يحوّل العملات أو يحفظ بيانات أو يتنبأ بالمشتريات.',foot:'المهم ليس كمية العبوة بل ما يبقى قابلاً للاستخدام.',app:'عرض على App Store'}
};
const cases={
 US:[[3.60,1000,40,4.20,1000,10],[3.20,1000,5,4.50,1000,5],[4.00,1000,20,4.50,1000,10]],
 JP:[[360,1000,40,420,1000,10],[320,1000,5,450,1000,5],[400,1000,20,450,1000,10]]
};
const u=new URLSearchParams(location.search);
let lang=(u.get('lang')||document.documentElement.lang||'en').slice(0,2).toLowerCase();if(!words[lang])lang='en';
let region=(u.get('region')||(lang==='ja'?'JP':'US')).toUpperCase();if(!cases[region])region='US';
let active=0, vals=[...cases[region][active]];
const section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','Nokarvo usable quantity comparison demo');
(document.querySelector('main')||document.querySelector('#overview')||document.body).appendChild(section);
const t=()=>words[lang];
const cash=n=>new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'en-US':'en-US',{style:'currency',currency:region==='JP'?'JPY':'USD',currencyDisplay:'symbol',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const num=n=>new Intl.NumberFormat(lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:1}).format(n);
const numeric=text=>`<b class="nk247-num" dir="ltr">${text}</b>`;
function compute(v){if(v.length!==6||v.some(n=>!Number.isFinite(n)))return null;
 const [pa,ga,wa,pb,gb,wb]=v;
 if(!(pa>0&&pb>0&&pa<=1000000&&pb<=1000000&&ga>0&&gb>0&&ga<=10000000&&gb<=10000000&&wa>=0&&wb>=0&&wa<100&&wb<100))return null;
 const qa=ga*(1-wa/100), qb=gb*(1-wb/100);
 const ua=pa*100/qa,ub=pb*100/qb,sa=pa*100/ga,sb=pb*100/gb;
 const eps=1e-8;const compare=(a,b)=>Math.abs(a-b)<eps?0:a<b?-1:1;
 const shelf=compare(sa,sb), usable=compare(ua,ub);
 return {qa,qb,ra:ga-qa,rb:gb-qb,ua,ub,sa,sb,shelf,usable,reversed:shelf!==0&&usable!==0&&shelf!==usable,delta:Math.abs(ua-ub)};
}
function tmpl(){const d=t(); section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
 section.innerHTML=`<div class="nk247-shell"><div class="nk247-nav"><div class="nk247-identity"><span class="nk247-logo" aria-hidden="true"><span></span></span><div>NOKARVO<small>THE USABLE PRICE</small></div></div><div class="nk247-switches"><label>${d.lang}<select data-nk="lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label>${d.region}<select data-nk="region"><option value="US">USD $</option><option value="JP">JPY ¥</option></select></label></div></div>
 <div class="nk247-hero"><p class="nk247-overline"><span></span>${d.eyebrow}</p><h2>${d.title}</h2><p class="nk247-lede">${d.intro}</p></div>
 <div class="nk247-segment"><span>${d.choice}</span><div class="nk247-preset">${d.cases.map((s,i)=>`<button type="button" data-nk-case="${i}" aria-pressed="${i===active}">${s}</button>`).join('')}</div></div>
 <div class="nk247-grid"><div class="nk247-panel nk247-form"><div class="nk247-panelhead"><em>01</em><span>${d.data}</span></div><div class="nk247-forms">${[0,1].map((j)=>`<div class="nk247-product"><div class="nk247-prodhead"><span class="nk247-dot ${j===1?'b':''}"></span>${j===0?d.a:d.b}</div>${[d.price,d.mass,d.discard].map((s,k)=>{const i=j*3+k;return `<label class="nk247-field"><span>${s}</span><input data-nk-n="${i}" type="number" inputmode="decimal" min="0" step="any" value="${vals[i]}" aria-label="${j===0?d.a:d.b}: ${s}"></label>`}).join('')}</div>`).join('')}</div><button type="button" class="nk247-reset" data-nk-reset>${d.reset} <span aria-hidden="true">↺</span></button></div>
 <div class="nk247-panel nk247-results" aria-live="polite"><div class="nk247-panelhead"><em>02</em><span>${d.result}</span></div><div class="nk247-compareline"><div>${d.a}<small>${d.shelf}</small><strong data-nk-out="sa">—</strong></div><div>${d.b}<small>${d.shelf}</small><strong data-nk-out="sb">—</strong></div></div><div class="nk247-compareline nk247-good"><div>${d.a}<small>${d.usable}</small><strong data-nk-out="ua">—</strong></div><div>${d.b}<small>${d.usable}</small><strong data-nk-out="ub">—</strong></div></div>
 <div class="nk247-verdict"><small>${d.winner}</small><strong data-nk-out="winner">—</strong><span data-nk-out="caption"></span><div class="nk247-meter"><span data-nk-meter="a"></span><span data-nk-meter="b"></span></div><div class="nk247-delta"><span>${d.savings}</span><strong data-nk-out="delta">—</strong></div></div>
 <div class="nk247-breakdown"><div><span>${d.a} · ${d.quantity}</span><strong data-nk-out="qa">—</strong><small>${d.waste}: <b data-nk-out="ra">—</b></small></div><div><span>${d.b} · ${d.quantity}</span><strong data-nk-out="qb">—</strong><small>${d.waste}: <b data-nk-out="rb">—</b></small></div></div></div></div>
 <div class="nk247-bottom"><p>${d.note}</p><div><span>${d.foot}</span><a href="https://apps.apple.com/us/app/id6820674560" target="_blank" rel="noopener noreferrer">${d.app} <span aria-hidden="true">↗</span></a></div></div></div>`;
 section.querySelector('[data-nk="lang"]').value=lang;section.querySelector('[data-nk="region"]').value=region;
 section.querySelectorAll('[data-nk-n]').forEach(el=>el.addEventListener('input',()=>{active=-1;update()}));
 section.querySelectorAll('[data-nk-case]').forEach(el=>el.addEventListener('click',()=>{active=Number(el.dataset.nkCase);vals=[...cases[region][active]];tmpl()}));
 section.querySelector('[data-nk="lang"]').addEventListener('change',e=>{vals=read();lang=e.target.value;tmpl()});
 section.querySelector('[data-nk="region"]').addEventListener('change',e=>{region=e.target.value;active=0;vals=[...cases[region][0]];tmpl()});
 section.querySelector('[data-nk-reset]').addEventListener('click',()=>{active=0;vals=[...cases[region][0]];tmpl()});
 update();
}
const read=()=>Array.from(section.querySelectorAll('[data-nk-n]')).map(el=>el.value.trim()===''?NaN:Number(el.value));
function update(){vals=read();const d=t(),r=compute(vals);const out=n=>section.querySelector(`[data-nk-out="${n}"]`);
 section.querySelectorAll('[data-nk-case]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.nkCase)===active)));
 const v=section.querySelector('.nk247-verdict');v.classList.toggle('nk247-invalid',!r);
 if(!r){['sa','sb','ua','ub','winner','delta','qa','qb','ra','rb'].forEach(k=>out(k).textContent='—');out('caption').textContent=d.invalid;section.querySelectorAll('[data-nk-meter]').forEach(el=>el.style.width='0%');return}
 for(const [key,value] of Object.entries({sa:cash(r.sa),sb:cash(r.sb),ua:cash(r.ua),ub:cash(r.ub),qa:num(r.qa)+' g',qb:num(r.qb)+' g',ra:num(r.ra)+' g',rb:num(r.rb)+' g',delta:cash(r.delta)}))out(key).innerHTML=numeric(value);
 const win=r.usable===0?'—':r.usable<0?d.a:d.b;out('winner').textContent=win;
 out('caption').textContent=(r.usable===0?d.same:r.reversed?d.reverse:d.normal)+' · '+(r.usable<0?d.winA:r.usable>0?d.winB:d.winTie);
 const base=Math.max(r.ua,r.ub); section.querySelector('[data-nk-meter="a"]').style.width=(r.ua/base*100)+'%';section.querySelector('[data-nk-meter="b"]').style.width=(r.ub/base*100)+'%';
 v.classList.toggle('nk247-reversed',r.reversed);
}
tmpl();
})();
