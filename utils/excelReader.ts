import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export interface User {
  username: string;
  password: string;
  expectedResult?: string; 
}

export interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string; 
  otherId: string;
  driverLicenseNumber: string;
  licenseExpiryDate: string;
  nationality: string;
  maritalStatus: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  bloodTypeField: string;
  testField: string;
  comment: string;
}

export function getExcelData<T>(fileName: string, sheetName: string): T[] {
  // Path to the Excel file
  const filePath = path.join(process.cwd(), 'testData', fileName);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File "${fileName}" not found in testData folder`);
  }

  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in "${fileName}"`);
  }

  return XLSX.utils.sheet_to_json<T>(worksheet);
}

export function formatExcelDate(date: string | number): string {
  if (typeof date === "number") {
    const parsed = XLSX.SSF.parse_date_code(date);
    return `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
  }
  return date; 
}