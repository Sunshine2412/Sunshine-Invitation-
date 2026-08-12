// Google Apps Script — opsional untuk menyimpan RSVP ke Google Sheets.
// 1. Buat Google Sheet dengan kolom: Timestamp | Nama | Kehadiran | Jumlah Tamu | Ucapan | Guest
// 2. Extensions > Apps Script, tempel kode ini.
// 3. Deploy > New deployment > Web app > Execute as Me > Anyone.
// 4. Salin URL Web App ke CONFIG.googleSheetsEndpoint di index.html.
const SHEET_NAME = 'RSVP';
function doPost(e){
  const body = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0) sh.appendRow(['Timestamp','Nama','Kehadiran','Jumlah Tamu','Ucapan','Guest']);
  sh.appendRow([new Date(),body.name||'',body.attendance||'',body.guests||'',body.message||'',body.guest||'']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
function doGet(){return ContentService.createTextOutput('RSVP endpoint aktif');}
