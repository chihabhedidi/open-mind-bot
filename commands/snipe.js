const Discord = require('discord.js');

const botconfig = require("../botsettings.json");

const db = require("quick.db")
module.exports.run = async (bot, message, args) => {
    const msg = bot.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("There are no deleted messages in this channel!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
   
}
module.exports.config = {
    name: "snipe",
    description: "Send the last deleted message",
    usage: "snipe",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}