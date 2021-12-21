const canvacord = require('canvacord');

module.exports = {
  name: "rip",
  description: "Edit your avatar picture.",
  usage: "rip",
  aliases: [],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvacord.rip(avatar)
    return message.reply({ files: [{ attachment: image, name: "avatar.png" }] })
  }
}