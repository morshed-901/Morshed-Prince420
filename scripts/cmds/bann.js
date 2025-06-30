const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

// Hidden immutable author-lock
(function(){
  const __ = Buffer.from("U2Fnb3I=", "base64").toString();
  if (__ !== "Sagor") process.exit(1);
})();

module.exports = {
  config: {
    name: "ban",
    version: "1.0.0",
    role: 2,
    description: "Ban/unban users with GitHub RAW ban SMS",
    usage: ".ban add/remove/list [reply/uid]",
    cooldown: 5
  },

  onStart: async function ({ event, args, message }) {
    const banFile = path.join(__dirname, "banned.json");
    if (!fs.existsSync(banFile)) fs.writeFileSync(banFile, JSON.stringify([]));

    let banList = JSON.parse(fs.readFileSync(banFile));
    const subcmd = args[0];

    if (!subcmd) {
      return message.reply(
        `📛 Usage:\n.ban add [reply/uid]\n.ban remove [reply/uid]\n.ban list`
      );
    }

    if (subcmd === "list") {
      if (banList.length === 0) return message.reply("✅ Currently, no one is banned.");
      return message.reply(`🔒 Banned UID List:\n${banList.join("\n")}`);
    }

    const targetID = event.messageReply ? event.messageReply.senderID : args[1];
    if (!targetID) return message.reply("⚠️ Please reply to a user or provide a UID.");

    if (subcmd === "add") {
      if (banList.includes(targetID)) return message.reply("⚠️ User is already banned.");
      banList.push(targetID);
      fs.writeFileSync(banFile, JSON.stringify(banList, null, 2));
      return message.reply(`✅ UID ${targetID} has been banned.`);
    }

    if (subcmd === "remove") {
      if (!banList.includes(targetID)) return message.reply("⚠️ This UID is not banned.");
      banList = banList.filter(uid => uid !== targetID);
      fs.writeFileSync(banFile, JSON.stringify(banList, null, 2));
      return message.reply(`✅ UID ${targetID} has been unbanned.`);
    }

    return message.reply("⚠️ Invalid subcommand.");
  },

  onChat: async function ({ event, message }) {
    const banFile = path.join(__dirname, "banned.json");
    if (!fs.existsSync(banFile)) return;
    let banList = JSON.parse(fs.readFileSync(banFile));
    if (banList.includes(event.senderID)) {
      try {
        const res = await axios.get("https://raw.githubusercontent.com/SaGorbot009/SaGor404/main/banmsg.json");
        const banMsg = res.data.message || "🚫 You are globally banned from using commands.";
        return message.reply(banMsg);
      } catch (e) {
        return message.reply("🚫 You are globally banned from using commands.");
      }
    }
  }
};
