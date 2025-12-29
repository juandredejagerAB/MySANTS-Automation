import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { MyApplicationsPage } from "../../pages/portal/MyApplicationsPage";

test("Admit Application", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const myApplicationsPage = new MyApplicationsPage(page);

  await myApplicationsPage.navigateToApplications();
  await myApplicationsPage.searchAndFilterApplications("autoN");
  await myApplicationsPage.verifyReviewReadyStatus();

  await myApplicationsPage.openApplicationDetails();
  const email = await myApplicationsPage.getEmailFromDetails();

  await myApplicationsPage.verifyDocuments();
  await myApplicationsPage.acceptApplication();
  await myApplicationsPage.setRegistrationFeePaid();
  await myApplicationsPage.admitApplicant();

  await myApplicationsPage.verifyUserCreated(email);
  await signOut(page);
});
