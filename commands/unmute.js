const Discord = require("discord.js")
const botconfig = require("../botsettings.json");




module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    message.channel.send("You don't have permission to use that command.");
    const user = message.mentions.users.first();    
    if(user) {
        const member = message.guild.member(user);
        if(member){ 
    let mutedRole = message.guild.roles.cache.find(x => x.name === "Muted")
        
        if(mutedRole) {
            member.roles.remove(mutedRole);
            message.channel.send("User was Successfully Unmuted.");
        }
}else{
    message.reply("That user isn't in this server!");
}

}else{return message.channel.send("Please please mention member")}

}

module.exports.config = {
    name: "unmute",
    description: "unMute members",
    usage: "*unmute",
    accessableby: "Admins",
    aliases: []
}