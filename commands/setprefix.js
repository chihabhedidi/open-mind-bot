const Discord = require("discord.js")
const botsettings = require("../botsettings.json");
const Guild =require('../models/guild');

const db = require("quick.db")




module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You are not allowed or do not have permission to change prefix")
      }

const settings = await Guild.findOne({
    guildID: message.guild.id
});

if (args.length < 1) {
    return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``).then(m => m.delete({timeout: 10000}));
};

await settings.updateOne({
    prefix: args[0]
});

return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
};
module.exports.config = {
    name: "setprefix",
    description: "Setprefix For Open Mind in your server",
    usage: "setprefix",
    accessableby: "Admins",
    aliases: []
}