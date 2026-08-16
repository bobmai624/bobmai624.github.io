import { cyclingFrame } from './hero-model.js';

const COLORS = {
  paper: '#f2efe7',
  ink: '#171917',
  muted: '#74786f',
  blue: '#2f83a6',
  coral: '#dc684c',
  green: '#2c8a63',
  pale: '#d9d6cb',
};

function line(ctx, points, colour, width, dash = []) {
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash(dash);
  ctx.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();
}

function circle(ctx, x, y, radius, stroke, width = 2, fill = null) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

function label(ctx, text, x, y, colour = COLORS.ink, size = 12, align = 'left') {
  ctx.save();
  ctx.fillStyle = colour;
  ctx.font = `700 ${size}px Arial, sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function toPixels(point, width, height) {
  const scale = Math.min(width, height);
  return {
    x: (width - scale) / 2 + point.x * scale,
    y: (height - scale) / 2 + point.y * scale,
  };
}

function toPixelLength(value, width, height) {
  return value * Math.min(width, height);
}

function drawSignalPacket(ctx, points, progress, colour) {
  const segments = [];
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const length = Math.hypot(dx, dy);
    segments.push({ from: points[i - 1], to: points[i], length });
    total += length;
  }
  let target = progress * total;
  for (const segment of segments) {
    if (target <= segment.length) {
      const t = segment.length ? target / segment.length : 0;
      const x = segment.from.x + (segment.to.x - segment.from.x) * t;
      const y = segment.from.y + (segment.to.y - segment.from.y) * t;
      circle(ctx, x, y, 5, colour, 2, COLORS.paper);
      return;
    }
    target -= segment.length;
  }
}

function drawCueRoute(ctx, from, to, colour) {
  const control = {
    x: from.x + (to.x - from.x) * 0.56,
    y: Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.18,
  };
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([6, 8]);
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(control.x, control.y, to.x, to.y - 14);
  ctx.strokeStyle = colour;
  ctx.globalAlpha = 0.62;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawCrankDirection(ctx, centre, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(centre.x, centre.y, radius + 16, Math.PI * 1.05, Math.PI * 1.72);
  ctx.strokeStyle = COLORS.muted;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const tipAngle = Math.PI * 1.72;
  const tip = {
    x: centre.x + Math.cos(tipAngle) * (radius + 16),
    y: centre.y + Math.sin(tipAngle) * (radius + 16),
  };
  ctx.translate(tip.x, tip.y);
  ctx.rotate(tipAngle + Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-6, -4);
  ctx.lineTo(-6, 4);
  ctx.closePath();
  ctx.fillStyle = COLORS.muted;
  ctx.fill();
  ctx.restore();
}

function drawScene(ctx, width, height, frame, time) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, width, height);
  const crankPx = toPixels(frame.crank, width, height);
  const crankRadius = toPixelLength(frame.crank.radius, width, height);
  const hipL = toPixels(frame.leftHip, width, height);
  const hipR = toPixels(frame.rightHip, width, height);
  const kneeL = toPixels(frame.leftKnee, width, height);
  const kneeR = toPixels(frame.rightKnee, width, height);
  const ankleL = toPixels(frame.leftAnkle, width, height);
  const ankleR = toPixels(frame.rightAnkle, width, height);
  const footL = frame.leftFoot.map((point) => toPixels(point, width, height));
  const footR = frame.rightFoot.map((point) => toPixels(point, width, height));

  const seatLeft = toPixels({ x: 0.535, y: 0.225 }, width, height);
  const seatRight = toPixels({ x: 0.675, y: 0.225 }, width, height);
  line(ctx, [seatLeft, seatRight], COLORS.ink, 12);
  line(ctx, [
    toPixels({ x: 0.595, y: 0.23 }, width, height),
    toPixels({ x: 0.57, y: 0.325 }, width, height),
  ], COLORS.pale, 5);

  circle(ctx, crankPx.x, crankPx.y, crankRadius, COLORS.pale, 2);
  drawCrankDirection(ctx, crankPx, crankRadius);
  line(ctx, [crankPx, ankleR], COLORS.muted, 4);
  line(ctx, [crankPx, ankleL], COLORS.ink, 5);

  line(ctx, [hipR, kneeR, ankleR], COLORS.muted, 8);
  line(ctx, [hipL, kneeL, ankleL], COLORS.ink, 12);

  for (const joint of [hipR, kneeR, ankleR]) circle(ctx, joint.x, joint.y, 7, COLORS.muted, 2, COLORS.paper);
  for (const joint of [hipL, kneeL, ankleL]) circle(ctx, joint.x, joint.y, 9, COLORS.ink, 2.5, COLORS.paper);
  circle(ctx, crankPx.x, crankPx.y, 9, COLORS.ink, 2.5, COLORS.paper);

  line(ctx, footR, COLORS.coral, 9);
  line(ctx, footL, COLORS.blue, 10);
  label(ctx, 'FSR-R', (footR[0].x + footR[1].x) / 2, footR[0].y - 15, COLORS.coral, 10, 'center');
  label(ctx, 'FSR-L', (footL[0].x + footL[1].x) / 2, footL[0].y + 23, COLORS.blue, 10, 'center');

  const nodeCentre = toPixels({ x: 0.19, y: 0.31 }, width, height);
  const nodeRadius = toPixelLength(0.078, width, height);
  circle(ctx, nodeCentre.x, nodeCentre.y, nodeRadius, COLORS.ink, 2, COLORS.ink);
  label(ctx, 'MACHINE', nodeCentre.x, nodeCentre.y - 9, COLORS.paper, 10, 'center');
  label(ctx, frame.state, nodeCentre.x, nodeCentre.y + 13,
    frame.state === 'BALANCED' ? '#78d9ab' : '#ff967b', 10, 'center');

  const inputRoute = [
    toPixels({ x: 0.39, y: 0.70 }, width, height),
    toPixels({ x: 0.315, y: 0.61 }, width, height),
    toPixels({ x: 0.315, y: 0.39 }, width, height),
    { x: nodeCentre.x + nodeRadius * 0.68, y: nodeCentre.y + nodeRadius * 0.68 },
  ];
  line(ctx, inputRoute, COLORS.blue, 1.7, [5, 7]);
  drawSignalPacket(ctx, inputRoute, (time / 2600) % 1, COLORS.blue);

  const cueTarget = frame.cueSide === 'left' ? ankleL : ankleR;
  if (frame.cueSide !== 'none') {
    drawCueRoute(ctx, { x: nodeCentre.x + nodeRadius, y: nodeCentre.y }, cueTarget, COLORS.coral);
    const pulse = 9 + Math.sin(time / 110) * 3;
    circle(ctx, cueTarget.x, cueTarget.y, pulse, COLORS.coral, 3);
    circle(ctx, cueTarget.x, cueTarget.y, pulse + 9, COLORS.coral, 1.5);
  }

  const cycleLabel = toPixels({ x: 0.50, y: 0.84 }, width, height);
  label(ctx, 'COMPLETE REVOLUTION', cycleLabel.x, cycleLabel.y, COLORS.muted, 10, 'center');
}

export function mountHeroCanvas(canvas, dashboard, options = {}) {
  const context = canvas.getContext('2d');
  const reducedMotion = options.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = reducedMotion;
  let rafId = 0;
  let start = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function render(time) {
    const elapsed = time - start;
    const phase = (elapsed / 2600) % 1;
    const contributionBias = Math.sin(elapsed / 3600) * 0.16;
    const frame = cyclingFrame(phase, { contributionBias });
    const rect = canvas.getBoundingClientRect();
    drawScene(context, rect.width, rect.height, frame, elapsed);
    if (dashboard) {
      dashboard.querySelector('[data-left-value]').textContent = `${Math.round(frame.leftContribution * 100)}%`;
      dashboard.querySelector('[data-right-value]').textContent = `${Math.round(frame.rightContribution * 100)}%`;
      dashboard.querySelector('[data-cue-value]').textContent = frame.cueSide === 'none' ? 'SILENT' : frame.cueSide.toUpperCase();
      dashboard.querySelector('[data-state-value]').textContent = frame.state;
    }
    if (!paused) rafId = requestAnimationFrame(render);
  }

  function pause() {
    paused = true;
    cancelAnimationFrame(rafId);
  }

  function resume() {
    if (!paused) return;
    paused = false;
    start = performance.now();
    rafId = requestAnimationFrame(render);
  }

  function destroy() {
    pause();
    window.removeEventListener('resize', resize);
  }

  resize();
  window.addEventListener('resize', resize);
  render(performance.now());
  return { pause, resume, destroy, get paused() { return paused; } };
}
