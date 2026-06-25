// // @ts-check
import { defineConfig, devices } from '@playwright/test';
const config=
({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: { timeout: 5000 },
  reporter: 'html',
  
 
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot:'on',
    trace:'retain-on-failure' //on ,off
    
  }

  
});
module.exports= config;
