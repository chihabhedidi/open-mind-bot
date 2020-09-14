const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const mongoose =require("mongoose");
const Warning =require('../models/warning');

module.exports.run = async (bot, message, args) => {
  
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You should have admin perms to use this command!")
      }
     
      const user = message.mentions.members.first()
      
       if(!user) {
        return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>")
      }

      if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest)<0){
        return message.channel.send("you cant warn a member higher in rank than you ")
      }
      if(message.mentions.users.first().bot) {
        return message.channel.send("You can not warn bots")
      }
      if(message.author.id === user.id) {
        return message.channel.send("You can not warn yourself")
      }
      
      const reason = args.slice(1).join(" ")

  if(!reason) {
      return message.channel.send("Please provide reason to warn - warn @mention <reason>")
    }
    let f=0;
    let warnings = await Warning.findOne({
      userID: user.id,
      guildID: message.guild.id

  },async (err, user)  => {
      if (err) console.error(err)
      
        if (!user) {
          const  newmember =new Warning({
              _id: mongoose.Types.ObjectId(),
              userID: message.mentions.members.first().id,
              guildID: message.guild.id,
              warnings:1
  
              
          })
         
          newmember.save()
  
        .catch(err => console.error(err));
      }
     if(user){
f=1
    }

  })
  if(f==1){
    await warnings.updateOne({
      warnings:warnings.warnings +1,
  });

}
await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
}

module.exports.config = {
    name: "warn",
    description: "a Member Specified by the User",
    usage: "warn [Mention] <Reason>",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}
