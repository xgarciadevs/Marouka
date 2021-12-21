const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "ass",
  description: "Get ass nsfw. NOT FOR CHILDREN.",
  usage: "ass",
  aliases: [],
  category: "NSFW",
  cooldown: 3,
  enabled: true,
  nsfw: true,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const { body } = await superagent.get('https://nekobot.xyz/api/image?type=ass');
    let image = body.message;

    let embed = new MessageEmbed()
      .setTitle(`<:error:919657675820789780> Ass Image`)
      .setImage(image)
      .setColor('#8b0000')
      .setTimestamp(message.createdAt, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] });
  }
}