import { createPrototypeMachine } from './prototype-machine.js';

const SCENES = [
  {
    key: 'WELCOME', tag: '00 · ORIENTATION',
    title: ['这不是一个平衡分数。', 'This is not a balance score.', 'これはバランス点数ではない。'],
    body: ['这是“人 → 机器 → 人”的可操作演示：脚下相对压力进入机器，机器只在持续偏差时把提示送回对应脚踝。', 'This walkthrough makes the human → machine → human loop operable: relative pressure enters the machine; only sustained deviation returns a cue to the corresponding ankle.', '人→機械→人のループを操作するデモ。足下の相対圧力を入力し、持続する偏りだけを対応する足首へ返す。'],
    metric: ['输出：无', 'OUTPUT: NONE', '出力：なし']
  },
  {
    key: 'SAFETY', tag: '01 · SAFETY',
    title: ['先定义系统绝不会做什么。', 'Define what the system must never do.', 'システムが決して行わないことを先に定義する。'],
    body: ['固定室内脚踏器；无DIY EMS/TENS/FES；振动只是提示，不强迫动作；任意时刻停止输出；疼痛、麻木或不适立即停止。', 'Stationary trainer only; no DIY EMS/TENS/FES; vibration cues but never forces movement; output can be stopped at any time; stop immediately for pain, numbness or discomfort.', '固定式室内トレーナーのみ。自作EMS/TENS/FESは使わない。振動は手掛かりであり動作を強制しない。痛み・しびれ・不快感があれば直ちに停止。'],
    metric: ['安全确认：待完成', 'SAFETY ACK: PENDING', '安全確認：未完了']
  },
  {
    key: 'DISCOVERY', tag: '02 · DEVICE DISCOVERY',
    title: ['三个节点先报告自己。', 'Three nodes report before sensing.', '3つのノードが測定前に自己報告する。'],
    body: ['左踏板、右踏板和主控节点通过ESP-NOW握手；界面显示电量、封包年龄和连接状态。任何一侧超时，触觉输出保持关闭。', 'Left pedal, right pedal and hub handshake over ESP-NOW; the interface exposes battery, packet age and link state. A timeout on either side keeps haptics off.', '左右ペダルとハブがESP-NOWで接続し、電池・パケット経過時間・通信状態を表示。どちらかがタイムアウトすれば触覚出力を無効にする。'],
    metric: ['L 24ms · HUB 18ms · R 31ms', 'L 24ms · HUB 18ms · R 31ms', 'L 24ms · HUB 18ms · R 31ms']
  },
  {
    key: 'CALIBRATION', tag: '03 · CALIBRATION',
    title: ['校准的是原型，不是人的身体。', 'Calibrate the prototype—not the person.', '校正するのは人ではなくプロトタイプ。'],
    body: ['依次记录无负载、同一砝码和踩踏接触。FSR只作为左右相对压力贡献的原型指标；不把它称为功率、扭矩、肌力或诊断。', 'Record no-load, a shared reference weight and pedalling contact. FSR is only a prototype proxy for relative left/right pressure contribution—not power, torque, muscle strength or diagnosis.', '無荷重、共通の基準重量、ペダル接触を順に記録。FSRは左右の相対圧力寄与の試作指標であり、出力・トルク・筋力・診断ではない。'],
    metric: ['零点漂移 1.8% · 通过', 'ZERO DRIFT 1.8% · PASS', 'ゼロ点ドリフト 1.8%・合格']
  },
  {
    key: 'BASELINE', tag: '04 · PERSONAL BASELINE',
    title: ['先学习这个人，再设置容差。', 'Learn this rider before setting tolerance.', '許容範囲の前にこの利用者を学習する。'],
    body: ['记录60秒自然踩踏，按完整曲柄一圈累计左右信号。以个人分布为起点，不把50:50强行定义成“正确”。', 'Record 60 seconds of natural pedalling and accumulate both signals per complete crank revolution. Start from the rider’s own distribution; do not impose 50:50 as “correct”.', '60秒の自然なペダリングを記録し、クランク1回転ごとに左右信号を累積。50:50を正解とせず、個人分布を起点にする。'],
    metric: ['个人中心 48.6 / 51.4 · 容差 ±4.0', 'PERSONAL CENTRE 48.6 / 51.4 · TOL ±4.0', '個人中心 48.6 / 51.4・許容 ±4.0']
  },
  {
    key: 'REVOLUTION', tag: '05 · COMPLETE REVOLUTION',
    title: ['机器必须等完整一圈。', 'The machine waits for one complete turn.', '機械は1回転が完了するまで待つ。'],
    body: ['Hall传感器给出曲柄边界。机器对一圈内左右FSR积分、做质量检查，再判断是否超过个人容差；瞬时92:08不会被误报。', 'A Hall sensor marks the crank boundary. The machine integrates both FSRs over a revolution, checks signal quality, then compares with personal tolerance; an instantaneous 92:08 is not misreported.', 'Hallセンサが回転境界を示す。1回転内の左右FSRを積分し品質確認後に個人許容範囲と比較。瞬間的な92:08を誤報しない。'],
    metric: ['REV 0142 · 46.1 / 53.9 · VALID', 'REV 0142 · 46.1 / 53.9 · VALID', 'REV 0142 · 46.1 / 53.9・有効']
  },
  {
    key: 'TRAINING', tag: '06 · BODY CUE',
    title: ['持续左侧偏低，左脚踝收到提示。', 'Sustained lower left contribution cues the left ankle.', '左の低下が持続すると左足首へ提示。'],
    body: ['偏差需连续超过阈值；振动短促、有限并带冷却时间。回到容差内就沉默，让使用者主动调整，而不是由装置替人动作。', 'Deviation must persist across the threshold; vibration is brief, bounded and followed by a cooldown. Silence returns inside tolerance so the rider—not the device—makes the correction.', '偏りが閾値を持続して超えた場合のみ短く限定的に振動し、クールダウンを置く。許容範囲に戻れば沈黙し、装置ではなく利用者が修正する。'],
    metric: ['L 43.8 / R 56.2 · LEFT CUE 180ms', 'L 43.8 / R 56.2 · LEFT CUE 180ms', 'L 43.8 / R 56.2・左提示 180ms']
  },
  {
    key: 'NO_FEEDBACK', tag: '07 · LEARNING PROBE',
    title: ['关掉提示，才看得见学习。', 'Turn feedback off to reveal learning.', 'フィードバックを切って初めて学習が見える。'],
    body: ['提示结束后继续记录无反馈踩踏。比较偏差、回归个人容差所需圈数和有效圈比例，区分即时表现与短期保留。', 'Continue recording with cues disabled. Compare deviation, revolutions to return inside tolerance and valid-revolution rate to distinguish immediate performance from short-term retention.', '提示停止後も無提示で記録。偏差、許容範囲へ戻る回転数、有効回転率を比較し、即時成績と短期保持を区別する。'],
    metric: ['HAPTICS OFF · 12 / 15 VALID REVS', 'HAPTICS OFF · 12 / 15 VALID REVS', '触覚OFF・有効12 / 15回転']
  },
  {
    key: 'REPLAY', tag: '08 · TRACE REPLAY',
    title: ['机器保存轨迹，再把轨迹送回人。', 'The machine stores a trace, then returns it to the person.', '機械が軌跡を保存し、再び人へ返す。'],
    body: ['回放过去自己表现最好的一段；单人原型中的“匹配他人”必须标为模拟轨迹，不能伪装成真实参与者数据。', 'Replay the rider’s best past segment. In a one-person prototype, a “matched other” trace must be labelled simulated—not disguised as participant data.', '過去の自己ベストを再生。1人試作での「適合した他者」は模擬軌跡と明示し、参加者データに見せかけない。'],
    metric: ['来源 PAST_SELF · SESSION 02 · REVS 88–103', 'PROVENANCE PAST_SELF · SESSION 02 · REVS 88–103', '出所 PAST_SELF・SESSION 02・REVS 88–103']
  },
  {
    key: 'FAULT', tag: '09 · FAIL SAFE',
    title: ['右节点超时：先关提示，再解释。', 'Right node timeout: stop cues, then explain.', '右ノードのタイムアウト：提示を止めてから説明。'],
    body: ['NODE_TIMEOUT_R超过500ms。系统清空触觉队列、保持记录、标记受影响圈为无效，并要求确认后才能恢复。', 'NODE_TIMEOUT_R exceeds 500 ms. The system clears the haptic queue, keeps the log, marks the affected revolution invalid and requires acknowledgement before recovery.', 'NODE_TIMEOUT_Rが500msを超過。触覚キューを消去し、ログは保持、該当回転を無効化し、確認後にのみ復帰する。'],
    metric: ['NODE_TIMEOUT_R · 642ms · HAPTICS OFF', 'NODE_TIMEOUT_R · 642ms · HAPTICS OFF', 'NODE_TIMEOUT_R・642ms・触覚OFF']
  },
  {
    key: 'EXPORT', tag: '10 · EVIDENCE EXPORT',
    title: ['导出的是可审计证据，不是漂亮结论。', 'Export auditable evidence—not a flattering result.', '見栄えの良い結論ではなく監査可能な証拠を出力。'],
    body: ['导出逐圈原始值、校准版本、阈值、提示剂量、无效原因和轨迹来源。研究页面只把这些数据显示为计划或模拟，直到真实采集完成。', 'Export per-revolution values, calibration version, thresholds, cue dose, invalid reasons and trace provenance. The study page labels data as planned or simulated until real collection occurs.', '回転ごとの値、校正版、閾値、提示量、無効理由、軌跡出所を出力。実測まで研究ページのデータは計画または模擬と表示する。'],
    metric: ['pedalbalance_demo_SYNTHETIC_2026-08-16.csv', 'pedalbalance_demo_SYNTHETIC_2026-08-16.csv', 'pedalbalance_demo_SYNTHETIC_2026-08-16.csv']
  }
];

