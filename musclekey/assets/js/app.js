(function startMuscleKeyPage() {
  const core = window.MuscleKeyCore;
  if (!core) return;
  const t = (key, values) => window.MuscleKeyI18n?.t(key, values) || key;

  const menuButton = document.querySelector('[data-mobile-menu]');
  const navigation = document.querySelector('#site-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation?.classList.toggle('is-open', open);
  });
  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton?.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });

  const instructionChecks = [...document.querySelectorAll('[data-instruction-check]')];
  const instructionProgress = document.querySelector('[data-instruction-progress]');
  const instructionProgressFill = document.querySelector('[data-instruction-progress-fill]');
  const instructionReset = document.querySelector('[data-instruction-reset]');
  const instructionStorageKey = 'musclekey-instruction-progress-v1';

  const readInstructionProgress = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(instructionStorageKey) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (_error) {
      return [];
    }
  };

  const writeInstructionProgress = (stepIds) => {
    try {
      window.localStorage.setItem(instructionStorageKey, JSON.stringify(stepIds));
    } catch (_error) {
      // The checklist still works in memory when storage is unavailable.
    }
  };

  const renderInstructionProgress = () => {
    const completed = instructionChecks.filter((checkbox) => checkbox.checked);
    instructionProgress && (instructionProgress.textContent = `${completed.length} / ${instructionChecks.length}`);
    instructionProgressFill && (instructionProgressFill.style.width = `${instructionChecks.length ? (completed.length / instructionChecks.length) * 100 : 0}%`);
    instructionChecks.forEach((checkbox) => {
      checkbox.closest('[data-instruction-step]')?.classList.toggle('is-complete', checkbox.checked);
    });
    return completed.map((checkbox) => checkbox.dataset.stepId);
  };

  if (instructionChecks.length) {
    const savedSteps = new Set(readInstructionProgress());
    instructionChecks.forEach((checkbox) => {
      checkbox.checked = savedSteps.has(checkbox.dataset.stepId);
      checkbox.addEventListener('change', () => {
        writeInstructionProgress(renderInstructionProgress());
      });
    });
    instructionReset?.addEventListener('click', () => {
      instructionChecks.forEach((checkbox) => { checkbox.checked = false; });
      try { window.localStorage.removeItem(instructionStorageKey); } catch (_error) { /* no-op */ }
      renderInstructionProgress();
    });
    renderInstructionProgress();
  }

  const canvas = document.querySelector('[data-signal-canvas]');
  const context = canvas?.getContext('2d');
  const startButton = document.querySelector('[data-demo-start]');
  const contractButton = document.querySelector('[data-contract-button]');
  const slider = document.querySelector('[data-emg-slider]');
  const readyTarget = document.querySelector('[data-target-state="ready"]');
  const goTarget = document.querySelector('[data-target-state="go"]');
  const status = document.querySelector('[data-demo-status]');
  const currentValue = document.querySelector('[data-current-emg]');
  const latestReaction = document.querySelector('[data-latest-reaction]');
  const eventState = document.querySelector('[data-event-state]');
  const trialList = document.querySelector('[data-trial-list]');
  const clearButton = document.querySelector('[data-demo-clear]');
  const exportButton = document.querySelector('[data-demo-export]');
  const summaryValid = document.querySelector('[data-summary-valid]');
  const summaryMedian = document.querySelector('[data-summary-median]');
  const summaryFalse = document.querySelector('[data-summary-false]');
  const summaryMiss = document.querySelector('[data-summary-miss]');

  if (!canvas || !context || !startButton || !contractButton || !slider) return;

  const detector = new core.ActivationDetector({
    triggerThreshold: 300,
    releaseThreshold: 190,
    debounceMs: 250
  });
  const history = Array(180).fill(110);
  const trials = [];
  let displayed = 110;
  let targetValue = 110;
  let phase = 'idle';
  let goAt = null;
  let peak = 110;
  let targetTimer = null;
  let missTimer = null;
  let flashTimer = null;

  const updateTargets = (nextPhase) => {
    const isGo = nextPhase === 'go';
    readyTarget.hidden = isGo;
    goTarget.hidden = !isGo;
  };

  const renderSummary = () => {
    const summary = core.summarizeTrials(trials);
    summaryValid.textContent = String(summary.valid);
    summaryMedian.textContent = summary.medianMs === null ? '—' : `${summary.medianMs} ms`;
    summaryFalse.textContent = String(summary.falseStarts);
    summaryMiss.textContent = String(summary.misses);
  };

  const addTrialRow = (trial) => {
    const row = document.createElement('div');
    row.setAttribute('role', 'row');
    row.setAttribute('data-trial-row', '');
    row.className = `trial-${trial.status}`;
    const statusLabels = { valid: t('VALID'), 'false-start': t('FALSE START'), miss: t('MISS') };
    row.innerHTML = [
      `<span>${String(trials.length).padStart(2, '0')}</span>`,
      `<span>${statusLabels[trial.status]}</span>`,
      `<span>${Number.isFinite(trial.reactionMs) ? `${trial.reactionMs} ms` : '—'}</span>`,
      `<span>${Math.round(trial.peakEmg || peak)}</span>`
    ].join('');
    trialList.prepend(row);
    renderSummary();
  };

  const recordTrial = (trial) => {
    trials.push(trial);
    addTrialRow(trial);
  };

  const clearTimers = () => {
    window.clearTimeout(targetTimer);
    window.clearTimeout(missTimer);
  };

  const startTrial = () => {
    clearTimers();
    phase = 'ready';
    goAt = null;
    peak = Math.round(displayed);
    updateTargets('ready');
    status.textContent = t('保持放松。绿色目标将在短暂等待后出现。');
    startButton.disabled = true;
    startButton.textContent = t('等待目标…');
    targetTimer = window.setTimeout(() => {
      phase = 'go';
      goAt = performance.now();
      updateTargets('go');
      status.textContent = t('目标已出现：现在按住“模拟握拳”。');
      startButton.textContent = t('试验进行中');
      missTimer = window.setTimeout(() => {
        if (phase !== 'go') return;
        phase = 'complete';
        recordTrial({ status: 'miss', peakEmg: peak });
        updateTargets('ready');
        status.textContent = t('本次没有在时间内触发，已记录为MISS。');
        startButton.disabled = false;
        startButton.textContent = t('开始下一次试验');
      }, 3500);
    }, 700 + Math.random() * 550);
  };

  const flashEvent = (label) => {
    window.clearTimeout(flashTimer);
    eventState.classList.add('is-triggered');
    eventState.querySelector('span').textContent = label;
    flashTimer = window.setTimeout(() => {
      eventState.classList.remove('is-triggered');
    }, 420);
  };

  const handleTrigger = (timestamp) => {
    if (phase === 'ready') {
      clearTimers();
      phase = 'complete';
      recordTrial({ status: 'false-start', peakEmg: peak });
      status.textContent = t('目标出现前已经触发，已记录为FALSE START。');
      startButton.disabled = false;
      startButton.textContent = t('重新开始');
      flashEvent('FALSE START');
      return;
    }

    if (phase === 'go' && goAt !== null) {
      clearTimers();
      const reactionMs = Math.max(1, Math.round(timestamp - goAt));
      phase = 'complete';
      recordTrial({ status: 'valid', reactionMs, peakEmg: peak });
      latestReaction.textContent = `${reactionMs} ms`;
      status.textContent = t('已记录 {ms} ms；请松开手臂后开始下一次。', { ms: reactionMs });
      startButton.disabled = false;
      startButton.textContent = t('开始下一次试验');
      flashEvent('KEY EVENT RECORDED');
    }
  };

  const setContraction = (held) => {
    contractButton.classList.toggle('is-held', held);
    targetValue = held ? 540 : 110;
    slider.value = String(targetValue);
  };

  const drawSignal = () => {
    const width = canvas.width;
    const height = canvas.height;
    const scaleY = (value) => height - 18 - ((value / 650) * (height - 36));
    context.clearRect(0, 0, width, height);

    context.strokeStyle = 'rgba(244,240,232,.08)';
    context.lineWidth = 1;
    for (let x = 0; x <= width; x += 75) {
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
    }
    for (let y = 0; y <= height; y += 50) {
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }

    [[300, '#f06442'], [190, '#46d2bb']].forEach(([value, color]) => {
      context.setLineDash([8, 7]);
      context.strokeStyle = color;
      context.beginPath(); context.moveTo(0, scaleY(value)); context.lineTo(width, scaleY(value)); context.stroke();
    });
    context.setLineDash([]);
    context.strokeStyle = '#c8f25c';
    context.lineWidth = 3;
    context.beginPath();
    history.forEach((value, index) => {
      const x = (index / (history.length - 1)) * width;
      const y = scaleY(value);
      if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
    });
    context.stroke();
  };

  const animate = (timestamp) => {
    displayed += (targetValue - displayed) * .14;
    const reading = Math.max(0, displayed + ((Math.random() - .5) * 12));
    peak = Math.max(peak, reading);
    history.push(reading);
    history.shift();
    currentValue.textContent = String(Math.round(reading));

    const detection = detector.update(reading, timestamp);
    eventState.classList.toggle('is-active', detection.active);
    if (!eventState.classList.contains('is-triggered')) {
      eventState.querySelector('span').textContent = detection.active ? 'ABOVE THRESHOLD' : 'READY FOR INPUT';
    }
    if (detection.triggered) handleTrigger(timestamp);
    drawSignal();
    window.requestAnimationFrame(animate);
  };

  startButton.addEventListener('click', startTrial);
  contractButton.addEventListener('pointerdown', () => setContraction(true));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
    contractButton.addEventListener(eventName, () => setContraction(false));
  });
  slider.addEventListener('input', () => {
    targetValue = Number(slider.value);
  });
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !event.repeat && document.activeElement?.tagName !== 'BUTTON') {
      event.preventDefault();
      setContraction(true);
    }
  });
  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') setContraction(false);
  });
  clearButton?.addEventListener('click', () => {
    trials.splice(0, trials.length);
    trialList.replaceChildren();
    latestReaction.textContent = '—';
    renderSummary();
  });
  exportButton?.addEventListener('click', () => {
    const rows = ['trial,status,reaction_ms,peak_emg'];
    trials.forEach((trial, index) => rows.push([
      index + 1,
      trial.status,
      Number.isFinite(trial.reactionMs) ? trial.reactionMs : '',
      Math.round(trial.peakEmg || 0)
    ].join(',')));
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' }));
    link.download = 'musclekey-simulated-trials.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  updateTargets('ready');
  renderSummary();
  window.requestAnimationFrame(animate);
}());
