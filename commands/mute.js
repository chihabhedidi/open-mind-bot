const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    
  if(!message.member.hasPermission('ADMINISTRATOR'))
  message.channel.send("You don't have permission to use that command.");
  const user = message.mentions.users.first();
  if(user) {
    const member = message.guild.member(user);
    if(member){ 
     let mutedRole = message.guild.roles.cache.find(x => x.name === "Muted")
     if(!mutedRole) {
        return message.channel.send("This server do not have role with name `Muted`")
      }
      let reason = args.slice(1).join(" ")
    
    
      if(!reason) {
        return message.channel.send("Please Give the reason to mute the member")
      }
        
        if(mutedRole) {
            member.roles.add(mutedRole);
            message.channel.send("User was Successfully muted.");
        }
        }else{
          message.reply("That user isn't in this server!");
}
}else{return message.channel.send("Please please mention member")}}

module.exports.config = {
    name: "mute",
    description: "Mute members",
    usage: "*mute",
    accessableby: "Admins",
    aliases: []
}