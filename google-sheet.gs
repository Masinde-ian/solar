/**
 * Google Apps Script — SunPro Lead Capture
 *
 * Deploy as a Web App:
 *   1. File > New > Script file (paste this code)
 *   2. Set spreadsheet ID and sheet name below
 *   3. Deploy > New Deployment > Web App
 *   4. Set "Execute as" = Me, "Who has access" = Anyone
 *   5. Copy the Web App URL into solar_load_calculator_leads.html
 *      as the value of GOOGLE_SHEETS_URL
 */

const SPREADSHEET_ID = '10REorDqUxrg8kOgL3Bxeiw_LVTs0FZqWDY4jyBSL460';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const raw = e.postData.contents;
    const data = JSON.parse(raw);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found. Check the sheet tab name.');
    }

    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Phone', 'Email', 'Location', 'Property',
        'KPLC Bill', 'Goal', 'Budget', 'Recommended System', 'Notes', 'Source'
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.location || '',
      data.property || '',
      data.bill || '',
      data.goal || '',
      data.budget || '',
      data.system || '',
      data.notes || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test with a sample POST — run from editor to verify
function testPost() {
  var payload = JSON.stringify({
    name: 'Test User',
    phone: '+254 712 345 678',
    email: 'test@example.com',
    location: 'Nairobi',
    property: 'Residential home',
    bill: 'Ksh 5,000 - 10,000',
    goal: 'Reduce KPLC bills',
    budget: 'Ksh 250,000 - 500,000',
    system: '3-5kW Hybrid System',
    notes: 'Test entry',
    source: 'Google search'
  });
  var result = doPost({ postData: { contents: payload } });
  Logger.log(result.getContent());
}
