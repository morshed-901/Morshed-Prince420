const { getTime, drive } = global.utils;

if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = { config: { name: "welcome", version: "1.7", author: "NTKhang | Modified by Sagor", category: "events" },

langs: { en: { session1: "🌅 morning", session2: "🌞 noon", session3: "🌇 afternoon", session4: "🌙 evening", welcomeMessage: ━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✨ SAGOR BOT CONNECTED ✨\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n👑 OWNER: SAGOR\n🌐 FB: fb.com/SAGOR.DJK.FORYOU\n━━━━━━━━━━━━━━━━━━━━━━━━━━, multiple1: "you", multiple2: "all of you", defaultWelcomeMessage: ✨ Welcome New Member ✨\n\n👤 {userName}\n\nWelcome to {threadName}!\nYou are the {memberNumber}th member of this group.\n\nHave a wonderful {session}! } },

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
  const sessionText =
    hours <= 10 ? getLang("session1") :
    hours <= 12 ? getLang("session2") :
    hours <= 18 ? getLang("session3") :
    getLang("session4");

  welcomeMessage = welcomeMessage
    .replace(/\{userName\}/g, userName.join(", "))
    .replace(/\{boxName\}|\{threadName\}/g, threadName)
    .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
    .replace(/\{session\}/g, sessionText)
    .replace(/\{memberNumber\}/g, threadData.members.length.toString());

  const form = {
    body: welcomeMessage,
    mentions: welcomeMessage.includes("{userNameTag}") ? mentions : null
  };

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

