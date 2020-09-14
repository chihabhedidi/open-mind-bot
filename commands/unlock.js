const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
  if(!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("You don't have permission to use that command.");
  
     
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
    accessableby: "MANAGE_ROLES",
    aliases: []
}
