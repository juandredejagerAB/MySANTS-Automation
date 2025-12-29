
import { Page, Locator } from '@playwright/test';

export class AcceptCookieBanner {
  private acceptButton: Locator;

  constructor(private page: Page) {
    this.acceptButton = this.page.getByRole('button', { name: 'Accept' });
  }

  async accept(): Promise<void> {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();

      // wait for the banner to disappear
      await this.acceptButton.waitFor({ state: 'detached' });
    }
  }
}

export class Button {
  constructor(public readonly locator: Locator) {}
  static byLocator(locator: Locator) {
    return new Button(locator);
  }
  static byName(page: Page, name: string | RegExp) {
    return new Button(page.getByRole('button', { name }));
  }
  async click() {
    await this.locator.click();
  }
  async isVisible() {
    return this.locator.isVisible();
  }
}