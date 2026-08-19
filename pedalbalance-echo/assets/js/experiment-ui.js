import { simulateRun, summariseRevolutions } from './experiment-model.js';

export function mountExperimentCharts() {
  document.querySelectorAll('[data-sim-chart]').forEach((chart) => {
    const condition = chart.dataset.simChart;
    const run = simulateRun(condition, Number(chart.dataset.seed || 42));
    const summary = summariseRevolutions(run.rows);
    const copy = {
      en: { cycle: 'Cycle', left: 'left', valid: 'valid revolutions', invalid: 'invalid', feedback: 'feedback cycles', error: 'mean |error|', sides: { left: 'left cue', right: 'right cue', none: 'no cue' } },
      zh: { cycle: '踏圈', left: '左侧', valid: '个有效踏圈', invalid: '个无效踏圈', feedback: '个提示踏圈', error: '平均 |误差|', sides: { left: '左侧提示', right: '右侧提示', none: '无提示' } },
      ja: { cycle: '回転', left: '左', valid: '有効回転', invalid: '無効', feedback: '提示回転', error: '平均 |誤差|', sides: { left: '左提示', right: '右提示', none: '提示なし' } },
    };
    const render = (language = document.documentElement.lang) => {
      const lang = language === 'zh-CN' ? 'zh' : language;
      const labels = copy[lang] || copy.en;
      const plot = chart.querySelector('[data-chart-plot]');
      if (plot) {
        plot.replaceChildren(...run.rows.filter((_, index) => index % 3 === 0).map((row) => {
          const bar = document.createElement('i');
          bar.style.setProperty('--value', `${Math.round(row.left * 100)}%`);
          bar.className = row.valid ? (row.cueSide === 'none' ? 'valid-bar' : 'cue-bar') : 'invalid-bar';
          const state = row.valid ? labels.sides[row.cueSide] : labels.invalid;
          bar.title = `${labels.cycle} ${row.cycle}: ${labels.left} ${Math.round(row.left * 100)}%, ${state}`;
          return bar;
        }));
      }
      const summaryNode = chart.querySelector('[data-chart-summary]');
      if (summaryNode) {
        summaryNode.textContent = `${summary.validCycles} ${labels.valid} · ${summary.invalidCycles} ${labels.invalid} · ${summary.feedbackCycles} ${labels.feedback} · ${labels.error} ${summary.meanAbsoluteError}`;
      }
    };
    render();
    document.addEventListener('pedalbalance:language', (event) => render(event.detail.language));
  });
}
