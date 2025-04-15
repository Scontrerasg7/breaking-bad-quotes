import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';

async function runE2ETest() {
  // Start Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Go to the local app (assumes app is running on localhost:5173 or 8080)
    await driver.get('http://localhost:5173');

    // Wait for the quote card to appear
    await driver.wait(until.elementLocated(By.className('quote-card')), 10000);

    // Get the initial quote and author
    const quoteElem = await driver.findElement(
      By.css('.quote-card blockquote p')
    );
    const authorElem = await driver.findElement(By.css('.quote-card footer p'));
    const initialQuote = await quoteElem.getText();
    const initialAuthor = await authorElem.getText();
    console.log('Initial Quote:', initialQuote);
    console.log('Initial Author:', initialAuthor);

    // Click the 'Get Another Quote' button
    const button = await driver.findElement(
      By.xpath(
        "//button[contains(., 'Get Another Quote') or contains(., 'Get another quote') or contains(., 'get another quote') or contains(., 'Get another quote') or contains(., 'Get Another quote') or contains(., 'get Another Quote') or contains(., 'Get Another Quote')]"
      )
    );
    await button.click();

    // Wait for the quote to change (or timeout after 10s)
    await driver.wait(async () => {
      const newQuote = await quoteElem.getText();
      return newQuote !== initialQuote;
    }, 10000);

    // Get the new quote and author
    const newQuote = await quoteElem.getText();
    const newAuthor = await authorElem.getText();
    console.log('New Quote:', newQuote);
    console.log('New Author:', newAuthor);

    if (newQuote && newAuthor && newQuote !== initialQuote) {
      console.log('E2E Test Passed: Button works and quote changes.');
      process.exit(0);
    } else {
      throw new Error('Quote did not change after clicking the button');
    }
  } catch (err) {
    console.error('E2E Test Failed:', err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

runE2ETest();
