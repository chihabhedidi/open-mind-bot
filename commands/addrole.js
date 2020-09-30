const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

    if(message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_ROLES")){
        const embed = new Discord.MessageEmbed()
   
       .setDescription (`**You need \`MANAGE_ROLES\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
    if(!message.guild.me.hasPermission("MANAGE_ROLES")){
        const embed = new Discord.MessageEmbed()
   
       .setDescription (`**The bot needs \`MANAGE_ROLES\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
    let aMember = message.mentions.members.first()
    if(!aMember) return message.channel.send("mention a user.")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("mention a role.")
  try{
    if(aMember.roles.cache.has(role.id)) {
        return message.channel.send(`${aMember} already has this role.`)
    } else {
        await aMember.roles.add(role.id)
        message.channel.send(` role, **${role.name}** have been added`)
        aMember.createDM().then( channel => {
            channel.send(` role, **${role.name}** have been added`)
        })
    }}
    catch (err) {
        return message.reply(`\`${err.message}.!\``);

    }
}


module.exports.config = {
    name: "addrole",
    description: "Addrole to a specific member",
    usage: "addrole [Mention] <@Role>",
    accessableby: "MANAGE_ROLES",
    aliases: []
}

