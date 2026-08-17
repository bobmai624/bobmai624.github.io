import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROTOTYPE_STEPS,
  getPrototypeStep,
  prototypeLabels
} from '../assets/js/prototype-flow.js';

test('the walkthrough follows seven participant-facing experiment stages', () => {
  assert.deepEqual(PROTOTYPE_STEPS.map(({ key }) => key), [
    'QUESTION',
    'SETUP',
    'BASELINE',
    'TRAINING',
    'NO_CUE',
    'REPLAY',
    'RESULTS'
  ]);
});

test('each stage explains action, system behaviour and experimental check in all languages', () => {
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
        'inputLabel',
        'decisionLabel',
        'cueLabel',
        'outcomeLabel'
      ]) {
        assert.equal(typeof view[field], 'string', `${language} stage ${index + 1} ${field}`);
        assert.ok(view[field].trim().length > 0, `${language} stage ${index + 1} ${field} is empty`);
      }
    }
  }
});

test('training, no-cue and replay stages expose the experiment controls', () => {
  const training = getPrototypeStep(3, 'en');
  const noCue = getPrototypeStep(4, 'en');
  const replay = getPrototypeStep(5, 'en');

  assert.equal(training.cueSide, 'left');
  assert.equal(training.outputMode, 'cue');
  assert.equal(noCue.cueSide, 'none');
  assert.equal(noCue.outputMode, 'off');
  assert.equal(replay.traceProvenance, 'past_self');
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
  assert.equal(getPrototypeStep(-20, 'unknown').key, 'QUESTION');
  assert.equal(getPrototypeStep(999, 'en').key, 'RESULTS');
  assert.equal(prototypeLabels('unknown').next, prototypeLabels('zh').next);
});
