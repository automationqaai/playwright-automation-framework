import { test, expect } from "@playwright/test";

test(
  "application should be accessible",
  {
    tag: "@smoke",
  },
  async ({ page }) => {
    const response = await page.goto("/");

    expect(response).not.toBeNull();

    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(/Playwright/);
  },
);
