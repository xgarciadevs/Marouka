const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { truths, dares } = require('../../Data/td.json');

module.exports = {
  name: "truthordare",
  description: "Start a game of truth-or-dare.",
  usage: "truthordate [truth | dare]",
  aliases: ["truth-or-dare"],
  category: "Games",
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let embedChoice;
    let selectionEmbed = new MessageEmbed()
      .setTitle('Truth or Dare')
      .setColor('PURPLE')
      .setDescription('Click a button below to choose your fate.');

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('Truth')
          .setStyle('PRIMARY')
          .setEmoji('🤓')
          .setCustomId('truth')
          .setDisabled(state),
        new MessageButton()
          .setLabel('Dare')
          .setStyle('DANGER')
          .setEmoji('😈')
          .setCustomId('dare')
          .setDisabled(state),
      )
    ]

    embedChoice = selectionEmbed;
    const initmessage = await message.reply({ embeds: [selectionEmbed], components: components(false) })

    const filter = (interaction) => {
      if (interaction.message.id !== initmessage.id) return false
      if (interaction.user.id !== message.author.id) {
        interaction.reply({ content: 'You must be the author of this interaction to use it.', ephemeral: true })
        return false
      }
      return interaction
    }

    const collector = message.channel.createMessageComponentCollector({
      filter, componentType: 'BUTTON', max: 1000, time: 10000,
    })

    collector.on('collect', (interaction) => {
      interaction.deferUpdate()

      if (!interaction) return
      const value = interaction.customId

      if (value === 'truth') {
        const truthEmbed = new MessageEmbed()
          .setTitle(':nerd: Your truth...')
          .setDescription(`${truths[Math.floor(Math.random() * truths.length)]}`)
          .setColor('YELLOW')

        embedChoice = truthEmbed;
        initmessage.edit({ embeds: [truthEmbed], components: [] })
      } else if (value === 'dare') {
        const dareEmbed = new MessageEmbed()
          .setTitle(':smiling_imp: Your dare..')
          .setDescription(`${dares[Math.floor(Math.random() * dares.length)]}`)
          .setColor('RED')

        embedChoice = dareEmbed;
        initmessage.edit({ embeds: [dareEmbed], components: [] })
      }
    })

    collector.on('end', () => { if (embedChoice === selectionEmbed) initmessage.edit({ components: components(true) }); else if (embedChoice === 'truthEmbed' || embedChoice === 'dareEmbed') initmessage.edit({ components: [] })});
  }
}