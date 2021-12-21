const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'botsuggest',
  description: 'Help squash bugs found on the bot!',
  usage: 'botsuggest [suggestion]',
  aliases: ['bsuggest'],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(':open_hands: Suggest a suggestion!')
      .setColor('PURPLE')
      .setDescription(`Please join our **[support server](${client.support})** to suggest something new for our bot!\n\nSoon you can submit a suggestion through the bot <:soontm:922202648051081247>`)
      .setFooter('We love your suggestions <3')
      .setTimestamp(message.createdAt, true);
    message.reply({ embeds: [embed] });
  }
}