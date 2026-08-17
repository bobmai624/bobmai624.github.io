import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'prototype-making.html', 'experiment-capabilities.html'];

test('three pages share navigation, language controls and prototype access', async () => {
  for (const page of pages) {
    const html = await readFile(path.join(root, page), 'utf8');
    assert.match(html, /data-language="zh"/);
    assert.match(html, /data-language="en"/);
    assert.match(html, /data-language="ja"/);
    assert.match(html, /href="index\.html"/);
    assert.match(html, /href="prototype-making\.html"/);
    assert.match(html, /href="experiment-capabilities\.html"/);
    assert.match(html, /data-open-prototype/);
    assert.doesNotMatch(html, /TODO|TBD|PLACEHOLDER/i);
  }
});

test('all pages version the shared stylesheet so deployed layout fixes bypass stale browser caches', async () => {
  const stylesheetHrefs = [];
  for (const page of pages) {
    const html = await readFile(path.join(root, page), 'utf8');
    const match = html.match(/href="(assets\/css\/site\.css\?v=[^"]+)"/);
    assert.ok(match, `${page} must version the shared stylesheet`);
    stylesheetHrefs.push(match[1]);
  }
  assert.equal(new Set(stylesheetHrefs).size, 1, 'all pages must request the same stylesheet version');
});

test('source registry starts as valid structured data', async () => {
  const sources = JSON.parse(await readFile(path.join(root, 'data/sources.json'), 'utf8'));
  assert.ok(Array.isArray(sources));
});
