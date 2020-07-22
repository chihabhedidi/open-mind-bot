const Discord = require("discord.js");
const db = require("quick.db")
const botsettings = require('../botsettings.json');
module.exports.run = async (bot, message, args) => {
    //We have to set a argument for the help command beacuse its going to have a seperate argument.
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null ) prefix = botsettings.default_prefix;
    //Custom Help command by using the second argument.
    if(helpArgs[0] === 'gaming') {
        return message.reply("This is a Gaming information Command.")
    }

    //Normal usage of (prefix)help without any args. (Shows all of the commands and you should set the commands yourself)
    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(`Here is the Avaible Commands to use:`)
            .setDescription('**:grey_question:help - **see this the commands\n**:loudspeaker:announce [#channel] <Title> <the message> - **to announce a specific message\n**:wave:setwelcome [#channel] - **set a welcome channel for the server\n**⁦:v:setleave [#channel] - **set a leave channel for the server\n**:no_entry_sign:warn [Mention] <Reason> - **to warn a memeber\n**:warning:warnings [Mention] - **to view the number of warns \n**:arrows_counterclockwise:reset-warnings [Mention] - **rest the number of warns of a specific user\n**:mute:vmute [Mention] <Reason> <time> - **to voice mute a user\n**:sound:vunmute [Mention] - **to voice unmute a user\n**:speaking_head:unmute [Mention] - **to unmute a user\n**:mask:mute [Mention] <Reason> <time> - **to mute a user\n**:frog:meme - **to send random meme\n**:european_castle:serverinfo - **show the server info\n**:cowboy:userinfo [Mention] - **show user info\n**:robot:botinfo - **show bot info\n**:leg:kick [Mention] - **to kick a user\n**:no_entry_sign:ban [Mention] - **to ban a user\n**:o:unban: [user-id] - **to unban a user\n**:hourglass_flowing_sand:slowmode <duration> - **to activate a Slowmode in a channel\n**:page_facing_up:clear [number] - **to clear the chat\n**:tada:giveaway [#channel] <Time> <number of winners> reward - **to start a giveaway\n**:repeat::tada:rerole [giveaway message id] - **to pick another winner\n**:white_check_mark:addrole [Mention] <@Role> - **to add a role to a member\n**:negative_squared_cross_mark:removerole [Mention] <@Role> - **to remove a role from a member\n**:lock:lock - **to lock a channel\n**:unlock:unlock - **to unlock a channel\n**:triangular_flag_on_post:setprefix (new prefix) - **to change the prefix of the server , you can see the current server prefix by typing \`prefix\`\n**:globe_with_meridians:ping - **to see your ping\n**:incoming_envelope:invite - **to invite the bot to your server\n**:tools:feedback - **to contact the developer')
            .addFields({ name: 'Current Prefix', value: `\`${prefix}\``, inline: true})
            .setColor('#9e1111')
            
        message.channel.send(embed);
    }

    //Reads the moudle.exports.config (This line of code is on commands folder, each command will read automaticly) by the second argument (the command name) and shows the information of it.
    if(helpArgs[0]) {
        let command = helpArgs[0];

        if(bot.commands.has(command)) {
            
            command = bot.commands.get(command);
            var embed = new Discord.MessageEmbed()
            .setAuthor(`${command.config.name} Command`)
            .setDescription(`
            - **Command's Description** __${command.config.description || "There is no Description for this command."}__
            - **Command's Usage:** __${command.config.usage || "No Usage"}__
            - **Command's Permissions:** __${command.config.accessableby || "Members"}__
            - **Command's Aliases:** __${command.config.aliases || "No Aliases"}__
            `)
            .setColor('#2EFF00')

        message.channel.send(embed);
    }}
}

module.exports.config = {
    name: "help",
    description: "",
    usage: "!help",
    accessableby: "Members",
    aliases: []
}