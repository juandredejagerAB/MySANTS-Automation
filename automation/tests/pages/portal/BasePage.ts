import { Page } from "@playwright/test";
import { AcceptCookieBanner } from "../components/buttons";
import { NavBar } from "../components/NavBar";

export class BasePage {
  readonly page: Page;
  readonly cookieBanner: AcceptCookieBanner;
  readonly acceptCookies: boolean;
  protected readonly navbar: NavBar;

  constructor(page: Page, acceptCookies: boolean = true) {
    this.page = page;
    this.acceptCookies = acceptCookies;
    this.cookieBanner = new AcceptCookieBanner(page);
    this.navbar = new NavBar(page);
  }

  async waitForLanding(): Promise<void> {
    await this.page
      .getByRole("heading", { name: "Dashboard", level: 3 })
      .waitFor({ timeout: 45000 });

    if (this.acceptCookies) {
      await this.cookieBanner.accept();
    }
  }
}
