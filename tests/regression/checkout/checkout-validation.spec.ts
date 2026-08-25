import { test } from "../../../src/fixtures/base.fixture";
import { config } from "../../../config/env.config";
import { checkoutData } from "../../../src/data/checkout.data";
import { products } from "../../../src/data/products.data";

test(
  "first name is required during checkout",
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
    const customer = checkoutData.standardCustomer;

    await manager.inventory.product(product.name).addToCart();

    await manager.header.openCart();

    await manager.cart.checkout();

    await manager.checkoutInformation.fillCustomerInformation(
      "",
      customer.lastName,
      customer.postalCode,
    );

    await manager.checkoutInformation.continue();

    await manager.checkoutInformation.expectError("First Name is required");
  },
);

test(
  "last name is required during checkout",
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
    const customer = checkoutData.standardCustomer;

    await manager.inventory.product(product.name).addToCart();

    await manager.header.openCart();

    await manager.cart.checkout();

    await manager.checkoutInformation.fillCustomerInformation(
      customer.firstName,
      "",
      customer.postalCode,
    );

    await manager.checkoutInformation.continue();

    await manager.checkoutInformation.expectError("Last Name is required");
  },
);

test(
  "postal code is required during checkout",
  {
    tag: ["@regression", "@critical"],
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      config.credentials.username,
      config.credentials.password,
    );

    const product = products.backpack;
    const customer = checkoutData.standardCustomer;

    await manager.inventory.product(product.name).addToCart();

    await manager.header.openCart();

    await manager.cart.checkout();

    await manager.checkoutInformation.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      "",
    );

    await manager.checkoutInformation.continue();

    await manager.checkoutInformation.expectError("Postal Code is required");
  },
);
