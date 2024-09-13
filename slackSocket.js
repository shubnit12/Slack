// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
require('dotenv').config();
const appToken = process.env.appToken
const token = process.env.token
const signingSecret = process.env.signingSecret
const appWEB = process.env.appWEB

const {authenticate, getSheetData, appendSheetData}= require('./googleSheet')

const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(appWEB, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

const { App } = require('@slack/bolt');
const { analytics } = require("googleapis/build/src/apis/analytics");

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
  try {
    const auth = await authenticate()
    if(!auth){
       return console.log('Error while writing to excel ==== Auth error')
    }
    await getSheetData(auth)
    const values = {
        ts: message.event_ts ,
        text: message.text
    }
    const updatedCells = await appendSheetData(auth,values)
   console.log(`${updatedCells} cells updated`)
    

} catch (error) {
    console.error('Error while writing to excel',error)
    //  res.status(500).send('Error while writing to excel')
}
  await say("Message is logged")
})

async function myFun(params) {
  await app.start();
  console.log('⚡️ Bolt app started');
}
myFun();