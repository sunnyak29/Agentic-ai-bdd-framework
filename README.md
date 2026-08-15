# BDD Automation Framework

Cucumber BDD Agentic AI Automation Framework using Playwright and JavaScript.

## Project Status

This project is currently under active development.

### ✅ Completed
- Playwright + Cucumber BDD framework
- Page Object Model (POM)
- Cross-browser support
- Jira & Confluence integration

### 🚧 In Progress
- Environment-based configuration
- Reusable Playwright Helper
- HTML Reporting
- Agentic AI Planner
- AI Test Generator
- AI Test Healer
- Xray integration
- Advanced reporting

## Project Overview

This repository contains an **enterprise-grade Agentic AI BDD automation framework** built using **Playwright**, **Cucumber**, and **JavaScript**. The framework follows the **Page Object Model (POM)** design pattern .

The framework is designed to support both traditional test automation and AI-assisted QA workflows through reusable framework components, centralized helper utilities, and modular architecture.

### Key Features

- Cucumber BDD with Gherkin feature files
- Playwright for modern cross-browser automation
- JavaScript (Node.js)
- Page Object Model (POM)
- Reusable Playwright Helper Library
- Centralized Base Page architecture
- Environment-based configuration using `.env`
- Cross-browser execution (Chromium, Firefox, WebKit)
- Parallel test execution
- HTML reporting
- Screenshot, video, and trace capture
- Modular and scalable framework design
- Easy integration with CI/CD pipelines
- Agentic AI-ready architecture for intelligent test planning, automation generation, and self-healing capabilities


---

## Project Structure
## Project Structure

```text
agentic-ai-bdd-framework/
├── src/
│   ├── base/
│   │   ├── base.page.js                 # Base page with shared functionality
│   │   └── config.js                    # Configuration loader (.env)
│   │
│   ├── helpers/
│   │   └── playwright.helper.js         # Reusable Playwright helper methods
│   │
│   ├── pages/
│   │   ├── login.page.js
│   │   ├── dashboard.page.js
│   │   └── ...
│   │
│   └── utils/
│       └── generate-html-report.js      # HTML report generator
│
├── test/
│   ├── features/
│   │   ├── login.feature
│   │   ├── dashboard.feature
│   │   └── ...
│   │
│   └── steps/
│       ├── login.steps.js
│       ├── dashboard.steps.js
│       └── ...
│
├── support/
│   └── hooks.js                         # Cucumber hooks (screenshots, videos, traces)
│
├── reports/                             # Test reports and execution artifacts
├── screenshots/                         # Failure screenshots
├── videos/                              # Recorded execution videos
├── traces/                              # Playwright trace files
│
├── .env.example                         # Environment configuration template
├── cucumber.js                          # Cucumber configuration
├── package.json                         # Project dependencies and scripts
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
