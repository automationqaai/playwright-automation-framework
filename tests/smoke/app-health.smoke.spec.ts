import { expect, test } from "@playwright/test";

test(
  "application should be reachable",
  {
    tag: "@smoke",
  },
  async ({ page }) => {
    const response = await page.goto("/");

    expect(response).not.toBeNull();
    expect(response?.ok()).toBeTruthy();
  },
);
