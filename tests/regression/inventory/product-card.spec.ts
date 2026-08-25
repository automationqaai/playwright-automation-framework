import { test } from "../../../src/fixtures/base.fixture";
import { config } from "../../../config/env.config";
import { products } from "../../../src/data/products.data";

test(
  "user should be able to add a product to cart",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    const product = products.backpack;
    const backpack = manager.inventory.product(product.name);

    await backpack.expectName(product.name);

    await backpack.expectPrice(product.price);

    await backpack.addToCart();

    await manager.header.expectCartItemCount(1);
  },
);
