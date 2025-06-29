const axios = require("axios");

const WHITELIST_URL = "https://raw.githubusercontent.com/SAGOR690beep/Sagor404/main/admins.json";
const msgs = [
  "খাংকির পোলা তর মারে চুদি 🥰",
  "খাংকির পোলা তর কচি বোন রে চুদি ",
  "মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰",
  "খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু 💔!",
  "খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম ",
  "depression থেকেও তর মাইরে চু*** দি 🤬 ",
  "তর আম্মু রে আচার এর লোভ দেখি চুদি মাগির পোলা🤬",
  "বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟",
  "বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে 🤝",
  "উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো 💉।",
  "অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি জয় তর বাপ মাগির ছেলে 😘।",
  "বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে ✋",
  "হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি "
];

async function fetchAllowList() {
  try {
    const res = await axios.get(WHITELIST_URL);
    return res.data.allowList || [];
  } catch {
    return [];
  }
}

module.exports = {
  config: {
    name: "ban",
    version: "1.0.0",
    author: "Sagor",
    description: "Ban or unban users with whitelist support.",
    usage: "[ban/unban] [reply/userID]",
    cooldown: 3,
    role: 2
  },

  onStart: async function ({ api, event, args }) {
    const sub = args[0]?.toLowerCase();
    const uid = event.type === "message_reply" ? event.messageReply.senderID : args[1];

    if (!sub || !["ban", "unban"].includes(sub)) {
      return api.sendMessage("⚠️ ব্যবহার: ban ban [uid/reply] বা ban unban [uid/reply]", event.threadID, event.messageID);
    }

    if (!uid || isNaN(uid)) {
      return api.sendMessage("⚠️ সঠিক UID দিন বা কোনো মেসেজে রিপ্লাই দিন।", event.threadID, event.messageID);
    }

    const allow = await fetchAllowList();
    if (allow.includes(uid)) {
      return api.sendMessage("🚫 এই ইউজার হোয়াইটলিস্টে আছে।", event.threadID, event.messageID);
    }

    global.GoatBot_BannedUsers = global.GoatBot_BannedUsers || [];
    global.GoatBot_BanIndex = global.GoatBot_BanIndex || {};

    if (sub === "ban") {
      if (global.GoatBot_BannedUsers.includes(uid)) {
        return api.sendMessage("⚠️ ইউজার আগে থেকেই ব্যান করা।", event.threadID, event.messageID);
      }
      global.GoatBot_BannedUsers.push(uid);
      global.GoatBot_BanIndex[uid] = 0;
      return api.sendMessage("✅ ইউজার ব্যান করা হয়েছে।", event.threadID, event.messageID);
    }

    if (sub === "unban") {
      global.GoatBot_BannedUsers = global.GoatBot_BannedUsers.filter(id => id !== uid);
      delete global.GoatBot_BanIndex[uid];
      return api.sendMessage("✅ ইউজার আনব্যান করা হয়েছে।", event.threadID, event.messageID);
    }
  },

  onChat: async function ({ api, event }) {
    const uid = event.senderID;
    if (!global.GoatBot_BannedUsers?.includes(uid)) return;

    const allow = await fetchAllowList();
    if (allow.includes(uid)) return;

    const index = global.GoatBot_BanIndex[uid] || 0;
    api.sendMessage(msgs[index % msgs.length], event.threadID, event.messageID);
    global.GoatBot_BanIndex[uid] = index + 1;
  },

  onLoad: () => {
    if (!global.GoatBot_BannedUsers) global.GoatBot_BannedUsers = [];
    if (!global.GoatBot_BanIndex) global.GoatBot_BanIndex = {};
  }
};
