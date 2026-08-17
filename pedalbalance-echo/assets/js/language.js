const SUPPORTED_LANGUAGES = new Set(['zh', 'en', 'ja']);

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

function storedLanguage() {
  try {
    return localStorage.getItem('portfolio-language')
      || localStorage.getItem('pedalbalance-language');
  } catch {
    return null;
  }
}

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

export function setLanguage(language, { updateUrl = false } = {}) {
  const lang = SUPPORTED_LANGUAGES.has(language) ? language : 'zh';
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
  updateLanguageLinks(lang);

  try {
    localStorage.setItem('portfolio-language', lang);
    localStorage.setItem('pedalbalance-language', lang);
  } catch {
    // Query parameters still preserve the selected language.
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(history.state, '', url);
  }
  document.dispatchEvent(new CustomEvent('pedalbalance:language', { detail: { language: lang } }));
  return lang;
}

export function mountLanguageControls() {
  const requested = new URL(window.location.href).searchParams.get('lang');
  const initialLanguage = SUPPORTED_LANGUAGES.has(requested)
    ? requested
    : SUPPORTED_LANGUAGES.has(storedLanguage())
      ? storedLanguage()
      : 'zh';
  setLanguage(initialLanguage);
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language, { updateUrl: true }));
  });
}
