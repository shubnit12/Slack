const fs = require('fs');
const { google } = require('googleapis');

require('dotenv').config();

const serviceAccount = JSON.parse(process.env.EXCELSHEETCREDS)

// Load the service account credentials
const CREDENTIALS_PATH = './keys/alerttoexcel-435414-dd0f870cdd54.json'; // Path to your downloaded credentials file
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function authenticate() {
    let credentials;
    // let serviceAccount
    // try{
    //     credentials = fs.readFileSync(CREDENTIALS_PATH, 'utf-8')
    // }catch(error){
    //     console.error('Error in cred file', error)
    //     return null
    // }

    // try{
    //     serviceAccount = JSON.parse(credentials)
    // }catch(error){
    //     console.error('Error in parsing creds', error)
    //     return null
    // }

    if(!serviceAccount || !serviceAccount.client_email || !serviceAccount.private_key){
        console.error('service info missing')
        return null
    }

   
    
    const jwtClient = new google.auth.JWT(serviceAccount.client_email, null, serviceAccount.private_key, SCOPES);
    try{
        await jwtClient.authorize();
        return jwtClient;
    }catch(error){
        console.log('error in jwt token ', error)
        return null
    }
    
}

async function getSheetData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '19wpMRqgNdqG5xTpruzwRODGIN9PqbugMA3v3IaP2rcg'; // Replace with your Spreadsheet ID
    const range = 'Sheet1!A1:D10000'; // Adjust the range as necessary


    try{
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        console.log('Result from the sheet: ' + JSON.stringify(result));
        
        const rows = result.data.values;
        console.log('Data from the sheet:');
        
        if (rows.length && rows) {
            rows.forEach((row) => {
                console.log(row);
            });
            return rows
        } else {
            console.log('No data found.');
            return []
        }
    }catch(error){
        console.error('Error fetching data from shet')
        return []
    }


}

async function appendSheetData(auth, data) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '19wpMRqgNdqG5xTpruzwRODGIN9PqbugMA3v3IaP2rcg'; // Replace with your Spreadsheet ID

    const range = 'Sheet1!A1'; // Start inserting at this point
    const values = [
        [data.ts, data.text], // Example data to append
    ];

    const resource = {
        values,
    };
    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
    
        console.log(`${result.data.updates.updatedCells} cells appended.`);
        
    } catch (error) {
        console.error('Error in apending', error )
        return null
    }

}

module.exports = {
    authenticate,
    getSheetData,
    appendSheetData,
}

// Execute the functions
// async function main() {
//     try {
//         const auth = await authenticate();
//         await getSheetData(auth);
//         await appendSheetData(auth);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();
