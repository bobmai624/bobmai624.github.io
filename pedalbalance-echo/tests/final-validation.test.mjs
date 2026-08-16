import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  const prototype = await text('assets/js/prototype-ui.js');
  assert.match(allPages, /ILLUSTRATIVE SIMULATION/i);
  assert.match(allPages, /PLANNED STUDY/i);
  assert.match(allPages, /NO DIY EMS/i);
  assert.match(allPages, /not power, torque, diagnosis|not power, torque, muscle strength or diagnosis/i);
  assert.match(prototype, /Stationary trainer only/);
  assert.match(prototype, /STOP OUTPUT/);
  assert.doesNotMatch(allPages + prototype, /EMS.{0,40}(wiring|current|pulse width|electrode placement)/i);
});

test('prototype exposes the complete eleven-scene learning loop', async () => {
  const prototype = await text('assets/js/prototype-ui.js');
  for (const scene of ['WELCOME', 'SAFETY', 'DISCOVERY', 'CALIBRATION', 'BASELINE', 'REVOLUTION', 'TRAINING', 'NO_FEEDBACK', 'REPLAY', 'FAULT', 'EXPORT']) {
    assert.match(prototype, new RegExp(`key: '${scene}'`));
  }
  assert.match(prototype, /NODE_TIMEOUT_R/);
  assert.match(prototype, /past_self/);
});

test('handoff documentation includes local preview and verification evidence', async () => {
  const readme = await text('README.md');
  const validation = await text('VALIDATION.md');
  assert.match(readme, /python3 -m http\.server/);
  assert.match(readme, /manufacturer.*image/i);
  assert.match(validation, /37\/37/);
  assert.match(validation, /browser visual/i);
});
