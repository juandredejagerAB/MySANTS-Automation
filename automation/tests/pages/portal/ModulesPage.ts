import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class ModulesPage extends BasePage {
  // Navigation
  private readonly viewAllModulesButton: Locator;

  // List view
  private readonly moduleHeading: Locator;
  private readonly advancedFiltersLink: Locator;
  private readonly searchInput: Locator;
  private readonly newModuleButton: Locator;

  // Module Form
  private readonly modalHeader: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;
  private readonly closeButton: Locator;

  // Module Details
  private readonly markersTab: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.viewAllModulesButton = page.locator("#view-all-modules");
    this.moduleHeading = page.getByRole("heading", { name: "Modules" }).first();
    this.advancedFiltersLink = page.getByRole("link", {
      name: "Advanced filters",
    });
    this.searchInput = page.getByPlaceholder("Search");
    this.newModuleButton = page.getByRole("button", { name: "New" });
    this.modalHeader = page.locator("#abp-modal-header");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.closeButton = page.getByLabel("Close");
    this.markersTab = page.locator("#top").getByText("Markers");
  }

  async navigateToModules() {
    await this.navbar.goToModules();
  }

  async verifyModulesList() {
    await expect(this.advancedFiltersLink).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.newModuleButton).toBeVisible();
  }

  async openNewModuleForm() {
    await this.viewAllModulesButton.click();
    await this.newModuleButton.click();
    await expect(this.modalHeader).toBeVisible();
  }

  async verifyNewModuleForm() {
    const formFields = [
      "Name *",
      "Code *",
      "Description *",
      "Launch Date",
      "Discontinue Date",
      "Credits",
      "Is Conversational Competence",
      "Minimum Pass Grade",
      "Supplementary Pass Rate",
      "Fee",
      "Language",
      "NQF Level",
      "Default Template ID",
      "Has Study Material",
      "WIL Module",
      "Waive Fees",
    ];

    for (const field of formFields) {
      await expect(
        this.page.locator("#module").getByText(field, { exact: true })
      ).toBeVisible();
    }
  }

  async searchModule(searchText: string) {
    await this.searchInput.click();
    await this.searchInput.fill(searchText);
  }

  async verifySearchResults(totalCount: string) {
    await expect(this.page.locator("datatable-footer")).toContainText(
      `${totalCount} total`
    );
  }

  async openModuleDetails(moduleCode: string) {
    await this.page.getByText(moduleCode).click();
    await expect(
      this.page.getByRole("heading", { name: "Module Details" })
    ).toBeVisible();
    await expect(
      this.page.locator("app-page-header", { hasText: moduleCode })
    ).toBeVisible();
  }

  async verifyModuleDetails() {
    const details = [
      "Name Academic Literacy",
      "Code B-ALI",
      "Launch Date",
      "Discontinue Date",
      "Language of Content",
      "Credits",
      "Minimum Pass Grade",
      "Supplementary Pass Grade",
      "NQF Level",
      "Module Fee (R)",
    ];

    for (const detail of details) {
      await expect(this.page.getByText(detail, { exact: false })).toBeVisible();
    }
  }

  async addLecturer() {
    await this.page.getByText("Lecturers").click();
    await expect(
      this.page.getByRole("heading", { name: "Lecturers" })
    ).toBeVisible();
    await this.page.getByRole("button", { name: "Add Lecturer" }).click();
    await expect(
      this.page.getByRole("heading", { name: "Add Lecturer" })
    ).toBeVisible();
  }

  async addMarker() {
    await this.markersTab.click();
    await expect(
      this.page.getByRole("heading", { name: "Markers" })
    ).toBeVisible();
    await this.page.getByRole("button", { name: " Add Marker" }).click();
    await expect(this.page.locator("#abp-modal-body")).toContainText(
      "Add Module Marker"
    );
  }

  async closeModals() {
    await this.cancelButton.click();
    await this.page.waitForTimeout(1000);
  }
}
