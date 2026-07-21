const BasePage = require('../../src/base/base');
const { expect } = require('@playwright/test');

class CheckHelperPage extends BasePage {
  constructor(page) {
    super(page);

  }

  async clickExampleLink(exampleLink) {
    const linkLocator = `//li[${exampleLink}]/a`;

    await this.helper.click(linkLocator, "Example Link");
    await this.waitForPageLoad();
    await this.verifyHelperMethods();
  }

  async verifyHelperMethods() {
 
  }
}

module.exports = CheckHelperPage;    nb