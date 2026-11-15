/* CuePic R206 | independent, reversible LP demonstration | no storage or network calls */
(() => {
  'use strict';
  const APP_ID = '6774479410';
  const ROOT_ID = 'tsz-cuepic-r206';
  const STRINGS = {
    en: {
      kicker: 'INTERACTIVE EXAMPLE · CUEPIC', title: 'Point to it. Skip the explanation.',
      lead: 'Choose a mark, then tap the sample screen. Turn two screenshots into a simple visual guide.',
      note: 'This is an illustrative web demo, not a photo editor. No images are uploaded or saved.',
      step: 'Step', first: '01 · Find the setting', second: '02 · Send the instruction',
      tool: 'Choose a mark', circle: 'Circle', box: 'Box', arrow: 'Arrow', finger: 'Pointer',
      undo: 'Undo', reset: 'Reset step', stage: 'Sample screen', tap: 'Tap the screen to place a mark',
      settings: 'Settings', preferences: 'Preferences', notifications: 'Notifications',
      privacy: 'Privacy & Safety', share: 'Share a guide', instructions: 'Send instructions',
      attachment: 'Add a screenshot', next: 'Next step', message: 'Show where to tap',
      count: 'Marks on this step', guidance: 'Select a shape and touch the sample screen.',
      store: 'See CuePic in the App Store', noReal: 'Sample artwork · not an actual app screenshot',
      marked: 'mark placed', marks: 'marks placed', stepAria: 'Switch to step',
      ariaBoard: 'Sample screen. Activate to place the selected mark at the center or tap a position.',
      done: 'Your two-step guide', helper: 'Each step keeps its own marks until the page is reloaded.'
    },
    ja: {
      kicker: '体験デモ · CUEPIC', title: '「ここを押して」を、ひと目で。',
      lead: '印を選んで、サンプル画面をタップ。2枚の画面に印を付けて、操作手順を示してみよう。',
      note: 'これはWeb上の説明用デモです。写真の読み込み・保存・共有は行いません。',
      step: '手順', first: '01 · 設定を探す', second: '02 · 説明を送る',
      tool: '印を選ぶ', circle: '丸', box: '四角', arrow: '矢印', finger: '指マーク',
      undo: 'ひとつ戻す', reset: 'この手順をリセット', stage: 'サンプル画面', tap: '画面をタップして印を追加',
      settings: '設定', preferences: '一般設定', notifications: '通知',
      privacy: 'プライバシーと安全', share: 'ガイドを共有', instructions: '手順を送る',
      attachment: '画面を追加', next: '次の手順', message: '押す場所を伝える',
      count: 'この手順の印', guidance: '印を選んでサンプル画面に触れてください。',
      store: 'App StoreでCuePicを見る', noReal: '説明用の図 · アプリの実画面ではありません',
      marked: '個の印', marks: '個の印', stepAria: '手順を切り替える',
      ariaBoard: 'サンプル画面。タップした位置、またはキーボード操作で中央に印を付けます。',
      done: '2段階の案内', helper: '手順ごとに印を保持します。ページ再読み込みで初期化されます。'
    },
    ar: {
      kicker: 'تجربة تفاعلية · CUEPIC', title: 'أشِر إلى المكان بدل الشرح الطويل.',
      lead: 'اختر علامة ثم اضغط على الشاشة التجريبية. ضع علامات على خطوتين لتوضيح ما يجب فعله.',
      note: 'هذه تجربة توضيحية على الويب، وليست محرر صور. لا تُحمّل أي صور ولا تُحفظ.',
      step: 'الخطوة', first: '٠١ · العثور على الإعداد', second: '٠٢ · إرسال التعليمات',
      tool: 'اختر علامة', circle: 'دائرة', box: 'مربع', arrow: 'سهم', finger: 'إشارة إصبع',
      undo: 'تراجع', reset: 'إعادة ضبط الخطوة', stage: 'شاشة تجريبية', tap: 'اضغط على الشاشة لإضافة علامة',
      settings: 'الإعدادات', preferences: 'التفضيلات', notifications: 'الإشعارات',
      privacy: 'الخصوصية والأمان', share: 'مشاركة الدليل', instructions: 'إرسال التعليمات',
      attachment: 'إضافة صورة شاشة', next: 'الخطوة التالية', message: 'أظهر موضع الضغط',
      count: 'علامات في هذه الخطوة', guidance: 'اختر شكلاً ثم المس الشاشة التجريبية.',
      store: 'عرض CuePic في متجر التطبيقات', noReal: 'رسم توضيحي · ليس لقطة شاشة فعلية',
      marked: 'علامة', marks: 'علامات', stepAria: 'التبديل إلى الخطوة',
      ariaBoard: 'شاشة تجريبية. اضغط لوضع العلامة أو استخدم لوحة المفاتيح لوضعها في الوسط.',
      done: 'دليل من خطوتين', helper: 'تحتفظ كل خطوة بعلاماتها حتى إعادة تحميل الصفحة.'
    }
  };
  const TOOLS = ['circle', 'box', 'arrow', 'finger'];
  const ICONS = {
    circle: '<span class="cue206-glyph cue206-glyph-circle" aria-hidden="true"></span>',
    box: '<span class="cue206-glyph cue206-glyph-box" aria-hidden="true"></span>',
    arrow: '<span class="cue206-glyph cue206-glyph-arrow" aria-hidden="true">➜</span>',
    finger: '<span class="cue206-glyph cue206-glyph-finger" aria-hidden="true">☝</span>'
  };
  const histories = [[], []];
  let activeStep = 0;
  let tool = 'circle';
  let root;

  function element(id) { return document.getElementById(id); }
  function language() {
    const candidates = [element('p199-language'), element('tsz-cuepic-language')];
    for (const select of candidates) {
      if (select && select.value && select.value.toLowerCase().startsWith('ar')) return 'ar';
      if (select && select.value && select.value.toLowerCase().startsWith('ja')) return 'ja';
      if (select && select.value && /^(en)(-|$)/i.test(select.value)) return 'en';
    }
    return 'en';
  }
  function region() {
    const select = [element('p199-country'), element('tsz-cuepic-country')].find(el => el && el.value);
    const candidate = select ? select.value.toLowerCase() : 'us';
    return /^jp$|^ja$|^jpn$|^japan$/.test(candidate) ? 'jp' : 'us';
  }
  function picture(t) {
    if (activeStep === 0) {
      return `<div class="cue206-phone-content">
        <div class="cue206-ui-caption">09:41 <span aria-hidden="true">●●● ▰</span></div>
        <div class="cue206-ui-title">${t.settings}</div>
        <div class="cue206-ui-row cue206-ui-row-primary"><span class="cue206-ui-row-icon">✧</span><strong>${t.preferences}</strong><span class="cue206-ui-chevron">›</span></div>
        <div class="cue206-ui-row"><span class="cue206-ui-row-icon">◉</span><strong>${t.notifications}</strong><span class="cue206-ui-chevron">›</span></div>
        <div class="cue206-ui-row"><span class="cue206-ui-row-icon">⬡</span><strong>${t.privacy}</strong><span class="cue206-ui-chevron">›</span></div>
        <div class="cue206-ui-spacer"></div><div class="cue206-ui-bar"></div>
      </div>`;
    }
    return `<div class="cue206-phone-content">
      <div class="cue206-ui-caption">09:41 <span aria-hidden="true">●●● ▰</span></div>
      <div class="cue206-ui-title">${t.instructions}</div>
      <div class="cue206-message-bubble">${t.message}</div>
      <div class="cue206-example-tile"><span aria-hidden="true">▣</span>${t.attachment}<span aria-hidden="true">＋</span></div>
      <div class="cue206-ui-share">${t.share}<span aria-hidden="true">➜</span></div>
      <div class="cue206-ui-spacer"></div><div class="cue206-ui-bar"></div>
    </div>`;
  }
  function markerHtml(mark, i, t) {
    const left = Number(mark.x).toFixed(2);
    const top = Number(mark.y).toFixed(2);
    return `<span class="cue206-placed cue206-placed-${mark.type}" style="left:${left}%;top:${top}%" role="img" aria-label="${t[mark.type]} ${i + 1}">${ICONS[mark.type]}</span>`;
  }
  function storeUrl() { return `https://apps.apple.com/${region()}/app/id${APP_ID}`; }
  function render() {
    if (!root || !root.isConnected) return;
    const lang = language();
    const t = STRINGS[lang];
    const count = histories[activeStep].length;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.innerHTML = `<div class="cue206-shell">
      <div class="cue206-intro">
        <p class="cue206-kicker">${t.kicker}</p>
        <h2>${t.title}</h2><p class="cue206-lead">${t.lead}</p>
      </div>
      <div class="cue206-workspace">
        <div class="cue206-control-column">
          <div class="cue206-control-head"><span>${t.done}</span><span class="cue206-tiny">CUEPIC / 206</span></div>
          <p class="cue206-label">${t.step}</p>
          <div class="cue206-step-buttons" role="group" aria-label="${t.step}">
            <button type="button" data-cue206-step="0" aria-pressed="${activeStep === 0}" aria-label="${t.stepAria} 1" class="${activeStep === 0 ? 'is-active' : ''}"><span>01</span><strong>${t.first}</strong></button>
            <button type="button" data-cue206-step="1" aria-pressed="${activeStep === 1}" aria-label="${t.stepAria} 2" class="${activeStep === 1 ? 'is-active' : ''}"><span>02</span><strong>${t.second}</strong></button>
          </div>
          <p class="cue206-label cue206-tool-title">${t.tool}</p>
          <div class="cue206-tools" role="group" aria-label="${t.tool}">${TOOLS.map(name => `<button type="button" data-cue206-tool="${name}" aria-pressed="${name === tool}" class="${name === tool ? 'is-active' : ''}">${ICONS[name]}<span>${t[name]}</span></button>`).join('')}</div>
          <div class="cue206-control-actions"><button type="button" data-cue206-action="undo" ${count ? '' : 'disabled'}>${t.undo}</button><button type="button" data-cue206-action="reset" ${count ? '' : 'disabled'}>${t.reset}</button></div>
          <p class="cue206-count" role="status" aria-live="polite"><strong>${count}</strong> ${t.count}</p>
          <p class="cue206-helper">${t.helper}</p>
        </div>
        <div class="cue206-demo-column">
          <div class="cue206-demo-top"><strong>${t.stage}</strong><span>${t.noReal}</span></div>
          <div class="cue206-demo-scene"><div class="cue206-decor cue206-decor-a"></div><div class="cue206-decor cue206-decor-b"></div>
            <div class="cue206-phone-shell"><div class="cue206-phone-camera" aria-hidden="true"></div>
              <div class="cue206-tap-board" role="button" tabindex="0" aria-label="${t.ariaBoard}" data-cue206-board="1">
                ${picture(t)}<div class="cue206-mark-layer">${histories[activeStep].map((m, i) => markerHtml(m, i, t)).join('')}</div>
              </div>
            </div>
          </div>
          <div class="cue206-demo-bottom"><span class="cue206-live-dot" aria-hidden="true"></span><span>${t.tap}</span><strong>${activeStep + 1} / 2</strong></div>
        </div>
      </div>
      <div class="cue206-footer"><p>${t.note}</p><a data-cue206-store="1" href="${storeUrl()}" rel="noopener noreferrer" target="_blank">${t.store} <span aria-hidden="true">↗</span></a></div>
    </div>`;
    root.querySelectorAll('[data-cue206-step]').forEach(btn => btn.addEventListener('click', () => {
      activeStep = Number(btn.getAttribute('data-cue206-step'));
      render();
    }));
    root.querySelectorAll('[data-cue206-tool]').forEach(btn => btn.addEventListener('click', () => {
      tool = btn.getAttribute('data-cue206-tool');
      render();
    }));
    const undo = root.querySelector('[data-cue206-action="undo"]');
    const reset = root.querySelector('[data-cue206-action="reset"]');
    undo.addEventListener('click', () => { histories[activeStep].pop(); render(); });
    reset.addEventListener('click', () => { histories[activeStep].length = 0; render(); });
    const board = root.querySelector('[data-cue206-board]');
    board.addEventListener('click', event => {
      const bounds = board.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      addMark((event.clientX - bounds.left) / bounds.width * 100,
              (event.clientY - bounds.top) / bounds.height * 100);
    });
    board.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        addMark(50, 50);
        const refreshed = root.querySelector('[data-cue206-board]');
        if (refreshed) refreshed.focus();
      }
    });
  }
  function addMark(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    histories[activeStep].push({type: tool, x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(92, y))});
    if (histories[activeStep].length > 24) histories[activeStep].shift();
    render();
  }
  function init() {
    if (!document.body || document.body.getAttribute('data-p199-id') !== APP_ID || element(ROOT_ID)) return;
    const breadcrumb = document.querySelector('nav.p19-breadcrumb');
    if (!breadcrumb || !breadcrumb.parentNode) return;
    root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'cue206-root';
    root.setAttribute('aria-label', 'CuePic interactive example');
    breadcrumb.insertAdjacentElement('afterend', root);
    render();
    ['p199-language', 'p199-country', 'tsz-cuepic-language', 'tsz-cuepic-country'].forEach(id => {
      const select = element(id);
      if (select) select.addEventListener('change', render);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
