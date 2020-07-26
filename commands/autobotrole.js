const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
    let brole = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!brole) return message.channel.send("mention a role.")
    
    
    
    //Now we gonna use quick.db
    
    db.set(`autobotrole_${message.guild.id}`, brole.id) //set id in var
    
    message.channel.send(`autorole bot is seted as ${brole}`) //send success message
  

}
module.exports.config = {
    name: "autobotrole",
    description: "give  a bot a role when he join",
    usage: "*autobotrole",
    accessableby: "Admins",
    aliases: []
}