const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const mongoose =require("mongoose");
const Warning =require('../models/warning');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You should have admin perms to use this command")
      }
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
await message.channel.send(`Reseted all warnings of ${message.mentions.users.first().username}`)
}

        
}

module.exports.config = {
    name: "reset-warnings",
    description: "Rest the number of warns of Member Specified by the User",
    usage: "reset-warnings [Mention]",
    accessableby: "MANAGE_SERVER",
    aliases: []
}
