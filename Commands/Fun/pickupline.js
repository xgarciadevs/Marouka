const { MessageEmbed } = require("discord.js");
const pickupLines = require('../../Data/pickupLines.json');

module.exports = {
  name: "pickupline",
  description: "Get a pickup line ready-to-use and impress your crush/date.",
  usage: "pickupline",
  aliases: ["pickup-line"],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setDescription(`:sparkling_heart: ${pickupLines[Math.round(Math.random() * (pickupLines.length - 1))]}`)
      .setColor('#8205B3')

    message.reply({ embeds: [embed] });
  }
}