const dbURL = "https://alerttoexcel-default-rtdb.firebaseio.com/"
const body = {
    "token": "xxxxxxxxxxxxxxxxxxx",
    "challenge": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    "type": "zzzzzzzzzzzzzzzzzzzzzzzzzzz"
  }
     let URLXX = dbURL + body.token +'.json'
async function sendToDB(dbURL, data){
const raw = JSON.stringify(data);

const requestOptions = {
  method: "POST",
  body: raw,
  redirect: "follow"
};

await fetch(dbURL , requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}
sendToDB(URLXX, body)

const fs = require('fs');
const { google } = require('googleapis');

// Load the service account credentials
const CREDENTIALS_PATH = 'credentials.json'; // Path to your downloaded credentials file
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function authenticate() {
    const { client_email, private_key } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
    
    const jwtClient = new google.auth.JWT(client_email, null, private_key, SCOPES);
    await jwtClient.authorize();
    return jwtClient;
}

async function getSheetData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '<YOUR_SPREADSHEET_ID>'; // Replace with your Spreadsheet ID
    const range = 'Sheet1!A1:D10'; // Adjust the range as necessary

    const result = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    const rows = result.data.values;
    console.log('Data from the sheet:');
    if (rows.length) {
        rows.forEach((row) => {
            console.log(row);
        });
    } else {
        console.log('No data found.');
    }
}

async function appendSheetData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '<YOUR_SPREADSHEET_ID>'; // Replace with your Spreadsheet ID

    const range = 'Sheet1!A1'; // Start inserting at this point
    const values = [
        ['New Data 1', 'New Data 2', 'New Data 3', 'New Data 4'], // Example data to append
    ];

    const resource = {
        values,
    };

    const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
    });

    console.log(`${result.data.updates.updatedCells} cells appended.`);
}

// Execute the functions
async function main() {
    try {
        const auth = await authenticate();
        await getSheetData(auth);
        await appendSheetData(auth);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
