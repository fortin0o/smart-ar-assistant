import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function compileMarker() {
  console.log('Starting dev server and compiling marker...');
  
  // Start the dev server
  const { spawn } = await import('child_process');
  const devServer = spawn('npm', ['run', 'dev'], {
    cwd: 'D:\\Projects\\three-js',
    shell: true,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  // Wait for dev server to be ready
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Dev server timeout')), 60000);
    
    devServer.stdout?.on('data', (data: Buffer) => {
      const text = data.toString();
      console.log(`[dev] ${text.trim()}`);
      if (text.includes('Ready in') || text.includes('Local:') || text.includes('started server')) {
        clearTimeout(timeout);
        setTimeout(resolve, 3000); // Extra time for full startup
      }
    });
    
    devServer.stderr?.on('data', (data: Buffer) => {
      console.error(`[dev-err] ${data.toString().trim()}`);
    });
  });

  console.log('Dev server ready, launching browser...');
  
  // Launch browser and compile
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Listen for download
  const downloadPromise = page.waitForEvent('download');
  
  await page.goto('http://localhost:3000/dev/compile');
  
  // Click compile button
  await page.click('button:has-text("Compile Marker")');
  
  // Wait for download
  const download = await downloadPromise;
  
  // Save the file
  const savePath = path.join('D:\\Projects\\three-js\\public\\ar\\marker.mind');
  await download.saveAs(savePath);
  console.log(`Marker saved to: ${savePath}`);
  
  await browser.close();
  
  // Kill dev server
  process.kill(-devServer.pid!);
  
  console.log('Done!');
}

compileMarker().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
