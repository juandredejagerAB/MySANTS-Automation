import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test } from "../../fixtures/authFixture";
import { StudentOnboardingPage } from "../../pages/portal/StudentOnboardingPage";

test("Student Onboarding", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const onboarding = new StudentOnboardingPage(page);

  await onboarding.searchAdmittedStudent("autoN");
  const { id, email } = await onboarding.getStudentDetails();
  await onboarding.loginAsStudent(email);

  await onboarding.completeStep1();
  await onboarding.completeStep2(id, "PTA");
  await onboarding.completeStep3();
  await onboarding.completeStep4(globals.provinceOption);
  await onboarding.completeStep5();
  await onboarding.completeStep6();

  await onboarding.verifyDashboard();
  await signOut(page);
});
