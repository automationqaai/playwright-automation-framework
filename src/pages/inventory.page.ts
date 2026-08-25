import { expect, Locator, Page } from "@playwright/test";
import { ProductCard } from "../components/product-card.component";

export class InventoryPage {
  private readonly productsTitle: Locator;
  private readonly productCards: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.productsTitle = page.getByText("Products");

    this.productCards = page.locator(".inventory_item");

    this.sortDropdown = page.getByTestId("product-sort-container");
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.productsTitle).toBeVisible();
  }

  product(productName: string): ProductCard {
    const product = this.productCards.filter({
      hasText: productName,
    });

    return new ProductCard(product);
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }
}
