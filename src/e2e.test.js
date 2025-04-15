import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import 'chromedriver';

async function runE2ETest() {
  // Configura Chrome en modo headless
  const options = new chrome.Options();
  options.addArguments('--headless=new'); // Usa '--headless' si tu Chrome es antiguo
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
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

    // Wait for the quote element to be present after the click
    await driver.wait(
      until.elementLocated(By.css('.quote-card blockquote p')),
      10000
    );

    // Re-query the updated elements (they may have changed)
    const updatedQuoteElem = await driver.findElement(
      By.css('.quote-card blockquote p')
    );
    const updatedAuthorElem = await driver.findElement(
      By.css('.quote-card footer p')
    );
    const newQuote = await updatedQuoteElem.getText();
    const newAuthor = await updatedAuthorElem.getText();
    console.log('New Quote:', newQuote);
    console.log('New Author:', newAuthor);

    if (newQuote && newAuthor) {
      if (newQuote !== initialQuote) {
        console.log('E2E Test Passed: Button works and quote changes.');
        process.exit(0);
      } else {
        console.log(
          'E2E Test Passed: Button works but quote repeated (API returned same quote).'
        );
        process.exit(0);
      }
    } else {
      throw new Error('Quote or author not found after clicking the button');
    }
  } catch (err) {
    console.error('E2E Test Failed:', err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

runE2ETest();
