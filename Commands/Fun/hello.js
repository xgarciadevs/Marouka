const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "hello",
  description: "Have someone say hi to you!",
  usage: "hello",
  aliases: ["hi", "hey"],
  category: "Fun",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let randomHello = ["hey", "halo", "hai", "hello", "hola", "hola papi"]
    let random = randomHello[Math.floor(Math.random() * randomHello.length)];
    message.reply(`${random} <@${message.author.id}>!`)
  }
}