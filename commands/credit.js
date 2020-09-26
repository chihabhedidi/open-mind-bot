const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const User =require('../models/user');
const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
 
  if(message.author.bot) return;
  //const user = message.guild.member(user);

  const messageauthor = await User.findOne({
    userID: message.member.id
  });
  

if(args[0]){
  const user = message.mentions.users.first();
  if(user.bot) return message.channel.send("**:x: | The bots cannot have money.**");

  const targetuser = await User.findOne({
    userID: user.id
});
//if(user.bot) return message.channel.send("**:x: | The bots cannot have money.**");
if(args[1]){

  if(targetuser.userID == message.author.id)return message.channel.send("**:x: | You can't give yourself money..**");
  if(isNaN(parseInt(args[1])))return message.channel.send("**:x: | Inviled Amount**");    
  if(parseInt(args[1]) > messageauthor.balance)return message.reply("**:x: | You don't have enough money!**");
  await messageauthor.updateOne({
    balance: messageauthor.balance - Math.floor(parseInt(args[1]))
});
await targetuser.updateOne({
  balance: targetuser.balance + Math.floor(parseInt(args[1]))
});

  message.channel.send(`**<@${message.author.id}>, You have been sent \`$${Math.floor(parseInt(args[1]))}\` to <@${targetuser.userID}>**`);
  }else {
  
  const embed = new Discord.MessageEmbed()
.setTitle(`${targetuser.userID}\`s Balance`)
.setThumbnail("https://hotemoji.com/images/dl/4/money-bag-emoji-by-twitter.png")
.setDescription (`**💳 | <@${targetuser.userID}>'s has \`$${targetuser.balance}\`**`)
.setTimestamp()
.setColor('#d9c545')
return message.channel.send(embed)
  }
  
}else {
const embed = new Discord.MessageEmbed()
.setTitle("Your balance")
.setThumbnail("https://hotemoji.com/images/dl/4/money-bag-emoji-by-twitter.png")
.setDescription (`**💳 | <@${messageauthor.userID}>'s has \`$${messageauthor.balance}\`**`)
.setTimestamp()
.setColor('#d9c545')
return message.channel.send(embed)
}
   

 }

module.exports.config = {
    name: "credit",
    description: "show your or someone\'s credit",
    usage: "credit [@member]",
    accessableby: "PUBLIC_USAGE",
    aliases: ["c"]
}
