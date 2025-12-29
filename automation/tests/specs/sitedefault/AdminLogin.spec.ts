import { test, expect } from "../../fixtures/authFixture";
import { signOut } from "../../../utils/auth-utils";
import { NavBar } from "../../pages/components/NavBar";
import { DashboardPage } from "../../pages/portal/DashboardPage";

test("Admin can log in", async ({ page, admin }) => {
  const nav = new NavBar(page);
  const dashboard = new DashboardPage(page);
  await dashboard.verifyDashboard();
  await dashboard.verifyChip("admin");
  await nav.goToUsers();
  await signOut(page);
});
