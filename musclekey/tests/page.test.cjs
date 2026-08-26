const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const siteRoot = path.join(__dirname, '..');
let server;
let browser;
let baseUrl;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

test.before(async () => {
  server = http.createServer((request, response) => {
    const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
    const target = path.join(siteRoot, decodeURIComponent(requested));
    if (!target.startsWith(siteRoot) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'content-type': mimeTypes[path.extname(target)] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
});

test.after(async () => {
  await browser?.close();
  await new Promise((resolve) => server?.close(resolve));
});

test('first viewport defaults to English and explains the human-to-computer loop without scrolling', async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(baseUrl);

  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('h1').innerText(), /Turn muscle.*computer input/s);
  assert.equal(await page.locator('[data-flow-node]').count(), 5);
  assert.equal(await page.locator('[data-hero-summary]').isVisible(), true);
  assert.equal(await page.locator('[data-open-demo]').isVisible(), true);

  await page.close();
});

test('language controls provide complete Chinese and Japanese page versions', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl);

  await page.getByRole('button', { name: '中文', exact: true }).click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
  assert.match(await page.locator('h1').innerText(), /肌肉.*电脑输入/s);

  await page.getByRole('button', { name: '日本語', exact: true }).click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'ja');
  assert.match(await page.locator('h1').innerText(), /筋活動.*コンピュータ入力/s);

  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('h1').innerText(), /Turn muscle.*computer input/s);

  await page.close();
});

test('materials section presents locally bundled product imagery and quantities', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#materials`);

  assert.equal(await page.locator('[data-material-card]').count() >= 7, true);
  assert.match(await page.locator('#materials').innerText(), /MyoWare 2\.0 Muscle Sensor/);
  assert.match(await page.locator('#materials').innerText(), /USB isolator/);
  const imageStatus = await page.locator('#materials img').evaluateAll((images) => images.map((image) => ({
    src: image.getAttribute('src'),
    loaded: image.complete && image.naturalWidth > 0
  })));
  assert.equal(imageStatus.length >= 4, true);
  assert.equal(imageStatus.every((image) => image.src.startsWith('assets/images/') && image.loaded), true);

  await page.close();
});

test('interactive demo turns a simulated contraction into one recorded response', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#demo`);

  await page.locator('[data-demo-start]').click();
  await page.locator('[data-target-state="go"]').waitFor({ state: 'visible', timeout: 3000 });
  await page.locator('[data-contract-button]').dispatchEvent('pointerdown');
  await page.waitForTimeout(450);
  await page.locator('[data-contract-button]').dispatchEvent('pointerup');

  assert.match(await page.locator('[data-latest-reaction]').innerText(), /^\d+ ms$/);
  assert.equal(await page.locator('[data-trial-row]').count(), 1);
  assert.match(await page.locator('[data-demo-status]').innerText(), /Recorded|Relax/);

  await page.close();
});

test('references distinguish paper, official documentation, software, and media credits', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#references`);

  assert.equal(await page.locator('[data-reference]').count() >= 6, true);
  const referenceText = await page.locator('#references').innerText();
  assert.match(referenceText, /Research paper/);
  assert.match(referenceText, /Official hardware documentation/);
  assert.match(referenceText, /Open-source code/);
  assert.match(referenceText, /Image sources/);

  await page.close();
});

test('illustrated instruction contains ten complete, checkable operating steps', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#steps`);

  assert.equal(await page.locator('[data-instruction-step]').count(), 10);
  for (const section of ['prepare', 'dont', 'actions', 'done', 'troubleshoot']) {
    assert.equal(
      await page.locator(`[data-instruction-step] [data-${section}]`).count(),
      10,
      `every instruction step needs a ${section} block`
    );
  }
  assert.equal(await page.locator('[data-instruction-check]').count(), 10);
  const imageStatus = await page.locator('[data-instruction-step] img').evaluateAll((images) => images.map((image) => ({
    src: image.getAttribute('src'),
    loaded: image.complete && image.naturalWidth > 0
  })));
  assert.equal(imageStatus.length >= 8, true);
  assert.equal(imageStatus.every((image) => image.src.startsWith('assets/images/') && image.loaded), true);
  assert.match(await page.locator('[data-completion-standard]').innerText(), /wiring photographs/i);
  assert.match(await page.locator('[data-completion-standard]').innerText(), /Arduino code/i);
  assert.match(await page.locator('[data-completion-standard]').innerText(), /CSV/);
  assert.match(await page.locator('[data-completion-standard]').innerText(), /demonstration video/i);

  await page.close();
});

