const WebSocket = require("ws");
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const readline = require("readline");
require("dotenv").config();

const PUBSUB_CONNECTION_STRING = process.env.AZURE_WEBPUBSUB_CONNECTION_STRING;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main(userId, group) {
  // Azure Web PubSub hub
  const hub = "ead_hub";

  // Connect to Azure Web PubSub with the connection string and hub
  let client = new WebPubSubServiceClient(PUBSUB_CONNECTION_STRING, hub);

  // Get the client access token, specifying the userId
  let token = await client.getClientAccessToken({ userId });

  // Create a WebSocket connection to the Azure Web PubSub service using the token
  let ws = new WebSocket(token.url);

  ws.on("open", async () => {
    console.log("connected");

    // Once the WebSocket is connected, add the user to the group
    await client.group(group).addUser(userId);
    console.log(`${userId} added to group ${group}`);
  });

  ws.on("message", (data) => {
    try {
      const jsonData = JSON.parse(data);
      console.log("Message received:");
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.log("Message received (not JSON):", data.toString());
    }
  });

  ws.on("close", () => {
    console.log("connection closed");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
}

// Ask for userId and group from the console
rl.question("Enter the userId: ", (userId) => {
  rl.question("Enter the group: ", (group) => {
    // Call the main function with the values entered by the user
    main(userId, group);
    rl.close();
  });
});
