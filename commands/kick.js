const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('KICK_MEMBERS')){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**You need \`KICK_MEMBERS\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     if(!message.guild.me.hasPermission("KICK_MEMBERS")){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**The bot needs \`KICK_MEMBERS\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
else {
    const user = message.mentions.users.first();
if(user) {
    const member = message.guild.member(user);
    if (member) {
    try {
        await member.kick();
        message.reply(`Successfully kicked ${user.tag}`);
    }
     catch (err) {
        return message.reply(`\`${err.message}.!\``);
    }
}else {
    // The mentioned user isn't in this guild
    message.reply("That user isn't in this server!");
  }
}else {
    message.reply("You didn't mention the user to kick!");
  }
}}

module.exports.config = {
    name: "kick",
    description: "Kick A specific member from a server",
    usage: "kick [Mention]",
    Permissions: "KICK_MEMBERS",
    aliases: []
}


















