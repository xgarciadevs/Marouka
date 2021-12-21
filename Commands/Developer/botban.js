const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botban",
  description: "This is how you ban users from using the bot.",
  usage: "botban [@user] [reason]",
  aliases: ['bban'],
  category: "Developer",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: true,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`Well that's an issue! The ${this.name} command is not ready for the public. Try again in a little bit :D`);
    message.reply({ embeds: [embed] });
  }
}