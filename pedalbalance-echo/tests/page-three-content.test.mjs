import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('page three distinguishes performance, learning, replay and engineering quality', async () => {
  const html = await readFile(path.join(root, 'experiment-capabilities.html'), 'utf8');
  for (const marker of [
    'PLANNED STUDY', 'ILLUSTRATIVE SIMULATION',
    'V', 'CH', 'FF', 'AF', 'PS-H', 'MO-H', 'PS-V', 'NF',
    'simulated_matched_other', '24-hour retention', 'transfer',
    'packet loss', 'valid revolutions', 'feedback dose',
    'Performance ≠ learning'
  ]) assert.ok(html.includes(marker), `Page 3 is missing: ${marker}`);
});

test('page three maps at least ten capabilities to tangible evidence', async () => {
  const html = await readFile(path.join(root, 'experiment-capabilities.html'), 'utf8');
  assert.ok([...html.matchAll(/data-capability=/g)].length >= 10);
  assert.ok([...html.matchAll(/data-calibration-step=/g)].length >= 5);
  assert.ok(html.includes('STOP OUTPUT'));
});

test('page three has substantial matching trilingual copy', async () => {
  const html = await readFile(path.join(root, 'experiment-capabilities.html'), 'utf8');
  const count = (lang) => [...html.matchAll(new RegExp(`data-lang="${lang}"`, 'g'))].length;
  assert.equal(count('zh'), count('en'));
  assert.equal(count('zh'), count('ja'));
  assert.ok(count('zh') >= 18);
});
