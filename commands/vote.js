const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()

    .setDescription (`[**Vote here**](https://top.gg/bot/731315754175037480/vote)`)
    .setColor('#ff5e5e')
    return message.channel.send(embed)

}
   


module.exports.config = {
    name: "vote",
    description: "to vote for the bot",
    usage: "vote",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}

