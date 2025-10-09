# OrangeHRM Data-Driven Playwright Test

Automated tests for [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) using **Playwright** and **TypeScript**.

## Setup

1. Clone repo:
   ```bash
    git clone https://github.com/DanielTurkanovic/OrangeHrmDataDrivenTest.git
    cd orangehrmdatadriventest
2. Install dependencies:
    npm install
3. Run tests:
    npx playwright test
4. View report:
    npx playwright show-report

## Project Structure

├── pages/              # Page Object Model classes (e.g., MyInfoPage.ts)
├── tests/              # Test files using Playwright test runner
├── utils/              # Helpers, Excel reader, setup files
├── testData/           # Excel files used for data-driven tests
│   ├── loginSheet.xlsx
│   └── personalDetails.xlsx
├── package.json        # Dependencies and scripts
├── .gitignore          # Specifies which files/folders to exclude from Git
└── README.md           # Project documentation

# (Auto-generated after running tests)
# ├── test-results/       # Test output (not tracked by Git)
# ├── playwright-report/  # HTML reports (not tracked by Git)

## Description:

This framework demonstrates data-driven testing using Playwright and Excel files (xlsx).
Each test reads data from Excel and automatically fills forms on the OrangeHRM demo site.

## Technologies Used:

Playwright
TypeScript
XLSX

## Author:

Daniel Turkanovic

## Notes

test-results/ and playwright-report/ are auto-generated folders and not tracked by Git.
testData/ contains Excel files needed for the tests. Make sure they are included when cloning or downloading the repository.

