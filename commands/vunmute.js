const Discord = require("discord.js")
const botconfig = require("../botsettings.json");




module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_ROLES')){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**You need \`MANAGE_ROLES\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
       if(!message.guild.me.hasPermission("MANAGE_GUILD")){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**The bot needs \`MANAGE_GUILD\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
    const user = message.mentions.users.first();    
    if(user) {
        const member = message.guild.member(user);
        if(member){ 
    let mutedRole = message.guild.roles.cache.find(x => x.name === "Voice Mute")
    if(!mutedRole){return message.channel.send("the server doesnt have a voice Mute role please use vmute command to auto create it")}
        try{
            if(member.roles.cache.has(mutedRole.id)){
                member.roles.remove(mutedRole);
                return message.channel.send(`${member}was Successfully (voice) Unmuted `);
               }else
         {
            
            return message.channel.send("user is not voice muted!");
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
    Permissions: "MANAGE_ROLES",
    aliases: []
}
