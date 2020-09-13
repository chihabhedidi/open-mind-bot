const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const mongoose = require('mongoose');


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you dont have the ADMINISTRATOR permission to use this command");

    let t = message.content;
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    if(args[0]==="enable"){
        if(settings.leveling_status=="on"){
            return message.channel.send("Leveling system is already on");
        }
        await settings.updateOne({
            leveling_status: "on"
          });
          return message.channel.send("Leveling system enabled");
    }
    if(args[0]==="disable"){
        if(settings.leveling_status=="off"){
            return message.channel.send("Leveling system is already off");
        }
        await settings.updateOne({
            leveling_status: "off"
          });
          return message.channel.send("you disabled the leveling system");
    }
    if(args[0]==="channel"){
        let channel = message.mentions.channels.first() //mentioned channel
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
        await settings.updateOne({
            leveling_channel: channel
        });
        message.channel.send(`Leveling Channel is  ${channel}`)  
    }
   
}
module.exports.config = {
    name: "leveling",
    description: "To enable/disable leveling system in your server",
    usage: "leveling",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}
