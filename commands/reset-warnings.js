const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const mongoose =require("mongoose");
const Warning =require('../models/warning');

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_GUILD')){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**You need \`MANAGE_GUILD\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
   if(!message.guild.me.hasPermission("MANAGE_GUILD")){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**The bot needs \`MANAGE_GUILD\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
      let f =0;
      const user = message.mentions.members.first()
      
      if(!user) {
      return message.channel.send("Please mention the person whose warning you want to reset")
      }
      
      if(message.mentions.users.first().bot) {
        return message.channel.send("Bot are not allowed to have warnings")
      }
      if(message.author.id === user.id) {
        return message.channel.send("You are not allowed to reset your warnings")
      }
      let warnings = await Warning.findOne({
        userID: user.id,
        guildID: message.guild.id,
    },async (err, user)  => {
        if (err) console.error(err)
        
          if (!user) {
      return message.channel.send(`${message.mentions.users.first().username} do not have any warnings`)
        }
  if(user){
    f=1

  }
    })
if(f==1){
  await warnings.updateOne({
    warnings:0,
});
await message.channel.send(`${message.mentions.users.first().username} warnings has been reset to 0 `)
}

        
}

module.exports.config = {
    name: "reset-warnings",
    description: "Rest the number of warns of Member Specified by the User",
    usage: "reset-warnings [Mention]",
    Permissions: "MANAGE_GUILD",
    aliases: []
}
