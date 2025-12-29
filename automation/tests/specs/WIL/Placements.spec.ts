import { test, expect } from "../../fixtures/authFixture.ts";
import { NavBar } from "../../pages/components/NavBar.ts";
import { signOut } from "../../../utils/auth-utils.ts";
import { SchoolPage } from "../../pages/portal/WILSchoolPage.ts";
import { PlacementsPage } from "../../pages/portal/Placements.ts";

test.describe("WIL Placements Automation Flow", () => {


  test("WIL Student – Capture Placement", async ({ page, willStudent }, testInfo) => {
    const placements = new PlacementsPage(page);

    await placements.navigateToMyPlacements();
    await placements.completeStep1CapturePlacement();
    await signOut(page);
  });

  test("Assessor – Accept and Process Placement", async ({ page, assessor }, testInfo) => {
    const placements = new PlacementsPage(page);

    await placements.navigateToMyPlacements();
    await placements.completeStep1AcceptPlacement();
    await placements.completeStep2ScheduleVisit();

    await signOut(page);
  });

  test("WIL Student – Accept WIL Visit", async ({ page, willStudent }, testInfo) => {
    const placements = new PlacementsPage(page);

    await placements.navigateToMyPlacements();
    await placements.completeStep2AcceptVisitDate();
    await placements.completeStep3UploadSubmission();
    await placements.verifyPlacementSuccess();
    await signOut(page);
  });

test("Assessor – Complete Placement", async ({ page, assessor }, testInfo) => {
    const placements = new PlacementsPage(page);

    await placements.completeStep3GradeRubric();
    await placements.completeStep4CompleteAssessment();
    await signOut(page);
  });
});
