const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_CHANNELS'))
  return message.channel.send("You don't have permission MANAGE_CHANNELS to use this command.");
  
    
  const settings = await Guild.findOne({
      guildID: message.guild.id
  });
  if(args[0]==="disable"){
      await settings.updateOne({
        leave_channel: "null"
      });
       return  message.channel.send(`Disabling leave channel `) //send success message
      }
      let channel1 = message.mentions.channels.first()
    if(!channel1) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    await settings.updateOne({
      leave_channel: channel1
  });
    
    message.channel.send(`leave Channel is seted as ${channel1} make sure that the bot have the permission to send message in that channel`) //send success message
  

}
module.exports.config = {
    name: "setleave",
    description: "Set Leave Channel for the server",
    usage: "setleave [#channel]",
    accessableby: "MANAGE_CHANNELS",
    aliases: []
}
