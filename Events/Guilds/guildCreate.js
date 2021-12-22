const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
  let guildCreate = new MessageEmbed()
    .setTitle(`Joined Server`)
    .setDescription(`I was just added into **${guild}**.  I am now in **${client.guilds.cache.size}** servers.`)
    .setColor('GREEN')
  client.guilds.cache.get('899435249191239730').channels.cache.get('899452543179063367').send({ embeds: [guildCreate] });
}