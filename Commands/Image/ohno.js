const canvacord = require('canvacord');

module.exports = {
  name: "ohno",
  description: "Manipulate an image with text.",
  usage: "ohno",
  aliases: [],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let text = args.slice(0).join(' ');
    if (!text) return message.channel.send('Please provide text.')
    let image = await canvacord.Canvacord.ohno(text)
    return message.reply({ files: [{ attachment: image, name: "avatar.png" }] })
  }
}