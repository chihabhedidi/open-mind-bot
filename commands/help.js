﻿const Discord = require("discord.js");
const db = require("quick.db")
const botsettings = require('../botsettings.json');
const { MessageEmbed } = require('discord.js');
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
module.exports.run = async (bot, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null ) prefix = botsettings.default_prefix;
    if(args[0] === 'mod'){
        const embed1 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**<:om:741239844117938236> Moderation Commands <:om:741239844117938236>**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":no_entry_sign:** - \`ban\`**",
                value: `**ban** A specific member from a server`,
                inline: true
            },
            {
                name: ":o:** - \`unban\`**",
                value: `**Unban** A specific member from a server`,
                inline: true
            },
            {
                name: ":leg:** - \`kick\`**",
                value: `**Kick** A specific member from a server`,
                inline: true
            },
            {
                name: ":rage:** - \`warn\`**",
                value: `**Warn** a Member Specified by the User`,
                inline: true
            },
            {
                name: ":warning:** - \`warnings\`**",
                value: `**Warnings**  view the number of warns of a specific member`,
                inline: true
            },
            {
                name: ":arrows_counterclockwise:** - \`reset-warnings\`**",
                value: `**reset-warnings** Rest the number of warns of Member Specified by the User`,
                inline: true
            },
            {
                name: ":mute:** - \`vmute\`**",
                value: `**Voice Mute** A specific member from a server`,
                inline: true
            },
            {
                name: ":sound:** - \`vunmute\`**",
                value: `**Voice Unute** A specific member from a server`,
                inline: true
            },
            {
                name: ":mask:** - \`mute\`**",
                value: `**Mute** A specific member from a server`,
                inline: true
            },
            {
                name: ":speaking_head:** - \`unmute\`**",
                value: `**Unmute** A specific member from a server`,
                inline: true
            },
            {
                name: ":white_check_mark:** - \`addrole\`**",
                value: `**Addrole** to a specific member `,
                inline: true
            },
            {
                name: ":negative_squared_cross_mark:** - \`removerole\`**",
                value: `**Removerole** from a specific member `,
                inline: true
            },
        )
        await message.channel.send(embed1)
    }
    
    if(args[0] === 'util'){
        const embed2 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**<:hammer:741235988210253845> Utility Commands <:hammer:741235988210253845>**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":lock:** - \`lock\`**",
                value: `**Lock** A specific channel`,
                inline: true
            },
            {
                name: ":unlock:** - \`unlock\`**",
                value: `**Unlock** A specificchannel`,
                inline: true
            },
            {
                name: ":triangular_flag_on_post:** - \`setprefix\`**",
                value: `**Setprefix** For Open Mind in your server,Forget the prefix? type \`prefix\``,
                inline: true
            },
            {
                name: ":loudspeaker:** - \`announce\`**",
                value: `**Announce** An embed message in a specific channel`,
                inline: true
            },
            {
                name: ":wave:** - \`setwelcome\`**",
                value: `**SetWelcome** Channel for the server`,
                inline: true
            },
            {
                name: ":v:** - \`setleave\`**",
                value: `**SetLeave** Channel for the server`,
                inline: true
            },
            {
                name: ":hourglass_flowing_sand:** - \`slowmode\`**",
                value: `**Slowmode** to activate a Slowmode in a channel`,
                inline: true
            },
            {
                name: ":page_facing_up:** - \`clear\`**",
                value: `**Clear** A specific number of messages`,
                inline: true
            },
            {
                name: ":tada:** - \`giveaway\`**",
                value: `**Giveaway** A prize in your server`,
                inline: true
            },
            {
                name: ":repeat::tada:** - \`rerole\`**",
                value: `**Rerole** To pick another winner`,
                inline: true
            },
            {
                name: ":frog:** - \`meme\`**",
                value: `**meme** To send random meme`,
                inline: true
            },
        )
        await message.channel.send(embed2)
    }
    if(args[0] === 'support'){
        const embed3 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**<:earlysupportter:741237858396012604> Support Commands <:earlysupportter:741237858396012604>**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":tools:** - \`feedback\`**",
                value: `**Feedback** To contact the developer of the bot`,
                inline: true
            },
            {
                name: ":incoming_envelope:** - \`invite\`**",
                value: `**Invite** The bot to your server`,
                inline: true
            },
            
        )
        await message.channel.send(embed3)
    }
    if(args[0] === 'info'){
        const embed4 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**<:info:741237861969559652> Info Commands <:info:741237861969559652>**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":european_castle:** - \`serverinfo\`**",
                value: `**Serverinfo** To show information about the server`,
                inline: true
            },
            {
                name: ":cowboy:** - \`userinfo\`**",
                value: `**Userinfo** To show information about a specific member`,
                inline: true
            },
            {
                name: ":robot:** - \`botinfo\`**",
                value: `**Botinfo** To show information about the bot`,
                inline: true
            },
            {
                name: ":globe_with_meridians:** - \`ping\`**",
                value: `**Ping** To see your ping`,
                inline: true
            },
            
        )
        await message.channel.send(embed4)
    }
     if (!args[0]){

    const embed = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**${message.guild.name} prefix is \`${prefix}\`**`)
        .setDescription(`**<:om:741239844117938236> Moderation CMDs**
        \`${prefix}help mod\`
         **<:hammer:741235988210253845> Utility CMDs**
        \`${prefix}help util\`
         **<:info:741237861969559652> info CMDs**
        \`${prefix}help info\`
        **<:earlysupportter:741237858396012604> Support CMDs**
        \`${prefix}help support\``)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
    await message.channel.send(embed)
}
if(args[0]) {
    let command = args[0];

    if(bot.commands.has(command)) {
        
        command = bot.commands.get(command);
        var embed5 = new Discord.MessageEmbed()
        .setAuthor(`❃ ${command.config.name} Command ❃`)
       .addFields(
            {
                name: "**Command's Description**",
                value: `⤿ ${command.config.description }`,
                inline: false
            },
            {
                name: "**Command's Usage:**",
                value: `⤿${prefix} ${command.config.usage }`,
                inline: true
            },
            {
                name: "**Command's Permissions:**",
                value: `⤿ ${command.config.accessableby}`,
                inline: true
            },
            {
                name: "**Command's Aliases:**",
                value: `⤿ ${command.config.aliases }`,
                inline: true
            },
        )
       
        .setColor('#2EFF00')

    message.channel.send(embed5);
}}




}




module.exports.config = {
    name: "help",
    description: "",
    usage: "*help",
    accessableby: "Members",
    aliases: []
}