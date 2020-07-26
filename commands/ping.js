const Discord = require("discord.js")
const botconfig = require("../botsettings.json");





module.exports.run = async (bot, message, args) => {

  message.channel.send('Pong...').then((msg) => {
    msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nPing: ${Math.round(bot.ws.ping)} ms.\`\`\``);//حقوق دايموند كودز
})
}



module.exports.config = {
    name: "ping",
    description: "show your ping",
    usage: "m!ping",
    accessableby: "Members",
    aliases: []
}




