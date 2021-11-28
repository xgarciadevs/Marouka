const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'filters',
  description: 'See all possible filters for your music.',
  usage: 'filters',
  aliases: [],
  category: 'Music',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let filters = require('../../Data/filters.json');

    let embed = new MessageEmbed()
      .setTitle(`:musical_note: Music Filters`)
      .setDescription(`\`\`\`${filters.map((f) => { return `${`${f}`}`; }).join("\n")}\`\`\``)
      .setColor('PURPLE');
    message.reply({ embeds: [embed] });
  }
}
