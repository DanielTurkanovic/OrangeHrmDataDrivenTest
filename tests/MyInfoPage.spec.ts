import { test } from '../utils/TestSetUp.js';
import { getExcelData } from '../utils/excelReader.js';

const allLoginData = await getExcelData<any>('loginSheet.xlsx', 'Sheet1');
const loginData = allLoginData[0];
const personalTestData = await getExcelData<any>('personalDetails.xlsx', 'Sheet1');

test.describe('Update Personal Details', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(loginData.username, loginData.password);
  });

  for (const testData of (personalTestData || [])) {
    test(`Update personal details for ${testData.firstName} ${testData.lastName}`, async ({ myInfoPage }) => {
      
      await myInfoPage.navigateToPersonalDetails();
      await myInfoPage.fillBasicInfo(testData);
    });
  }
});