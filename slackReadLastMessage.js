// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient("xxxxx", {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});
// Store message
let message;

// Fetch conversation history using the ID and a TS from the last example
async function fetchMessage(id) {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await client.conversations.history({
      // The token you used to initialize your app
      token: "xxxxx",
      channel: id,
      // Limit results
      inclusive: true,
      limit: 1
    });

    // There should only be one result (stored in the zeroth index)
    message = result.messages[0];
    // Print message text
    console.log(message.text);
  }
  catch (error) {
    console.error(error);
  }
}

// Fetch message using a channel ID and message TS
fetchMessage("C061HRE32U9");
