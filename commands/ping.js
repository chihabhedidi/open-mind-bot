const Discord = require("discord.js")
const botconfig = require("../botsettings.json");





module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  message.channel.send('Pong...').then((msg) => {
    msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nPing: ${Math.round(bot.ws.ping)} ms.\`\`\``);
})
}



module.exports.config = {
    name: "ping",
    description: "To show your ping",
    usage: "ping",
    Permissions: "PUBLIC_USAGE",
    aliases: []
}




