const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'snipe',
  description: 'Snipe the most recently deleted message.',
  usage: 'snipe',
  aliases: [],
  category: 'Moderation',
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: false,
  async execute(client, message, args) {
    let msg = client.snipes.get(message.channel.id);

    try {
      let embed = new MessageEmbed()
        .setAuthor(msg.author, msg.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setColor('RANDOM')
      message.reply({ embeds: [embed] });
    } catch {
      message.reply('There is nothing to snipe :/');
    };
  }
}