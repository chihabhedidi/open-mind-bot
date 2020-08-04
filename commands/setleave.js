const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("You don't have permission to use that command.");
    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`leavechannel_${message.guild.id}`, channel.id) //set id in var
    
    message.channel.send(`leave Channel is seted as ${channel}`) //send success message
  

}
module.exports.config = {
    name: "setleave",
    description: "set a leave channel",
    usage: "m!setleave",
    accessableby: "Admins",
    aliases: []
}