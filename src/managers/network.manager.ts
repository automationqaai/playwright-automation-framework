import type { Page } from "@playwright/test";

export class NetworkManager {
  constructor(private readonly page: Page) {}

  async blockImages(): Promise<void> {
    await this.page.route("**/*.{png,jpg,jpeg,webp}", (route) => route.abort());
  }

  async unblockImages(): Promise<void> {
    await this.page.unroute("**/*.{png,jpg,jpeg,webp}");
  }
}
