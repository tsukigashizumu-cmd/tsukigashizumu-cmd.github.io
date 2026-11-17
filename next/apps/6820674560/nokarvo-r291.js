/* R291 Nokarvo usable-quantity comparison. Standalone, scoped, no storage, no tracking. */
(() => {
 'use strict';
 const ROOT='nokarvo-r291';
 if(document.getElementById(ROOT))return;
 const translations={
  en:{language:'Language',store:'Store',eyebrow:'THE PRICE TAG MISSED SOMETHING',headline:'The cheaper bag stopped being cheaper after you peeled it.',desc:'Two prices, two packs. Subtract the part you will never use—and watch which one really costs less.',tag1:'Shelf price',tag2:'Usable amount',tag3:'The flip',sticker:'ACTUAL VALUE',tool:'LIVE USABLE-PRICE COMPARISON',toolTitle:'How much will you actually use?',presets:'Try a real-life example',preset0:'Potatoes',preset1:'Chicken',preset2:'Drained food',itemA:'Option A',itemB:'Option B',price:'Price',pack:'Bought (g)',loss:'Unused (g)',shelf:'Shelf / kg',usable:'Usable / kg',net:'Usable amount',bad:'Enter a price of 0 or more, purchased grams above 0 and unused grams below the purchased amount for both products. Values must be finite.',winnerShelf:'CHEAPER ON SHELF',winnerUsable:'CHEAPER TO USE',delta:'USABLE-PRICE DIFFERENCE',flip:'The winner flips after waste',same:'The same choice wins both comparisons',tie:'Equal cost',savings:'less per usable kg',foot:'Illustrative calculation only. Enter actual measured or estimated unused grams. No future price prediction, exchange-rate conversion or tax calculation. Page inputs are not saved.',cta:'Explore Nokarvo on the App Store',unit:'g usable',vs:'vs',winner:'BEST USABLE VALUE',shelfTie:'Same shelf price',useTie:'Same usable price'},
  ja:{language:'言語',store:'ストア',eyebrow:'値札だけでは見えない本当の単価',headline:'皮をむいたら、安かった袋が高くなった。',desc:'店頭ではAが安い。でも使わない部分を差し引くと、Bの方が得になることも。買う量ではなく、使える量で比べよう。',tag1:'店頭単価',tag2:'実際に使える量',tag3:'お得の逆転',sticker:'使える分で比べる',tool:'操作できる可食・使用量の比較',toolTitle:'本当に使えるのは何g？',presets:'比較例',preset0:'じゃがいも',preset1:'鶏肉',preset2:'水切り食品',itemA:'商品A',itemB:'商品B',price:'価格',pack:'購入量（g）',loss:'使わない量（g）',shelf:'店頭単価 / kg',usable:'使える分 / kg',net:'実際に使える量',bad:'2商品の価格は0以上、購入量は0より大きく、使わない量は購入量未満にしてください。無効な数値は計算しません。',winnerShelf:'店頭では安い',winnerUsable:'使う分では安い',delta:'使える分の単価差',flip:'使わない部分を引くと、安い方が逆転',same:'店頭と使用可能量で同じ商品がお得',tie:'同額',savings:'使用可能量1kgあたり割安',foot:'これは計算の体験例です。使わない量は実測値または目安を入力してください。将来価格・為替・税金は計算しません。ページを閉じると入力は消えます。',cta:'NokarvoをApp Storeで見る',unit:'g 使用可能',vs:'対',winner:'実際に使える分でお得',shelfTie:'店頭単価は同じ',useTie:'使用可能分の単価は同じ'},
  ar:{language:'اللغة',store:'المتجر',eyebrow:'هناك ما لا تُظهره بطاقة السعر',headline:'كانت العبوة أرخص، حتى أزلت القشور.',desc:'قارن سعر عبوتين ثم اطرح ما لن تستخدمه. قد ينقلب الخيار الأفضل عندما تحسب الكمية القابلة للاستخدام.',tag1:'سعر الرف',tag2:'الكمية المستخدمة',tag3:'تغيّر الاختيار',sticker:'القيمة الحقيقية',tool:'مقارنة تفاعلية للسعر الفعلي',toolTitle:'كم ستستخدم فعلاً؟',presets:'جرّب مثالاً',preset0:'بطاطس',preset1:'دجاج',preset2:'طعام مصفّى',itemA:'الخيار أ',itemB:'الخيار ب',price:'السعر',pack:'الكمية المشتراة (غ)',loss:'الكمية غير المستخدمة (غ)',shelf:'السعر على الرف / كغ',usable:'السعر الفعلي / كغ',net:'الكمية القابلة للاستخدام',bad:'أدخل سعراً غير سالب وكمية مشتراة أكبر من الصفر، على أن تكون الكمية المهدرة أقل من المشتراة في الخيارين.',winnerShelf:'الأرخص على الرف',winnerUsable:'الأرخص للاستخدام',delta:'فرق السعر لكل كغ مستخدم',flip:'تغيّر الاختيار بعد احتساب الهدر',same:'الخيار نفسه هو الأفضل في الحالتين',tie:'السعر متساوٍ',savings:'أقل لكل كغ قابل للاستخدام',foot:'مثال توضيحي. أدخل مقدار الهدر المقاس أو المقدّر. لا نتنبأ بالأسعار ولا نحول العملات أو نحسب الضرائب. لا تُحفظ البيانات.',cta:'اكتشف Nokarvo في App Store',unit:'غ قابلة للاستخدام',vs:'مقابل',winner:'أفضل قيمة فعلية',shelfTie:'سعر الرف متساوٍ',useTie:'السعر الفعلي متساوٍ'}
 };
 const presets=[
  [{price:'2.80',pack:'1000',loss:'350'},{price:'3.60',pack:'1000',loss:'100'}],
  [{price:'7.50',pack:'1500',loss:'400'},{price:'8.20',pack:'1400',loss:'150'}],
  [{price:'4.20',pack:'850',loss:'390'},{price:'5.20',pack:'900',loss:'150'}]
 ];
 const qs=new URLSearchParams(location.search);
 const urlLang=qs.get('lang'),urlRegion=qs.get('region');
 const browserLang=(navigator.language||'en').toLowerCase();
 const state={lang:['en','ja','ar'].includes(urlLang)?urlLang:(browserLang.startsWith('ja')?'ja':browserLang.startsWith('ar')?'ar':'en'),region:['us','jp'].includes(urlRegion)?urlRegion:'us',active:0,items:presets[0].map(x=>({...x}))};
 const html=`<div class="n291-wrap">
  <header class="n291-top"><div class="n291-identity"><span class="n291-logo" aria-hidden="true">N</span><div><b class="n291-name">Nokarvo</b><small class="n291-super">COMPARE WHAT YOU ACTUALLY USE</small></div></div><div class="n291-switches"><label><span data-i="language"></span><select data-setting="lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-i="store"></span><select data-setting="region"><option value="us">United States</option><option value="jp">日本</option></select></label></div></header>
  <section class="n291-hero"><div><div class="n291-eyebrow" data-i="eyebrow"></div><h2 data-i="headline"></h2><p class="n291-desc" data-i="desc"></p><div class="n291-hero-tags"><span data-i="tag1"></span><span data-i="tag2"></span><span data-i="tag3"></span></div></div><div class="n291-illustration" aria-hidden="true"><div class="n291-pack"><small>OPTION A</small><b>1kg</b><small>35% UNUSED</small></div><div class="n291-pack"><small>OPTION B</small><b>1kg</b><small>10% UNUSED</small></div><div class="n291-sticker" data-i="sticker"></div></div></section>
  <section class="n291-module"><div class="n291-module-head"><div><div class="n291-overline" data-i="tool"></div><h3 data-i="toolTitle"></h3></div><div class="n291-presets" role="group" aria-label="Examples"><button type="button" data-preset="0"></button><button type="button" data-preset="1"></button><button type="button" data-preset="2"></button></div></div>
  <div class="n291-cards">${[0,1].map(i=>`<article class="n291-card" data-card="${i}"><div class="n291-cardtop"><span class="n291-cardname"><span class="n291-letter">${i===0?'A':'B'}</span><span data-itemname="${i}"></span></span><span class="n291-badge" data-badge="${i}"></span></div><div class="n291-inputs">${['price','pack','loss'].map(f=>`<label><span data-i="${f}"></span><input inputmode="decimal" type="number" step="any" min="0" data-index="${i}" data-field="${f}" aria-label="Option ${i===0?'A':'B'} ${f}"></label>`).join('')}</div><div class="n291-math"><div><span class="n291-statlabel" data-i="shelf"></span><strong class="n291-number" data-shelf="${i}">—</strong></div><div><span class="n291-statlabel" data-i="usable"></span><strong class="n291-number" data-use="${i}">—</strong></div></div><div class="n291-amount" data-net="${i}"></div></article>`).join('')}</div>
  <div class="n291-status" data-error role="status" hidden></div><div class="n291-result" aria-live="polite"><div class="n291-results-cell"><span class="n291-statlabel" data-i="winnerUsable"></span><strong class="n291-accent" data-usable-winner>—</strong><small data-outcome></small></div><div class="n291-results-cell"><span class="n291-statlabel" data-i="winnerShelf"></span><strong data-shelf-winner>—</strong></div><div class="n291-results-cell"><span class="n291-statlabel" data-i="delta"></span><strong data-gap>—</strong><small data-gap-note></small></div></div></section>
  <footer class="n291-bottom"><p class="n291-disclaimer" data-i="foot"></p><a class="n291-cta" data-cta href="https://apps.apple.com/us/app/nokarvo/id6820674560" target="_blank" rel="noopener noreferrer"></a></footer>
 </div>`;
 const root=document.createElement('section');root.id=ROOT;root.setAttribute('aria-label','Nokarvo usable amount price calculator');root.innerHTML=html;
 function init(){
  if(!document.body||document.getElementById(ROOT))return;
  document.body.insertBefore(root,document.body.firstChild);
  const q=s=>root.querySelector(s),qa=s=>Array.from(root.querySelectorAll(s)),tx=()=>translations[state.lang];
  const money=n=>{if(!Number.isFinite(n))return '—';const locale=state.lang==='ja'?'ja-JP':'en-US';const fmt=new Intl.NumberFormat(locale,{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);return (state.region==='jp'?'¥':'$')+fmt;};
  const parse=v=>{if(typeof v!=='string'||v.trim()==='')return NaN;return Number(v);};
  const stats=item=>{let price=parse(item.price),pack=parse(item.pack),loss=parse(item.loss);if(![price,pack,loss].every(Number.isFinite)||price<0||price>1e9||pack<=0||pack>1e8||loss<0||loss>=pack)return null;return {shelf:price*1000/pack,usable:price*1000/(pack-loss),net:pack-loss,pack,loss};};
  const selectWinner=(a,b)=>Math.abs(a-b)<=Math.max(1e-9,Math.abs(a)*1e-9,Math.abs(b)*1e-9)?-1:(a<b?0:1);
  function render(){
   const t=tx();root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
   qa('[data-i]').forEach(e=>{e.textContent=t[e.dataset.i]||'';});
   q('[data-setting="lang"]').value=state.lang;q('[data-setting="region"]').value=state.region;
   qa('[data-preset]').forEach((btn,i)=>{btn.textContent=t['preset'+i];btn.classList.toggle('n291-active',state.active===i);btn.setAttribute('aria-pressed',String(state.active===i));});
   state.items.forEach((item,i)=>{q(`[data-itemname="${i}"]`).textContent=t[i===0?'itemA':'itemB'];for(const f of ['price','pack','loss']){const input=q(`[data-index="${i}"][data-field="${f}"]`);if(document.activeElement!==input)input.value=item[f];}q(`[data-card="${i}"]`).classList.remove('n291-winner');q(`[data-badge="${i}"]`).textContent='';});
   const values=state.items.map(stats),valid=values.every(Boolean);
   const error=q('[data-error]');error.hidden=valid;error.textContent=valid?'':t.bad;
   if(!valid){qa('[data-shelf],[data-use],[data-net]').forEach(e=>e.textContent='—');for(const s of ['[data-usable-winner]','[data-shelf-winner]','[data-gap]','[data-outcome]','[data-gap-note]'])q(s).textContent='—';}
   else{
    const shelf=selectWinner(values[0].shelf,values[1].shelf),use=selectWinner(values[0].usable,values[1].usable);
    values.forEach((v,i)=>{q(`[data-shelf="${i}"]`).textContent=money(v.shelf);q(`[data-use="${i}"]`).textContent=money(v.usable);q(`[data-net="${i}"]`).textContent=`${t.net}: ${new Intl.NumberFormat(state.lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:2}).format(v.net)} ${t.unit}`;q(`[data-card="${i}"]`).classList.toggle('n291-winner',i===use);q(`[data-badge="${i}"]`).textContent=i===use?t.winner:'';});
    const letter=i=>i===-1?t.tie:(i===0?'A':'B');
    q('[data-shelf-winner]').textContent=shelf===-1?t.shelfTie:letter(shelf);
    q('[data-usable-winner]').textContent=use===-1?t.useTie:letter(use);
    q('[data-outcome]').textContent=shelf!==-1&&use!==-1&&shelf!==use?t.flip:t.same;
    const gap=Math.abs(values[0].usable-values[1].usable);
    q('[data-gap]').textContent=money(gap)+' / kg';q('[data-gap-note]').textContent=t.savings;
   }
   q('[data-cta]').textContent=t.cta;q('[data-cta]').href=`https://apps.apple.com/${state.region}/app/nokarvo/id6820674560`;
  }
  root.addEventListener('input',e=>{let el=e.target;if(!el.matches('[data-field]'))return;state.items[Number(el.dataset.index)][el.dataset.field]=el.value;state.active=-1;render();});
  root.addEventListener('change',e=>{let el=e.target;if(el.matches('[data-setting]')){state[el.dataset.setting]=el.value;render();}else if(el.matches('[data-field]')){state.items[Number(el.dataset.index)][el.dataset.field]=el.value;state.active=-1;render();}});
  root.addEventListener('click',e=>{const btn=e.target.closest('[data-preset]');if(!btn)return;state.active=Number(btn.dataset.preset);state.items=presets[state.active].map(x=>({...x}));render();});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
