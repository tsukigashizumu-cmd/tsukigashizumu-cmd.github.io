/* TSZ LP R82 | Jiiya Roll — site-only dice-and-team illustration.
   No storage, tracking, money or actual in-app odds/earnings. */
(() => {
  'use strict';
  const APP = '6765972725';
  const phrases = {
    en: { eyebrow: 'ROLL · EARN · BUILD', flag: 'INTERACTIVE WEBSITE EXAMPLE', heading: 'Give luck another roll.',
      intro: 'One roll brings a little progress. Hire a teammate to add a bonus to each future roll in this simplified example.',
      roll: 'Roll the dice', hire: 'Hire 1 teammate', reset: 'Reset example', funds: 'Example funds', rolls: 'Rolls',
      team: 'Team members', reward: 'Last roll', next: 'Next hire costs', ready: 'Roll to earn your first funds.',
      earned: 'You rolled {face}: +{reward} example funds.', hired: 'New teammate hired. Your team now adds +{bonus} per roll.',
      need: 'Not enough funds yet. Roll again to hire.', full: 'This example has a limit of 12 teammates.',
      cleared: 'Example restarted. Roll once more.', plus: 'Team bonus', unit: 'pts', note: 'This is a short, invented website illustration — not the Jiiya Roll game screen, its real economy, probability model, timer, or Game Center scores. No real money or betting. No inputs or results are stored or sent.' },
    ja: { eyebrow: '振る · 貯める · 育てる', flag: 'LP専用・操作できる説明例', heading: '運を責める前に、もう1回。',
      intro: 'サイコロで資金を増やし、仲間を雇って次の一振りを強化。流れだけを試せる簡易的な説明例です。',
      roll: 'サイコロを振る', hire: '仲間を1人雇う', reset: '最初に戻す', funds: '例示資金', rolls: '振った回数',
      team: '仲間の人数', reward: '直近の獲得', next: '次の雇用費', ready: 'まずはサイコロを振ろう。',
      earned: '{face}が出た！ 資金 +{reward}。', hired: '仲間が増えた。次の一振りに +{bonus} のボーナス。',
      need: 'まだ資金が足りません。もう一度振ろう。', full: 'この例では仲間は最大12人です。',
      cleared: '初期状態に戻しました。もう一度振ってみよう。', plus: '仲間ボーナス', unit: 'pt', note: 'この表示はLP専用の創作デモです。Jiiya Rollの実画面、実際の資金計算・確率・制限時間・Game Centerスコアは再現していません。実際のお金や賭け事はありません。操作結果は保存・送信しません。' },
    ar: { eyebrow: 'ارمِ · اكسب · طوّر', flag: 'مثال تفاعلي خاص بالموقع', heading: 'جرّب رمية أخرى قبل لوم الحظ.',
      intro: 'ارمِ النرد لتحصل على نقاط افتراضية، ثم وظّف زميلًا ليضيف مكافأة لكل رمية لاحقة في هذا المثال المبسط.',
      roll: 'ارمِ النرد', hire: 'وظّف زميلًا', reset: 'إعادة المثال', funds: 'الرصيد الافتراضي', rolls: 'عدد الرميات',
      team: 'أعضاء الفريق', reward: 'آخر مكسب', next: 'تكلفة التوظيف التالية', ready: 'ارمِ النرد لتبدأ.',
      earned: 'ظهرت {face}: أضفت {reward} نقطة افتراضية.', hired: 'انضم زميل جديد. مكافأة الفريق في الرمية التالية: {bonus}.',
      need: 'الرصيد غير كافٍ. ارمِ مرة أخرى.', full: 'الحد في هذا المثال 12 زميلًا.',
      cleared: 'أُعيد المثال إلى البداية. جرّب رمية أخرى.', plus: 'مكافأة الفريق', unit: 'نقطة', note: 'هذا مثال توضيحي مبتكر للموقع، وليس شاشة لعبة Jiiya Roll أو نظامها الفعلي أو احتمالاتها أو المؤقّت أو نتائج Game Center. لا أموال حقيقية ولا مراهنات. لا تُحفظ النتائج ولا تُرسل.' }
  };
  function lang() {
    const raw = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const v = String(raw).toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(phrases, v) ? v : 'en';
  }
  function format(value) {
    return new Intl.NumberFormat(lang() === 'ar' ? 'ar-EG' : lang() === 'ja' ? 'ja-JP' : 'en-US', {maximumFractionDigits: 0}).format(value);
  }
  function mount() {
    if (!document.body || (document.body.dataset.p199Id !== APP && document.body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-jr82')) return;
    const root = document.createElement('section');
    root.id = 'tsz-jr82';
    root.dataset.illustration = 'website-only-not-app-screen';
    root.setAttribute('aria-label', 'Jiiya Roll website-only dice illustration');
    root.innerHTML = `
      <div class="jr82-kicker"><span data-t="eyebrow"></span><span class="jr82-tag" data-t="flag"></span></div>
      <div class="jr82-grid"><div class="jr82-stage">
        <div class="jr82-text"><h2 data-t="heading"></h2><p data-t="intro"></p></div>
        <div class="jr82-dice-area"><div class="jr82-die" aria-label="Dice shows 1" role="img" data-face="1">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div><div class="jr82-roll-count"><span data-t="rolls"></span><strong data-out="rolls">0</strong></div></div>
        <div class="jr82-actions"><button type="button" data-act="roll" class="jr82-primary" data-t="roll"></button>
          <button type="button" data-act="hire" class="jr82-secondary" data-t="hire"></button></div>
        <div class="jr82-cost"><span data-t="next"></span> <strong data-out="cost">80</strong></div>
      </div><div class="jr82-dashboard">
        <div class="jr82-kpi jr82-main"><span data-t="funds"></span><strong data-out="funds">0</strong><small data-t="unit"></small></div>
        <div class="jr82-row"><div class="jr82-kpi"><span data-t="team"></span><strong data-out="team">0</strong></div><div class="jr82-kpi"><span data-t="reward"></span><strong data-out="last">0</strong></div></div>
        <div class="jr82-bonus"><span data-t="plus"></span> <strong data-out="bonus">+0</strong></div>
        <div class="jr82-crew" data-out="crew" aria-hidden="true"></div>
        <p class="jr82-status" data-out="status" role="status" aria-live="polite"></p>
        <button type="button" class="jr82-reset" data-act="reset" data-t="reset"></button>
      </div></div><p class="jr82-note" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const $ = selector => root.querySelector(selector);
    const output = (key, value) => { $(`[data-out="${key}"]`).textContent = value; };
    const die = $('.jr82-die');
    const hireButton = $('[data-act="hire"]');
    let face = 1, funds = 0, rolls = 0, staff = 0, last = 0, message = 'ready';
    let lastLang = lang();
    const price = () => 80 + staff * 40;
    function translate(template, vars = {}) {
      return String(template).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
    }
    function render() {
      const copy = phrases[lang()];
      root.lang = lang();
      root.dir = lang() === 'ar' ? 'rtl' : 'ltr';
      root.querySelectorAll('[data-t]').forEach(el => { const txt = copy[el.dataset.t]; if (txt) el.textContent = txt; });
      output('funds', format(funds)); output('rolls', format(rolls)); output('team', format(staff));
      output('last', '+' + format(last)); output('cost', staff < 12 ? format(price()) : '—');
      output('bonus', '+' + format(staff * 10));
      die.dataset.face = String(face); die.setAttribute('aria-label', 'Dice shows ' + face);
      const crew = $('[data-out="crew"]'); crew.replaceChildren();
      for (let i = 0; i < staff; i++) { const el = document.createElement('span'); el.className = 'jr82-person'; crew.append(el); }
      hireButton.disabled = staff >= 12;
      // Do not disable when funds are insufficient: show a human-readable explanation on click.
      const vars = {face: format(face), reward: format(last), bonus: format(staff * 10)};
      output('status', translate(copy[message] || copy.ready, vars));
    }
    $('[data-act="roll"]').addEventListener('click', () => {
      face = 1 + Math.floor(Math.random() * 6);
      last = face * 10 + staff * 10;
      funds += last; rolls += 1; message = 'earned'; render();
    });
    hireButton.addEventListener('click', () => {
      if (staff >= 12) { message = 'full'; render(); return; }
      if (funds < price()) { message = 'need'; render(); return; }
      funds -= price(); staff += 1; message = 'hired'; render();
    });
    $('[data-act="reset"]').addEventListener('click', () => {
      face = 1; funds = rolls = staff = last = 0; message = 'cleared'; render();
    });
    document.getElementById('p199-language')?.addEventListener('change', () => { lastLang = lang(); render(); });
    new MutationObserver(() => { const next = lang(); if (next !== lastLang) { lastLang = next; render(); } })
      .observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
