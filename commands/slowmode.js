const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS'))
    return message.channel.send("You don't have permission MANAGE_CHANNELS to use this command.");
   
    if (!args[0])
    return message.channel.send(
      `You did not specify the time in seconds you wish to set this channel's slow mode to!`
    );
  if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
  
  
  
  message.channel.setRateLimitPerUser(args[0]);
  message.channel.send(
    `Set the slowmode of this channel to **${args[0]}**`
  );
}



module.exports.config = {
    name: "slowmode",
    description: "activate a Slowmode in a specific channel",
    usage: "slowmode <duration>",
    accessableby: "MANAGE_CHANNELS",
    aliases: []
}

