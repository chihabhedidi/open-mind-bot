const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS'))
    message.channel.send("You don't have permission to use that command.");
else {
    const user = message.mentions.users.first();
if(user) {
    const member = message.guild.member(user);
    if (member) {
    try {
        await member.ban();
        message.reply(`Successfully banned ${user.tag}`);
    }
    catch(err) {
        console.log(err);
    }
}else {
    // The mentioned user isn't in this guild
    message.reply("That user isn't in this server!");
  }
}else {
    message.reply("You didn't mention the user to ban!");
  }
}}

module.exports.config = {
    name: "ban",
    description: "ban a user",
    usage: "*ban",
    accessableby: "Admins",
    aliases: []
}



