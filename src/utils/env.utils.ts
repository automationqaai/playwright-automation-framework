export function getEnv(name: string, required = true): string {
  const value = process.env[name];

  if (required && !value) {
    throw new Error(`Required environment variable "${name}" is not defined.`);
  }

  return value ?? "";
}
