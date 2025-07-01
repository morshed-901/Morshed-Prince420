const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs-extra");

const hidden = {
  name: "imgbb",
  version: "1.0",
  author: Buffer.from("U2Fnb3I=", "base64").toString("utf-8") // "Sagor"
};

module.exports = {
  config: {
    name: hidden.name,
    version: hidden.version,
    author: hidden.author,
    countDown: 5,
    role: 0,
    shortDescription: "Upload image to imgbb",
    longDescription: "Uploads a replied image or image URL to imgbb and returns the direct link.",
    category: "tools",
    guide: "{pn} [reply to an image or provide image URL]"
  },

  onStart: async function ({ api, event, args, commandName }) {
    try {
      if (
        module.exports.config.name !== hidden.name ||
        module.exports.config.author !== hidden.author ||
        commandName !== hidden.name
      ) {
        return api.sendMessage("❌ Tampered detected. Command disabled.", event.threadID, event.messageID);
      }
    } catch (e) {
      return api.sendMessage("❌ Tampered detected.", event.threadID, event.messageID);
    }

    const apiKey = "67124e33d2ab5ff5577e545e0da19dde";
    let imagePath;

    const uploadToImgbb = async (path) => {
      const form = new FormData();
      form.append("image", fs.createReadStream(path));
      try {
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
          headers: form.getHeaders()
        });
        return res.data.data.url;
      } catch (e) {
        return null;
      }
    };

    if (event.type === "message_reply" && event.messageReply.attachments.length > 0) {
      const attachment = event.messageReply.attachments[0];
      if (attachment.type === "photo") {
        const url = attachment.url;
        const path = __dirname + "/cache/imgbb.jpg";
        const writer = fs.createWriteStream(path);
        const response = await axios({ url, method: "GET", responseType: "stream" });
        response.data.pipe(writer);
        writer.on("finish", async () => {
          const link = await uploadToImgbb(path);
          fs.unlinkSync(path);
          if (link) {
            api.sendMessage(link, event.threadID, event.messageID);
          } else {
            api.sendMessage("❌ Upload failed. Try again.", event.threadID, event.messageID);
          }
        });
        return;
      }
    }

    if (args[0]) {
      const form = new FormData();
      form.append("image", args[0]);

      try {
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
          headers: form.getHeaders()
        });
        const link = res.data.data.url;
        api.sendMessage(link, event.threadID, event.messageID);
      } catch (e) {
        api.sendMessage("❌ Upload failed. Check the URL.", event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("⚠️ Please reply to an image or provide an image URL to upload.", event.threadID, event.messageID);
    }
  }
};
