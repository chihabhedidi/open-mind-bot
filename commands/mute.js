const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    
  if(message.author.bot) return;
  if(!message.member.hasPermission('MANAGE_ROLES')){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**You need \`MANAGE_ROLES\` permission to use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
   if(!message.guild.me.hasPermission("MANAGE_GUILD")){
    const embed = new Discord.MessageEmbed()
   .setDescription (`**The bot needs \`MANAGE_GUILD\` permission to use this command**`)
   .setColor('#ff5e5e')
   return message.channel.send(embed)}
  const user = message.mentions.users.first();
  if(user) {
    const member = message.guild.member(user);
    if(member){ 
     let mutedRole = message.guild.roles.cache.find(x => x.name === "Muted")
     
     if(!mutedRole) {
      message.channel.send("the server doesnt have a Mute role,i will create one for you try again please")
      let mutedRole = await message.guild.roles.create({
        
          data: {
            name: 'Muted',
            color: '#000000', 
          }
        })
        
        message.guild.channels.cache.forEach(async (channel, id) => {
     await channel.updateOverwrite(mutedRole, {SEND_MESSAGES: false });
      
            
          });
      
  }else{
    
  let reason = args.slice(1).join(" ")
    
  if(!reason) {
    return message.channel.send("Please Give the reason to mute the member")
  }
  let mutetime = args[2];
if(!mutetime) return message.channel.send("You didn't specify a time!");
if(member.roles.cache.has(mutedRole.id)){
  return message.channel.send(`${member} is already muted!`);
 }
 try{
await(member.roles.add(mutedRole));
message.channel.send(`${member} has been muted for ${ms(ms(mutetime))}`);
 }catch (err) {
  return message.reply(`\`${err.message}.!\``);
}
setTimeout(function(){
member.roles.remove(mutedRole);
message.channel.send(`${member} has been unmuted!`);
}, ms(mutetime));
  }
     
        
        }else{
         return message.reply("That user isn't in this server!");
}
}else{return message.channel.send("Mention a member please")}}

module.exports.config = {
    name: "mute",
    description: "Mute A specific member from a server",
    usage: "mute [Mention] <Reason> <time>",
    Permissions: "MANAGE_ROLES",
    aliases: []
}
