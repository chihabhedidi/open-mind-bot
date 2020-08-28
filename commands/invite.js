const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    const embed = new MessageEmbed()
    
    .addFields(
        
        {
        name:"Invite the bot to your server",
        value: "[**Here**](https://discord.com/api/oauth2/authorize?client_id=731315754175037480&permissions=8&scope=bot)"
        },
    )
    .setColor('#fc0b03')
    

  
await message.channel.send(embed)

}
module.exports.config = {
    name: "invite",
    description: "To invite the bot to your server",
    usage: "invite",
    accessableby: "Public Usage",
    aliases: []
}

