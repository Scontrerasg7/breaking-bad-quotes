import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import 'chromedriver';

async function runSmokeTests() {
  // Configure Chrome in headless mode
  const options = new chrome.Options();
  options.addArguments('--headless=new');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Test 1: Application loads successfully
    console.log('Test 1: Verifying application loads...');
    await driver.get(process.env.APP_BASE_URL);
    console.log('✓ Application loaded successfully');

    // Test 2: Main components are present
    console.log('Test 2: Verifying main components...');
    await driver.wait(
      until.elementLocated(By.className('quote-card-fail')),
      10000
    );
    await driver.wait(
      until.elementLocated(By.css('.quote-card blockquote p')),
      5000
    );
    await driver.wait(
      until.elementLocated(By.css('.quote-card footer p')),
      5000
    );
    console.log('✓ All main components are present');

    // Test 3: Initial quote is displayed
    console.log('Test 3: Verifying initial quote display...');
    const quoteElem = await driver.findElement(
      By.css('.quote-card blockquote p')
    );
    const authorElem = await driver.findElement(By.css('.quote-card footer p'));
    const initialQuote = await quoteElem.getText();
    const initialAuthor = await authorElem.getText();

    if (initialQuote && initialAuthor) {
      console.log('✓ Initial quote and author are displayed');
    } else {
      throw new Error('Initial quote or author not found');
    }

    // Test 4: Get Another Quote button is present and clickable
    console.log('Test 4: Verifying quote refresh functionality...');
    const button = await driver.findElement(
      By.xpath("//button[contains(., 'Get Another Quote')]")
    );
    await button.click();
    console.log('✓ Get Another Quote button is functional');

    // If we reach here, all smoke tests passed
    console.log('\n✅ All smoke tests passed successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Smoke Test Failed:', err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

runSmokeTests();
