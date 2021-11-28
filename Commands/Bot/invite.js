const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Send a invite to invite the bot.',
  usage: 'invite',
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
      .setDescription(`**Invite me by clicking the button below or by clicking [here](${client.invite})!**`);
    message.reply({ embeds: [embed] });
  }
}