import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, acceptCookies: boolean = true) {
    super(page, acceptCookies); // pass acceptCookies to BasePage
    this.usernameInput = page.getByPlaceholder("Email Address");
    this.passwordInput = page.getByPlaceholder("Password");
    this.submitButton = page.locator('button[type="submit"]');
  }

  /**
   * Fill in username & password, click submit, and wait for navigation.
   * @param username your adminUsername from fixtures/config
   * @param password your adminPassword from fixtures/config
   */
  async loginAs(username: string, password: string) {
    await this.page.goto("/");

    // Fill and submit
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    console.log(`Logging in as ${username}`);

    await Promise.all([this.submitButton.click()]);

    // Wait for landing and optionally accept cookie banner
    await this.waitForLanding();
  }
}
