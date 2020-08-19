const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const db = require("quick.db")
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send("You don't have permission to use that command.");
    const settings = await Guild.findOne({
        guildID: message.guild.id
      })
      let wc =":red_circle:";
      let ar =":red_circle:";
      let lc =":red_circle:";
      let as =":red_circle:";
      let ls =":red_circle:";
if(settings.welcome_channel!="null"){
 wc=":green_circle:";
}
if(settings.Autorole!="null"){
    ar=":green_circle:";
   }
   if(settings.leave_channel!="null"){
    lc=":green_circle:";
   }
   if(settings.antiswear!="null"){
    as=":green_circle:";
   }
   if(settings.leveling_status!="off"){
    ls=":green_circle:";
   }

const embed = new MessageEmbed()
        
        .setColor('#f3f3f3')
        .setTitle(`**Panel of ${message.guild.name} **`)
        .setDescription(`**Welcome channel : **${wc}
        **Leave channel : **${lc}
        **Leveling  system : **${ls}
        **Antiswear : **${as}
        **Autorole : **${ar}
`)
        .setFooter(`Requested By : ${message.author.tag}`)
    await message.channel.send(embed)
 
}
module.exports.config = {
    name: "panel",
    description: "to see server activities",
    usage: "panel",
    accessableby: "ADMINISTATOR",
    aliases: []
}