import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class ProgrammePage extends BasePage {
  private nav = new NavBar(this.page);

  // List view
  private readonly searchInput: Locator;
  private readonly advancedFiltersLink: Locator;

  // Programme details
  private readonly programmeNameCell: Locator;
  private readonly programmeCodeCell: Locator;
  private readonly categoryCell: Locator;
  private readonly programmeactionsbutton: Locator;
  private readonly deleteProgrammeButton: Locator;
  private readonly editButton: Locator;
  private readonly programmeModulesTab: Locator;

  // Module management
  private readonly addModuleButton: Locator;
  private readonly addModuleGroupButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.searchInput = page.getByPlaceholder("Search");
    this.advancedFiltersLink = page.getByRole("link", {
      name: "Advanced filters",
    });
    this.programmeNameCell = page.getByRole("cell", {
      name: "Diploma in Grade R Teaching",
    });
    this.programmeCodeCell = page.getByRole("cell", { name: "Dip Gr R T" });
    this.categoryCell = page.getByRole("cell", { name: "National Diploma" });
    this.programmeactionsbutton = page.getByRole("button", { name: "Actions" });
    this.deleteProgrammeButton = page.getByRole("button", {
      name: "Delete Programme",
    });
    this.editButton = page.getByText("Edit", { exact: true });
    this.programmeModulesTab = page.getByText("Programme Modules");
    this.addModuleButton = page.getByRole("button", {
      name: " Add Module",
      exact: true,
    });
    this.addModuleGroupButton = page.getByRole("button", {
      name: "Add Module Group",
    });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async navigateToProgrammes() {
    await this.navbar.goToProgrammeManagement();
  }

  async searchProgramme(searchText: string) {
    await this.searchInput.click();
    await this.searchInput.fill(searchText);
  }

  async verifySearchResults(expectedCount: string) {
    await expect(this.page.locator("datatable-footer")).toContainText(
      `${expectedCount} total`
    );
  }

  async verifyProgrammeDetails() {
    await expect(this.programmeNameCell).toBeVisible();
    await expect(this.programmeCodeCell).toBeVisible();
    await expect(this.categoryCell).toBeVisible();
  }

  async openProgrammeConfiguration() {
    await this.programmeCodeCell.click();
    await expect(
      this.page.getByRole("heading", { name: "Programme Configuration" })
    ).toBeVisible();
  }

  async verifyProgrammeConfiguration() {
    await this.programmeactionsbutton.click();
    await expect(this.deleteProgrammeButton).toBeVisible();
    await expect(
      this.page.locator("small").filter({ hasText: "Programme Details" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: "Programme Details" })
    ).toBeVisible();
    await expect(this.editButton).toBeVisible();
  }

  async openProgrammeModules() {
    await this.programmeModulesTab.click();
    await expect(
      this.page.getByRole("heading", { name: "Programme Modules" })
    ).toBeVisible();
  }

  async verifyModuleTableHeaders() {
    await expect(
      this.page.getByRole("columnheader", {
        name: "Sequence",
      })
    ).toBeVisible();
    await expect(
      this.page.getByRole("columnheader", { name: "Modules" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("columnheader", { name: "Prerequisites" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("columnheader", { name: "Year" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("columnheader", { name: "Semester" })
    ).toBeVisible();
  }

  async cancelAddModule() {
    await this.addModuleButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Add Programme Module" })
    ).toBeVisible();
    await this.cancelButton.click();
  }

  async cancelAddModuleGroup() {
    await this.addModuleGroupButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Programme Module Group" })
    ).toBeVisible();
    await this.cancelButton.click();
  }
}
