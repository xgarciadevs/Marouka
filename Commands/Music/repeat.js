const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'repeat',
  description: 'Repeat the current song or the queue.',
  usage: 'repeat',
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
      let mode = args.slice(0).join(' ');

      if (mode === 'song') {
        queue.setRepeatMode(1);
        let songEmbed = new MessageEmbed()
          .setTitle(`:musical_note: ${message.guild.name}'s Player`)
          .setDescription(`You are now repeating the current song.`)
          .setColor('GREEN')

        message.reply({ embeds: [songEmbed] });
      } else if (mode === 'queue') {
        queue.setRepeatMode(2);
        let queueEmbed = new MessageEmbed()
          .setTitle(`:musical_note: ${message.guild.name}'s Player`)
          .setDescription(`You are now repeating the queue.`)
          .setColor('GREEN')

        message.reply({ embeds: [queueEmbed] });
      } else if (mode === 'stop') {
        queue.setRepeatMode(0);
        let stopEmbed = new MessageEmbed()
          .setTitle(`:musical_note: ${message.guild.name}'s Player`)
          .setDescription(`You have stopped repeating the song or the queue.`)
          .setColor('RED')

        message.reply({ embeds: [stopEmbed] });
      } else return message.reply('Next time add a mode.. you can either repeat the `song`, the `queue`, or `stop` repeating.');
    } else {
      let errorEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`There is no current song playing.`)
        .setColor('RED')
      message.reply({ embeds: [errorEmbed] });
    };
  }
}
