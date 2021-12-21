const { MessageEmbed } = require("discord.js");
const util = require("util");

module.exports = {
  name: "eval",
  description: "Evaluate code without using the editor.",
  usage: "eval [code]",
  aliases: ["run"],
  category: "Developer",
  cooldown: 0,
  enabled: true,
  nsfw: false,
  devOnly: true,
  guildOnly: true,
  async execute(client, message, args) {
    let text = args[0];
    if (!text) return message.reply('Provide something to evaluate..');
    if (text === 'client.token' ||
      text === 'process.env.TOKEN' ||
      text === 'let config = require(`../../config.json`); config.token' ||
      text === 'let config = require(\'../../config.json\'); config.token')
      return message.reply('Yeahhh no token for you.');

    try {
      let code = text.toLowerCase() == "-a" ? args.slice(1).join(" ") : args.join(" ");
      let decideAwait = text.toLowerCase() == "-a" ? `(async () => { {code} })();` : `{code}`;
      decideAwait = decideAwait.replace(`{code}`, code);
      let evaluation = util.inspect(await eval(decideAwait));

      const embed = new MessageEmbed()
        .setTitle('Code Evaluated')
        .setColor('GREEN')
        .addField(`Input`, `\`\`\`js\n${code}\`\`\``)
        .addField(`Output`, `\`\`\`js\n${evaluation}\`\`\``)
      message.reply({ embeds: [embed] });

      console.log(`[EVAL] Command was run by ${message.author.tag} | Contents: ${code}`);
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
