import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class MaterialCombinationsPage extends BasePage {
  private nav = new NavBar(this.page);
  private readonly PageHeading: Locator;
  private readonly MaterialCombinationsTabHeading: Locator;
  private readonly ReportingTabHeading: Locator;
  private readonly MaterialCombinationsTab: Locator;
  private readonly ReportingTab: Locator;
  private readonly CreatePaxiShipmentButton: Locator;
  private readonly UpdateTrakingNumberButton: Locator;

  constructor(page: Page) {
    super(page);
    this.PageHeading = page.getByRole("heading", { name: "Logistics" });
    this.MaterialCombinationsTab = page
      .locator("#top")
      .getByRole("listitem")
      .filter({ hasText: "Material Combinations" });
    this.ReportingTab = page
      .getByRole("listitem")
      .filter({ hasText: "Reporting" });
    this.MaterialCombinationsTabHeading = page.getByRole("heading", {
      name: "Material Combinations",
    });
    this.ReportingTabHeading = page.getByRole("heading", {
      name: "Shipment Status Report",
    });
    this.CreatePaxiShipmentButton = page.getByRole("button", {
      name: " Create PAXI Shipment",
    });
    this.UpdateTrakingNumberButton = page.getByRole("button", {
      name: " Update Tracking Number",
    });
  }

  async navigateToMaterialCombinationsPage() {
    await this.nav.goToMaterialCombinations();
    await expect(this.PageHeading).toBeVisible();
    await expect(this.MaterialCombinationsTabHeading).toBeVisible();
  }

  async goToReportingTab() {
    await this.ReportingTab.click();
    await expect(this.ReportingTabHeading).toBeVisible();
  }

  async goToMaterialCombinationsTab() {
    await this.MaterialCombinationsTab.click();
    await expect(this.MaterialCombinationsTabHeading).toBeVisible();
    await expect(this.CreatePaxiShipmentButton).toBeVisible();
    await expect(this.UpdateTrakingNumberButton).toBeVisible();
  }
}
