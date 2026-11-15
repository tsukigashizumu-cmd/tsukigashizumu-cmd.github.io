/* R215 Vekunel — isolated, manual checkout comparison; no storage, tracking, network, pricing/FX lookup. */
(() => {
  'use strict';
  const APP = '6821840147';
  const ID = 'tsz-vekunel-r215';
  const body = document.body;
  if (!body || (body.dataset.p199Id || body.dataset.p19AppId) !== APP || document.getElementById(ID)) return;
  const main = document.querySelector('main');
  if (!main) return;

  const tr = {
    en: {
      kicker:'VEKUNEL / THE CHECKOUT QUESTION', headline:'Free shipping. A higher total?',
      sub:'A tempting extra item can erase the delivery fee—and still cost more. Compare the final numbers before adding it.',
      sample:'TRY A SCENARIO', trap:'Free-shipping trap', save:'Actually saves', miss:'Still below threshold',
      label:'THE FOUR NUMBERS', hint:'Edit any amount. The two checkout totals update immediately.',
      subtotal:'Original cart', shipping:'Ordinary shipping', threshold:'Free shipping at', extra:'Extra item price',
      original:'AS PLANNED', withExtra:'WITH ONE EXTRA ITEM', goods:'Items', fee:'Delivery',
      free:'FREE', charged:'CHARGED', result:'THE ACTUAL DIFFERENCE', greater:'Adding costs more', lesser:'Adding costs less', equal:'Both totals are equal',
      diffMore:'more at checkout', diffLess:'less at checkout', diffEqual:'No difference in what you pay',
      above:'Extra item qualifies for free shipping.', below:'Extra item does not reach the free-shipping threshold.',
      already:'The original cart already qualifies for free shipping.', originalFree:'Your original cart already ships free.',
      alert:'Enter valid non-negative amounts (up to 1,000,000; maximum two decimal places).',
      math:'Original: items + applicable shipping. Extra: (items + extra) + applicable shipping.',
      note:'Website illustration, not a checkout quote. Assumes the threshold applies to the displayed cart subtotal. Does not include tax, coupons, excluded items, or other fees. All amounts are USD; App Store region does not convert currency.',
      language:'Language', region:'App Store region', reset:'Reset sample', cta:'See Vekunel on the App Store',
      footer:'Do not chase “free” without checking the final total.', priceUnit:'USD · illustrative amounts'
    },
    ja: {
      kicker:'VEKUNEL / 支払総額の確認', headline:'送料無料なのに、総額は高くなる？',
      sub:'もう1点で送料が無料になっても、支払総額が安くなるとは限りません。追加前後の金額を比較しましょう。',
      sample:'例を切り替える', trap:'送料無料の落とし穴', save:'追加したほうが安い', miss:'送料無料に届かない',
      label:'比較する4つの金額', hint:'金額を変更すると、支払総額をすぐに再計算します。',
      subtotal:'元の商品合計', shipping:'通常送料', threshold:'送料無料の条件', extra:'追加商品の価格',
      original:'予定どおり購入', withExtra:'もう1点追加', goods:'商品合計', fee:'送料',
      free:'無料', charged:'有料', result:'実際の支払差額', greater:'追加すると高くなる', lesser:'追加すると安くなる', equal:'支払総額は同じ',
      diffMore:'追加した場合の増額', diffLess:'追加した場合の節約額', diffEqual:'支払総額に差はありません',
      above:'追加後は送料無料の条件に届きます。', below:'追加しても送料無料の条件に届きません。',
      already:'元のカートで送料無料の条件を満たしています。', originalFree:'元のカートも送料無料です。',
      alert:'0以上1,000,000以下で、小数点以下2桁までの金額を入力してください。',
      math:'元：商品合計＋対象送料。追加後：（商品合計＋追加商品）＋対象送料。',
      note:'このWebデモは見積もり例です。送料無料の条件は入力した商品合計に適用されるものとし、税・クーポン・対象外商品・その他の手数料は含みません。金額はUSDの例で、App Store地域を変えても為替換算しません。',
      language:'言語', region:'App Store地域', reset:'例を初期化', cta:'App StoreでVekunelを見る',
      footer:'「無料」の表示より、最後に払う額で比べよう。', priceUnit:'USD · 説明用の金額'
    },
    ar: {
      kicker:'VEKUNEL / مقارنة المبلغ النهائي', headline:'شحن مجاني. لكن هل المجموع أعلى؟',
      sub:'قد تلغي سلعة إضافية رسوم الشحن، ومع ذلك تزيد ما تدفعه. قارن المجموعين قبل الإضافة.',
      sample:'جرّب مثالًا', trap:'فخ الشحن المجاني', save:'الإضافة أوفر', miss:'دون الحد المطلوب',
      label:'أربعة مبالغ للمقارنة', hint:'غيّر أي مبلغ لرؤية الإجمالي الجديد فورًا.',
      subtotal:'قيمة السلة الأصلية', shipping:'رسوم الشحن العادية', threshold:'حد الشحن المجاني', extra:'سعر السلعة الإضافية',
      original:'الشراء كما هو', withExtra:'مع سلعة إضافية', goods:'قيمة السلع', fee:'الشحن',
      free:'مجاني', charged:'برسوم', result:'الفرق الحقيقي', greater:'الإضافة أغلى', lesser:'الإضافة أوفر', equal:'المجموعان متساويان',
      diffMore:'زيادة عند الدفع', diffLess:'توفير عند الدفع', diffEqual:'لا فرق في المبلغ المدفوع',
      above:'بعد الإضافة تصل السلة إلى حد الشحن المجاني.', below:'الإضافة لا تصل إلى حد الشحن المجاني.',
      already:'السلة الأصلية مؤهلة للشحن المجاني بالفعل.', originalFree:'السلة الأصلية بشحن مجاني أيضًا.',
      alert:'أدخل مبلغًا من 0 إلى 1,000,000 وبحد أقصى منزلتين عشريتين.',
      math:'الأصل: السلع + الشحن المطبق. مع الإضافة: السلع + السلعة الجديدة + الشحن المطبق.',
      note:'مثال توضيحي على الموقع وليس سعرًا نهائيًا. نفترض أن حد الشحن المجاني ينطبق على مجموع السلة المعروض. لا يشمل الضرائب والقسائم والسلع المستثناة والرسوم الأخرى. المبالغ بالدولار الأمريكي، وتغيير منطقة المتجر لا يحول العملات.',
      language:'اللغة', region:'منطقة App Store', reset:'إعادة المثال', cta:'اكتشف Vekunel على App Store',
      footer:'قارن الإجمالي النهائي، لا كلمة «مجاني».', priceUnit:'دولار أمريكي · مثال توضيحي'
    }
  };
  const scenarios = {
    trap: {subtotal:42, shipping:6, threshold:50, extra:12},
    save: {subtotal:42, shipping:12, threshold:50, extra:8},
    miss: {subtotal:42, shipping:6, threshold:55, extra:8}
  };
  const getLang = v => /^ar(?:\b|[-_])/i.test(v||'')?'ar':/^ja(?:\b|[-_])/i.test(v||'')?'ja':'en';
  const getRegion = v => /^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
  let lang = 'en', region = 'us', active = 'trap', syncing = false;
  const initialLang = document.querySelector('#p199-language,#p19-language,#vekunel-language,#vk33-language');
  const initialRegion = document.querySelector('#p199-country,#p19-country,#vekunel-country,#vk33-country');
  if(initialLang && initialLang.value) lang=getLang(initialLang.value);
  if(initialRegion && initialRegion.value) region=getRegion(initialRegion.value);

  const section=document.createElement('section'); section.id=ID;section.setAttribute('aria-label','Vekunel checkout comparison');
  section.innerHTML=`
  <div class="vk215-shell">
    <div class="vk215-top"><div class="vk215-mark"><span class="vk215-markicon" aria-hidden="true">◇</span> VEKUNEL <small> / 215</small></div><span class="vk215-topside" data-t="priceUnit"></span></div>
    <div class="vk215-hero"><p class="vk215-kicker" data-t="kicker"></p><h2 data-t="headline"></h2><p class="vk215-lede" data-t="sub"></p></div>
    <div class="vk215-workspace">
      <div class="vk215-editor">
        <div class="vk215-caption"><span>01</span><strong data-t="sample"></strong></div>
        <div class="vk215-presets" role="group" aria-label="Scenario presets">
          <button type="button" data-scenario="trap" data-t="trap"></button>
          <button type="button" data-scenario="save" data-t="save"></button>
          <button type="button" data-scenario="miss" data-t="miss"></button>
        </div>
        <div class="vk215-caption vk215-second"><span>02</span><strong data-t="label"></strong></div>
        <p class="vk215-hint" data-t="hint"></p>
        <div class="vk215-fields">
          <label><span data-t="subtotal"></span><div class="vk215-money"><b>$</b><input id="vk215-subtotal" name="subtotal" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="42" aria-label="Original cart subtotal"></div></label>
          <label><span data-t="shipping"></span><div class="vk215-money"><b>$</b><input id="vk215-shipping" name="shipping" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="6" aria-label="Ordinary shipping fee"></div></label>
          <label><span data-t="threshold"></span><div class="vk215-money"><b>$</b><input id="vk215-threshold" name="threshold" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="50" aria-label="Free shipping threshold"></div></label>
          <label><span data-t="extra"></span><div class="vk215-money"><b>$</b><input id="vk215-extra" name="extra" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="12" aria-label="Extra item price"></div></label>
        </div>
        <p class="vk215-error" id="vk215-error" role="alert" hidden data-t="alert"></p>
        <button class="vk215-reset" id="vk215-reset" type="button"><span aria-hidden="true">↺</span><span data-t="reset"></span></button>
      </div>
      <div class="vk215-results" aria-live="polite">
        <div class="vk215-caption"><span>03</span><strong data-t="result"></strong></div>
        <div class="vk215-compare">
          <div class="vk215-card" id="vk215-original-card"><div class="vk215-cardhead" data-t="original"></div><strong class="vk215-total" id="vk215-original-total">$48.00</strong><div class="vk215-line"><span data-t="goods"></span><span id="vk215-original-goods"></span></div><div class="vk215-line"><span data-t="fee"></span><span id="vk215-original-shipping"></span></div></div>
          <div class="vk215-card vk215-added" id="vk215-extra-card"><div class="vk215-cardhead" data-t="withExtra"></div><strong class="vk215-total" id="vk215-extra-total">$54.00</strong><div class="vk215-line"><span data-t="goods"></span><span id="vk215-extra-goods"></span></div><div class="vk215-line"><span data-t="fee"></span><span id="vk215-extra-shipping"></span></div></div>
        </div>
        <div class="vk215-verdict" id="vk215-verdict"><div class="vk215-verdictbar"><span id="vk215-verdict-title"></span><strong id="vk215-difference"></strong></div><p id="vk215-difference-caption"></p><div class="vk215-bars"><div class="vk215-barrow"><span data-t="original"></span><div class="vk215-bartrack"><i id="vk215-bar-original"></i></div></div><div class="vk215-barrow"><span data-t="withExtra"></span><div class="vk215-bartrack"><i id="vk215-bar-extra"></i></div></div></div><p class="vk215-context" id="vk215-context"></p></div>
      </div>
    </div>
    <div class="vk215-bottom"><p class="vk215-quiet" data-t="footer"></p><p class="vk215-math" data-t="math"></p><p class="vk215-note" data-t="note"></p>
      <div class="vk215-footer"><div class="vk215-selects"><label><span data-t="language"></span><select id="vk215-lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="vk215-region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="vk215-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span><span aria-hidden="true">↗</span></a></div>
    </div>
  </div>`;
  main.prepend(section);
  const $ = s => section.querySelector(s);
  const words = () => tr[lang];
  const currency = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  // USD is kept through locale/region changes to avoid implying an FX conversion.
  const money = amount => currency.format(amount);
  const fields = ['subtotal','shipping','threshold','extra'];
  const hostSelectors = {
    lang:['#p199-language','#p19-language','#vekunel-language','#vk33-language','header select[id*="language"]'],
    region:['#p199-country','#p19-country','#vekunel-country','#vk33-country','header select[id*="country"]','header select[id*="region"]']
  };
  function host(kind){for(const s of hostSelectors[kind]){const el=document.querySelector(s);if(el&&!section.contains(el))return el;}return null;}
  function setHost(kind,value){const el=host(kind);if(!el||!el.options||!el.options.length)return;
    const norm=kind==='lang'?getLang:getRegion;
    const match=Array.from(el.options).find(o=>norm(o.value)===value && (value!=='en'||/^en/i.test(o.value)) && (value!=='us'||/^us/i.test(o.value)));
    if(match&&el.value!==match.value){el.value=match.value;el.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  function syncHost(){if(syncing)return;syncing=true;try{setHost('lang',lang);setHost('region',region);}finally{syncing=false;}}
  function valid(raw){if(raw.trim()===''||!/^(?:\d{1,7})(?:\.\d{1,2})?$/.test(raw.trim()))return null;const n=Number(raw);return Number.isFinite(n)&&n>=0&&n<=1000000?Math.round(n*100)/100:null;}
  function render(){
    section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
    section.querySelectorAll('[data-t]').forEach(el=>{el.textContent=words()[el.dataset.t]||'';});
    $('#vk215-lang').value=lang;$('#vk215-region').value=region;
    $('#vk215-store').href=`https://apps.apple.com/${region}/app/vekunel/id${APP}`;
    section.querySelectorAll('[data-scenario]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.scenario===active)));
    const amounts={};let ok=true;
    for(const k of fields){amounts[k]=valid($('#vk215-'+k).value);if(amounts[k]===null)ok=false;}
    $('#vk215-error').hidden=ok;
    $('.vk215-results').classList.toggle('vk215-invalid',!ok);
    if(!ok){$('#vk215-verdict-title').textContent='—';$('#vk215-difference').textContent='—';$('#vk215-difference-caption').textContent='';$('#vk215-context').textContent='';return;}
    const {subtotal,shipping,threshold,extra}=amounts;
    const originalFree=subtotal>=threshold;
    const newCart=Math.round((subtotal+extra)*100)/100;
    const afterFree=newCart>=threshold;
    const originalFee=originalFree?0:shipping;
    const newFee=afterFree?0:shipping;
    const originalTotal=Math.round((subtotal+originalFee)*100)/100;
    const afterTotal=Math.round((newCart+newFee)*100)/100;
    const change=Math.round((afterTotal-originalTotal)*100)/100;
    $('#vk215-original-total').textContent=money(originalTotal);
    $('#vk215-extra-total').textContent=money(afterTotal);
    $('#vk215-original-goods').textContent=money(subtotal);
    $('#vk215-extra-goods').textContent=money(newCart);
    $('#vk215-original-shipping').textContent=originalFree?words().free:money(originalFee);
    $('#vk215-extra-shipping').textContent=afterFree?words().free:money(newFee);
    $('#vk215-original-card').classList.toggle('vk215-winner',change>0.001);
    $('#vk215-extra-card').classList.toggle('vk215-winner',change< -0.001);
    const same=Math.abs(change)<0.001;
    $('#vk215-verdict').dataset.state=same?'equal':change>0?'more':'less';
    $('#vk215-verdict-title').textContent=same?words().equal:change>0?words().greater:words().lesser;
    $('#vk215-difference').textContent=same?money(0):(change>0?'+':'−')+money(Math.abs(change));
    $('#vk215-difference-caption').textContent=same?words().diffEqual:change>0?words().diffMore:words().diffLess;
    $('#vk215-context').textContent=originalFree?words().already:afterFree?words().above:words().below;
    const max=Math.max(1,originalTotal,afterTotal);
    $('#vk215-bar-original').style.width=(100*originalTotal/max)+'%';
    $('#vk215-bar-extra').style.width=(100*afterTotal/max)+'%';
    $('#vk215-original-card').setAttribute('aria-label',words().original+' '+money(originalTotal));
    $('#vk215-extra-card').setAttribute('aria-label',words().withExtra+' '+money(afterTotal));
  }
  function scenario(key){active=key;const values=scenarios[key];fields.forEach(k=>{$('#vk215-'+k).value=String(values[k]);});render();}
  section.querySelectorAll('[data-scenario]').forEach(el=>el.addEventListener('click',()=>scenario(el.dataset.scenario)));
  fields.forEach(k=>$('#vk215-'+k).addEventListener('input',()=>{active='';render();}));
  $('#vk215-reset').addEventListener('click',()=>scenario('trap'));
  $('#vk215-lang').addEventListener('change',e=>{lang=getLang(e.currentTarget.value);render();syncHost();});
  $('#vk215-region').addEventListener('change',e=>{region=getRegion(e.currentTarget.value);render();syncHost();});
  // Delegation also catches a legacy header whose options or DOM load after this script.
  document.addEventListener('change',event=>{
    if(syncing||section.contains(event.target))return;
    if(event.target===host('lang')){lang=getLang(event.target.value);render();}
    if(event.target===host('region')){region=getRegion(event.target.value);render();}
  });
  render();
})();
