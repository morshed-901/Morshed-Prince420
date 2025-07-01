const axios = require("axios");

module.exports = {
  config: {
    name: "imgur",
    aliases: [],
    version: "1.0",
    author: "Nayan | Converted by Sagor",
    countDown: 5,
    role: 0,
    shortDescription: "Upload images/videos to Imgur",
    longDescription: "Uploads an image or video to Imgur and returns the link.",
    category: "tools",
    guide: "{pn} [reply to image/video or URL]"
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      let link = args.join(" ") || (event.messageReply?.attachments[0]?.url);
      if (!link) {
        return message.reply("⚠️ Please provide an image/video URL or reply with an attachment to upload.");
      }

      link = link.trim().replace(/\s/g, '');
      if (!/^https?:\/\//.test(link)) {
        return message.reply("⚠️ Invalid URL. It must start with http:// or https://");
      }

      // Get your hosted API URL
      const { data } = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiUrl = data.api;

      const encodedUrl = encodeURIComponent(link);
      const response = await axios.get(`${apiUrl}/imgur?url=${encodedUrl}`);

      if (response.data.success) {
        return message.reply(`✅ Uploaded to Imgur:\n${response.data.link}`);
      } else {
        return message.reply("❌ Upload failed. Please try again with a valid image or video URL.");
      }

    } catch (err) {
      console.error(err);
      return message.reply("❌ An error occurred while uploading to Imgur.");
    }
  }
};
