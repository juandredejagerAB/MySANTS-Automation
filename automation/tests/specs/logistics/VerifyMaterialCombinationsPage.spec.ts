import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test } from "../../fixtures/authFixture";
import { MaterialCombinationsPage } from "../../pages/portal/MaterialCombinationsPage";

test("Material Combinations Page Load", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const Logistics = new MaterialCombinationsPage(page);

  await Logistics.navigateToMaterialCombinationsPage();
  await Logistics.goToReportingTab();
  await Logistics.goToMaterialCombinationsTab();

  await signOut(page);
});
