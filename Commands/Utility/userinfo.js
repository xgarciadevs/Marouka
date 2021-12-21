const { Discord, MessageEmbed } = require('discord.js');
const moment = require('moment');
const userFlags = {
  'STAFF': 'Discord Employee',
  'PARTNER': 'Partnered Server Owner',
  'HYPESQUAD': 'HypeSquad Events Coordinator',
  'BUG_HUNTER_LEVEL_1': 'Bug Hunter Level 1',
  'HYPESQUAD_ONLINE_HOUSE_1': 'Hypesquad Bravery Member',
  'HYPESQUAD_ONLINE_HOUSE_2': 'Hypesquad Brilliance Member',
  'HYPESQUAD_ONLINE_HOUSE_3': 'Hypesquad Balance Member',
  'PREMIUM_EARLY_SUPPORTER': 'Early Nitro Supporter',
  'TEAM_PSEUDO_USER': 'Team Account',
  'BUG_HUNTER_LEVEL_2': 'Bug Hunter Level 2',
  'VERIFIED_BOT	': 'Verified Bot',
  'VERIFIED_DEVELOPER': 'Early Verified Bot Developer',
  'CERTIFIED_MODERATOR': 'Discord Certified Moderator',
  'BOT_HTTP_INTERACTIONS': 'Bot HTTPS Interactions',
};
const premiumTypesList = {
  0: 'None',
  1: 'Nitro Classic',
  2: 'Nitro'
}

module.exports = {
  name: "userinfo",
  description: "Get info about a user in the server.",
  usage: "userinfo [@user or nothing]",
  aliases: ["user-info", "ui"],
  category: "Utility",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const roles = member.roles.cache.map(role => role.toString());
    const userFlags = member.user.flags.toArray();

    const embed = new MessageEmbed()
      .setTitle(`${member.user.username} • User Information`)
      .setColor(`${member.user.accentColor || 'PURPLE'}`)
      .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
      .addField('Username', `${member.user.tag || 'Unknown#0000'}`, true)
      .addField('Account ID', `\`${member.user.id || '123456789012345678'}\``, true)
      .addField('Nickname', `${member.user.nickname || 'No Nickname.'}`, true)
      .addField('Server Warns', `Disabled.`, true)
      .addField('Account Created', `${moment(member.user.createdTimestamp).format("LL") || 'January 0 3025'}`, true)
      .addField('Joined Server', `January 0 3025`, true)
      .addField('Server Roles', `${roles.join(' **|** ') || 'No Server Roles'}`)
      .addField('Account Flags', `${userFlags[member.user.flags] || 'No Account Flags'}`)
    
    message.reply({ embeds: [embed] });
  }
}