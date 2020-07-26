const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

   
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("you dont have the permission")
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("i dont have the permission")
    let aMember = message.mentions.members.first()
    if(!aMember) return message.channel.send("mention a user.")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("mention a role.")
 
    if(aMember.roles.cache.has(role.id)) {
        return message.channel.send(`${aMember} have already this role.`)
    } else {
        await aMember.roles.add(role.id)
        message.channel.send(` role, **${role.name}** have been added`)
        aMember.createDM().then( channel => {
            channel.send(` role, **${role.name}** have been added`)
        })
    }
}


module.exports.config = {
    name: "addrole",
    description: "add a role to  a user",
    usage: "m!addrole",
    accessableby: "Admins",
    aliases: []
}

