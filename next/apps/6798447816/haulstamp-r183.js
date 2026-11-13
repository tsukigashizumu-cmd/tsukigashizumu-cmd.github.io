/* HaulStamp R183 — isolated illustrative LP work-log calculator. No storage, tracking or network requests. */
(() => {
  'use strict';
  const APP_ID = '6798447816';
  const ROOT_ID = 'tsz-haulstamp-r183';
  if (!document.body || document.body.dataset.p199Id !== APP_ID || document.getElementById(ROOT_ID)) return;

  const translations = {
    en: {
      brand: 'HaulStamp', eyebrow: 'A CLEAR LOG OF TIME & WORK',
      title1: 'The hours happened.', title2: 'Keep the record.',
      subtitle: 'Waiting. Handling. Weight. One clear log.',
      today: 'SAMPLE WORK LOG', date: 'Nov 13, 2026',
      waiting: 'Waiting time', handling: 'Cargo handling',
      hours: 'Hours', mins: 'Minutes', rate: 'Hourly rate (USD)',
      cargo: 'Cargo details', count: 'Number of items', weight: 'Weight per item (kg)',
      waitingLine: 'Waiting estimate', handlingLine: 'Handling estimate',
      quantity: 'Cargo weight', total: 'TOTAL WEIGHT',
      estimated: 'ESTIMATED TOTAL', timeline: 'ILLUSTRATIVE TIMELINE',
      first: 'Waiting', second: 'Handling', currency: 'USD',
      reset: 'Reset example', store: 'View on the App Store',
      feat1: 'Separate waiting and handling', feat2: 'Count and weight', feat3: 'Export records in the app',
      foot: 'The hours happened. Keep the record.',
      note: 'Website illustration only. All values are examples, not a bill or legally determined charge. Rates and results are illustrative. PDF/CSV/Text export is available in the app, not in this demo.',
      invalid: 'Enter valid nonnegative numbers within the displayed limits.',
      timeUnit: 'min', zero: '0 min'
    },
    ja: {
      brand: 'HaulStamp', eyebrow: '時間と作業を、ひとつの記録に',
      title1: '使った時間を、', title2: '記録として残す。',
      subtitle: '荷待ち・荷役・重量を、ひとつにまとめる。',
      today: 'サンプル作業記録', date: '2026年11月13日',
      waiting: '荷待ち時間', handling: '荷役時間',
      hours: '時間', mins: '分', rate: '時間単価（USD）',
      cargo: '荷物の情報', count: '個数', weight: '1個あたりの重量（kg）',
      waitingLine: '荷待ちの参考額', handlingLine: '荷役の参考額',
      quantity: '荷物の総重量', total: '総重量',
      estimated: '参考見積額', timeline: '時間の内訳（例）',
      first: '荷待ち', second: '荷役', currency: '米ドル',
      reset: '初期化', store: 'App Storeで見る',
      feat1: '荷待ちと荷役を分ける', feat2: '個数と重量も記録', feat3: '実アプリで記録を出力',
      foot: '使った時間を、記録として残す。',
      note: 'LP上の説明用デモです。数値・時間単価は架空の例で、請求額や法的に認められる料金ではありません。PDF・CSV・テキスト出力は実アプリの機能で、このデモからは出力できません。',
      invalid: '入力欄の上限内で、0以上の有効な数値を入力してください。',
      timeUnit: '分', zero: '0分'
    },
    ar: {
      brand: 'HaulStamp', eyebrow: 'سجل واضح للوقت والعمل',
      title1: 'ساعات العمل مضت.', title2: 'احتفظ بسجلها.',
      subtitle: 'الانتظار والمناولة والوزن في سجل واحد.',
      today: 'سجل عمل توضيحي', date: '13 نوفمبر 2026',
      waiting: 'وقت الانتظار', handling: 'وقت المناولة',
      hours: 'ساعات', mins: 'دقائق', rate: 'السعر بالساعة (USD)',
      cargo: 'تفاصيل الحمولة', count: 'عدد القطع', weight: 'وزن القطعة (كغ)',
      waitingLine: 'تقدير الانتظار', handlingLine: 'تقدير المناولة',
      quantity: 'وزن الحمولة', total: 'الوزن الإجمالي',
      estimated: 'الإجمالي التقديري', timeline: 'الجدول الزمني التوضيحي',
      first: 'انتظار', second: 'مناولة', currency: 'دولار أمريكي',
      reset: 'إعادة الضبط', store: 'عرضه على App Store',
      feat1: 'فصل الانتظار عن المناولة', feat2: 'عدد القطع والوزن', feat3: 'تصدير السجلات داخل التطبيق',
      foot: 'الساعات مضت، فاحتفظ بسجلها.',
      note: 'هذا مثال تفاعلي للموقع فقط. جميع الأرقام تقديرية وليست فاتورة أو رسوماً معتمدة قانونياً. تصدير PDF وCSV والنص متاح في التطبيق، لا في هذا العرض.',
      invalid: 'أدخل أرقاماً صحيحة غير سالبة ضمن الحدود المعروضة.',
      timeUnit: 'دقيقة', zero: '0 دقيقة'
    }
  };

  const root = document.createElement('section');
  root.id = ROOT_ID;
  root.className = 'hs183';
  root.setAttribute('aria-labelledby', 'hs183-title');
  root.innerHTML = `
    <div class="hs183-topbar"><span class="hs183-brand"><span class="hs183-brandmark" aria-hidden="true">▣</span><span data-hs-t="brand">HaulStamp</span></span><span class="hs183-overline" data-hs-t="eyebrow"></span></div>
    <div class="hs183-layout">
      <div class="hs183-intro">
        <div class="hs183-scene" aria-hidden="true"><div class="hs183-dock"></div><div class="hs183-truck"></div><div class="hs183-crates"></div></div>
        <div class="hs183-intro-content"><p class="hs183-kicker" data-hs-t="eyebrow"></p>
          <h2 id="hs183-title"><span data-hs-t="title1"></span><em data-hs-t="title2"></em></h2>
          <p class="hs183-subtitle" data-hs-t="subtitle"></p>
          <a class="hs183-store hs183-store-desktop" data-hs-store href="https://apps.apple.com/us/app/id6798447816" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-hs-t="store"></span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="hs183-dashboard">
        <div class="hs183-card-head"><div><span aria-hidden="true">▤</span><strong data-hs-t="today">SAMPLE WORK LOG</strong></div><span class="hs183-date" data-hs-t="date">Nov 13, 2026</span></div>
        <div class="hs183-fields">
          <fieldset class="hs183-group"><legend data-hs-t="waiting">Waiting time</legend>
            <div class="hs183-input-line">
              <label><span data-hs-t="hours">Hours</span><input data-hs-input="waitingHours" type="number" inputmode="numeric" min="0" max="999" step="1" value="1"></label>
              <label><span data-hs-t="mins">Minutes</span><input data-hs-input="waitingMins" type="number" inputmode="numeric" min="0" max="59" step="1" value="20"></label>
              <label class="hs183-rate"><span data-hs-t="rate">Hourly rate (USD)</span><input data-hs-input="waitingRate" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="40"></label>
            </div><div class="hs183-line-result"><span data-hs-t="waitingLine"></span><output id="hs183-wait-amount" dir="ltr">$53.33</output></div>
          </fieldset>
          <fieldset class="hs183-group"><legend data-hs-t="handling">Cargo handling</legend>
            <div class="hs183-input-line">
              <label><span data-hs-t="hours">Hours</span><input data-hs-input="handlingHours" type="number" inputmode="numeric" min="0" max="999" step="1" value="0"></label>
              <label><span data-hs-t="mins">Minutes</span><input data-hs-input="handlingMins" type="number" inputmode="numeric" min="0" max="59" step="1" value="45"></label>
              <label class="hs183-rate"><span data-hs-t="rate">Hourly rate (USD)</span><input data-hs-input="handlingRate" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="60"></label>
            </div><div class="hs183-line-result"><span data-hs-t="handlingLine"></span><output id="hs183-handling-amount" dir="ltr">$45.00</output></div>
          </fieldset>
          <fieldset class="hs183-group hs183-cargo"><legend data-hs-t="cargo">Cargo details</legend>
            <div class="hs183-input-line hs183-two-col">
              <label><span data-hs-t="count">Number of items</span><input data-hs-input="pieces" type="number" inputmode="numeric" min="0" max="1000000" step="1" value="36"></label>
              <label><span data-hs-t="weight">Weight per item (kg)</span><input data-hs-input="perKg" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="12.5"></label>
            </div><div class="hs183-weight-line"><span data-hs-t="total"></span><output id="hs183-weight" dir="ltr">450 kg</output></div>
          </fieldset>
        </div>
        <div class="hs183-summary" aria-live="polite"><div><small data-hs-t="estimated">ESTIMATED TOTAL</small><output id="hs183-total" dir="ltr">$98.33</output></div><span id="hs183-error" class="hs183-error" role="status" hidden></span></div>
        <div class="hs183-timeline"><div class="hs183-timeline-title"><span aria-hidden="true">◉</span><span data-hs-t="timeline">ILLUSTRATIVE TIMELINE</span></div>
          <div class="hs183-track"><div id="hs183-track-wait" class="hs183-track-wait"></div><div id="hs183-track-handle" class="hs183-track-handle"></div></div>
          <div class="hs183-legend"><span><span class="hs183-dot hs183-wait-dot"></span><span data-hs-t="first"></span> <strong id="hs183-wait-time" dir="ltr">1h 20m</strong></span><span><span class="hs183-dot hs183-handle-dot"></span><span data-hs-t="second"></span> <strong id="hs183-handle-time" dir="ltr">45m</strong></span></div>
        </div>
        <button type="button" class="hs183-reset" id="hs183-reset" data-hs-t="reset">Reset example</button>
      </div>
    </div>
    <div class="hs183-bottom">
      <div class="hs183-feature"><span aria-hidden="true">◷</span><span data-hs-t="feat1"></span></div>
      <div class="hs183-feature"><span aria-hidden="true">▣</span><span data-hs-t="feat2"></span></div>
      <div class="hs183-feature"><span aria-hidden="true">▤</span><span data-hs-t="feat3"></span></div>
    </div>
    <div class="hs183-footer"><a class="hs183-store hs183-store-mobile" data-hs-store href="https://apps.apple.com/us/app/id6798447816" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-hs-t="store"></span><span aria-hidden="true">↗</span></a><p data-hs-t="foot"></p><small data-hs-t="note"></small></div>`;

  const breadcrumb = document.querySelector('.p19-breadcrumb');
  if (breadcrumb && breadcrumb.parentNode) breadcrumb.insertAdjacentElement('afterend', root);
  else {
    const anchor = document.querySelector('#p199-content') || document.querySelector('main');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(root, anchor);
  }
  if (!root.isConnected) return;
  const $ = sel => root.querySelector(sel);
  const $$ = sel => Array.from(root.querySelectorAll(sel));
  const fields = Object.fromEntries($$('input[data-hs-input]').map(el => [el.dataset.hsInput, el]));
  const initial = {waitingHours:'1', waitingMins:'20', waitingRate:'40', handlingHours:'0', handlingMins:'45', handlingRate:'60', pieces:'36', perKg:'12.5'};
  const langs = ['en','ja','ar'];
  let locale = 'en';
  const language = () => {
    const raw = String(document.querySelector('#p199-language')?.value || new URLSearchParams(window.location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return raw.startsWith('ar') ? 'ar' : raw.startsWith('ja') ? 'ja' : 'en';
  };
  const country = () => {
    const raw = String(document.querySelector('#p199-country')?.value || 'us').toLowerCase();
    return /^[a-z]{2}$/.test(raw) ? raw : 'us';
  };
  const valid = (name, whole, max) => {
    const el = fields[name];
    const v = el.value.trim();
    const regex = whole ? /^\d+$/ : /^\d+(?:\.\d{1,2})?$/;
    const n = Number(v);
    const ok = regex.test(v) && Number.isFinite(n) && n >= 0 && n <= max;
    el.setAttribute('aria-invalid', String(!ok));
    return ok ? n : null;
  };
  const money = n => '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  const weightText = n => n.toLocaleString('en-US', {maximumFractionDigits:2}) + ' kg';
  const minutesText = n => n >= 60 ? `${Math.floor(n/60)}h ${n%60}m` : `${n}m`;
  // Round at the line-item level, then sum, so displayed line items always reconcile to the displayed total.
  const roundCents = n => Math.round(n * 100 + Number.EPSILON) / 100;
  function calculate() {
    const v = {
      waitingHours:valid('waitingHours',true,999), waitingMins:valid('waitingMins',true,59),
      waitingRate:valid('waitingRate',false,1000000), handlingHours:valid('handlingHours',true,999),
      handlingMins:valid('handlingMins',true,59), handlingRate:valid('handlingRate',false,1000000),
      pieces:valid('pieces',true,1000000), perKg:valid('perKg',false,1000000)
    };
    const t = translations[locale];
    if (Object.values(v).some(x => x === null)) {
      $('#hs183-error').hidden = false;
      $('#hs183-error').textContent = t.invalid;
      $('#hs183-total').textContent = '—';
      $('#hs183-wait-amount').textContent = '—';
      $('#hs183-handling-amount').textContent = '—';
      $('#hs183-weight').textContent = '—';
      $('#hs183-wait-time').textContent = '—';
      $('#hs183-handle-time').textContent = '—';
      $('#hs183-track-wait').style.width='0%'; $('#hs183-track-handle').style.width='0%';
      return;
    }
    $('#hs183-error').hidden = true;
    $('#hs183-error').textContent = '';
    const wait = v.waitingHours * 60 + v.waitingMins;
    const handle = v.handlingHours * 60 + v.handlingMins;
    const waitingAmount = roundCents(wait * v.waitingRate / 60);
    const handlingAmount = roundCents(handle * v.handlingRate / 60);
    const amount = roundCents(waitingAmount + handlingAmount);
    const kg = Math.round(v.pieces * v.perKg * 100) / 100;
    $('#hs183-wait-amount').textContent = money(waitingAmount);
    $('#hs183-handling-amount').textContent = money(handlingAmount);
    $('#hs183-total').textContent = money(amount);
    $('#hs183-weight').textContent = weightText(kg);
    $('#hs183-wait-time').textContent = minutesText(wait);
    $('#hs183-handle-time').textContent = minutesText(handle);
    const all = wait + handle;
    $('#hs183-track-wait').style.width = (all === 0 ? 0 : 100 * wait / all).toFixed(3) + '%';
    $('#hs183-track-handle').style.width = (all === 0 ? 0 : 100 * handle / all).toFixed(3) + '%';
  }
  function translate() {
    locale = language(); const t=translations[locale];
    root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';
    $$('[data-hs-t]').forEach(el=>{el.textContent=t[el.dataset.hsT] || '';});
    $$('[data-hs-store]').forEach(a=>{a.href=`https://apps.apple.com/${country()}/app/id${APP_ID}`;});
    calculate();
  }
  Object.values(fields).forEach(el => { el.addEventListener('input', calculate); el.addEventListener('change', calculate); });
  $('#hs183-reset').addEventListener('click', () => {
    for (const [key,value] of Object.entries(initial)) fields[key].value=value;
    calculate();
  });
  document.addEventListener('change', event => {
    if (event.target && (event.target.id === 'p199-language' || event.target.id === 'p199-country')) translate();
  });
  // Existing LP site may update the <html lang> attribute programmatically.
  new MutationObserver(() => { if (language() !== locale) translate(); }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  translate();
})();
