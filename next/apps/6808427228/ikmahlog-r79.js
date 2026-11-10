/* TSZ LP R79 / IkmahLog / illustrative garage record (not an app screen or saved record). */
(() => {
  'use strict';
  const APP = '6808427228';
  const DEFAULT = Object.freeze({kind:'maintenance', odometer:'48250', amount:'6200', label:'Oil change'});
  const WORDS = {
    en: {
      eyebrow:'ONE CAR. ONE HISTORY.', badge:'INTERACTIVE LP ILLUSTRATION', title:'The details you forget. All in one place.',
      lead:'Maintenance, fuel, and insurance do not belong on separate scraps of paper. See how a single entry becomes part of one vehicle history.',
      garage:'MY GARAGE', car:'Sample vehicle', unit:'km', records:'Sample records', add:'Try one record', type:'Record type', mileage:'Odometer (km)', amount:'Amount (currency units)', label:'Short note', preview:'Update sample entry', reset:'Reset example',
      maintenance:'Maintenance', fuel:'Fuel', insurance:'Insurance', other:'Other', newRecord:'New sample entry', previousA:'Fuel', previousB:'Insurance', oldA:'46,920 km',oldB:'43,100 km',
      count:'Records illustrated', total:'Illustrated total amount', invalid:'Enter an odometer from 0 to 9,999,999 and an amount from 0 to 99,999,999.',
      note:'This interactive illustration belongs to the website. It is not an IkmahLog app screen. Sample entries are fictional. Changes only update this preview: no entry is stored, synced or sent. IkmahLog does not diagnose your car or determine maintenance schedules for you.'
    },
    ja: {
      eyebrow:'愛車のことを、ひとつに', badge:'LP専用・操作できる説明例', title:'「前回いつだっけ」を、なくす。',
      lead:'整備も給油も保険も、バラバラに覚えなくていい。1件の記録が、車の履歴としてまとまる様子を試せます。',
      garage:'マイガレージ', car:'サンプル車両', unit:'km', records:'記録のプレビュー', add:'1件を試しに記録', type:'記録の種類', mileage:'走行距離（km）', amount:'金額（通貨単位）', label:'短いメモ', preview:'サンプル記録を更新', reset:'最初の例に戻す',
      maintenance:'整備', fuel:'給油', insurance:'保険', other:'その他', newRecord:'今回のサンプル', previousA:'給油', previousB:'保険', oldA:'46,920 km',oldB:'43,100 km',
      count:'表示中の記録数', total:'サンプル合計額', invalid:'走行距離は0〜9,999,999、金額は0〜99,999,999で入力してください。',
      note:'これはLP専用の説明例で、IkmahLogの実画面ではありません。表示中の記録は架空のものです。入力内容はこの画面内のプレビューにのみ反映され、保存・同期・送信されません。IkmahLogは車の診断や整備時期の自動決定を行いません。'
    },
    ar: {
      eyebrow:'سيارة واحدة، سجل واضح', badge:'مثال تفاعلي للصفحة', title:'لا تسأل مجددًا: متى كانت آخر مرة؟',
      lead:'الصيانة والوقود والتأمين في سجل واحد للسيارة. غيّر بيانات إدخال واحد لترى كيف يظهر ضمن السجل التوضيحي.',
      garage:'مرآبي', car:'مركبة تجريبية', unit:'كم', records:'سجلات توضيحية', add:'جرّب سجلًا واحدًا', type:'نوع السجل', mileage:'عداد المسافة (كم)', amount:'المبلغ (وحدة نقدية)', label:'ملاحظة قصيرة', preview:'تحديث السجل التجريبي', reset:'إعادة المثال',
      maintenance:'صيانة', fuel:'وقود', insurance:'تأمين', other:'أخرى', newRecord:'الإدخال التجريبي', previousA:'وقود', previousB:'تأمين', oldA:'46,920 كم',oldB:'43,100 كم',
      count:'عدد السجلات التوضيحية', total:'المجموع التوضيحي', invalid:'أدخل مسافة بين 0 و9,999,999 ومبلغًا بين 0 و99,999,999.',
      note:'هذا مثال تفاعلي للصفحة، وليس شاشة فعلية من IkmahLog. السجلات افتراضية ولا يتم حفظ البيانات أو مزامنتها أو إرسالها. التطبيق لا يشخّص السيارة ولا يحدّد مواعيد الصيانة تلقائيًا.'
    }
  };
  const langKey = () => {
    const value = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const key = String(value).toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(WORDS,key) ? key : 'en';
  };
  const format = n => Number(n).toLocaleString(langKey()==='ja'?'ja-JP':langKey()==='ar'?'ar-EG':'en-US', {maximumFractionDigits:0});
  function mount(){
    if (!document.body || (document.body.dataset.p199Id !== APP && document.body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('overview');
    if(!anchor || document.getElementById('tsz-ik79'))return;
    const root = document.createElement('section');
    root.id='tsz-ik79';
    root.dataset.illustration='not-an-app-screen';
    root.setAttribute('aria-label','IkmahLog interactive explanatory record');
    root.innerHTML = `<div class="ik79-header"><span class="ik79-eyebrow" data-copy="eyebrow"></span><span class="ik79-badge" data-copy="badge"></span></div>
    <div class="ik79-columns"><div class="ik79-story"><h2 data-copy="title"></h2><p class="ik79-lead" data-copy="lead"></p>
      <div class="ik79-garage"><div class="ik79-garage-top"><span data-copy="garage"></span><span class="ik79-indicator" aria-hidden="true"></span></div>
      <div class="ik79-vehicle"><span class="ik79-car" aria-hidden="true">▰</span><div><b data-copy="car"></b><span class="ik79-plate">IK — 01</span></div><strong data-out="vehicleOdometer"></strong></div>
      <div class="ik79-list-heading"><span data-copy="records"></span><span class="ik79-count" data-out="count"></span></div>
      <div class="ik79-history" aria-live="polite" aria-atomic="true">
        <div class="ik79-history-row ik79-new"><span class="ik79-row-symbol">●</span><div class="ik79-row-detail"><b data-out="entryType"></b><span data-out="entryNote"></span></div><div class="ik79-row-right"><strong data-out="entryAmount"></strong><span data-out="entryOdometer"></span></div></div>
        <div class="ik79-history-row"><span class="ik79-row-symbol secondary">●</span><div class="ik79-row-detail"><b data-copy="previousA"></b><span>2026 / 10 / 06</span></div><div class="ik79-row-right"><strong data-out="previousAmountA"></strong><span data-copy="oldA"></span></div></div>
        <div class="ik79-history-row"><span class="ik79-row-symbol tertiary">●</span><div class="ik79-row-detail"><b data-copy="previousB"></b><span>2026 / 09 / 09</span></div><div class="ik79-row-right"><strong data-out="previousAmountB"></strong><span data-copy="oldB"></span></div></div>
      </div><div class="ik79-total"><span data-copy="total"></span><strong data-out="total"></strong></div><p class="ik79-error" data-out="error" role="status"></p>
    </div></div>
    <div class="ik79-editor"><h3 data-copy="add"></h3><div class="ik79-fields">
      <label><span data-copy="type"></span><select data-field="kind"><option value="maintenance" data-copy="maintenance"></option><option value="fuel" data-copy="fuel"></option><option value="insurance" data-copy="insurance"></option><option value="other" data-copy="other"></option></select></label>
      <label><span data-copy="mileage"></span><input data-field="odometer" type="number" inputmode="numeric" min="0" max="9999999" step="1"></label>
      <label><span data-copy="amount"></span><input data-field="amount" type="number" inputmode="numeric" min="0" max="99999999" step="1"></label>
      <label><span data-copy="label"></span><input data-field="label" type="text" maxlength="48"></label>
    </div><button class="ik79-preview" type="button" data-act="preview" data-copy="preview"></button><button class="ik79-reset" type="button" data-act="reset" data-copy="reset"></button></div></div>
    <p class="ik79-note" data-copy="note"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    const field = key => root.querySelector(`[data-field="${key}"]`);
    const out = (key,val) => root.querySelector(`[data-out="${key}"]`).textContent = val;
    function setDefaults(){for(const [key,val] of Object.entries(DEFAULT))field(key).value=val;}
    function render(){
      const t=WORDS[langKey()];
      root.dir=langKey()==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(node=>{const value=t[node.dataset.copy];if(value!==undefined)node.textContent=value;});
      const odometer=Number(field('odometer').value), amount=Number(field('amount').value);
      const valid=field('odometer').value.trim()!=='' && field('amount').value.trim()!=='' &&
        Number.isInteger(odometer) && Number.isInteger(amount) && odometer>=0 && odometer<=9999999 && amount>=0 && amount<=99999999;
      root.dataset.valid=String(valid);
      out('error',valid?'':t.invalid);
      out('entryType',t[field('kind').value]||t.other);
      out('entryNote',field('label').value.trim()||t.newRecord);
      out('entryAmount',valid?format(amount):'—');
      out('entryOdometer',valid?format(odometer)+' '+t.unit:'—');
      out('vehicleOdometer',valid?format(odometer)+' '+t.unit:'—');
      out('previousAmountA',format(7400));out('previousAmountB',format(31000));
      out('count',format(3));out('total',valid?format(amount+7400+31000):'—');
    }
    root.querySelector('[data-act="preview"]').addEventListener('click',render);
    root.querySelectorAll('input,select').forEach(node=>node.addEventListener('input',render));
    root.querySelector('[data-act="reset"]').addEventListener('click',()=>{setDefaults();render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    let last=langKey();
    new MutationObserver(()=>{const current=langKey();if(current!==last){last=current;render();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    setDefaults();render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
