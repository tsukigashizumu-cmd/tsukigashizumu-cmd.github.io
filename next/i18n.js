/* Tsukigashizumu P1: 50-locale interface. No network calls except same-origin translation JSON. */
(() => {
  'use strict';
  const localeData = [
    ['ar-SA','العربية (السعودية)'],['bn-BD','বাংলা (বাংলাদেশ)'],['ca','Català'],
    ['cs','Čeština'],['da','Dansk'],['de-DE','Deutsch (Deutschland)'],['el','Ελληνικά'],
    ['en-AU','English (Australia)'],['en-CA','English (Canada)'],['en-GB','English (UK)'],['en-US','English (US)'],
    ['es-ES','Español (España)'],['es-MX','Español (México)'],['fi','Suomi'],
    ['fr-CA','Français (Canada)'],['fr-FR','Français (France)'],
    ['gu-IN','ગુજરાતી'],['he','עברית'],['hi','हिन्दी'],['hr','Hrvatski'],['hu','Magyar'],
    ['id','Bahasa Indonesia'],['it','Italiano'],['ja','日本語'],['kn-IN','ಕನ್ನಡ'],['ko','한국어'],
    ['ml-IN','മലയാളം'],['mr-IN','मराठी'],['ms','Bahasa Melayu'],['nl-NL','Nederlands'],
    ['no','Norsk'],['or-IN','ଓଡ଼ିଆ'],['pa-IN','ਪੰਜਾਬੀ'],['pl','Polski'],
    ['pt-BR','Português (Brasil)'],['pt-PT','Português (Portugal)'],
    ['ro','Română'],['ru','Русский'],['sk','Slovenčina'],['sl-SI','Slovenščina'],
    ['sv','Svenska'],['ta-IN','தமிழ்'],['te-IN','తెలుగు'],['th','ไทย'],
    ['tr','Türkçe'],['uk','Українська'],['ur-PK','اردو (پاکستان)'],['vi','Tiếng Việt'],
    ['zh-Hans','简体中文'],['zh-Hant','繁體中文']
  ];
  const codes = new Set(localeData.map(item => item[0]));
  const rtl = new Set(['ar-SA','he','ur-PK']);
  const fallback = 'en-US';
  let current = fallback;
  let messages = null;
  let requestVersion = 0;

  function matchingLocale(input) {
    if (typeof input !== 'string' || !input || input.length > 40) return null;
    const text = input.replace(/_/g, '-').trim().toLowerCase();
    const exact = localeData.find(([code]) => code.toLowerCase() === text);
    if (exact) return exact[0];
    // Script and regional aliases; do not conflate Chinese writing systems.
    if (/^zh-(tw|hk|mo|hant)(-|$)/.test(text)) return 'zh-Hant';
    if (/^zh/.test(text)) return 'zh-Hans';
    if (/^en/.test(text)) return 'en-US';
    if (/^es/.test(text)) return 'es-ES';
    if (/^fr/.test(text)) return 'fr-FR';
    if (/^pt/.test(text)) return 'pt-BR';
    const primary = text.split('-')[0];
    const byLanguage = localeData.find(([code]) => code.split('-')[0].toLowerCase() === primary);
    return byLanguage ? byLanguage[0] : null;
  }
  function initialLocale() {
    try {
      const fromUrl = new URLSearchParams(location.search).get('language');
      if (fromUrl && codes.has(fromUrl)) return fromUrl;
    } catch (_) { /* no-op */ }
    try {
      const saved = localStorage.getItem('tsz-next-language');
      if (saved && codes.has(saved)) return saved;
    } catch (_) { /* storage blocked */ }
    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const language of browserLanguages) {
      const match = matchingLocale(language);
      if (match) return match;
    }
    return fallback;
  }
  function t(key, vars) {
    const raw = (messages && messages[key]) || key;
    if (!vars) return raw;
    return raw.replace(/\{([a-z]+)\}/g, (match, name) => Object.hasOwn(vars, name) ? String(vars[name]) : match);
  }
  function applyStatic() {
    document.documentElement.lang = current;
    document.documentElement.dir = rtl.has(current) ? 'rtl' : 'ltr';
    document.title = `${t('explore')} · Tsukigashizumu Studio`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t('intro');
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder); });
    const search = document.getElementById('search');
    if (search) search.setAttribute('aria-label', t('search'));
    const filter = document.querySelector('.segmented');
    if (filter) filter.setAttribute('aria-label', `${t('all')} / ${t('free')} / ${t('paid')}`);
    const select = document.getElementById('locale-select');
    if (select) { select.value = current; select.setAttribute('aria-label', t('language')); }
    const sort = document.getElementById('sort');
    if (sort) sort.setAttribute('aria-label', t('priceSort'));
  }
  async function setLocale(code, {remember=false}={}) {
    const version = ++requestVersion;
    if (!codes.has(code)) code = fallback;
    let data = null;
    try {
      const res = await fetch(`./locales/${encodeURIComponent(code)}.json`, {cache:'no-store'});
      if (!res.ok) throw Error(`HTTP ${res.status}`);
      data = await res.json();
      if (!data || typeof data !== 'object' || !data.heroA || !data.viewApp) throw Error('Invalid translation resource');
    } catch (error) {
      if (version !== requestVersion) return;
      console.warn('Translation read failed; English fallback:', code, error);
      if (code !== fallback) return setLocale(fallback, {remember:false});
      return;
    }
    if (version !== requestVersion) return; // latest selection wins
    current = code;
    messages = data;
    applyStatic();
    if (remember) {
      try { localStorage.setItem('tsz-next-language', current); } catch (_) {}
      try {
        const url = new URL(location.href); url.searchParams.set('language', current);
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (_) {}
    }
    document.dispatchEvent(new CustomEvent('tsz-locale-changed', {detail:{locale:current}}));
  }
  function buildSelect() {
    const select = document.getElementById('locale-select');
    if (!select) return;
    for (const [code,label] of localeData) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = label;
      option.lang = code;
      option.dir = 'auto';
      select.append(option);
    }
    select.addEventListener('change', () => { void setLocale(select.value, {remember:true}); });
  }
  window.TSZ_I18N = Object.freeze({ t, setLocale, get locale(){return current;}, localeCount: localeData.length });
  buildSelect();
  void setLocale(initialLocale());
})();
