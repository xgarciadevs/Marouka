const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shutdown",
  description: "Shutdown the bot.",
  usage: "shutdown",
  aliases: [],
  category: "Developer",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: true,
  guildOnly: true,
  async execute(client, message, args) {
    try {
      const embed = new MessageEmbed()
        .setTitle('<:robot:920459381013872681> Shutting down..')
        .setColor('#FFFF00')
        .setDescription(`I am shutting down... goodbye!`)
      await message.reply({ embeds: [embed] });

      console.log(`[SHUTDOWN] Bot was shutdown by ${message.author.tag}`);
      process.exit();
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
