import fs from 'fs';
import puppeteer from 'puppeteer-core';
import path from 'path';

function getSvg(color) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 650 180" width="650" height="180">
  <style>
    .symbol { fill: ${color}; }
    .wordmark {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-weight: 700;
      font-size: 104px;
      letter-spacing: -2px;
      fill: ${color};
    }
  </style>
  <defs>
    <path id="petal" class="symbol" d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z" />
  </defs>
  
  <!-- Flower Icon Scaled & Centered -->
  <g transform="translate(15, 10) scale(0.066)">
    <use xlink:href="#petal"/>
    <use xlink:href="#petal" transform="rotate(60 1203 1203)"/>
    <use xlink:href="#petal" transform="rotate(120 1203 1203)"/>
    <use xlink:href="#petal" transform="rotate(180 1203 1203)"/>
    <use xlink:href="#petal" transform="rotate(240 1203 1203)"/>
    <use xlink:href="#petal" transform="rotate(300 1203 1203)"/>
  </g>

  <!-- Wordmark Text -->
  <text x="200" y="126" class="wordmark">OpenAI</text>
</svg>
`;
}

async function render() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 650, height: 180, deviceScaleFactor: 3 },
    args: ['--no-sandbox']
  });

  // 1. Black version (Light mode)
  const lightSvg = getSvg('#000000');
  fs.writeFileSync(path.resolve('public/openai-logo.svg'), lightSvg, 'utf8');
  fs.writeFileSync(path.resolve('public/openai-logo-light.svg'), lightSvg, 'utf8');

  let page = await browser.newPage();
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${lightSvg}</body></html>`);
  await page.screenshot({ path: path.resolve('public/openai-logo-light.png'), omitBackground: true });
  await page.screenshot({ path: path.resolve('public/openai-logo.png'), omitBackground: true });

  // 2. White version (Dark mode)
  const darkSvg = getSvg('#FFFFFF');
  fs.writeFileSync(path.resolve('public/openai-logo-dark.svg'), darkSvg, 'utf8');

  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${darkSvg}</body></html>`);
  await page.screenshot({ path: path.resolve('public/openai-logo-dark.png'), omitBackground: true });

  await browser.close();
  console.log('Successfully generated perfect light & dark OpenAI logos!');
}

render().catch(console.error);
