const { Given, When, Then, Before } = require('@cucumber/cucumber');
const HomePage = require('../pages/homepage.page');

let homePage;

Before(function () {
  homePage = new HomePage(this.page);
});

Given('User opens the ParaBank homepage', async function () {
  await homePage.navigateToHomePage();
});

When('User clicks the Services link from the homepage', async function () {
  await homePage.clickServices();
});

Then('User should see the Services page title {string}', async function (expectedTitle) {
  await homePage.assertServicesPageTitle(expectedTitle);
});

Then('User should see service page content {string}', async function (expectedText) {
  await homePage.assertServicesContent(expectedText);
});

Then('User should see service data for {string}', async function (serviceName) {
  await homePage.assertServiceData(serviceName);
});
