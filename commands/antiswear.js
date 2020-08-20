const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You should have MANAGE_MESSAGES perms to use this command")
      }
      const settings = await Guild.findOne({
        guildID: message.guild.id
    });
      if(args[0]==="enable"){
        await settings.updateOne({
          antiswear: "on"
        });
        return message.channel.send("You enabled antiswear system")
        }
      if(args[0]==="disable"){
        await settings.updateOne({
          antiswear: "null"
        });
        return message.channel.send("You disabled antiswear system")
      }
    
      
}


module.exports.config = {
    name: "antiswear",
    description: "To disable the bedwords in your server",
    usage: "antiswear (enable/disable)",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}



