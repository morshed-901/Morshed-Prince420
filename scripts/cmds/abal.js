module.exports = {
	config: {
			name: "abal",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "No Prefix",
			longDescription: "No Prefix",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "abal") return message.reply("আবাল বলে গালি দেওয়া ঠিক না 🥰 মাঝে মাঝে আমি দেই ওটা ভিন্ন হিসাব 😁");
}
};
