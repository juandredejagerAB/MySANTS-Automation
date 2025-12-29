import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { ProgrammePage } from "../../pages/portal/ProgrammePage";

test("Programme Management", async ({ page, admin }, testInfo) => {
  const programmePage = new ProgrammePage(page);

  await programmePage.navigateToProgrammes();
  await programmePage.searchProgramme("GR R T");
  await programmePage.verifySearchResults("1");
  await programmePage.verifyProgrammeDetails();

  await programmePage.openProgrammeConfiguration();
  await programmePage.verifyProgrammeConfiguration();

  await programmePage.openProgrammeModules();
  await programmePage.verifyModuleTableHeaders();

  await programmePage.cancelAddModule();
  await programmePage.cancelAddModuleGroup();

  await signOut(page);
});
