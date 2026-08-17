import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROTOTYPE_STEPS, getPrototypeStep, prototypeLabels } from '../assets/js/prototype-flow.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'prototype-making.html', 'experiment-capabilities.html'];

async function text(path) {
  return readFile(resolve(root, path), 'utf8');
}

test('all page-local assets resolve and ids stay unique', async () => {
  for (const page of pages) {
    const html = await text(page);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page} has duplicate ids`);
    const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((ref) => !ref.startsWith('#') && !ref.startsWith('https://') && !ref.startsWith('mailto:'));
    for (const ref of refs) await access(resolve(root, ref.split(/[?#]/)[0]));
  }
});

test('images have alt text and external links use HTTPS', async () => {
  for (const page of pages) {
    const html = await text(page);
    for (const image of html.match(/<img\b[^>]*>/g) || []) assert.match(image, /\salt="[^"]*"/i, `${page}: ${image}`);
    assert.doesNotMatch(html, /(?:src|href)="http:\/\//i);
  }
  const sources = JSON.parse(await text('data/sources.json'));
  for (const source of sources) assert.match(source.sourceUrl, /^https:\/\//, source.id);
});

test('each page carries substantial, balanced trilingual copy', async () => {
  for (const page of pages) {
    const html = await text(page);
    const counts = Object.fromEntries(['zh', 'en', 'ja'].map((lang) => [lang, (html.match(new RegExp(`data-lang="${lang}"`, 'g')) || []).length]));
    assert.ok(counts.zh >= 8, `${page} needs more trilingual sections`);
    assert.equal(counts.zh, counts.en, `${page}: Chinese and English counts differ`);
    assert.equal(counts.zh, counts.ja, `${page}: Chinese and Japanese counts differ`);
  }
});

test('simulation, study status and stimulation boundaries are explicit', async () => {
  const allPages = (await Promise.all(pages.map(text))).join('\n');
  const prototype = await text('assets/js/prototype-flow.js');
  assert.match(allPages, /ILLUSTRATIVE SIMULATION/i);
  assert.match(allPages, /PLANNED STUDY/i);
  assert.match(allPages, /NO DIY EMS/i);
  assert.match(allPages, /not power, torque, diagnosis|not power, torque, muscle strength or diagnosis/i);
  assert.match(prototype, /stationary indoor trainer only/i);
  assert.equal(prototypeLabels('en').stop, 'STOP OUTPUT');
  assert.doesNotMatch(allPages + prototype, /EMS.{0,40}(wiring|current|pulse width|electrode placement)/i);
});

test('prototype exposes the complete nine-method experiment story', () => {
  assert.deepEqual(PROTOTYPE_STEPS.map(({ key }) => key), [
    'LOOP', 'MODULES', 'CUE_SEQUENCE', 'DESIGN_SPACE', 'SYSTEM_FACTS',
    'TASK_CONDITIONS', 'REPLAY', 'TIMELINE', 'EVIDENCE'
  ]);
  assert.match(getPrototypeStep(0, 'en').summary, /pressure|pedal/i);
  assert.equal(getPrototypeStep(6, 'en').traceProvenance, 'past_self');
  assert.match(getPrototypeStep(8, 'en').summary, /illustrative|planned/i);
  assert.equal(new Set(PROTOTYPE_STEPS.map(({ referenceName }) => referenceName)).size, 9);
});

test('handoff documentation includes local preview and verification evidence', async () => {
  const readme = await text('README.md');
  const validation = await text('VALIDATION.md');
  assert.match(readme, /python3 -m http\.server/);
  assert.match(readme, /manufacturer.*image/i);
  assert.match(validation, /56\/56/);
  assert.match(validation, /browser visual/i);
});
