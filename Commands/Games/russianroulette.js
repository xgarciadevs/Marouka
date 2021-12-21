const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "russianroulette",
  description: "Start a game of russian roulette.",
  usage: "russianroulette",
  aliases: [],
  category: "Games",
  cooldown: 5,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    var roulette = [
      "Pow! You are dead, try again?",
      "Luckily for yourself, you survived! Just barely.",
      "Click! Phew your safe, for now.",
      "Boom! You died. Wanna try again in Heaven!"
    ];

    let embed = new MessageEmbed()
      .setTitle(':gun: Russian Roulette')
      .setDescription(roulette[Math.floor(Math.random() * roulette.length)])
      .setColor('#8205B3')
    message.reply({ embeds: [embed] });
  }
}