/* TSZ LP R84 — Soft Count Focus Studio. Original WEBSITE preview only; not actual app UI.
   No sound, analytics, network, storage, or timer scheduling. All state is transient. */
(() => {
  'use strict';
  const APP = '6768180849';
  const pattern = {
    natural: { phases: [4, 4, 4, 4], label: 'Natural', rhythm: '4 · 4 · 4 · 4' },
    relaxation: { phases: [4, 7, 8, 0], label: 'Relaxation', rhythm: '4 · 7 · 8' },
    zen: { phases: [4, 0, 6, 0], label: 'Zen', rhythm: '4 · 6' },
    resonant: { phases: [5, 0, 5, 0], label: 'Resonant', rhythm: '5 · 5' },
    calming: { phases: [4, 0, 8, 0], label: 'Calming', rhythm: '4 · 8' }
  };
  const tr = {
    en: {
      overline: 'FOCUS STUDIO / INTERACTIVE PREVIEW', badge: 'WEBSITE DEMO',
      title: 'Make the rhythm yours.',
      intro: 'Try different breathing rhythms and choose what the display shows. No need to start a real session.',
      rhythm: 'RHYTHM', duration: 'SESSION LENGTH', display: 'DISPLAY LAYERS', style: 'APPEARANCE',
      ring: 'Progress ring', seconds: 'Phase seconds', bar: 'Timing bar', glow: 'Soft glow',
      dark: 'Dark', light: 'Light', phase: 'CYCLE PREVIEW', inhale: 'Inhale', hold: 'Hold',
      exhale: 'Exhale', rest: 'Rest', secondsUnit: 's', minutesUnit: 'min',
      step: 'Drag to explore one breathing cycle', preview: 'PREVIEW',
      jump: 'View exhale', reset: 'Reset',
      note: 'Interactive website illustration only, not an actual Soft Count screen. The selected mode, phase preview and appearance are not saved, sent or used as medical guidance. Breathe comfortably; do not force your breath.'
    },
    ja: {
      overline: 'FOCUS STUDIO / 表示プレビュー', badge: 'LP専用デモ',
      title: '呼吸のリズムを、自分らしく。',
      intro: '5つのリズムと画面の見え方を切り替えて、好みの組み合わせを試せます。実際のセッションは開始しません。',
      rhythm: '呼吸リズム', duration: 'セッション時間', display: '表示レイヤー', style: '画面の外観',
      ring: '進行リング', seconds: '段階の秒数', bar: '進行バー', glow: '柔らかい光',
      dark: 'ダーク', light: 'ライト', phase: '1サイクルのプレビュー', inhale: '吸う', hold: '止める',
      exhale: '吐く', rest: '休む', secondsUnit: '秒', minutesUnit: '分',
      step: 'スライダーを動かして段階を確認', preview: 'プレビュー',
      jump: '吐く段階を見る', reset: '最初に戻す',
      note: 'これはLP専用の説明用デモで、Soft Countの実画面ではありません。選んだ設定や操作内容は保存・送信されず、医療上の指導でもありません。無理のない呼吸でお使いください。'
    },
    ar: {
      overline: 'FOCUS STUDIO / معاينة تفاعلية', badge: 'عرض خاص بالموقع',
      title: 'اختر إيقاعك المفضل.',
      intro: 'جرّب خمسة أنماط للتنفس، وخصّص ما يظهر على الشاشة. لا تبدأ هذه المعاينة جلسة فعلية.',
      rhythm: 'إيقاع التنفس', duration: 'مدة الجلسة', display: 'عناصر العرض', style: 'المظهر',
      ring: 'حلقة التقدم', seconds: 'ثواني المرحلة', bar: 'شريط التقدم', glow: 'توهج لطيف',
      dark: 'داكن', light: 'فاتح', phase: 'معاينة دورة التنفس', inhale: 'شهيق', hold: 'حبس',
      exhale: 'زفير', rest: 'راحة', secondsUnit: 'ث', minutesUnit: 'د',
      step: 'حرّك الشريط لاستعراض مراحل دورة واحدة', preview: 'معاينة',
      jump: 'عرض الزفير', reset: 'إعادة الضبط',
      note: 'هذه معاينة توضيحية خاصة بالموقع، وليست شاشة من تطبيق Soft Count. لا تُحفظ الخيارات أو تُرسل ولا تقدّم إرشادًا طبيًا. تنفس براحة دون إجهاد.'
    }
  };
  const defaults = { rhythm: 'zen', length: '3', appearance: 'dark', position: '12', ring: true, seconds: true, bar: true, glow: false };
  function currentLang() {
    const raw = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const base = String(raw).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(tr, base) ? base : 'en';
  }
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-sc84')) return;
    const root = document.createElement('section');
    root.id = 'tsz-sc84';
    root.setAttribute('aria-label', 'Soft Count Focus Studio website illustration');
    root.dataset.illustration = 'website-only-not-app-screen';
    root.innerHTML = `
      <div class="sc84-top"><span data-t="overline"></span><span class="sc84-badge" data-t="badge"></span></div>
      <header class="sc84-heading"><h2 data-t="title"></h2><p data-t="intro"></p></header>
      <div class="sc84-layout">
        <div class="sc84-panel sc84-controls">
          <label class="sc84-field"><span data-t="rhythm"></span>
            <select data-input="rhythm" aria-label="Breathing rhythm">
              <option value="natural">Natural · 4 · 4 · 4 · 4</option><option value="relaxation">Relaxation · 4 · 7 · 8</option>
              <option value="zen" selected>Zen · 4 · 6</option><option value="resonant">Resonant · 5 · 5</option>
              <option value="calming">Calming · 4 · 8</option>
            </select></label>
          <label class="sc84-field"><span data-t="duration"></span>
            <select data-input="length" aria-label="Session length"><option value="1">1</option><option value="3" selected>3</option><option value="5">5</option><option value="10">10</option></select>
          </label>
          <fieldset class="sc84-options"><legend data-t="display"></legend>
            <label><input type="checkbox" data-input="ring" checked><span data-t="ring"></span></label>
            <label><input type="checkbox" data-input="seconds" checked><span data-t="seconds"></span></label>
            <label><input type="checkbox" data-input="bar" checked><span data-t="bar"></span></label>
            <label><input type="checkbox" data-input="glow"><span data-t="glow"></span></label>
          </fieldset>
          <fieldset class="sc84-theme"><legend data-t="style"></legend>
            <label><input type="radio" name="sc84-theme" value="dark" data-input="dark" checked><span data-t="dark"></span></label>
            <label><input type="radio" name="sc84-theme" value="light" data-input="light"><span data-t="light"></span></label>
          </fieldset>
        </div>
        <div class="sc84-panel sc84-preview" data-theme="dark">
          <div class="sc84-previewtop"><span data-t="preview"></span><strong data-out="mode">Zen · 4 · 6</strong></div>
          <div class="sc84-stage">
            <div class="sc84-orbit" data-out="orbit" aria-hidden="true"><div class="sc84-disc"><div class="sc84-centerglow"></div>
              <span class="sc84-phase" data-out="phase">Inhale</span><strong class="sc84-seconds" data-out="seconds">2.8</strong>
            </div></div>
          </div>
          <div class="sc84-bar" data-out="bar" aria-hidden="true"><span data-out="fill"></span></div>
          <div class="sc84-meta"><strong data-out="elapsed">1.2 / 10.0 s</strong><span data-out="length">3 min</span></div>
          <div class="sc84-slider"><label for="sc84-progress" data-t="phase"></label>
            <input id="sc84-progress" data-input="position" type="range" min="0" max="100" step="1" value="12" aria-label="Breathing cycle preview position" aria-valuetext="12 percent">
            <span data-t="step"></span>
          </div>
        </div>
      </div>
      <div class="sc84-actions"><button type="button" data-action="exhale" data-t="jump"></button>
        <button type="button" class="sc84-secondary" data-action="reset" data-t="reset"></button></div>
      <p class="sc84-note" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const $ = q => root.querySelector(q);
    const inputs = name => $(`[data-input="${name}"]`);
    let previousLang = currentLang();
    const setText = (name, value) => { const el = $(`[data-out="${name}"]`); if (el) el.textContent = value; };
    function state() {
      const rhythm = pattern[inputs('rhythm').value] || pattern.zen;
      const progress = Number(inputs('position').value);
      const total = rhythm.phases.reduce((sum, n) => sum + n, 0);
      const elapsed = total * progress / 100;
      let seconds = elapsed;
      let index = rhythm.phases.length - 1;
      for (let i = 0; i < rhythm.phases.length; i++) {
        if (seconds < rhythm.phases[i] || (i === rhythm.phases.length - 1 && seconds <= rhythm.phases[i])) { index = i; break; }
        seconds -= rhythm.phases[i];
      }
      if (progress >= 100) { index = rhythm.phases.findLastIndex(n => n > 0); seconds = rhythm.phases[index]; }
      return { rhythm, progress, total, elapsed, phaseIndex: index, remaining: Math.max(0, rhythm.phases[index] - seconds) };
    }
    function render() {
      const lang = currentLang(), t = tr[lang], v = state();
      root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
      root.querySelectorAll('[data-t]').forEach(n => { n.textContent = t[n.dataset.t] || ''; });
      const preview = $('.sc84-preview');
      preview.dataset.theme = inputs('light').checked ? 'light' : 'dark';
      preview.dataset.glow = inputs('glow').checked ? 'on' : 'off';
      preview.dataset.phase = ['inhale', 'hold', 'exhale', 'rest'][v.phaseIndex];
      preview.dataset.ring = inputs('ring').checked ? 'on' : 'off';
      preview.dataset.seconds = inputs('seconds').checked ? 'on' : 'off';
      preview.dataset.bar = inputs('bar').checked ? 'on' : 'off';
      setText('mode', `${v.rhythm.label} · ${v.rhythm.rhythm}`);
      const labels = [t.inhale, t.hold, t.exhale, t.rest];
      setText('phase', labels[v.phaseIndex]);
      setText('seconds', v.remaining.toFixed(1));
      setText('elapsed', `${v.elapsed.toFixed(1)} / ${v.total.toFixed(1)} ${t.secondsUnit}`);
      setText('length', `${inputs('length').value} ${t.minutesUnit}`);
      inputs('position').setAttribute('aria-valuetext', `${labels[v.phaseIndex]} ${v.remaining.toFixed(1)} ${t.secondsUnit}`);
      $('.sc84-orbit').style.setProperty('--sc84-deg', `${Math.max(0, v.progress * 3.6)}deg`);
      $('[data-out="fill"]').style.width = `${v.progress}%`;
    }
    function setDefaults() {
      inputs('rhythm').value = defaults.rhythm; inputs('length').value = defaults.length;
      inputs('position').value = defaults.position;
      ['ring', 'seconds', 'bar', 'glow'].forEach(name => { inputs(name).checked = defaults[name]; });
      inputs('dark').checked = true;
      render();
    }
    root.querySelectorAll('input,select').forEach(n => { n.addEventListener('input', render); n.addEventListener('change', render); });
    $('[data-action="exhale"]').addEventListener('click', () => {
      const r = pattern[inputs('rhythm').value] || pattern.zen;
      const sum = r.phases.reduce((a, b) => a + b, 0);
      const start = r.phases[0] + r.phases[1];
      inputs('position').value = String(Math.min(100, Math.ceil(100 * (start + Math.min(1, r.phases[2] / 2)) / sum)));
      render();
    });
    $('[data-action="reset"]').addEventListener('click', setDefaults);
    document.getElementById('p199-language')?.addEventListener('change', () => { previousLang = currentLang(); render(); });
    new MutationObserver(() => { const current = currentLang(); if (current !== previousLang) { previousLang = current; render(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
