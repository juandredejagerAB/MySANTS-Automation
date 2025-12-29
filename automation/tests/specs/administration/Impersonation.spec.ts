import { getGlobals } from "../../../utils/getGlobals";
import { test, expect } from "../../fixtures/authFixture";
import { StudentOnboardingPage } from "../../pages/portal/StudentOnboardingPage";

test("Impersonation", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const onboarding = new StudentOnboardingPage(page);
  const email = globals.transcriptStudent;
  await onboarding.loginAsStudent(email);
});
