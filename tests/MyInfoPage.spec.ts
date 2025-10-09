import { test } from '../utils/TestSetUp';
import { getExcelData, PersonalDetails } from '../utils/excelReader';
import { MyInfoPage } from '../pages/MyInfoPage';

// Read test data from Excel
const personalTestData = getExcelData<PersonalDetails>('personalDetails.xlsx', 'Sheet1');

for (const testData of personalTestData) {
  test(`Update personal details for ${testData.firstName} ${testData.lastName}`, async ({ page }) => {
    const myInfoPage = new MyInfoPage(page);

    // 1. Go to My Info Personal Details
    await myInfoPage.navigateToPersonalDetails();

    // 2. Fill in the form with data from Excel
    await myInfoPage.fillBasicInfo({
      firstName: testData.firstName,
      middleName: testData.middleName,
      lastName: testData.lastName,
      employeeId: testData.employeeId,
      otherId: testData.otherId,
      driverLicenseNumber: testData.driverLicenseNumber,
      testField: testData.testField,
      licenseExpiryDate: testData.licenseExpiryDate,
      nationality: testData.nationality,
      maritalStatus: testData.maritalStatus,
      dateOfBirth: testData.dateOfBirth,
      gender: testData.gender,
      bloodType: testData.bloodType,
      comment: testData.comment
    });
  });
}
