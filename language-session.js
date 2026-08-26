(function registerLanguageSession(global) {
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = new Set(["en", "zh", "ja"]);
  const STORAGE_KEYS = ["portfolio-language", "musclekey-language"];

  function clearSavedLanguage(runtime) {
    try {
      STORAGE_KEYS.forEach((key) => runtime.localStorage.removeItem(key));
    } catch (_error) {
      // Private browsing and file URLs may block storage; English still remains the default.
    }
  }

  function consumeIncomingLanguage(runtime) {
    const url = new runtime.URL(runtime.location.href);
    const requestedLanguage = url.searchParams.get("lang");
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      runtime.history.replaceState(
        runtime.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
    return SUPPORTED_LANGUAGES.has(requestedLanguage)
      ? requestedLanguage
      : DEFAULT_LANGUAGE;
  }

  function begin(runtime = global) {
    clearSavedLanguage(runtime);
    try {
      return consumeIncomingLanguage(runtime);
    } catch (_error) {
      return DEFAULT_LANGUAGE;
    }
  }

  global.PORTFOLIO_LANGUAGE_SESSION = Object.freeze({
    defaultLanguage: DEFAULT_LANGUAGE,
    begin,
  });
})(window);
