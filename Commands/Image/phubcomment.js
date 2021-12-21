const canvacord = require('canvacord');

module.exports = {
  name: "phubcomment",
  description: "Create a phub comment.",
  usage: "phubcomment [comment]",
  aliases: ["phub-comment"],
  category: "Image",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let usernameProv = message.author.username;
    let messageProv = args.slice(0).join(' ');
    let imageProv = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    if (!messageProv) return message.reply('Please provide a message for the comment.');
    let image = await canvacord.Canvas.phub({ username: usernameProv, message: messageProv, image: imageProv });
    return message.reply({ files: [{ attachment: image, name: "comment.png" }] });
  }
}