import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";

test("Footer", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);

  await expect(page.getByText("Help FAQ Privacy Terms")).toBeVisible();
  await expect(
    page.locator(".d-flex.justify-content-center.align-items-center").first()
  ).toBeVisible();
  await signOut(page);
});
