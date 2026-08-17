import { mountLanguageControls } from './language.js?v=20260817-english-default';
import { mountHeroCanvas } from './hero-canvas.js';
import { mountComponentFilters } from './components.js';
import { mountExperimentCharts } from './experiment-ui.js';
import { mountPrototypeUI } from './prototype-ui.js?v=20260817-english-default';

document.addEventListener('DOMContentLoaded', () => {
  mountLanguageControls();
  mountComponentFilters();
  mountExperimentCharts();
  mountPrototypeUI();
  const canvas = document.querySelector('[data-hero-canvas]');
  const dashboard = document.querySelector('[data-hero-dashboard]');
  if (canvas) {
    const controller = mountHeroCanvas(canvas, dashboard);
    const pauseButton = document.querySelector('[data-animation-toggle]');
    if (pauseButton) {
      const animationCopy = {
        zh: { pause: '暂停动画', play: '播放动画' },
        en: { pause: 'Pause animation', play: 'Play animation' },
        ja: { pause: 'アニメーションを停止', play: 'アニメーションを再生' },
      };
      const updateAnimationLabel = (language = document.documentElement.lang) => {
        const lang = language === 'zh-CN' ? 'zh' : language;
        pauseButton.dataset.ui = controller.paused ? 'playAnimation' : 'pauseAnimation';
        pauseButton.textContent = animationCopy[lang]?.[controller.paused ? 'play' : 'pause']
          || animationCopy.en[controller.paused ? 'play' : 'pause'];
      };
      pauseButton.addEventListener('click', () => {
        if (controller.paused) controller.resume(); else controller.pause();
        pauseButton.setAttribute('aria-pressed', String(controller.paused));
        updateAnimationLabel();
      });
      document.addEventListener('pedalbalance:language', (event) => updateAnimationLabel(event.detail.language));
    }
    document.addEventListener('pedalbalance:prototype-open', () => controller.pause());
    document.addEventListener('pedalbalance:prototype-close', () => controller.resume());
  }
  const revolutionDemo = document.querySelector('[data-revolution-demo]');
  if (revolutionDemo) {
    const result = revolutionDemo.querySelector('[data-demo-result]');
    const copy = revolutionDemo.querySelector('[data-demo-copy]');
    revolutionDemo.querySelectorAll('[data-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        const instant = button.dataset.mode === 'instant';
        revolutionDemo.classList.toggle('is-instant', instant);
        revolutionDemo.querySelectorAll('[data-mode]').forEach((control) => {
          control.setAttribute('aria-pressed', String(control === button));
        });
        result.textContent = instant ? '92 / 08 ?' : '48 / 52';
        copy.textContent = instant
          ? 'False alarm: normal alternating pedal phases look unequal frame by frame.'
          : 'One complete cycle: compare accumulated relative contribution once.';
      });
    });
  }
});
