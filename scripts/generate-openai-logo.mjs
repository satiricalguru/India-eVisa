import fs from 'fs';
import puppeteer from 'puppeteer-core';
import path from 'path';

// Standard official SVG lockup for OpenAI
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <style>
    .mark { fill: #000000; }
    .text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 700; font-size: 64px; letter-spacing: -1.5px; fill: #000000; }
    @media (prefers-color-scheme: dark) {
      .mark, .text { fill: #ffffff; }
    }
  </style>
  <g transform="translate(15, 10)">
    <!-- OpenAI icon 100x100 -->
    <svg width="100" height="100" viewBox="0 0 24 24" class="mark">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.475 4.475 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4702 4.4702 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5976 3.8558L13.1038 8.364 15.124 7.1955a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4104-.6624zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6608zm-12.641-4.135a4.475 4.475 0 0 1 2.8765 1.0408l-.1419.0805-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V6.0886a4.504 4.504 0 0 1 4.4944-4.4963zm.7948 7.0776l3.0137 1.7395v3.479l-3.0137 1.7395-3.0137-1.7395v-3.479z"/>
    </svg>
  </g>
  <!-- Text Wordmark -->
  <text x="140" y="80" class="text">OpenAI</text>
</svg>`;

fs.writeFileSync(path.resolve('public/openai-logo.svg'), svgContent, 'utf8');

async function renderPng() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 520, height: 120, deviceScaleFactor: 2 },
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${svgContent}</body></html>`);
  await page.screenshot({ path: 'public/openai-logo.png', omitBackground: true });
  await browser.close();
  console.log('Successfully generated public/openai-logo.svg and public/openai-logo.png!');
}

renderPng().catch(console.error);
