
(() => {
  const currentScript = document.currentScript;
  const metadataPath = currentScript?.dataset?.metadataPath || "assets/locales/appstore-metadata.json";
  const defaultLocale = currentScript?.dataset?.defaultLocale || "en-US";
  const rtlBases = new Set(["ar", "he", "ur"]);

  function normalizeInternalURL(value) {
    if (!value || typeof value !== "string") return value;
    return value
      .replace("https://tsukigashizumu-cmd.github.io/TwelveOath/privacy/", "https://tsukigashizumu-cmd.github.io/TwelveOath/en/privacy/")
      .replace("https://tsukigashizumu-cmd.github.io/TwelveOath/support/", "https://tsukigashizumu-cmd.github.io/TwelveOath/en/support/")
      .replace("/TwelveOath/privacy/", "/TwelveOath/en/privacy/")
      .replace("/TwelveOath/support/", "/TwelveOath/en/support/");
  }

  function getParams() { return new URLSearchParams(window.location.search); }

  function currentRequestedLocale() {
    const params = getParams();
    const explicit = params.get("locale") || params.get("lang");
    if (explicit) return explicit;
    try {
      const saved = window.localStorage?.getItem("TwelveOath.locale");
      if (saved) return saved;
    } catch (_) {}
    return navigator.language || defaultLocale;
  }

  function localeCandidates(all) {
    const requested = currentRequestedLocale();
    const normalized = String(requested).replace("_", "-");
    const base = normalized.split("-")[0];
    const candidates = [normalized, base, defaultLocale, "en-US", "ja"];
    return [...new Set(candidates)].filter(Boolean).filter((key) => Object.prototype.hasOwnProperty.call(all, key));
  }

  function setMeta(selector, value) {
    if (!value) return;
    const node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
  }

  function shortDescription(entry) {
    const source = entry.promotionalText || entry.subtitle || entry.description || "";
    const collapsed = String(source).replace(/\\n/g, "\n").replace(/\s+/g, " ").trim();
    return collapsed.length > 170 ? collapsed.slice(0, 167).trimEnd() + "..." : collapsed;
  }

  function normalizeText(value) {
    return String(value || "").replace(/\\n/g, "\n").trim();
  }

  function clearNode(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function appendParagraph(parent, text) {
    const p = document.createElement("p");
    p.textContent = text.trim();
    parent.appendChild(p);
  }

  function appendList(parent, items) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.replace(/^[•・\-*]\s*/, "").trim();
      ul.appendChild(li);
    });
    parent.appendChild(ul);
  }

  function renderStructuredText(node, value) {
    clearNode(node);
    const text = normalizeText(value).replace(/\r\n/g, "\n");
    if (!text) return;
    const blocks = text.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);
    blocks.forEach((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => /^[•・\-*]\s+/.test(line))) {
        appendList(node, lines);
        return;
      }
      let paragraphLines = [];
      let bulletLines = [];
      const flushParagraph = () => {
        if (paragraphLines.length) {
          appendParagraph(node, paragraphLines.join("\n"));
          paragraphLines = [];
        }
      };
      const flushBullets = () => {
        if (bulletLines.length) {
          appendList(node, bulletLines);
          bulletLines = [];
        }
      };
      lines.forEach((line) => {
        if (/^[•・\-*]\s+/.test(line)) {
          flushParagraph();
          bulletLines.push(line);
        } else {
          flushBullets();
          paragraphLines.push(line);
        }
      });
      flushParagraph();
      flushBullets();
    });
  }

  function applyTextNode(node, value) {
    if (value === undefined || value === null || value === "") return;
    const render = node.getAttribute("data-meta-render") || "text";
    if (render === "structured" || render === "paragraphs") {
      renderStructuredText(node, value);
    } else {
      node.textContent = normalizeText(value);
    }
  }

  function localizedScreenshotPath(src, locale) {
    if (!src || typeof src !== "string") return src;
    return src.replace(/StoreDockScreenshots\/[^/]+\/APP_IPHONE_67\//, `StoreDockScreenshots/${locale}/APP_IPHONE_67/`);
  }

  function localizedPreviewPath(src, locale) {
    if (!src || typeof src !== "string") return src;
    return src.replace(/StoreDockAppPreviews\/[^/]+\/IPHONE_67\//, `StoreDockAppPreviews/${locale}/IPHONE_67/`);
  }

  function applyLocalizedMedia(locale) {
    document.querySelectorAll('img[src*="StoreDockScreenshots/"]').forEach((img) => {
      if (!img.dataset.defaultSrc) img.dataset.defaultSrc = img.getAttribute("src") || "";
      const fallback = img.dataset.defaultSrc || "";
      const localized = localizedScreenshotPath(fallback, locale);
      if (!localized || localized === img.getAttribute("src")) return;
      img.onerror = () => {
        if (img.getAttribute("src") !== fallback) img.setAttribute("src", fallback);
      };
      img.setAttribute("src", localized);
    });

    document.querySelectorAll('video source[src*="StoreDockAppPreviews/"], video[src*="StoreDockAppPreviews/"]').forEach((node) => {
      if (!node.dataset.defaultSrc) node.dataset.defaultSrc = node.getAttribute("src") || "";
      const fallback = node.dataset.defaultSrc || "";
      const localized = localizedPreviewPath(fallback, locale);
      if (!localized || localized === node.getAttribute("src")) return;
      node.setAttribute("src", localized);
      const video = node.tagName.toLowerCase() === "video" ? node : node.closest("video");
      if (video && typeof video.load === "function") video.load();
    });
  }

  function localeDisplayName(locale, entry) {
    const name = entry && typeof entry === "object" ? entry.name : "";
    return name && name !== locale ? `${locale} · ${name}` : locale;
  }

  function sortedLocales(all) {
    const keys = Object.keys(all || {});
    const priority = ["en-US", "ja"];
    const rest = keys.filter((key) => !priority.includes(key)).sort((a, b) => a.localeCompare(b));
    return priority.filter((key) => keys.includes(key)).concat(rest);
  }

  function setURLLocale(locale) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("locale", locale);
      window.history.replaceState({}, "", url);
    } catch (_) {}
  }

  function setupLocaleSelectors(all, activeLocale) {
    document.querySelectorAll("[data-locale-select]").forEach((select) => {
      if (!select.dataset.localePopulated) {
        const fragment = document.createDocumentFragment();
        sortedLocales(all).forEach((locale) => {
          const option = document.createElement("option");
          option.value = locale;
          option.textContent = localeDisplayName(locale, all[locale]);
          fragment.appendChild(option);
        });
        select.replaceChildren(fragment);
        select.dataset.localePopulated = "true";
        select.addEventListener("change", () => {
          const locale = select.value;
          if (!locale || !all[locale]) return;
          try { window.localStorage?.setItem("TwelveOath.locale", locale); } catch (_) {}
          setURLLocale(locale);
          window.TwelveOathAppStoreMetadata = { locale, entry: all[locale], all };
          applyEntry(locale, all[locale]);
          setupLocaleSelectors(all, locale);
          document.dispatchEvent(new CustomEvent("twelveoathmetadataready", { detail: { locale, entry: all[locale], all } }));
        });
      }
      select.value = activeLocale;
      select.setAttribute("aria-label", `Language: ${activeLocale}`);
    });
  }

  function setDebug(locale, state) {
    const params = getParams();
    const enabled = params.get("metaDebug") === "1" || params.get("debug") === "metadata";
    document.documentElement.dataset.metadataDebug = enabled ? "true" : "false";
    const badge = document.querySelector("[data-metadata-debug-badge]");
    if (badge) badge.textContent = `Locale: ${locale || "-"} / Metadata: ${state}`;
  }

  function applyEntry(locale, entry) {
    const base = locale.split("-")[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlBases.has(base) ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;
    document.documentElement.dataset.metadataLoaded = "true";

    const titleParts = [entry.name, entry.subtitle].filter(Boolean);
    if (titleParts.length) {
      document.title = titleParts.join(" - ");
      setMeta('meta[property="og:title"]', document.title);
    }

    const description = shortDescription(entry);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:description"]', description);

    document.querySelectorAll("[data-meta-field]").forEach((node) => {
      const field = node.getAttribute("data-meta-field");
      if (field && Object.prototype.hasOwnProperty.call(entry, field)) applyTextNode(node, entry[field]);
    });

    document.querySelectorAll("[data-url-field]").forEach((node) => {
      const field = node.getAttribute("data-url-field");
      if (field && entry[field]) node.setAttribute("href", normalizeInternalURL(entry[field]));
    });

    applyLocalizedMedia(locale);
    setDebug(locale, "loaded");
  }

  setDebug("-", "loading");

  fetch(metadataPath, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`metadata fetch failed: ${response.status}`);
      return response.json();
    })
    .then((all) => {
      const candidates = localeCandidates(all);
      if (!candidates.length) { setDebug("-", "missing locale"); return; }
      const locale = candidates[0];
      const entry = all[locale];
      if (!entry || typeof entry !== "object") { setDebug(locale, "invalid entry"); return; }
      window.TwelveOathAppStoreMetadata = { locale, entry, all };
      applyEntry(locale, entry);
      setupLocaleSelectors(all, locale);
      document.dispatchEvent(new CustomEvent("twelveoathmetadataready", { detail: { locale, entry, all } }));
    })
    .catch((error) => {
      document.documentElement.dataset.metadataLoaded = "false";
      setDebug("-", "failed");
      console.warn("TwelveOath metadata source was not applied.", error);
    });
})();
