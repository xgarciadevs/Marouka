const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'queue',
  description: 'Take a look at the queue.',
  usage: 'queue',
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
      let queueMap = queue.tracks.map((track, i) => { return `${`**${i + 1}: [${track.title}](${track.url})**\n**Requested by:** ${track.requestedBy}\n**Artist:** ${track.author}\n**Duration:** \`${track.duration}\``}`; }).join("\n\n");
      if (queueMap.length > 2048 && queueMap.length < 4096) {
        let queueDescOneEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(queueMap.substring(0, 2048))
        .setColor('PURPLE')
  
        let queueMapTwoEmbed = new MessageEmbed()
        .setDescription(queueMap.substring(2048, 4096))
        .setColor('PURPLE')
  
        message.reply({ embeds: [queueDescOneEmbed] });
        message.channel.send({ embeds: [queueMapTwoEmbed] });
      } else if (queueMap.length < 2048) {
        let queueMapEmbed = new MessageEmbed()
          .setColor('#7289da')
          .setTitle(`:musical_note: ${message.guild.name}'s Player`)
          .setDescription(queueMap.substring(0, 2048))
        message.reply({ embeds: [queueMapEmbed] });
      }
      // let embed = new MessageEmbed()
      //   .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
      //   .setDescription(`Currently playing **[${track.title}](${track.url})**`)
      //   .setThumbnail(track.thumbnail)
      //   .addField('Requested by', `${track.requestedBy}`, true)
      //   .addField('Artist', `${track.author}`, true)
      //   .addField('Duration', `\`${track.duration}\``, true)
      //   .addField(`Progress`, queue.createProgressBar())
      //   .setColor('PURPLE');
      // message.reply({ embeds: [embed] });
    } else {
      let errorEmbed = new MessageEmbed()
        .setTitle(`:musical_note: ${message.guild.name}'s Player`)
        .setDescription(`There is no current song playing.`)
        .setColor('RED')
      message.reply({ embeds: [errorEmbed] });
    };
  }
}
