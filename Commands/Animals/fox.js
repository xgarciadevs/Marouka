const { MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "fox",
  description: "Get a fun image and fact about foxes.",
  usage: "fox",
  aliases: [],
  category: "Animals",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  ownerOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let url = 'https://some-random-api.ml/img/fox';
    let facts = 'https://some-random-api.ml/facts/fox';
    let image, response;
    let fact, responses;

    try {
      response = await axios.get(url);
      image = response.data;
      responses = await axios.get(facts);
      fact = responses.data;

      const embed = new MessageEmbed()
        .setTitle(":fox: Random Fox Image and Fact")
        .setColor('RANDOM')
        .setDescription(fact.fact)
        .setImage(image.link)
      await message.reply({ embeds: [embed] });
    } catch (error) {
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
  }
}