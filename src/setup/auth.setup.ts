import { test as setup, expect } from "@playwright/test";

import { config } from "../../config/env.config";
import { getAuthStatePath } from "./auth-state";

setup("authenticate standard user", async ({ page }) => {
  await page.goto(config.baseUrl);

  await page.getByPlaceholder("Username").fill(config.credentials.username);
  await page.getByPlaceholder("Password").fill(config.credentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByTestId("title")).toHaveText("Products");

  await page.context().storageState({
    path: getAuthStatePath("standard"),
  });
});
