const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.author
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    if(warnings === null) warnings = 0;
    message.channel.send(`${user} have **${warnings}** warning(s)`)

}

module.exports.config = {
    name: "warnings",
    description: "show the number of warns of a members",
    usage: "*warnings",
    accessableby: "Members",
    aliases: []
}