import { Page } from "@playwright/test";

import { HeaderComponent } from "../components/header.component";
import { CartPage } from "../pages/cart.page";
import { CheckoutCompletePage } from "../pages/checkout-complete.page";
import { CheckoutInformationPage } from "../pages/checkout-information.page";
import { CheckoutOverviewPage } from "../pages/checkout-overview.page";
import { InventoryPage } from "../pages/inventory.page";
import { LoginPage } from "../pages/login.page";

export class AppManager {
  readonly login: LoginPage;
  readonly inventory: InventoryPage;
  readonly cart: CartPage;
  readonly header: HeaderComponent;
  readonly checkoutInformation: CheckoutInformationPage;
  readonly checkoutOverview: CheckoutOverviewPage;
  readonly checkoutComplete: CheckoutCompletePage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.inventory = new InventoryPage(page);
    this.cart = new CartPage(page);
    this.header = new HeaderComponent(page);
    this.checkoutInformation = new CheckoutInformationPage(page);
    this.checkoutOverview = new CheckoutOverviewPage(page);
    this.checkoutComplete = new CheckoutCompletePage(page);
  }
}
