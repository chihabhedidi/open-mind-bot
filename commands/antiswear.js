const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You should have MANAGE_MESSAGES perms to use this command")
      }
      if(args[0]==="enable"){
        db.set(`as_${message.guild.id}`,1);
        return message.channel.send("You enabled antiswear system")
      }
      if(args[0]==="disable"){
        db.set(`as_${message.guild.id}`,null);
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



