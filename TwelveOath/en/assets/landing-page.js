(() => {
  const currentScript = document.currentScript;
  const localeDir = currentScript?.dataset?.localeDir || "assets/landing-locales/";
  const defaultLocale = currentScript?.dataset?.defaultLocale || "en-US";
  const loaded = new Set();

  function params() { return new URLSearchParams(window.location.search); }
  function requestedLocale() {
    if (window.TwelveOathAppStoreMetadata?.locale) return window.TwelveOathAppStoreMetadata.locale;
    const explicit = params().get("locale") || params().get("lang");
    if (explicit) return explicit;
    try {
      const saved = window.localStorage?.getItem("TwelveOath.locale");
      if (saved) return saved;
    } catch (_) {}
    return navigator.language || defaultLocale;
  }
  function candidates(locale) {
    const normalized = String(locale || defaultLocale).replace("_", "-");
    const base = normalized.split("-")[0];
    return [...new Set([normalized, base, defaultLocale, "en-US"])].filter(Boolean);
  }
  function normalizeText(value) {
    return String(value ?? "").replace(/\\n/g, "\n").trim();
  }
  function loadLocale(locale) {
    if (!locale || locale === "en-US") return Promise.resolve(false);
    if (window.TwelveOathLandingLocales?.[locale]) return Promise.resolve(true);
    if (loaded.has(locale)) return Promise.resolve(Boolean(window.TwelveOathLandingLocales?.[locale]));
    loaded.add(locale);
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `${localeDir}${encodeURIComponent(locale)}.js`;
      script.async = true;
      script.onload = () => resolve(Boolean(window.TwelveOathLandingLocales?.[locale]));
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }
  function setText(key, value) {
    if (value === undefined || value === null) return;
    document.querySelectorAll(`[data-landing-key="${CSS.escape(key)}"]`).forEach((node) => {
      node.textContent = normalizeText(value);
    });
  }
  function debug(locale, state) {
    const badge = document.querySelector("[data-metadata-debug-badge]");
    if (!badge) return;
    const current = badge.textContent || "";
    const prefix = current.includes(" / Landing:") ? current.split(" / Landing:")[0] : current;
    badge.textContent = `${prefix} / Landing: ${locale || "-"} ${state}`;
  }
  function apply(locale, data) {
    if (!data || typeof data !== "object") return;
    document.documentElement.dataset.landingLocale = locale;
    Object.entries(data).forEach(([key, value]) => setText(key, value));
    if (data.pageTitle) {
      document.title = data.pageTitle;
      const og = document.querySelector('meta[property="og:title"]');
      if (og) og.setAttribute("content", data.pageTitle);
    }
    if (data.pageDescription) {
      const meta = document.querySelector('meta[name="description"]');
      const ogd = document.querySelector('meta[property="og:description"]');
      if (meta) meta.setAttribute("content", data.pageDescription);
      if (ogd) ogd.setAttribute("content", data.pageDescription);
    }
    debug(locale, "loaded");
  }
  async function applyForLocale(locale) {
    debug(locale, "loading");
    for (const candidate of candidates(locale)) {
      if (candidate === "en-US") break;
      const ok = await loadLocale(candidate);
      const data = window.TwelveOathLandingLocales?.[candidate];
      if (ok && data) {
        apply(candidate, data);
        return;
      }
    }
    document.documentElement.dataset.landingLocale = "en-US";
    debug("en-US", "fallback");
  }
  function run() { applyForLocale(requestedLocale()); }
  document.addEventListener("twelveoathmetadataready", (event) => {
    applyForLocale(event?.detail?.locale || requestedLocale());
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
