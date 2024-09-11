// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient("sample toekn", {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

// ID of the channel you want to send the message to
const channelId = "C061HRE32U9";

(async() =>{
    try {
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
          channel: channelId,
          text: "Geeend pe khave ga ke"
        });
      
        console.log("result: " + result);
      }
      catch (error) {
        console.error("Eror: " + error);
      }


})();