import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROTOTYPE_STEPS,
  getPrototypeStep,
  prototypeLabels
} from '../assets/js/prototype-flow.js';

const expectedKeys = [
  'LOOP',
  'MODULES',
  'CUE_SEQUENCE',
  'DESIGN_SPACE',
  'SYSTEM_FACTS',
  'TASK_CONDITIONS',
  'REPLAY',
  'TIMELINE',
  'EVIDENCE'
];

const expectedVisualKinds = [
  'loop',
  'modules',
  'sequence',
  'matrix',
  'metrics',
  'conditions',
  'replay',
  'timeline',
  'evidence'
];

test('the walkthrough synthesizes nine academic presentation methods into one story', () => {
  assert.deepEqual(PROTOTYPE_STEPS.map(({ key }) => key), [
    ...expectedKeys
  ]);
  assert.deepEqual(PROTOTYPE_STEPS.map(({ visualKind }) => visualKind), expectedVisualKinds);
  assert.equal(new Set(PROTOTYPE_STEPS.map(({ referenceName }) => referenceName)).size, 9);
  for (const step of PROTOTYPE_STEPS) assert.match(step.referenceUrl, /^https:\/\//);
});

test('each scene resolves complete nested presentation content in all languages', () => {
  for (const language of ['zh', 'en', 'ja']) {
    for (let index = 0; index < PROTOTYPE_STEPS.length; index += 1) {
      const view = getPrototypeStep(index, language);
      for (const field of [
        'nav',
        'tag',
        'title',
        'summary',
        'action',
        'system',
        'check',
        'visualTitle',
        'referenceMethod'
      ]) {
        assert.equal(typeof view[field], 'string', `${language} stage ${index + 1} ${field}`);
        assert.ok(view[field].trim().length > 0, `${language} stage ${index + 1} ${field} is empty`);
      }
      assert.ok(Array.isArray(view.visualItems), `${language} stage ${index + 1} visualItems`);
      assert.ok(view.visualItems.length >= 2, `${language} stage ${index + 1} needs visual items`);
      for (const item of view.visualItems) {
        assert.equal(typeof item.label, 'string');
        assert.equal(typeof item.detail, 'string');
        assert.ok(item.label.trim());
        assert.ok(item.detail.trim());
      }
    }
  }
});

test('cue, replay and evidence scenes preserve the experiment controls', () => {
  const cue = getPrototypeStep(2, 'en');
  const replay = getPrototypeStep(6, 'en');
  const evidence = getPrototypeStep(8, 'en');

  assert.equal(cue.cueSide, 'left');
  assert.equal(cue.outputMode, 'cue');
  assert.equal(replay.traceProvenance, 'past_self');
  assert.equal(evidence.cueSide, 'none');
  assert.equal(evidence.outputMode, 'off');
  assert.match(evidence.visualItems[0].label, /assisted performance/i);
  assert.match(evidence.visualItems[1].label, /unaided learning/i);
});

test('global prototype controls are localized', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const labels = prototypeLabels(language);
    for (const field of ['close', 'back', 'next', 'restart', 'stop', 'simulation', 'stepsLabel', 'languageLabel']) {
      assert.ok(labels[field], `${language} ${field}`);
    }
  }
});

test('Chinese and Japanese headings carry semantic line breaks for narrow screens', () => {
  for (let index = 0; index < PROTOTYPE_STEPS.length; index += 1) {
    assert.match(getPrototypeStep(index, 'zh').title, /\n/, `Chinese stage ${index + 1}`);
    assert.match(getPrototypeStep(index, 'ja').title, /\n/, `Japanese stage ${index + 1}`);
  }
});

test('unknown language and out-of-range indexes fall back safely', () => {
  assert.equal(getPrototypeStep(-20, 'unknown').key, 'LOOP');
  assert.equal(getPrototypeStep(999, 'en').key, 'EVIDENCE');
  assert.equal(prototypeLabels('unknown').next, prototypeLabels('zh').next);
});
