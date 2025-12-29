import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class DashboardPage extends BasePage {
  private readonly DashboardHeading: Locator;
  private readonly RoleChip: Locator;

  constructor(page: Page) {
    super(page);
    this.DashboardHeading = page.getByRole("heading", { name: "Dashboard" });
    this.RoleChip = page.locator("app-chip > div > small");
  }

  async verifyDashboard() {
    await expect(this.DashboardHeading).toBeVisible();
  }

  async verifyChip(Role: string) {
    await expect(this.RoleChip).toBeVisible();
    await expect(this.RoleChip).toContainText(Role);
  }
}
