const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_SERVER')){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**You need \`MANAGE_SERVER\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     if(!message.guild.me.hasPermission("MANAGE_ROLES")){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**The bot needs \`MANAGE_ROLES\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
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
    
    
    
    message.channel.send(`autorole is set as ${role} make sure that the bot have the permission to give roles`) //send success message
  

}
module.exports.config = {
    name: "autorole",
    description: "To give a role to a member when they join your server",
    usage: "autorole <@role>/disbale",
    Permissions: "MANAGE_SERVER",
    aliases: []
}
