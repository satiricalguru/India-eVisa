import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function clickButtonWithText(page, text) {
  return page.evaluate((targetText) => {
    const buttons = Array.from(document.querySelectorAll('button, a'));
    const btn = buttons.find(b => b.textContent && b.textContent.toLowerCase().includes(targetText.toLowerCase()));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }, text);
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Landing Hero
  console.log('Capturing 01-landing-hero.png...');
  await page.screenshot({ path: path.join(outDir, '01-landing-hero.png'), fullPage: false });

  // Full Landing Page
  console.log('Capturing 01b-landing-full.png...');
  await page.screenshot({ path: path.join(outDir, '01b-landing-full.png'), fullPage: true });

  // 2. Start Eligibility Flow
  console.log('Starting Eligibility...');
  await clickButtonWithText(page, 'Check my visa eligibility');
  await new Promise(r => setTimeout(r, 800));

  console.log('Capturing 02-eligibility-checker.png...');
  await page.screenshot({ path: path.join(outDir, '02-eligibility-checker.png') });

  // Step 1 -> Step 2
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 600));

  // Step 2 -> Step 3
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 600));

  // Step 3 -> Step 4
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 600));

  // Step 4 -> Result
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 1000));

  // 3. Result Screen
  console.log('Capturing 03-eligibility-result.png...');
  await page.screenshot({ path: path.join(outDir, '03-eligibility-result.png'), fullPage: true });

  // Start Application -> Login
  await clickButtonWithText(page, 'Start application');
  await new Promise(r => setTimeout(r, 800));

  // 4. Demo Login
  console.log('Capturing 04-demo-login.png...');
  await page.screenshot({ path: path.join(outDir, '04-demo-login.png') });

  // Send OTP
  await clickButtonWithText(page, 'Send demo OTP');
  await new Promise(r => setTimeout(r, 600));

  // Verify OTP
  await clickButtonWithText(page, 'Verify demo code');
  await new Promise(r => setTimeout(r, 1000));

  // 5. Wizard Step 1: Personal Info
  console.log('Capturing 05-wizard-personal.png...');
  await page.screenshot({ path: path.join(outDir, '05-wizard-personal.png') });

  // Go to Passport Bio upload
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 800));

  // Click 'Use a demo file instead'
  await clickButtonWithText(page, 'Use a demo file instead');
  await new Promise(r => setTimeout(r, 1500));

  console.log('Capturing 06-wizard-document-ai.png...');
  await page.screenshot({ path: path.join(outDir, '06-wizard-document-ai.png') });

  // Next to Photo
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 800));

  await clickButtonWithText(page, 'Use a demo file instead');
  await new Promise(r => setTimeout(r, 1500));

  console.log('Capturing 07-wizard-photo-check.png...');
  await page.screenshot({ path: path.join(outDir, '07-wizard-photo-check.png') });

  // Next to Stay
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 800));

  // Next to Contact
  await clickButtonWithText(page, 'Continue');
  await new Promise(r => setTimeout(r, 800));

  // Next to Review
  await clickButtonWithText(page, 'Review application');
  await new Promise(r => setTimeout(r, 1000));

  // 8. Review Screen
  console.log('Capturing 08-review-summary.png...');
  await page.screenshot({ path: path.join(outDir, '08-review-summary.png'), fullPage: true });

  // Continue to payment
  await clickButtonWithText(page, 'Continue to payment');
  await new Promise(r => setTimeout(r, 800));

  // 9. Payment Screen
  console.log('Capturing 09-transparent-payment.png...');
  await page.screenshot({ path: path.join(outDir, '09-transparent-payment.png') });

  // Pay
  await clickButtonWithText(page, 'Pay ₹');
  await new Promise(r => setTimeout(r, 2000));

  // 10. Live Tracking (Under Review)
  console.log('Capturing 10-live-tracking-under-review.png...');
  await page.screenshot({ path: path.join(outDir, '10-live-tracking-under-review.png'), fullPage: true });

  // Show mock approval
  await clickButtonWithText(page, 'Show mock approval');
  await new Promise(r => setTimeout(r, 1000));

  // 11. Live Tracking (Approved)
  console.log('Capturing 11-live-tracking-approved.png...');
  await page.screenshot({ path: path.join(outDir, '11-live-tracking-approved.png'), fullPage: true });

  // Also open modals on home screen for extra shots
  await clickButtonWithText(page, 'Return to home');
  await new Promise(r => setTimeout(r, 1000));

  // Fee Calculator / Modals if any
  const feeCalc = await clickButtonWithText(page, 'Fee Calculator');
  if (feeCalc) {
    await new Promise(r => setTimeout(r, 600));
    console.log('Capturing 12-fee-calculator-modal.png...');
    await page.screenshot({ path: path.join(outDir, '12-fee-calculator-modal.png') });
  }

  await browser.close();
  console.log('All screenshots captured successfully in public/screenshots/ !');
}

run().catch(console.error);
