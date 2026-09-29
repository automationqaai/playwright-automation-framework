import path from "path";

export type AuthUser = "standard";

export function getAuthStatePath(user: AuthUser): string {
  return path.join(process.cwd(), "playwright", ".auth", `${user}-user.json`);
}
