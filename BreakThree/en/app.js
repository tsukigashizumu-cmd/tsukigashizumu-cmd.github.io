(async () => {
  const params = new URLSearchParams(location.search);
  const requested = params.get("language") || "en";
  const fallback = requested === "en" ? "en-US" : requested;

  const response = await fetch("./assets/locales/appstore-metadata.json");
  if (!response.ok) throw new Error(`Metadata load failed: ${response.status}`);
  const metadata = await response.json();
  const item = metadata[fallback] || metadata["en-US"];

  document.documentElement.lang = requested.split("-")[0] || "en";
  document.title = `${item.name} — ${item.subtitle}`;
  document.querySelector("[data-name]").textContent = item.name;
  document.querySelector("[data-subtitle]").textContent = item.subtitle;
  document.querySelector("[data-promo]").textContent = item.promotionalText;
  document.querySelector("[data-description]").textContent = item.description;
})();
