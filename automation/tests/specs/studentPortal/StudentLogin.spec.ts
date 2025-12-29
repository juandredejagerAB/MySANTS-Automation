import { test, expect } from "../../fixtures/authFixture";
import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { DashboardPage } from "../../pages/portal/DashboardPage";

test("Login As Student", async ({ page, notranscriptStudent }, testInfo) => {
  const dashboard = new DashboardPage(page);
  await dashboard.verifyDashboard();
  await signOut(page);
});
