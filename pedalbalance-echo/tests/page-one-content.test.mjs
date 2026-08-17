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

test('the complete case journey is readable in the main document without opening a dialog', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const requiredLandmarks = [
    'id="journey"',
    'id="journey-problem"',
    'id="journey-loop"',
    'id="journey-moment"',
    'id="journey-build"',
    'id="journey-study"',
    'id="journey-evidence"',
    'id="journey-lab"',
    'data-journey-nav'
  ];

  for (const landmark of requiredLandmarks) {
    assert.ok(html.includes(landmark), `Inline journey is missing: ${landmark}`);
  }

  for (const stage of ['SENSE', 'DECIDE', 'CUE', 'CORRECT']) {
    assert.ok(html.includes(`>${stage}<`), `Inline mechanism is missing: ${stage}`);
  }

  for (const phase of ['BASELINE', 'TRAINING', 'NO CUE', '24 H RETENTION', 'TRANSFER']) {
    assert.ok(html.includes(phase), `Participant journey is missing: ${phase}`);
  }
});

test('the main journey starts from an anchor and offers the popup only as an optional final lab', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0] || '';
  const lab = html.match(/<section[^>]*id="journey-lab"[\s\S]*?<\/section>/)?.[0] || '';
  const popupTriggers = [...html.matchAll(/data-open-prototype/g)].length;

  assert.ok(hero.includes('href="#journey"'), 'Hero must start the inline journey');
  assert.ok(!hero.includes('data-open-prototype'), 'Hero must not hide the core story behind the popup');
  assert.equal(popupTriggers, 1, 'Main page must expose exactly one optional popup trigger');
  assert.ok(lab.includes('data-open-prototype'), 'The popup trigger must live in the final optional lab');
});

test('new journey chapters preserve Chinese English and Japanese parity', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const journey = html.slice(html.indexOf('id="journey"'), html.indexOf('</main>'));
  const count = (language) => [...journey.matchAll(new RegExp(`data-lang="${language}"`, 'g'))].length;

  assert.equal(count('zh'), count('en'));
  assert.equal(count('zh'), count('ja'));
  assert.ok(count('zh') >= 18, 'The journey needs at least eighteen trilingual content blocks');
});
