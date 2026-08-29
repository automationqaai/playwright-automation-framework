import { defineConfig, devices } from "@playwright/test";
import { config } from "./config/env.config";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  // Retry transient failures in CI, but fail immediately during local development.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  reporter: [["list"], ["html", { open: "never" }], ["allure-playwright"]],

  use: {
    baseURL: config.baseUrl,

    headless: true,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",

    actionTimeout: 10_000,

    navigationTimeout: 30_000,

    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
