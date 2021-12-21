const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "boobs",
  description: "Get boobs nsfw. NOT FOR CHILDREN.",
  usage: "boobs",
  aliases: [],
  category: "NSFW",
  cooldown: 3,
  enabled: true,
  nsfw: true,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const id = [Math.floor(Math.random() * 10930)];
    const res = await superagent.get(`http://api.oboobs.ru/boobs/${id}`);
    const preview = res.body[0]["PREVIEW".toLowerCase()];
    const image = `http://media.oboobs.ru/${preview}`;

    let embed = new MessageEmbed()
      .setTitle(`<:error:919657675820789780> Boobs Image`)
      .setImage(image)
      .setColor('#8b0000')
      .setTimestamp(message.createdAt, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] });
  }
}