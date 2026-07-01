const PlaywrightHelper = require('../../src/utils/playwright.helper');
const config = require('../../src/base/config');

class BasePage {
  constructor(page) {
    this.page = page;
    this.helper = new PlaywrightHelper(page);
    this.baseUrl = config.baseUrl;
  }

  async navigate(path = '') {
    const url = `${this.baseUrl}${path}`;
    await this.helper.navigateTo(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle() {
    return this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async takeScreenshot(name) {
    return this.helper.takeScreenshot(name);
  }
}

module.exports = BasePage;
