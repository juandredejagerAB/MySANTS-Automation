import { test } from "../../fixtures/authFixture";
import { AssessorClaimsPage } from "../../pages/portal/AssessorClaims";
import { signOut } from "../../../utils/auth-utils";

test("Assessor Creates New Claim", async ({ page, assessor }) => {
  const assessorClaims = new AssessorClaimsPage(page);

  await assessorClaims.navigate();
  await assessorClaims.verifyExportOptions();
  await assessorClaims.createNewClaim(assessor.username);

  await signOut(page);
});