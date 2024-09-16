// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
require('dotenv').config();
const appToken = process.env.appToken
const token = process.env.token
const signingSecret = process.env.signingSecret
const appWEB = process.env.appWEB
const xlsx = require('xlsx');



const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(appWEB, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

const { App } = require('@slack/bolt');


const app = new App({
  token: token,
  appToken: appToken,
  socketMode: true,
  port: process.env.PORT || 3000,
  signingSecret: signingSecret
});

app.message('hellp', async ({message,say}) =>{
  await say(`Hello <@${message.user}>`)
})
app.message(async ({message,say}) => {
  console.log(message)
  let data = {
    user: message.user,
    text: message.text
  }
 await demoFun('Book1.xlsx', data)
 







  await say("Message is logged")
})


const data = {
    Name: "John",
    Age: 23,
    City: "Temp"
};
async function myFun(params) {
    // console.log(params)
    // params('Book1.xlsx' , data)
  await app.start();
  console.log('⚡️ Bolt app started');
}





myFun();
let demoFun = async function fillDataInExcel(filePath, data) {
    const newRow = [data.user, data.text];

    // Step 1: Read the existing Excel file
    const workbook = xlsx.readFile(filePath);

    // Step 2: Get the first sheet (you can modify this to select a specific sheet)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
    console.log(sheetData);

    // Step 3: Determine the last row in the sheet
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const lastRow = range.e.r + 1; // Last used row + 1

    xlsx.utils.sheet_add_aoa(sheet, [newRow], { origin: lastRow });

    // Step 6: Write the updated workbook back to the file
    xlsx.writeFile(workbook, filePath);

}
