require("dotenv").config();
const tmi = require("tmi.js");
const fs = require("fs");

const optinons = {
  options: {
    debug: true,
  },
  connecntion: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASS,
  },
  channels: [process.env.CHANNEL],
};
let users = [];
let bots = ["supibot", "pwgud", "streamelements", "nightbot"];
let symbols = ["!", "$", "/"];

const client = new tmi.client(optinons);
client.connect();

client.on("chat", function (channel, username, message) {
  if (!bots.includes(username.username)) {
    if (!symbols.includes(message.charAt(0))) {
      let messLog = message + "|\r\n";
      fs.appendFile("messages.txt", messLog, function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
  }
  if (!users.includes(username.username) && !bots.includes(username.username)) {
    users.push(username.username);
    let userLog = username.username + "|";
    fs.appendFile("users.txt", userLog, function (error) {
      if (error) {
        console.log(error);
      }
    });
  }
});
