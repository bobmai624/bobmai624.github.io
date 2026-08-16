import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('page two covers components, reuse, gates and the complete-revolution limitation', async () => {
  const html = await readFile(path.join(root, 'prototype-making.html'), 'utf8');
  for (const marker of [
    'complete-revolution relative pressure-contribution proxy',
    'Reuse', 'Adapt', 'Exclude', 'MIT', 'CC BY-NC 4.0',
    '500 ms', '8/10', '13 Aug 2026', '14-DAY BUILD'
  ]) assert.ok(html.includes(marker), `Page 2 is missing: ${marker}`);
  assert.equal([...html.matchAll(/data-build-step=/g)].length, 8);
  assert.ok([...html.matchAll(/data-gate=/g)].length >= 6);
});

test('page two contains local component images and tutorial references', async () => {
  const html = await readFile(path.join(root, 'prototype-making.html'), 'utf8');
  assert.ok([...html.matchAll(/assets\/images\/components\//g)].length >= 6);
  assert.ok([...html.matchAll(/assets\/images\/tutorials\//g)].length >= 6);
  assert.ok([...html.matchAll(/youtube\.com\/watch/g)].length >= 6);
});

test('page two has substantial matching trilingual copy', async () => {
  const html = await readFile(path.join(root, 'prototype-making.html'), 'utf8');
  const count = (lang) => [...html.matchAll(new RegExp(`data-lang="${lang}"`, 'g'))].length;
  assert.equal(count('zh'), count('en'));
  assert.equal(count('zh'), count('ja'));
  assert.ok(count('zh') >= 18);
});
