const { expect } = require('@playwright/test');

class PlaywrightHelper {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(locator, description = '') {
    await this.page.locator(locator).click({ timeout: 5000 });
  }

  async fill(locator, value, description = '') {
    await this.page.locator(locator).fill(value);
  }

  async clearAndFill(locator, value, description = '') {
    await this.page.locator(locator).clear();
    await this.fill(locator, value, description);
  }

  async selectOption(locator, value, description = '') {
    await this.page.locator(locator).selectOption(value);
  }

  async waitForSelector(locator, timeout = 10000) {
    await this.page.waitForSelector(locator, { state: 'visible', timeout });
  }

  async waitForText(text, timeout = 10000) {
    await this.page.getByText(text).first().waitFor({ timeout });
  }

  async pause(ms) {
    await this.page.waitForTimeout(ms);
  }

  async assertVisible(locator, description = '') {
    await expect(this.page.locator(locator)).toBeVisible({ timeout: 10000 });
  }

  async assertText(locator, expectedText) {
    await expect(this.page.locator(locator)).toHaveText(expectedText);
  }

  async assertContainsText(locator, partialText) {
    await expect(this.page.locator(locator)).toContainText(partialText);
  }

  async assertURL(expectedUrl) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl));
  }

  async getText(locator) {
    return this.page.locator(locator).innerText();
  }

  async getValue(locator) {
    return this.page.locator(locator).inputValue();
  }

  async isVisible(locator) {
    return this.page.locator(locator).isVisible();
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/${name}-${timestamp}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  async scrollIntoView(locator) {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }

  async hover(locator) {
    await this.page.locator(locator).hover();
  }
}

module.exports = PlaywrightHelper;
