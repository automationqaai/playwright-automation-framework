import { users } from "./user.data";
import type { LoginValidationScenario } from "./data.types";

export const loginValidationScenarios: LoginValidationScenario[] = [
  {
    name: "invalid password should prevent login",
    username: users.invalid.username,
    password: users.invalid.password,
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
    tags: "@regression",
  },
  {
    name: "locked-out user should not be able to login",
    username: users.lockedOut.username,
    password: users.lockedOut.password,
    expectedError: "Sorry, this user has been locked out.",
    tags: ["@regression", "@critical"],
  },
  {
    name: "empty username should prevent login",
    username: "",
    password: users.standard.password,
    expectedError: "Username is required",
    tags: "@regression",
  },
  {
    name: "empty password should prevent login",
    username: users.standard.username,
    password: "",
    expectedError: "Password is required",
    tags: "@regression",
  },
];
