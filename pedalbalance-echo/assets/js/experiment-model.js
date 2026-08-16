export const C1_CONDITIONS = Object.freeze({
  V: { channel: 'visual', trigger: 'continuous display', fade: 'none' },
  CH: { channel: 'haptic', trigger: 'each out-of-band valid cycle', fade: 'none' },
  FF: { channel: 'haptic', trigger: 'out-of-band valid cycle', fade: 'fixed time schedule' },
  AF: { channel: 'haptic', trigger: 'three persistent out-of-band cycles', fade: 'performance-linked' },
});

export const E2_CONDITIONS = Object.freeze({
  PSH: { source: 'past self', channel: 'haptic', provenance: 'past_self' },
  MOH: { source: 'matched other', channel: 'haptic', provenance: 'simulated_matched_other' },
  PSV: { source: 'past self', channel: 'visual', provenance: 'past_self' },
  NF: { source: 'none', channel: 'none', provenance: 'none' },
});

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function cueFor(condition, error, persistent, index) {
  if (condition === 'V' || condition === 'PSV' || condition === 'NF') return 'none';
  if (condition === 'FF' && index > 58) return 'none';
  if (condition === 'AF' && persistent < 3) return 'none';
  if (Math.abs(error) <= 0.045) return 'none';
  return error < 0 ? 'left' : 'right';
}

export function simulateRun(condition, seed = 1) {
  if (!C1_CONDITIONS[condition] && !E2_CONDITIONS[condition]) {
    throw new Error(`Unknown condition: ${condition}`);
  }
  const random = mulberry32(seed);
  const rows = [];
  let persistent = 0;
  for (let index = 0; index < 90; index += 1) {
    const wave = Math.sin(index / 9) * 0.027 + Math.sin(index / 23) * 0.018;
    const drift = index < 30 ? -0.055 : index < 60 ? 0.025 : -0.012;
    const noise = (random() - 0.5) * 0.035;
    const error = clamp(wave + drift + noise, -0.16, 0.16);
    persistent = Math.abs(error) > 0.045 ? persistent + 1 : 0;
    const valid = random() > 0.035;
    const left = Number(clamp(0.5 + error, 0.25, 0.75).toFixed(4));
    const right = Number((1 - left).toFixed(4));
    rows.push({
      cycle: index + 1,
      timestampMs: index * 780,
      left,
      right,
      cadenceRpm: Number((76 + Math.sin(index / 10) * 4 + (random() - 0.5) * 3).toFixed(1)),
      valid,
      cueSide: valid ? cueFor(condition, error, persistent, index) : 'none',
      condition,
      provenance: 'ILLUSTRATIVE SIMULATION',
    });
  }
  return {
    meta: {
      condition,
      seed,
      provenance: 'ILLUSTRATIVE SIMULATION',
      sourceProvenance: E2_CONDITIONS[condition]?.provenance || 'current_system',
    },
    rows,
  };
}

export function summariseRevolutions(rows) {
  const valid = rows.filter((row) => row.valid);
  const totalError = valid.reduce((sum, row) => sum + Math.abs(row.left - 0.5), 0);
  return {
    validCycles: valid.length,
    invalidCycles: rows.length - valid.length,
    feedbackCycles: valid.filter((row) => row.cueSide !== 'none').length,
    meanAbsoluteError: valid.length ? Number((totalError / valid.length).toFixed(3)) : 0,
  };
}
