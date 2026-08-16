import test from 'node:test';
import assert from 'node:assert/strict';
import { C1_CONDITIONS, E2_CONDITIONS, simulateRun, summariseRevolutions } from '../assets/js/experiment-model.js';

test('simulated runs are deterministic and explicitly synthetic', () => {
  const a = simulateRun('AF', 42);
  const b = simulateRun('AF', 42);
  assert.deepEqual(a, b);
  assert.equal(a.meta.provenance, 'ILLUSTRATIVE SIMULATION');
  assert.equal(a.rows.length, 90);
});

test('one-person matched-other condition uses the neutral provenance label', () => {
  assert.equal(E2_CONDITIONS.MOH.provenance, 'simulated_matched_other');
  assert.equal(E2_CONDITIONS.PSH.provenance, 'past_self');
});

test('C1 conditions describe mechanisms without declaring a winner', () => {
  assert.deepEqual(Object.keys(C1_CONDITIONS), ['V', 'CH', 'FF', 'AF']);
  for (const condition of Object.values(C1_CONDITIONS)) {
    assert.equal(condition.winner, undefined);
    assert.ok(condition.channel && condition.trigger && condition.fade);
  }
});

test('summary excludes invalid revolutions and reports feedback dose', () => {
  const summary = summariseRevolutions([
    { valid: true, left: 0.46, right: 0.54, cueSide: 'left' },
    { valid: false, left: 0.05, right: 0.95, cueSide: 'right' },
    { valid: true, left: 0.49, right: 0.51, cueSide: 'none' }
  ]);
  assert.equal(summary.validCycles, 2);
  assert.equal(summary.invalidCycles, 1);
  assert.equal(summary.feedbackCycles, 1);
  assert.equal(summary.meanAbsoluteError, 0.025);
});
