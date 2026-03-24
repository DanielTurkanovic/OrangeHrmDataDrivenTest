# OrangeHRM Data-Driven Playwright Test

[![Playwright Tests](https://github.com/DanielTurkanovic/OrangeHrmDataDrivenTest/actions/workflows/playwright.yml/badge.svg)](https://github.com/DanielTurkanovic/OrangeHrmDataDrivenTest/actions)

Automated tests for [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) using **Playwright** and **TypeScript**.

## Setup
<ul>
1. Clone repo:
<ul>
   <li>git clone https://github.com/DanielTurkanovic/OrangeHrmDataDrivenTest.git</li>
   <li>cd orangehrmdatadriventest</li>
</ul>
2. Install dependencies:
<ul>
   <li>npm install</li>
</ul>
3. Run tests:
<ul>
   <li>npx playwright test</li>
</ul>
4. View report:
<ul>
   <li>npx playwright show-report</li>
</ul>
</ul>

<p><strong>Project Structure</strong></p>
<pre>
Project Structure
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI/CD configuration for GitHub Actions
├── pages/           # Page Object Model classes (npr. MyInfoPage.ts)
├── tests/           # Test files using Playwright test runner
├── utils/           # Helpers, Excel reader, setup files
├── testData/        # Excel files used for data-driven tests
│   ├── loginSheet.xlsx
│   └── personalDetails.xlsx
├── package.json     # Dependencies and scripts
├── .gitignore       # Specifies which files/folders to exclude from Git
└── README.md        # Project documentation
</pre>

## Description:

This framework demonstrates data-driven testing using Playwright and Excel files (xlsx).
Each test reads data from Excel and automatically fills forms on the OrangeHRM demo site.

## Technologies Used:

<ul>
<ul>
   <li>Playwright (Automation Engine)</li>
   <li>TypeScript (Programming Language)</li>
   <li>XLSX (Excel Data Parsing)</li>
   <li>GitHub Actions (CI/CD Pipeline)</li>
</ul>
</ul>

## Author:

Daniel Turkanovic

## Notes

test-results/ and playwright-report/ are auto-generated folders and not tracked by Git.
testData/ contains Excel files needed for the tests. Make sure they are included when cloning or downloading the repository.

