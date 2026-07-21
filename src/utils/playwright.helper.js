const { expect } = require('@playwright/test');

class PlaywrightHelper {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(locator, description) {
    try{
    await this.page.locator(locator).click({ timeout: 5000 });
        console.log(`Clicking: ${description}`);

    }
    catch (error) {
        console.error(`Error clicking ${description}: ${error}`);
        throw error;
    }
  }

  async fill(locator, value, description) {
    try {
      await this.page.locator(locator).fill(value);
      console.log(`Filling: ${description}`);
    } catch (error) {
      console.error(`Error filling ${description}: ${error}`);
      throw error;
    }
  }

  async type(locator, value, description) {
    try {
      await this.page.locator(locator).type(value);
      console.log(`Typing: ${description}`);
    } catch (error) {
      console.error(`Error typing ${description}: ${error}`);
      throw error;
    }
  }

  async selectOption(locator, value, description = '') {
    try {
      await this.page.locator(locator).selectOption(value);
      console.log(`Selecting option: ${description}`);
    } catch (error) {
      console.error(`Error selecting option ${description}: ${error}`);
      throw error;
    }
  }

  async waitForSelector(locator, timeout) {
    try {
      await this.page.waitForSelector(locator, { state: 'visible', timeout });
    } catch (error) {
      console.error(`Error waiting for selector ${locator}: ${error}`);
      throw error;
    }
  }

  async waitForText(text, timeout) {
    try {
      await this.page.getByText(text).first().waitFor({ timeout });
    } catch (error) {
      console.error(`Error waiting for text "${text}": ${error}`);
      throw error;
    }
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }
  

  async assertVisible(locator, description ) {
    try { 
    await expect(this.page.locator(locator)).toBeVisible({ timeout: 10000 });
    }
    catch (error) {
        console.error(`${description} not visible : ${error}`);
        throw error;
    }
  }

  async assertText(locator, expectedText) {
    try {
    await expect(this.page.locator(locator)).toHaveText(expectedText, { timeout: 10000 });
    }
    catch (error) {
        console.error(`Expected text "${expectedText}" not found : ${error}`);
        throw error;
    }
    await expect(this.page.locator(locator)).toHaveText(expectedText);
  }

  async assertContainsText(locator, partialText) {
    try {
    await expect(this.page.locator(locator)).toContainText(partialText, { timeout: 10000 });
    }
    catch (error) {
        console.error(`Expected partial text "${partialText}" not found : ${error}`);
        throw error;
    }
  }

  async assertURL(expectedUrl) {
    try {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl), { timeout: 10000 });
    }
    catch (error) {
        console.error(`Expected URL "${expectedUrl}" not found : ${error}`);
        throw error;
    } 
    await expect(this.page).toHaveURL(new RegExp(expectedUrl));
  }

  async getText(locator) {
    try {
      return await this.page.locator(locator).innerText();
    } catch (error) {
      console.error(`Error getting text for locator "${locator}": ${error}`);
      throw error;
    }
  }

  async getValue(locator) {
    try {
      return await this.page.locator(locator).inputValue();
    } catch (error) {
      console.error(`Error getting value for locator "${locator}": ${error}`);
      throw error;
    }
  }

  async isVisible(locator) {
    try {
    return await this.page.locator(locator).isVisible({ timeout: 5000 });
    }
    catch (error) {
        console.error(`Error checking visibility for locator "${locator}": ${error}`);
        throw error;
    }
  }
    


  async takeScreenshot(name) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = `screenshots/${name}-${timestamp}.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      return screenshotPath;
    } catch (error) {
      console.error(`Error taking screenshot "${name}": ${error}`);
      throw error;
    }
  }
  

  async scrollIntoView(locator) {
    try {     
    await this.page.locator(locator).scrollIntoViewIfNeeded();
    }
    catch (error) {
        console.error(`Error scrolling into view for locator "${locator}": ${error}`);
        throw error;
    } 
  }

  async hover(locator) {
    try {         
    await this.page.locator(locator).hover();
  }
  catch (error) {
        console.error(`Error hovering over locator "${locator}": ${error}`);
        throw error;
    } 
  }           
}

module.exports = PlaywrightHelper;
