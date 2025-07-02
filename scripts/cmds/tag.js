module.exports = {
  config: {
    name: "tag",
    aliases: ["rtag"],
    version: "1.3",
    author: "\u0053\u0061\u0067\u006f\u0072",
    countDown: 5,
    role: 2, // Admin only
    shortDescription: "Stylish big @tag reply",
    longDescription: "Reply to a message tagging the sender in a big, stylish way",
    category: "group",
    guide: "{pn} [your message]"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, messageReply } = event;

    if (!messageReply) {
      return api.sendMessage("❌ Please reply to a message to tag that user.", threadID, messageID);
    }

    const tagUserID = messageReply.senderID;
    let userName = "User";

    try {
      const userInfo = await api.getUserInfo(tagUserID);
      userName = userInfo[tagUserID]?.name || "User";
    } catch (error) {
      console.log(error);
    }

    const messageContent = args.join(" ") || "✨ Tagging the requested user ✨";
    const finalMessage = 
`━━━━━━━━━━━━━━━
💠 𝗧𝗔𝗚 𝗔𝗟𝗘𝗥𝗧 💠
━━━━━━━━━━━━━━━

💌 ${messageContent}

👤 𝗨𝘀𝗲𝗿: @${userName}
🆔 𝗜𝗗: ${tagUserID}

━━━━━━━━━━━━━━━
⚡ 𝗧𝗮𝗴𝗴𝗲𝗱 𝗯𝘆 𝗕𝗼𝘁 ⚡
━━━━━━━━━━━━━━━`;

    api.sendMessage({
      body: finalMessage,
      mentions: [{
        tag: `@${userName}`,
        id: tagUserID
      }]
    }, threadID, messageReply.messageID);
  }
};
