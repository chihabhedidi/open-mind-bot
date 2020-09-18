const reqEvent = (event) => require(`../events/${event}`)
const Guild =require('../models/guild');
const User =require('../models/user')
const mongoose = require('mongoose');
const botsettings = require('../botsettings.json');
const Discord = require('discord.js');
const member = require('../models/member');
const Leveling = require('../models/leveling');
const Stats =require('../models/stats')
module.exports = bot => {
    bot.once("ready", function() {reqEvent("ready") (bot) });
    bot.on("guildMemberAdd", async member => { //usage of welcome event
      let f=0;
      let setting = await Stats.findOne({
        guildID: member.guild.id
    },async (err, guild)  => {
    if(!guild){
      f=1
    }
    })
  if(f==1){
    return
  }
        
        if(f==0){
      let sguildid = await setting.guildID
      let tusers = await setting.allusers
      let membs = await setting.membercount
      let bots = await setting.botcount
     
      
      const totalsize = member.guild.memberCount;
      const botsize = member.guild.members.cache.filter(m => m.user.bot).size;
      const humansize = totalsize - botsize;
      
      if(member.guild.id === sguildid) { 
        member.guild.channels.cache.get(tusers).setName("Total Users : " + member.guild.memberCount);
        member.guild.channels.cache.get(membs).setName("Members : " + humansize);
        member.guild.channels.cache.get(bots).setName("Bots : " + member.guild.members.cache.filter(m => m.user.bot).size);
      }
        }
    })
    bot.on("guildMemberRemove", async member  => { //usage of welcome event
      let f1=0;
      let setting = await Stats.findOne({
        guildID: member.guild.id
    },async (err, guild)  => {
    if(!guild){
      f1=1
    }
    })
  if(f1==1){
    return
  }
        
        if(f1==0){
  let sguildid = await setting.guildID
  let tusers = await setting.allusers
  let membs = await setting.membercount
  let bots = await setting.botcount
 
      const totalsize = member.guild.memberCount;
      const botsize = member.guild.members.cache.filter(m => m.user.bot).size;
      const humansize = totalsize - botsize;
      
      if(member.guild.id === sguildid) { 
        member.guild.channels.cache.get(tusers).setName("Total Users : " + member.guild.memberCount);
        member.guild.channels.cache.get(membs).setName("Members : " + humansize);
        member.guild.channels.cache.get(bots).setName("Bots : " + member.guild.members.cache.filter(m => m.user.bot).size);
      
      }
      
        }
    })

    bot.on('guildCreate', async function(guild) {
        const  newGuild ={
          guildID: guild.id,
          guildName: guild.name,
          prefix: botsettings.default_prefix,
          Autorole: botsettings.default_Autorole,
          welcome_channel: botsettings.default_welcome_channel,
          welcome_message: botsettings.default_welcome_message,
          leave_channel: botsettings.default_leave_channel
          
      };
      const merged =Object.assign({_id: mongoose.Types.ObjectId()},newGuild)
      const createguild = await new Guild(merged);
      createguild.save()
      .then(g => console.log(`I have joined -> ${g.guildName}`))
      .catch(err => console.error(err));
      


      });
      bot.on('guildDelete', async function(guild) {

        Guild.findOneAndDelete({
            guildID: guild.id
        }, (err, res) => {
            if(err) console.error(err)
            console.log('I have been removed from a server!');
        });

      });
      bot.on("guildMemberAdd", async member => {
        if(member.bot) return;
        let ss = await User.findOne({
            userID: member.id
        }, (err, user) => {
            if (err) console.error(err)
            if (!user) {
        const  newUser =new User({
            _id: mongoose.Types.ObjectId(),
            userID: member.id,
            username: member.user.tag
            
        })
       
        newUser.save()
      .catch(err => console.error(err));
    }
    })
    
        let settings = await Guild.findOne({
          guildID: member.guild.id
        });
    
          if(settings.welcome_channel != "null" && settings.Autorole!="null") { //check if var have value or not
            member.roles.add(settings.Autorole);
            let wembed = new Discord.MessageEmbed() //define embed
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic : true}))
        .setColor("RANDOM")
        .setThumbnail(member.guild.iconURL({dynamic : true}))
        .setDescription(`${settings.welcome_message}`);
        
        bot.channels.cache.get(settings.welcome_channel).send(wembed) //get channel and send embed
          }
          if(settings.welcome_channel==="null" && settings.Autorole==="null"){
            return;
          }
          if(settings.welcome_channel === "null"&&settings.Autorole!="null") { //check if var have value or not
            member.roles.add(settings.Autorole);
          }
          if(settings.welcome_channel!="null" && settings.Autorole==="null"){
            let wembed = new Discord.MessageEmbed() //define embed
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic : true}))
        .setColor("RANDOM")
        .setThumbnail(member.guild.iconURL({dynamic : true}))
        .setDescription(`${settings.welcome_message}`);
        
        bot.channels.cache.get(settings.welcome_channel).send(wembed) //get channel and send embed
          }
          
          
      
      })
      bot.on("guildMemberRemove", async member  => { //usage of welcome event
        let settings = await Guild.findOne({
          guildID: member.guild.id
        });
      
         if(settings.leave_channel==="null") { //check if var have value or not
            return;
          }
        
      
        let wembed = new Discord.MessageEmbed() //define embed
        .setAuthor(member.user.username, member.user.avatarURL())
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(`we hope to see you again in our server`);
        
        bot.channels.cache.get(settings.leave_channel).send(wembed) //get channel and send embed
        
      })
      
      bot.on("message", async message  => { 
        if(message.author.bot) return;
 
        let ss = await member.findOne({
            userID: message.member.id,
            guildID: message.guild.id
        }, (err, user) => {
            if (err) console.error(err)
            if (!user) {
        const  newmember =new member({
            _id: mongoose.Types.ObjectId(),
            userID: message.member.id,
            username: message.member.user.tag,
            guildID: message.guild.id

            
        })
       
        newmember.save()

      .catch(err => console.error(err));
    }
    })
    let settings = await Guild.findOne({
      guildID: message.guild.id
    });
    if(settings.leveling_status==="on"){
        const cooldown = new Set();
        const Member = await member.findOne({
          userID: message.member.id,
          guildID: message.guild.id
        });
        
      
      try {
  
        /* >>>> Guild Scores  <<<<*/
        if (!cooldown.has(message.author.id)) {
        if (Member.xp >= Member.next){
          await Member.updateOne({
            userID: Member.userID,
            guildID: message.channel.guild.id,
            xp: Member.xp+Math.floor(Math.random() * 8) + 5,
            level: Member.level + 1,
            next: Math.floor(Member.next * 1.45)
          });
          const lve = await Guild.findOne({
            guildID: message.channel.guild.id,
          });

          if(lve.leveling_channel!=="null"){
            let lf=0;
          
          bot.channels.cache.get(lve.leveling_channel).send(`Congrats <@${Member.userID}>You are now Level  ${Member.level+1}`);
          const me = await Leveling.findOne({
            guildID: message.channel.guild.id,
            rolelevel:Member.level+1
        },async (err, level)  => {
        if(level){
          lf=1}

        });
    
if(lf==1){
if (  me.rolelevel==Member.level+1){
  await message.member.roles.add(me.roletoad)
  if(me.roletoremove!="null"){await message.member.roles.remove(me.roletoremove)}
  }
}
  
            
          }else{
              let lf1=0
          message.channel.send(`Congrats <@${Member.userID}>You are now Level  ${Member.level+1}`);
        
          const me = await Leveling.findOne({
            guildID: message.channel.guild.id,
            rolelevel:Member.level+1
        },async (err, level)  => {
if(level){

lf1=1
}

        });
    
if(lf1==1){
if (  me.rolelevel==Member.level+1){
  await message.member.roles.add(me.roletoad)
  if(me.roletoremove!="null"){await message.member.roles.remove(me.roletoremove)}

  }
}
    
        
        }

          
       
      
        } else
        await Member.updateOne({
          
          xp: Member.xp+Math.floor(Math.random() * 8) + 5,
        });
      
       
        /* >>>> Sorting Guild Scores Ranks  <<<<*/
        await member.find({guild: message.channel.guild.id }, async (err, row) => {
        if(err)return;
        let setRanks = row.map((x) => x.userID),
                i = 0;
        while (setRanks[i]) {
          await member.updateOne({
            userID: setRanks[i],
            guild: message.channel.guild.id,
            rank: i + 1
          });
        i++;
        }}).sort({ xp: -1 });
         
         cooldown.add(message.author.id);
          setTimeout(() => cooldown.delete(message.author.id), 5000);
         }
        }catch(e){ console.error(e) }
      }})
    
        };
      
