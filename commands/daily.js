const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const User =require('../models/user');
const db = require("quick.db")


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
  const settings = await User.findOne({
    userID: message.member.id
});
//const userBalance = await client.findOrCreateUser(message.author.id);
let amount = Math.floor(Math.random() * 500) + 100;
const dailyCD =8.64e+7;
const lastdaily = await settings.daily;
if(lastdaily!== null && dailyCD - (Date.now()-lastdaily)>0){
const cdtime=dailyCD -(Date.now()- lastdaily);
return message.channel.send(`**:x: | You can get your daily reward after ( \`${Math.floor(cdtime / (1000*60*60)%24)} hours, ${Math.floor(cdtime / (1000*60)%60)} minutes, ${Math.floor(cdtime / (1000)%60)} seconds\` )**`);
}else {
    await settings.updateOne({
        balance: settings.balance + amount,
        daily : (Date.now() )
    });
    message.channel.send(`**:moneybag: | You got \`$${amount}\` money!!**`);

 }
}
module.exports.config = {
    name: "daily",
    description: "get your daily reward",
    usage: "daily",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}