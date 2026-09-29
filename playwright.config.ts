import { defineConfig, devices } from "@playwright/test";
import { config } from "./config/env.config";
import { getAuthStatePath } from "./src/setup/auth-state";

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

  reporter: process.env.CI
    ? [["list"], ["blob"], ["allure-playwright"]]
    : [["list"], ["html", { open: "never" }], ["allure-playwright"]],

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
      name: "setup",
      testDir: "./src/setup",
      testMatch: /.*auth\.setup\.ts/,
    },

    {
      name: "chromium",
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: getAuthStatePath("standard"),
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Firefox"],
        storageState: getAuthStatePath("standard"),
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Safari"],
        storageState: getAuthStatePath("standard"),
      },
      dependencies: ["setup"],
    },
  ],
});
