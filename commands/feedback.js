const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const embed = new MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/avatars/219779965967663104/a_95edb470cf11cc3e2b8f643da93ea283.png')
    .setTitle('Contact the Developer on Discord')
    .setDescription(`GYox#8550`)
    .setColor('#181687')
    

  
await message.channel.send(embed)
}
module.exports.config = {
    name: "feedback",
    description: "To contact the developer",
    usage: "feedback",
    accessableby: "Public Usage",
    aliases: []
}


















