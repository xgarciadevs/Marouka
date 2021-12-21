const canvacord = require('canvacord');

module.exports = {
  name: "wanted",
  description: "Make your profile picture wanted.",
  usage: "wanted",
  aliases: [],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvacord.wanted(avatar);
    return message.reply({ files: [{ attachment: image, name: "avatar.png" }] })
  }
}