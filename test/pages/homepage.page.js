const BasePage = require('../../src/base/base');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.homepageLink = '//a[@href="index.htm"]';
    this.servicesLink = '#headerPanel a[href*="services.htm"]';
    this.rightPanel = '#rightPanel';
  }

  async navigateToHomePage() {
    await super.navigate('/index.htm?ConnType=JDBC');
  }

  async clickServices() {
    await this.page.locator(this.servicesLink).click();
    await this.waitForPageLoad();
  }

  async assertServicesPageTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertServicesContent(expectedText) {
    const panel = this.page.locator(this.rightPanel);
    await expect(panel).toBeVisible({ timeout: 10000 });
    await expect(panel).toContainText(expectedText);
  }

  async assertServiceData(serviceName) {
    const panel = this.page.locator(this.rightPanel);
    await expect(panel).toBeVisible({ timeout: 10000 });
    await expect(panel).toContainText(serviceName);
  }
}

module.exports = HomePage;
