const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
  if(!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("You don't have permission to use that command.");
  
        
        
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: false });
      return message.channel.send("Successfully locked this channel");

}

module.exports.config = {
    name: "lock",
    description: "lock a specific channel",
    usage: "m!lock",
    accessableby: "Admins",
    aliases: []
}