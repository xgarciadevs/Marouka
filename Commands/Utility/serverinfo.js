const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const moment = require('moment');

let explicitContentFilterLevelList = { "DISABLED": "Disabled", "MEMBERS_WITHOUT_ROLES": "Members Without Roles", "ALL_MEMBERS": "All Members" }
let mfaLevelList = { "NONE": "None", "ELEVATED": "Elevated" }
let verificationLevelList = { "NONE": "None", "LOW": "Low", "MEDIUM": "Medium", "HIGH": "High", "VERY_HIGH": "Very High" }
let premiumTierList = { "NONE": "None", "TIER_1": "Tier 1", "TIER_2": "Tier 2", "TIER_3": "Tier 3" }
let guildFeaturesList = { "ANIMATED_ICON": "Animated Icon", "BANNER": "Banner", "COMMERCE": "Commerce", "COMMUNITY": "Community", "DISCOVERABLE": "Discoverable", "FEATURABLE": "Featurable", "INVITE_SPLASH": "Invite Splash", "MEMBER_VERIFICATION_GATE_ENABLED": "Member Verification Gate Enabled", "NEWS": "News", "PARTNERED": "Partnered", "PREVIEW_ENABLED": "Preview Enabled", "VANITY_URL": "Vanity URL", "VERIFIED": "Verified", "VIP_REGIONS": "VIP Regions", "WELCOME_SCREEN_ENABLED": "Welcome Screen Enabled", "TICKETED_EVENTS_ENABLED": "Ticketed Events Enabled", "MONETIZATION_ENABLED": "Monetization Enabled", "MORE_STICKERS": "More Stickers", "THREE_DAY_THREAD_ARCHIVE": "Three Day Thread Archive", "SEVEN_DAY_THREAD_ARCHIVE": "Seven Day Thread Archive", "PRIVATE_THREADS": "Private Threads", "NEW_THREAD_PERMISSIONS": "New Thread Permissions", "THREADS_ENABLED": "Threads Enabled" }

module.exports = {
  name: "serverinfo",
  description: "Get info about the server.",
  usage: "serverinfo",
  aliases: ["server-info", "si"],
  category: "Utility",
  cooldown: 3,
  enabled: true,
  nsfw: false,
  devOnly: false,
  guildOnly: true,
  async execute(client, message, args) {
    let guild = message.guild;

    let embed = new MessageEmbed()
      .setTitle(`${guild.name} • Server Information`)
      .setColor('PURPLE')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`${message.guild.description || 'Haven\'t set up a description yet!\nDo this inside of `Settings -> Community -> Overview`'}`)
      .addField('Owner', `${`<@${guild.ownerId}>` || 'Unknown#0000'}`, true) // owner
      .addField('Server ID', `\`${guild.id || `123456789012345678`}\``, true) // server id
      .addField('Created At', `${moment(guild.createdAt).format("LL") || `January 0 3025`}`, true) // created at
      .addField(`Members [${guild.memberCount || '0'}]`, `**Humans:** \`${guild.members.cache.filter(member => !member.user.bot).size}\`\n**Bots:** \`${guild.members.cache.filter(member => member.user.bot).size}\``, true) // members
      .addField(`Channels [${guild.channels.cache.size || '0'}]`, `**Categories:** \`${guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size}\`\n**Text:** \`${guild.channels.cache.filter(channel => channel.type === "GUILD_TEXT").size}\`\n**Voice:** \`${guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE").size}\`\n**News:** \`${guild.channels.cache.filter(channel => channel.type === "GUILD_NEWS").size}\`\n**Stage:** \`${guild.channels.cache.filter(channel => channel.type === "GUILD_STAGE_VOICE").size}\``, true) // channels
      .addField('Boost Tier', `${premiumTierList[guild.premiumTier] || 'No Tier'}`, true) // boost tier
      .addField('Boost Count', `${guild.premiumSubscriptionCount || 'No Boosts'}`, true) // boost count
      .addField('Verification Level', `${verificationLevelList[guild.verificationLevel] || 'No Verification Level'}`, true) // verification level
      .addField('Public Updates Channel', `${`<#${guild.publicUpdatesChannelId}>` || 'No Channel Assigned'}`, true) // public updates channel
      .addField('Rules Channel', `${`<#${guild.rulesChannelId}>` || 'No Channel Assigned'}`, true) // rules channel
      .addField('Vanity URL', `${guild.vanityUrlCode || 'No Vanity URL'}`, true) // vanity url
      .addField('System Channel', `${guild.systemChannel || 'No Channel Assigned'}`, true) // system channel
      .addField('Explicit Content Filter', `${explicitContentFilterLevelList[guild.explicitContentFilter] || 'No Filter Assigned'}`, true) // explicit content filter
      .addField('Mod 2FA Level', `${mfaLevelList[guild.mfaLevel] || 'No Mod 2FA Level'}`, true) // mod 2fa level
      .addField('Server Features', `${guild.features.length ? guild.features.map(flag => guildFeaturesList[flag]).join(" **|** ") : "No Server Features"}`) // server features

    message.reply({ embeds: [embed] })
  }
}