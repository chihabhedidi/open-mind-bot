const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require('discord.js');
const { trimArray } = require('../util/util');
const moment = require('moment');
module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   

    const flags = {
        DISCORD_EMPLOYEE: '<:de:753973829222531083>',
        DISCORD_PARTNER: '<:partner:753973824030244884>',
        BUGHUNTER_LEVEL_1: '<:bughunter:753973825481474158>',
        BUGHUNTER_LEVEL_2: '<:BugHunterv2:753973843625771068>',
        HYPESQUAD_EVENTS: '<:hypesquad:753973826173272217>',
        HOUSE_BRAVERY: '<:bravery:753973824076120124>',
        HOUSE_BRILLIANCE: '<:brilliance:753973828753031258>',
        HOUSE_BALANCE: '<:balance:753973824051216504>',
        EARLY_SUPPORTER: '<:earlysupportter:741237858396012604>',
        VERIFIED_DEVELOPER: '<:devbadge:753973824051085452>'
    };
    let status;
    switch (user.presence.status) {
        case "online":
            status = "<:green_circle:729181184193462285> online";
            break;
        case "dnd":
            status = "<:orange_circle:729181212530442311> dnd";
            break;
        case "idle":
            status = "<:red_circle:729181121933475931> idle";
            break;
        case "offline":
            status = "<:black_circle:729181162182017051> offline";
            break;
    }

    const userFlags = user.user.flags ? user.user.flags.toArray() : [];
		const embed = new MessageEmbed()
			.setThumbnail(user.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setAuthor(user.user.tag)
			.addField('❯ Discord Join Date',user.user.createdAt.toLocaleDateString("en-us"), true)
			.addField('❯ 🆔', user.user.id, true)
            .addField('❯ Flags', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None')
            .addField('❯ Avatar Link', `[Click Here](${user.user.displayAvatarURL()})`, true)
		
			try {
				const member = await message.guild.members.fetch(user.id);
				const defaultRole = message.guild.roles.cache.get(message.guild.id);
				const roles = member.roles.cache
					.filter(role => role.id !== defaultRole.id)
					.sort((a, b) => b.position - a.position)
					.map(role => role.name);
				embed
					.addField('❯ Server Join Date', moment.utc(member.joinedAt).format('MM/DD/YYYY h:mm A'), true)
					.addField('❯ Highest Role',
						member.roles.highest.id === defaultRole.id ? 'None' : member.roles.highest, true)
                        .addField('❯ Current Status', status, true)
                        .addField('❯ Activity', user.presence.activities[0] ? user.presence.activities[0].state : `User isn't playing a game!`, true)
                        .addField(`❯ Roles (${roles.length})`, user.roles.cache.map(role => role.toString()).join(" ,"))
					.setColor(member.displayHexColor);
			} catch {
				embed.setFooter('Failed to resolve member, showing basic user information instead.');
			}
		

    await message.channel.send(embed)
}



module.exports.config = {
    name: "userinfo",
    description: "saw information about a member",
    usage: "userinfo",
    Permissions: "PUBLIC_USAGE",
    aliases: ["ui"]
}
