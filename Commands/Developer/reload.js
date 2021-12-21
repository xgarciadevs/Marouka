const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reload",
  description: "Reload a command.",
  usage: "reload [command]",
  aliases: [],
  category: "Developer",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: true,
  guildOnly: true,
  async execute(client, message, args) {
    let commandName = args[0];
    if (!commandName) return message.channel.send('Please provide a command to reload.');
    let command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    try {
      delete require.cache[require.resolve(`../../Commands/${command.category}/${command.name}.js`)];
      let newCommand = require(`../../Commands/${command.category}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);

      const embed = new MessageEmbed()
        .setTitle('Reload Successful')
        .setColor('GREEN')
        .setDescription(`The command \`${command.name}\` was reloaded.`)
      message.reply({ embeds: [embed] });
      console.log(`[RELOAD] Command was reloaded by ${message.author.tag}`);
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
