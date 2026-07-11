# Playwright Automation Framework — Alison Kate Lachica

A Playwright end-to-end test automation framework built using the 
Page Object Model pattern, targeting SauceDemo (saucedemo.com). 
Tests run automatically on every push via GitHub Actions.

---

## About This Project

I have a background in full stack web development and I'm now 
building hands-on experience in QA and test automation. This 
framework demonstrates my ability to build a structured, maintainable 
automation framework from scratch.

---

## Application Under Test

**App:** SauceDemo — https://www.saucedemo.com  
**Type:** E-commerce web application  
**Test Account:** standard_user  

---

## Framework Structure

```plaintext
playwright-automation/
├── pages/          ← Page Object Model classes
├── tests/          ← test spec files
├── test-data/      ← JSON test data
├── utils/          ← helper functions
├── config/         ← environment configs
├── reports/        ← HTML test reports
└── .github/        ← GitHub Actions CI/CD
```

---

## Test Coverage

| Feature | Test Cases |
|---------|-----------|
| Login | 6 |
| Shopping Cart | 7 |
| E2E | 3 |
| API | 10 |
| **Total** | **26** |

---

## How to Run Locally

Install dependencies:

    npm install

Run all tests:

    npx playwright test

Run with browser visible:

    npx playwright test --headed

View test report:

    npx playwright show-report

---

## CI/CD

Tests run automatically on every push to main via GitHub Actions.

---

## Tools Used

- Playwright — test automation framework
- JavaScript — programming language
- Page Object Model — design pattern
- GitHub Actions — CI/CD pipeline
- VS Code — code editor

---

## Contact

GitHub: https://github.com/alizonekreate