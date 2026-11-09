/* TSZ LP R72: conceptual calculator for Unit Choice. Not a screenshot or a claim of exact app UI. */
(() => {
  'use strict';
  const ID = '6762347699';
  const TEXT = {
    en:{tag:'INTERACTIVE EXAMPLE',title:'Find the better value.',sub:'Try two prices and quantities in the same unit. The smaller unit price wins.',price:'Price',qty:'Quantity',unit:'Per unit',best:'LOWER',result:'Better value',tie:'Same unit price',saving:'LESS PER UNIT',invalid:'Enter a price and a quantity greater than zero for both options.',foot:'Illustrative numbers only · No live prices · Not an in-app screenshot'},
    ja:{tag:'比較を試す',title:'どちらが本当にお得？',sub:'同じ単位で価格と数量を入力すると、単価を比較できます。',price:'価格',qty:'数量',unit:'単価',best:'お得',result:'お得なのは',tie:'単価は同じ',saving:'単価が安い',invalid:'両方とも価格と数量に0より大きい数を入力してください。',foot:'入力値による計算例です · 実売価格ではありません · アプリ画面ではありません'},
    ar:{tag:'مثال تفاعلي',title:'أيّهما أوفر؟',sub:'أدخل سعر وكمية كل خيار، ثم قارن سعر الوحدة.',price:'السعر',qty:'الكمية',unit:'سعر الوحدة',best:'أوفر',result:'الخيار الأفضل',tie:'سعر الوحدة متساوٍ',saving:'أقل لكل وحدة',invalid:'أدخل سعرًا وكمية أكبر من الصفر لكل خيار.',foot:'مثال توضيحي فقط · ليست أسعارًا مباشرة أو لقطة من التطبيق'}
  };
  const tr = (lang) => TEXT[lang] || TEXT.en;
  const lang = () => {
    const selector = document.getElementById('p199-language');
    const raw = String((selector && selector.value) || document.documentElement.lang || navigator.language || 'en').toLowerCase();
    return raw.split(/[-_]/)[0];
  };
  function add(){
    const body=document.body;
    if(!body || (body.dataset.p199Id!==ID && body.dataset.p19AppId!==ID))return;
    const target=document.getElementById('overview');
    if(!target || document.getElementById('tsz-uc72-lab'))return;
    const section=document.createElement('section');
    section.id='tsz-uc72-lab';
    section.className='tsz-uc72';
    section.dataset.tszIllustration='interactive-calculation-not-app-ui';
    section.setAttribute('aria-label','Unit Choice interactive example');
    section.innerHTML=`
      <div class="tsz-uc72__head"><div><p class="tsz-uc72__eyebrow" data-l="tag"></p><h2 class="tsz-uc72__title" data-l="title"></h2></div><div class="tsz-uc72__monogram" aria-hidden="true">A/B</div></div>
      <p class="tsz-uc72__sub" data-l="sub"></p>
      <div class="tsz-uc72__grid">
        <div class="tsz-uc72__card" data-option="a"><div class="tsz-uc72__card-top"><span class="tsz-uc72__letter">A</span><span class="tsz-uc72__winner" data-l="best"></span></div>
          <div class="tsz-uc72__fields"><label class="tsz-uc72__field"><span data-l="price"></span><input class="tsz-uc72__input" data-input="price-a" type="number" min="0.000001" step="any" value="400" inputmode="decimal" autocomplete="off"></label>
          <label class="tsz-uc72__field"><span data-l="qty"></span><input class="tsz-uc72__input" data-input="qty-a" type="number" min="0.000001" step="any" value="500" inputmode="decimal" autocomplete="off"></label></div>
          <div class="tsz-uc72__unitrow"><span class="tsz-uc72__unitlabel" data-l="unit"></span><output class="tsz-uc72__unitvalue" data-output="a">0.80</output></div>
        </div>
        <div class="tsz-uc72__card" data-option="b"><div class="tsz-uc72__card-top"><span class="tsz-uc72__letter">B</span><span class="tsz-uc72__winner" data-l="best"></span></div>
          <div class="tsz-uc72__fields"><label class="tsz-uc72__field"><span data-l="price"></span><input class="tsz-uc72__input" data-input="price-b" type="number" min="0.000001" step="any" value="560" inputmode="decimal" autocomplete="off"></label>
          <label class="tsz-uc72__field"><span data-l="qty"></span><input class="tsz-uc72__input" data-input="qty-b" type="number" min="0.000001" step="any" value="800" inputmode="decimal" autocomplete="off"></label></div>
          <div class="tsz-uc72__unitrow"><span class="tsz-uc72__unitlabel" data-l="unit"></span><output class="tsz-uc72__unitvalue" data-output="b">0.70</output></div>
        </div>
      </div>
      <div class="tsz-uc72__result" role="status" aria-live="polite" aria-atomic="true"><span class="tsz-uc72__verdict" data-output="verdict"></span><strong class="tsz-uc72__saving" data-output="saving"></strong></div>
      <p class="tsz-uc72__invalid" data-output="error" hidden></p>
      <p class="tsz-uc72__foot" data-l="foot"></p>`;
    target.insertAdjacentElement('afterend',section);
    const $=(key)=>(section.querySelector(`[data-output="${key}"]`));
    const input=(key)=>(section.querySelector(`[data-input="${key}"]`));
    const fmt=(num)=>new Intl.NumberFormat(document.documentElement.lang || 'en-US',{maximumFractionDigits:5}).format(num);
    let current=tr(lang());
    function draw(){
      current=tr(lang());
      section.lang = lang()==='ja'?'ja':(lang()==='ar'?'ar':'en');
      section.dir = lang()==='ar'?'rtl':'ltr';
      section.querySelectorAll('[data-l]').forEach(n=>{n.textContent=current[n.dataset.l] || '';});
      const values=['price-a','qty-a','price-b','qty-b'].map(k=>Number(input(k).value));
      const valid=values.every(x=>Number.isFinite(x)&&x>0&&x<=1e12) && values.every((v,i)=>input(['price-a','qty-a','price-b','qty-b'][i]).value.trim()!=='');
      const err=$('error');err.hidden=valid;err.textContent=valid?'':current.invalid;
      ['a','b'].forEach(k=>section.querySelector(`[data-option="${k}"]`).dataset.win='false');
      if(!valid){$('a').textContent='—';$('b').textContent='—';$('verdict').textContent='—';$('saving').textContent='';return;}
      const a=values[0]/values[1],b=values[2]/values[3];
      if(!Number.isFinite(a)||!Number.isFinite(b)){$('verdict').textContent=current.invalid;return;}
      $('a').textContent=fmt(a);$('b').textContent=fmt(b);
      if(Math.abs(a-b)<=Math.max(a,b)*1e-12){$('verdict').textContent=current.tie;$('saving').textContent='0%';return;}
      const winner=a<b?'A':'B';
      section.querySelector(`[data-option="${winner.toLowerCase()}"]`).dataset.win='true';
      $('verdict').textContent=`${current.result}: ${winner}`;
      $('saving').textContent=`${fmt((1-Math.min(a,b)/Math.max(a,b))*100)}% ${current.saving}`;
    }
    section.querySelectorAll('input').forEach(el=>el.addEventListener('input',draw));
    const languageSelect=document.getElementById('p199-language');
    if(languageSelect)languageSelect.addEventListener('change',draw);
    draw();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});
  else add();
})();
