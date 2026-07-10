// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // folder where your test files live
  testDir: './tests',

  // run all tests in parallel
  fullyParallel: true,

  // fail the build if you accidentally left test.only in the code
  forbidOnly: !!process.env.CI,

  // retry failed tests once on CI
  retries: process.env.CI ? 1 : 0,

  // number of parallel workers
  workers: process.env.CI ? 1 : undefined,

  // test report — generates HTML report
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list']
  ],

  use: {
    // base URL for all tests
    baseURL: 'https://www.saucedemo.com',

    // take screenshot only when test fails
    screenshot: 'only-on-failure',

    // record video only when test fails
    video: 'retain-on-failure',

    // show browser actions in trace viewer on failure
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});