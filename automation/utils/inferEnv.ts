import type { TestInfo } from "@playwright/test";
import { environmentSecrets } from "../../secrets";

export type Env = keyof typeof environmentSecrets;

export function inferEnv(projectName: string): Env {
  if (projectName.includes("DEV")) return "DEV";
  if (projectName.includes("UAT")) return "UAT";
  if (projectName.includes("STG")) return "STG";
  if (projectName.includes("PROD")) return "PROD";
  return "DEV"; // fallback
}
