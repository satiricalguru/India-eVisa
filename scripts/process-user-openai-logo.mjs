import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function processLogo() {
  const sourcePath = '/Users/jatinpandey/.gemini/antigravity-ide/brain/dfcedb60-5e27-46d0-995d-e39f77b72961/.user_uploaded/media_1787985574843.png';
  const targetPng = path.resolve('public/openai-logo.png');
  
  // 1. Copy exact original file
  fs.copyFileSync(sourcePath, targetPng);

  // 2. Also create a transparent version so it looks great on both light and dark GitHub backgrounds
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const base64Data = fs.readFileSync(sourcePath).toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;background:transparent;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.onload = () => {
            const canvas = document.getElementById('c');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Convert near-white background to transparent, keeping black pixels crisp
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i+1];
              const b = data[i+2];
              // Luminance
              const l = 0.299 * r + 0.587 * g + 0.114 * b;
              if (l > 240) {
                data[i+3] = 0; // completely transparent
              } else if (l > 150) {
                // smooth anti-aliased edge
                data[i+3] = Math.round(255 * (1 - (l - 150) / 90));
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
              } else {
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            window.done = true;
          };
          img.src = 'data:image/png;base64,${base64Data}';
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.done === true', { timeout: 10000 });
  const canvas = await page.$('#c');
  const transparentPng = path.resolve('public/openai-logo-transparent.png');
  await canvas.screenshot({ path: transparentPng, omitBackground: true });
  
  // Also replace openai-logo.png with the clean transparent PNG
  fs.copyFileSync(transparentPng, targetPng);

  await browser.close();
  console.log('Processed and saved exact OpenAI logo to public/openai-logo.png and public/openai-logo-transparent.png');
}

processLogo().catch(console.error);
