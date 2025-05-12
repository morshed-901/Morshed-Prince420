module.exports = {
  config: {
    name: "up",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "𝗦𝗮𝗚𝗼𝗿", //don't change author without you bot fuck commend original author SaGor
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `╭──⩸__ 𝐒𝙰𝐆𝙾𝐫 𝐁𝙾𝐓__⩸ ☔︎𝐔𝙿𝐓𝙸𝐌𝙴⏳👈\n├⏳ 𝐇𝙾𝐔𝚁𝐒 ${hours}\n├⏰ 𝐌𝙸𝐍𝚄𝐓𝙴𝐒 ${minutes}\n├⏲️ 𝐒𝙴𝐂𝙾𝐍𝙳𝐒 ${seconds}\n╰───────────✰`;
    api.sendMessage(`${uptimeString}`, event.threadID);
  }
}
