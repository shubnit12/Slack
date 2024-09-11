const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient("xxxxxxxxxx", {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

let conversationHistory;
// ID of channel you watch to fetch the history for
let channelId = "C061HRE32U9";

(async() =>{

    try {
        // Call the conversations.history method using WebClient
        const result = await client.conversations.history({
          channel: channelId
        });
      
        conversationHistory = result.messages;
        conversationHistory.forEach((message)=>{
            console.log("My Message: " + message.text)
        })
      }
      catch (error) {
        console.error(error);
      }



})()