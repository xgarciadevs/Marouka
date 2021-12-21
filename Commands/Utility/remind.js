const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "remind",
  description: "Set a reminder.",
  usage: "afk",
  aliases: ['reminder'],
  category: "Utility",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let reminder = args.slice(1).join(' ');
    let time = args[0];
    if (!time) return message.reply('Dumb dumb, add a duration for your reminder.');
    if (!reminder) return message.reply('Add a reminder.. otherwise you don\'t get a cookie.');

    let setEmbed = new MessageEmbed()
      .setTitle('Reminder Set!')
      .setDescription(`Your reminder was successfully created! Remember to have your DM's open for this to work.\n\n**Reminding you in:** ${time}\n**Your Reminder:** ${reminder}`)
      .setColor('PURPLE')

    message.reply({ embeds: [setEmbed] })

    setTimeout(async function () {
      let remindEmbed = new MessageEmbed()
        .setTitle('Ding Ding! Your Reminder is here :)')
        .setDescription(`**Your Reminder:** ${reminder}`)
        .setColor('PURPLE')

      message.author.send({ embeds: [remindEmbed] })
    }, ms(time));
  }
};