const { Given, When, Then, Before } = require('@cucumber/cucumber');
const RegistrationPage = require('../pages/login.page');
const AccountPage = require('../pages/account.page');

/** @type {InstanceType<typeof RegistrationPage>} */
let registrationPage;

/** @type {InstanceType<typeof AccountPage>} */
let accountPage;

function createUsername(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 6);
  return `${prefix}_${Date.now().toString(36)}_${randomPart}`;
}

Before(function () {
  registrationPage = new RegistrationPage(this.page);
  accountPage = new AccountPage(this.page);
});
Given('User navigates to ParaBank application', async function () {
  await accountPage.navigateToHome();
  console.log('Navigated to ParaBank application');
});

When('User clicks on Register link', async function () {
  await accountPage.clickRegister();
  console.log('Register link clicked');
});

When('User fills registration form with valid details', async function () {
  const username = createUsername('ankit');
  this.testData.username = username;
  this.testData.password = 'Test@1234';
  this.testData.confirmPassword = 'Test@1234';

  await registrationPage.fillForm(this.testData);
  console.log('Valid test data filled');
});

When('User fills registration form with mismatched passwords', async function () {
  const username = createUsername('ankit');
  this.testData.username = username;
  this.testData.password = 'Test@1234';

  await registrationPage.fillWithMismatchedPasswords(this.testData);
  console.log('Mismatched password test data filled');
});

When('User submits the registration form', async function () {
  await registrationPage.submitForm();
  console.log('Registration form submitted');
});

When('User submits the registration form without filling any fields', async function () {
  await registrationPage.submitForm();
  console.log('Empty registration form submitted');
});

When('User tries to register with already existing username', async function () {
  const username = createUsername('existing');
  const formData = {
    ...this.testData,
    username,
    password: 'Test@1234',
    confirmPassword: 'Test@1234',
  };

  await registrationPage.fillForm(formData);
  await registrationPage.submitForm();

  await registrationPage.navigate();
  await registrationPage.fillForm(formData);
  console.log('Existing username test data filled');
});

When('User creates a new account with valid details', async function () {
  await accountPage.clickRegister();

  const username = createUsername('ankit');
  this.testData.username = username;
  this.testData.password = 'Test@1234';
  this.testData.confirmPassword = 'Test@1234';

  await registrationPage.fillForm(this.testData);
  await registrationPage.submitForm();
  await registrationPage.assertRegistrationSuccess();
  console.log('New account created successfully');
});

When('User navigates to home page', async function () {
  await accountPage.navigateToLoginPage();
  console.log('Navigated to home page');
});

When('User logs in with the created credentials', async function () {
  await accountPage.login(this.testData.username, this.testData.password);
  console.log('Login submitted with created credentials');
});

When('User logs in with username {string} and password {string}', async function (username, password) {
  await accountPage.login(username, password);
  console.log('Login submitted with provided credentials');
});

When('User logs in with correct username but wrong password {string}', async function (wrongPassword) {
  await accountPage.login(this.testData.username, wrongPassword);
  console.log('Login submitted with wrong password');
});

When('User clicks login button without entering any credentials', async function () {
  await accountPage.login('', '');
  console.log('Login submitted without credentials');
});

When('User navigates to Account Overview', async function () {
  await accountPage.navigateToAccountOverview();
  console.log('Account Overview page verified');
});

When('User logs out', async function () {
  await accountPage.logout();
  console.log('User logged out');
});

Then('User should see success message {string}', async function (expectedMessage) {
  await registrationPage.assertRegistrationSuccess();
  console.log('Registration success message verified');
});

Then('User should be logged in automatically', async function () {
  await accountPage.assertUserLoggedIn();
  console.log('Automatic login verified');
});

Then('User should see error message {string}', async function (errorMessage) {
  await registrationPage.assertErrorMessage(errorMessage);
  console.log('Registration error message verified');
});

Then('User should see validation errors for mandatory fields', async function () {
  await registrationPage.assertValidationErrors();
  console.log('Mandatory field validation errors verified');
});

Then('User should be successfully logged in', async function () {
  await accountPage.assertLoginSuccess();
  console.log('Successful login verified');
});

Then('User should see Account Overview page', async function () {
  await accountPage.assertLoginSuccess();
  console.log('Account Overview page displayed');
});

Then('User should see login error {string}', async function (errorMessage) {
  await accountPage.assertLoginError(errorMessage);
  console.log('Login error message verified');
});

Then('Account balance should be displayed', async function () {
  await accountPage.assertBalanceVisible();
  console.log('Account balance displayed');
});

Then('Account balance should be printed to console', async function () {
  const balances = await accountPage.getAccountBalance();
  const balanceText = balances.map(b => `Account #${b.accountId}: ${b.balance}`).join('\n');
  console.log('Account balance retrieved');
  await this.attach(balanceText, 'text/plain');
});

Then('User should be redirected to home page', async function () {
  await accountPage.assertOnHomePage();
  console.log('Home page redirection verified');
});
