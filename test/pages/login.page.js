const BasePage = require('./base.page');
const { expect } = require('@playwright/test');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstNameInput    = 'input[id="customer.firstName"]';
    this.lastNameInput     = 'input[id="customer.lastName"]';
    this.addressInput      = 'input[id="customer.address.street"]';
    this.cityInput         = 'input[id="customer.address.city"]';
    this.stateInput        = 'input[id="customer.address.state"]';
    this.zipCodeInput      = 'input[id="customer.address.zipCode"]';
    this.phoneInput        = 'input[id="customer.phoneNumber"]';
    this.ssnInput          = 'input[id="customer.ssn"]';
    this.usernameInput     = 'input[id="customer.username"]';
    this.passwordInput     = 'input[id="customer.password"]';
    this.confirmInput      = 'input[id="repeatedPassword"]';
    this.registerButton    = 'input[value="Register"]';
    this.errorMessage      = '.error';
    this.successHeading    = '#rightPanel h1';
    this.welcomeText       = '#rightPanel p';
  }

  async navigate() {
    await super.navigate('/register.htm');
  }

  async fillForm(data) {
    await this.helper.fill(this.firstNameInput, data.firstName, 'First Name');
    await this.helper.fill(this.lastNameInput, data.lastName, 'Last Name');
    await this.helper.fill(this.addressInput, data.address, 'Address');
    await this.helper.fill(this.cityInput, data.city, 'City');
    await this.helper.fill(this.stateInput, data.state, 'State');
    await this.helper.fill(this.zipCodeInput, data.zipCode, 'Zip Code');
    await this.helper.fill(this.phoneInput, data.phone, 'Phone');
    await this.helper.fill(this.ssnInput, data.ssn, 'SSN');
    await this.helper.fill(this.usernameInput, data.username, 'Username');
    await this.helper.fill(this.passwordInput, data.password, 'Password');
    await this.helper.fill(this.confirmInput, data.confirmPassword, 'Confirm Password');
  }

  async fillWithMismatchedPasswords(data) {
    await this.fillForm({ ...data, confirmPassword: 'DifferentPassword123' });
  }

  async submitForm() {
    await this.helper.click(this.registerButton, 'Register Button');
    await this.waitForPageLoad();
  }

  async assertRegistrationSuccess() {
    await this.helper.assertVisible(this.successHeading, 'Success Heading');
    const heading = await this.helper.getText(this.successHeading);
    expect(heading).toContain('Welcome');
  }

  async assertErrorMessage(expectedError) {
    const errorElement = this.page.locator(this.errorMessage).first();
    await expect(errorElement).toBeVisible({ timeout: 10000 });
    await expect(errorElement).toContainText(expectedError);
  }

  async assertValidationErrors() {
    // Check for error messages on form
    const errors = await this.page.locator('.error').count();
    expect(errors).toBeGreaterThan(0);
  }
}

module.exports = RegistrationPage;
