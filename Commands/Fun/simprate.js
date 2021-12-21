const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "simprate",
  description: "Get how much of a simp you or a friend is.",
  usage: "simprate [@user]",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let rate = Math.floor(Math.random() * 101);

    if (message.author.id === '528637169544331291') {
      let embed = new MessageEmbed()
        .setTitle(':heartbeat: Simp r8 Machine')
        .setDescription(`<@${user.id}>, you are \`1000%\` a simp.`)
        .setColor('RED')

      message.channel.send({ embeds: [embed] });
    } else {
      let embed = new MessageEmbed()
        .setTitle(':heartbeat: Simp r8 Machine')
        .setDescription(`<@${user.id}>, you are \`${rate}%\` a simp.`)
        .setColor('RED')

      message.channel.send({ embeds: [embed] });
    }
  }
}