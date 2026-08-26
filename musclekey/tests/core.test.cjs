const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const modulePath = path.join(__dirname, '..', 'assets', 'js', 'core.js');
let core = {};

try {
  core = require(modulePath);
} catch {
  core = {};
}

test('calibrateThreshold places the trigger between relaxed noise and deliberate contraction', () => {
  assert.equal(typeof core.calibrateThreshold, 'function');

  assert.deepEqual(
    core.calibrateThreshold({
      relaxed: [110, 120, 130],
      contracted: [400, 450, 500]
    }),
    {
      relaxedCeiling: 130,
      contractedFloor: 400,
      triggerThreshold: 265,
      releaseThreshold: 198,
      separation: 270
    }
  );
});

test('calibrateThreshold rejects calibration samples that do not separate', () => {
  assert.equal(typeof core.calibrateThreshold, 'function');

  assert.throws(
    () => core.calibrateThreshold({ relaxed: [100, 230], contracted: [190, 260] }),
    /重新贴电极并再次校准/
  );
});

test('ActivationDetector emits once per contraction and rearms after release', () => {
  assert.equal(typeof core.ActivationDetector, 'function');

  const detector = new core.ActivationDetector({
    triggerThreshold: 300,
    releaseThreshold: 180,
    debounceMs: 250
  });

  assert.deepEqual(detector.update(150, 0), { active: false, triggered: false });
  assert.deepEqual(detector.update(340, 100), { active: true, triggered: true });
  assert.deepEqual(detector.update(420, 180), { active: true, triggered: false });
  assert.deepEqual(detector.update(160, 360), { active: false, triggered: false });
  assert.deepEqual(detector.update(350, 500), { active: true, triggered: true });
});

test('ActivationDetector blocks a second trigger inside the debounce window', () => {
  assert.equal(typeof core.ActivationDetector, 'function');

  const detector = new core.ActivationDetector({
    triggerThreshold: 300,
    releaseThreshold: 180,
    debounceMs: 250
  });

  assert.equal(detector.update(320, 100).triggered, true);
  detector.update(120, 150);
  assert.equal(detector.update(350, 220).triggered, false);
  detector.update(120, 360);
  assert.equal(detector.update(350, 400).triggered, true);
});

test('summarizeTrials reports reaction-time quality and failed trials', () => {
  assert.equal(typeof core.summarizeTrials, 'function');

  assert.deepEqual(
    core.summarizeTrials([
      { status: 'valid', reactionMs: 420 },
      { status: 'valid', reactionMs: 460 },
      { status: 'false-start' },
      { status: 'valid', reactionMs: 530 },
      { status: 'miss' }
    ]),
    {
      total: 5,
      valid: 3,
      falseStarts: 1,
      misses: 1,
      medianMs: 460,
      meanMs: 470,
      standardDeviationMs: 45.46,
      successRate: 60
    }
  );
});

