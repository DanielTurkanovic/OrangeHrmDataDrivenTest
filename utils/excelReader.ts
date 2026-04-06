import ExcelJS from 'exceljs';
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

export async function getExcelData<T>(fileName: string, sheetName: string): Promise<T[]> {
  const filePath = path.join(process.cwd(), 'testData', fileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File "${fileName}" not found in testData folder`);
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath); 
  
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in "${fileName}"`);
  }

  const data: T[] = [];

  const headerRow = worksheet.getRow(1);

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = headerRow.getCell(colNumber).value?.toString();
        if (header) {
          rowData[header] = cell.value;
        }
      });
      data.push(rowData as T);
    }
  });

  return data;
}

export function formatExcelDate(date: any): string {
  if (!date) return "";
  
  const d = new Date(date);
  
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  
  return String(date); 
}