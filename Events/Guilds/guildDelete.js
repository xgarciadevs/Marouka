const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
  let embed = new MessageEmbed()
    .setTitle(`Left server`)
    .setDescription(`I just left a server. I am now in **${client.guilds.cache.size}** servers.`)
    .setColor('RED')
  client.guilds.cache.get('899435249191239730').channels.cache.get('899452543179063367').send({ embeds: [embed] })
}