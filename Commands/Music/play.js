const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'play',
  description: 'Play some music in your current voice channel.',
  usage: 'play [song name/link]',
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
    const query = args.slice(0).join(' ');
    const queue = player.createQueue(message.guild, { metadata: { channel: message.channel } });

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      queue.destroy();
      return await message.reply({ content: 'I could not join your voice channel!', ephemeral: true });
    }

    const track = await player.search(query, {
      requestedBy: message.author.id
    }).then(x => x.tracks[0]);

    let trackNotFoundEmbed = new MessageEmbed()
      .setTitle(`:musical_note: ${message.guild.name}'s Player`)
      .setDescription(`Track **${query}** was not found. Try again, maybe with different spelling.`)
      .setColor('RED');

    if (!track) return await message.reply({ embeds: [trackNotFoundEmbed] });

    queue.play(track);
  }
}
