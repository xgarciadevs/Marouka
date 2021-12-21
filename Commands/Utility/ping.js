const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Tells you bots response time.",
  usage: "ping",
  aliases: ["pong", "response"],
  category: "Utility",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    var ping = Date.now() - message.createdTimestamp;

    let embed = new MessageEmbed()
      .setTitle(':ping_pong: Ping')
      .addField('Latency', `${ping}ms`, true)
      .addField('API', `${client.ws.ping}ms`, true)
      .setColor('PURPLE')

    message.reply({ embeds: [embed] })
  }
}