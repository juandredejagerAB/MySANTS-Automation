import { test, expect } from "../../fixtures/authFixture";
import { NavBar } from "../../pages/components/NavBar";
import { AssessorDetailsPage } from "../../pages/portal/AssessorDetails";
import { signOut } from "../../../utils/auth-utils";
import { getGlobals } from "../../../utils/getGlobals";

test("Assessor Details – Verify All Tabs", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const assessorPage = new AssessorDetailsPage(page);

  const nav = new NavBar(page);

  await assessorPage.goToAssessors();

  await assessorPage.openFirstAssessor();

  await assessorPage.verifyAssessorInfoTab();
  await assessorPage.verifyGeneralInfoTab();
  await assessorPage.verifyQualificationsTab();
  await assessorPage.verifyAllowedProgrammesTab();
  await assessorPage.verifyLinkedCitiesTab();
  await assessorPage.verifyLinkedSchoolsTab();
  await assessorPage.verifyExperienceTab();
  await assessorPage.verifyDocumentsTab();

  await signOut(page);
});