const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "rnd",
    version: "1.0.0",
    role: 0,
    credits: "SaGor | Converted by Sagor",
    description: "Send a random sad video",
    usage: "",
    cooldown: 5
  },

  onStart: async function ({ message }) {
    const hi = ["--SaGor--"];
    const sender = hi[Math.floor(Math.random() * hi.length)];

    const videoLinks = [
      "https://i.imgur.com/RQPW4J4.mp4",
      "https://i.imgur.com/GICmTcH.mp4",
      "https://i.imgur.com/N7N36mP.mp4",
      "https://i.imgur.com/Bc6fF5c.mp4",
      "https://i.imgur.com/2Ex7jc2.mp4",
      "https://i.imgur.com/NIwlzYS.mp4",
      "https://i.imgur.com/2f1Ldc4.mp4",
      "https://i.imgur.com/8NOCa6Q.mp4",
      "https://i.imgur.com/0Nqkbez.mp4"
    ];

    const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];
    const filePath = `${__dirname}/cache/sad.mp4`;

    request(encodeURI(randomVideo))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        message.send(
          {
            body: `「 ${sender} 」`,
            attachment: fs.createReadStream(filePath)
          },
          () => fs.unlinkSync(filePath)
        );
      });
  }
};
