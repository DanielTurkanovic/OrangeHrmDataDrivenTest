import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/?lang=en_US',
    /*storageState: 'auth.json',*/
    testIdAttribute: 'data-tab-item',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    trace: 'retain-on-failure',
    actionTimeout: 60000,
  },

  reporter: [
    ['html'],
    ['json', { outputFile: 'json-test-report.json' }],
  ],

  projects: [
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
