const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const Reactionrole = require("../models/reactionrole")
const mongoose = require('mongoose');



module.exports.run = async (bot, message, args) => {
    let t = message.content;
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_ROLES')){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**You need \`MANAGE_ROLES\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     if(!message.guild.me.hasPermission("MANAGE_ROLES")){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**The bot needs \`MANAGE_ROLES\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
    // >createReactionRole @role :emoji: MessageId
if(!args[0]) return message.channel.send("\`Usage:rr @role :emoji: MessageId \`")
        const role = message.mentions.roles.first();
        if(!role)
            return message.reply('You need mention a role').then(m => m.delete({timeout: 1_000}));
            let userMentions = t.match(/<@&(\d+?)>/g) || []; // string.match will return an array of matches and capturing group results; sometimes it will return "null" if there are no matches, so the "|| []" makes sure this won't happen
            
            userMentions[0] = userMentions[0].slice(3, -1);
            function isCustomEmoji(emoji) {
                return emoji.split(":").length == 1 ? false : true;
              }
              if(!args[1])
              return message.reply('You need use a valid emoji.').then(m => m.delete({timeout: 1_000}));
     
       
           if (isCustomEmoji(args[1])){
               try{
            const emoji = bot.emojis.resolveIdentifier(args[1].slice(0,-1))
            const msg = await message.channel.messages.fetch(args.slice(2)[0] || message.id);
        if(!msg)
            return message.reply('Message not found!').then(m => m.delete({timeout: 1_000}));
            await msg.react(emoji);
                let emojiid=args[1].match(/<a?:(\w{2,32}):(\d{17,19})>/)[2];
                const  newreaction =await new Reactionrole({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    MessageID:msg.id ,
                    emoji:emojiid,
                    Role:userMentions[0],
                    
                  })
                  
                  newreaction.save()
                  .catch(err => console.error(err));
              
                  message.delete()
            return message.reply('Done').then(m => m.delete({timeout: 500}));
               }catch(err){
                   return message.channel.send(`${err.message}`)
               }
          
        
            }
            
            const emoji=  bot.emojis.resolveIdentifier(args.slice(1)[0])
            const msg = await message.channel.messages.fetch(args.slice(2)[0] || message.id);
        if(!msg)
            return message.reply('Message not found!').then(m => m.delete({timeout: 1_000}));
            await msg.react(emoji); 
            const  newreaction =await new Reactionrole({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                MessageID:msg.id ,
                emoji:emoji,
                Role:userMentions[0],
                
              })
              
              newreaction.save()
              .catch(err => console.error(err));
          
              
        message.reply('Done').then(m => m.delete({timeout: 500}));
        message.delete()
}



module.exports.config = {
    name: "reactionrole",
    description: "add a reaction role in a specific message",
    usage: "rr @role :emoji: MessageId ",
    Permissions: "MANAGE_ROLES",
    aliases: ["rr"]
}




