const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Get help with all the bot\'s commands.',
  usage: 'help [optional | command]',
  aliases: [],
  category: 'Bot',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let prefix = client.prefix;
    let commandName = args[0];
    let { commands } = message.client;

    var animalCmds = '';
    var botCmds = '';
    var economyCmds = '';
    var funCmds = '';
    var gameCmds = '';
    var hsnfwCmds = '';
    var imageCmds = '';
    var moderationCmds = '';
    var nsfwCmds = '';
    var utilityCmds = '';

    fs.readdirSync('./Commands/Animals').forEach((file) => animalCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Bot').forEach((file) => botCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Economy').forEach((file) => economyCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Fun').forEach((file) => funCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Games').forEach((file) => gameCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/HNSFW').forEach((file) => hsnfwCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Image').forEach((file) => imageCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Moderation').forEach((file) => moderationCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/NSFW').forEach((file) => nsfwCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);
    fs.readdirSync('./Commands/Utility').forEach((file) => utilityCmds += `${prefix}${file.slice(0, file.lastIndexOf('.'))} `);

    if (!commandName) {
      const homeEmbed = new MessageEmbed()
        .setTitle('<:explore:920459380766429184> Marouka Help Menu')
        .setDescription(`Welcome! Use the dropdown below to choose a category and see all commands within it. To get help with a specific command, use: \`${prefix}help [command name]\``)
        .setColor('PURPLE')

      const components = (state, placeHolder) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("Category")
            .setPlaceholder(placeHolder)
            .setDisabled(state)
            .addOptions(
              {
                label: 'Home',
                value: 'home',
                description: 'Go back to the home embed to see all categories.',
                emoji: '<:explore:920459380766429184>'
              },
              {
                label: 'Animal',
                value: 'animal',
                description: 'Cat, Panda, and other related commands.',
                // emoji: '<:robot:920459381013872681>'
              },
              {
                label: 'Bot',
                value: 'bot',
                description: 'Botinfo, Profile, and other related commands.',
                emoji: '<:robot:920459381013872681>'
              },
              {
                label: 'Economy',
                value: 'economy',
                description: 'Balance, Shop, and other related commands.',
                emoji: '<:backpack:920459380783198208>'
              },
              {
                label: 'Fun',
                value: 'fun',
                description: '8ball, ShowerThoughts, and other related commands.',
                // emoji: '<:controller:920459380799987752>'
              },
              {
                label: 'Game',
                value: 'game',
                description: 'NeverHaveIEver, Slots, and other related commands.',
                emoji: '<:controller:920459380799987752>'
              },
              {
                label: 'HNSFW',
                value: 'hnsfw',
                description: 'Hentai, Kitsune, and other related commands.',
                emoji: '<:18plus:920459380888076348>'
              },
              {
                label: 'Image',
                value: 'image',
                description: 'Affect, Wanted, and other related commands.',
                emoji: '<:image:920459380883865610>'
              },
              {
                label: 'Moderation',
                value: 'moderation',
                description: 'Ban, Warn, and other related commands.',
                emoji: '<:shield:920459380804161546>'
              },
              {
                label: 'NSFW',
                value: 'nsfw',
                description: 'Ass, Tits, and other related commands.',
                emoji: '<:18plus:920459380888076348>'
              },
              {
                label: 'Utility',
                value: 'utility',
                description: 'AFK, Serverinfo, and other related commands.',
                emoji: '<:newspaper:920459380783210516>'
              }
            )
        ),
      ]

      let initmessage = await message.reply({ embeds: [homeEmbed], components: components(false, "Select your category here") });

      let filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true; else {
          return interaction.reply({ content: "You must be the author of this interaction to use it.", ephemeral: true })
        }
      }

      let collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        max: 1000,
        time: 60000,
      });

      collector.on("collect", (interaction) => {
        interaction.deferUpdate()
        let value = interaction.values[0]

        if (value === 'home') {
          initmessage.edit({ embeds: [homeEmbed], components: components(false, "Select your category here") })
        } else if (value === 'bot') {
          const botEmbed = new MessageEmbed()
            .setTitle('<:robot:920459381013872681> Marouka Help Menu | Bot Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${botCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [botEmbed], components: components(false, "Select your category here") })
        } else if (value === 'animal') {
          const animalEmbed = new MessageEmbed()
            .setTitle('[emoji] Marouka Help Menu | Animal Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${animalCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [animalEmbed], components: components(false, "Select your category here") })
        } else if (value === 'economy') {
          const economyEmbed = new MessageEmbed()
            .setTitle('<:backpack:920459380783198208> Marouka Help Menu | Economy Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${economyCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [economyEmbed], components: components(false, "Select your category here") })
        } else if (value === 'fun') {
          const funEmbed = new MessageEmbed()
            .setTitle('Marouka Help Menu | Fun Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${funCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [funEmbed], components: components(false, "Select your category here") })
        } else if (value === 'fun') {
          const funEmbed = new MessageEmbed()
            .setTitle('<:controller:920459380799987752> Marouka Help Menu | Game Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${gameCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [funEmbed], components: components(false, "Select your category here") })
        } else if (value === 'hnsfw') {
          const funEmbed = new MessageEmbed()
            .setTitle('<:18plus:920459380888076348> Marouka Help Menu | Hentai NSFW Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${hsnfwCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [funEmbed], components: components(false, "Select your category here") })
        } else if (value === 'image') {
          const imageEmbed = new MessageEmbed()
            .setTitle('<:image:920459380883865610> Marouka Help Menu | Image Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${imageCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [imageEmbed], components: components(false, "Select your category here") })
        } else if (value === 'moderation') {
          const moderationEmbed = new MessageEmbed()
            .setTitle('<:shield:920459380804161546> Marouka Help Menu | Moderation Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${moderationCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [moderationEmbed], components: components(false, "Select your category here") })
        } else if (value === 'nsfw') {
          const funEmbed = new MessageEmbed()
            .setTitle('<:18plus:920459380888076348> Marouka Help Menu | NSFW Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${nsfwCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [funEmbed], components: components(false, "Select your category here") })
        } else if (value === 'utility') {
          const utilityEmbed = new MessageEmbed()
            .setTitle('<:newspaper:920459380783210516> Marouka Help Menu | Utility Commands')
            .setDescription(`To get help with a specific command, use: \`${prefix}help [command name]\`\n\`\`\`${utilityCmds || 'No commands exist.'}\`\`\``)
            .setColor('PURPLE')

          initmessage.edit({ embeds: [utilityEmbed], components: components(false, "Select your category here") })
        }
      });

      collector.on("end", (i) => {
        initmessage.edit({ components: components(true, 'Dropdown was disabled.') })
      });
    } else if (commandName) {
      const name = commandName.toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
      if (!command) return message.reply(`That command does not exist! Run the \`${prefix}help\` command to see all commands.`);

      const commandEmbed = new MessageEmbed()
        .setTitle('Marouka Help Menu | ' + command.name + ' command')
        .setDescription(command.description)
        .addField('Usage', command.usage, true)
        .addField('Aliases', command.aliases.join(', ') || 'None', true)
        .addField('Category', command.category, true)
        .addField('Cooldown', `${command.cooldown} second(s)`, true)
        .addField('Enabled', `${command.enabled}`, true)
        .addField('NSFW', `${command.nsfw}`, true)
        .setColor('PURPLE')

      message.reply({ embeds: [commandEmbed] });
    }
  }
}