const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages up to 100 and below 14 days.",
  usage: "clear [amount]",
  aliases: ["purge"],
  category: "Moderation",
  cooldown: 2,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) { const missingPermsEmbed = new MessageEmbed().setDescription('You do not have the `MANAGE_MESSAGES` permission.').setColor('RED'); return message.reply({ embeds: [missingPermsEmbed] }); }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) { const meMissingPermsEmbed = new MessageEmbed().setDescription('I do not have the `MANAGE_MESSAGES` permission.').setColor('RED'); return message.reply({ embeds: [meMissingPermsEmbed] }); }

    let amount = parseInt(args[0]);
    if (amount < 2 || amount > 100) return message.reply('Cmon.. enter a valid number.')
    if (!amount) return message.reply('Should provide a number from `1-100`.');

    message.channel.bulkDelete(amount).then(() => {
      const embed = new MessageEmbed()
        .setDescription(`Successfully deleted **${amount}** message(s).`)
        .setColor('PURPLE');
      message.reply({ embeds: [embed] }).then(msg => msg.delete({ timeout: 5000 }));
    })
  }
}