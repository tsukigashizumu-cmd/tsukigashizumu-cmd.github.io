(() => {
  const currentScript = document.currentScript;
  const metadataPath = currentScript?.dataset?.metadataPath || "assets/locales/appstore-metadata.json";
  const defaultLocale = currentScript?.dataset?.defaultLocale || "en-US";

  function normalizeInternalURL(value) {
    if (!value || typeof value !== "string") return value;
    return value
      .replace("https://tsukigashizumu-cmd.github.io/TwelveOath/privacy/", "https://tsukigashizumu-cmd.github.io/TwelveOath/en/privacy/")
      .replace("https://tsukigashizumu-cmd.github.io/TwelveOath/support/", "https://tsukigashizumu-cmd.github.io/TwelveOath/en/support/")
      .replace("/TwelveOath/privacy/", "/TwelveOath/en/privacy/")
      .replace("/TwelveOath/support/", "/TwelveOath/en/support/");
  }

  function localeCandidates(all) {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("locale") || params.get("lang") || navigator.language || defaultLocale;
    const normalized = requested.replace("_", "-");
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
    const collapsed = String(source).replace(/\s+/g, " ").trim();
    return collapsed.length > 170 ? collapsed.slice(0, 167).trimEnd() + "..." : collapsed;
  }

  function applyEntry(locale, entry) {
    document.documentElement.lang = locale;

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
      if (field && entry[field]) node.textContent = entry[field];
    });

    document.querySelectorAll("[data-url-field]").forEach((node) => {
      const field = node.getAttribute("data-url-field");
      if (field && entry[field]) node.setAttribute("href", normalizeInternalURL(entry[field]));
    });
  }

  fetch(metadataPath, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`metadata fetch failed: ${response.status}`);
      return response.json();
    })
    .then((all) => {
      const candidates = localeCandidates(all);
      if (!candidates.length) return;
      const locale = candidates[0];
      const entry = all[locale];
      if (!entry || typeof entry !== "object") return;
      window.TwelveOathAppStoreMetadata = { locale, entry, all };
      applyEntry(locale, entry);
      document.dispatchEvent(new CustomEvent("twelveoathmetadataready", { detail: { locale, entry, all } }));
    })
    .catch((error) => {
      console.warn("TwelveOath metadata source was not applied.", error);
    });
})();
