import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { NavBar } from "../../pages/components/NavBar";
import { PlagiarismPage } from "../../pages/portal/PlagiarismPage";

test("Plagiarism Scales", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo)();
  const nav = new NavBar(page);
  const plagiarism = new PlagiarismPage(page);

  await nav.goToPlagiarismScales();
  await plagiarism.verifyPageVisible();
  await plagiarism.verifyContainerContains(
    "Plagiarism ScalesSeverityExtent of irregularity by proctoring software Mild  Less than 30%  View  Delete  Moderate  Between 30% and 50%  View  Delete  Serious  More than 50% but less than 75%  View  Delete  Severe  More than 75%. Copying from another student (duplication of answers). More than twice offended in same module.  View  Delete  4 total  1 "
  );
  await plagiarism.openRowActionsByRowName("Mild Less than 30%");
  await plagiarism.clickView();
  await plagiarism.verifyPlagiarismScaleInfoVisible();
  await plagiarism.verifyFormContains();
  await plagiarism.cancelDialog();
  await plagiarism.verifyPageVisible();

  await signOut(page);
});
