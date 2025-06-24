const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "uid",
    version: "1.0.0",
    role: 0,
    credits: "Nayan | Converted by Sagor",
    description: "Get Facebook UID from reply, mention, link, or self",
    usage: "[reply | @mention | fb link]",
    cooldown: 5
  },

  onStart: async function ({ message, event, args, usersData, api }) {
    const cachePath = __dirname + "/cache/uid_tmp.png";
    let uid;

    // Case 1: Replied message
    if (event.type === "message_reply") {
      uid = event.messageReply.senderID;

    // Case 2: Mentioned user
    } else if (args.join(" ").includes("@")) {
      uid = Object.keys(event.mentions)[0];

    // Case 3: Facebook profile link
    } else if (args[0] && args[0].includes(".com/")) {
      try {
        uid = await api.getUID(args[0]);
      } catch (e) {
        return message.reply("❌ Could not find UID from the link.");
      }

    // Case 4: Self
    } else {
      uid = event.senderID;
    }

    // Download avatar
    const avatarUrl = `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    request(encodeURI(avatarUrl))
      .pipe(fs.createWriteStream(cachePath))
      .on("close", () => {
        const text =
          `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ===\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `[ ▶️]➜ 𝗜𝗗: ${uid}\n` +
          `[ ▶️]➜ 𝗜𝗕: m.me/${uid}\n` +
          `[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://facebook.com/profile.php?id=${uid}\n` +
          `━━━━━━━━━━━━━━━━━━`;

        message.send(
          {
            body: text,
            attachment: fs.createReadStream(cachePath)
          },
          () => fs.unlinkSync(cachePath)
        );
      });
  }
};
