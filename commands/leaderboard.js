const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const member =require('../models/member');
const db = require("quick.db")
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
const data = await member
    .find({ guildID: message.channel.guild.id })
    .sort({ xp: -1 })
    .limit(5);
  
const user = data.map(z => z.userID);
const xp = data.map(y => y.xp);
const next = data.map(x => x.next);
const level =data.map(l=>l.level);
const lb = user.map((a, b) => { 
  return [`#${b + 1}: ${message.guild.members.cache.get(a) ? `<@${a}>` :`<@!${a}>` } | LVL: \`${level[b]}\` | XP: \`${xp[b]}/${next[b]}\``];  
});


const embed = new MessageEmbed()
        
        .setColor('0x2ecc71')
        .setTitle(`Leaderboard of ${message.channel.guild.name}`)
        .setDescription(lb.join("\n"))
    
    await message.channel.send(embed)
}
module.exports.config = {
    name: "leaderboard",
    description: "to see top member in leveling in the server",
    usage: "leaderboard",
    Permissions: "PUBLIC_USAGE",
    aliases: ["lb"]
}
