const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "datetime",
    version: "1.4",
    author: "SaGor",
    countdown: 5,
    role: 0,
    shortDescription: "Displays the current date and time in the Philippines.",
    longDescription: "",
    category: "misc",
    guide: "{prefix}{name}",
    envConfig: {}
  },

  onStart: async function({ message, args }) {
    const philippinesTime = moment.tz("Asia/Dhaka").format("h:mm:ss A");
    const philippinesDate = moment.tz("Asia/Dhaka").format("dddd, DD MMMM YYYY");

    const reply = `Today Date & Time in the Bangladesh:\n` +
      `❏Date: ${philippinesDate}\n` +
      `❏Time: ${philippinesTime}`;

    message.reply(reply);
  },
  onEvent: async function() {}
};