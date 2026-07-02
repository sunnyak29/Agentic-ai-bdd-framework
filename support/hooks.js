const { Before, After, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const config = require('../src/base/config');

setDefaultTimeout(config.navigationTimeout);

function safeFileName(value) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

Before(async function () {
  const browserMap = { chromium, firefox, webkit };
  const browserType = browserMap[config.browser] || chromium;

  this.browser = await browserType.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });

  const videoPath = config.recordVideo ? { dir: 'reports/videos/' } : undefined;
  this.context = await this.browser.newContext({
    viewport: { width: 1366, height: 768 },
    recordVideo: videoPath,
  });

  this.context.setDefaultTimeout(config.timeout);
  this.context.setDefaultNavigationTimeout(config.navigationTimeout);

  if (config.recordTrace) {
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }

  this.page = await this.context.newPage();
  this.testData = {
    firstName: 'John',
    lastName: 'Tester',
    address: '123 Test Street',
    city: 'Bangalore',
    state: 'KA',
    zipCode: '560001',
    phone: '9876543210',
    ssn: '123-45-6789',
  };
});

AfterStep(async function ({ pickleStep }) {
  if (!this.page || this.page.isClosed()) return;

  const screenshot = await this.page.screenshot({ fullPage: true });
  await this.attach(screenshot, {
    mediaType: 'image/png',
    fileName: `${safeFileName(pickleStep.text)}.png`,
  });
});

After(async function (scenario) {
  const video = config.recordVideo && this.page ? this.page.video() : null;

  if (config.recordTrace && this.context) {
    await fs.mkdir('reports/traces', { recursive: true });
    const tracePath = path.join(
      'reports/traces',
      `${safeFileName(scenario.pickle.name)}-${Date.now()}.zip`,
    );
    await this.context.tracing.stop({ path: tracePath });
    await this.attach(await fs.readFile(tracePath), {
      mediaType: 'application/zip',
      fileName: path.basename(tracePath),
    });
  }

  if (this.context) await this.context.close();

  if (video) {
    const videoPath = await video.path();
    await this.attach(await fs.readFile(videoPath), {
      mediaType: 'video/webm',
      fileName: path.basename(videoPath),
    });
  }

  if (this.browser) await this.browser.close();
});
