import { createPrototypeMachine } from './prototype-machine.js';
import { PROTOTYPE_STEPS, getPrototypeStep, prototypeLabels } from './prototype-flow.js';
import { setLanguage } from './language.js';

function currentLanguage() {
  const lang = document.documentElement.lang || 'zh-CN';
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('ja')) return 'ja';
  return 'zh';
}

function buildOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'prototype-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <section class="prototype-dialog" role="dialog" aria-modal="true" aria-labelledby="prototype-title">
      <header class="prototype-header">
        <div><b>PEDALBALANCE ECHO</b><span data-prototype-counter>01 / 07</span></div>
        <div class="prototype-header-tools">
          <div class="prototype-languages">
            <button type="button" data-prototype-language data-language="zh" aria-pressed="true">中文</button>
            <button type="button" data-prototype-language data-language="en" aria-pressed="false">EN</button>
            <button type="button" data-prototype-language data-language="ja" aria-pressed="false">日本語</button>
          </div>
          <button type="button" data-prototype-close></button>
        </div>
      </header>
      <div class="prototype-body">
        <ol class="prototype-progress"></ol>
        <div class="prototype-stage">
          <div class="prototype-copy">
            <p class="kicker" data-prototype-tag></p>
            <h2 id="prototype-title" data-prototype-title></h2>
            <p class="prototype-summary" data-prototype-summary></p>
            <dl class="prototype-explanation">
              <div><dt data-action-label></dt><dd data-prototype-action></dd></div>
              <div><dt data-system-label></dt><dd data-prototype-system></dd></div>
              <div><dt data-check-label></dt><dd data-prototype-check></dd></div>
            </dl>
          </div>
          <div class="prototype-visual">
            <span class="simulation-stamp" data-simulation-label></span>
            <div class="prototype-flow-grid">
              <article class="flow-card flow-input" data-flow-card="input">
                <span data-flow-input-title></span>
                <strong data-flow-input></strong>
                <div class="prototype-bars" aria-hidden="true"><i data-bar-left></i><i data-bar-right></i></div>
              </article>
              <article class="flow-card flow-decision" data-flow-card="decision">
                <span data-flow-decision-title></span>
                <strong data-flow-decision></strong>
                <div class="decision-rule" aria-hidden="true"><i></i><i></i><i></i></div>
              </article>
              <article class="flow-card flow-cue" data-flow-card="cue">
                <span data-flow-cue-title></span>
                <strong data-flow-cue></strong>
                <div class="ankle-pair" aria-hidden="true"><i class="ankle ankle-left">L</i><i class="ankle ankle-right">R</i></div>
              </article>
              <article class="flow-card flow-outcome" data-flow-card="outcome">
                <span data-flow-outcome-title></span>
                <strong data-flow-outcome></strong>
                <div class="outcome-trace" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
              </article>
            </div>
            <div class="prototype-machine-strip">
              <span data-machine-title></span>
              <b data-machine-state></b>
            </div>
          </div>
        </div>
      </div>
      <footer class="prototype-footer">
        <button type="button" class="stop-control" data-prototype-stop></button>
        <div><button type="button" data-prototype-back></button><button type="button" data-prototype-next></button></div>
      </footer>
    </section>`;
  document.body.append(overlay);
  return overlay;
}

function driveMachine(machine, stepKey) {
  machine.dispatch('RESET');
  if (stepKey === 'QUESTION') return machine.snapshot();

  machine.dispatch('ACK_SAFETY');
  machine.dispatch('DISCOVER');
  machine.dispatch('DEVICE_READY');
  if (stepKey === 'SETUP') return machine.snapshot();

  machine.dispatch('CALIBRATION_COMPLETE');
  if (stepKey === 'BASELINE') return machine.snapshot();

  machine.dispatch('BASELINE_COMPLETE');
  if (stepKey === 'TRAINING') {
    machine.dispatch('START_TRAINING');
    machine.dispatch({ type: 'SET_CUE', side: 'left' });
  } else if (stepKey === 'NO_CUE') {
    machine.dispatch('START_TRAINING');
    machine.dispatch('END_TRAINING');
  } else if (stepKey === 'REPLAY') {
    machine.dispatch({ type: 'START_REPLAY', provenance: 'past_self' });
  } else if (stepKey === 'RESULTS') {
    machine.dispatch('EXPORT');
  }
  return machine.snapshot();
}

export function mountPrototypeUI() {
  const triggers = [...document.querySelectorAll('[data-open-prototype]')];
  if (!triggers.length) return null;

  const overlay = buildOverlay();
  const machine = createPrototypeMachine();
  const progress = overlay.querySelector('.prototype-progress');

  PROTOTYPE_STEPS.forEach((_, index) => {
    const item = document.createElement('li');
    item.innerHTML = `<button type="button" data-scene-index="${index}"><b>${String(index + 1).padStart(2, '0')}</b><span></span></button>`;
    progress.append(item);
  });

  let stepIndex = 0;
  let returnFocus = null;

  const render = () => {
    const language = currentLanguage();
    const labels = prototypeLabels(language);
    const step = getPrototypeStep(stepIndex, language);
    driveMachine(machine, step.key);

    overlay.dataset.focus = step.focus;
    overlay.dataset.output = step.outputMode;
    overlay.querySelector('[data-prototype-counter]').textContent = `${String(stepIndex + 1).padStart(2, '0')} / ${String(PROTOTYPE_STEPS.length).padStart(2, '0')}`;
    overlay.querySelector('[data-prototype-close]').textContent = labels.close;
    overlay.querySelector('[data-prototype-close]').setAttribute('aria-label', labels.close.replace(' ×', ''));
    overlay.querySelector('.prototype-languages').setAttribute('aria-label', labels.languageLabel);
    overlay.querySelectorAll('[data-prototype-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    overlay.querySelector('[data-prototype-tag]').textContent = step.tag;
    overlay.querySelector('[data-prototype-title]').textContent = step.title;
    overlay.querySelector('[data-prototype-summary]').textContent = step.summary;
    overlay.querySelector('[data-action-label]').textContent = labels.doLabel;
    overlay.querySelector('[data-system-label]').textContent = labels.systemLabel;
    overlay.querySelector('[data-check-label]').textContent = labels.checkLabel;
    overlay.querySelector('[data-prototype-action]').textContent = step.action;
    overlay.querySelector('[data-prototype-system]').textContent = step.system;
    overlay.querySelector('[data-prototype-check]').textContent = step.check;
    overlay.querySelector('[data-simulation-label]').textContent = labels.simulation;
    overlay.querySelector('.prototype-progress').setAttribute('aria-label', labels.stepsLabel);
    overlay.querySelector('.prototype-visual').setAttribute('aria-label', labels.visualLabel);
    overlay.querySelector('[data-flow-input-title]').textContent = labels.inputTitle;
    overlay.querySelector('[data-flow-decision-title]').textContent = labels.decisionTitle;
    overlay.querySelector('[data-flow-cue-title]').textContent = labels.cueTitle;
    overlay.querySelector('[data-flow-outcome-title]').textContent = labels.outcomeTitle;
    overlay.querySelector('[data-flow-input]').textContent = step.inputLabel;
    overlay.querySelector('[data-flow-decision]').textContent = step.decisionLabel;
    overlay.querySelector('[data-flow-cue]').textContent = step.cueLabel;
    overlay.querySelector('[data-flow-outcome]').textContent = step.outcomeLabel;
    overlay.querySelector('[data-machine-title]').textContent = labels.machineTitle;
    overlay.querySelector('[data-machine-state]').textContent = step.machineState;
    overlay.querySelector('[data-prototype-stop]').textContent = labels.stop;
    overlay.querySelector('[data-prototype-back]').textContent = labels.back;
    overlay.querySelector('[data-prototype-next]').textContent = stepIndex === PROTOTYPE_STEPS.length - 1 ? labels.restart : labels.next;
    overlay.querySelector('[data-prototype-back]').disabled = stepIndex === 0;

    overlay.querySelectorAll('[data-scene-index]').forEach((button, index) => {
      const view = getPrototypeStep(index, language);
      button.querySelector('span').textContent = view.nav;
      button.setAttribute('aria-current', index === stepIndex ? 'step' : 'false');
      button.setAttribute('aria-label', `${index + 1}. ${view.nav}`);
    });

    overlay.classList.toggle('is-cue-left', step.cueSide === 'left');
    overlay.classList.toggle('is-cue-right', step.cueSide === 'right');
    overlay.querySelector('[data-bar-left]').style.height = `${step.values[0]}%`;
    overlay.querySelector('[data-bar-right]').style.height = `${step.values[1]}%`;
  };

  const close = () => {
    if (overlay.hidden) return;
    machine.dispatch('STOP_OUTPUT');
    overlay.hidden = true;
    document.body.classList.remove('prototype-open');
    document.dispatchEvent(new CustomEvent('pedalbalance:prototype-close'));
    returnFocus?.focus();
  };

  const open = (trigger) => {
    returnFocus = trigger;
    stepIndex = 0;
    render();
    overlay.hidden = false;
    document.body.classList.add('prototype-open');
    document.dispatchEvent(new CustomEvent('pedalbalance:prototype-open'));
    overlay.querySelector('[data-prototype-next]').focus();
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', () => open(trigger)));
  overlay.querySelectorAll('[data-prototype-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language, { updateUrl: true }));
  });
  overlay.querySelector('[data-prototype-close]').addEventListener('click', close);
  overlay.querySelector('[data-prototype-stop]').addEventListener('click', () => {
    const labels = prototypeLabels(currentLanguage());
    machine.dispatch('STOP_OUTPUT');
    overlay.classList.remove('is-cue-left', 'is-cue-right');
    overlay.dataset.output = 'off';
    overlay.querySelector('[data-machine-state]').textContent = labels.stopped;
  });
  overlay.querySelector('[data-prototype-next]').addEventListener('click', () => {
    stepIndex = stepIndex === PROTOTYPE_STEPS.length - 1 ? 0 : stepIndex + 1;
    render();
  });
  overlay.querySelector('[data-prototype-back]').addEventListener('click', () => {
    stepIndex = Math.max(0, stepIndex - 1);
    render();
  });
  progress.addEventListener('click', (event) => {
    const button = event.target.closest('[data-scene-index]');
    if (!button) return;
    stepIndex = Number(button.dataset.sceneIndex);
    render();
  });
  document.addEventListener('pedalbalance:language', render);
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const focusable = [...overlay.querySelectorAll('button:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  return { open, close, render, machine };
}
