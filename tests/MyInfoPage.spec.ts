import { test } from '../utils/TestSetUp';
import { getExcelData, PersonalDetails, User } from '../utils/excelReader'; 

// Take admin credentials from Excel
const loginData = getExcelData<User>('loginSheet.xlsx', 'Sheet1')[0]; 
const personalTestData = getExcelData<PersonalDetails>('personalDetails.xlsx', 'Sheet1');

test.describe('Update Personal Details', () => {

  // Login before each test 
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(loginData.username, loginData.password);
  });

  personalTestData.forEach((testData) => {
    test(`Update personal details for ${testData.firstName} ${testData.lastName}`, async ({ myInfoPage }) => {

      await myInfoPage.navigateToPersonalDetails();

      // Fill in the form with data from Excel
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