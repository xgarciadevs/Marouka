const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'support',
  description: 'Send a invite to the support server.',
  usage: 'support',
  aliases: [],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`**Join the support server by clicking the button below or by clicking [here](${client.support})!**`);
    message.reply({ embeds: [embed] });
  }
}