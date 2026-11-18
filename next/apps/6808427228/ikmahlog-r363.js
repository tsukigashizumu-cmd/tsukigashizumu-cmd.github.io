/* R363: IkmahLog LP-only repair-record details illustration. No storage, tracking or network. */
(() => {
  'use strict';
  const ID = 'tsz-r363-ikmahlog';
  if (document.getElementById(ID)) return;
  const dict = {
    en: {
      eyebrow: 'IkmahLog / A record you can explain', lang: 'Language', title: 'Six months later, can you explain this repair?',
      intro: 'You remember paying the shop. The date, mileage and receipt are another story. Give those details a place before they disappear.',
      quote: 'The app records maintenance, costs, mileage, notes and attachments. This is only an illustration of the details worth keeping.',
      panel: 'Illustrative service record', sample: 'Sample only', oil: 'Oil & filter', tire: 'Tire repair', battery: 'Battery', date: 'Service date',
      mileage: 'Odometer (mi)', cost: 'Paid (USD)', note: 'What was done', receipt: 'I kept the receipt / attachment',
      score: 'Details filled in', missing: 'Still missing: ', complete: 'All five illustrative details are present.',
      invalid: 'Enter a valid date, mileage (0–9,999,999), and amount (0–999,999.99).',
      dateMissing: 'service date', mileageMissing: 'odometer', costMissing: 'amount', noteMissing: 'work note', receiptMissing: 'receipt',
      reset: 'Restore sample', cta: 'View IkmahLog on the App Store', disclaimer: 'Fictional LP-only demo. The receipt switch is not an upload. No saving, file handling, reminders, iCloud, diagnostics, analytics or external requests are performed by this demo.'
    },
    ja: {
      eyebrow: 'IkmahLog / 説明できる整備記録', lang: '言語', title: '半年後、その修理を説明できますか。',
      intro: 'お店に代金を払ったことは覚えている。では、日付・走行距離・領収書は？　記憶が薄れる前に、残したい情報を見える形に。',
      quote: 'アプリは整備・費用・走行距離・メモ・添付資料を記録できます。ここでは残しておきたい情報を例示します。',
      panel: '架空の整備記録', sample: 'サンプルのみ', oil: 'オイル交換', tire: 'タイヤ修理', battery: 'バッテリー', date: '整備日',
      mileage: '走行距離（mi）', cost: '支払額（USD）', note: '作業内容', receipt: '領収書・添付資料を保管した',
      score: '記入済みの項目', missing: '未記入：', complete: '例示した5項目がすべてそろっています。',
      invalid: '有効な日付、走行距離（0～9,999,999）、金額（0～999,999.99）を入力してください。',
      dateMissing: '整備日', mileageMissing: '走行距離', costMissing: '支払額', noteMissing: '作業メモ', receiptMissing: '領収書',
      reset: 'サンプルに戻す', cta: 'App StoreでIkmahLogを見る', disclaimer: '架空のLP専用デモです。領収書のチェックはアップロードではありません。このデモは保存・ファイル処理・通知・iCloud・車両診断・アクセス解析・外部通信を行いません。'
    },
    ar: {
      eyebrow: 'IkmahLog / سجل يمكنك شرحه', lang: 'اللغة', title: 'بعد ستة أشهر، هل يمكنك شرح هذا الإصلاح؟',
      intro: 'تتذكر أنك دفعت للورشة. ولكن ماذا عن التاريخ والعداد والإيصال؟ احتفظ بالتفاصيل قبل أن تنساها.',
      quote: 'يتيح التطبيق تسجيل الصيانة والتكاليف والعداد والملاحظات والمرفقات. هذا مثال توضيحي فقط.',
      panel: 'سجل صيانة توضيحي', sample: 'مثال فقط', oil: 'زيت وفلتر', tire: 'إصلاح إطار', battery: 'بطارية', date: 'تاريخ الخدمة',
      mileage: 'عداد المسافة (ميل)', cost: 'المبلغ المدفوع (دولار)', note: 'وصف العمل', receipt: 'احتفظت بالإيصال أو المرفق',
      score: 'تفاصيل مكتملة', missing: 'لا يزال ينقص: ', complete: 'التفاصيل الخمسة التوضيحية مكتملة.',
      invalid: 'أدخل تاريخًا وعدادًا (0–9,999,999) ومبلغًا (0–999,999.99) صالحًا.',
      dateMissing: 'التاريخ', mileageMissing: 'العداد', costMissing: 'المبلغ', noteMissing: 'الملاحظة', receiptMissing: 'الإيصال',
      reset: 'استعادة المثال', cta: 'عرض IkmahLog في App Store', disclaimer: 'مثال تفاعلي خاص بالصفحة فقط. خيار الإيصال ليس رفع ملف. لا يحفظ هذا المثال البيانات ولا يرسلها أو يجري تشخيصًا أو إشعارات أو تحليلات.'
    }
  };
  const examples = {
    oil: { date: '2026-05-12', mileage: '41860', cost: '89.50', note: 'Oil and filter replaced', receipt: false },
    tire: { date: '2026-08-03', mileage: '45520', cost: '138.00', note: 'Rear tire puncture repaired', receipt: true },
    battery: { date: '2026-10-09', mileage: '49650', cost: '192.00', note: '', receipt: true }
  };
  const sampleNotes = {
    en: { oil:'Oil and filter replaced', tire:'Rear tire puncture repaired', battery:'' },
    ja: { oil:'エンジンオイルとフィルターを交換', tire:'後輪のパンクを修理', battery:'' },
    ar: { oil:'استبدال زيت المحرك والفلتر', tire:'إصلاح ثقب الإطار الخلفي', battery:'' }
  };
  const root = document.createElement('section');
  root.id = ID; root.setAttribute('aria-label','IkmahLog example service record'); root.setAttribute('dir','ltr');
  root.innerHTML = `
    <div class="r363-head">
      <div class="r363-eyebrow"><span class="r363-beacon" aria-hidden="true"></span><span data-r363-t="eyebrow"></span></div>
      <label class="r363-language"><span data-r363-t="lang"></span><select id="r363-language" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label>
    </div>
    <div class="r363-layout">
      <div class="r363-intro"><h2 data-r363-t="title"></h2><p data-r363-t="intro"></p><div class="r363-line"></div><div class="r363-quote" data-r363-t="quote"></div></div>
      <div class="r363-demo">
        <div class="r363-demo-top"><strong data-r363-t="panel"></strong><small data-r363-t="sample"></small></div>
        <div class="r363-presets" role="group" aria-label="Sample records">
          <button type="button" data-r363-preset="oil" aria-pressed="true" data-r363-t="oil"></button>
          <button type="button" data-r363-preset="tire" aria-pressed="false" data-r363-t="tire"></button>
          <button type="button" data-r363-preset="battery" aria-pressed="false" data-r363-t="battery"></button>
        </div>
        <div class="r363-fields">
          <label class="r363-field"><span data-r363-t="date"></span><input data-r363-field="date" type="date"></label>
          <label class="r363-field"><span data-r363-t="mileage"></span><input data-r363-field="mileage" type="number" min="0" max="9999999" step="1" inputmode="numeric"></label>
          <label class="r363-field r363-field-wide"><span data-r363-t="cost"></span><input data-r363-field="cost" type="number" min="0" max="999999.99" step="0.01" inputmode="decimal"></label>
          <label class="r363-field r363-field-wide"><span data-r363-t="note"></span><textarea data-r363-field="note" maxlength="180"></textarea></label>
          <label class="r363-receipt r363-field-wide"><input data-r363-field="receipt" type="checkbox"><span data-r363-t="receipt"></span></label>
        </div>
        <div class="r363-score"><div class="r363-score-top"><span data-r363-t="score"></span><strong data-r363-score aria-live="polite"></strong></div><div class="r363-meter" aria-hidden="true"><div data-r363-meter></div></div><div class="r363-status" data-r363-status role="status" aria-live="polite"></div></div>
        <div class="r363-actions"><button type="button" class="r363-reset" data-r363-reset data-r363-t="reset"></button><a href="https://apps.apple.com/us/app/ikmahlog-vehicle-records/id6808427228" target="_blank" rel="noopener noreferrer" data-r363-t="cta"></a></div>
        <p class="r363-disclaimer" data-r363-t="disclaimer"></p>
      </div>
    </div>`;
  const nav = document.querySelector('nav.p19-breadcrumb');
  const main = document.querySelector('main');
  if (nav) nav.insertAdjacentElement('afterend', root);
  else if (main) main.insertAdjacentElement('afterbegin', root);
  else if (document.body) document.body.appendChild(root);
  else return;
  const $ = name => root.querySelector(`[data-r363-field="${name}"]`);
  const score = root.querySelector('[data-r363-score]');
  const status = root.querySelector('[data-r363-status]');
  const meter = root.querySelector('[data-r363-meter]');
  const lang = root.querySelector('#r363-language');
  let current = 'oil';
  let language = 'en';
  const isDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v + 'T00:00:00Z').toISOString().slice(0,10) === v;
  const isMileage = v => v.trim() !== '' && /^(0|[1-9]\d*)$/.test(v) && Number(v) <= 9999999;
  const isMoney = v => v.trim() !== '' && /^\d+(?:\.\d{1,2})?$/.test(v) && Number(v) <= 999999.99;
  function redraw() {
    const t = dict[language];
    const dateOK = isDate($('date').value);
    const mileageOK = isMileage($('mileage').value);
    const costOK = isMoney($('cost').value);
    const noteOK = $('note').value.trim().length > 0;
    const receiptOK = $('receipt').checked;
    const entries = [['dateMissing',dateOK],['mileageMissing',mileageOK],['costMissing',costOK],['noteMissing',noteOK],['receiptMissing',receiptOK]];
    const count = entries.filter(([,ok]) => ok).length;
    score.textContent = `${count} / 5`;
    meter.style.width = `${count*20}%`;
    const invalid = !dateOK || !mileageOK || !costOK;
    const missing = entries.filter(([,ok]) => !ok).map(([key]) => t[key]);
    status.textContent = invalid ? t.invalid : (missing.length ? t.missing + missing.join(' · ') : t.complete);
    status.classList.toggle('r363-error', invalid);
    root.setAttribute('data-r363-valid', String(!invalid));
  }
  function translate(l) {
    if (!dict[l]) l = 'en';
    const oldLanguage = language;
    if ($('note') && $('note').value === sampleNotes[oldLanguage][current]) {
      $('note').value = sampleNotes[l][current];
    }
    language = l; lang.value = l; root.dir = l === 'ar' ? 'rtl' : 'ltr'; root.lang = l;
    root.querySelectorAll('[data-r363-t]').forEach(el => {el.textContent = dict[l][el.getAttribute('data-r363-t')];});
    redraw();
  }
  function preset(key) {
    const x = examples[key]; if (!x) return;
    current = key;
    ['date','mileage','cost'].forEach(k => {$(k).value=x[k];});
    $('note').value=sampleNotes[language][key];
    $('receipt').checked = x.receipt;
    root.querySelectorAll('[data-r363-preset]').forEach(el => el.setAttribute('aria-pressed', String(el.getAttribute('data-r363-preset')===key)));
    redraw();
  }
  root.querySelectorAll('[data-r363-preset]').forEach(el => el.addEventListener('click',() => preset(el.getAttribute('data-r363-preset'))));
  root.querySelectorAll('[data-r363-field]').forEach(el => el.addEventListener('input',redraw));
  root.querySelector('[data-r363-reset]').addEventListener('click',() => preset('oil'));
  lang.addEventListener('change',() => translate(lang.value));
  const siteLang = (document.documentElement.lang || 'en').toLowerCase();
  translate(siteLang.startsWith('ja')?'ja':siteLang.startsWith('ar')?'ar':'en');
  preset('oil');
})();
