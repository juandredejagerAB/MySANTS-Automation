import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { CreateAssessorDialog } from "./dialogs/CreateNewAssessorDialog";

export class WILAssessorPage extends BasePage {
  // Page Elements
  private readonly assessorPageHeading: Locator;
  private readonly createNewAssessorButton: Locator;
  private readonly searchInput: Locator;
  private readonly exportToExcelButton: Button;
  private readonly table: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.assessorPageHeading = page.getByRole("heading", { name: "Assessors" });
    this.createNewAssessorButton = page.getByRole("button", { name: "New" });
    this.searchInput = page.getByPlaceholder("Search");
    this.exportToExcelButton = Button.byName(page, " Export To Excel");
    this.table = page.getByRole("table");
  }

  async navigate(): Promise<void> {
    await this.navbar.goToWilAssessors();
    await this.verifyPage();
  }

  async navigateDirectly(): Promise<void> {
    await this.page.goto("/wil/assessors");
    await this.verifyPage();
  }

  async verifyPage(): Promise<void> {
    await expect(this.assessorPageHeading).toBeVisible();
    await expect(this.table).toBeVisible();
  }

  async searchAssessor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.table.waitFor();
  }

  async createNewAssessor(): Promise<CreateAssessorDialog> {
    await this.createNewAssessorButton.click();
    const dialog = new CreateAssessorDialog(this.page);
    await dialog.waitForOpen();
    return dialog;
  }

  async exportToExcel(): Promise<void> {
    await this.exportToExcelButton.click();
  }
}
