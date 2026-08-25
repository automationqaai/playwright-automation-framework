import { test } from "../../src/fixtures/base.fixture";
import { config } from "../../config/env.config";

test(
  "standard user should be able to login",
  {
    tag: ["@smoke", "@critical"],
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    await manager.inventory.expectPageLoaded();
  },
);
