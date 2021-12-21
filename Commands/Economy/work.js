const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "work",
  description: "Work at your favorite store and earn some sweet moolah!",
  usage: "work",
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