const { Given, When, Then, Before } = require('@cucumber/cucumber');
const CheckHelperPage = require('../pages/checkhelper.page');

/** @type {InstanceType<typeof CheckHelperPage>} */
let checkHelperPage;

Before(function () {
  checkHelperPage = new CheckHelperPage(this.page);
});

Given('User opens the the-internet homepage', async function () {
  await checkHelperPage.navigate('/');
  console.log('Navigated to the-internet homepage');
});

When('User clicks the helpermethod from the homepage and verify helper methods', () => {
  // Write code here that turns the phrase above into concrete actions
    await checkHelperPage.clickExampleLink(1);

})
