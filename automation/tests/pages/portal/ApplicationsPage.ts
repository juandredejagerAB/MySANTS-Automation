import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { NavBar } from "../components/NavBar";

export class ApplicationsPage extends BasePage {
  private nav = new NavBar(this.page);
  readonly applicationsPageHeading: Locator;
  readonly searchInput: Locator;
  readonly applicationsTable: Locator;
  readonly downloadCsvButton: Button;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);
    this.applicationsPageHeading = page.getByRole("heading", {
      name: "Applications",
    });
    this.searchInput = page.getByPlaceholder("Search");
    this.applicationsTable = page.getByRole("table");
    this.downloadCsvButton = Button.byName(page, "Export");
  }

  async gotoApplications(): Promise<void> {
    await this.nav.goToMyApplications();
    await this.applicationsPageHeading.waitFor();
  }

  async searchApplicant(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press("Refresh");
    await this.applicationsTable.waitFor();
  }

  async downloadCsv(): Promise<void> {
    await this.downloadCsvButton.click();
  }
}
