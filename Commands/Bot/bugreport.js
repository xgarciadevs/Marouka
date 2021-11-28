const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'bugreport',
  description: 'Help squash bugs found on the bot!',
  usage: 'bugreport',
  aliases: ['breport'],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle('🐞 Report a bug!')
      .setColor('PURPLE')
      .setDescription(`Please join our **[support server](${client.support})** and describe the bug with how you found it. If possible, please include screenshots!`)
      .setFooter('Thanks for helping us remove these bugs!')
      .setTimestamp(message.createdAt, true);
    message.reply({ embeds: [embed] });
  }
}