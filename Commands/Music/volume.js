const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'volume',
  description: 'Change the volume of the music.',
  usage: 'volume [0-100]',
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
    const volume = parseInt(args.slice(0).join(' '));
    if (!volume) return message.reply('Yo you should respond with a number.');
    if (volume > 100) return message.reply('Hey man.. were trying to vibe, not make everyone\'s ears bleed.');
    if (volume < 0) return message.reply('Maybe you should make it so people can HEAR THE MUSIC.');
    let queue = player.getQueue(message.guild.id);

    if (queue) {
      queue.setVolume(volume);
      let embed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`Set the volume to **${volume}**.`)
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
