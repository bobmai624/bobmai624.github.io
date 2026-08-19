const SUPPORTED_LANGUAGES = new Set(['zh', 'en', 'ja']);
const TRANSLATIONS = window.PEDALBALANCE_TRANSLATIONS || {
  staticCopy: {},
  attributeCopy: {},
  pageMeta: {},
};
const sourceTextByNode = new WeakMap();
const sourceAttributesByNode = new WeakMap();

const UI_COPY = {
  zh: {
    skip: '跳到主要内容',
    allWork: '返回全部作品',
    navVision: '项目愿景',
    navMaking: '原型与制作',
    navExperiment: '实验与能力',
    downloadSource: '下载源文件',
    openPrototype: '打开交互原型',
    exploreSystem: '查看系统',
    startJourney: '开始阅读作品旅程',
    journeyOverview: '总览',
    journeyLoop: '交互闭环',
    journeyBuild: '制作',
    journeyStudy: '实验',
    journeyEvidence: '证据',
    makingDetails: '查看零件、安装方式与 14 天制作记录',
    studyDetails: '查看实验条件、指标与故障处理',
    openOptionalLab: '打开补充交互实验室',
    pauseAnimation: '暂停动画',
    playAnimation: '播放动画',
    nextMaking: '下一页：查看制作过程',
    nextExperiment: '下一页：测试表现、学习与回放',
  },
  en: {
    skip: 'Skip to content',
    allWork: 'All work',
    navVision: 'Project Vision',
    navMaking: 'Prototype & Making',
    navExperiment: 'Experiment & Capabilities',
    downloadSource: 'Source files',
    openPrototype: 'Open Interactive Prototype',
    exploreSystem: 'Explore the system',
    startJourney: 'Start the journey',
    journeyOverview: 'Overview',
    journeyLoop: 'Loop',
    journeyBuild: 'Build',
    journeyStudy: 'Study',
    journeyEvidence: 'Evidence',
    makingDetails: 'See parts, mounting and 14-day build log',
    studyDetails: 'See conditions, measures and failure handling',
    openOptionalLab: 'Open optional interactive lab',
    pauseAnimation: 'Pause animation',
    playAnimation: 'Play animation',
    nextMaking: 'Next: see how it is built',
    nextExperiment: 'Next: test performance, learning and replay',
  },
  ja: {
    skip: '本文へ移動',
    allWork: '作品一覧へ戻る',
    navVision: 'プロジェクト構想',
    navMaking: 'プロトタイプと制作',
    navExperiment: '実験と能力',
    downloadSource: '元ファイルをダウンロード',
    openPrototype: 'インタラクティブ原型を開く',
    exploreSystem: 'システムを見る',
    startJourney: '作品の流れを読む',
    journeyOverview: '概要',
    journeyLoop: '閉ループ',
    journeyBuild: '制作',
    journeyStudy: '実験',
    journeyEvidence: '証拠',
    makingDetails: '部品・装着方法・14日間の制作記録を見る',
    studyDetails: '実験条件・指標・障害対応を見る',
    openOptionalLab: '補足インタラクティブ・ラボを開く',
    pauseAnimation: 'アニメーションを停止',
    playAnimation: 'アニメーションを再生',
    nextMaking: '次へ：制作過程を見る',
    nextExperiment: '次へ：成果・学習・再生を検証する',
  },
};

function updateLanguageLinks(language) {
  document.querySelectorAll('[data-page-link]').forEach((link) => {
    const url = new URL(link.getAttribute('href'), window.location.href);
    url.searchParams.set('lang', language);
    link.href = url.href;
  });

  document.querySelectorAll('[data-portfolio-home]').forEach((link) => {
    link.href = `../index.html?lang=${language}#work`;
  });
}

function replaceKnownCopy(source, language) {
  const exact = TRANSLATIONS.staticCopy[source]?.[language];
  return exact || source;
}

function localiseStaticText(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const parent = node.parentElement;
    const excluded = parent?.closest('[data-lang], [data-ui], script, style');
    if (!excluded) {
      if (!sourceTextByNode.has(node)) sourceTextByNode.set(node, node.nodeValue);
      const sourceValue = sourceTextByNode.get(node);
      const match = sourceValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
      node.nodeValue = language === 'en'
        ? sourceValue
        : `${match[1]}${replaceKnownCopy(match[2], language)}${match[3]}`;
    }
    node = walker.nextNode();
  }

  document.querySelectorAll('[aria-label], [title]').forEach((element) => {
    if (!sourceAttributesByNode.has(element)) {
      sourceAttributesByNode.set(element, {
        ariaLabel: element.getAttribute('aria-label'),
        title: element.getAttribute('title'),
      });
    }
    const source = sourceAttributesByNode.get(element);
    for (const [attribute, value] of [['aria-label', source.ariaLabel], ['title', source.title]]) {
      if (!value) continue;
      const copy = TRANSLATIONS.attributeCopy[value]?.[language];
      element.setAttribute(attribute, language === 'en' ? value : (copy || replaceKnownCopy(value, language)));
    }
  });

  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  const meta = TRANSLATIONS.pageMeta[pageName]?.[language];
  if (meta) {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }
}

export function setLanguage(language) {
  const lang = SUPPORTED_LANGUAGES.has(language) ? language : 'en';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  document.querySelectorAll('[data-lang]').forEach((node) => {
    node.hidden = node.dataset.lang !== lang;
  });
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === lang;
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-ui]').forEach((node) => {
    const copy = UI_COPY[lang][node.dataset.ui];
    if (copy) node.textContent = copy;
  });
  localiseStaticText(lang);
  updateLanguageLinks(lang);

  document.dispatchEvent(new CustomEvent('pedalbalance:language', { detail: { language: lang } }));
  return lang;
}

export function mountLanguageControls() {
  const initialLanguage = window.PORTFOLIO_LANGUAGE_SESSION?.begin(window) || 'en';
  setLanguage(initialLanguage);
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
}
