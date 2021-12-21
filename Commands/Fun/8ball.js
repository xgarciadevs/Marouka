const { MessageEmbed } = require('discord.js');
const answers = require('../../Data/8ball.json');

module.exports = {
  name: "8ball",
  description: "Get a mystical answer from the 8ball.",
  usage: "8ball [question]",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!args[0]) return message.reply('Please provide something to answer.');
    let answer = answers[Math.floor(Math.random() * answers.length)];

    let embed = new MessageEmbed()
      .setTitle(':8ball: 8ball')
      .setDescription(`**Your question:** ${args.slice(0).join(' ')}\n**Answer:** ${answer}`)
      .setColor('RANDOM')
    message.reply({ embeds: [embed] });
  }
}
