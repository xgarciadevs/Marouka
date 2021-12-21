const canvacord = require('canvacord');

module.exports = {
  name: "jail",
  description: "Edit your avatar picture.",
  usage: "jail",
  aliases: [],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvacord.jail(avatar, true)
    return message.reply({ files: [{ attachment: image, name: "avatar.png" }] })
  }
}