const { MessageEmbed, MessageButton, MessageActionRow, version, Message } = require('discord.js');
const { invite, support, website } = require('../../config.json');
require("moment-duration-format");
const moment = require('moment');
const os = require('os');

const osList = {
  "aix": "AIX",
  "darwin": "Darwin",
  "freebsd": "FreeBSD",
  "linux": "Linux",
  "openbsd": "OpenBSD",
  "sunos": "SunOS",
  "win32": "Windows 32-bit"
}

module.exports = {
  name: 'botinfo',
  description: 'Learn a little bit about Marouka!',
  usage: 'botinfo',
  aliases: ['bi'],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
      .setColor('PURPLE')
      .setDescription(`Hey stranger, i'm **Marouka**! I am not your typical multi-purpose bot.. I am a "special" type of bot. \n\nI was created & developed by **[xdg6227](https://discord.com/users/528637169544331291)** with help from **[__](__)**. Logo created by **[__](__)** & emojis created by **[xdg6227](https://discord.com/users/528637169544331291)**`)
      .addField(':chart_with_upwards_trend: Statistics', `**Commands:** ${client.commands.size || 0}\n**Servers:** ${client.guilds.cache.size || 0}\n**Users:** ${client.users.cache.size || 0}\n**Channels:** ${client.channels.cache.size || 0}`, true)
      .addField(':newspaper: Extra', `**Uptime:** ${moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}\n**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\n**OS:** ${osList[os.platform()]}`, true)
      .addField(':link: Links', `**[Website](${website})**\n**[Invite](${invite})**\n**[Support](${support})**`, true)
      .setFooter('We <3 our community!')
      .setTimestamp(message.createdAt, true);
    message.reply({ embeds: [embed] })
  }
}
