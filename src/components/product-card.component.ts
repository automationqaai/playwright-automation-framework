import { expect, Locator } from "@playwright/test";

export class ProductCard {
  private readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  private get name(): Locator {
    return this.root.locator(".inventory_item_name");
  }

  private get price(): Locator {
    return this.root.locator(".inventory_item_price");
  }

  private get addToCartButton(): Locator {
    return this.root.getByRole("button", {
      name: /Add to cart/i,
    });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() ?? "";
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent())?.trim() ?? "";
  }

  async expectName(expectedName: string): Promise<void> {
    await expect(this.name).toHaveText(expectedName);
  }

  async expectPrice(expectedPrice: string): Promise<void> {
    await expect(this.price).toHaveText(expectedPrice);
  }
}
