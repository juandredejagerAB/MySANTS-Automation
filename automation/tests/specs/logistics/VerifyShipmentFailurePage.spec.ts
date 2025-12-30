import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test } from "../../fixtures/authFixture";
import { ShipmentFailuresPage } from "../../pages/portal/ShipmentFailuresPage";

test("Shipments Failure Page Load", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const ShipmentFailures = new ShipmentFailuresPage(page);

  await ShipmentFailures.navigateToShipmentFailures();
  await ShipmentFailures.goToFailuresTab();
  await ShipmentFailures.goToReturnedTab();

  await signOut(page);
});
