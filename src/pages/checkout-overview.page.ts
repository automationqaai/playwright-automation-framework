import { expect, Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  private readonly summaryItems: Locator;
  private readonly subtotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    this.summaryItems = page.locator(".cart_item");

    this.subtotal = page.getByTestId("subtotal-label");

    this.tax = page.getByTestId("tax-label");

    this.total = page.getByTestId("total-label");

    this.finishButton = page.getByRole("button", {
      name: "Finish",
    });

    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
    });
  }

  async expectProductVisible(productName: string): Promise<void> {
    const product = this.summaryItems.filter({
      hasText: productName,
    });

    await expect(product).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.summaryItems.count();
  }

  async getSubtotal(): Promise<string> {
    return (await this.subtotal.textContent())?.trim() ?? "";
  }

  async getTax(): Promise<string> {
    return (await this.tax.textContent())?.trim() ?? "";
  }

  async getTotal(): Promise<string> {
    return (await this.total.textContent())?.trim() ?? "";
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
