import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class ShipmentFailuresPage extends BasePage {
  private nav = new NavBar(this.page);
  private readonly PageHeading: Locator;
  private readonly FailuresTab: Locator;
  private readonly ReturnedTab: Locator;

  constructor(page: Page) {
    super(page);
    this.PageHeading = page.getByRole("heading", { name: "Shipment Failures" });
    this.FailuresTab = page
      .getByRole("listitem")
      .filter({ hasText: /^Failures$/ });
    this.ReturnedTab = page
      .getByRole("listitem")
      .filter({ hasText: "Returned" });
  }

  async navigateToShipmentFailures() {
    await this.nav.goToShipmentFailures();
    await expect(this.PageHeading).toBeVisible();
  }

  async goToFailuresTab() {
    await this.FailuresTab.click();
  }

  async goToReturnedTab() {
    await this.ReturnedTab.click();
  }
}
