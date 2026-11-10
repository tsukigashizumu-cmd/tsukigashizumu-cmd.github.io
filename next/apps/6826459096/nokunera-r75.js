/* TSZ LP R75 / Nokunera — local illustrative interaction. NOT a screenshot or in-app feature. */
(() => {
  'use strict';
  const APP = '6826459096';
  const LIMIT = 999;
  const COPY = {
    en: {
      tag:'TRY ONE ITEM', title:'Start with what you always run out of.',
      lead:'One essential. One place. One number you can check before the next shopping trip.',
      step1:'Choose a household essential.', step2:'Record where it lives and how much remains.', step3:'Set a minimum reserve so a low count is easy to spot.',
      card:'HOUSEHOLD STOCK', demo:'SAMPLE', item:'Item', place:'Stored in', amount:'Quantity left', reserve:'Minimum reserve',
      tissues:'Tissues', paper:'Toilet paper', detergent:'Detergent', cupboard:'Hall cupboard', bathroom:'Bathroom cabinet', laundry:'Laundry shelf',
      ok:'Enough for now', low:'Time to check your supply',
      okInfo:'Above your minimum reserve.', lowInfo:'At or below your minimum reserve.',
      use:'Use one', restock:'Add one', reset:'Reset',
      note:'Interactive illustration only. Changes stay in this page and are not saved. This is not an actual Nokunera screen. In the app, quantities and usage are recorded manually; no automatic stock counting or cloud sync.'
    },
    ja: {
      tag:'まず一品を体験', title:'いつも切らしてしまう、その一品から。',
      lead:'家じゅうを管理しなくても大丈夫。置き場所と残りの数を、まず一品だけ確かめよう。',
      step1:'気になる日用品を一品選ぶ。', step2:'保管場所と残りの数を記録する。', step3:'最低限必要な数を決めて、在庫不足に気づきやすくする。',
      card:'家のストック', demo:'操作サンプル', item:'品目', place:'保管場所', amount:'残りの数', reserve:'最低在庫',
      tissues:'ティッシュ', paper:'トイレットペーパー', detergent:'洗剤', cupboard:'廊下の棚', bathroom:'洗面所の棚', laundry:'洗濯用品の棚',
      ok:'ひとまず安心', low:'そろそろ補充を確認',
      okInfo:'最低在庫を上回っています。', lowInfo:'最低在庫以下になっています。',
      use:'1個使う', restock:'1個補充', reset:'最初から',
      note:'これは操作を理解するための独立したイメージです。入力は保存されません。Nokuneraの実画面ではありません。アプリ本体も数量・使用量は手入力で、在庫の自動計数やクラウド同期には対応していません。'
    },
    ar: {
      tag:'ابدأ بعنصر واحد', title:'ابدأ بالشيء الذي ينفد دائمًا.',
      lead:'لا حاجة لتنظيم المنزل كله. ابدأ بمكان واحد وكمية واحدة يمكنك مراجعتها.',
      step1:'اختر مستلزمًا منزليًا واحدًا.', step2:'سجّل مكانه والكمية المتبقية.', step3:'حدّد الحد الأدنى لتلاحظ نقص المخزون بسهولة.',
      card:'مخزون المنزل', demo:'مثال', item:'العنصر', place:'مكان التخزين', amount:'الكمية المتبقية', reserve:'الحد الأدنى',
      tissues:'مناديل ورقية', paper:'ورق المرحاض', detergent:'منظّف', cupboard:'خزانة الممر', bathroom:'خزانة الحمّام', laundry:'رف الغسيل',
      ok:'المخزون كافٍ', low:'تحقّق من المخزون',
      okInfo:'الكمية أعلى من الحد الأدنى.', lowInfo:'الكمية تساوي الحد الأدنى أو أقل.',
      use:'استخدم واحدة', restock:'أضف واحدة', reset:'إعادة الضبط',
      note:'رسم تفاعلي توضيحي فقط. لا تُحفَظ التغييرات. هذه ليست شاشة حقيقية من Nokunera. تُسجَّل الكميات والاستخدام يدويًا في التطبيق، دون عدّ تلقائي أو مزامنة سحابية.'
    }
  };
  const KEYS = ['tissues','paper','detergent'];
  const PLACES = ['cupboard','bathroom','laundry'];
  function language(){
    const select=document.getElementById('p199-language');
    return String((select && select.value) || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
  }
  function copy(){ const code=language();return COPY[code] || COPY.en; }
  function mount(){
    const body=document.body;
    if (!body || (body.dataset.p199Id!==APP && body.dataset.p19AppId!==APP)) return;
    const overview=document.getElementById('overview');
    if (!overview || document.getElementById('tsz-nk75')) return;
    const root=document.createElement('section');
    root.id='tsz-nk75';root.className='tsz-nk75';
    root.setAttribute('aria-label','Nokunera one-item interactive illustration');
    root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="nk75-flag" data-t="tag"></div>
      <div class="nk75-grid">
        <div class="nk75-copy">
          <h2 data-t="title"></h2><p class="nk75-lead" data-t="lead"></p>
          <ol class="nk75-steps"><li><b>1</b><span data-t="step1"></span></li><li><b>2</b><span data-t="step2"></span></li><li><b>3</b><span data-t="step3"></span></li></ol>
        </div>
        <div class="nk75-card">
          <div class="nk75-cardhead"><span data-t="card"></span><span class="nk75-demo" data-t="demo"></span></div>
          <div class="nk75-fields">
            <label class="nk75-field nk75-wide"><span data-t="item"></span><select class="nk75-select" data-field="item"></select></label>
            <label class="nk75-field nk75-wide"><span data-t="place"></span><select class="nk75-select" data-field="place"></select></label>
            <div class="nk75-field"><span data-t="amount"></span><div class="nk75-counter"><button type="button" data-act="minus" aria-label="Decrease amount">−</button><output data-out="qty">2</output><button type="button" data-act="plus" aria-label="Increase amount">+</button></div></div>
            <label class="nk75-field"><span data-t="reserve"></span><input class="nk75-input" data-field="reserve" type="number" inputmode="numeric" min="0" max="999" step="1" value="1"></label>
          </div>
          <div class="nk75-result" role="status" aria-live="polite"><i class="nk75-dot" aria-hidden="true"></i><div class="nk75-result-text"><strong data-out="status"></strong><span data-out="info"></span></div></div>
          <div class="nk75-action"><button type="button" data-act="use" data-t="use"></button><button type="button" data-act="restock" data-t="restock"></button><button type="button" data-act="reset" data-t="reset"></button></div>
        </div>
      </div>
      <p class="nk75-foot" data-t="note"></p>`;
    overview.insertAdjacentElement('afterend',root);
    let qty=2, reserve=1, item='tissues', place='cupboard';
    const $=(sel)=>root.querySelector(sel);
    const field=(k)=>$(`[data-field="${k}"]`);
    function renderCopy(){
      const t=copy();const code=language();root.setAttribute('dir',code==='ar'?'rtl':'ltr');
      root.querySelectorAll('[data-t]').forEach(el=>{const key=el.getAttribute('data-t'); if(Object.prototype.hasOwnProperty.call(t,key)) el.textContent=t[key];});
      for(const [name,keys,selected] of [['item',KEYS,item],['place',PLACES,place]]){
        const input=field(name); input.replaceChildren();
        keys.forEach(key=>{const opt=document.createElement('option');opt.value=key;opt.textContent=t[key];input.append(opt);});
        input.value=selected;
      }
      field('reserve').setAttribute('aria-label',t.reserve);
      $('[data-act="minus"]').setAttribute('aria-label',`${t.amount} −`);
      $('[data-act="plus"]').setAttribute('aria-label',`${t.amount} +`);
      renderStatus();
    }
    function renderStatus(){
      qty=Math.max(0,Math.min(LIMIT,qty)); reserve=Math.max(0,Math.min(LIMIT,reserve));
      const low=qty<=reserve, t=copy();root.dataset.low=String(low);
      $('[data-out="qty"]').textContent=String(qty);
      $('[data-out="status"]').textContent=low?t.low:t.ok;
      $('[data-out="info"]').textContent=low?t.lowInfo:t.okInfo;
      $('[data-act="minus"]').disabled=qty===0;
      $('[data-act="use"]').disabled=qty===0;
      $('[data-act="plus"]').disabled=qty===LIMIT;
      $('[data-act="restock"]').disabled=qty===LIMIT;
    }
    root.addEventListener('click',ev=>{
      const btn=ev.target.closest('button[data-act]');if(!btn||!root.contains(btn))return;
      switch(btn.dataset.act){
        case 'minus':case 'use': qty--;break;
        case 'plus':case 'restock': qty++;break;
        case 'reset': qty=2;reserve=1;item='tissues';place='cupboard';field('reserve').value='1';renderCopy();return;
        default:return;
      }
      renderStatus();
    });
    field('item').addEventListener('change',ev=>{if(KEYS.includes(ev.target.value))item=ev.target.value;});
    field('place').addEventListener('change',ev=>{if(PLACES.includes(ev.target.value))place=ev.target.value;});
    field('reserve').addEventListener('input',ev=>{
      if(ev.target.value==='')return;
      const parsed=Number(ev.target.value);
      if(!Number.isFinite(parsed))return;
      reserve=Math.min(LIMIT,Math.max(0,Math.floor(parsed)));renderStatus();
    });
    field('reserve').addEventListener('change',()=>{field('reserve').value=String(reserve);});
    const selector=document.getElementById('p199-language');
    if(selector) selector.addEventListener('change',renderCopy);
    const observer=new MutationObserver(()=>{const lang=language();if(lang!==lastLang){lastLang=lang;renderCopy();}});
    let lastLang=language();observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    if(selector)observer.observe(selector,{attributes:true,attributeFilter:['value']});
    renderCopy();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
