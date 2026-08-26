(function exposeMuscleKeyCore(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.MuscleKeyCore = api;
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function createMuscleKeyCore() {
  function requireSamples(name, samples) {
    if (!Array.isArray(samples) || samples.length === 0 || samples.some((value) => !Number.isFinite(value))) {
      throw new TypeError(`${name}必须包含至少一个有效数值`);
    }
  }

  function calibrateThreshold({ relaxed, contracted }) {
    requireSamples('放松样本', relaxed);
    requireSamples('收缩样本', contracted);

    const relaxedCeiling = Math.max(...relaxed);
    const contractedFloor = Math.min(...contracted);
    const separation = contractedFloor - relaxedCeiling;

    if (separation <= 0) {
      throw new Error('放松与收缩信号没有可靠分离；请重新贴电极并再次校准');
    }

    const triggerThreshold = Math.round((relaxedCeiling + contractedFloor) / 2);
    const releaseThreshold = Math.round((relaxedCeiling + triggerThreshold) / 2);

    return {
      relaxedCeiling,
      contractedFloor,
      triggerThreshold,
      releaseThreshold,
      separation
    };
  }

  class ActivationDetector {
    constructor({ triggerThreshold, releaseThreshold, debounceMs = 250 }) {
      if (!Number.isFinite(triggerThreshold) || !Number.isFinite(releaseThreshold)) {
        throw new TypeError('触发阈值与释放阈值必须是有效数值');
      }
      if (releaseThreshold >= triggerThreshold) {
        throw new RangeError('释放阈值必须低于触发阈值');
      }

      this.triggerThreshold = triggerThreshold;
      this.releaseThreshold = releaseThreshold;
      this.debounceMs = debounceMs;
      this.active = false;
      this.lastTriggerAt = Number.NEGATIVE_INFINITY;
    }

    update(value, timestamp) {
      let triggered = false;

      if (!this.active && value >= this.triggerThreshold) {
        this.active = true;
        if (timestamp - this.lastTriggerAt >= this.debounceMs) {
          this.lastTriggerAt = timestamp;
          triggered = true;
        }
      } else if (this.active && value <= this.releaseThreshold) {
        this.active = false;
      }

      return { active: this.active, triggered };
    }
  }

  function roundTo(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
  }

  function summarizeTrials(trials) {
    if (!Array.isArray(trials)) {
      throw new TypeError('试验记录必须是数组');
    }

    const reactionTimes = trials
      .filter((trial) => trial.status === 'valid' && Number.isFinite(trial.reactionMs))
      .map((trial) => trial.reactionMs)
      .sort((a, b) => a - b);
    const valid = reactionTimes.length;
    const falseStarts = trials.filter((trial) => trial.status === 'false-start').length;
    const misses = trials.filter((trial) => trial.status === 'miss').length;
    const total = trials.length;
    const mean = valid ? reactionTimes.reduce((sum, value) => sum + value, 0) / valid : null;
    const middle = Math.floor(valid / 2);
    const median = valid === 0
      ? null
      : valid % 2
        ? reactionTimes[middle]
        : (reactionTimes[middle - 1] + reactionTimes[middle]) / 2;
    const variance = valid
      ? reactionTimes.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / valid
      : null;

    return {
      total,
      valid,
      falseStarts,
      misses,
      medianMs: median === null ? null : roundTo(median, 2),
      meanMs: mean === null ? null : roundTo(mean, 2),
      standardDeviationMs: variance === null ? null : roundTo(Math.sqrt(variance), 2),
      successRate: total ? roundTo((valid / total) * 100, 2) : 0
    };
  }

  return {
    calibrateThreshold,
    ActivationDetector,
    summarizeTrials
  };
}));

