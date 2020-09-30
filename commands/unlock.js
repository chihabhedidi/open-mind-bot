const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_CHANNELS')){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**You need \`MANAGE_CHANNELS\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**The bot needs \`MANAGE_CHANNELS\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     
     try{ 
        if(message.channel.name.startsWith("🔒")) {
            message.channel.setName(message.channel.name.substring(1))
           message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: true });
      return message.channel.send("Successfully unlocked this channel");}
        
        else{
            return message.channel.send("this channel is not locked")
        }
     
    } catch (err) {
        return message.reply(`\`${err.message}.!\``);

    }
}

module.exports.config = {
    name: "unlock",
    description: "Unlock a specific channel",
    usage: "unlock",
    Permissions: "MANAGE_CHANNELS",
    aliases: []
}
