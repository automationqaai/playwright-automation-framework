import dotenv from "dotenv";

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is not defined.`);
  }

  return value;
}

export const config = {
  environment: process.env.TEST_ENV ?? "qa",

  baseUrl: getRequiredEnv("BASE_URL"),

  credentials: {
    username: getRequiredEnv("TEST_USERNAME"),
    password: getRequiredEnv("TEST_PASSWORD"),
  },

  api: {
    baseUrl: process.env.API_BASE_URL ?? "",
  },
} as const;
