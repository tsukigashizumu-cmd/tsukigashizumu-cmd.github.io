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

  function currentRequestedLocale() {
    const params = new URLSearchParams(window.location.search);
    return params.get("locale") || params.get("lang") || navigator.language || defaultLocale;
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
    const collapsed = String(source).replace(/\s+/g, " ").trim();
    return collapsed.length > 170 ? collapsed.slice(0, 167).trimEnd() + "..." : collapsed;
  }

  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

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
    const text = String(value || "").replace(/\r\n/g, "\n").trim();
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
      node.textContent = value;
    }
  }

  function applyEntry(locale, entry) {
    const base = locale.split("-")[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlBases.has(base) ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;

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
      if (field && Object.prototype.hasOwnProperty.call(entry, field)) {
        applyTextNode(node, entry[field]);
      }
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
