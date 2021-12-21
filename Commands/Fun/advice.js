const { MessageEmbed } = require("discord.js");
const request = require('superagent');

module.exports = {
  name: "advice",
  description: "Get some helpful advice.",
  usage: "advice",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let link = 'https://api.adviceslip.com/advice';

    request.get(link).end((err, res) => {
      if (!err && res.status === 200) {
        const advice = JSON.parse(res.text)

        let embed = new MessageEmbed()
          .setTitle(':open_hands: Your advice')
          .setDescription(advice.slip.advice)
          .setColor('LUMINOUS_VIVID_PINK')

        message.reply({ embeds: [embed] })
      } else {
        let errorMessages = require('../../Data/error.json').error;
        let errMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

        let errorEmbed = new MessageEmbed()
          .setTitle(`<:error:919657675820789780> ${errMsg}`)
          .setColor('RED')
          .setDescription(`The error has been logged to the console. Here is a brief description of the error:\n\n\`\`\`${error}\`\`\``)

        message.reply({ embeds: [errorEmbed] });

        let cmdErrorEmbed = new MessageEmbed()
          .setTitle(`Command Error`)
          .setDescription(`**Command:** ${this.name}\n**Error:** ${error}`)
          .setColor('RED')
          .setTimestamp(message.createdAt, true)
        client.guilds.cache.get('899435249191239730').channels.cache.get('899452571041800283').send({ embeds: [cmdErrorEmbed] })
      }
    });
  }
}