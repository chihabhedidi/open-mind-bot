const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`**Privacy**`)
    .setDescription(`
    1) i collect user and server ids 
    2) i use the data for leveling and economy commands
    3) i save it in a database and it change in each command
    4) i dont share the data with anyone
    5) they can contact  the bot developer throw  discord account(GYox#8550)
    Or with the email (chihabhedidi@gmail.com)
    6) he can send a request in my discord account or my email and i will delete it`)
    .setColor(0x1d1d1d)

    
    return message.channel.send(embed);
}



module.exports.config = {
    name: "privacy",
    description: "privacy",
    usage: "privacy",
    accessableby: "Members",
    aliases: []
}




