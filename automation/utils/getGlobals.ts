import { environmentSecrets } from "../../config";
import type { TestInfo } from "@playwright/test";

// Define valid environment keys
type EnvironmentKey = keyof typeof environmentSecrets;

// Define the environment configuration type
type EnvironmentConfig = (typeof environmentSecrets)[EnvironmentKey];

export function getGlobals(testInfo: TestInfo): EnvironmentConfig {
  const envMap = {
    DEV: environmentSecrets.DEV,
    UAT: environmentSecrets.UAT,
    PROD: environmentSecrets.PROD,
    STG: environmentSecrets.STG,
  } as const;

  const matchedKey = (Object.keys(envMap) as EnvironmentKey[]).find((key) =>
    testInfo.project.name.includes(key)
  );

  if (!matchedKey) {
    throw new Error("Unknown project: " + testInfo.project.name);
  }

  return envMap[matchedKey];
}
