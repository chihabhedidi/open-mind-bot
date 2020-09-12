const Discord = require("discord.js")
const botconfig = require("../botsettings.json");




module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MUTE_MEMBERS'))
    return message.channel.send("You don't have permission to use that command.");
    const user = message.mentions.users.first();    
    if(user) {
        const member = message.guild.member(user);
        if(member){ 
    let mutedRole = message.guild.roles.cache.find(x => x.name === "Voice Mute")
        try{
        if(mutedRole) {
            member.roles.remove(mutedRole);
            return message.channel.send("User was Successfully (voice) Unmuted.");
        } 
        }catch (err) {
    return message.reply(`\`${err.message}.!\``);

}
}else{
    message.reply("That user isn't in this server!");
}

}else{return message.channel.send("Please  mention member")}

}

module.exports.config = {
    name: "vunmute",
    description: "Voice unmute a specific member from a server",
    usage: "vunmute [Mention]",
    accessableby: "Admins",
    aliases: []
}
