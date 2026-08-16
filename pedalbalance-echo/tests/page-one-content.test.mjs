import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('page one communicates the full embodied loop and research frame', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const requiredMeaning = [
    'SENSE', 'INTERPRET', 'RETURN', 'LEARN',
    'Human → Machine → Human', 'complete revolution',
    'Adaptive feedback', 'Past-self replay',
    'C1', 'E2', 'ILLUSTRATIVE SIMULATION', 'NO DIY EMS',
    'Adaptive Electrical Muscle Stimulation', 'bioSync', 'My(o) Action'
  ];
  for (const marker of requiredMeaning) {
    assert.ok(html.includes(marker), `Page 1 is missing: ${marker}`);
  }
});

test('page one has matching Chinese, English and Japanese section copy', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const count = (value) => [...html.matchAll(new RegExp(`data-lang="${value}"`, 'g'))].length;
  assert.equal(count('zh'), count('en'));
  assert.equal(count('zh'), count('ja'));
  assert.ok(count('zh') >= 12, 'Page 1 needs at least twelve trilingual content blocks');
});

test('hero describes the scientific linkage without claiming recorded biomechanics', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const canvas = html.match(/<canvas\b[^>]*data-hero-canvas[^>]*>/)?.[0] || '';
  for (const meaning of ['Illustrative planar linkage', 'fixed hip', 'complete revolution', 'opposite pedals']) {
    assert.ok(canvas.includes(meaning), `Hero canvas description is missing: ${meaning}`);
  }
  assert.ok(canvas.includes('returns to one ankle'));
});