const LANG_INDEX = { zh: 0, en: 1, ja: 2 };

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
        <div><b>PEDALBALANCE ECHO</b><span data-prototype-counter>01 / 11</span></div>
        <button type="button" data-prototype-close aria-label="Close interactive prototype">CLOSE ×</button>
      </header>
      <div class="prototype-body">
        <ol class="prototype-progress" aria-label="Prototype steps"></ol>
        <div class="prototype-stage">
          <div class="prototype-copy">
            <p class="kicker" data-prototype-tag></p>
            <h2 id="prototype-title" data-prototype-title></h2>
            <p data-prototype-body></p>
            <div class="prototype-metric" data-prototype-metric></div>
          </div>
          <div class="prototype-visual" aria-label="Illustrative simulated system state">
            <span class="simulation-stamp">ILLUSTRATIVE SIMULATION</span>
            <div class="prototype-human">
              <span class="human-head"></span><span class="human-body"></span>
              <span class="human-leg human-leg-left"></span><span class="human-leg human-leg-right"></span>
              <i class="ankle ankle-left">L</i><i class="ankle ankle-right">R</i>
            </div>
            <div class="prototype-machine-box"><b>MACHINE</b><span data-machine-state>WELCOME</span></div>
            <div class="signal-line signal-in">PRESSURE →</div>
            <div class="signal-line signal-out">← BODY CUE</div>
            <div class="prototype-bars"><i data-bar-left></i><i data-bar-right></i></div>
          </div>
        </div>
      </div>
      <footer class="prototype-footer">
        <button type="button" class="stop-control" data-prototype-stop>STOP OUTPUT</button>
        <div><button type="button" data-prototype-back>← BACK</button><button type="button" data-prototype-next>NEXT →</button></div>
      </footer>
    </section>`;
  document.body.append(overlay);
  return overlay;
}

function driveMachine(machine, sceneIndex) {
  const key = SCENES[sceneIndex].key;
  machine.dispatch('RESET');
  if (key === 'WELCOME') return machine.snapshot();
  machine.dispatch('ACK_SAFETY');
  if (key === 'SAFETY') return machine.snapshot();
  machine.dispatch('DISCOVER');
  if (key === 'DISCOVERY') return machine.snapshot();
  machine.dispatch('DEVICE_READY');
  if (key === 'CALIBRATION') return machine.snapshot();
  machine.dispatch('CALIBRATION_COMPLETE');
  if (key === 'BASELINE') return machine.snapshot();
  machine.dispatch('BASELINE_COMPLETE');
  if (key === 'REVOLUTION') return machine.snapshot();
  if (key === 'TRAINING') {
    machine.dispatch('START_TRAINING');
    machine.dispatch({ type: 'SET_CUE', side: 'left' });
  } else if (key === 'NO_FEEDBACK') {
    machine.dispatch('START_TRAINING');
    machine.dispatch('END_TRAINING');
  } else if (key === 'REPLAY') {
    machine.dispatch({ type: 'START_REPLAY', provenance: 'past_self' });
  } else if (key === 'FAULT') {
    machine.dispatch('START_TRAINING');
    machine.dispatch({ type: 'FAULT', code: 'NODE_TIMEOUT_R' });
  } else if (key === 'EXPORT') {
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
  SCENES.forEach((scene, index) => {
    const item = document.createElement('li');
    item.innerHTML = `<button type="button" data-scene-index="${index}"><b>${String(index + 1).padStart(2, '0')}</b><span>${scene.key.replace('_', ' ')}</span></button>`;
    progress.append(item);
  });

  let sceneIndex = 0;
  let returnFocus = null;
  const render = () => {
    const language = currentLanguage();
    const langIndex = LANG_INDEX[language];
    const scene = SCENES[sceneIndex];
    const snapshot = driveMachine(machine, sceneIndex);
    overlay.querySelector('[data-prototype-counter]').textContent = `${String(sceneIndex + 1).padStart(2, '0')} / ${SCENES.length}`;
    overlay.querySelector('[data-prototype-tag]').textContent = scene.tag;
    overlay.querySelector('[data-prototype-title]').textContent = scene.title[langIndex];
    overlay.querySelector('[data-prototype-body]').textContent = scene.body[langIndex];
    overlay.querySelector('[data-prototype-metric]').textContent = scene.metric[langIndex];
    overlay.querySelector('[data-machine-state]').textContent = snapshot.state;
    overlay.querySelector('[data-prototype-back]').disabled = sceneIndex === 0;
    overlay.querySelector('[data-prototype-next]').textContent = sceneIndex === SCENES.length - 1 ? ['重新开始 ↺', 'RESTART ↺', '最初へ ↺'][langIndex] : ['下一步 →', 'NEXT →', '次へ →'][langIndex];
    overlay.querySelectorAll('[data-scene-index]').forEach((button, index) => {
      const active = index === sceneIndex;
      button.setAttribute('aria-current', active ? 'step' : 'false');
    });
    const cue = snapshot.cueSide;
    overlay.classList.toggle('is-cue-left', cue === 'left');
    overlay.classList.toggle('is-cue-right', cue === 'right');
    overlay.classList.toggle('is-fault', snapshot.state === 'FAULT');
    const values = scene.key === 'TRAINING' ? [44, 56] : scene.key === 'REVOLUTION' ? [46, 54] : [49, 51];
    overlay.querySelector('[data-bar-left]').style.height = `${values[0]}%`;
    overlay.querySelector('[data-bar-right]').style.height = `${values[1]}%`;
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
    sceneIndex = 0;
    render();
    overlay.hidden = false;
    document.body.classList.add('prototype-open');
    document.dispatchEvent(new CustomEvent('pedalbalance:prototype-open'));
    overlay.querySelector('[data-prototype-next]').focus();
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', () => open(trigger)));
  overlay.querySelector('[data-prototype-close]').addEventListener('click', close);
  overlay.querySelector('[data-prototype-stop]').addEventListener('click', () => {
    machine.dispatch('STOP_OUTPUT');
    overlay.classList.remove('is-cue-left', 'is-cue-right');
    overlay.querySelector('[data-machine-state]').textContent = 'STOPPED · OUTPUT OFF';
  });
  overlay.querySelector('[data-prototype-next]').addEventListener('click', () => {
    sceneIndex = sceneIndex === SCENES.length - 1 ? 0 : sceneIndex + 1;
    render();
  });
  overlay.querySelector('[data-prototype-back]').addEventListener('click', () => {
    sceneIndex = Math.max(0, sceneIndex - 1);
    render();
  });
  progress.addEventListener('click', (event) => {
    const button = event.target.closest('[data-scene-index]');
    if (!button) return;
    sceneIndex = Number(button.dataset.sceneIndex);
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
