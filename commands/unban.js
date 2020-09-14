const Discord = require("discord.js")
const botconfig = require("../botsettings.json");



module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
  let unbanned = args[0]
  let member = await bot.users.fetch(unbanned);
  if (!member) {
    return message.channel.send(`Please enter a id!`)
}
  try {
    const banList = await message.guild.fetchBans();
  
    if (!banList.get(unbanned)) {
    return await message.channel.send(`this user is not banned`)
    }else{
        message.guild.members.unban(member);
        return await message.channel.send(`${member.tag} has been successfully unbanned.`)
        }
  } catch(err) {
    return message.channel.send(`An error occured ${err}!`)
  }

}




module.exports.config = {
    name: "unban",
    description: "Unban A specific member from a server",
    usage: "unban: [user-id]",
    accessableby: "BAN_MEMBERS",
    aliases: []
}
