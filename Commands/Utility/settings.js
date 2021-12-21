const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: "settings",
  description: "Edit the settings for your server.",
  usage: "settings",
  aliases: ["setting", "config"],
  category: "Utility",
  cooldown: 3,
  enabled: false,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to run this command.')

    let server = await guildSettings.findOne({
      guildId: message.guild.id
    })


    const components = (state, placeHolder) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("Settings")
          .setPlaceholder(placeHolder)
          .setDisabled(state)
          .addOptions(
            {
              label: '🏆 Leveling',
              value: 'leveling',
              description: 'Enable or disable leveling in your server.'
            },
            {
              label: "📜 Logging",
              value: "logging",
              description: "Enable or disable logging in your server."
            }
          )
      ),
    ]

    let homeEmbed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Settings`, message.guild.iconURL({ dynamic: true }))
      .setColor('#7289da')
      .setDescription(`Welcome to your server's personal settings page! This is how you can enable or disable certain things about Compto. To get started, select something from the dropdown below. The dropdown locks after 15 seconds.`)
    let initmessage = await message.reply({ embeds: [homeEmbed], components: components(false, "Select your module here") });

    let filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true; else {
        return interaction.reply({ content: "You must be the author of this interaction to use it.", ephemeral: true })
      }
    }

    let collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      max: 1,
      time: 1000 * 15,
    });

    collector.on("collect", (interaction) => {
      let value = interaction.values[0]

      if (value === "logging") {
        let loggingEmbed = new MessageEmbed()
          .setAuthor(`${message.guild.name} Settings • Logging`, message.guild.iconURL({ dynamic: true }))
          .setDescription("This will log most events that happen such as new emoji, message delete, etc. Keep in mind this is brand new so it will not function fully.\nYou have 15 seconds to click a button.")
          .setColor("RANDOM");

        const components = (state) => [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("enable")
              .setLabel("Enable")
              .setStyle("SUCCESS")
              .setDisabled(state),
              
            new MessageButton()
              .setCustomId("disable")
              .setLabel("Disable")
              .setStyle("DANGER")
              .setDisabled(state),

            new MessageButton()
              .setCustomId("edit")
              .setLabel("Edit")
              .setStyle("PRIMARY")
              .setDisabled(true)
          )
        ];

        interaction.deferUpdate()
        initmessage.edit({ embeds: [loggingEmbed], components: components(false) })

        let filter = (interaction) => {
          if (interaction.user.id === message.author.id) return true; else {
            return interaction.reply({ content: "You must be the author of this interaction to use it.", ephemeral: true })
          }
        }

        let collector = message.channel.createMessageComponentCollector({
          filter,
          max: 1,
          time: 1000 * 15,
        });

        collector.on("collect", async (i) => {
          initmessage.edit({ components: components(true) })
          let value = i.customId;

          if (value === "enable") {
            let loggingCheck = server.logChannel
            if (loggingCheck === true) return i.reply("Logging is already enabled!");
            server.logChannel = true
            await server.save()

            let loggingTrueEmbed = new MessageEmbed()
              .setAuthor(`${message.guild.name} Settings • Logging`, message.guild.iconURL({ dynamic: true }))
              .setColor('GREEN')
              .setDescription('Logging was enabled. Make sure you have a channel with the word `log` in it.')
            initmessage.edit({ embeds: [loggingTrueEmbed], components: [] })
          } else if (value === "disable") {
            let loggingCheck = await server.logChannel
            if (loggingCheck === false) return i.reply("Logging is already disabled!");

            server.logChannel = false
            await server.save()

            let loggingFalseEmbed = new MessageEmbed()
              .setAuthor(`${message.guild.name} Settings • Logging`, message.guild.iconURL({ dynamic: true }))
              .setColor('RED')
              .setDescription('Logging was disabled.')
            initmessage.edit({ embeds: [loggingFalseEmbed], components: [] })
          } else if (value === "edit") {
            //
          };
        });
      } else if (value === "leveling") {
        let levelingEmbed = new MessageEmbed()
          .setAuthor(`${message.guild.name} Settings • Leveling`, message.guild.iconURL({ dynamic: true }))
          .setDescription("This will allow users to earn XP for being active! For now you can't earn anything like roles but soon you can.\nYou have 15 seconds to click a button.")
          .setColor("RANDOM");

        const components = (state) => [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("enable")
              .setLabel("Enable")
              .setStyle("SUCCESS")
              .setDisabled(state),
            new MessageButton()
              .setCustomId("disable")
              .setLabel("Disable")
              .setStyle("DANGER")
              .setDisabled(state),
            new MessageButton()
              .setCustomId("edit")
              .setLabel("Edit")
              .setStyle("PRIMARY")
              .setDisabled(true)
          )
        ];

        interaction.deferUpdate()
        initmessage.edit({ embeds: [levelingEmbed], components: components(false) })

        let filter = (interaction) => {
          if (interaction.user.id === message.author.id) return true; else {
            return interaction.reply({ content: "You must be the author of this interaction to use it.", ephemeral: true })
          }
        }

        let collector = message.channel.createMessageComponentCollector({
          filter,
          max: 1,
          time: 1000 * 15,
        });

        collector.on("collect", async (i) => {
          initmessage.edit({ components: components(true) })
          let value = i.customId;

          if (value === "enable") {
            let levelingCheck = await server.leveling
            if (levelingCheck === true) return i.reply("Leveling is already enabled!");
            server.leveling = true
            await server.save()

            let levelingTrueEmbed = new MessageEmbed()
              .setAuthor(`${message.guild.name} Settings • Leveling`, message.guild.iconURL({ dynamic: true }))
              .setColor('GREEN')
              .setDescription('Leveling was enabled. Make sure you have a channel with the word `log` in it.')
            initmessage.edit({ embeds: [levelingTrueEmbed], components: [] })
          } else if (value === "disable") {
            let levelingCheck = server.leveling
            if (levelingCheck === false) return i.reply("Leveling is already disabled!");
            server.leveling = false
            await server.save()

            let levelingFalseEmbed = new MessageEmbed()
              .setAuthor(`${message.guild.name} Settings • Leveling`, message.guild.iconURL({ dynamic: true }))
              .setColor('RED')
              .setDescription('Leveling was disabled.')
            initmessage.edit({ embeds: [levelingFalseEmbed], components: [] })
          } else if (value === "edit") {
            //
          };
        });
      }
    });

    collector.on("end", (i) => {
      //
    });
  }
}