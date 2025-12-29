import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { NavBar } from "../components/NavBar";
import { CreateMarketerDialog } from "./dialogs/CreateNewMarketerDialog";

export class MarketerPage extends BasePage {
  private nav = new NavBar(this.page);
  readonly marketerPageHeading: Locator;
  readonly createNewMarketerButton: Button;
  readonly searchInput: Locator;
  readonly exportToExcelButton: Button;
  readonly marketerTable: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);
    this.marketerPageHeading = page.getByRole("heading", { name: "Marketers" });
    this.createNewMarketerButton = Button.byName(page, "New Marketer");
    this.searchInput = page.getByPlaceholder("Search");
    this.exportToExcelButton = Button.byName(page, " Export To Excel");
    this.marketerTable = page.getByRole("table");
  }

  async goToViaMenu(): Promise<void> {
    await this.nav.goToMarketers();
    await this.marketerPageHeading.waitFor();
    await this.marketerTable.waitFor();
  }

  async goToViaLink(): Promise<void> {
    await this.page.goto("/marketing/marketers");
  }

  async searchMarketer(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.marketerTable.waitFor();
  }

  async createNewMarketerButtonClick(): Promise<CreateMarketerDialog> {
    await this.createNewMarketerButton.click();
    const dialog = new CreateMarketerDialog(this.page);
    await dialog.waitForOpen();
    return dialog;
  }

  async exportMarkersToExcelButtonClick(): Promise<void> {
    await this.exportToExcelButton.click();
  }
}
