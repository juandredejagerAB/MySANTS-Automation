import { test, expect } from "../../fixtures/authFixture";
import { queryDb } from "../../../utils/dbclient";
import { environmentData } from "../../../sql data/sql-data";
import type { RowDataPacket } from "mysql2";

test("Verify if Student exists in DB", async ({ env }) => {
  const Id = environmentData[env].wilmoduleId01;

  const rows = await queryDb(
    `select 
    wm.Id AS Id,
    wm.Status,
    wm.Step,
    wp.Id AS WIlPlacementId,
    ap.Id AS AssessorplacementId,
    wv.Id AS WILVisitId,
    wvd.Id AS WILVisitdateID
from appwilmodules wm
LEFT join appwilplacements wp on wm.Id = wp.WILModuleId
LEFT join appassessorplacements ap on wp.Id = ap.WIlPlacementId
LEFT join appwilvisits wv on wm.Id = wv.wilmoduleId
LEFT join appwilvisitdates wvd on wv.Id = wvd.WIlVisitId
where wm.Id = ?`,
    [Id],
    env
  );

  console.log(rows);

  const rowsArray = rows as RowDataPacket[] as Array<Record<string, any>>;
  expect(Array.isArray(rowsArray)).toBe(true);
  expect(rowsArray.length).toBeGreaterThan(0);

  const moduleIds = new Set(rowsArray.map((r) => String(r.Id)));
  expect(moduleIds.size).toBe(1);
  expect([...moduleIds][0]).toBe(Id);

  const placementIds = Array.from(
    new Set(rowsArray.map((r) => r.WIlPlacementId).filter(Boolean))
  );
  const visitDateIds = Array.from(
    new Set(rowsArray.map((r) => r.WILVisitdateID).filter(Boolean))
  );
  console.log("placements:", placementIds, "visitDates:", visitDateIds);
});
