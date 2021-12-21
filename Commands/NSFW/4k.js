const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "4k",
  description: "Get 4k nsfw. NOT FOR CHILDREN.",
  usage: "4k",
  aliases: ["fourk"],
  category: "NSFW",
  cooldown: 3,
  enabled: true,
  nsfw: true,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const { body } = await superagent.get('https://nekobot.xyz/api/image?type=4k');
    let image = body.message;

    let embed = new MessageEmbed()
      .setTitle(`<:error:919657675820789780> 4K Porn Image`)
      .setImage(image)
      .setColor('#8b0000')
      .setTimestamp(message.createdAt, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] });
  }
}