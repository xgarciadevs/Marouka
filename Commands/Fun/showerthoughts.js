const { MessageEmbed } = require("discord.js");
const shower = require('../../Data/showerThoughts.json');

module.exports = {
  name: "showerthoughts",
  description: "Tells random shower thoughts.",
  usage: "showerthoughts",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setTitle('🚿 Shower Thoughts')
      .setDescription(shower[Math.floor(Math.random() * shower.length)].thought)
      .setColor('BLUE')

    message.reply({ embeds: [embed] })
  }
}