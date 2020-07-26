const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
    let rChannel = message.mentions.channels.first();
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
      let title = args[1]
      
      if (!title)
        return message.channel.send(`You did not specify title for your msg !`);
    let MSG = args.slice(2).join(" ")
      
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(`${MSG}`)
      .setColor("RANDOM");
    rChannel.send(_);
    message.delete();
  }


module.exports.config = {
    name: "announce",
    description: "Get the bot to say what ever you want in a specific channel.",
    usage: "m!announce",
    accessableby: "Admins",
    aliases: []
}





