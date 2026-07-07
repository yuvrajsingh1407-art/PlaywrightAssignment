// // @ts-check
import { defineConfig, devices } from '@playwright/test';
export default defineConfig
  ({
    testDir: './tests',
    timeout: 40 * 1000,
    expect: { timeout: 5000 },
    reporter: 'html',
    retries: 1,

    use: {
      baseURL: 'https://eventhub.rahulshettyacademy.com',

      headless: false,
      screenshot: 'on',
      trace: 'retain-on-failure' //on ,off

    },
    projects: [
      {
        name: 'chromium',
        use: {
          viewport: null,
          launchOptions: {
            args: ["--start-maximized"]
          }
        }
      },

    ],


  });

