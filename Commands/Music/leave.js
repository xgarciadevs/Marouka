const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'leave',
  description: 'Leave the voice channel.',
  usage: 'leave',
  aliases: ['disconnect'],
  category: 'Music',
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (message.guild.me.voiceChannel) {
      message.guild.me.voiceChannel.leave();
      message.reply("I have successfully left the voice channel!");
    } else {
      message.reply("I'm not connected to a voice channel!");
    }
  }
}
