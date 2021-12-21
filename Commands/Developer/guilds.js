const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guilds",
  description: "Shows all guilds the bot is in.",
  usage: "guilds",
  aliases: [],
  category: "Developer",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: true,
  guildOnly: true,
  async execute(client, message, args) {
    let string = '';
    client.guilds.cache.forEach(guild => { string += "**" + guild.name + "** | `" + guild.id + "` | <@" + guild.ownerId + ">\n" })

    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setTitle('Server Name & ID & Owner')
      .setDescription(`${string}`)
    await message.reply({ embeds: [embed] });
  }
}
