const BasePage = require('./base.page');
const { expect } = require('@playwright/test');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput   = 'input[name="username"]';
    this.passwordInput   = 'input[name="password"]';
    this.loginButton     = 'input[value="Log In"]';
    this.loginError      = '.error';
    this.registerLink    = 'a[href*="register.htm"]';
    this.logoutLink      = 'a[href*="logout.htm"]';
    this.accountsLink    = 'a[href*="overview.htm"]';
    this.overviewHeading = '#rightPanel h1';
    this.accountTable    = '#accountTable';
    this.accountRows     = '#accountTable tbody tr';
    this.balanceCell     = '#accountTable tbody tr td:nth-child(2)';
  }

  async navigateToHome() {
    await super.navigate('/index.htm?ConnType=JDBC');
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

  async logout() {
    await this.waitForPageLoad();
  }

  async getAccountBalance() {
    await expect(this.page.locator(this.accountTable)).toBeVisible({ timeout: 10000 });
    
    const rows = await this.page.locator(this.accountRows).all();
    const balances = [];

    for (const row of rows) {
      const cells = await row.locator('td').allInnerTexts();
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

  async assertLoginError(expectedError) {
    const errorElement = this.page.locator(this.loginError).first();
    await expect(errorElement).toBeVisible({ timeout: 10000 });
    await expect(errorElement).toContainText(expectedError);
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
