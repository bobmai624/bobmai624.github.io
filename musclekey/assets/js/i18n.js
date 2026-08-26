(function startMuscleKeyI18n(global) {
  const catalogue = global.MUSCLEKEY_TRANSLATIONS;
  if (!catalogue) return;

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const attributes = ["alt", "aria-label", "title", "placeholder"];
  const languageCodes = { en: "en", zh: "zh-CN", ja: "ja" };
  let currentLanguage = "en";

  function preserveWhitespace(original, translated) {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function translateTextNodes(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const parent = node.parentElement;
      if (parent && !["SCRIPT", "STYLE", "CODE"].includes(parent.tagName)) {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        const original = originalText.get(node);
        const key = original.trim();
        const translated = language === "zh" ? key : catalogue[language]?.[key];
        node.nodeValue = translated ? preserveWhitespace(original, translated) : original;
      }
      node = walker.nextNode();
    }
  }

  function translateAttributes(language) {
    document.querySelectorAll("*").forEach((element) => {
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, Object.fromEntries(
          attributes.filter((name) => element.hasAttribute(name)).map((name) => [name, element.getAttribute(name)]),
        ));
      }
      const originals = originalAttributes.get(element);
      for (const [name, original] of Object.entries(originals)) {
        const translated = language === "zh" ? original : catalogue[language]?.[original];
        element.setAttribute(name, translated || original);
      }
    });
  }

  function updateMetadata(language) {
    const metadata = catalogue.meta[language] || catalogue.meta.en;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.documentElement.lang = languageCodes[language] || "en";
    document.documentElement.dataset.language = language;
  }

  function updateControls(language) {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const backLink = document.querySelector("[data-portfolio-back]");
    if (backLink) backLink.href = `../index.html?lang=${language}#work`;
  }

  function setLanguage(language, announce = true) {
    currentLanguage = ["en", "zh", "ja"].includes(language) ? language : "en";
    translateTextNodes(currentLanguage);
    translateAttributes(currentLanguage);
    updateMetadata(currentLanguage);
    updateControls(currentLanguage);
    document.documentElement.classList.remove("i18n-pending");
    if (announce) {
      global.dispatchEvent(new CustomEvent("musclekey:language", { detail: { language: currentLanguage } }));
    }
  }

  function translate(key, values = {}) {
    const template = currentLanguage === "zh" ? key : catalogue[currentLanguage]?.[key] || key;
    return Object.entries(values).reduce(
      (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
      template,
    );
  }

  global.MuscleKeyI18n = {
    get language() {
      return currentLanguage;
    },
    setLanguage,
    t: translate,
  };

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  const initialLanguage = global.PORTFOLIO_LANGUAGE_SESSION?.begin(global) || "en";
  setLanguage(initialLanguage, false);
})(window);
