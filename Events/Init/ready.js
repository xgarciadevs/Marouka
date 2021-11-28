const { MessageEmbed } = require('discord.js');
const chalk = require('chalk')

module.exports = async (client, message) => {
  client.user.setActivity({ name: `${client.guilds.cache.size} servers! | ${client.prefix}help`, type: 'WATCHING' });
  console.log(chalk.magenta('[CLIENT] ') + chalk.white(`${client.user.username}(${client.user.tag}) is now online!`));

  let botRestartEmbed = new MessageEmbed()
    .setTitle('Marouka Restart')
    .setDescription(`**${client.user.tag}** is now online!`)
    .setColor('PURPLE')
    .setTimestamp(message.createdAt, true);
  client.guilds.cache.get('899435249191239730').channels.cache.get('899452669322723328').send({ embeds: [botRestartEmbed] });
};