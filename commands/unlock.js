const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_ROLES'))
  return message.channel.send("You don't have permission to use that command.");
  
        
        try{
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: true });
      return message.channel.send("Successfully unlocked this channel");
        }catch (err) {
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
