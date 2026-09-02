import { test } from "../../../src/fixtures/base.fixture";
import { users } from "../../../src/data/user.data";

test(
  "invalid password should prevent login",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(users.invalid.username, users.invalid.password);

    await manager.login.expectLoginError(
      "Epic sadface: Username and password do not match any user in this service",
    );
  },
);

test(
  "locked-out user should not be able to login",
  {
    tag: ["@regression", "@critical"],
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(
      users.lockedOut.username,
      users.lockedOut.password,
    );

    await manager.login.expectLoginError(
      "Sorry, this user has been blocked out.",
    );
  },
);

test(
  "empty username should prevent login",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login("", users.standard.password);

    await manager.login.expectLoginError("Username is required");
  },
);

test(
  "empty password should prevent login",
  {
    tag: "@regression",
  },
  async ({ manager }) => {
    await manager.login.goto();

    await manager.login.login(users.standard.username, "");

    await manager.login.expectLoginError("Password is required");
  },
);
