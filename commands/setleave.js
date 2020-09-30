const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_CHANNELS')){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**You need \`MANAGE_CHANNELS\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
   if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**The bot needs \`MANAGE_CHANNELS\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
    
  const settings = await Guild.findOne({
      guildID: message.guild.id
  });
  if(args[0]==="disable"){
      await settings.updateOne({
        leave_channel: "null"
      });
       return  message.channel.send(`Disabling leave channel `) //send success message
      }
      if(args[0]==="message"){
        let msg = args.slice(1).join(" ")
        if(!msg){
          return message.channel.send(`Pleasa specify a leave message `)
        }
        await settings.updateOne({
          leave_message: msg
        });
  
       return  message.channel.send(`you have set a new leave message `) //send success message
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
    Permissions: "MANAGE_CHANNELS",
    aliases: []
}
