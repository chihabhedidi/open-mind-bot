const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports.run = async (bot, message, args) => {
    const filterLevels = {
        DISABLED: 'Off',
        MEMBERS_WITHOUT_ROLES: 'No Role',
        ALL_MEMBERS: 'Everyone'
    };
    const verificationLevels = {
        NONE: 'None',
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: 'High',
        VERY_HIGH: 'Highest'
    };
    let region;
    switch (message.guild.region) {
        case "europe":
            region = '🇪🇺 Europe';
            break;
        case "us-east":
            region = '🇺🇸 us-east'
            break;
        case "us-west":
            region = '🇺🇸 us-west';
            break;
        case "us-south":
            region = '🇺🇸 us-south'
            break;
        case "us-central":
            region = '🇺🇸 us-central'
            break;
    }

    if (!message.guild.members.cache.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
			.setThumbnail(message.guild.iconURL({ format: 'png' }))
			.addField('❯ Name', message.guild.name, true)
			.addField('❯ ID', message.guild.id, true)
			.addField('❯ Creation Date', moment.utc(message.guild.createdAt).format('MM/DD/YYYY h:mm A'), true)
			.addField('❯ Owner', message.guild.owner.user.tag, true)
			.addField('❯ Boost Count', message.guild.premiumSubscriptionCount || 0, true)
			.addField('❯ Boost Tier', message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None', true)
			.addField('❯ 🗺 Region:', region, true)
			.addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
			.addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
			.addField('❯ Members', message.guild.memberCount, true)
			.addField('❯ Roles', message.guild.roles.cache.size, true)
            .addField('❯ Channels', message.guild.channels.cache.filter(channel => channel.type !== 'category').size, true)
            .addField('❯ Emojis', message.guild.emojis.cache.size >= 1 ? `There are ${message.guild.emojis.cache.size} emojis!` : 'There are no emojis', true)
            await message.channel.send(embed)
}




module.exports.config = {
    name: "serverinfo",
    description: "saw information about the server",
    usage: "serverinfo",
    accessableby: "Members",
    aliases: ["si"]
}
