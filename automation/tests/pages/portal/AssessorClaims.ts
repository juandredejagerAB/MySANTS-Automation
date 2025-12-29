import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { NavBar } from "../components/NavBar";
import path from "path";

export class AssessorClaimsPage extends BasePage {
  private readonly nav: NavBar;

  private readonly pageHeading: Locator;
  private readonly exportButton: Button;
  private readonly overviewReport: Locator;
  private readonly breakdownReport: Locator;
  private readonly newClaimButton: Button;

  private readonly assessorDropdown: Locator;
  private readonly wilModuleDropdown: Locator;
  private readonly travelDateInput: Locator;
  private readonly travelDistanceInput: Locator;
  private readonly logSheetUpload: Locator;
  private readonly addExpenseButton: Button;
  private readonly expenseDateInput: Locator;
  private readonly expenseTypeDropdown: Locator;
  private readonly expenseDescriptionInput: Locator;
  private readonly expenseAmountInput: Locator;
  private readonly expenseFileUpload: Locator;
  private readonly submitButton: Button;
  private readonly cancelButton: Button;
  private readonly table: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);
    this.pageHeading = page.getByRole("heading", { name: "Assessor Claims" });
    this.exportButton = Button.byName(page, "Export");
    this.overviewReport = page.locator("text=Assessor Claim Overview Report");
    this.breakdownReport = page.locator("text=Assessor Claim Breakdown Report");
    this.newClaimButton = Button.byName(page, "New Claim");

    this.assessorDropdown = page.getByLabel("Assessor");
    this.wilModuleDropdown = page.getByLabel("WIL Module");
    this.travelDateInput = page.getByLabel("Select Date").first();
    this.travelDistanceInput = page.getByPlaceholder("Enter Travel Distance");
    this.logSheetUpload = page.locator('input[type="file"]').first();
    this.addExpenseButton = Button.byName(page, "+ Add Expense");
    this.expenseDateInput = page.getByLabel("Select Date").last();
    this.expenseTypeDropdown = page.getByLabel("Select Type");
    this.expenseDescriptionInput = page.getByPlaceholder("Description");
    this.expenseAmountInput = page.getByPlaceholder("Amount");
    this.expenseFileUpload = page.locator('input[type="file"]').last();
    this.submitButton = Button.byName(page, "Submit");
    this.cancelButton = Button.byName(page, "Cancel");

    this.table = page.locator("datatable-body");
  }

  async navigate(): Promise<void> {
    await this.nav.goToAssessorClaims();
    await this.verifyPage();
  }

  async verifyPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async verifyExportOptions(): Promise<void> {
    await this.exportButton.click();
    await expect(this.overviewReport).toBeVisible();
    await expect(this.breakdownReport).toBeVisible();
    await this.page.keyboard.press("Escape");
  }

  async createNewClaim(assessor: string): Promise<void> {
    const filePath = path.join(__dirname, "../../../automation/Test_Documents/Test_Dummy.pdf");

    await this.newClaimButton.click();
    await expect(this.page.locator("text=New Assessor Claim")).toBeVisible();

    await this.assessorDropdown.click();
    await this.page.getByRole("option", { name: assessor, exact: false }).click();

    const wilOptions = await this.wilModuleDropdown.locator("option").count();
    if (wilOptions <= 1) {
      console.warn("No WIL Modules assigned for this assessor. Skipping claim test.");
      await this.cancelButton.click();
      return;
    }

    await this.wilModuleDropdown.selectOption({ index: 1 });
    await this.travelDateInput.fill("2025-11-04");
    await this.travelDistanceInput.fill("120");
    await this.logSheetUpload.setInputFiles(filePath);

    await this.addExpenseButton.click();
    await expect(this.page.locator("text=Add Expense")).toBeVisible();
    await this.expenseDateInput.fill("2025-11-03");
    await this.expenseTypeDropdown.selectOption("Airtime");
    await this.expenseDescriptionInput.fill("Automation test expense");
    await this.expenseAmountInput.fill("250");
    await this.expenseFileUpload.setInputFiles(filePath);

    await this.submitButton.click();
    await this.submitButton.click();

    await expect(this.table).toContainText(assessor);
  }
}