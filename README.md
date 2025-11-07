# Playwright Automation Practice Suite
A comprehensive **Playwright TypeScript** test suite for the **[Test Automation Practice Site ](https://testautomationpractice.blogspot.com/)** — perfect for learning end-to-end testing, handling forms, alerts, popups, drag-and-drop, sliders, tables and more.

---

## Features

- **Randomized Input Data** – Avoids hardcoding with dynamic strings, emails, dates, and selections.
- **Full Widget Coverage** – Forms, checkboxes, dropdowns, multi-selects, date pickers, alerts, popups, sliders, drag-drop.
- **Navigation Testing** – Top navigation links (Home, Udemy, Blog, etc.).
- **AJAX & Hidden Elements** – Handles dynamic content and toggle interactions.
- **File Uploads, Tables, Pagination** – Real-world UI automation scenarios.
- **Clean & Modular Code** – Well-commented, reusable helpers and structured tests.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Playwright](https://playwright.dev/)

---

## Installation

```bash
git clone https://github.com/your-username/playwright-automation-practice.git
cd playwright-automation-practice
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run with UI Mode (headed + slow-mo)

```bash
npx playwright test --headed --project=chromium
```

### Run specific test file

```bash
npx playwright test 01-random-form-interactions.spec.ts --headed
```

### Generate HTML Report

```bash
npx playwright show-report
```

---

## Key Test Scenarios

| Test File | Purpose |
|---------|--------|
| `01-random-form-interactions.spec.ts` | Fills form with **random name, email, phone, address**, selects **gender, days, country, colors, animals**, sets **date pickers** |
| `02-top-navigation.spec.ts` | Validates all top nav links redirect correctly |
| `03-all-widgets-interaction.spec.ts` | Handles **alerts, confirm, prompt**, **popups**, **drag-drop**, **sliders**, **double-click** |
| `04-gui-elements-ajax.spec.ts` | Tests **AJAX loading**, **hidden elements**, **file upload**, **pagination tables**, **shadow DOM** |

---
## Resources

- [Test Automation Practice Site](https://testautomationpractice.blogspot.com/)
- [Playwright Official Docs](https://playwright.dev/)
- [Playwright GitHub](https://github.com/microsoft/playwright)

