const { Given, When, Then } = require('@cucumber/cucumber');


Given('User navigates to ParaBank application', async function () {
  await this.accountPage.navigateToHome();
});


When('User clicks on Register link', async function () {
  await this.accountPage.clickRegister();
});

When('User fills registration form with valid details', async function () {
  const username = `ankit_${Date.now()}`;
  this.testData.username = username;
  this.testData.password = 'Test@1234';
  this.testData.confirmPassword = 'Test@1234';

  await this.regPage.fillForm(this.testData);
});

When('User fills registration form with mismatched passwords', async function () {
  const username = `ankit_${Date.now()}`;
  this.testData.username = username;
  this.testData.password = 'Test@1234';

  await this.regPage.fillWithMismatchedPasswords(this.testData);
});

When('User submits the registration form', async function () {
  await this.regPage.submitForm();
});

When('User submits the registration form without filling any fields', async function () {
  await this.regPage.submitForm();
});

When('User tries to register with already existing username', async function () {
  // Register once
  const username = `existing_${Date.now()}`;
  const formData = { ...this.testData, username, password: 'Test@1234', confirmPassword: 'Test@1234' };
  
  await this.regPage.fillForm(formData);
  await this.regPage.submitForm();
  
  // Try to register again with same username
  await this.regPage.navigate();
  await this.regPage.fillForm(formData);
});

When('User creates a new account with valid details', async function () {
  await this.accountPage.clickRegister();
  
  const username = `ankit_${Date.now()}`;
  this.testData.username = username;
  this.testData.password = 'Test@1234';
  this.testData.confirmPassword = 'Test@1234';

  await this.regPage.fillForm(this.testData);
  await this.regPage.submitForm();
  await this.regPage.assertRegistrationSuccess();
});

When('User navigates to home page', async function () {
  await this.accountPage.navigateToHome();
});

When('User logs in with the created credentials', async function () {
  await this.accountPage.login(this.testData.username, this.testData.password);
});

When('User logs in with username {string} and password {string}', async function (username, password) {
  await this.accountPage.login(username, password);
});

When('User logs in with correct username but wrong password {string}', async function (wrongPassword) {
  await this.accountPage.login(this.testData.username, wrongPassword);
});

When('User clicks login button without entering any credentials', async function () {
  await this.accountPage.login('', '');
});

When('User navigates to Account Overview', async function () {
  // Already on Account Overview after login, but ensure it's visible
  await this.accountPage.assertLoginSuccess();
});

When('User logs out', async function () {
  await this.accountPage.logout();
});


Then('User should see success message {string}', async function (expectedMessage) {
  await this.regPage.assertRegistrationSuccess();
});

Then('User should be logged in automatically', async function () {
  await this.accountPage.assertLoginSuccess();
});

Then('User should see error message {string}', async function (errorMessage) {
  await this.regPage.assertErrorMessage(errorMessage);
});

Then('User should see validation errors for mandatory fields', async function () {
  await this.regPage.assertValidationErrors();
});

Then('User should be successfully logged in', async function () {
  await this.accountPage.assertLoginSuccess();
});

Then('User should see Account Overview page', async function () {
  await this.accountPage.assertLoginSuccess();
});

Then('User should see login error {string}', async function (errorMessage) {
  await this.accountPage.assertLoginError(errorMessage);
});

Then('Account balance should be displayed', async function () {
  await this.accountPage.assertBalanceVisible();
});

Then('Account balance should be printed to console', async function () {
  const balances = await this.accountPage.getAccountBalance();
  const balanceText = balances.map(b => `Account #${b.accountId}: ${b.balance}`).join('\n');
  await this.attach(balanceText, 'text/plain');
});

Then('User should be redirected to home page', async function () {
  await this.accountPage.assertOnHomePage();
});
