const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You should have MANAGE_MESSAGES permsission to use this command!")
      }
      
      const user = message.mentions.members.first()
      
       if(!user) {
        return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>")
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
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    if(warnings === 2) {
        message.mentions.members.first().kick();
         return message.reply(`Successfully kicked because he/she has 3 warnings ${user.tag}`);      }
         if(warnings === 4) {
            message.mentions.members.first().ban();
             return message.reply(`Successfully banned because he/she has 5 warnings ${user.tag}`);      }
      if(warnings === null) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
        await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)//DO NOT FORGET TO USE ASYNC FUNCTION
      }else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`) //DO NOT FORGET TO USE ASYNC FUNCTION
    }

}

module.exports.config = {
    name: "warn",
    description: "a Member Specified by the User",
    usage: "warn [Mention] <Reason>",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}