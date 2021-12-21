const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn a user.",
  usage: "warn [@user] [message]",
  aliases: [],
  category: "Moderation",
  cooldown: 3,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let user = message.mentions.users.first();
    if (!user) return message.reply('omg.. mention a user to warn you nub.')

    let UserData = await UserSettings.findOne({
      userId: user.id,
    });

    if (!UserData) {
      const createUser = new UserSettings({
        userId: user.id,
      });

      await createUser.save();
    };

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason was specified.'

    UserData.warnings + 1;
    UserData.save()

    let totalWarns = UserData.warnings;

    let embed = new MessageEmbed()
      .setTitle('Member was warned')
      .setDescription(`**Reason:** ${reason}\n\n**Moderator:** <@${message.author.id}>\n**Total Warns:** ${totalWarns}`)
      .setColor('#7289da')

    message.reply({ embeds: [embed] });
  }
}