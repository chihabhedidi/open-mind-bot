const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Guild =require('../models/guild');
const Leveling =require('../models/leveling');
const mongoose = require('mongoose');


module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**You need \`MANAGE_GUILD\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
       if(!message.guild.me.hasPermission("MANAGE_GUILD")){
        const embed = new Discord.MessageEmbed()
       .setDescription (`**The bot needs \`MANAGE_GUILD\` permission do use this command**`)
       .setColor('#ff5e5e')
       return message.channel.send(embed)}
    let t = message.content;
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    if(!args[0])return message.channel.send(`\`Usage exemple:${settings.prefix}leveling enable\``);
    if(args[0]==="enable"){
        if(settings.leveling_status=="on"){
            return message.channel.send("Leveling system is already on");
        }
        await settings.updateOne({
            leveling_status: "on"
          });
          return message.channel.send("Leveling system enabled");
    }
    if(args[0]==="disable"){
        if(settings.leveling_status=="off"){
            return message.channel.send("Leveling system is already off");
        }
        await settings.updateOne({
            leveling_status: "off"
          });
          return message.channel.send("you disabled the leveling system");
    }
    if(args[0]==="channel"){
        let channel = message.mentions.channels.first() //mentioned channel
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
        await settings.updateOne({
            leveling_channel: channel
        });
        message.channel.send(`Leveling Channel is  ${channel}`)  
    }
    

    if(args[0]==="roles"){
        if(args[1]==="remove"){  
            if(isNaN(args[2]) || parseInt(args[2]) <= 0)
            {
                const embed = new Discord.MessageEmbed()
                .setTitle("**Usage**")
                .setColor('#1e43c9')
                .setDescription(`\`${settings.prefix}leveling roles remove <level>\``)
                 return message.channel.send(embed).catch();  
                
            }
            const del = await Leveling.findOne({
                guildID: message.guild.id,
                rolelevel: args[2]
            },async (err, level)  => {
                if (err) console.error(err)
                if(level){
                     
                        await  Leveling.findOneAndDelete({
                              guildID: message.guild.id,
                              rolelevel: args[2]
                          })
                          const embed = new Discord.MessageEmbed()
                .setColor('#1e43c9')
                .setDescription(`**You removed the leveling role in the level  ${args[2]}**`)
                return message.channel.send(embed).catch(); 
                   
                }
                const embed = new Discord.MessageEmbed()
                .setColor('#1e43c9')
                .setDescription(`**There is no leveling role in  the level ${args[2]}**`)
                return message.channel.send(embed).catch(); 
            }
            
            );
            
       
         
               
            }
            if(args[1]==="add"){  
                if(!args[2]){
                    const embed = new Discord.MessageEmbed()
                    .setTitle("**Usage**")
                .setColor('#1e43c9')
                .setDescription(`\`${settings.prefix}leveling roles add <role> <level> [remove]\``)
                .setFooter("Link a role to a level. Removes another role if given. Make sure the bot's role is higher than the roles it has to give!")
                return message.channel.send(embed).catch();  
                }
                let userMentions = t.match(/<@&(\d+?)>/g) || []; // string.match will return an array of matches and capturing group results; sometimes it will return "null" if there are no matches, so the "|| []" makes sure this won't happen
            
                userMentions[0] = userMentions[0].slice(3, -1); // id of first mention
                // id of second mention
            
           let rorletoadd=userMentions[0];
               if(isNaN(args[3]) || parseInt(args[3]) <= 0)
           {
            return message.channel.send("\`Usage exemple:\`roles add ");
           }
           if(!userMentions[1]){
            if(rorletoadd&&args[3]){
              
                
               
                const  newleveling1 =new Leveling({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.channel.guild.id,
                    guildName: message.channel.guild.name,
                    roletoad: rorletoadd,
                    rolelevel: args[3]
                })
               
                newleveling1.save()
              .catch(err => console.error(err));
              return message.channel.send(`**✅|The role <@&${rorletoadd}> has been linked to level ${args[3]}.**`)
            }
           }
           userMentions[1] = userMentions[1].slice(3, -1);
           let roletoremove1 =   userMentions[1]
          
           if(rorletoadd&&roletoremove1&&args[3]){
              
               message.channel.send(`**✅|The role <@&${rorletoadd}> has been linked to level ${args[3]},I will also remove the role <@&${roletoremove1}> **`)
              
               const  newleveling1 =new Leveling({
                   status: "on",
                   _id: mongoose.Types.ObjectId(),
                   guildID: message.channel.guild.id,
                   guildName: message.channel.guild.name,
                   roletoad: rorletoadd,
                   roletoremove: roletoremove1,
                   rolelevel: args[3]
               })
              
               newleveling1.save()
             .catch(err => console.error(err));
           
           }
            } 
            if(args[1]==="list"){
                     const data = await Leveling
    .find({ guildID: message.channel.guild.id })
  
const rta = data.map(z => z.roletoad);
const rl = data.map(y => y.rolelevel);
const rtr = data.map(x => x.roletoremove);
const lb = rta.map((a,b) => { 
    if(rtr[b]=="null"){
    return [`**<@&${rta[b]}>:${rl[b]} **`]; }
  return [`**<@&${rta[b]}>:${rl[b]} - Removes: <@&${rtr[b]}> **`];  
});


const embed = new Discord.MessageEmbed()
        
        .setColor('0x2ecc71')
        .setTitle(`** ${message.guild.name} | Leveling Roles**`)
        .setDescription(lb.join("\n"))
    
    await message.channel.send(embed)
                /*const del = await Leveling.find({
                    guildID: message.guild.id,
                }, { _id: 0,  roletoad: 1, roletoremove: 1,rolelevel:1 })
               
                      message.channel.send(`** ${message.guild.name} | Leveling Roles**`)
                for(const {
                    roletoad: rta,
                    roletoremove: rtd,
                    rolelevel: rl
                    } of del){
                       
                    if(rtd=="null"){
                        const embed = new Discord.MessageEmbed()
                        .setColor('#fa5252')
                        .setDescription(`**<@&${rta}>:${rl}**`)
                         message.channel.send(embed).catch(); 
                    }
                    else{
                        const embed = new Discord.MessageEmbed()
                        .setColor('#fa5252')
                        .setDescription(`**<@&${rta}>:${rl}** - Removes: <@&${rtd}>`)
                         message.channel.send(embed).catch();
                    }
                    
                    }
        return;*/
            }
            
        }
   
    
}
module.exports.config = {
    name: "leveling",
    description: "To enable/disable leveling system in your server",
    usage: "leveling",
    Permissions: "MANAGE_GUILD",
    aliases: []
}
