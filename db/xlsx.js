const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require("google-auth-library") 
const fs = require('fs');
const creds = require('../config/auth.json')
const XLSX = require('xlsx');
const { Buffer } = require('buffer')

const spreadsheetId = '1qWLIyYijkxX8ajyAAn-R6iiztSU1IDXDrUPgURWkLoI'; // Replace this with the ID of the Google Sheets document

const DownDL = async () => {
  try {
    console.log("a")
    const jwt = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    console.log("a")
    const doc = new GoogleSpreadsheet(spreadsheetId, jwt);
    await doc.loadInfo(true)
    const xlsxBuffer = await doc.downloadAsXLSX();
    fs.writeFileSync('./dl.xlsx', Buffer.from(xlsxBuffer));
    console.log("a")
const filePath = 'dl.xlsx';
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  console.log("a")
  fs.writeFile('./db/dl.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to dl.json:', err.message);
    } else {
      console.log('Excel data has been successfully written to dl.json');
    }
  });
  console.log("a")
  } catch (error) {
    console.error('Error reading the spreadsheet:', error.message);
  }
};
module.exports.down = DownDL