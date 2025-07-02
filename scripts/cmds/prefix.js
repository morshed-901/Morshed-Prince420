module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "\u0053\u0061\u0067\u006f\u0072", // safely hidden
    countDown: 5,
    role: 1,
    shortDescription: "View/change bot prefix",
    longDescription: "Displays or changes the bot prefix in premium arrow style.",
    category: "Settings",
    guide: "{pn} [new prefix]"
  },

  onStart: async function ({ message, event, args, threads }) {
    const threadID = event.threadID;
    const threadData = await threads.get(threadID) || {};
    const currentPrefix = threadData.data?.prefix || global.GoatBot.config.prefix;
    const systemPrefix = global.GoatBot.config.prefix;
    const ownerName = "SAGOR";

    if (!args[0]) {
      return message.reply(
`➔➔➔ BOT PREFIX ➔➔➔
System Prefix: ${systemPrefix}
Group Prefix: ${currentPrefix}
Owner: ${ownerName}
➔➔➔➔➔➔➔➔➔➔➔➔➔➔`
      );
    }

    const newPrefix = args[0];
    threadData.data = threadData.data || {};
    threadData.data.prefix = newPrefix;
    await threads.set(threadID, threadData);

    message.reply(
`➔➔➔ PREFIX UPDATED ➔➔➔
New Prefix: ${newPrefix}
Updated successfully for this group.
Owner: ${ownerName}
➔➔➔➔➔➔➔➔➔➔➔➔➔➔`
    );
  }
};
