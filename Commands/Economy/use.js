const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "use",
  description: "Use a nice new item!",
  usage: "use [item]",
  aliases: [],
  category: "Economy",
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