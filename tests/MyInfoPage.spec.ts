import { test } from '../utils/TestSetUp';
import { getExcelData, PersonalDetails } from '../utils/excelReader';
import { MyInfoPage } from '../pages/MyInfoPage';

const personalTestData = getExcelData<PersonalDetails>('personalDetails.xlsx', 'Sheet1');

test.describe('Update Personal Details', () => {
  personalTestData.forEach((testData) => {
    test(`Update personal details for ${testData.firstName} ${testData.lastName}`, async ({ loginPage }) => {
      const page = loginPage.page;
      const myInfoPage = new MyInfoPage(page);

      // Navigate to Personal Details
      await myInfoPage.navigateToPersonalDetails();

      // Fill in the form
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
  });
});
