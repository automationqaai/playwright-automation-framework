import { test } from "../../../src/fixtures/base.fixture";
import { products } from "../../../src/data/products.data";

test(
  "user should be able to add a product to cart",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.inventory.gotoInventoryPage();

    const product = products.backpack;
    const backpack = manager.inventory.product(product.name);

    await backpack.expectName(product.name);

    await backpack.expectPrice(product.price);

    await backpack.addToCart();

    await manager.header.expectCartItemCount(1);
  },
);
