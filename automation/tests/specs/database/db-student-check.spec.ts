import { test, expect } from "../../fixtures/authFixture";
import { queryDb } from "../../../utils/dbclient";
import { environmentData } from "../../../sql data/sql-data";
import type { RowDataPacket } from "mysql2";

test("Verify if Student exists in DB", async ({ env }) => {
  const Id = environmentData[env].studentId01;

  const rows = await queryDb(
    "SELECT * FROM appstudents WHERE Id = ?",
    [Id],
    env
  );
  console.log(rows);
  expect(rows).toHaveLength(1);
  const result = rows as RowDataPacket[] as Array<{ Id: string }>;
  expect(result[0].Id).toBe(Id);
  expect(result[0].Id).toBe(Id);
});
