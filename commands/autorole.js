const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("mention a role.")
    
    
    
    //Now we gonna use quick.db
    
    db.set(`autorole_${message.guild.id}`, role.id) //set id in var
    
    message.channel.send(`autorole  is seted as ${role}`) //send success message
  

}
module.exports.config = {
    name: "autorole",
    description: "give  a user a role when he join",
    usage: "m!autorole",
    accessableby: "Admins",
    aliases: []
}