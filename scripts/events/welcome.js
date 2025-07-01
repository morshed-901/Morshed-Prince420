const { getTime, drive } = global.utils;

if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = { config: { name: "welcome", version: "1.7", author: "NTKhang | Modified by Sagor", category: "events" },

langs: { en: { session1: "🌅 morning", session2: "🌞 noon", session3: "🌇 afternoon", session4: "🌙 evening", welcomeMessage: ━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✨ 𝗦𝗔𝗚𝗢𝗥 𝗕𝗢𝗧 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗 ✨\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n👑 𝗢𝗪𝗡𝗘𝗥: SAGOR\n🌐 FB: fb.com/SAGOR.DJK.FORYOU\n━━━━━━━━━━━━━━━━━━━━━━━━━━, multiple1: "you", multiple2: "you all", defaultWelcomeMessage: ╔════•✿•════╗\n💐 আসসালামু আলাইকুম 💐\n╚════•✿•════╝\n\n✨ 𝙒𝙚𝙡𝙡𝙘𝙤𝙢𝙚 𝙉𝙚𝙬 𝙈𝙚𝙢𝙗𝙚𝙧 ✨\n\n🌸 {userName}\n🪐 {threadName} গ্রুপে আপনাকে স্বাগতম!\n✨ আপনি এই গ্রুপের {memberNumber} নং মেম্বার।\n\n🌼 আশা করি আপনার {session} সুন্দর যাবে। } },

onStart: async ({ threadsData, message, event, api, getLang }) => { if (event.logMessageType !== "log:subscribe") return;

const hours = getTime("HH");
const { threadID } = event;
const { nickNameBot } = global.GoatBot.config;
const prefix = global.utils.getPrefix(threadID);
const dataAddedParticipants = event.logMessageData.addedParticipants;

if (dataAddedParticipants.some(item => item.userFbId == api.getCurrentUserID())) {
  if (nickNameBot) {
    api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
  }
  return message.send(getLang("welcomeMessage", prefix));
}

if (!global.temp.welcomeEvent[threadID]) {
  global.temp.welcomeEvent[threadID] = {
    joinTimeout: null,
    dataAddedParticipants: []
  };
}

global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
  const threadData = await threadsData.get(threadID);
  if (threadData.settings.sendWelcomeMessage === false) return;

  const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
  const dataBanned = threadData.data.banned_ban || [];
  const threadName = threadData.threadName;
  const userName = [];
  const mentions = [];
  let multiple = false;

  if (dataAddedParticipants.length > 1) multiple = true;

  for (const user of dataAddedParticipants) {
    if (dataBanned.some(item => item.id == user.userFbId)) continue;
    userName.push(user.fullName);
    mentions.push({ tag: user.fullName, id: user.userFbId });
  }

  if (userName.length === 0) return;

  let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;
  const form = { mentions: welcomeMessage.includes("{userNameTag}") ? mentions : null };

  welcomeMessage = welcomeMessage
    .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
    .replace(/\{boxName\}|\{threadName\}/g, threadName)
    .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
    .replace(/\{session\}/g,
      hours <= 10 ? getLang("session1") :
      hours <= 12 ? getLang("session2") :
      hours <= 18 ? getLang("session3") :
      getLang("session4")
    )
    .replace(/\{memberNumber\}/g, threadData.members.length.toString());

  form.body = welcomeMessage;

  if (threadData.data.welcomeAttachment) {
    const files = threadData.data.welcomeAttachment;
    const attachments = files.map(file => drive.getFile(file, "stream"));
    const settled = await Promise.allSettled(attachments);
    form.attachment = settled.filter(r => r.status === "fulfilled").map(r => r.value);
  }

  await message.send(form);
  delete global.temp.welcomeEvent[threadID];
}, 1500);

} };

