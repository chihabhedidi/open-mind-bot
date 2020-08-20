const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You should have MANAGE_MESSAGES permsission to use this command!")
      }
    const user = message.mentions.members.first() || message.author
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    if(warnings === null) warnings = 0;
    message.channel.send(`${user} have **${warnings}** warning(s)`)

}

module.exports.config = {
    name: "warnings",
    description: "view the number of warns of a specific member",
    usage: "warnings [Mention]",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}