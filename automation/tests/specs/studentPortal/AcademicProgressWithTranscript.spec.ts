import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test } from "../../fixtures/authFixture";
import { AcademicProgressPage } from "../../pages/portal/AcademicProgressPage";

test("Student Academic Progress with Transcript", async ({
  page,
  admin,
}, testInfo) => {
  const globals = getGlobals(testInfo);
  const academicProgress = new AcademicProgressPage(page);

  await academicProgress.loginAsStudent(globals.transcriptStudent);
  await academicProgress.navigateToAcademicProgress();
  await academicProgress.verifyCurriculumMapping();
  await academicProgress.verifyTranscript();

  await signOut(page);
});
