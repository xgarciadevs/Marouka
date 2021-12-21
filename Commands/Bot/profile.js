const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'profile',
  description: 'View, edit, and create your own profile.',
  usage: 'profile [option] [option]',
  aliases: [],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`Well that's an issue! The ${this.name} command is not ready for the public. Try again in a little bit :D`);
    message.reply({ embeds: [embed] });
  }
}