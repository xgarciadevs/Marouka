const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "test",
  description: "test",
  usage: "test",
  aliases: [],
  category: "Developer",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    message.reply('Beep Boop.')
  }
}
