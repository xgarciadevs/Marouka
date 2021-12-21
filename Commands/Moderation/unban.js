const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a  user.",
  usage: "unban [@user or ID]",
  aliases: [],
  category: "Moderation",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { const missingPermsEmbed = new MessageEmbed().setDescription('You do not have the `BAN_MEMBERS` permission.').setColor('RED'); return message.reply({ embeds: [missingPermsEmbed] }); }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { const meMissingPermsEmbed = new MessageEmbed().setDescription('I do not have the `BAN_MEMBERS` permission.').setColor('RED'); return message.reply({ embeds: [meMissingPermsEmbed] }); }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if (message.author.id == member) return message.reply('You cannot unban yourself.');
    if (!member) return message.reply('Please provide a member to unban.');
    if (!reason) reason = 'No reason was provided';

    try {
      member.unban(reason);

      const embed = new MessageEmbed()
        .setTitle('Unbanned Member')
        .setColor('GREEN')
        .setDescription(`Successfully unban ${member}\`(${member.id})\`\n\n**Reason:** ${reason}\n**Moderator:** ${message.author}`)

      message.reply({ embeds: [embed] });
    } catch (error) {
      let errorMessages = require('../../Data/error.json').error;
      let errMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

      let errorEmbed = new MessageEmbed()
        .setTitle(`<:error:919657675820789780> ${errMsg}`)
        .setColor('RED')
        .setDescription(`The error has been logged to the console. Here is a brief description of the error:\n\n\`\`\`${error}\`\`\``)

      message.reply({ embeds: [errorEmbed] });

      let cmdErrorEmbed = new MessageEmbed()
        .setTitle(`Command Error`)
        .setDescription(`**Command:** ${this.name}\n**Error:** ${error}`)
        .setColor('RED')
        .setTimestamp(message.createdAt, true)
      client.guilds.cache.get('899435249191239730').channels.cache.get('899452571041800283').send({ embeds: [cmdErrorEmbed] })
    }
  }
}