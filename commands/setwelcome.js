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
      welcome_channel: "null"
    });
     return  message.channel.send(`Disabling welcome channel `) //send success message
    }
    
    if(args[0]==="message"){
      let msg = args.slice(1).join(" ")
      if(!msg){
        return message.channel.send(`Pleasa specify a message for the new comers`)
      }
      await settings.updateOne({
        welcome_message: msg
      });

     return  message.channel.send(`you have set a new welcome message `) //send success message
    }
    let channel = message.mentions.channels.first() //mentioned channel
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    await settings.updateOne({
      welcome_channel: channel
  });
    
    message.channel.send(`Welcome Channel is  ${channel} make sure that the bot have permission to send message in that channel`) //send success message
    

}
module.exports.config = {
    name: "setwelcome",
    description: "Set Welcome Channel for the server",
    usage: "setwelcome [#channel]",
    Permissions: "MANAGE_CHANNELS",
    aliases: []
}
