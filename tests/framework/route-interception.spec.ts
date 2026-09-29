import { test, expect } from "../../src/fixtures/base.fixture";

test(
  "inventory remains functional when image requests are blocked",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.network.blockImages();

    await manager.inventory.gotoInventoryPage();

    await manager.inventory.expectPageLoaded();

    const productCount = await manager.inventory.getProductCount();

    expect(productCount).toBe(6);
  },
);
