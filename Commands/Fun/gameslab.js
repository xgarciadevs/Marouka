const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'gameslab',
  description: 'Play official **Discord Games Lab** games right inside of your server.',
  usage: 'gameslab [application]',
  aliases: ['gameslab'],
  category: 'Fun',
  cooldown: 1,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let prefix = client.prefix;

    const embed = new MessageEmbed()
      .setTitle('Discord Games Lab')
      .setDescription('Welcome to Discord Games Lab! This is how you can play custom Discord Activities inside of your voice channel. These are brand new and many of these **only work in certan servers**! If a invite link is not sent, your server cannot run that activity yet.')
      .addField(':movie_camera: YouTube', `\`${prefix}gameslab youtube\``, true)
      .addField(':movie_camera: YouTube Dev', `\`${prefix}gameslab youtubedev\``, true)
      .addField(':name_badge: Poker', `\`${prefix}gameslab poker\``, true)
      .addField(':gun: Betrayal', `\`${prefix}gameslab betrayal\``, true)
      .addField(':fishing_pole_and_fish: Fishing', `\`${prefix}gameslab fishing\``, true)
      .addField(':chess_pawn: Chess', `\`${prefix}gameslab chess\``, true)
      .addField(':chess_pawn: Chess Dev', `\`${prefix}gameslab chessdev\``, true)
      .addField(':abcd: Letter Tile', `\`${prefix}gameslab lettertile\``, true)
      .addField(':pancakes: Word Snack', `\`${prefix}gameslab wordsnack\``, true)
      .addField(':pencil: Doodle Crew', `\`${prefix}gameslab doodlecrew\``, true)
      .addField(':name_badge: Awkword', `\`${prefix}gameslab awkword\``, true)
      .addField(':name_badge: Spell Cast', `\`${prefix}gameslab spellcast\``, true)
      .addField(':name_badge: Checkers', `\`${prefix}gameslab checkers\``, true)
      .addField(':name_badge: Putty Party', `\`${prefix}gameslab puttyparty\``, true)
      .addField(':name_badge: Sketchy Artist', `\`${prefix}gameslab sketchyartist\``, true)
      .setColor('PURPLE')

    let activity = args[0];
    if (!activity) return message.reply({ embeds: [embed] });

    let youtubeID = '880218394199220334';
    let youtubedevID = '880218832743055411';
    let pokerID = '755827207812677713';
    let betrayalID = '773336526917861400';
    let fishingID = '814288819477020702';
    let chessID = '832012774040141894';
    let chessdevID = '832012586023256104';
    let lettertileID = '879863686565621790';
    let wordsnackID = '879863976006127627';
    let doodlecrewID = '878067389634314250';
    let awkwordID = '879863881349087252';
    let spellcastID = '852509694341283871';
    let checkersID = '832013003968348200';
    let puttpartyID = '763133495793942528';
    let sketchyartistID = '879864070101172255';

    if (activity) {
      if (!message.member.voice.channelId) return await message.reply({ content: "You are not in a voice channel!", ephemeral: true });
      let voiceChannelId = message.member.voice.channelId;

      if (activity == 'youtube') {
        try {
          await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
            method: 'POST',
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: youtubeID,
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              'Authorization': `Bot ${require('../../config.json').token}`,
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(invite => {
              if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
              if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

              let youtubeEmbed = new MessageEmbed()
                .setTitle('Discord Games Lab')
                .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play YouTube!`)
                .setColor('#8205B3')

              return message.reply({ embeds: [youtubeEmbed] });
            })
        } catch (error) {
          let errorMessages = require('../../Data/error.json').error;
          let errMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

          let errorEmbed = new MessageEmbed()
            .setTitle(`<:redwarning:865854104193466368> ${errMsg}`)
            .setColor('RED')
            .setDescription(`The error has been logged to the console. Here is a brief description of the error:\n\n\`\`\`${error}\`\`\``)

          message.reply({ embeds: [errorEmbed] });

          let cmdErrorEmbed = new MessageEmbed()
            .setTitle(`Command Error`)
            .setDescription(`**Command:** ${this.name}\n**Error:** ${error}`)
            .setColor('RED')
            .setTimestamp(message.createdAt, true)
          client.guilds.cache.get('881302684811030538').channels.cache.get('881334177855864894').send({ embeds: [cmdErrorEmbed] })
        }
      }
    } else if (activity == 'youtubedev') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: youtubedevID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let youtubedevEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play YouTube Dev!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [youtubedevEmbed] });
          })
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
    } else if (activity == 'poker') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: pokerID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let pokerEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Poker!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [pokerEmbed] });
          })
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
    } else if (activity == 'betrayal') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: betrayalID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let betrayalEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Betrayal!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [betrayalEmbed] });
          })
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
    } else if (activity == 'fishing') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: fishingID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let fishingEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Fishing!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [fishingEmbed] });
          })
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
    } else if (activity == 'chess') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: chessID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let chessEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Chess!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [chessEmbed] });
          })
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
    } else if (activity == 'chessdev') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: chessdevID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let chessdevEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Chess Dev!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [chessdevEmbed] });
          })
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
    } else if (activity == 'lettertile') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: lettertileID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let lettertileEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Letter Tile!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [lettertileEmbed] });
          })
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
    } else if (activity == 'wordsnack') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: wordsnackID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let wordsnackEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Word Snack!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [wordsnackEmbed] });
          })
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
    } else if (activity == 'doodlecrew') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: doodlecrewID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let doodlecrewEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Doodle Crew!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [doodlecrewEmbed] });
          })
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
    } else if (activity == 'awkword') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: awkwordID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let awkwordEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Awkword!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [awkwordEmbed] });
          })
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
    } else if (activity == 'spellcast') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: spellcastID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let spellcastEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Spell Cast!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [spellcastEmbed] });
          })
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
    } else if (activity == 'checkers') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: checkersID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let checkersEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Checkers!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [checkersEmbed] });
          })
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
    } else if (activity == 'puttyparty') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: puttpartyID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let puttypartyEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Putty Party!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [puttypartyEmbed] });
          })
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
    } else if (activity == 'sketchyartist') {
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: sketchyartistID,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            'Authorization': `Bot ${require('../../config.json').token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(invite => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')

            let sketchyartistEmbed = new MessageEmbed()
              .setTitle('Discord Games Lab')
              .setDescription(`Click **[here](https://discord.com/invite/${invite.code})** to play Sketchy Artist!`)
              .setColor('#8205B3')

            return message.reply({ embeds: [sketchyartistEmbed] });
          })
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
}