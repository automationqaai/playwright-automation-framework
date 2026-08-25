import { expect, Locator, Page } from "@playwright/test";

export class HeaderComponent {
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;

  constructor(page: Page) {
    this.cartLink = page.getByTestId("shopping-cart-link");

    this.cartBadge = page.getByTestId("shopping-cart-badge");

    this.menuButton = page.getByRole("button", {
      name: "Open Menu",
    });
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartItemCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible().catch(() => false))) {
      return 0;
    }

    const count = await this.cartBadge.textContent();

    return Number(count ?? 0);
  }

  async expectCartItemCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }

    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }
}
