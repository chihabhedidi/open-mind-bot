const Discord = require("discord.js");
const db = require("quick.db")
const botsettings = require('../botsettings.json');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild =require('../models/guild');
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
module.exports.run = async (bot, message, args) => {
    let settings = await Guild.findOne({
        guildID: message.guild.id
    })
    if(settings.prefix === null ) settings.prefix = botsettings.default_prefix;
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
                value: `**Warnings**  view the number of warns`,
                inline: true
            },
            {
                name: ":arrows_counterclockwise:** - \`reset-warnings\`**",
                value: `**reset-warnings** Reset the number of warns of Member Specified by the User`,
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
                name: ":bust_in_silhouette:** - \`autorole\`**",
                value: `**Autorole** To give a role to a member when they join your server`,
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
                value: `**Unlock** A specific channel`,
                inline: true
            },
            {
                name: ":triangular_flag_on_post:** - \`setprefix\`**",
                value: `**Setprefix** For Open Mind in your server,Forget the prefix?\`mention the bot\``,
                inline: true
            },
            {
                name: ":loudspeaker:** - \`announce\`**",
                value: `**Announce** An embed message in a specific channel`,
                inline: true
            },
            {
                name: ":face_with_symbols_over_mouth:** - \`antiswear\`**",
                value: `**Antiswear** To disable bad words in your server`,
                inline: true
            },
            {
                name: ":link:** - \`antilinks\`**",
                value: `**Antilinks** To disable links in your server`,
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
                name: ":jigsaw:** - \`rr @role :emoji: MessageId\`**",
                value: `**Reactionrole** Add a reaction role to a specific message`,
                inline: true
            },
            {
                name: ":chart_with_upwards_trend:** - \`serverstats enable/disable\`**",
                value: `**serverstats** To show member/bots count in your server`,
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
    if(args[0] === 'economy'){
        const embed5 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**:moneybag: Economy Commands :moneybag:**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":hourglass:** - \`daily\`**",
                value: `**Daily** To get your daily reward`,
                inline: true
            },
            {
                name: ":money_with_wings:** - \`credit\`**",
                value: `**credit** to see your or someone\'s credit`,
                inline: true
            },
            {
                name: ":money_mouth:** - \`credit <@member> amount\`**",
                value: `**credit** To send money to an other member`,
                inline: true
            },
        )
        await message.channel.send(embed5)
    }
     if(args[0] === 'level'){
        const embed4 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**:speech_balloon: Leveling Commands :speech_balloon:**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":bust_in_silhouette:** - \`profile\`**",
                value: `**Profile** To see your level`,
                inline: true
            },
            {
                name: ":keyboard:** - \`Leveling enable/disable\`**",
                value: `**Leveling** To enable/disable the leveling in your server(it is disable by default in all servers) `,
                inline: true
            },
            {
                name: ":clap:** - \`Leveling roles add\`**",
                value: `**Leveling roles add** Link a role to a level. Removes another role if given `,
                inline: true
            },
            {
                name: ":point_up:** - \`Leveling roles remove\`**",
                value: `**Leveling roles remove** Delete a level association`,
                inline: true
            },
            {
                name: ":newspaper:** - \`Leveling roles list\`**",
                value: `**Leveling roles list**  List of level/role associations.`,
                inline: true
            },
            {
                name: ":ok_hand:** - \`Leveling channel [#channel]\`**",
                value: `**Leveling** To set a channel for leveling messages `,
                inline: true
            },
            {
                name: ":keyboard:** - \`Leaderboard\`**",
                value: `**Leaderboard** To see top members in leveling in your server `,
                inline: true
            },
            
        )
        await message.channel.send(embed4)
    }
    if(args[0] === 'fun'){
        const embed4 = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#f3f3f3')
        .setTitle(`**:confetti_ball: Fun Commands :confetti_ball:**`)
        .setFooter(`Requested By : ${message.author.tag} • Today at ${time}`)
        .addFields(
            {
                name: ":sun_with_face:** - \`weather\`**",
                value: `**Weather** To see the weather in a specific location`,
                inline: true
            },
            {
                name: ":frog:** - \`meme\`**",
                value: `**meme** To send random meme`,
                inline: true
            },
            {
                name: ":gun:** - \`snipe\`**",
                value: `**Snipe** The last deleted message`,
                inline: true
            },
            {
                name: ":regional_indicator_x::o2:** - \`xo\`**",
                value: `**Xo** To start tictactoe game`,
                inline: true
            },
            {
                name: ":frame_photo:** - \`avatar\`**",
                value: `**Avatar** To display your/someone\`s avatar`,
                inline: true
            },
            {
                name: ":speak_no_evil:** - \`say\`**",
                value: `**Says** A written message`,
                inline: true
            },
        )
        await message.channel.send(embed4)
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
        .setTitle(`**${message.guild.name} prefix is \`${settings.prefix}\`**`)
        .setDescription(`
        **Command Help:** To get info on commands run \`${settings.prefix}help <command name>\`.
        **Panel:** To get info about your server activities run \`${settings.prefix}panel\`

        **<:om:741239844117938236> Moderation CMDs**
        \`${settings.prefix}help mod\`
         **<:hammer:741235988210253845> Utility CMDs**
        \`${settings.prefix}help util\`
        **:speech_balloon: Leveling CMDs**
        \`${settings.prefix}help level\`
        **:moneybag: Economy CMDs**
        \`${settings.prefix}help economy\`
        **:confetti_ball: fun CMDs**
        \`${settings.prefix}help fun\`
         **<:info:741237861969559652> info CMDs**
        \`${settings.prefix}help info\`
        **<:earlysupportter:741237858396012604> Support CMDs**
        \`${settings.prefix}help support\`

        [**Support Server**](https://discord.com/invite/AXnRXeS)**|**[**Vote for me**](https://top.gg/bot/731315754175037480/vote)**|**[**Invite me**](https://discord.com/api/oauth2/authorize?client_id=731315754175037480&permissions=8&scope=bot)
        `
        )
        .setFooter(`Requested By : ${message.author.tag}`)
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
                value: `⤿${settings.prefix} ${command.config.usage }`,
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
