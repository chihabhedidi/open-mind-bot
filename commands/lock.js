const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
  if(!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("You don't have permission to use that command.");
  
        
       try{ 
        if(message.channel.name.startsWith("🔒")) {return message.channel.send("this channel is already locked")}
         message.channel.setName(`🔒${message.channel.name}`)
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: false });
     
      
      return message.channel.send("Successfully locked this channel");
       }catch (err) {
        return message.reply(`\`${err.message}.!\``);
    
    }
}


module.exports.config = {
    name: "lock",
    description: "Lock a specific channel",
    usage: "lock",
    accessableby: "MANAGE_ROLES",
    aliases: []
}
