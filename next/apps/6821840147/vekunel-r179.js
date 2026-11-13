/* Vekunel R179 — illustration-only, local browser calculation. No persistence, tracking or network calls. */
(() => {
  'use strict';
  const APP = '6821840147', ID = 'tsz-vekunel-r179';
  if (!document.body || document.body.dataset.p199Id !== APP || document.getElementById(ID)) return;
  const i18n = {
    en: {
      brand:'VEKUNEL', eyebrow:'THE CHECKOUT COMPARISON', title1:'Free shipping.', title2:'Higher total?', intro:'One more item can change the whole checkout.', sub:'Compare the amount you actually pay—not just the shipping label.',
      subtotal:'Cart subtotal', shipping:'Ordinary shipping', threshold:'Free shipping threshold', extra:'Extra item price',
      noadd:'CHECK OUT NOW', add:'ADD AN ITEM', items:'Items', shippingLine:'Shipping', extraLine:'Extra item', total:'TOTAL',
      more:'YOU PAY MORE', save:'YOU SAVE', equal:'SAME TOTAL', moreText:'Adding the item costs {n} more.', saveText:'Adding the item saves {n}.', equalText:'Both choices cost the same.',
      outcome:'Difference at checkout', demo:'Try an $8 item instead', reset:'Reset example', result:'Compare the total. Then decide.',
      thresholdNote:'Free shipping is applied only when the cart reaches the entered threshold.',
      caveat:'Illustrative calculator only. Store rules, discounts, tax, exclusions and shipping policies may differ. Does not place an order or retrieve live prices.',
      store:'View on the App Store', invalid:'Enter non-negative amounts from $0.00 to $1,000,000.00, with at most two decimal places.', currency:'USD', free:'FREE',
      cheaper:'Lower total', before:'Without an extra item', after:'With an extra item', zeroExtra:'No extra item is needed to reach free shipping.'
    },
    ja: {
      brand:'VEKUNEL', eyebrow:'お会計の総額を比較', title1:'送料無料なのに、', title2:'支払額が増える？', intro:'あと1品の追加で、会計の結果が変わる。', sub:'送料だけではなく、実際の支払総額で比較。',
      subtotal:'カート内の商品代', shipping:'通常送料', threshold:'送料無料の条件金額', extra:'追加商品の価格',
      noadd:'そのまま購入', add:'商品を追加', items:'商品代', shippingLine:'送料', extraLine:'追加商品', total:'支払総額',
      more:'追加すると高い', save:'追加すると安い', equal:'同額', moreText:'追加すると{n}高くなります。', saveText:'追加すると{n}安くなります。', equalText:'どちらも同じ支払額です。',
      outcome:'お会計の差額', demo:'追加商品を$8に変更', reset:'初期値に戻す', result:'総額で比べて、納得して選ぼう。',
      thresholdNote:'入力した条件金額に達した場合のみ、送料無料として計算します。',
      caveat:'金額は架空のWeb計算例です。店舗ごとの送料・税・割引・対象外商品などにより実際の会計は異なります。購入や価格取得は行いません。',
      store:'App Storeで見る', invalid:'0〜$1,000,000.00の金額を小数点以下2桁までで入力してください。', currency:'USD', free:'無料',
      cheaper:'安い方', before:'追加商品なし', after:'追加商品あり', zeroExtra:'追加購入しなくても送料無料です。'
    },
    ar: {
      brand:'VEKUNEL', eyebrow:'قارن الإجمالي عند الدفع', title1:'شحن مجاني.', title2:'إجمالي أعلى؟', intro:'إضافة منتج واحد قد تغيّر تكلفة الطلب.', sub:'قارن ما ستدفعه فعلاً، لا تكلفة الشحن وحدها.',
      subtotal:'قيمة السلة', shipping:'الشحن العادي', threshold:'حد الشحن المجاني', extra:'سعر المنتج الإضافي',
      noadd:'ادفع الآن', add:'أضف منتجاً', items:'قيمة المنتجات', shippingLine:'الشحن', extraLine:'المنتج الإضافي', total:'الإجمالي',
      more:'ستدفع أكثر', save:'ستوفّر', equal:'الإجماليان متساويان', moreText:'إضافة المنتج ترفع الإجمالي بمقدار {n}.', saveText:'إضافة المنتج تخفّض الإجمالي بمقدار {n}.', equalText:'الإجمالي واحد في الحالتين.',
      outcome:'الفرق عند الدفع', demo:'جرّب منتجاً بسعر 8 دولارات', reset:'إعادة القيم', result:'قارن الإجمالي، ثم قرّر.',
      thresholdNote:'يُطبَّق الشحن المجاني فقط إذا بلغت السلة الحد المحدد.',
      caveat:'آلة حاسبة توضيحية فقط. قد تختلف سياسة الشحن والضرائب والخصومات والاستثناءات بحسب المتجر. لا تُنفَّذ مشتريات ولا تُجلب أسعار حية.',
      store:'عرضه على App Store', invalid:'أدخل مبالغ من 0 إلى 1,000,000.00 دولار بمنزلتين عشريتين كحد أقصى.', currency:'USD', free:'مجاني',
      cheaper:'الإجمالي الأقل', before:'دون منتج إضافي', after:'مع منتج إضافي', zeroExtra:'السلة مؤهلة للشحن المجاني دون إضافة منتج.'
    }
  };
  const root=document.createElement('section');
  root.id=ID;root.className='vk179';root.setAttribute('aria-labelledby','vk179-heading');
  root.innerHTML=`
    <div class="vk179-top"><div class="vk179-mark" aria-hidden="true">▧</div><strong data-t="brand">VEKUNEL</strong><span class="vk179-top-small" data-t="eyebrow"></span></div>
    <div class="vk179-hero">
      <div class="vk179-intro"><p class="vk179-kicker" data-t="eyebrow"></p><h2 id="vk179-heading"><span data-t="title1"></span> <em data-t="title2"></em></h2>
      <p class="vk179-lede" data-t="intro"></p><p class="vk179-sub" data-t="sub"></p></div>
      <div class="vk179-gift-scene" aria-hidden="true"><div class="vk179-gift-lid"></div><div class="vk179-gift"><div class="vk179-gift-ribbon"></div><div class="vk179-gift-name">Vekunel</div></div><div class="vk179-bow vk179-bow-left"></div><div class="vk179-bow vk179-bow-right"></div><div class="vk179-spark">✦</div></div>
    </div>
    <form class="vk179-controls" id="vk179-form" novalidate>
      <label class="vk179-field" for="vk179-cart"><span data-t="subtotal"></span><div class="vk179-entry"><b aria-hidden="true">$</b><input id="vk179-cart" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="44" aria-label="Cart subtotal"></div></label>
      <label class="vk179-field" for="vk179-shipping"><span data-t="shipping"></span><div class="vk179-entry"><b aria-hidden="true">$</b><input id="vk179-shipping" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="9" aria-label="Ordinary shipping"></div></label>
      <label class="vk179-field" for="vk179-threshold"><span data-t="threshold"></span><div class="vk179-entry"><b aria-hidden="true">$</b><input id="vk179-threshold" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="50" aria-label="Free shipping threshold"></div></label>
      <label class="vk179-field vk179-accent" for="vk179-extra"><span data-t="extra"></span><div class="vk179-entry"><b aria-hidden="true">$</b><input id="vk179-extra" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="12" aria-label="Extra item price"></div></label>
    </form>
    <p class="vk179-error" id="vk179-error" role="alert" hidden></p>
    <div id="vk179-results"><div class="vk179-results">
      <div class="vk179-receipt" id="vk179-now"><div class="vk179-receipt-head"><span aria-hidden="true">▤</span><h3 data-t="noadd"></h3></div>
        <div class="vk179-receipt-row"><span data-t="items"></span><strong id="vk179-now-items">$44.00</strong></div>
        <div class="vk179-receipt-row"><span data-t="shippingLine"></span><strong id="vk179-now-ship">$9.00</strong></div><div class="vk179-receipt-total"><span data-t="total"></span><strong id="vk179-now-total">$53.00</strong></div>
      </div>
      <div class="vk179-receipt" id="vk179-with"><div class="vk179-receipt-head"><span aria-hidden="true">▧</span><h3 data-t="add"></h3></div>
        <div class="vk179-receipt-row"><span data-t="items"></span><strong id="vk179-with-items">$44.00</strong></div>
        <div class="vk179-receipt-row"><span data-t="extraLine"></span><strong id="vk179-with-extra">$12.00</strong></div>
        <div class="vk179-receipt-row vk179-shipping"><span data-t="shippingLine"></span><strong id="vk179-with-ship">$0.00</strong></div><div class="vk179-receipt-total"><span data-t="total"></span><strong id="vk179-with-total">$56.00</strong></div>
      </div>
      <div class="vk179-verdict" id="vk179-verdict" role="status" aria-live="polite"><span data-t="outcome" class="vk179-verdict-tag"></span><strong id="vk179-verdict-number">+$3.00</strong><b id="vk179-verdict-title" data-t="more"></b><p id="vk179-verdict-body"></p><div class="vk179-mini"><span data-t="thresholdNote"></span></div></div>
    </div></div>
    <div class="vk179-footer"><div class="vk179-hint"><button type="button" id="vk179-try" data-t="demo"></button><button type="button" id="vk179-reset" data-t="reset"></button></div>
      <div class="vk179-cta"><p data-t="result"></p><a id="vk179-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6821840147"><span data-t="store"></span> <span aria-hidden="true">↗</span></a></div>
      <p class="vk179-caveat" data-t="caveat"></p>
    </div>`;
  const crumb=document.querySelector('.p19-breadcrumb');
  if (crumb && crumb.parentNode) crumb.insertAdjacentElement('afterend',root);
  else {const point=document.querySelector('#p199-content')||document.querySelector('main');if(point && point.parentNode)point.parentNode.insertBefore(root,point);}
  if(!root.isConnected)return;
  const $=id=>root.querySelector(id);
  const lang=()=>{const el=document.querySelector('#p199-language');const v=((el?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en')+'').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const country=()=>{const v=(document.querySelector('#p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  const fmt=cents=>'$'+(cents/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  // Parse decimal currency into integer cents. Reject scientific notation, negative, blank and 3+ decimals.
  function parseMoney(selector){
    const text=$(selector).value.trim();
    if(!/^\d+(?:\.\d{1,2})?$/.test(text))return NaN;
    const parts=text.split('.'),whole=Number(parts[0]),frac=Number((parts[1]||'').padEnd(2,'0'));
    if(!Number.isSafeInteger(whole)||whole>1000000||!Number.isSafeInteger(frac))return NaN;
    return whole*100+frac;
  }
  let language='en';
  function calculate(){
    const t=i18n[language];
    const cart=parseMoney('#vk179-cart'),shipping=parseMoney('#vk179-shipping'),threshold=parseMoney('#vk179-threshold'),extra=parseMoney('#vk179-extra');
    const ok=[cart,shipping,threshold,extra].every(Number.isSafeInteger);
    $('#vk179-error').hidden=ok;$('#vk179-results').hidden=!ok;
    $('#vk179-error').textContent=ok?'':t.invalid;
    if(!ok)return;
    const withoutShipping=cart>=threshold?0:shipping;
    const withShipping=cart+extra>=threshold?0:shipping;
    const now=cart+withoutShipping,withItem=cart+extra+withShipping;
    const diff=withItem-now,abs=Math.abs(diff),state=diff>0?'more':diff<0?'save':'equal';
    $('#vk179-now-items').textContent=fmt(cart);
    $('#vk179-now-ship').textContent=withoutShipping===0?t.free:fmt(withoutShipping);
    $('#vk179-now-total').textContent=fmt(now);
    $('#vk179-with-items').textContent=fmt(cart);
    $('#vk179-with-extra').textContent=fmt(extra);
    $('#vk179-with-ship').textContent=withShipping===0?t.free:fmt(withShipping);
    $('#vk179-with-total').textContent=fmt(withItem);
    $('#vk179-verdict').dataset.state=state;
    $('#vk179-verdict-title').textContent=t[state];
    $('#vk179-verdict-number').textContent=(diff>0?'+':diff<0?'−':'')+fmt(abs);
    $('#vk179-verdict-body').textContent=t[state+'Text'].replace('{n}',fmt(abs));
    $('#vk179-now').dataset.cheaper=now<withItem?'yes':'no';
    $('#vk179-with').dataset.cheaper=withItem<now?'yes':'no';
  }
  function translate(){
    language=lang();const t=i18n[language];root.lang=language;root.dir=language==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{const key=el.dataset.t;if(t[key]!==undefined)el.textContent=t[key];});
    [['#vk179-cart','subtotal'],['#vk179-shipping','shipping'],['#vk179-threshold','threshold'],['#vk179-extra','extra']].forEach(([id,k])=>$(id).setAttribute('aria-label',t[k]));
    $('#vk179-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
    calculate();
  }
  ['#vk179-cart','#vk179-shipping','#vk179-threshold','#vk179-extra'].forEach(id=>$(id).addEventListener('input',calculate));
  $('#vk179-form').addEventListener('submit',ev=>ev.preventDefault());
  $('#vk179-try').addEventListener('click',()=>{$('#vk179-extra').value='8';calculate();});
  $('#vk179-reset').addEventListener('click',()=>{[['#vk179-cart','44'],['#vk179-shipping','9'],['#vk179-threshold','50'],['#vk179-extra','12']].forEach(([id,val])=>$(id).value=val);calculate();});
  document.querySelector('#p199-language')?.addEventListener('change',translate);
  document.querySelector('#p199-country')?.addEventListener('change',translate);
  translate();
})();
