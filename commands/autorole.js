const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_SERVER'))
    return message.channel.send("You don't have permission to use that command.");
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    if(args[0]==="disable"){
        await settings.updateOne({
            Autorole: "null"
        });
  
       return  message.channel.send(`Disabling autorole command `) //send success message
      }
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("please mention a role.")
    
    await settings.updateOne({
        Autorole: role
    });
    
    
    
    message.channel.send(`autorole  is seted as ${role}`) //send success message
  

}
module.exports.config = {
    name: "autorole",
    description: "To give a role to a member when they join your server",
    usage: "autorole <@role>/disbale",
    accessableby: "MANAGE_SERVER",
    aliases: []
}