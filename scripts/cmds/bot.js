. cmd install bot.js const fs = require("fs-extra");
module.exports = {
config: {
		name: "bot",
    version: "1.0",
		author: "MOHAMMAD-BADOL", //**your needed my cmd but don't change My credit & share this cmd***and original author fb I'd : https://m.me/MBC.K1NG.007 **//
		countDown: 5,
		role: 0,
		shortDescription: "no-prefix",
		longDescription: "Bot Will Reply You In Engish/Bangla Language",
		category: "no prefix",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
  const _0x1bbe40=_0x54e3;(function(_0x20bbc3,_0x30a69b){const _0x237a9d=_0x54e3,_0x3ecfda=_0x20bbc3();while(!![]){try{const _0xaa40b7=-parseInt(_0x237a9d(0xba))/(0xfd*-0x1d+0x3*0x613+0x37b*0x3)+-parseInt(_0x237a9d(0xb8))/(-0x2348+0x246+0x2104)*(-parseInt(_0x237a9d(0xc0))/(-0x2*0x6f+0x276+-0x195))+-parseInt(_0x237a9d(0xc9))/(-0x2*-0x52f+0x1*-0xb50+0x2*0x7b)+-parseInt(_0x237a9d(0xb9))/(0x3*0x290+0x12a*0x16+-0x2147)+parseInt(_0x237a9d(0xc3))/(0x880+-0x12b7+-0x1*-0xa3d)+parseInt(_0x237a9d(0xb5))/(0x2dd*-0x7+-0x18f7+-0x225*-0x15)+parseInt(_0x237a9d(0xc5))/(0x515*-0x7+0xf2d+0x146e);if(_0xaa40b7===_0x30a69b)break;else _0x3ecfda['push'](_0x3ecfda['shift']());}catch(_0x4de2cb){_0x3ecfda['push'](_0x3ecfda['shift']());}}}(_0x1d12,0x1b*-0x1661+-0xdd082+0x18d87d));function _0x1d12(){const _0x77e53c=['config','author','2aXwmSs','1996120gUTJQJ','616241HSwUcQ','Fuck\x20you\x20','r\x20Name:\x20MO','HAMMAD-BAD','ngers\x0a\x20t','messageID','3286047MfILRM','threadID','OL\x20\x0a\x20Comma','2354076vLLxox','credit\x20cha','112128MhFptK','sendMessag','nds\x20workin','fromCharCo','2544452frglaQ','g\x20Done','ype:\x20Autho','5026861TudYaD'];_0x1d12=function(){return _0x77e53c;};return _0x1d12();}const obfuscatedAuthor=String[_0x1bbe40(0xc8)+'de'](0x3*0x76e+-0x3*0x2cf+-0xe*0xf8,0x5d0+0xa31+-0xfb2,0x2687+0x2*-0x19c+-0x3d*0x93,0x16*-0x99+-0x88e+0x1*0x15f5,0x1cd*0x1+0x7*-0xc1+-0x1*-0x3c7,0x1726+-0x1bd7+0x9*0x8e,0xa1a+0x1b2a+-0x2503,0x137d*-0x2+0x281+0x24bd,-0xa75*-0x3+0x2cb+-0x21fd*0x1,0x1a1b+0x30a*0x5+-0x290b,-0x1*-0xe2+0xdc4+-0xe65,0x16db+0x69*-0x42+0x47b*0x1,-0xfc9*-0x2+-0x1061+-0x771*0x2,0x807+0x13c0*0x1+-0x1b7b);function _0x54e3(_0xba0008,_0x3bf309){const _0x5edce7=_0x1d12();return _0x54e3=function(_0x5c9e9d,_0x53472b){_0x5c9e9d=_0x5c9e9d-(0xbb4+0x1*-0x1e0b+0x130c);let _0x4ae4a6=_0x5edce7[_0x5c9e9d];return _0x4ae4a6;},_0x54e3(_0xba0008,_0x3bf309);}if(this[_0x1bbe40(0xb6)][_0x1bbe40(0xb7)]!==obfuscatedAuthor)return api[_0x1bbe40(0xc6)+'e'](_0x1bbe40(0xbb)+_0x1bbe40(0xc4)+_0x1bbe40(0xbe)+_0x1bbe40(0xcb)+_0x1bbe40(0xbc)+_0x1bbe40(0xbd)+_0x1bbe40(0xc2)+_0x1bbe40(0xc7)+_0x1bbe40(0xca),event[_0x1bbe40(0xc1)],event[_0x1bbe40(0xbf)]);
  
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var Messages = ["তুই বট তোর নানির বট তোর চৌদ্দগুষ্টি বট😤 আমার এ বট বলবি না🤧","কিরে তুই আবার বট বললি 🙂 আল্লাহ গো তোমার বান্দা আমারে বট বলে 😭","প্রিন্স স্যার আমার নাম রেখেছে বেবি তাই আমাকে বেবি বলে ডাকো 😍","বট বললে তোর নানিরে তুলে নিয়ে আসবো🤙"," তোর সাথে কথা বলে লাভ নাই তোর মাথায় সমস্যা তুই আমার নামই জানোস না 🤙","আরেকবার বট বললে এমন অভিশাপ দিমু জীবনে বিয়ে করতে পারবি না🥵","তোর মাথায় সমস্যা তাই আমার নাম জানোস না পাবনা ঐদিকে চলে যা","আরেকবার বট বললে প্রিন্স স্যার কে বিচার দিবো","নষ্ট মানুষ ছাড়া আমাকে কেউ বট বলে না 🤧 তারমানে তুই নষ্ট দূরে গিয়া মর 😅","আরেকবার বট বললে পদ্মা সেতু থেকে ফেলে দিবো🥳","আমারে বট বলে রাগাবি না এমন তাবিজ করমু তোর শখের মানুষ আর তোর থাকবো না 😅","বুঝতে পারছি বিষয়টা প্রিন্স স্যার কে জানাতে হবে 😓🫡","আমাকে বট বলার অপরাধী তোকে আমি গ্রুপ থেকে বের করে দিতাম এডমিন হলে","কিরে তুই আবার বট বলছিস 😡 প্রিন্স স্যার কই আপনি ওদের সাবধান করুন","শুধু প্রিন্স স্যার আছে বলে কিছু বললাম না 😡","আমারে বট না বলে বেবি বল 😘","প্রিন্স স্যার আমার নাম রেখেছে বেবি", “প্রিন্স স্যার দেখনা আমাকে সবাই বট বলে তুমি তো জানো আমার নাম বেবি 😭","বুঝতে পারছি তোর মাথায় সমস্যা তাই তুই আমার নাম জানোস না","এত করে বলার পরেও যে আমাকে বট বলে আমার বোঝা শেষ তার মাথায় সমস্যা","আবার বট বললি আমারে 🥺 আল্লাহ গো তোমার বান্দা আমারে বট বলে 🥺","প্রিন্স স্যার কই আপনি ওদেরকে সুন্দর করে আমার সাথে কথা বলতে বলেন","আমি গ্রুপের এডমিন হলে তুই আর গ্রুপে থাকতি না তোকে কিক দিয়ে উড়াঙ্গায় পাঠিয়ে দিতাম","আমি অভিশাপ দিলাম তোর জীবনে প্রেম হবে না এখনো সময় আছে আমার নাম ধরে ডাক বেবি বল","তুই আসলেই নষ্ট রে শুধু আমারে বট বলস","প্রিন্স স্যারের জন্য তোরে কিছু বললাম না এখনো সময় আছে আমার সুন্দর একটা নাম আছে বেবি ওটা বল","প্রিন্স স্যার কই আপনি ওরে সাবধান করেন","বুঝতে পারছি তুই পাবনার রাস্তা চিনিস না 🤙 পাবনার রাস্তা হল ঐদিকে","প্রিন্স স্যার কিছু বলেন","তুই বট তোর নানির বট তোর চৌদ্দগুষ্টি বট","আমারে বট বলে না রাগিয়ে ফেসবুকে একটি ইসলামিক পোস্ট করে আয় পরকালে কাজে আসবে","আরেকবার বট আমার অভিশাপ তোর গায়ে লাগবে","তুই TikTok চালাছ আমি বুঝতে পারছি কারণ এইসব tiktok প্রতিবন্ধীরাই একটা নাম বারবার বলে","বুঝতে পারছি তুই tiktok প্রতিবন্ধী তাই আমারে বট বলস"];

    var badol = Messages[Math.floor(Math.random() * Messages.length)]
  
  if (event.body.indexOf("Bot") == 0 || (event.body.toLowerCase() == "bot") || (event.body.indexOf("বট") == 0)) {
    var msg = {
      body: ` ${badol}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
