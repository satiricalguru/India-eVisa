import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function renderWithPdfJs() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 900, height: 1300, deviceScaleFactor: 2 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const pdfBytes = fs.readFileSync(path.resolve('India-eVisa-ETA-ETV-2026-98312.pdf'));
  const pdfBase64 = pdfBytes.toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 20px;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #pdf-canvas {
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <canvas id="pdf-canvas"></canvas>
        <script>
          const pdfData = atob("${pdfBase64}");
          const uint8Array = new Uint8Array(pdfData.length);
          for (let i = 0; i < pdfData.length; i++) {
            uint8Array[i] = pdfData.charCodeAt(i);
          }

          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          pdfjsLib.getDocument({ data: uint8Array }).promise.then(pdf => {
            return pdf.getPage(1);
          }).then(page => {
            const scale = 1.4;
            const viewport = page.getViewport({ scale });
            const canvas = document.getElementById('pdf-canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            return page.render(renderContext).promise;
          }).then(() => {
            window.rendered = true;
          });
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.rendered === true', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 800));

  const canvas = await page.$('#pdf-canvas');
  const outPath = path.resolve('public/screenshots/sample-eta-pdf-preview.png');
  await canvas.screenshot({ path: outPath });

  await browser.close();
  console.log('Successfully rendered pixel-perfect PDF preview to:', outPath);
}

renderWithPdfJs().catch(console.error);
