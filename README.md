# Playwright Automation Framework

A maintainable end-to-end test automation framework built with **Playwright and TypeScript** for [SauceDemo](https://www.saucedemo.com/). It demonstrates Page Objects, reusable components, centralized test data, authentication setup, cross-browser testing, network interception, quality checks, and CI/CD automation.

## Key Features

- Page Object Model for page-specific locators and interactions
- Manager architecture for shared framework capabilities
- Reusable UI components
- Organized and typed test data, including customer factories
- Reusable authentication setup and storage state
- Smoke, critical, regression, and end-to-end test suites
- Chromium, Firefox, and WebKit projects
- Network route interception
- TypeScript, ESLint, and Prettier quality checks
- GitHub Actions CI and nightly workflows
- Playwright and Allure reporting integration

## Technology Stack

- Playwright
- TypeScript
- Node.js and npm
- ESLint and Prettier
- Git and GitHub
- GitHub Actions
- Allure reporting

## Project Structure

```text
playwright-automation-framework/
├── .github/
│   └── workflows/
│       ├── playwright-ci.yml
│       └── playwright-nightly.yml
├── config/
│   └── env.config.ts
├── src/
│   ├── components/
│   │   ├── header.component.ts
│   │   └── product-card.component.ts
│   ├── data/
│   │   ├── checkout.data.ts
│   │   ├── data.types.ts
│   │   ├── factories/
│   │   │   └── customer.factory.ts
│   │   ├── login-validation.data.ts
│   │   ├── products.data.ts
│   │   └── user.data.ts
│   ├── fixtures/
│   │   └── base.fixture.ts
│   ├── managers/
│   │   ├── app.manager.ts
│   │   └── network.manager.ts
│   ├── pages/
│   │   ├── cart.page.ts
│   │   ├── checkout-complete.page.ts
│   │   ├── checkout-information.page.ts
│   │   ├── checkout-overview.page.ts
│   │   ├── inventory.page.ts
│   │   └── login.page.ts
│   └── setup/
│       ├── auth-state.ts
│       └── auth.setup.ts
├── tests/
│   ├── e2e/
│   │   └── checkout/
│   │       └── checkout.spec.ts
│   ├── framework/
│   │   └── route-interception.spec.ts
│   ├── regression/
│   │   ├── cart/
│   │   │   └── cart.spec.ts
│   │   ├── checkout/
│   │   │   └── checkout-validation.spec.ts
│   │   ├── inventory/
│   │   │   └── product-card.spec.ts
│   │   └── login/
│   │       └── login-negative.spec.ts
│   └── smoke/
│       ├── app-health.smoke.spec.ts
│       ├── inventory.smoke.spec.ts
│       └── login.smoke.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

The tree highlights the tracked files shared for this README. Other root-level configuration files may also exist.

## Architecture

The framework separates test scenarios, page interactions, reusable components, and shared framework responsibilities.

### Tests

The `tests/` directory organizes tests by purpose:

- `smoke/` — essential functionality checks
- `regression/` — checks for regressions in existing functionality
- `e2e/` — complete user journeys
- `framework/` — framework capability tests, including route interception

### Page Objects

The `src/pages/` directory encapsulates page-specific locators and interactions. Page Objects include login, inventory, cart, and checkout pages.

This keeps browser interaction logic separate from scenario-level assertions and makes page changes easier to maintain.

### Managers

The `src/managers/` directory contains shared framework managers:

- `AppManager` — provides access to application-level framework components
- `NetworkManager` — supports network-related capabilities such as route interception

Tests should follow the established **Manager → Page Object → Playwright** architecture rather than creating independent browser instances or duplicating page interactions.

### Components

The `src/components/` directory contains reusable UI abstractions, including the header and product card components.

### Test Data

The `src/data/` directory organizes test data and TypeScript types for users, products, checkout inputs, and login validation. The customer factory supports customer data creation.

### Fixtures and Authentication

The `src/fixtures/` directory contains the shared Playwright fixture.

The `src/setup/` directory manages authentication setup and storage-state handling. Playwright projects use the configured setup dependency to prepare authenticated test execution.

### Environment Configuration

`config/env.config.ts` manages environment configuration, while `playwright.config.ts` supplies configuration to Playwright.

## Prerequisites

- Node.js (the recorded CI configuration uses Node.js 24)
- npm
- Git
- Playwright-supported browsers and their required dependencies

## Installation

Clone the repository and enter its directory:

```bash
git clone https://github.com/automationqaai/playwright-automation-framework.git
cd playwright-automation-framework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

On Linux CI runners, install the required operating-system dependencies as well:

```bash
npx playwright install --with-deps
```

## Environment Configuration

Create a local `.env` file using `.env.example` as a template:

```dotenv
# Environment
TEST_ENV=qa

# Application
BASE_URL=https://www.saucedemo.com

# Test user
TEST_USERNAME=
TEST_PASSWORD=
```

Populate the test credentials required by your authentication setup.

**Security guidelines**

- Do not commit `.env` files containing credentials.
- Store CI secrets using the repository or organization’s approved secret-management settings.
- Keep `.env.example` limited to variable names and safe example values.
- Keep generated authentication state and other sensitive artifacts out of version control.

## Running Tests

Use the npm scripts defined in `package.json`.

| Purpose | Command |
|---|---|
| Smoke tests | `npm run test:smoke` |
| Critical tests | `npm run test:critical` |
| End-to-end tests | `npm run test:e2e` |
| Regression tests | `npm run test:regression` |
| Headed execution | `npm run test:headed` |
| Playwright UI mode | `npm run test:ui` |
| Debug mode | `npm run test:debug` |

Run tests against a specific browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run with one worker:

```bash
npx playwright test --workers=1
```

Run the configured test suite:

```bash
npx playwright test
```

## Code Quality

Run the combined quality gate:

```bash
npm run quality
```

Run checks individually:

```bash
npm run typecheck
npm run lint
npm run format:check
```

Format the codebase:

```bash
npm run format
```

The `quality` script runs TypeScript type-checking, ESLint, and Prettier checks in sequence. Additional repository safeguards may be enforced separately in CI.

## CI/CD Workflows

The repository contains two GitHub Actions workflows.

### Pull Request and Main-Branch CI

Workflow: `.github/workflows/playwright-ci.yml`

The recorded pipeline design includes:

- Quality checks before dependent test jobs
- Smoke, critical, and E2E validation for pull requests
- Cross-browser regression on the main branch
- Chromium regression sharding
- Uploaded failure diagnostics and test artifacts
- Consolidation of Playwright blob reports into a unified HTML report

### Nightly Regression

Workflow: `.github/workflows/playwright-nightly.yml`

The nightly workflow supports scheduled regression and manual execution. The recorded regression matrix includes Chromium, Firefox, and WebKit. Chromium is split across two shards, while Firefox and WebKit each run as a single shard.

These workflows provide faster feedback on pull requests and broader browser-compatibility validation after changes are merged.

## Reporting and Diagnostics

### Playwright HTML Report

Open the generated Playwright report:

```bash
npm run report
```

### Allure Report

Generate the Allure report:

```bash
npm run report:allure:generate
```

Open the generated report:

```bash
npm run report:allure:open
```

Playwright reports and failure artifacts help investigate test failures. The CI workflow also uses blob reports to consolidate results from parallel regression jobs.

## Engineering Practices

- Separate test scenarios from page interaction logic.
- Reuse Page Objects and components where they provide a clear benefit.
- Keep test data organized and typed.
- Use factories when test data needs to be generated.
- Keep environment-specific values outside test implementation.
- Reuse authentication state where appropriate.
- Isolate tests that require unauthenticated sessions.
- Use network interception for targeted framework testing.
- Preserve failure artifacts for diagnosis.
- Run code-quality checks before dependent CI test jobs.

## Troubleshooting

### Environment Variable Errors

Verify that the local `.env` file exists and contains the variables required by the selected environment.

### Browser Installation Errors

Install the required Playwright browsers and operating-system dependencies.

### Authentication Failures

Verify the test credentials, authentication setup, and storage-state configuration. Tests that validate login behavior should use the appropriate unauthenticated state.

### CI Test Failures

Inspect the failed job, Playwright report, trace, screenshot, and relevant logs. Determine whether the failure comes from application behavior, automation code, browser compatibility, or the execution environment before making changes.

## Project Status

This repository demonstrates a Playwright TypeScript automation framework with reusable architecture, organized test suites, cross-browser execution, quality checks, and CI/CD workflows. It is intended as a practical demonstration of test automation engineering practices and can be extended as requirements evolve.
