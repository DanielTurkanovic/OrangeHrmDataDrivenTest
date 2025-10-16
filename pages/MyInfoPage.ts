import { Page, Locator, expect } from '@playwright/test';
import { formatExcelDate } from '../utils/excelReader';

export class MyInfoPage {
  readonly page: Page;

  // Locators
  readonly myInfoTab: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly otherIdInput: Locator;
  readonly driverLicenseNumberInput: Locator;
  readonly licenseExpiryDateInput: Locator;
  readonly nationalityDropdown: Locator;
  readonly maritalStatusDropdown: Locator;
  readonly dateOfBirthInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly saveButton1: Locator;
  readonly bloodTypeDropdown: Locator;
  readonly testFieldInput: Locator;
  readonly saveButton2: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define locators
    this.myInfoTab = this.page.locator('a:has-text("My Info")');
    this.firstNameInput = this.page.locator('[name="firstName"]');
    this.middleNameInput = this.page.locator('[name="middleName"]');
    this.lastNameInput = this.page.locator('[name="lastName"]');
    this.employeeIdInput = this.page.locator('//label[contains(text(),"Employee Id")]/following::input[1]');
    this.otherIdInput = this.page.locator('//label[contains(text(),"Other Id")]/following::input[1]');
    this.driverLicenseNumberInput = this.page.locator('//label[contains(text(),"License Number")]/following::input[1]');
    this.licenseExpiryDateInput = this.page.locator('//label[contains(text(),"License Expiry Date")]/following::input[1]');
    this.nationalityDropdown = this.page.locator('//label[contains(text(),"Nationality")]/following::div[1]');
    this.maritalStatusDropdown = this.page.locator('//label[contains(text(),"Marital Status")]/following::div[1]');
    this.dateOfBirthInput = this.page.locator('.oxd-date-wrapper').nth(1).locator('input');
    this.genderMaleRadio = this.page.locator('input[value="1"] + span').nth(0);
    this.genderFemaleRadio = this.page.locator('input[value="2"] + span').nth(0);
    this.saveButton1 = this.page.locator('button[type="submit"]').first();
    this.bloodTypeDropdown = this.page.locator('//label[contains(text(),"Blood Type")]/following::div[1]');
    this.testFieldInput = this.page.locator('//label[contains(text(),"Test")]/following::input[1]');
    this.saveButton2 = this.page.locator('button[type="submit"]').nth(1);
    //this.successToast = this.page.locator('#oxd-toaster_1');
    this.successToast = this.page.locator('#oxd-toaster_1');
  }

  async navigateToPersonalDetails() {
    await this.myInfoTab.click();
    await this.page.waitForSelector('h6:has-text("Personal Details")');
    console.log("Navigated to Personal Details section.");
  }

  // Helper for input fields
  private async clearAndFill(input: Locator, value: string | number) {
    await input.waitFor({ state: 'visible' });
    await input.click();
    await input.press('Control+A');
    await input.press('Delete');
    await input.fill(String(value));

    console.log(`Filling field with value: ${value}`);

    await expect(input).toHaveValue(String(value));
  }

  // Generic method for selecting value from dropdown
  private async selectDropdownValue(dropdown: Locator, optionText: string) {
    if (!optionText) {
    throw new Error('Dropdown option text is undefined or empty! Check your Excel data.');
  }
    await dropdown.click();
    const option = dropdown.locator(`.oxd-select-option:has-text("${optionText}")`);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // Blood Type specific method
  async selectBloodType(bloodType: string) {
    await this.selectDropdownValue(this.bloodTypeDropdown, bloodType);
  }

  // Nationality specific method
  async selectNationality(nationality: string) {
    await this.selectDropdownValue(this.nationalityDropdown, nationality);
  }

  // Marital Status specific method
  async selectMaritalStatus(status: string) {
    await this.selectDropdownValue(this.maritalStatusDropdown, status);
  }

  // Gender radio method
  async selectGender(gender: string) {
  if (gender.toLowerCase() === 'male') {
    await this.genderMaleRadio.click();
  } else {
    await this.genderFemaleRadio.click();
  }
}

  async fillBasicInfo(data: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string | number;
    otherId: string | number;
    driverLicenseNumber: string | number;
    testField: string | number;
    licenseExpiryDate: string | number;
    nationality: string;
    maritalStatus: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    comment: string;
  }) {
    
    // Text inputs
    await this.clearAndFill(this.firstNameInput, data.firstName);
    await this.clearAndFill(this.middleNameInput, data.middleName);
    await this.clearAndFill(this.lastNameInput, data.lastName);
    await this.clearAndFill(this.employeeIdInput, data.employeeId);
    await this.clearAndFill(this.otherIdInput, data.otherId);
    await this.clearAndFill(this.driverLicenseNumberInput, data.driverLicenseNumber);
    await this.clearAndFill(this.testFieldInput, data.testField);

    // License Expiry Date
    const formattedDate = formatExcelDate(data.licenseExpiryDate);
    await this.licenseExpiryDateInput.fill(formattedDate);

    // Dropdowns
    await this.selectNationality(data.nationality);
    await this.selectMaritalStatus(data.maritalStatus);

    // Date of Birth
    const formattedDateOfBirth = formatExcelDate(data.dateOfBirth);
    await this.dateOfBirthInput.fill(formattedDateOfBirth);

    // Gender radio
    await this.selectGender(data.gender);

    // Save button1
    await this.saveButton1.click();
    await this.successToast.waitFor({ state: 'visible' });

    // Blood Type
    if (await this.bloodTypeDropdown.isVisible()) {
      await this.selectBloodType(data.bloodType);
    } else {
      console.log('Blood type dropdown is not visible, skipping this step.');
    }

    // Comment
    await this.testFieldInput.fill(data.comment);

    // Save button2
    await this.saveButton2.click();
    await this.successToast.waitFor({ state: 'visible' });
    await expect(this.successToast).toBeVisible();
    await expect(this.firstNameInput).toHaveValue(data.firstName);
  }
}