const Discord = require("discord.js")
const botsettings = require("../botsettings.json");
const Stats = require("../models/stats")
const mongoose = require('mongoose');



module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: You need **MANAGE_GUILD** permission to use this command.`)
    if (!args[0]) return message.channel.send(":x: Invalid parameters. Correct usage: `serverstats enable` | `serverstats disable`.");  
    let f =0;
    if(args[0] === 'enable') {
      let setting = await Stats.findOne({
        guildID: message.guild.id
    },async (err, guild)  => {
        if (err) console.error(err)
    if(guild){
      f=1
    }
    })
  if(f==1){
    return message.channel.send(`:x: Server stats are already enabled for this server.`)
  }


    if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) return message.channel.send(`:x: I don't have **MANAGE_CHANNELS** permission.`);
        const totalsize = message.guild.memberCount;
        const botsize = message.guild.members.cache.filter(m => m.user.bot).size;
        const humansize = totalsize - botsize;
        message.guild.channels.create('📈Server Statistics📈', {
            type: 'category',
            permissionOverwrites: [
               {
                 id:message.guild.roles.everyone,
                 deny: ['CONNECT'],
              },
            ],
           
          }).then(channel => {
    channel.setPosition(0)
    message.guild.channels.create("Total Users : " + totalsize, {
        type: 'voice',
        permissionOverwrites: [
           {
             id:message.guild.roles.everyone,
             deny: ['CONNECT'],
          },
        ],
       
      }).then(channel1 => {
    channel1.setParent(channel.id)
    let x = channel1.id
    message.guild.channels.create("Members : " + humansize, {
        type: 'voice',
        permissionOverwrites: [
           {
             id:message.guild.roles.everyone,
             deny: ['CONNECT'],
          },
        ],
       
      }).then(channel2 => {
    channel2.setParent(channel.id)
    let y = channel2.id
    message.guild.channels.create("Bots : " + botsize, {
        type: 'voice',
        permissionOverwrites: [
           {
             id:message.guild.roles.everyone,
             deny: ['CONNECT'],
          },
        ],
       
      }).then(async channel3 => {
    channel3.setParent(channel.id)
    let z = channel3.id
    const  newstats =await new Stats({
      _id: mongoose.Types.ObjectId(),
      guildID: message.guild.id,
      allusers:x,
      membercount:y,
      botcount:z,
      catid:channel.id
    
      
    })
    
    newstats.save()
    .catch(err => console.error(err));

    })
    })
    })
    })
    message.channel.send(`:white_check_mark: Serverstats enabled for this server.`)
    } else if (args[0] === 'disable') {
let f=0
let setting =await Stats.findOne({
  guildID: message.guild.id
}, (err, res) => {
  if(err) console.error(err)
  if(!res){

   return message.channel.send(`:x: Serverstats for this server is not enabled.`)
  }
  if(res){
    f=1;
   
  }
});

  if(f==1){
    bot.channels.cache.get(setting.allusers).delete()
    bot.channels.cache.get(setting.membercount).delete()
    bot.channels.cache.get(setting.botcount).delete()
    bot.channels.cache.get(setting.catid).delete()
    Stats.findOneAndDelete({
      guildID: message.guild.id
  }, (err, res) => {
      if(err) message.channel.send(err.message)
  });
  return message.channel.send(`:white_check_mark: Serverstats disabled for this server.`) 
  }
     
    }

}
module.exports.config = {
    name: "serverstats",
    description: "show bots/members count in your server",
    usage: "serverstats enable/disable",
    accessableby: "MANAGE_GUILD",
    aliases: []
}
