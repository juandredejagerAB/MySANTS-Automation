import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { NavBar } from "../components/NavBar";

export class SchoolPage extends BasePage {
  private nav = new NavBar(this.page);
  readonly PageHeading: Locator;
  readonly createNewSchoolButton: Button;
  readonly searchInput: Locator;
  readonly Table: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);
    this.PageHeading = page.getByRole("heading", { name: "Schools" });
    this.createNewSchoolButton = Button.byName(page, "New School");
    this.searchInput = page.getByPlaceholder("Search");
    this.Table = page.getByRole("table");
  }

  async goToViaMenu(): Promise<void> {
    await this.nav.goToSchools();
    await this.PageHeading.waitFor();
    await this.Table.waitFor();
  }

  async goToViaLink(): Promise<void> {
    await this.page.goto("/wil/schools");
  }

  async searchSchool(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.Table.waitFor();
  }

  async createNewSchoolButtonClick(): Promise<void> {
    await this.createNewSchoolButton.click();
  }
}
