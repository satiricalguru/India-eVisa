import puppeteer from 'puppeteer-core';
import path from 'path';

async function testChatGptSite() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const filePath = 'file://' + path.resolve('chatgpt-sites/index.html');
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));

  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const title = await page.title();
  console.log('Loaded Page Title:', title);

  const screenshotPath = path.resolve('public/screenshots/chatgpt-sites-test.png');
  await page.screenshot({ path: screenshotPath });
  console.log('Saved verification screenshot to', screenshotPath);

  await browser.close();
}

testChatGptSite().catch(console.error);
