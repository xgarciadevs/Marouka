const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'remove',
  description: 'Remove a song from the queue.',
  usage: 'remove [track number]',
  aliases: [],
  category: 'Music',
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!message.member.voice.channelId) return await message.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

    let player = client.player;
    let queue = player.getQueue(message.guild.id);

    if (queue) {
      let trackNumberGiven = parseInt(args[0]);
      let trackNumber = trackNumberGiven + 1;
      if (!trackNumberGiven) return message.reply('You might wanna run `queue` cmd and get a track number..');

      queue.remove(trackNumber);
      let embed = new MessageEmbed()
        .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
        .setDescription(`Removed track from queue.`)
        .setColor('PURPLE');
      message.reply({ embeds: [embed] });
    } else {
      let errorEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`There is no current song playing.`)
        .setColor('RED')
      message.reply({ embeds: [errorEmbed] });
    };
  }
}
