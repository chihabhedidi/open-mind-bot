const Discord = require("discord.js")
const botconfig = require("../botsettings.json");



module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.channel.send("You don't have permission to use that command.");
  const member = args[0];

        if (!member) {
             return message.channel.send(`Please enter a id!`)
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`${member} has been unbanned!`)
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }


}


module.exports.config = {
    name: "unban",
    description: "Unban A specific member from a server",
    usage: "unban: [user-id]",
    accessableby: "BAN_MEMBERS",
    aliases: []
}