const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    if (message.deletable) {
        message.delete();
    }

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**You need \`MANAGE_MESSAGES\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
       if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**The bot needs \`MANAGE_MESSAGES\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("This is not a number").then(m => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.reply(`Something went wrong... ${err.message}`));

}

module.exports.config = {
    name: "clear",
    description: "Clear A specific number of messages",
    usage: "clear [number]",
    Permissions: "MANAGE_MESSAGES",
    aliases: []
}
