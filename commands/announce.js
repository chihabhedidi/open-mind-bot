const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
    if(!message.member.hasPermission('SEND_MESSAGES'))
    return message.channel.send("You don't have permission SEND_MESSAGES to use this command.");
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
  try{
    const _ = new MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(`${MSG}`)
      .setColor("RANDOM");
    rChannel.send(_);
    message.delete();
    }
    catch (err) {
        return message.reply(`\`${err.message}.!\``);

    }
  }


module.exports.config = {
    name: "announce",
    description: "Announce An embed message in a specific channel",
    usage: "announce [#channel] <Title> <the message>",
    accessableby: "SEND_MESSAGES",
    aliases: []
}





