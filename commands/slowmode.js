const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_CHANNELS')){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**You need \`MANAGE_CHANNELS\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
   if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**The bot needs \`MANAGE_CHANNELS\` permission do use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
    if (!args[0])
    return message.channel.send(
      `You did not specify the time in seconds you wish to set this channel's slow mode to!`
    );
  if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
  
  
  try{
  message.channel.setRateLimitPerUser(args[0]);
  message.channel.send(
    `Set the slowmode of this channel to **${args[0]}**`);
  }catch (err) {
    return message.reply(`\`${err.message}.!\``);

}
}



module.exports.config = {
    name: "slowmode",
    description: "activate a Slowmode in a specific channel",
    usage: "slowmode <duration>",
    Permissions: "MANAGE_CHANNELS",
    aliases: []
}

