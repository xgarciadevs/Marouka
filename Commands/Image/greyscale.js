const canvacord = require('canvacord');

module.exports = {
  name: "greyscale",
  description: "Edit your avatar picture.",
  usage: "greyscale",
  aliases: [],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvacord.greyscale(avatar)
    return message.reply({ files: [{ attachment: image, name: "avatar.png" }] })
  }
}