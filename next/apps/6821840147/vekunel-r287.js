/* R287 Vekunel interactive LP. No storage, no trackers, no network calls. */
(()=>{
 'use strict';
 const ID='vekunel-r287';
 if(document.getElementById(ID)) return;
 const i18n={
  en:{brand:'Vekunel',brandNote:'Checkout clarity studio',language:'Language',store:'Store',currency:'Currency',eyebrow:'THE FREE-SHIPPING TRAP',h1a:'Free shipping.',h1b:'A higher total.',sub:'You only added one more item to save the delivery fee. Did your checkout actually get cheaper?',entry:'Your cart',example:'Try an example',subtotal:'Original cart subtotal',shipping:'Normal shipping',threshold:'Free-shipping threshold',extra:'Extra item price',trap:'Costs more',save:'Actually saves',results:'What you actually pay',live:'LIVE COMPARISON',original:'Without extra item',withExtra:'With extra item',shippingPaid:'Shipping included',free:'Free shipping',over:'You pay {amount} more',under:'You save {amount}',equal:'Your total stays the same',detailOver:'Free shipping is not the same as a lower bill.',detailUnder:'That additional item makes the total lower.',detailEqual:'The extra item changes nothing in the final total.',originalMath:'Original basket + shipping',addedMath:'Added basket + shipping',diffMath:'Final difference',needValid:'Enter all four valid amounts to compare.',nonnegative:'Amounts must be 0 or more and at most 1,000,000,000. The threshold must be greater than 0.',app:'See Vekunel on the App Store ↗',disclaimer:'This is an illustrative calculator. No currency conversion. Use the same currency for every amount. Taxes, coupons, exclusions, fees and reward points are not inferred. Values remain on this page only.'},
  ja:{brand:'Vekunel',brandNote:'支払総額を見える化',language:'言語',store:'ストア',currency:'通貨',eyebrow:'「送料無料」の落とし穴',h1a:'送料は無料。',h1b:'支払いは増えた。',sub:'送料を節約するために、もう一品。ところで、その追加で支払総額は本当に安くなりましたか？',entry:'今のカート',example:'計算例を選ぶ',subtotal:'元の商品合計',shipping:'通常の送料',threshold:'送料無料の基準',extra:'追加商品の価格',trap:'結局、高くなる',save:'実際に安くなる',results:'本当に払う金額',live:'リアルタイム比較',original:'追加しない',withExtra:'一品追加する',shippingPaid:'送料込み',free:'送料無料',over:'{amount} 多く払う',under:'{amount} 節約できる',equal:'支払総額は変わらない',detailOver:'送料無料でも、会計が安くなるとは限りません。',detailUnder:'この条件なら、追加した方が支払総額は安くなります。',detailEqual:'今回の条件では、どちらも同じ支払額です。',originalMath:'元の商品 + 送料',addedMath:'追加後の商品 + 送料',diffMath:'支払総額の差',needValid:'4つの金額を正しく入力してください。',nonnegative:'金額は0〜10億、送料無料の基準は0より大きくしてください。',app:'App StoreでVekunelを見る ↗',disclaimer:'計算例です。通貨切替は為替換算ではありません。金額はすべて同じ通貨で入力してください。税金・クーポン・対象外商品・他の手数料・ポイント等は推定しません。入力はこのページを閉じると消えます。'},
  ar:{brand:'Vekunel',brandNote:'وضوح الإجمالي عند الدفع',language:'اللغة',store:'المتجر',currency:'العملة',eyebrow:'فخ الشحن المجاني',h1a:'الشحن مجاني.',h1b:'لكن الإجمالي أعلى.',sub:'أضفت منتجًا لتوفير رسوم الشحن. هل أصبح المبلغ الذي ستدفعه أقل فعلًا؟',entry:'سلتك',example:'جرّب مثالًا',subtotal:'إجمالي السلة الأصلي',shipping:'رسوم الشحن العادية',threshold:'حد الشحن المجاني',extra:'سعر المنتج الإضافي',trap:'تدفع أكثر',save:'توفر بالفعل',results:'المبلغ الذي ستدفعه',live:'مقارنة فورية',original:'بدون الإضافة',withExtra:'مع المنتج الإضافي',shippingPaid:'مع رسوم الشحن',free:'شحن مجاني',over:'تدفع {amount} أكثر',under:'توفر {amount}',equal:'الإجمالي لا يتغير',detailOver:'الشحن المجاني لا يعني أن الفاتورة أقل.',detailUnder:'بهذه الأرقام ينخفض المبلغ النهائي عند الإضافة.',detailEqual:'المبلغ النهائي هو نفسه في الحالتين.',originalMath:'السلة الأصلية + الشحن',addedMath:'السلة بعد الإضافة + الشحن',diffMath:'الفرق النهائي',needValid:'أدخل أربعة مبالغ صحيحة للمقارنة.',nonnegative:'يجب أن تكون المبالغ بين 0 ومليار وأن يكون الحد أكبر من صفر.',app:'عرض Vekunel في App Store ↗',disclaimer:'هذه حاسبة توضيحية. تغيير العملة لا يحوّل الأسعار. استخدم العملة نفسها لكل المبالغ. لا تُحسب الضرائب أو الخصومات أو الاستثناءات أو الرسوم الإضافية أو نقاط المكافآت. تبقى المدخلات في هذه الصفحة فقط.'}
 };
 const defaultPreset={USD:{trap:[42,6,50,9],save:[46,8,50,4]},JPY:{trap:[4200,600,5000,900],save:[4600,800,5000,400]}};
 const state={lang:'en',store:'us',currency:'USD',numbers:defaultPreset.USD.trap.slice(),preset:'trap'};
 const html=`<div class="r287-shell">
  <div class="r287-top"><div class="r287-brand"><span class="r287-mark">↗</span><span><span data-t="brand"></span><br><span class="r287-brand-note" data-t="brandNote"></span></span></div>
  <div class="r287-tools"><label><span data-t="language"></span><select aria-label="Language" data-control="lang"><option value="en">EN</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="currency"></span><select aria-label="Currency" data-control="currency"><option value="USD">USD</option><option value="JPY">JPY</option></select></label><label><span data-t="store"></span><select aria-label="Store" data-control="store"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
  <div class="r287-hero"><div class="r287-eyebrow" data-t="eyebrow"></div><h2><span data-t="h1a"></span><br><span class="r287-highlight" data-t="h1b"></span></h2><p class="r287-sub" data-t="sub"></p></div>
  <div class="r287-layout"><section class="r287-card r287-entry" aria-label="Editable cart"><div class="r287-row-title"><h3 data-t="entry"></h3><span class="r287-small" data-t="example"></span></div><div class="r287-form">
    <label class="r287-field"><span data-t="subtotal"></span><input inputmode="decimal" type="number" step="any" min="0" max="1000000000" data-number="0"></label>
    <label class="r287-field"><span data-t="shipping"></span><input inputmode="decimal" type="number" step="any" min="0" max="1000000000" data-number="1"></label>
    <label class="r287-field"><span data-t="threshold"></span><input inputmode="decimal" type="number" step="any" min="0.01" max="1000000000" data-number="2"></label>
    <label class="r287-field"><span data-t="extra"></span><input inputmode="decimal" type="number" step="any" min="0" max="1000000000" data-number="3"></label>
  </div><div class="r287-presets"><button type="button" data-preset="trap" aria-pressed="true" data-t="trap"></button><button type="button" data-preset="save" aria-pressed="false" data-t="save"></button></div><div class="r287-warning" role="status" aria-live="polite" data-warning></div></section>
  <section class="r287-card r287-results" aria-label="Checkout totals"><div class="r287-indicator"><i class="r287-dot"></i><span data-t="live"></span></div><h3 style="margin-top:12px" data-t="results"></h3><div class="r287-total-row"><div class="r287-total"><span class="r287-small" data-t="original"></span><strong data-total="original"></strong><div class="r287-note" data-shipping="original"></div></div><div class="r287-total"><span class="r287-small" data-t="withExtra"></span><strong data-total="added"></strong><div class="r287-note" data-shipping="added"></div></div></div><div class="r287-difference" data-difference data-tone="over"><strong data-main></strong><small data-detail></small></div><div class="r287-formula"><div class="r287-formula-line"><span data-t="originalMath"></span><b data-math="original"></b></div><div class="r287-formula-line"><span data-t="addedMath"></span><b data-math="added"></b></div><div class="r287-formula-line"><span data-t="diffMath"></span><b data-math="diff"></b></div></div></section></div>
  <div class="r287-footer"><a class="r287-cta" data-cta target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/vekunel/id6821840147" data-t="app"></a><p class="r287-disclaimer" data-t="disclaimer"></p></div></div>`;
 function init(){
  if(document.getElementById(ID) || !document.body)return;
  const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Vekunel free shipping comparison');root.innerHTML=html;
  document.body.insertBefore(root,document.body.firstChild);
  const select=(s)=>root.querySelector(s);
  const money=(n)=>new Intl.NumberFormat(state.lang==='ar'?'en-US':state.lang==='ja'?'ja-JP':'en-US',{style:'currency',currency:state.currency,maximumFractionDigits:state.currency==='JPY'?0:2,minimumFractionDigits:state.currency==='JPY'?0:2}).format(n);
  const setText=(selector,t)=>{const el=select(selector);if(el)el.textContent=t;};
  function render(){
   const t=i18n[state.lang];root.setAttribute('dir',state.lang==='ar'?'rtl':'ltr');root.setAttribute('lang',state.lang);
   root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.getAttribute('data-t')];});
   for(const key of ['lang','currency','store'])select(`[data-control="${key}"]`).value=state[key];
   root.querySelectorAll('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(state.preset===el.dataset.preset)));
   root.querySelectorAll('[data-number]').forEach((el)=>{const pos=Number(el.dataset.number);if(document.activeElement!==el)el.value=state.numbers[pos];});
   select('[data-cta]').href=`https://apps.apple.com/${state.store}/app/vekunel/id6821840147`;
   const values=state.numbers.map(Number);
   const valid=state.numbers.every((v,i)=>v!==''&&v!==null&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=1e9&&(i!==2||Number(v)>0));
   if(!valid){
    setText('[data-warning]',t.nonnegative);
    ['original','added'].forEach(key=>setText(`[data-total="${key}"]`,'—'));
    ['original','added'].forEach(key=>setText(`[data-shipping="${key}"]`,'—'));
    ['original','added','diff'].forEach(key=>setText(`[data-math="${key}"]`,'—'));
    setText('[data-main]','—');setText('[data-detail]',t.needValid);select('[data-difference]').dataset.tone='even';return;
   }
   setText('[data-warning]','');
   const [subtotal,shipping,threshold,extra]=values;
   const origFee=subtotal>=threshold?0:shipping,extraBasket=subtotal+extra,addedFee=extraBasket>=threshold?0:shipping;
   const original=subtotal+origFee,added=extraBasket+addedFee,delta=added-original;
   setText('[data-total="original"]',money(original));setText('[data-total="added"]',money(added));
   setText('[data-shipping="original"]',origFee===0?t.free:t.shippingPaid);
   setText('[data-shipping="added"]',addedFee===0?t.free:t.shippingPaid);
   setText('[data-math="original"]',`${money(subtotal)} + ${money(origFee)}`);
   setText('[data-math="added"]',`${money(extraBasket)} + ${money(addedFee)}`);
   setText('[data-math="diff"]',`${delta>0?'+':delta<0?'−':''}${money(Math.abs(delta))}`);
   const sign=delta>0.000001?'over':delta<-.000001?'under':'equal';
   select('[data-difference]').dataset.tone=sign==='under'?'save':sign==='equal'?'even':'over';
   setText('[data-main]',sign==='over'?t.over.replace('{amount}',money(delta)):sign==='under'?t.under.replace('{amount}',money(-delta)):t.equal);
   setText('[data-detail]',t[sign==='over'?'detailOver':sign==='under'?'detailUnder':'detailEqual']);
  }
  root.addEventListener('input',e=>{
   const input=e.target.closest('[data-number]');if(!input||!root.contains(input))return;
   const n=Number(input.dataset.number);state.numbers[n]=input.value;state.preset='';render();
  });
  root.addEventListener('change',e=>{
   const sel=e.target.closest('[data-control]');if(!sel||!root.contains(sel))return;
   const key=sel.dataset.control, value=sel.value;if(!['lang','currency','store'].includes(key))return;
   state[key]=value;render();
  });
  root.addEventListener('click',e=>{
   const btn=e.target.closest('[data-preset]');if(!btn||!root.contains(btn))return;
   const key=btn.dataset.preset;if(!['trap','save'].includes(key))return;
   state.preset=key;state.numbers=defaultPreset[state.currency][key].slice();render();
  });
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
