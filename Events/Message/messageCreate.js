const { MessageEmbed, Collection } = require('discord.js');
const cooldowns = new Collection();

module.exports = async (client, message) => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;

  let prefix = client.prefix;

  if (message.content.startsWith(prefix)) {
    let args = message.content.substring(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (!command) return;

    if (!command.enabled) {
      const disabledEmbed = new MessageEmbed()
        .setDescription(`This command is currently disabled, try again later.`)
        .setColor('RED')

      return message.reply({ embeds: [disabledEmbed] })
    };

    if (command.nsfw) {
      if (!message.channel.nsfw) {
        const nsfwEmbed = new MessageEmbed()
        .setTitle('<:error:919657675820789780> Oops!')
        .setDescription('This is an NSFW command, please run it inside of a NSFW channel.')
        .setImage('https://support.discord.com/hc/article_attachments/115000272351/thisisnsfw.png')
        .setColor('RED')

      return message.reply({ embeds: [nsfwEmbed] })
      }
    };

    if (command.guildOnly && message.channel.type === 'dm') {
      const dmEmbed = new MessageEmbed()
        .setDescription(`I can't execute that command inside DMs!`)
        .setColor('RED')

      return message.reply({ embeds: [dmEmbed] })
    };

    if (command.devOnly) {
      if (!client.developers.includes(message.author.id)) {
        const devEmbed = new MessageEmbed()
          .setDescription(`This is a developer command. Back off bub.`)
          .setColor('RED')

        return message.reply({ embeds: [devEmbed] })
      }
    }

    /* Command Cooldown */
    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime && command.nsfw) {
        const timeLeft = (expirationTime - now) / 1000;
        const hornySlowdownEmbed = new MessageEmbed()
          .setDescription(`Slow down horny fuck! Wait **${timeLeft.toFixed(1)}** more seconds before using the **${command.name}** command.`)
          .setColor('RED')

        return message.reply({ embeds: [hornySlowdownEmbed] })
      } else if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const slowdownEmbed = new MessageEmbed()
          .setDescription(`You must wait **${timeLeft.toFixed(1)}** more seconds before using the **${command.name}** command.`)
          .setColor('RED')

        return message.reply({ embeds: [slowdownEmbed] })
      };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    command.execute(client, message, args);

    /* Command Ran */
    const commandEmbed = new MessageEmbed()
      .setTitle(`Command was Ran`)
      .setDescription(`**Command:** ${command.name}\n**Ran by:** <@${message.author.id}>\`(${message.author.id})\`\n**Ran in:** ${message.guild.name}\`(${message.guild.id})\``)
      .setColor('PURPLE')
      .setTimestamp(message.createdAt, true)
    client.guilds.cache.get('899435249191239730').channels.cache.get('899452564746162236').send({ embeds: [commandEmbed] })
  };
};