import test from 'node:test';
import assert from 'node:assert/strict';
import { cyclingFrame } from '../assets/js/hero-model.js';

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

test('cycling frame values stay physically bounded through one revolution', () => {
  for (let degree = 0; degree <= 360; degree += 5) {
    const frame = cyclingFrame(degree / 360);
    for (const key of ['leftPressure', 'rightPressure', 'leftMuscle', 'rightMuscle']) {
      assert.ok(frame[key] >= 0 && frame[key] <= 1, `${key} escaped its 0–1 range`);
    }
    for (const point of ['leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle']) {
      assert.ok(Number.isFinite(frame[point].x));
      assert.ok(Number.isFinite(frame[point].y));
    }
  }
});

test('opposite crank phases produce alternating pressure and muscle activity', () => {
  const a = cyclingFrame(0);
  const b = cyclingFrame(0.5);
  assert.ok(a.leftPressure > a.rightPressure);
  assert.ok(b.rightPressure > b.leftPressure);
  assert.ok(a.leftMuscle > a.rightMuscle);
  assert.ok(b.rightMuscle > b.leftMuscle);
});

test('cue side follows sustained complete-revolution contribution bias', () => {
  const leftLow = cyclingFrame(0.32, { contributionBias: -0.18 });
  const balanced = cyclingFrame(0.32, { contributionBias: 0 });
  const rightLow = cyclingFrame(0.32, { contributionBias: 0.18 });
  assert.equal(leftLow.cueSide, 'left');
  assert.equal(leftLow.state, 'LEFT LOW');
  assert.equal(balanced.cueSide, 'none');
  assert.equal(balanced.state, 'BALANCED');
  assert.equal(rightLow.cueSide, 'right');
  assert.equal(rightLow.state, 'RIGHT LOW');
});

test('phase normalisation keeps equivalent crank positions identical', () => {
  assert.deepEqual(cyclingFrame(0.25), cyclingFrame(1.25));
  assert.deepEqual(cyclingFrame(-0.25), cyclingFrame(0.75));
});

test('leg segment lengths remain rigid through a complete crank revolution', () => {
  for (let degree = 0; degree < 360; degree += 5) {
    const frame = cyclingFrame(degree / 360);
    assert.ok(Math.abs(distance(frame.leftHip, frame.leftKnee) - frame.linkLengths.thigh) < 1e-6);
    assert.ok(Math.abs(distance(frame.leftKnee, frame.leftAnkle) - frame.linkLengths.shank) < 1e-6);
    assert.ok(Math.abs(distance(frame.rightHip, frame.rightKnee) - frame.linkLengths.thigh) < 1e-6);
    assert.ok(Math.abs(distance(frame.rightKnee, frame.rightAnkle) - frame.linkLengths.shank) < 1e-6);
  }
});

test('pedal targets stay opposite and both knees keep bending forward', () => {
  for (let degree = 0; degree < 360; degree += 5) {
    const frame = cyclingFrame(degree / 360);
    const leftAngle = Math.atan2(frame.leftAnkle.y - frame.crank.y, frame.leftAnkle.x - frame.crank.x);
    const rightAngle = Math.atan2(frame.rightAnkle.y - frame.crank.y, frame.rightAnkle.x - frame.crank.x);
    const separation = Math.abs(Math.atan2(
      Math.sin(leftAngle - rightAngle),
      Math.cos(leftAngle - rightAngle),
    ));
    assert.ok(Math.abs(separation - Math.PI) < 1e-6);
    assert.ok(frame.leftKnee.x > Math.max(frame.leftHip.x, frame.leftAnkle.x));
    assert.ok(frame.rightKnee.x > Math.max(frame.rightHip.x, frame.rightAnkle.x));
  }
});

test('feet stay horizontal, centred on and attached to their pedal targets', () => {
  for (let degree = 0; degree < 360; degree += 5) {
    const frame = cyclingFrame(degree / 360);
    for (const side of ['left', 'right']) {
      const foot = frame[`${side}Foot`];
      const ankle = frame[`${side}Ankle`];
      assert.equal(foot.length, 2);
      assert.ok(Math.abs(foot[0].y - foot[1].y) < 1e-9);
      assert.ok(Math.abs(distance(foot[0], foot[1]) - 0.075) < 1e-9);
      assert.ok(Math.abs((foot[0].x + foot[1].x) / 2 - ankle.x) < 1e-9);
      assert.ok(Math.abs((foot[0].y + foot[1].y) / 2 - ankle.y) < 1e-9);
    }
  }
});
