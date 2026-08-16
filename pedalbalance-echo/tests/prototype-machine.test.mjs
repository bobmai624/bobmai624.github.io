import test from 'node:test';
import assert from 'node:assert/strict';
import { createPrototypeMachine } from '../assets/js/prototype-machine.js';

function calibratedMachine() {
  const machine = createPrototypeMachine();
  for (const event of ['ACK_SAFETY', 'DISCOVER', 'DEVICE_READY', 'CALIBRATION_COMPLETE', 'BASELINE_COMPLETE']) {
    machine.dispatch(event);
  }
  return machine;
}

test('training cannot start before safety and calibration', () => {
  const machine = createPrototypeMachine();
  assert.throws(() => machine.dispatch('START_TRAINING'), /calibration/i);
  assert.equal(machine.snapshot().state, 'WELCOME');
});

test('valid setup sequence reaches ready and begins training', () => {
  const machine = calibratedMachine();
  assert.equal(machine.snapshot().state, 'READY');
  machine.dispatch('START_TRAINING');
  assert.equal(machine.snapshot().state, 'TRAINING');
});

test('stop clears simulated bodily output from every active state', () => {
  const machine = calibratedMachine();
  machine.dispatch('START_TRAINING');
  machine.dispatch({ type: 'SET_CUE', side: 'left' });
  assert.equal(machine.snapshot().cueSide, 'left');
  machine.dispatch('STOP_OUTPUT');
  assert.equal(machine.snapshot().state, 'STOPPED');
  assert.equal(machine.snapshot().cueSide, 'none');
});

test('fault clears output and must be acknowledged before readiness returns', () => {
  const machine = calibratedMachine();
  machine.dispatch('START_TRAINING');
  machine.dispatch({ type: 'SET_CUE', side: 'right' });
  machine.dispatch({ type: 'FAULT', code: 'NODE_TIMEOUT_R' });
  assert.equal(machine.snapshot().state, 'FAULT');
  assert.equal(machine.snapshot().cueSide, 'none');
  assert.equal(machine.snapshot().faultCode, 'NODE_TIMEOUT_R');
  machine.dispatch('ACK_FAULT');
  assert.equal(machine.snapshot().state, 'READY');
});

test('past-self replay preserves provenance in the snapshot', () => {
  const machine = calibratedMachine();
  machine.dispatch({ type: 'START_REPLAY', provenance: 'past_self' });
  assert.equal(machine.snapshot().state, 'REPLAY');
  assert.equal(machine.snapshot().traceProvenance, 'past_self');
});
