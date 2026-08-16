import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('every local reference image has provenance and publication status', async () => {
  const sources = JSON.parse(await readFile(path.join(root, 'data/sources.json'), 'utf8'));
  const images = sources.filter((item) => item.localAsset);
  assert.ok(images.length >= 6, 'six recognisable component images are required');
  for (const source of images) {
    assert.match(source.sourceUrl, /^https:\/\//);
    assert.ok(source.attribution);
    assert.ok(['cleared', 'internal-reference', 'replace-before-publication'].includes(source.publicUse));
    assert.match(source.verifiedDate, /^2026-08-16$/);
    await access(path.join(root, source.localAsset));
  }
});

test('component records connect roles, limitations, documentation and tutorials', async () => {
  const components = JSON.parse(await readFile(path.join(root, 'data/components.json'), 'utf8'));
  assert.ok(components.length >= 10);
  for (const item of components) {
    assert.ok(item.id && item.name && item.group && item.role && item.limitation);
    assert.match(item.documentationUrl, /^https:\/\//);
    assert.ok(['required', 'optional', 'reuse', 'exclude'].includes(item.status));
  }
});

test('source registry distinguishes code, documentation, tutorial and product media', async () => {
  const sources = JSON.parse(await readFile(path.join(root, 'data/sources.json'), 'utf8'));
  const types = new Set(sources.map((item) => item.type));
  for (const type of ['open-source-code', 'official-documentation', 'tutorial-reference', 'product-media', 'research-paper']) {
    assert.ok(types.has(type), `missing source type ${type}`);
  }
});

test('scientific linkage visual records its biomechanics references without copying assets', async () => {
  const sources = JSON.parse(await readFile(path.join(root, 'data/sources.json'), 'utf8'));
  const byId = new Map(sources.map((source) => [source.id, source]));
  for (const id of ['PAPER-PARK-PEDALING', 'DOC-OPENSIM-CYCLING', 'PAPER-SAUREN-ANIMATION']) {
    const source = byId.get(id);
    assert.ok(source, `missing linkage reference ${id}`);
    assert.match(source.sourceUrl, /^https:\/\//);
    assert.match(source.replacementStatus, /original redraw|no animation asset copied/i);
    assert.equal(source.verifiedDate, '2026-08-17');
  }
});
