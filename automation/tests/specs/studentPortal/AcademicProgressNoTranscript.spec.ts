import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test } from "../../fixtures/authFixture";
import { AcademicProgressPage } from "../../pages/portal/AcademicProgressPage";

test("Student Academic Progress with No Transcript", async ({
  page,
  admin,
}, testInfo) => {
  const globals = getGlobals(testInfo)();
  const academicProgress = new AcademicProgressPage(page);

  await academicProgress.loginAsStudent(globals.notranscriptStudent);
  await academicProgress.navigateToAcademicProgress();
  await academicProgress.verifyCurriculumMapping();
  await academicProgress.verifyNoTranscript();

  await signOut(page);
});
