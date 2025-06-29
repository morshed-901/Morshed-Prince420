const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[𝗦 𝗔 𝗚 𝗢 𝗥]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "𝗦𝗮𝗚𝗼𝗿",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += ``; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────❃『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✦`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────❃[𝗘𝗡𝗝𝗢𝗬]\n│>𝗧𝗢𝗧𝗔𝗟 𝗖𝗠𝗗𝗦: [${totalCommands}].\n│𝗧𝗬𝗣𝗘𝖳:[ ${prefix}𝗛𝗘𝗟𝗣 𝗧𝗢\n│<𝗖𝗠𝗗> 𝗧𝗢 𝗟𝗘𝗔𝗥𝗡 𝗧𝗛𝗘 𝗨𝗦𝗔𝗚𝗘.]\n╰────────────✦`;
      msg += ``;
      msg += `\n╭─────❃\n│🌟 | [ 𝗦 𝗔 𝗚 𝗢 𝗥 ]\n│https://www.facebook.com/profile.php?id=SAGOR.DJK.FORYOU\n╰────────────✦`; // its not decoy so change it if you want 


      await message.reply({
        body: msg,
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NAME ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
  │ 𝗢𝘁𝗵𝗲𝗿 𝗻𝗮𝗺𝗲𝘀: ${configCommand.aliases ? configCommand.aliases.join(", ") : "𝗗𝗼 𝗻𝗼𝘁 𝗵𝗮𝘃𝗲"}
  │ 𝗢𝘁𝗵𝗲𝗿 𝗻𝗮𝗺𝗲𝘀 𝗶𝗻 𝘆𝗼𝘂𝗿 𝗴𝗿𝗼𝘂𝗽: 𝗗𝗼 𝗻𝗼𝘁 𝗵𝗮𝘃𝗲
  │ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
  │ 𝗥𝗼𝗹𝗲: ${roleText}
  │ 𝗧𝗶𝗺𝗲 𝗽𝗲𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱: ${configCommand.countDown || 1}s
  │ 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  ├── 𝗨𝘀𝗮𝗴𝗲
  │ ${usage}
  ├── 𝗡𝗼𝘁𝗲𝘀
  │ 𝗧𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗶𝗻𝘀𝗶𝗱𝗲 <XXXXX> 𝗰𝗮𝗻 𝗯𝗲 𝗰𝗵𝗮𝗻𝗴𝗲𝗱
  │ 𝗧𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗶𝗻𝘀𝗶𝗱𝗲 [a|b|c] 𝗶𝘀 𝗮 𝗼𝗿 𝗯 𝗼𝗿 𝗰
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
		    }
