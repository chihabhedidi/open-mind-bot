const Discord = require("discord.js");
const db = require("quick.db")
const botsettings = require('../botsettings.json');
module.exports.run = async (bot, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null ) prefix = botsettings.default_prefix;
    let pages = [   
        
        `
        
        ***Open Mind Bot***
**:two: => Moderation**
**:three: => Utility**
**:four: => info**
**:five: => Support**
  `
  
,`           
        ***Moderation***

        **:no_entry_sign:ban [Mention] - **to ban a user\n**:o:unban: [user-id] - **to unban a user\n**:leg:kick [Mention] - **to kick a user\n**:no_entry_sign:warn [Mention] <Reason> - **to warn a member\n**:warning:warnings [Mention] - **to view the number of warns \n**:arrows_counterclockwise:reset-warnings [Mention] - **rest the number of warns of a specific user\n**:mute:vmute [Mention] <Reason> <time> - **to voice mute a user\n**:sound:vunmute [Mention] - **to voice unmute a user\n**:speaking_head:unmute [Mention] - **to unmute a user\n**:mask:mute [Mention] <Reason> <time> - **to mute a user\n**:white_check_mark:addrole [Mention] <@Role> - **to add a role to a member\n**:negative_squared_cross_mark:removerole [Mention] <@Role> - **to remove a role from a member
  `
  
,`
***Utility***
      
**:lock:lock - **to lock a channel\n**:unlock:unlock - **to unlock a channel\n**:triangular_flag_on_post:setprefix (new prefix) - **to change the prefix of the server , you can see the current server prefix by typing \`prefix\`\n**:loudspeaker:announce [#channel] <Title> <the message> - **to announce a specific message\n**:wave:setwelcome [#channel] - **set a welcome channel for the server\n**⁦:v:setleave [#channel] - **set a leave channel for the server\n**:chart_with_upwards_trend:serverstats (enable/disable) - **to (enable/disable) a stats for your server\n**:hourglass_flowing_sand:slowmode <duration> - **to activate a Slowmode in a channel\n**:page_facing_up:clear [number] - **to clear the chat\n**:tada:giveaway [#channel] <Time> <number of winners> reward - **to start a giveaway\n**:repeat::tada:rerole [giveaway message id] - **to pick another winner\n**:joystick:autorole <@Role> - **to give a role to a member when he join\n**:shield:autobotrole <@Role> - **to give a role to a bot when he join
**:frog:meme - **to send random meme
  `
,`
***Info***

**:grey_question:help - **see this the commands\n**:european_castle:serverinfo - **show the server info\n**:cowboy:userinfo [Mention] - **show user info\n**:robot:botinfo - **show bot info\n**:globe_with_meridians:ping - **to see your ping

`
,`
    ***Support***

    **:tools:feedback - **to contact the developer\n**:incoming_envelope:invite - **to invite the bot to your server
`]
    let page = 1;
 
    let embed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.displayAvatarURL())
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])
    .addFields({ name: 'Current Prefix', value: `\`${prefix}\``, inline: true})
    message.channel.send(embed).then(msg => {
 
        msg.react('1⃣').then( r => {
            msg.react('2⃣')
            msg.react('3⃣')
            msg.react('4⃣')
            msg.react('5⃣')
 
 
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '1⃣' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '2⃣' && user.id === message.author.id;
        const forwardsFilter1 = (reaction, user) => reaction.emoji.name === '3⃣' && user.id === message.author.id;
         const forwardsFilter2 = (reaction, user) => reaction.emoji.name === '4⃣' && user.id === message.author.id;
         const forwardsFilter3 = (reaction, user) => reaction.emoji.name === '5⃣' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, { time: 1000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 1000000});
        const forwards1 = msg.createReactionCollector(forwardsFilter1, { time: 1000000});
        const forwards2 = msg.createReactionCollector(forwardsFilter2, { time: 1000000});
        const forwards3 = msg.createReactionCollector(forwardsFilter3, { time: 1000000});
        backwards.on('collect', r => {
            if (page === 1) return;
            page=1;
            
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
            
        })
        forwards.on('collect', r => {
            if (page === 2) return;
 
      page=2;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards1 .on('collect', r => {
            if (page === 3) return;
 
      page=3;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards2 .on('collect', r => {
            if (page === 4) return;
 
            page=4;
                  embed.setDescription(pages[page-1]);
                  embed.setFooter(`Page ${page} of ${pages.length}`);
                  msg.edit(embed)
              })

              forwards3 .on('collect', r => {
                if (page === 5) return;
 
                page=5;
                      embed.setDescription(pages[page-1]);
                      embed.setFooter(`Page ${page} of ${pages.length}`);
                      msg.edit(embed)
                  })
        })
    })
    }


module.exports.config = {
    name: "help",
    description: "",
    usage: "m!help",
    accessableby: "Members",
    aliases: []
}