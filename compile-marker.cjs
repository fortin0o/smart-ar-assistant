const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise(function(resolve, reject) {
        const req = http.get(url, function(res) { resolve(); });
        req.on('error', function() { reject(); });
        req.setTimeout(2000, function() { req.destroy(); reject(); });
      });
      return true;
    } catch (e) {
      await new Promise(function(r) { setTimeout(r, 1000); });
    }
  }
  return false;
}

(async () => {
  console.log('Waiting for dev server at http://localhost:3000...');
  const ready = await waitForServer('http://localhost:3000/dev/compile', 60000);
  if (!ready) {
    console.error('Dev server not ready. Please start it manually: npm run dev');
    process.exit(1);
  }
  console.log('Dev server is ready');

  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Donald\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win\\chrome.exe',
    headless: true
  });

  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  const downloadPromise = page.waitForEvent('download', { timeout: 180000 });

  console.log('Navigating to compile page...');
  await page.goto('http://localhost:3000/dev/compile', { waitUntil: 'networkidle' });

  console.log('Clicking compile button...');
  await page.waitForSelector('button', { timeout: 10000 });
  const buttons = await page.locator('button').all();
  let clicked = false;
  for (const btn of buttons) {
    const text = await btn.textContent();
    if (text && text.includes('Compile')) {
      await btn.click();
      clicked = true;
      console.log('Clicked Compile!');
      break;
    }
  }
  if (!clicked) {
    console.log('Trying first button...');
    await page.locator('button').first().click();
  }

  console.log('Waiting for download (may take 30-120s)...');
  const download = await downloadPromise;

  const savePath = 'D:\\Projects\\three-js\\public\\ar\\marker.mind';
  await download.saveAs(savePath);
  console.log('Saved marker to: ' + savePath);

  await browser.close();
  console.log('Done!');
})().catch(function(e) {
  console.error('Error:', e);
  process.exit(1);
});
