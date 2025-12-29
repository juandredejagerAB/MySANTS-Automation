import { Page, expect, Locator } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class AssessorDetailsPage {
  readonly page: Page;
  private nav: NavBar;

  private searchInput: Locator;
  private firstAssessorRow: Locator;

  private headerTitle: Locator;

  private tabAssessorInfo: Locator;
  private tabGeneralInfo: Locator;
  private tabQualifications: Locator;
  private tabAllowedProgrammes: Locator;
  private tabLinkedCities: Locator;
  private tabLinkedSchools: Locator;
  private tabExperience: Locator;
  private tabDocuments: Locator;

  private editButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavBar(page);

    this.searchInput = page.getByPlaceholder("Search");
    this.firstAssessorRow = page.locator("datatable-body-row").first();

    this.headerTitle = page.getByRole("heading", { name: "Assessor" });

    this.tabAssessorInfo = page.getByRole("tab", { name: "Assessor Info" });
    this.tabGeneralInfo = page.getByRole("tab", { name: "General Info" });
    this.tabQualifications = page.getByRole("tab", { name: "Qualifications" });
    this.tabAllowedProgrammes = page.getByRole("tab", { name: "Allowed Programmes" });
    this.tabLinkedCities = page.getByRole("tab", { name: "Linked Cities" });
    this.tabLinkedSchools = page.getByRole("tab", { name: "Linked Schools" });
    this.tabExperience = page.getByRole("tab", { name: "Experience" });
    this.tabDocuments = page.getByRole("tab", { name: "Documents" });

    this.editButton = page.getByRole("button", { name: "Edit" });
  }

  async goToAssessors() {
    await this.nav.goToWilAssessors();
    await expect(this.page.getByRole("heading", { name: "Assessors" })).toBeVisible();
  }

  async openFirstAssessor() {
    await this.firstAssessorRow.click();
    await expect(this.headerTitle).toBeVisible();
  }

  async verifyTabLoads(tab: Locator) {
    await tab.click();
    await expect(tab).toHaveClass(/active/);
    await expect(this.editButton).toBeVisible();
  }

  async verifyAssessorInfoTab() {
    await this.verifyTabLoads(this.tabAssessorInfo);
    await expect(this.page.getByText("Max Travel Distance")).toBeVisible();
  }

  async verifyGeneralInfoTab() {
    await this.verifyTabLoads(this.tabGeneralInfo);
    await expect(this.page.getByText("Personal Info")).toBeVisible();
  }

  async verifyQualificationsTab() {
    await this.verifyTabLoads(this.tabQualifications);
    await expect(this.page.getByText("Highest Qualification")).toBeVisible();
  }

  async verifyAllowedProgrammesTab() {
    await this.verifyTabLoads(this.tabAllowedProgrammes);
    await expect(this.page.getByText("Bachelor of Education")).toBeVisible();
  }

  async verifyLinkedCitiesTab() {
    await this.verifyTabLoads(this.tabLinkedCities);
    await expect(this.page.getByText("Linked Cities")).toBeVisible();
  }

  async verifyLinkedSchoolsTab() {
    await this.verifyTabLoads(this.tabLinkedSchools);
    await expect(this.page.getByText("Linked Schools")).toBeVisible();
  }

  async verifyExperienceTab() {
    await this.verifyTabLoads(this.tabExperience);
    await expect(this.page.getByText("Teaching Experience")).toBeVisible();
  }

  async verifyDocumentsTab() {
    await this.verifyTabLoads(this.tabDocuments);
    await expect(this.page.getByRole("button", { name: "Upload" })).toBeVisible();
  }
}