/* TSZ LP R120 · JiiyaRoll · website-only team momentum demonstration.
   This is a scripted illustrative dice sequence, NOT the app's real game logic.
   No cookies, network requests, analytics, storage, or betting. */
(() => {
  'use strict';
  const APP = '6765972725';
  const ID = 'tsz-jr120';
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  const script = [3, 5, 2, 6, 4, 1, 4, 6];
  const staff = [
    { id: 'helper', icon: '✦', cost: 10, gain: 1 },
    { id: 'maker', icon: '⌘', cost: 18, gain: 2 },
    { id: 'guide', icon: '✳', cost: 26, gain: 3 }
  ];
  const dictionary = {
    en: {
      kicker: '03 / BUILD THE TEAM', badge: 'INTERACTIVE WEBSITE ILLUSTRATION',
      title: 'One roll. A little progress. A growing team.',
      intro: 'A tiny, repeatable loop: roll an illustrative die, collect demo points and recruit a teammate. Each teammate makes the next roll a little stronger.',
      balance: 'Demo points', team: 'Team members', rolls: 'Rolls',
      rollLabel: 'Your next roll', roll: 'Roll the demo die', reset: 'Start over',
      earned: 'This roll earned', base: 'Die', bonus: 'Team bonus',
      recruit: 'Recruit a sample teammate', add: 'Recruit', hired: 'In your team',
      cost: 'points', bonusLabel: 'bonus / roll',
      helper: 'Quick helper', maker: 'Careful maker', guide: 'Team guide',
      status0: 'Roll to collect your first points.',
      statusRoll: 'You earned {n} demo points. Keep rolling or recruit when ready.',
      statusBought: '{name} joined your sample team. The next roll earns more.',
      statusInsufficient: 'Not enough demo points yet. Roll again to collect more.',
      statusOwned: 'This sample teammate already joined.',
      statusReset: 'Reset complete. Try building a different team.',
      history: 'Recent rolls', historyEmpty: 'Your rolls will appear here.',
      notice: 'This is an independent, website-only illustration—not an in-app screenshot or an exact model of JiiyaRoll rules, characters, payouts or probabilities. The real game lets you roll dice, collect funds, hire staff and improve efficiency. Demo points have no monetary value. No betting, purchases, storage or network requests occur here.',
      step: 'A small action becomes momentum', note: 'Sample outcomes follow a fixed sequence so you can explore the loop.'
    },
    ja: {
      kicker: '03 / チームが育つ', badge: 'LP専用・操作できる説明例',
      title: 'ひと振りから、仲間が増えていく。',
      intro: 'サイコロを振り、説明用ポイントを集め、仲間を増やす。小さな一手が、次の一手を少し強くする流れを試せます。',
      balance: '説明用ポイント', team: '仲間', rolls: '振った回数',
      rollLabel: '次のサイコロ', roll: 'サンプルのサイコロを振る', reset: '最初から',
      earned: '今回の獲得', base: '出目', bonus: '仲間の加算',
      recruit: 'サンプルの仲間を迎える', add: '仲間にする', hired: '加入済み',
      cost: 'ポイント', bonusLabel: '毎回の加算',
      helper: 'てきぱき助手', maker: 'こつこつ職人', guide: 'まとめ役',
      status0: 'まずはサイコロを振ってみましょう。',
      statusRoll: '{n}ポイントを獲得。続けて振るか、仲間を迎えましょう。',
      statusBought: '「{name}」が仲間に。次からの獲得が増えます。',
      statusInsufficient: 'ポイントが足りません。もう少し振って集めましょう。',
      statusOwned: 'このサンプルの仲間は、すでに加わっています。',
      statusReset: '初期化しました。別の順番で試せます。',
      history: '直近の出目', historyEmpty: '振ると履歴が表示されます。',
      notice: 'これはLP専用の説明例であり、実際のアプリ画面・ゲーム内部の計算式・キャラクター・確率の再現ではありません。実際のJiiya Rollはサイコロで資金を集め、スタッフを雇い、効率を高めるゲームです。説明用ポイントに金銭的価値はありません。賭博・課金・保存・通信はありません。',
      step: '小さな一手が、次の一手を育てる', note: '動きを試しやすいよう、出目は決まった順番で表示します。'
    },
    ar: {
      kicker: '03 / تنمية الفريق', badge: 'مثال تفاعلي خاص بالموقع',
      title: 'رمية واحدة. تقدم بسيط. فريق يكبر.',
      intro: 'ارمِ نرداً توضيحياً، واجمع نقاطاً تجريبية، ثم أضف زميلاً. يزيد كل زميل مكافأة الرمية التالية.',
      balance: 'نقاط تجريبية', team: 'أفراد الفريق', rolls: 'عدد الرميات',
      rollLabel: 'الرمية التالية', roll: 'ارمِ النرد التجريبي', reset: 'البدء من جديد',
      earned: 'نقاط هذه الرمية', base: 'قيمة النرد', bonus: 'مكافأة الفريق',
      recruit: 'أضف زميلاً تجريبياً', add: 'إضافة', hired: 'ضمن الفريق',
      cost: 'نقطة', bonusLabel: 'زيادة لكل رمية',
      helper: 'مساعد سريع', maker: 'صانع دقيق', guide: 'مرشد الفريق',
      status0: 'ابدأ برمية لجمع النقاط.',
      statusRoll: 'ربحت {n} نقاط تجريبية. واصل الرمي أو أضف زميلاً.',
      statusBought: 'انضم «{name}» إلى الفريق التجريبي. ستزيد نقاط الرميات القادمة.',
      statusInsufficient: 'النقاط التجريبية غير كافية. ارمِ النرد مجدداً.',
      statusOwned: 'هذا الزميل ضمن الفريق بالفعل.',
      statusReset: 'تمت إعادة الضبط. جرّب ترتيباً مختلفاً.',
      history: 'آخر الرميات', historyEmpty: 'سيظهر سجل الرميات هنا.',
      notice: 'هذا مثال مستقل خاص بالموقع، وليس صورة فعلية للتطبيق أو محاكاة دقيقة لقواعده أو شخصياته أو نتائجه أو احتمالاته. يتيح Jiiya Roll رمي النرد وجمع الموارد وتوظيف أفراد الفريق وتحسين الكفاءة. النقاط هنا بلا قيمة نقدية. لا مراهنة ولا مشتريات ولا تخزين ولا اتصال بالشبكة.',
      step: 'خطوة صغيرة تزيد قوة الخطوة التالية', note: 'تظهر النتائج بترتيب ثابت لتجربة الفكرة.'
    }
  };
  const getLanguage = () => {
    const control = document.getElementById('p199-language');
    const raw = String(control?.value || document.documentElement.lang || 'en').toLowerCase();
    const lang = raw.split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(dictionary, lang) ? lang : 'en';
  };
  function mount() {
    if (!document.body || document.getElementById(ID) ||
      (document.body.dataset.p199Id !== APP && document.body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('tsz-jr82') || document.getElementById('overview');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = ID;
    section.dataset.illustration = 'not-app-screen';
    section.setAttribute('aria-label', 'JiiyaRoll website-only team growth illustration');
    section.innerHTML = `
      <div class="jr120-topline"><span data-t="kicker"></span><span class="jr120-badge" data-t="badge"></span></div>
      <h2 data-t="title"></h2><p class="jr120-intro" data-t="intro"></p>
      <div class="jr120-stats" aria-live="polite">
        <div><small data-t="balance"></small><strong data-o="balance">0</strong></div>
        <div><small data-t="team"></small><strong data-o="team">0</strong></div>
        <div><small data-t="rolls"></small><strong data-o="rolls">0</strong></div>
      </div>
      <div class="jr120-columns">
        <div class="jr120-rollpanel">
          <div class="jr120-eyebrow" data-t="rollLabel"></div>
          <div class="jr120-dice" data-o="dice" aria-label="dice">⚀</div>
          <div class="jr120-gain"><span data-t="earned"></span><strong data-o="earned">—</strong></div>
          <div class="jr120-breakdown"><span data-t="base"></span><b data-o="base">—</b><span data-t="bonus"></span><b data-o="bonus">—</b></div>
          <div class="jr120-actions"><button type="button" data-do="roll" data-t="roll"></button><button type="button" class="jr120-ghost" data-do="reset" data-t="reset"></button></div>
          <p class="jr120-status" data-o="status" role="status" aria-live="polite"></p>
          <div class="jr120-recent"><span data-t="history"></span><div data-o="history" class="jr120-history"></div></div>
        </div>
        <div class="jr120-teampanel">
          <div class="jr120-eyebrow" data-t="recruit"></div>
          <div class="jr120-roster" data-o="roster"></div>
          <p class="jr120-note" data-t="note"></p>
        </div>
      </div>
      <div class="jr120-footer"><strong data-t="step"></strong><p data-t="notice"></p></div>`;
    anchor.insertAdjacentElement('afterend', section);
    let points = 0;
    let turns = 0;
    let hired = new Set();
    let recent = [];
    let last = null;
    let statusKey = 'status0';
    let statusArg = {};
    const element = (sel) => section.querySelector(sel);
    const value = (k) => element(`[data-o="${k}"]`);
    const t = () => dictionary[getLanguage()];
    function fmt(s, data) { return s.replace(/\{(\w+)\}/g, (_, k) => String(data[k] ?? '')); }
    function bonus() { return staff.reduce((n, item) => n + (hired.has(item.id) ? item.gain : 0), 0); }
    function status(k, data = {}) { statusKey = k; statusArg = data; value('status').textContent = fmt(t()[k], data); }
    function localize() {
      const lang = getLanguage();
      section.lang = lang;
      section.dir = lang === 'ar' ? 'rtl' : 'ltr';
      section.querySelectorAll('[data-t]').forEach(el => { el.textContent = t()[el.dataset.t] || ''; });
      draw();
    }
    function draw() {
      const w = t();
      value('balance').textContent = String(points);
      value('team').textContent = String(hired.size);
      value('rolls').textContent = String(turns);
      value('dice').textContent = last ? faces[last.die - 1] : '⚀';
      value('dice').setAttribute('aria-label', last ? String(last.die) : '1');
      value('earned').textContent = last ? `+${last.gain}` : '—';
      value('base').textContent = last ? String(last.die) : '—';
      value('bonus').textContent = last ? `+${last.bonus}` : '—';
      value('history').replaceChildren();
      if (!recent.length) value('history').textContent = w.historyEmpty;
      else recent.slice(-5).reverse().forEach(n => {
        const chip = document.createElement('span'); chip.className = 'jr120-chip';
        chip.textContent = `${faces[n.die - 1]} +${n.gain}`;
        value('history').appendChild(chip);
      });
      const roster = value('roster'); roster.replaceChildren();
      staff.forEach(item => {
        const owned = hired.has(item.id);
        const card = document.createElement('div'); card.className = 'jr120-person' + (owned ? ' is-hired' : '');
        const info = document.createElement('div'); info.className = 'jr120-person-info';
        const symbol = document.createElement('span'); symbol.className = 'jr120-symbol'; symbol.textContent = item.icon;
        const words = document.createElement('div');
        const name = document.createElement('strong'); name.textContent = w[item.id];
        const detail = document.createElement('small'); detail.textContent = `+${item.gain} ${w.bonusLabel} · ${item.cost} ${w.cost}`;
        words.append(name, detail); info.append(symbol, words);
        const button = document.createElement('button'); button.type = 'button'; button.dataset.hire = item.id;
        button.disabled = owned; button.textContent = owned ? w.hired : w.add;
        button.setAttribute('aria-label', `${owned ? w.hired : w.add}: ${w[item.id]}`);
        card.append(info, button); roster.appendChild(card);
      });
      value('status').textContent = fmt(w[statusKey], statusArg);
    }
    section.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b || !section.contains(b)) return;
      if (b.dataset.do === 'roll') {
        const die = script[turns % script.length];
        const extra = bonus(); const gain = die + extra;
        points += gain; turns += 1; last = {die, bonus: extra, gain}; recent.push(last);
        status('statusRoll', {n: gain}); draw();
      } else if (b.dataset.do === 'reset') {
        points = 0; turns = 0; hired = new Set(); recent = []; last = null;
        status('statusReset'); draw();
      } else if (b.dataset.hire) {
        const item = staff.find(x => x.id === b.dataset.hire);
        if (!item) return;
        if (hired.has(item.id)) status('statusOwned');
        else if (points < item.cost) status('statusInsufficient');
        else { points -= item.cost; hired.add(item.id); status('statusBought', {name: t()[item.id]}); }
        draw();
      }
    });
    const select = document.getElementById('p199-language');
    if (select) select.addEventListener('change', localize);
    const observer = new MutationObserver(() => { if (section.lang !== getLanguage()) localize(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    localize();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
