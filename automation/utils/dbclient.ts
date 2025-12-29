// utils/dbClient.ts

import mysql from "mysql2/promise";
import { environmentSecrets } from "../../secrets";
import { inferEnv, type Env } from "./inferEnv";

function getDbConfig(env?: Env) {
  const key =
    env ?? inferEnv(process.env.DB_ENV || process.env.NODE_ENV || "DEV");
  const cfg = environmentSecrets[key];

  return {
    host: cfg.dbhost,
    user: cfg.dbuser,
    password: cfg.dbpassword,
    database: cfg.dbname,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export async function queryDb(query: string, params: any[] = [], env?: Env) {
  const cfg = getDbConfig(env);

  console.log("Connecting to DB:", cfg.host, cfg.database, cfg.user);
  console.log("Running query:", query, params);

  const connection = await mysql.createConnection(cfg);

  try {
    const [rows] = await connection.execute(query, params);
    console.log("Query result:", rows);
    return rows;
  } finally {
    await connection.end();
  }
}
