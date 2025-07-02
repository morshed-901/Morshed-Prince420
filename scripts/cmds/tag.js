module.exports = {
  config: {
    name: "tag",
    aliases: [],
    version: "1.0.4",
    author: "\u0053\u0061\u0067\u006f\u0072", // "xnxx" hidden
    countDown: 5,
    role: 0, // Everyone can use
    shortDescription: "Tag replied user cleanly",
    longDescription: "Tag only the replied user with their name, nothing else",
    category: "group",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID, messageReply } = event;

    if (!messageReply) {
      return api.sendMessage("Please reply to a message to tag that user.", threadID, messageID);
    }

    const tagUserID = messageReply.senderID;
    let userName = "User";

    try {
      const userInfo = await api.getUserInfo(tagUserID);
      userName = userInfo[tagUserID]?.name || "User";
    } catch (error) {
      console.log(error);
    }

    api.sendMessage({
      body: userName,
      mentions: [{
        tag: userName,
        id: tagUserID
      }]
    }, threadID, messageReply.messageID);
  }
};
