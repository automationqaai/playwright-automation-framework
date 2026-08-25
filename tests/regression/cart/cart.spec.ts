import { test } from "../../../src/fixtures/base.fixture";
import { config } from "../../../config/env.config";

test(
  "user should be able to add and remove a product from cart",
  {
    tag: ["@regression", "@critical"],
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    const backpack = manager.inventory.product("Sauce Labs Backpack");

    await backpack.addToCart();

    await manager.header.openCart();

    await manager.cart.expectProductVisible("Sauce Labs Backpack");

    await manager.header.expectCartItemCount(1);

    await manager.cart.removeProduct("Sauce Labs Backpack");

    await manager.header.expectCartItemCount(0);

    await manager.cart.expectEmpty();
  },
);
