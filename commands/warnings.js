const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const mongoose =require("mongoose");
const Warning =require('../models/warning');

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.author
    let f=0;
      let warnings = await Warning.findOne({
      userID: user.id,
      guildID: message.guild.id,

  },async (err, user)  => {
      if (err) console.error(err)
      
        if (!user) {
    return message.channel.send("this user has 0 warnings")
      }
if(user){
    f=1;
}
  })
  if(f==1){
   await message.channel.send(`${message.mentions.users.first().username} have **${warnings.warnings}** warning(s)`)

  }

}

module.exports.config = {
    name: "warnings",
    description: "view the number of warns of a specific member",
    usage: "warnings [Mention]",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}
