import dotenv from "dotenv";

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Required environment variable "${name}" is not defined.`);
  }

  return value;
}

function getEnvironment(): string {
  return process.env.TEST_ENV?.trim() || "qa";
}

function validateBaseUrl(baseUrl: string): string {
  try {
    const url = new URL(baseUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error();
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    throw new Error(
      `BASE_URL must be a valid HTTP or HTTPS URL. Received: "${baseUrl}"`,
    );
  }
}

const baseUrl = validateBaseUrl(getRequiredEnv("BASE_URL"));

export const config = {
  environment: getEnvironment(),

  baseUrl,

  credentials: {
    username: getRequiredEnv("TEST_USERNAME"),
    password: getRequiredEnv("TEST_PASSWORD"),
  },
} as const;
