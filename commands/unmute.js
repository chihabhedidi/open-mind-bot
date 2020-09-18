const Discord = require("discord.js")
const botconfig = require("../botsettings.json");




module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
    const user = message.mentions.users.first();    
    if(user) {
        const member = message.guild.member(user);
        if(member){ 
    let mutedRole = message.guild.roles.cache.find(x => x.name === "Muted")
    if(!mutedRole){return message.channel.send("the server doesnt have a  Mute role please use  command to auto create it")}

    try{
        if(member.roles.cache.has(mutedRole.id)){
            member.roles.remove(mutedRole);
            return message.channel.send(`${member}was Successfully Unmuted `);
           }else
     {
        
        return message.channel.send("user is not  muted!");
    }
}catch (err) {
    return message.reply(`\`${err.message}.!\``);

}
}else{
    message.reply("That user isn't in this server!");
}

}else{return message.channel.send("Please please mention member")}
    
}


module.exports.config = {
    name: "unmute",
    description: "Unmute A specific member from a server",
    usage: "unmute [Mention] ",
    accessableby: " MANAGE_MESSAGES / MANAGE_ROLE",
    aliases: []
}
