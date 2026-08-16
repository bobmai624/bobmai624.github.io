const TAU = Math.PI * 2;
const LINK_LENGTHS = Object.freeze({ thigh: 0.29, shank: 0.29 });

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function solveKnee(hip, ankle, thigh, shank) {
  const dx = ankle.x - hip.x;
  const dy = ankle.y - hip.y;
  const distance = Math.hypot(dx, dy);
  const along = (thigh ** 2 - shank ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(Math.max(0, thigh ** 2 - along ** 2));
  const base = {
    x: hip.x + dx * along / distance,
    y: hip.y + dy * along / distance,
  };
  const candidateA = {
    x: base.x - dy * height / distance,
    y: base.y + dx * height / distance,
  };
  const candidateB = {
    x: base.x + dy * height / distance,
    y: base.y - dx * height / distance,
  };
  return candidateA.x >= candidateB.x ? candidateA : candidateB;
}

function footSegment(ankle) {
  const halfLength = 0.075 / 2;
  return [
    { x: ankle.x - halfLength, y: ankle.y },
    { x: ankle.x + halfLength, y: ankle.y },
  ];
}

export function cyclingFrame(rawPhase, options = {}) {
  const phase = ((rawPhase % 1) + 1) % 1;
  const angle = phase * TAU;
  const opposite = angle + Math.PI;
  const contributionBias = Number(options.contributionBias || 0);
  const crank = { x: 0.5, y: 0.67, radius: 0.105, angle };
  const leftAnkle = {
    x: crank.x + Math.cos(angle) * crank.radius,
    y: crank.y + Math.sin(angle) * crank.radius,
  };
  const rightAnkle = {
    x: crank.x + Math.cos(opposite) * crank.radius,
    y: crank.y + Math.sin(opposite) * crank.radius,
  };
  const leftHip = { x: 0.61, y: 0.26 };
  const rightHip = { x: 0.602, y: 0.267 };
  const leftKnee = solveKnee(leftHip, leftAnkle, LINK_LENGTHS.thigh, LINK_LENGTHS.shank);
  const rightKnee = solveKnee(rightHip, rightAnkle, LINK_LENGTHS.thigh, LINK_LENGTHS.shank);
  const leftPressure = clamp01(0.5 + Math.cos(angle) * 0.42);
  const rightPressure = clamp01(0.5 + Math.cos(opposite) * 0.42);
  const leftMuscle = clamp01(0.16 + Math.cos(angle) * 0.38 + 0.38);
  const rightMuscle = clamp01(0.16 + Math.cos(opposite) * 0.38 + 0.38);

  let cueSide = 'none';
  let state = 'BALANCED';
  if (contributionBias < -0.08) {
    cueSide = 'left';
    state = 'LEFT LOW';
  } else if (contributionBias > 0.08) {
    cueSide = 'right';
    state = 'RIGHT LOW';
  }

  return {
    phase,
    crank,
    linkLengths: LINK_LENGTHS,
    leftHip,
    rightHip,
    leftKnee,
    rightKnee,
    leftAnkle,
    rightAnkle,
    leftFoot: footSegment(leftAnkle),
    rightFoot: footSegment(rightAnkle),
    leftPressure,
    rightPressure,
    leftMuscle,
    rightMuscle,
    leftContribution: clamp01(0.5 + contributionBias / 2),
    rightContribution: clamp01(0.5 - contributionBias / 2),
    cueSide,
    state,
  };
}
