const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Snipe the last deleted message.",
  usage: "snipe",
  aliases: [],
  category: "Moderation",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const msg = client.snipes.get(message.channel.id);

    try {
      let embed = new MessageEmbed()
        .setAuthor(msg.author, msg.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setColor('RANDOM')
      message.reply({ embeds: [embed] });
    } catch {
      message.reply('There is nothing to snipe!')
    }
  }
}