test('instruction checklist saves progress and can be reset', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#steps`);

  assert.equal(await page.locator('[data-instruction-progress]').innerText(), '0 / 10');
  await page.locator('[data-instruction-check]').first().check();
  assert.equal(await page.locator('[data-instruction-progress]').innerText(), '1 / 10');
  await page.reload();
  assert.equal(await page.locator('[data-instruction-check]').first().isChecked(), true);
  assert.equal(await page.locator('[data-instruction-progress]').innerText(), '1 / 10');
  await page.locator('[data-instruction-reset]').click();
  assert.equal(await page.locator('[data-instruction-progress]').innerText(), '0 / 10');

  await page.close();
});

test('every operating step exposes a reviewable primary source or an explicit project-decision label', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/#steps`);

  const sourceCards = page.locator('[data-instruction-step] [data-step-source]');
  assert.equal(await sourceCards.count(), 10, 'each of the ten steps needs one source card');
  for (let index = 0; index < 10; index += 1) {
    const card = sourceCards.nth(index);
    assert.match(await card.locator('[data-evidence-type]').innerText(), /Official requirement|Measurement guidance|Project parameter|Research ethics/);
    const links = card.locator('a[href^="https://"]');
    assert.equal(await links.count() >= 1, true, `step ${index + 1} needs a direct external source`);
    assert.equal(await links.first().getAttribute('target'), '_blank');
  }
  assert.equal(
    await page.locator('[data-step-source] a', { hasText: 'SENIAM' }).first().getAttribute('href'),
    'http://seniam.org/fixation.htm',
    'SENIAM original archive currently needs its reachable HTTP URL'
  );

  await page.close();
});

test('safety copy prevents double-powered shields, on-body charging, and simulated-data overclaiming', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl);

  const materialsText = await page.locator('#materials').innerText();
  assert.doesNotMatch(materialsText, /LED Shield\s*\+\s*Power Shield/);
  assert.match(materialsText, /LED Shield.*or.*Power Shield/s);

  const instructionText = await page.locator('#steps').innerText();
  assert.match(instructionText, /connected to a person.*do not charge|Never charge while connected to a person/s);
  assert.match(instructionText, /individual engineering (?:run|trial)/i);
  assert.doesNotMatch(await page.locator('[data-step-id="formal-run"] h3').innerText(), /formal study/i);
  assert.match(instructionText, /Simulated values are not human-study results|Simulation is not human-study data/s);

  const researchGate = page.locator('[data-research-gate]');
  assert.equal(await researchGate.count(), 1);
  const gateText = await researchGate.innerText();
  assert.match(gateText, /Supervisor|ethics/);
  assert.match(gateText, /Informed consent/);
  assert.match(gateText, /Stop conditions/);
  assert.match(gateText, /Data/);

  await page.close();
});

test('mobile layout avoids horizontal overflow and keeps navigation usable', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(baseUrl);

  const widths = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth
  }));
  const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('*'))
    .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 2)
    .slice(0, 8)
    .map((element) => ({
      tag: element.tagName,
      className: element.className,
      right: Math.round(element.getBoundingClientRect().right),
      width: Math.round(element.getBoundingClientRect().width)
    })));
  assert.equal(widths.document <= widths.viewport + 2, true, JSON.stringify({ widths, overflow }));
  assert.equal(await page.locator('[data-mobile-menu]').isVisible(), true);

  await page.close();
});
