const { MessageEmbed } = require("discord.js");
const roast = require('../../Data/roasts.json');

module.exports = {
  name: "roast",
  description: "Send a roast to somebody.",
  usage: "roast [@user]",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send('Please provide somebody to roast.');

    let embed = new MessageEmbed()
      .setDescription(`${user}, ${roast[Math.floor(Math.random() * roast.length)]}`)
      .setColor('#FFFF00')

    message.delete();
    message.channel.send({ embeds: [embed] });
  }
}