const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
  if(!message.member.hasPermission('MANAGE_ROLES'))
  return message.channel.send("You don't have permission to use that command.");
  
        
        
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: false });
      return message.channel.send("Successfully locked this channel");

}

module.exports.config = {
    name: "lock",
    description: "Lock a specific channel",
    usage: "lock",
    accessableby: "MANAGE_ROLES",
    aliases: []
}