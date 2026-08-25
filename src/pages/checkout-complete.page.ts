import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  private readonly confirmationMessage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.confirmationMessage = page.getByText("Thank you for your order!");

    this.backHomeButton = page.getByRole("button", {
      name: "Back Home",
    });
  }

  async expectOrderCompleted(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
