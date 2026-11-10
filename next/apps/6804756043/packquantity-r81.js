/* TSZ LP R81 / PackQuantity (PackPlanner) — website-only whole-pack calculator.
   Input stays in this browser tab, is not stored or sent. It is not an app screenshot. */
(() => {
  'use strict';
  const APP='6804756043';
  const copy={
    en:{eyebrow:'BUY THE RIGHT NUMBER',badge:'INTERACTIVE WEBSITE EXAMPLE',heading:'How many whole packs?',intro:'Start with what you need. See the packs to buy, the unused remainder and the optional estimated total — with units converted for you.',need:'Amount needed',pack:'Amount per pack',price:'Price per pack (optional)',type:'Measure',weight:'Weight',volume:'Volume',count:'Items',packs:'Whole packs to buy',purchased:'Total purchased',leftover:'Amount left over',total:'Estimated purchase cost',formula:'Calculation',empty:'Enter a valid positive quantity and a pack size greater than zero.',large:'This example supports up to 100,000 packs. Please adjust the amounts.',badPrice:'Enter a non-negative pack price or leave the price blank.',notSet:'Not entered',reset:'Reset example',note:'Illustration for the website, not a screen of the PackQuantity / PackPlanner app. Values are sample inputs. Calculations are estimates, do not include tax, discounts or shipping, and store or send no information. Price units are illustrative; there is no currency conversion.',plus:'more',kg:'kg',g:'g',l:'L',ml:'mL',item:'items',unit:'units'},
    ja:{eyebrow:'必要な分だけ、買う前に',badge:'LP専用・操作できる説明例',heading:'何パック買えば足りる？',intro:'必要量と1パックの量を入力。必要なパック数、購入総量、余り、参考購入額を単位換算して表示します。',need:'必要な量',pack:'1パックの量',price:'1パックの価格（任意）',type:'種類',weight:'重さ',volume:'容量',count:'個数',packs:'購入するパック数',purchased:'購入する合計量',leftover:'余る量',total:'購入総額の目安',formula:'計算の内容',empty:'必要量とパック量に、0より大きい有効な数値を入力してください。',large:'この説明例の上限は100,000パックです。数値を調整してください。',badPrice:'価格は0以上の数値か空欄にしてください。',notSet:'未入力',reset:'例を初期値に戻す',note:'これはLP専用の説明例であり、PackQuantity / PackPlannerアプリの実画面ではありません。数値は例示で、税・割引・送料は計算に含みません。入力情報は保存・送信しません。金額単位は説明用で、通貨換算は行いません。',plus:'以上',kg:'kg',g:'g',l:'L',ml:'mL',item:'個',unit:'単位'},
    ar:{eyebrow:'اشترِ عدد العبوات المناسب',badge:'مثال تفاعلي خاص بالموقع',heading:'كم عبوة كاملة تحتاج؟',intro:'أدخل الكمية المطلوبة وكمية كل عبوة. شاهد عدد العبوات والباقي والتكلفة التقديرية مع تحويل الوحدات.',need:'الكمية المطلوبة',pack:'الكمية في العبوة',price:'سعر العبوة (اختياري)',type:'نوع القياس',weight:'الوزن',volume:'الحجم',count:'عدد القطع',packs:'عدد العبوات الكاملة',purchased:'إجمالي الكمية المشتراة',leftover:'الكمية المتبقية',total:'التكلفة التقديرية',formula:'طريقة الحساب',empty:'أدخل كميتين صحيحتين أكبر من صفر.',large:'يدعم المثال حتى 100,000 عبوة. غيّر الكميات.',badPrice:'أدخل سعراً غير سالب أو اتركه فارغاً.',notSet:'لم يُدخل',reset:'إعادة المثال',note:'هذا مثال على الموقع وليس شاشة فعلية من تطبيق PackQuantity / PackPlanner. الأرقام للشرح فقط ولا تشمل الضرائب أو الخصومات أو الشحن. لا تُحفظ أي مدخلات أو تُرسل. وحدات السعر توضيحية ولا يجري تحويل للعملات.',plus:'إضافية',kg:'كغ',g:'غ',l:'لتر',ml:'مل',item:'قطعة',unit:'وحدة'}
  };
  const modes={
    weight:{big:'kg',small:'g',factor:1000,need:'2.5',pack:'700',price:'5.80'},
    volume:{big:'l',small:'ml',factor:1000,need:'2.5',pack:'750',price:'4.20'},
    count:{big:'item',small:'item',factor:1,need:'19',pack:'8',price:'3.40'}
  };
  const language=()=>{
    const val=document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const code=String(val).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(copy,code)?code:'en';
  };
  const fmt=(n,dec=2)=>new Intl.NumberFormat(language()==='ar'?'ar-EG':language()==='ja'?'ja-JP':'en-US',{maximumFractionDigits:dec}).format(n);
  function mount(){
    if(!document.body || (document.body.dataset.p199Id!==APP && document.body.dataset.p19AppId!==APP))return;
    const anchor=document.getElementById('overview');
    if(!anchor || document.getElementById('tsz-pq81'))return;
    const root=document.createElement('section');
    root.id='tsz-pq81';root.dataset.illustration='not-an-app-screen';
    root.setAttribute('aria-label','PackQuantity website-only whole-pack planning illustration');
    root.innerHTML=`<div class="pq81-top"><span data-t="eyebrow" class="pq81-eyebrow"></span><span data-t="badge" class="pq81-badge"></span></div>
      <div class="pq81-inner"><div class="pq81-controls"><h2 data-t="heading"></h2><p class="pq81-intro" data-t="intro"></p>
      <div class="pq81-field"><label for="pq81-mode" data-t="type"></label><select id="pq81-mode"><option value="weight" data-t="weight"></option><option value="volume" data-t="volume"></option><option value="count" data-t="count"></option></select></div>
      <div class="pq81-field-row"><div class="pq81-field"><label for="pq81-need" data-t="need"></label><div class="pq81-combo"><input id="pq81-need" type="number" step="any" min="0" inputmode="decimal" value="2.5"><select id="pq81-need-unit" aria-label="Required amount unit"></select></div></div>
      <div class="pq81-field"><label for="pq81-pack" data-t="pack"></label><div class="pq81-combo"><input id="pq81-pack" type="number" step="any" min="0" inputmode="decimal" value="700"><select id="pq81-pack-unit" aria-label="Pack size unit"></select></div></div></div>
      <div class="pq81-field"><label for="pq81-price" data-t="price"></label><div class="pq81-combo pq81-price"><input id="pq81-price" type="number" step="any" min="0" inputmode="decimal" value="5.80"><span data-t="unit"></span></div></div>
      <button type="button" class="pq81-reset" data-action="reset" data-t="reset"></button></div>
      <div class="pq81-results" aria-live="polite"><div class="pq81-highlight"><span data-t="packs"></span><strong data-out="packs">4</strong><div class="pq81-packs" data-out="illustration" aria-hidden="true"></div></div>
      <div class="pq81-result-grid"><div><span data-t="purchased"></span><strong data-out="purchased"></strong></div><div><span data-t="leftover"></span><strong data-out="leftover"></strong></div></div>
      <div class="pq81-total"><span data-t="total"></span><strong data-out="total"></strong></div>
      <div class="pq81-equation"><span data-t="formula"></span><p data-out="formula"></p></div><p class="pq81-error" role="status" data-out="error" hidden></p></div></div>
      <p class="pq81-note" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    const $=s=>root.querySelector(s);
    const need=$('#pq81-need'),pack=$('#pq81-pack'),price=$('#pq81-price'),mode=$('#pq81-mode'),needUnit=$('#pq81-need-unit'),packUnit=$('#pq81-pack-unit');
    const out=(name,txt)=>{$(`[data-out="${name}"]`).textContent=txt;};
    const labels=(m)=>m==='count'?[['item',copy[language()].item]]:[['big',copy[language()][modes[m].big]],['small',copy[language()][modes[m].small]]];
    let lastLanguage=language();
    function fillUnits(keep=false){
      const a=keep?needUnit.value:'big',b=keep?packUnit.value:'small';
      const options=labels(mode.value);
      for(const element of [needUnit,packUnit]){
        element.replaceChildren(...options.map(([val,text])=>{const option=document.createElement('option');option.value=val;option.textContent=text;return option;}));
      }
      needUnit.value=options.some(x=>x[0]===a)?a:options[0][0];
      packUnit.value=options.some(x=>x[0]===b)?b:options[0][0];
    }
    const factor=unit=>unit==='big'?modes[mode.value].factor:1;
    const baseLabel=()=>copy[language()][mode.value==='count'?'item':modes[mode.value].small];
    const number=el=>el.value.trim()===''?NaN:Number(el.value);
    function calculate(){
      const t=copy[language()],n=number(need),p=number(pack),val=price.value.trim()===''?null:Number(price.value);
      let err='';
      if(!Number.isFinite(n)||!Number.isFinite(p)||n<=0||p<=0)err=t.empty;
      else if(val!==null&&(!Number.isFinite(val)||val<0))err=t.badPrice;
      const totalNeed=n*factor(needUnit.value),each=p*factor(packUnit.value);
      const count=Math.ceil(totalNeed/each);
      if(!err&&(!Number.isFinite(count)||count>100000||!Number.isSafeInteger(count)))err=t.large;
      const error=$('[data-out="error"]');error.hidden=!err;error.textContent=err;
      $('.pq81-results').classList.toggle('pq81-invalid',!!err);
      if(err){out('packs','—');out('purchased','—');out('leftover','—');out('total','—');out('formula','—');$('[data-out="illustration"]').replaceChildren();return;}
      const bought=count*each,left=Math.max(0,bought-totalNeed),unit=baseLabel();
      out('packs',fmt(count,0));
      out('purchased',fmt(bought)+' '+unit);
      out('leftover',fmt(left)+' '+unit);
      out('total',val===null?t.notSet:fmt(count*val)+' '+t.unit);
      out('formula',`${fmt(totalNeed)} ${unit} ÷ ${fmt(each)} ${unit} = ${fmt(count,0)} · ${fmt(bought)} − ${fmt(totalNeed)} = ${fmt(left)} ${unit}`);
      const illustration=$('[data-out="illustration"]');illustration.replaceChildren();
      for(let i=0;i<Math.min(count,7);i++){
        const item=document.createElement('span');item.className='pq81-pack-icon';item.setAttribute('aria-hidden','true');illustration.append(item);
      }
      if(count>7){const more=document.createElement('small');more.textContent='+'+fmt(count-7,0);illustration.append(more);}
    }
    function reset(){mode.value='weight';need.value=modes.weight.need;pack.value=modes.weight.pack;price.value=modes.weight.price;fillUnits();calculate();}
    function refreshLanguage(){
      const t=copy[language()];root.dir=language()==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{if(t[el.dataset.t])el.textContent=t[el.dataset.t];});
      fillUnits(true);calculate();
    }
    mode.addEventListener('change',()=>{const m=modes[mode.value];need.value=m.need;pack.value=m.pack;price.value=m.price;fillUnits();calculate();});
    for(const el of [need,pack,price,needUnit,packUnit])el.addEventListener(el.tagName==='SELECT'?'change':'input',calculate);
    $('[data-action="reset"]').addEventListener('click',reset);
    document.getElementById('p199-language')?.addEventListener('change',()=>{lastLanguage=language();refreshLanguage();});
    new MutationObserver(()=>{const next=language();if(next!==lastLanguage){lastLanguage=next;refreshLanguage();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    fillUnits();refreshLanguage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
