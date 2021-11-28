const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'resume',
  description: 'Resume any current music.',
  usage: 'resume',
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
      queue.setPaused(false);
      let embed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`The current song was resumed.`)
        .setColor('PURPLE')
      message.channel.send({ embeds: [embed] });
    } else {
      let errorEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`There is no current song playing.`)
        .setColor('RED')
      message.reply({ embeds: [errorEmbed] });
    };
  }
}
