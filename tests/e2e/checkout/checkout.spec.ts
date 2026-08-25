import { test } from "../../../src/fixtures/base.fixture";
import { config } from "../../../config/env.config";
import { checkoutData } from "../../../src/data/checkout.data";
import { products } from "../../../src/data/products.data";

test(
  "standard user should be able to complete a purchase",
  {
    tag: ["@e2e", "@critical"],
  },
  async ({ manager }) => {
    // Login
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    // Add product
    const product = products.backpack;
    const customer = checkoutData.standardCustomer;
    const backpack = manager.inventory.product(product.name);

    await backpack.addToCart();

    await manager.header.expectCartItemCount(1);

    // Cart
    await manager.header.openCart();

    await manager.cart.expectProductVisible(product.name);

    // Checkout information
    await manager.cart.checkout();

    await manager.checkoutInformation.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );

    await manager.checkoutInformation.continue();

    // Checkout overview
    await manager.checkoutOverview.expectProductVisible(product.name);

    // Complete order
    await manager.checkoutOverview.finish();

    await manager.checkoutComplete.expectOrderCompleted();
  },
);
