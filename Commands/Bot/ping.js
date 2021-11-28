const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
require("moment-duration-format");
const moment = require('moment');

module.exports = {
  name: 'ping',
  description: 'Get the ping and uptime of Marouka.',
  usage: 'ping',
  aliases: [''],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let ping = Math.round(client.ws.ping);

    const embed = new MessageEmbed()
      .setTitle('Marouka Ping & Uptime')
      .setColor('PURPLE')
      .setDescription(`🏓 **Ping**\nPing: \`${ping}ms\`\n⬆ **Uptime**\nUptime: \`${uptime}\``)
      .setFooter('We love your support!')
      .setTimestamp(message.createdAt, true);
    message.reply({ embeds: [embed] });
  }
}