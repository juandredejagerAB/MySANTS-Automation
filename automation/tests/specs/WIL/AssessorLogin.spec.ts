import { test, expect } from "../../fixtures/authFixture";
import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { DashboardPage } from "../../pages/portal/DashboardPage";

test("Login As Assessor", async ({ page, assessor }, testInfo) => {
  const dashboard = new DashboardPage(page);
  await dashboard.verifyDashboard();
  await dashboard.verifyChip("WILAssessor");
  await signOut(page);
});
