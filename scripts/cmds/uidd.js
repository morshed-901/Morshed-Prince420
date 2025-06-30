const _0xAuth = () => Buffer.from("U2Fnb3I=", "base64").toString();

module.exports = {
  config: {
    name: "uid",
    aliases: [],
    version: "1.0",
    author: _0xAuth(),
    countDown: 5,
    role: 0,
    shortDescription: "Get Facebook UID",
    longDescription: "Fetch UID from reply, mention, or self",
    category: "info",
    guide: "{pn} [reply/tag/link]"
  },

  onStart: async function ({ api, event, args, message }) {

    // Author Lock Check
    if (this.config.author !== _0xAuth()) {
      return message.reply("❌ Author mismatch. This command is locked.");
    }

    let uid;
    const mention = Object.keys(event.mentions);

    if (event.type === "message_reply") {
      uid = event.messageReply.senderID;
    } else if (mention.length) {
      uid = mention[0];
    } else if (args[0]) {
      const urlMatch = args[0].match(/(?:\d{5,}|\b(?:profile\.php\?id=)?(\d{5,}))/);
      if (urlMatch) {
        uid = urlMatch[0];
      } else {
        return message.reply("❌ Invalid link or input.");
      }
    } else {
      uid = event.senderID;
    }

    message.reply(`✅ UID: ${uid}`);
  }
};
