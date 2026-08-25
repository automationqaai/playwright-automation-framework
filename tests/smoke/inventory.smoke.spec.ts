import { test, expect } from "../../src/fixtures/base.fixture";
import { config } from "../../config/env.config";

test(
  "standard user should see inventory products",
  {
    tag: "@smoke",
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    await manager.inventory.expectPageLoaded();

    const productCount = await manager.inventory.getProductCount();

    expect(productCount).toBe(6);
  },
);
