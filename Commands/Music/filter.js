const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'filter',
  description: 'Add or remove filters to your music.',
  usage: 'filter [filter]',
  aliases: [],
  category: 'Music',
  cooldown: 3,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!message.member.voice.channelId) return await message.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

    let player = client.player;
    let queue = player.getQueue(message.guild.id);
    let filters = require('../../Data/filters.json');

    if (queue) {
      let filter = args[0];
      let toggle = args[1];
      if (!filter) return message.reply('Mate.. just give a filter.');
      if (!toggle) return message.reply('I needa know to enable or disable ' + filter);

      if (filter) {
        //
      } else return message.reply('That filter does not exist, run `filters` to see all filters.')
    } else {
      let errorEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`There is no current song playing.`)
        .setColor('RED')
      message.reply({ embeds: [errorEmbed] });
    };
  }
}
