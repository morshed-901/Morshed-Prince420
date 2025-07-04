const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "salam",
    version: "1.0.0",
    author: "𝚂𝙰𝙶𝙾𝚁", // LOCKED, removing will break
    countDown: 5,
    role: 0,
    shortDescription: "Auto reply to salam",
    longDescription: "Auto replies with ওয়ালাইকুম সালাম when someone says সালাম or Assalamu Alaikum",
    category: "noPrefix",
    guide: "{pn} (auto)"
  },

  onStart: async function () {},

  onChat: async function ({ message, event, api, usersData, threadsData }) {
    const salamTexts = [
      "assalamu alaikum", "Assalamu alaikum", "Assalamu Alaikum",
      "Assalamualaikum", "assalamualaikum", "আসসালামু আলাইকুম",
      "ASSALAMUALAIKUM", "salam", "সালাম", "Assalamualikum"
    ];

    const threadData = await threadsData.get(event.threadID);
    if (threadData.salam === false) return;

    const body = event.body?.toLowerCase();
    if (!body) return;

    if (salamTexts.some(text => body.startsWith(text.toLowerCase()))) {
      const name = await usersData.getName(event.senderID);

      const images = [
        "https://i.imgur.com/JtenMLO.jpeg",
        "https://i.imgur.com/kjvZ9iO.jpeg",
        "https://i.imgur.com/uq1X7A4.jpeg",
        "https://i.imgur.com/dMRDrVv.jpeg",
        "https://i.imgur.com/cgtD9cs.jpeg",
        "https://i.imgur.com/YCVtjm3.jpeg",
        "https://i.imgur.com/RGUxNFG.jpeg",
        "https://i.imgur.com/dA3rT0E.jpeg",
        "https://i.imgur.com/oalGZL4.jpeg",
        "https://i.imgur.com/zhSVly7.jpeg",
        "https://i.imgur.com/1dCjbJt.jpeg",
        "https://i.imgur.com/q9TICm1.jpeg",
        "https://i.imgur.com/IlYTb8a.jpeg"
      ];
      const imageUrl = images[Math.floor(Math.random() * images.length)];
      const path = `${__dirname}/tmp_salam.jpg`;

      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

      await message.reply({
        body: `╭•┄┅═══❁🌺❁═══┅┄•╮\n   ওয়ালাইকুম সালাম-!!🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯

✿🦋༎ প্রিয় গ্রুপ মেম্বার ${name} ✨🧡\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
        attachment: fs.createReadStream(path)
      });

      fs.unlinkSync(path);
    }
  },

  onCommand: async function ({ message, event, threadsData, getLang }) {
    const threadData = await threadsData.get(event.threadID);
    const current = threadData.salam;
    threadData.salam = current === undefined ? false : !current;
    await threadsData.set(event.threadID, threadData);

    message.reply(`${threadData.salam === false ? "✅ Salam auto-reply OFF" : "✅ Salam auto-reply ON"}`);
  }
};
