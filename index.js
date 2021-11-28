const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { prefix, token, mongodb, website, invite, support, developers, dscgg } = require('./config.json');
const { Player } = require('discord-player');
const mongoose = require('mongoose');
const fs = require('fs');

const intents = new Intents(['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']);
const client = new Client({ intents });
const player = new Player(client);
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.developers = developers;
client.website = website;
client.mongodb = mongodb;
client.support = support;
client.player = player;
client.prefix = prefix;
client.invite = invite;
client.dscgg = dscgg;

fs.readdirSync('./Commands').forEach(folder => {
  fs.readdirSync(`./Commands/${folder}`).forEach(file => {
    const command = require(`./Commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    if (!command.aliases) return;
    command.aliases.forEach((alias) => {
      client.aliases.set(alias, command);
    });
  });
});

fs.readdirSync('./Events').forEach(folder => {
  fs.readdirSync(`./Events/${folder}`).forEach(file => {
    const event = require(`./Events/${folder}/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
  });
});

/* MongoDB */
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

/* Music Events */
player.on('botDisconnect', (queue) => {
  let botDisconnectEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription('Oops! I got disconnected from the channel.')
    .setColor('RED');

  queue.metadata.channel.send({ embeds: [botDisconnectEmbed] });
}).on('channelEmpty', (queue) => {
  let channelEmptyEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription('Oops! The channel is currently empty, so I disconnected.')
    .setColor('RED');

  queue.metadata.channel.send({ embeds: [channelEmptyEmbed] });
}).on('connectionError', (queue, error) => {
  let connectionErrorEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription('Oops! There was a connection error.\n\n**Error:** ' + error)
    .setColor('YELLOW');

  queue.metadata.channel.send({ embeds: [connectionErrorEmbed] });
}).on('error', (queue, error) => {
  let errorEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription(`Oops! There was a error.\n\n**Error:** ${error}`)
    .setColor('YELLOW');

  queue.metadata.channel.send({ embeds: [errorEmbed] });
}).on('queueEnd', (queue) => {
  let queueEndEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription('Well, the queue ended so I disconnected from the channel.')
    .setColor('RED');

  queue.metadata.channel.send({ embeds: [queueEndEmbed] });
}).on('trackAdd', (queue, track) => {
  let trackAddEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription(`**[${track.title}](${track.url})** has been added to the queue.`)
    .setColor('GREEN');

  queue.metadata.channel.send({ embeds: [trackAddEmbed] });
}).on('tracksAdd', (queue, tracks) => {
  let tracksAddEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription(`Added **${tracks.length}** tracks to the queue.`)
    .setColor('GREEN');

  queue.metadata.channel.send({ embeds: [tracksAddEmbed] });
}).on('trackStart', (queue, track) => {
  let trackStartEmbed = new MessageEmbed()
    .setTitle(`:musical_note: ${queue.guild.name}'s Player`)
    .setDescription(`Now playing **[${track.title}](${track.url})**`)
    .setThumbnail(track.thumbnail)
    .addField('Requested by', `${track.requestedBy}`, true)
    .addField('Artist', `${track.author}`, true)
    .addField('Duration', `\`${track.duration}\``, true)
    .setColor('PURPLE');

  queue.metadata.channel.send({ embeds: [trackStartEmbed] });
});

/* Discord Login */
client.login(token);