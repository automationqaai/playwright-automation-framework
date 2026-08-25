import { test as base } from "@playwright/test";

import { AppManager } from "../managers/app.manager";

type FrameworkFixtures = {
  manager: AppManager;
};

export const test = base.extend<FrameworkFixtures>({
  manager: async ({ page }, use) => {
    await use(new AppManager(page));
  },
});

export { expect } from "@playwright/test";
