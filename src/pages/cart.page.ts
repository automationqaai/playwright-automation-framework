import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.locator(".cart_item");

    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });

    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async expectProductVisible(productName: string): Promise<void> {
    const product = this.cartItems.filter({
      hasText: productName,
    });

    await expect(product).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.cartItems.filter({
      hasText: productName,
    });

    await product
      .getByRole("button", {
        name: /Remove/i,
      })
      .click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
