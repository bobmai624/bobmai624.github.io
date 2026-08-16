import { simulateRun, summariseRevolutions } from './experiment-model.js';

export function mountExperimentCharts() {
  document.querySelectorAll('[data-sim-chart]').forEach((chart) => {
    const condition = chart.dataset.simChart;
    const run = simulateRun(condition, Number(chart.dataset.seed || 42));
    const summary = summariseRevolutions(run.rows);
    const plot = chart.querySelector('[data-chart-plot]');
    if (plot) {
      plot.replaceChildren(...run.rows.filter((_, index) => index % 3 === 0).map((row) => {
        const bar = document.createElement('i');
        bar.style.setProperty('--value', `${Math.round(row.left * 100)}%`);
        bar.className = row.valid ? (row.cueSide === 'none' ? 'valid-bar' : 'cue-bar') : 'invalid-bar';
        bar.title = `Cycle ${row.cycle}: left ${Math.round(row.left * 100)}%, ${row.valid ? row.cueSide : 'invalid'}`;
        return bar;
      }));
    }
    const summaryNode = chart.querySelector('[data-chart-summary]');
    if (summaryNode) {
      summaryNode.textContent = `${summary.validCycles} valid revolutions · ${summary.invalidCycles} invalid · ${summary.feedbackCycles} feedback cycles · mean |error| ${summary.meanAbsoluteError}`;
    }
  });
}
