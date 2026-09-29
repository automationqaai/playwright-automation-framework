import { test } from "../../../src/fixtures/base.fixture";
import { loginValidationScenarios } from "../../../src/data/login-validation.data";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

for (const scenario of loginValidationScenarios) {
  test(
    scenario.name,
    {
      tag: scenario.tags,
    },
    async ({ manager }) => {
      await manager.login.goto();

      await manager.login.login(scenario.username, scenario.password);

      await manager.login.expectLoginError(scenario.expectedError);
    },
  );
}
