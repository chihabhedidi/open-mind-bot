const Discord = require("discord.js")
const botconfig = require("../botsettings.json");



module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(!message.member.hasPermission('BAN_MEMBERS')){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**You need \`BAN_MEMBERS\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
   if(!message.guild.me.hasPermission("MANAGE_GUILD")){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**The bot needs \`MANAGE_GUILD\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
  let unbanned = args[0]
  let member = await bot.users.fetch(unbanned);
  if (!member) {
    return message.channel.send(`Please enter a id!`)
}
  try {
    const banList = await message.guild.fetchBans();
  
    if (!banList.get(unbanned)) {
    return await message.channel.send(`This user is not banned`)
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
    Permissions: "BAN_MEMBERS",
    aliases: []
}
