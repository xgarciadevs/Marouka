const { MessageEmbed } = require("discord.js");
const answer = require('../../Data/neverhaveiever.json');

module.exports = {
  name: "neverhaveiever",
  description: "Play Never-Have-I-Ever.",
  usage: "neverhaveiever",
  aliases: ["never-have-i-ever", "never"],
  category: "Gamse",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    const answers = answer[Math.floor(Math.random() * answer.length)];
    let embed = new MessageEmbed()
      .setDescription(`${answers}`)
      .setColor('#FFFF00')

    message.reply({ embeds: [embed] });
  }
}