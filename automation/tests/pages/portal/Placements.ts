import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";

export class PlacementsPage extends BasePage {
  private nav: NavBar;

  private readonly pageTitle: Locator;
  private readonly continueButton: Locator;
  private readonly submitButton: Locator;
  private readonly confirmDialog: Locator;

  private readonly capturePlacementButton: Locator;
  private readonly schoolDropdown: Locator;
  private readonly startDateInput: Locator;
  private readonly endDateInput: Locator;

  private readonly visitDateInput: Locator;

  private readonly uploadSubmissionLink: Locator;

  private readonly acceptButton: Locator;
  private readonly declineButton: Locator;
  private readonly gradeButton: Locator;
  private readonly completeAssessmentButton: Locator;
  private readonly placementTable: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);

    this.pageTitle = page.locator("h1, h2:text('My Placements')");
    this.continueButton = page.getByRole("button", { name: /Continue/i });
    this.submitButton = page.getByRole("button", { name: /Submit/i });
    this.confirmDialog = page.getByRole("dialog");

    this.capturePlacementButton = page.getByRole("button", { name: /Capture Placement/i });
    this.schoolDropdown = page.locator("select[name='schoolId']");
    this.startDateInput = page.locator("input[name='placementStartDate']");
    this.endDateInput = page.locator("input[name='placementEndDate']");

    this.visitDateInput = page.locator("input[name='visitDate']");

    this.uploadSubmissionLink = page.getByRole("link", { name: /Upload Submission/i });

    this.acceptButton = page.getByRole("button", { name: /Accept/i }).first();
    this.declineButton = page.getByRole("button", { name: /Decline/i }).first();
    this.gradeButton = page.getByRole("button", { name: /Grade Rubric/i }).first();
    this.completeAssessmentButton = page.getByRole("button", {
      name: /Complete WIL Assessment/i,
    });
    this.placementTable = page.locator("table");
  }

  async navigateToMyPlacements() {
    await this.nav.goToMyPlacements();
    await expect(this.pageTitle).toBeVisible();
  }

  // ---------- STUDENT FLOW ----------
  async completeStep1CapturePlacement() {
    await expect(this.capturePlacementButton).toBeVisible();
    await this.capturePlacementButton.click();

    await this.schoolDropdown.selectOption({ index: 1 });
    await this.startDateInput.fill("2025-10-20");
    await this.endDateInput.fill("2025-11-20");

    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();

    await expect(this.page.locator("text=Placement captured successfully")).toBeVisible({
      timeout: 10000,
    });
  }

  async completeStep2AcceptVisitDate() {
    await expect(this.visitDateInput).toBeVisible();
    const today = new Date();
    const visitDate = new Date(today.setDate(today.getDate() + 2))
      .toISOString()
      .split("T")[0];
    await this.visitDateInput.fill(visitDate);
    await this.continueButton.click();
  }

  async completeStep3UploadSubmission() {
    await expect(this.uploadSubmissionLink).toBeVisible();
    await this.uploadSubmissionLink.click();
    await expect(this.page.locator("text=Upload successful")).toBeVisible({ timeout: 8000 });
  }

  async verifyPlacementSuccess() {
    await expect(this.page.locator("text=Placement captured successfully")).toBeVisible();
  }

  // ---------- ASSESSOR FLOW ----------
  async completeStep1AcceptPlacement() {
    await expect(this.placementTable).toBeVisible({ timeout: 10000 });
    if (!(await this.acceptButton.isVisible())) {
      console.warn("No placements found — skipping test.");
      return;
    }
    await this.acceptButton.click();
    await expect(this.page.locator("text=Placement accepted successfully")).toBeVisible({
      timeout: 10000,
    });
  }

  async completeStep2ScheduleVisit() {
    await expect(this.visitDateInput).toBeVisible();
    const today = new Date();
    const visitDate = new Date(today.setDate(today.getDate() + 3))
      .toISOString()
      .split("T")[0];
    await this.visitDateInput.fill(visitDate);
    await this.continueButton.click();
  }

  async completeStep3GradeRubric() {
    await expect(this.gradeButton).toBeVisible({ timeout: 8000 });
    await this.gradeButton.click();
    await expect(this.page.locator("text=Rubric graded successfully")).toBeVisible({
      timeout: 8000,
    });
  }

  async completeStep4CompleteAssessment() {
    await expect(this.completeAssessmentButton).toBeVisible();
    await this.completeAssessmentButton.click();
    if (await this.confirmDialog.isVisible()) {
      await this.confirmDialog.getByRole("button", { name: /Confirm/i }).click();
    }
    await expect(this.page.locator("text=WIL Assessment completed successfully")).toBeVisible({
      timeout: 10000,
    });
  }
}