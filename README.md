# BDD Automation Framework

Cucumber BDD automation framework using Playwright and Javascript .

## Project Overview

This repository contains a BDD test framework that automates common user journeys on the ParaBank demo application:
- User registration
- User login
- Account balance retrieval
- Error handling and validation

Tech stack:
- Playwright (browser automation)
- Cucumber (@cucumber/cucumber) for BDD feature files
- Node.js (JavaScript)
- Page Object Model (POM)

---

## Project Structure

```
parabank-automation/
├── src/
│   ├── base/
│   │   └── config.js                # Configuration loader (reads .env)
│   └── utils/
│       ├── generate-html-report.js  # Report generator for artifacts
│       └── playwright.helper.js     # Playwright helper wrappers
├── test/
│   ├── features/
│   │   └── parabank.feature         # Gherkin feature file(s)
│   ├── steps/
│   │   └── parabank.steps.js        # Step definitions
│   └── pages/
│       ├── base.page.js             # Base page object (uses helper)
│       ├── login.page.js            # Registration page object
│       └── account.page.js          # Account page object
├── support/
│   └── hooks.js                     # Cucumber hooks (screenshots, traces, videos)
├── reports/                          # Test artifacts and generated reports (runtime)
├── cucumber.js                       # Cucumber CLI configuration
├── package.json                      # Scripts and dependencies
└── README.md
```

---

## Configuration (.env)

Copy `.env.example` to `.env` and adjust values as needed. Key variables:

```
BROWSER=chromium
HEADLESS=true
SLOWMO=0
TIMEOUT=10000
NAVIGATION_TIMEOUT=30000
RECORD_VIDEO=false
PARALLEL_WORKERS=2
CUCUMBER_TAGS=@test
BASE_URL=https://parabank.parasoft.com/parabank
```

---

## Quick Start

1. Install dependencies and browsers:

```bash
npm install
npx playwright install
```

2. Configure environment:

```bash
cp .env.example .env
# edit .env if needed
```

3. Run tests (default script runs Cucumber):

```bash
npm run cucumberTest
```

Run specific tags or change runtime variables inline:

```bash
CUCUMBER_TAGS=@smoke npm run cucumberTest
HEADLESS=false npm run cucumberTest
BROWSER=firefox npm run cucumberTest
```

4. Generate the consolidated report (after test run):

```bash
npm run cucumberReport
# output report is placed under reports/
```
