const { MessageEmbed } = require("discord.js");
const discordInv = require('discord-inv');

module.exports = {
  name: "inviteinfo",
  description: "Get information about Discord invite links.",
  usage: "inviteinfo [inviteLink]",
  aliases: ["invinfo", "invite-info"],
  category: "Utility",
  cooldown: 3,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let inviteURL = args[0];
    if (!inviteURL) return message.channel.send('Please provide a valid invite link.');

    try {
      discordInv.getInv(discordInv.getCodeFromUrl(inviteURL)).then(invite => {
        let embed = new MessageEmbed()
          .setTitle("Invite Link Information")
          .addField('Code:', `\`${invite.code}\``, true)
          .addField('Server Info:', `**Name:** ${invite.guild.name}\n**ID:** \`${invite.guild.id}\``, true)
          .addField('Channel:', `**Name:** ${invite.channel.name}\n**ID:** \`${invite.channel.id}\``, true)
          .addField('Inviter Info:', `**Name:** \`${invite.inviter.tag}\`\n**ID:**\`${invite.inviter.id}\``, true)
          .addField('Invite Link:', invite.url, true)
          .setColor('PURPLE')
        message.reply({ embeds: [embed] });
      })
    } catch (error) {
      message.reply('Oops, you found a bug! For now, instead of putting the full discord link(https://discord.gg/invitecode), please just put the invite code. Thank you!');

      let cmdErrorEmbed = new MessageEmbed()
        .setTitle(`Command Error`)
        .setDescription(`**Command:** ${this.name}\n**Error:** ${error}`)
        .setColor('RED')
        .setTimestamp(message.createdAt, true)
      client.guilds.cache.get('899435249191239730').channels.cache.get('899452571041800283').send({ embeds: [cmdErrorEmbed] })
    }
  }
}