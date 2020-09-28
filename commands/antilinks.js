const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You should have MANAGE_MESSAGES perms to use this command")
      }
      const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    if(!args[0])return message.channel.send("Usage:antilinks enable/disable")
      if(args[0]==="enable"){
        await settings.updateOne({
          antilinks: "on"
        });
        return message.channel.send("You enabled antilinks system")
        }
      if(args[0]==="disable"){
        await settings.updateOne({
          antilinks: "null"
        });
        return message.channel.send("You disabled antilinks system")
      }
    
      
}

module.exports.config = {
    name: "antilinks",
    description: "To enable/disable links in your server",
    usage: "antilinks (enable/disable)",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}


