const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "hwallpaper",
  description: "Get wallpaper nsfw. NOT FOR CHILDREN.",
  usage: "hwallpaper",
  aliases: [],
  category: "HSNFW",
  cooldown: 3,
  enabled: true,
  nsfw: true,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
      const { body } = await superagent.get('https://nekos.life/api/v2/img/wallpaper');
      let image = body.url;
      
      let embed = new MessageEmbed()
        .setTitle(`<:error:919657675820789780> Wallpaper`)
        .setImage(image)
        .setColor('#8b0000')
        .setTimestamp(message.createdAt, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))

      message.channel.send({ embeds: [embed] });
  }
}