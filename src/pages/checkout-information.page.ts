import { expect, Locator, Page } from "@playwright/test";

export class CheckoutInformationPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByTestId("firstName");

    this.lastNameInput = page.getByTestId("lastName");

    this.postalCodeInput = page.getByTestId("postalCode");

    this.continueButton = page.getByRole("button", {
      name: "Continue",
    });

    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
    });

    this.errorMessage = page.getByTestId("error");
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}
