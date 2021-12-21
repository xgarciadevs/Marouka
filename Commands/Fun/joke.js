const { MessageEmbed } = require("discord.js");
const jokes = require('../../Data/jokes.json');

module.exports = {
  name: "joke",
  description: "Send a joke and impress your friends.",
  usage: "joke",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setDescription(jokes[Math.floor(Math.random() * jokes.length)])
      .setColor('#FFFF00')

    message.reply({ embeds: [embed] })
  }
}