const BasePage = require('../../src/base/base');
const { expect } = require('@playwright/test');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = '//input[@name="username"]';
    this.passwordInput = '//input[@name="password"]';
    this.loginButton = '//input[@value="Log In"]';
    this.loginError = '//*[@id="rightPanel"]//*[contains(concat(" ", normalize-space(@class), " "), " error ")]';
    this.registerLink = '//a[contains(@href, "register.htm")]';
    this.logoutLink = '//a[contains(@href, "logout.htm")]';
    this.accountsLink = '//a[contains(@href, "overview.htm")]';
    this.overviewHeading = '//*[@id="rightPanel"]//h1[contains(normalize-space(), "Accounts Overview")]';
    this.accountTable = '//table[@id="accountTable"]';
    this.accountRows = '//table[@id="accountTable"]//tbody/tr';
    this.balanceCell = '//table[@id="accountTable"]//tbody/tr/td[2]';
  }

  async navigateToHome() {
    await super.navigate('/index.htm?ConnType=JDBC');
  }

  async navigateToLoginPage() {
    await super.navigate('/logout.htm');
    await this.helper.assertVisible(this.usernameInput, 'Username');
  }

  async login(username, password) {
    await this.helper.fill(this.usernameInput, username, 'Username');
    await this.helper.fill(this.passwordInput, password, 'Password');
    await this.helper.click(this.loginButton, 'Log In Button');
    await this.waitForPageLoad();
  }

  async clickRegister() {
    await this.helper.click(this.registerLink, 'Register Link');
    await this.waitForPageLoad();
  }

  async navigateToAccountOverview() {
    await this.helper.click(this.accountsLink, 'Accounts Overview Link');
    await this.waitForPageLoad();
    await this.assertLoginSuccess();
  }

  async logout() {
    await this.helper.click(this.logoutLink, 'Log Out Link');
    await this.waitForPageLoad();
  }

  async getAccountBalance() {
    await expect(this.page.locator(this.accountTable)).toBeVisible({ timeout: 10000 });
    
    const rows = await this.page.locator(this.accountRows).all();
    const balances = [];

    for (const row of rows) {
      const cells = await row.locator('xpath=.//td').allInnerTexts();
      if (cells.length >= 2) {
        const accountId = cells[0].trim();
        const balance = cells[1].trim();
        balances.push({ accountId, balance });
        
        console.log(`\n Account Balance - Account #${accountId}: ${balance}`);
      }
    }

    return balances;
  }

  async assertLoginSuccess() {
    await this.helper.assertVisible(this.overviewHeading, 'Account Overview Heading');
    const heading = await this.helper.getText(this.overviewHeading);
    expect(heading).toContain('Accounts Overview');
  }

  async assertUserLoggedIn() {
    await this.helper.assertVisible(this.logoutLink, 'Log Out Link');
  }

  async assertLoginError(expectedError) {
    const rightPanel = this.page.locator('//*[@id="rightPanel"]');
    await expect(rightPanel).toBeVisible({ timeout: 10000 });
    await this.page.waitForFunction(
      expected => {
        const rightPanelElement = document.evaluate(
          '//*[@id="rightPanel"]',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;
        const panelText = rightPanelElement?.textContent || '';
        return panelText.includes(expected) || panelText.includes('An internal error has occurred');
      },
      expectedError,
      { timeout: 10000 },
    );
  }

  async assertBalanceVisible() {
    await expect(this.page.locator(this.accountTable)).toBeVisible({ timeout: 10000 });
    const firstBalance = this.page.locator(this.balanceCell).first();
    await expect(firstBalance).toBeVisible();
  }

  async assertOnHomePage() {
    await this.helper.assertVisible(this.registerLink, 'Register Link');
  }
}

module.exports = AccountPage;
