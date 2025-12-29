import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/buttons";
import { Console } from "console";
import exp from "constants";

export class MyApplicationsPage extends BasePage {
  private nav = new NavBar(this.page);
  // Search and Filters
  private readonly searchInput: Locator;
  private readonly advancedFiltersLink: Locator;
  private readonly statusDropdown: Locator;
  private readonly refreshButton: Locator;
  private readonly ApplicationsPageHeading: Locator;
  private readonly UsersHeading: Locator;

  // Application Details
  private readonly viewRow: Locator;
  private readonly emailElement: Locator;
  private readonly acceptApplicationButton: Locator;
  private readonly acceptConfirmButton: Locator;
  private readonly acceptedChip: Locator;
  private readonly DocumentsTab: Locator;
  private readonly iddocumentVerificationCheckboxes: Locator;
  private readonly transcriptVerificationCheckboxes: Locator;
  private readonly employmentVerificationCheckboxes: Locator;
  private readonly VerifyDocumentsButton: Locator;

  // Tabs and Actions
  private readonly financialTab: Locator;
  private readonly generalInfoTab: Locator;
  private readonly setPaidButton: Locator;
  private readonly confirmPaidButton: Locator;
  private readonly admitApplicantButton: Locator;
  private readonly admitButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize all locators
    this.ApplicationsPageHeading = page.getByRole("heading", {
      name: "Applications",
    });
    this.UsersHeading = page.getByRole("heading", { name: "Users" });
    this.searchInput = page.getByPlaceholder("Search");
    this.advancedFiltersLink = page.getByRole("link", {
      name: "Advanced filters",
    });
    this.statusDropdown = page.getByLabel("Status");
    this.refreshButton = page.getByRole("button", { name: "Refresh" });
    this.DocumentsTab = page.locator("small").filter({ hasText: "Documents" });
    this.viewRow = page.locator(".datatable-body-cell-label").first();
    this.emailElement = page.locator(
      "app-application-details-form > form > div.mt-5 > div > div.col-md-6.col-12.mb-3 > app-input-text > app-labelled-text > p > span"
    );
    this.acceptApplicationButton = page.getByRole("button", { name: "Accept" });
    this.acceptConfirmButton = page.locator("#confirm");
    this.acceptedChip = page
      .locator("app-chip")
      .filter({ hasText: "Accepted" })
      .locator("div");
    this.financialTab = page.locator("li").filter({ hasText: "Financial" });
    this.generalInfoTab = page
      .locator("li")
      .filter({ hasText: "General Info" });
    this.setPaidButton = page
      .getByRole("button", { name: "Set as Paid" })
      .nth(1);
    this.confirmPaidButton = page.getByRole("button", { name: "Confirm" });
    this.admitApplicantButton = page.getByRole("button", { name: "Admit" });
    this.admitButton = page.getByRole("button", { name: "Admit" });
    this.iddocumentVerificationCheckboxes = page.locator(
      "div:nth-child(5) > app-document-card"
    );
    this.transcriptVerificationCheckboxes = page.locator(
      "div:nth-child(6) > app-document-card"
    );
    this.employmentVerificationCheckboxes = page.locator(
      "div:nth-child(7) > app-document-card"
    );
    this.VerifyDocumentsButton = page.getByRole("button", {
      name: " Verify Document",
    });
  }

  async navigateToApplications() {
    await this.navbar.goToMyApplications();
    await expect(this.ApplicationsPageHeading).toBeVisible();
  }

  async searchAndFilterApplications(searchText: string) {
    await this.searchInput.click();
    await this.searchInput.fill(searchText);
    await this.advancedFiltersLink.click();
    await this.statusDropdown.selectOption("2: 2");
    await this.refreshButton.click();
    await this.advancedFiltersLink.click();
  }

  async verifyReviewReadyStatus() {
    await expect(this.page.locator("datatable-scroller")).toContainText(
      "Review ready"
    );
  }

  async openApplicationDetails() {
    await this.viewRow.click();
  }

  async getEmailFromDetails(): Promise<string> {
    const emailText = await this.emailElement.textContent();
    const email = emailText?.match(/\S+@maildrop\.cc/)?.[0];
    expect(email).toContain("@maildrop.cc");
    if (!email) {
      throw new Error("Email was not found on the page.");
    }
    console.log(`Extracted Email: ${email}`);
    return email;
  }

  async verifyDocuments() {
    await this.DocumentsTab.click();
    await this.iddocumentVerificationCheckboxes.click();
    await this.VerifyDocumentsButton.click();
    await this.transcriptVerificationCheckboxes.click();
    await this.VerifyDocumentsButton.click();
    await this.employmentVerificationCheckboxes.click();
    await this.VerifyDocumentsButton.click();
  }

  async acceptApplication() {
    await this.acceptApplicationButton.click();
    await this.acceptConfirmButton.click();
    await this.page.waitForTimeout(3000);
    await expect(this.acceptedChip).toBeVisible();
  }

  async setRegistrationFeePaid() {
    await this.financialTab.click();
    await this.page.waitForTimeout(2000);
    await this.setPaidButton.click();
    await this.confirmPaidButton.click();
    await this.page.waitForTimeout(2000);
  }

  async admitApplicant() {
    await this.generalInfoTab.click();
    await this.admitApplicantButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Admit Applicant" })
    ).toBeVisible();
    await expect(
      this.page.getByText("You are about to admit the")
    ).toBeVisible();
    await this.admitButton.click();
    await this.page.waitForTimeout(5000);
    await expect(this.ApplicationsPageHeading).toBeVisible();
  }

  async verifyUserCreated(email: string) {
    await this.nav.goToUsers();
    await expect(this.UsersHeading).toBeVisible();
    await this.searchInput.fill(email);

    await expect(this.page.locator("datatable-footer")).toContainText(
      "1 total"
    );
    await expect(
      this.page
        .locator("datatable-body-cell:nth-child(3)")
        .filter({ hasText: email })
    ).toBeVisible();
  }
}
