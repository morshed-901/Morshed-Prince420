const axios = require("axios");
const fs = require("fs-extra");
const jimp = require("jimp");
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require("request");
const path = __dirname + "/join";
const fontLink = "https://drive.google.com/u/0/uc?id=10XFWm9F6u2RKnuVIfwoEdlav2HhkAUIB&export=download";

module.exports = {
  config: {
    name: "join",
    eventType: ["log:subscribe"],
    version: "1.0.0",
    credits: "Converted by Sagor",
    description: "Send a custom welcome message and image to new members"
  },

  onStart: async function () {
    if (!fs.existsSync(`${path}/font`)) fs.mkdirSync(`${path}/font`, { recursive: true });
    const fontPath = `${path}/font/Semi.ttf`;
    if (!fs.existsSync(fontPath)) {
      const fontData = (await axios.get(fontLink, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(fontPath, Buffer.from(fontData, "utf-8"));
    }
  },

  onEvent: async function ({ event, message, usersData, threadsData, api }) {
    const { threadID, logMessageData } = event;

    if (!logMessageData?.addedParticipants) return;

    const botID = api.getCurrentUserID();
    const addedBot = logMessageData.addedParticipants.some(i => i.userFbId == botID);

    const threadInfo = await api.getThreadInfo(threadID);
    const threadName = threadInfo.threadName;
    const time = require("moment-timezone").tz("Asia/Dhaka").format("HH:mm:ss - DD/MM/YYYY");
    const weekDay = require("moment-timezone").tz("Asia/Dhaka").format("dddd");
    const participants = threadInfo.participantIDs.length;

    // === Bot is added ===
    if (addedBot) {
      const gifUrl = 'https://i.postimg.cc/K8bmT50P/sagor-bot-effect.gif';
      const gifPath = `${path}/join.gif`;
      const gifData = (await axios.get(gifUrl, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(gifPath, gifData);

      return message.reply({
        body:
`চলে এসেছি আমি পিচ্চি সাগর তোমাদের মাঝে🤭!

${global.GoatBot.config.botName || "GoatBot"} CONNECTED ✅

Assalamualaikum ☘️
-----------------------------
Use 👉 ${global.GoatBot.config.prefix}help
To explore bot commands!
-----------------------------
Developer: Jahidul Islam Sagor
📘 FB: https://www.facebook.com/SAGOR.DJK.FORYOU
📬 Telegram: https://t.me/xxFUCKyouBRO
📧 Support: babygithub@gmail.com`,
        attachment: fs.createReadStream(gifPath)
      });
    }

    // === Other users are added ===
    try {
      const attachments = [];
      const mentions = [];

      for (let i = 0; i < logMessageData.addedParticipants.length; i++) {
        const user = logMessageData.addedParticipants[i];
        const uid = user.userFbId;
        const userName = user.fullName;
        const imgPath = `${path}/${i}.png`;
        const avaPath = `${path}/avt.png`;

        const avt = (await axios.get(
          `https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
          { responseType: "arraybuffer" }
        )).data;

        const bgUrls = [
          'https://i.imgur.com/dDSh0wc.jpeg',
          'https://i.imgur.com/UucSRWJ.jpeg',
          'https://i.imgur.com/OYzHKNE.jpeg',
          'https://i.imgur.com/V5L9dPi.jpeg',
          'https://i.imgur.com/M7HEAMA.jpeg'
        ];

        const bgUrl = bgUrls[Math.floor(Math.random() * bgUrls.length)];
        const bgData = (await axios.get(bgUrl, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(avaPath, Buffer.from(avt, "utf-8"));
        fs.writeFileSync(imgPath, Buffer.from(bgData, "utf-8"));

        const circleAvatar = await jimp.read(avaPath).then(image => image.circle().getBufferAsync("image/png"));

        const bg = await loadImage(imgPath);
        const avatar = await loadImage(circleAvatar);

        registerFont(`${path}/font/Semi.ttf`, { family: "Semi" });

        const canvas = createCanvas(1902, 1082);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "155px Semi";
        ctx.fillText(userName, canvas.width / 2 + 20, canvas.height / 2 + 100);
        ctx.font = "75px Semi";
        ctx.fillText(`Welcome to ${threadName}`, canvas.width / 2 - 15, canvas.height / 2 + 235);

        const number = participants - i;
        let suffix = "th";
        if (![11, 12, 13].includes(number % 100)) {
          suffix = ["th", "st", "nd", "rd"][Math.min(number % 10, 4)] || "th";
        }

        ctx.fillText(`You are the ${number}${suffix} member`, canvas.width / 2 - 15, canvas.height / 2 + 350);

        fs.writeFileSync(imgPath, canvas.toBuffer());
        attachments.push(fs.createReadStream(imgPath));
        mentions.push({ tag: userName, id: uid });
      }

      await message.reply({
        body: `👋 Welcome ${mentions.map(m => m.tag).join(', ')} to ${threadName}!\n⏰ Time: ${time} (${weekDay})`,
        attachment: attachments,
        mentions
      });

      // Clean temp images
      for (let i = 0; i < logMessageData.addedParticipants.length; i++) {
        fs.unlinkSync(`${path}/${i}.png`);
      }

    } catch (err) {
      console.error("Error in join module:", err);
    }
  }
};
