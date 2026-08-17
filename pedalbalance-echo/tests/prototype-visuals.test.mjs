import test from 'node:test';
import assert from 'node:assert/strict';
import { PROTOTYPE_STEPS, getPrototypeStep } from '../assets/js/prototype-flow.js';

test('the UI renders every academic method as its own complete scene visual', async () => {
  const ui = await import('../assets/js/prototype-ui.js');
  assert.equal(typeof ui.sceneVisualMarkup, 'function');

  for (const [index, definition] of PROTOTYPE_STEPS.entries()) {
    const view = getPrototypeStep(index, 'en');
    const markup = ui.sceneVisualMarkup(view);
    assert.match(markup, new RegExp(`data-visual-kind="${definition.visualKind}"`));
    assert.match(markup, /class="academic-visual/);
    assert.doesNotMatch(markup, /\[object Object\]|undefined|null/);
    for (const visualItem of view.visualItems) {
      assert.ok(markup.includes(visualItem.label), `${definition.visualKind}: ${visualItem.label}`);
      assert.ok(markup.includes(visualItem.detail), `${definition.visualKind}: ${visualItem.detail}`);
    }
  }
});

test('scene visuals escape text before inserting localized content into HTML', async () => {
  const ui = await import('../assets/js/prototype-ui.js');
  assert.equal(typeof ui.sceneVisualMarkup, 'function');
  const markup = ui.sceneVisualMarkup({
    visualKind: 'loop',
    visualTitle: '<unsafe>',
    visualItems: [{ label: '<b>input</b>', detail: 'A & B' }]
  });
  assert.match(markup, /&lt;unsafe&gt;/);
  assert.match(markup, /&lt;b&gt;input&lt;\/b&gt;/);
  assert.match(markup, /A &amp; B/);
  assert.doesNotMatch(markup, /<unsafe>|<b>input<\/b>/);
});
