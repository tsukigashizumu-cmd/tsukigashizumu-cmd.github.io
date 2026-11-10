/* TSZ LP R119: PackQuantity saved-plan reuse illustration (website only).
   All values exist only in memory in this browser tab. No fetch, persistence, cookies, or analytics. */
(() => {
  'use strict';
  const APP = '6804756043';
  const rootId = 'tsz-pq119';
  const words = {
    en: {
      kicker: '03 / REUSE THE PLAN', badge: 'INTERACTIVE WEBSITE ILLUSTRATION',
      title: 'The same pack. A different amount to buy.',
      intro: 'A saved plan is a starting point, not another form to fill from scratch. Load the sample, adjust what you need, and see the whole-pack math update.',
      sample: 'Sample plan', saved: 'Saved example',
      savedNeed: 'Needed', savedPack: 'Pack size', savedPrice: 'Price / pack', savedPacks: 'Pack count',
      load: 'Load this plan', edit: 'Try a change',
      name: 'Plan name', need: 'Amount needed (kg)', pack: 'Pack size (g)', price: 'Price per pack (optional)',
      priceUnit: 'illustrative currency units',
      packs: 'Whole packs', leftover: 'Left over', total: 'Estimated cost', formula: 'Why this number?',
      save: 'Update the sample plan', reset: 'Reset illustration',
      idle: 'Change a number to see the result. Nothing is saved on this website.',
      loaded: 'Sample loaded. Change the required amount to try a new plan.',
      updated: 'Sample updated for this visit only. Reloading the page restores the original.',
      invalid: 'Enter valid positive amounts; price must be zero or greater, or left empty.',
      tooLarge: 'This illustration allows up to 100,000 whole packs.',
      emptyPrice: 'Not entered',
      notice: 'Website-only demonstration, not an actual app screen. PackQuantity can save and reuse plans on your device; this web illustration does not store or transmit your inputs. Costs exclude tax, discount and shipping. Changing a currency label does not convert exchange rates.',
      small: 'g', big: 'kg', each: 'packs', nameSample: 'Weekend cooking'
    },
    ja: {
      kicker: '03 / 計画を再利用', badge: 'LP専用・操作できる説明例',
      title: '同じ商品でも、必要量は変わる。',
      intro: '保存した計画を出発点に。もう一度全部入力する代わりに、前の条件を呼び出して必要量を変えてみましょう。',
      sample: 'サンプルの計画', saved: '記録してある例',
      savedNeed: '必要量', savedPack: '1袋の量', savedPrice: '1袋の価格', savedPacks: '袋数',
      load: 'この計画を呼び出す', edit: '必要量を変更してみる',
      name: '計画の名前', need: '必要な量（kg）', pack: '1袋の量（g）', price: '1袋の価格（任意）',
      priceUnit: '説明用の金額単位',
      packs: '購入する袋数', leftover: '余る量', total: '購入額の目安', formula: '計算の根拠',
      save: 'サンプルの計画を更新', reset: '説明例を初期化',
      idle: '数値を変えると結果が変わります。このWebページには保存されません。',
      loaded: '計画を呼び出しました。必要量を変えて再計算できます。',
      updated: 'このページ内だけで計画を更新しました。再読み込みすると元に戻ります。',
      invalid: '必要量と袋の量は0より大きい数値、価格は0以上か空欄にしてください。',
      tooLarge: 'この説明例では最大10万袋まで対応します。',
      emptyPrice: '未入力',
      notice: 'これはLP専用の説明例で、実際のアプリ画面ではありません。アプリでは端末内で計画を保存・再利用できますが、このWebページは入力を保存・送信しません。税・割引・送料は含みません。通貨表示の変更による為替換算も行いません。',
      small: 'g', big: 'kg', each: '袋', nameSample: '週末の料理'
    },
    ar: {
      kicker: '03 / إعادة استخدام الخطة', badge: 'مثال تفاعلي خاص بالموقع',
      title: 'نفس العبوة. كمية مطلوبة مختلفة.',
      intro: 'استعد خطة نموذجية ثم غيّر الكمية المطلوبة. شاهد عدد العبوات الكاملة والكمية المتبقية والتكلفة التقديرية.',
      sample: 'الخطة النموذجية', saved: 'مثال محفوظ',
      savedNeed: 'المطلوب', savedPack: 'حجم العبوة', savedPrice: 'سعر العبوة', savedPacks: 'عدد العبوات',
      load: 'استعادة الخطة', edit: 'جرّب تغيير الكمية',
      name: 'اسم الخطة', need: 'الكمية المطلوبة (كغ)', pack: 'حجم العبوة (غ)', price: 'سعر العبوة (اختياري)',
      priceUnit: 'وحدات نقدية توضيحية',
      packs: 'عبوات كاملة', leftover: 'الكمية المتبقية', total: 'تكلفة تقديرية', formula: 'طريقة الحساب',
      save: 'تحديث الخطة النموذجية', reset: 'إعادة ضبط المثال',
      idle: 'عدّل الأرقام لتتغيّر النتيجة. لا يُحفظ شيء على هذا الموقع.',
      loaded: 'تم استعادة المثال. يمكنك تعديل الكمية المطلوبة.',
      updated: 'تم تحديث المثال في هذه الزيارة فقط. أعد تحميل الصفحة لاستعادة الأصل.',
      invalid: 'أدخل كميات موجبة صالحة؛ يجب أن يكون السعر صفراً أو أكثر أو فارغاً.',
      tooLarge: 'يدعم هذا المثال حتى 100,000 عبوة كاملة.',
      emptyPrice: 'غير مدخل',
      notice: 'هذا مثال توضيحي خاص بالموقع وليس شاشة فعلية من التطبيق. يمكن للتطبيق حفظ الخطط وإعادة استخدامها على جهازك، لكن هذا الموقع لا يحفظ أو يرسل مدخلاتك. لا تشمل التكلفة الضرائب أو الخصومات أو الشحن ولا يتم تحويل العملات.',
      small: 'غ', big: 'كغ', each: 'عبوات', nameSample: 'طبخ نهاية الأسبوع'
    }
  };
  const original = { name: 'Weekend cooking', need: 2.5, pack: 700, price: 5.8 };
  const locale = () => {
    const v = String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase();
    const l = v.split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(words, l) ? l : 'en';
  };
  function calc(plan) {
    const amount = plan.need * 1000;
    if (!Number.isFinite(amount) || !Number.isFinite(plan.pack) || amount <= 0 || plan.pack <= 0 ||
        !Number.isFinite(plan.price) && plan.price !== null || plan.price !== null && plan.price < 0) {
      return { error: 'invalid' };
    }
    const packs = Math.ceil(amount / plan.pack);
    if (!Number.isSafeInteger(packs) || packs > 100000) return { error: 'tooLarge' };
    return { packs, bought: packs * plan.pack, left: Math.max(0, packs * plan.pack - amount),
             cost: plan.price === null ? null : packs * plan.price, amount };
  }
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP) || document.getElementById(rootId)) return;
    const anchor = document.getElementById('tsz-pq81') || document.getElementById('overview');
    if (!anchor) return;
    const root = document.createElement('section');
    root.id = rootId;
    root.dataset.illustration = 'not-an-app-screen';
    root.setAttribute('aria-label', 'PackQuantity plan reuse website illustration');
    root.innerHTML = `
      <div class="pq119-head"><span class="pq119-kicker" data-copy="kicker"></span><span class="pq119-badge" data-copy="badge"></span></div>
      <h2 data-copy="title"></h2><p class="pq119-intro" data-copy="intro"></p>
      <div class="pq119-layout">
        <div class="pq119-control">
          <div class="pq119-saved"><div class="pq119-label" data-copy="saved"></div>
            <strong data-out="savedName"></strong>
            <dl><div><dt data-copy="savedNeed"></dt><dd data-out="savedNeed"></dd></div>
              <div><dt data-copy="savedPack"></dt><dd data-out="savedPack"></dd></div>
              <div><dt data-copy="savedPacks"></dt><dd data-out="savedPacks"></dd></div>
              <div><dt data-copy="savedPrice"></dt><dd data-out="savedPrice"></dd></div></dl>
            <button type="button" data-action="load" class="pq119-secondary" data-copy="load"></button>
          </div>
          <div class="pq119-edit"><div class="pq119-label" data-copy="edit"></div>
            <div class="pq119-fields">
              <label for="pq119-name"><span data-copy="name"></span><input id="pq119-name" type="text" maxlength="64" autocomplete="off"></label>
              <label for="pq119-need"><span data-copy="need"></span><input id="pq119-need" type="number" min="0" step="any" inputmode="decimal" value="3.2"></label>
              <label for="pq119-pack"><span data-copy="pack"></span><input id="pq119-pack" type="number" min="0" step="any" inputmode="decimal" value="700"></label>
              <label for="pq119-price"><span data-copy="price"></span><input id="pq119-price" type="number" min="0" step="any" inputmode="decimal" value="5.80"></label>
            </div>
            <div class="pq119-buttons"><button type="button" data-action="save" data-copy="save"></button>
              <button type="button" data-action="reset" class="pq119-secondary" data-copy="reset"></button></div>
          </div>
        </div>
        <div class="pq119-output" aria-live="polite">
          <div class="pq119-main-result"><div data-copy="packs"></div><strong data-out="packs">5</strong></div>
          <div class="pq119-stats"><div><span data-copy="leftover"></span><strong data-out="left">300 g</strong></div>
            <div><span data-copy="total"></span><strong data-out="cost">29</strong><small data-copy="priceUnit"></small></div></div>
          <div class="pq119-equation"><span data-copy="formula"></span><p data-out="equation"></p></div>
          <p role="status" class="pq119-status" data-out="status"></p>
          <p role="alert" class="pq119-error" data-out="error" hidden></p>
        </div>
      </div><p class="pq119-footnote" data-copy="notice"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const $ = (s) => root.querySelector(s);
    const get = (id) => root.querySelector('#pq119-' + id);
    const put = (key, val) => { const el = root.querySelector('[data-out="' + key + '"]'); if (el) el.textContent = val; };
    const decimal = (num, digits = 2) => new Intl.NumberFormat(locale() === 'ar' ? 'ar-EG' : locale() === 'ja' ? 'ja-JP' : 'en-US', {maximumFractionDigits: digits}).format(num);
    const parse = (el) => el.value.trim() === '' ? NaN : Number(el.value);
    let saved = {...original};
    let message = 'idle';
    let lastLanguage = locale();
    get('name').value = words.en.nameSample;
    function current() {
      return { name: get('name').value.trim().slice(0,64), need: parse(get('need')),
               pack: parse(get('pack')), price: get('price').value.trim() === '' ? null : Number(get('price').value) };
    }
    function display() {
      const t = words[locale()];
      root.lang = locale(); root.dir = locale() === 'ar' ? 'rtl' : 'ltr';
      root.querySelectorAll('[data-copy]').forEach((el) => {const str = t[el.dataset.copy]; if (str) el.textContent = str;});
      root.querySelectorAll('[data-out="savedName"]').forEach(el => el.textContent = saved.name === original.name ? t.nameSample : saved.name);
      const sc = calc(saved);
      put('savedNeed', decimal(saved.need) + ' ' + t.big);
      put('savedPack', decimal(saved.pack) + ' ' + t.small);
      put('savedPrice', saved.price === null ? t.emptyPrice : decimal(saved.price));
      put('savedPacks', sc.error ? '—' : decimal(sc.packs, 0) + ' ' + t.each);
      const result = calc(current());
      const err = result.error ? t[result.error] : '';
      $('.pq119-error').hidden = !err;
      put('error', err);
      if (result.error) { put('packs','—');put('left','—');put('cost','—');put('equation','—'); }
      else {
        put('packs', decimal(result.packs,0));
        put('left', decimal(result.left,2) + ' ' + t.small);
        put('cost', result.cost === null ? t.emptyPrice : decimal(result.cost,2));
        put('equation', decimal(result.amount,2) + ' ' + t.small + ' ÷ ' + decimal(current().pack,2) + ' ' + t.small + ' → ' + decimal(result.packs,0) + ' ' + t.each + '. ' + decimal(result.bought,2) + ' − ' + decimal(result.amount,2) + ' = ' + decimal(result.left,2) + ' ' + t.small);
      }
      put('status', t[message]);
      $('.pq119-output').classList.toggle('pq119-invalid',!!err);
    }
    function fill(plan) {
      get('name').value = plan.name === original.name ? words[locale()].nameSample : plan.name;
      get('need').value = String(plan.need);
      get('pack').value = String(plan.pack);
      get('price').value = plan.price === null ? '' : String(plan.price);
    }
    root.querySelector('[data-action="load"]').addEventListener('click', () => { fill(saved); message = 'loaded'; display(); });
    root.querySelector('[data-action="save"]').addEventListener('click', () => {
      const candidate = current();
      if (!candidate.name || calc(candidate).error) { message = 'idle'; display(); return; }
      saved = {...candidate}; message = 'updated'; display();
    });
    root.querySelector('[data-action="reset"]').addEventListener('click', () => {
      saved = {...original}; get('name').value = words[locale()].nameSample;
      get('need').value = '3.2'; get('pack').value = '700'; get('price').value = '5.8';
      message = 'idle'; display();
    });
    for (const key of ['name','need','pack','price']) get(key).addEventListener('input', () => {message = 'idle'; display();});
    document.getElementById('p199-language')?.addEventListener('change', () => {
      const previous = lastLanguage; lastLanguage = locale();
      if (get('name').value === words[previous].nameSample) get('name').value = words[lastLanguage].nameSample;
      display();
    });
    new MutationObserver(() => {const next = locale();if(next !== lastLanguage){lastLanguage=next;display();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    display();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
