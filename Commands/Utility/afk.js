const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "afk",
  description: "Set yourself as AFK.",
  usage: "afk",
  aliases: [],
  category: "Utility",
  cooldown: 3,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setDescription(`I have set your AFK status. I will send a message to the users who mention you.`)
      .setColor('PURPLE')

    message.reply({ embeds: [embed] })
  }
};