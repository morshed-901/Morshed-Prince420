module.exports = {
	config: {
		name: "goiadmin",
		author: "𝗔𝗺𝗶𝗻𝘂𝗹 𝗦𝗼𝗿𝗱𝗮𝗿",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "61575791445818","100088836995808") {
		var aid = ["100029990749091","61557676742949"];
		for (const id of aid) {
		if ( Object.keys(event.mentions) == id) {
			var msg = ["আমার বস প্রিন্স এখন ইসলামিক ফাউন্ডেশন নিয়ে ব্যস্ত🥰","বস এখন ব্যস্ত আছে🍒","বেশি দরকার পড়লে ইনবক্সে মেসেজ দিয়ে যোগাযোগ করুন 😘"," বস এখন ইসলামিক ফাউন্ডেশন নিয়ে ব্যস্ত 🍒😘"," বস এখন ব্যস্ত আছে🥰🌚"];
			return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
		}
		}}
},
onStart: async function({}) {
	}
};
