import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class AcademicProgressPage extends BasePage {
  // Administration Navigation
  private nav = new NavBar(this.page);
  private readonly searchInput: Locator;
  private readonly actionsButton: Locator;
  private readonly loginAsUserButton: Locator;
  private readonly impersonatorNavItem: Locator;

  // Programme Navigation
  private readonly myProgrammeLink: Locator;
  private readonly enrolmentsLink: Locator;
  private readonly academicProgressLink: Locator;

  // Academic Progress Content
  private readonly academicProgressHeading: Locator;
  private readonly programmeHeading: Locator;
  private readonly curriculumMappingTab: Locator;
  private readonly curriculumMappingContent: Locator;
  private readonly academicProgressTab: Locator;
  private readonly noTranscriptHeading: Locator;
  private readonly noTranscriptMessage: Locator;

  // Transcript specific locators
  private readonly academicRecordTab: Locator;
  private readonly academicTranscriptTab: Locator;
  private readonly academicRecordButton: Locator;
  private readonly academicTranscriptButton: Locator;
  private readonly transcriptContent: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize Administration locators
    this.searchInput = page.getByPlaceholder("Search");
    this.actionsButton = page
      .getByRole("row", { name: " Actions" })
      .getByRole("button")
      .first();
    this.loginAsUserButton = page.getByRole("button", {
      name: "Log in with this user",
    });
    this.impersonatorNavItem = page.locator(
      "abp-back-to-impersonator-nav-item a"
    );

    // Initialize Programme locators
    this.myProgrammeLink = page.locator("a", { hasText: "My Programme" });
    this.enrolmentsLink = page.getByRole("link", { name: "Enrolments" });
    this.academicProgressLink = page.getByRole("link", {
      name: "Academic Progress",
    });

    // Initialize Content locators
    this.academicProgressHeading = page.getByRole("heading", {
      name: "Academic Progress",
    });
    this.programmeHeading = page.locator("app-page-header  p");
    this.curriculumMappingTab = page.locator("li", {
      hasText: "Curriculum Mapping",
    });
    this.curriculumMappingContent = page.locator("app-tabs");
    this.academicProgressTab = page
      .locator("small")
      .filter({ hasText: "Academic Progress" });
    this.noTranscriptHeading = page.getByRole("heading", {
      name: "No Academic Transcript",
    });
    this.noTranscriptMessage = page.getByRole("paragraph");

    // Initialize Transcript locators
    this.academicRecordTab = page
      .locator("app-tabs")
      .getByText("Academic record");
    this.academicTranscriptTab = page
      .locator("app-tabs")
      .getByText("Academic Transcript");
    this.academicRecordButton = page.getByRole("button", {
      name: " Academic Record",
    });
    this.academicTranscriptButton = page.getByRole("button", {
      name: " Academic Transcript",
    });
    this.transcriptContent = page.locator("app-tabs");
  }

  async loginAsStudent(studentEmail: string) {
    await this.nav.goToUsers();
    await this.searchInput.fill(studentEmail);
    await expect(this.actionsButton).toBeVisible();
    await this.actionsButton.click();
    await this.loginAsUserButton.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.impersonatorNavItem).toBeVisible();
  }

  async navigateToAcademicProgress() {
    await this.navbar.goToAcademicProgress();
  }

  async verifyCurriculumMapping() {
    await expect(this.academicProgressHeading).toBeVisible();
    await expect(this.programmeHeading).toContainText(
      "Diploma in Grade R Teaching (Dip Gr R T)"
    );
    await expect(this.curriculumMappingTab).toBeVisible();
    await this.curriculumMappingTab.click();
    await expect(this.curriculumMappingContent).toContainText(
      "Code Modules Requirements Year Semester Status Credits"
    );
  }

  async verifyNoTranscript() {
    await this.academicProgressTab.click();
    await expect(this.noTranscriptHeading).toBeVisible();
    await expect(this.noTranscriptMessage).toContainText(
      "You do not have an academic transcript"
    );
  }

  async verifyTranscript() {
    await this.academicProgressTab.click();
    await expect(this.transcriptContent).toContainText(
      "Academic RecordAcademic Transcript Code Modules Requirements Marks Credits Status"
    );
    await expect(this.academicRecordButton).toBeVisible();
    await expect(this.academicTranscriptButton).toBeVisible();
  }
}
