const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { prefix, token, mongodb, website, invite, support, developers, dscgg } = require('./config.json');
const mongoose = require('mongoose');
const fs = require('fs');

const intents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS]);
const client = new Client({ intents });
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.developers = developers;
client.website = website;
client.mongodb = mongodb;
client.support = support;
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

/* Discord Login */
client.login(token);