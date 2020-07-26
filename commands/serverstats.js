const Discord = require("discord.js")
const botsettings = require("../botsettings.json");
const db = require('quick.db');
const serverstats = new db.table('ServerStats');





module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: You need **MANAGE_GUILD** permission to use this command.`)
    if (!args[0]) return message.channel.send(":x: Invalid parameters. Correct usage: `serverstats enable` | `serverstats disable`.");  
    if(args[0] === 'enable') {
    let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
    let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
    let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
    if(totusers !== null || membcount !== null || botcount !== null) return message.channel.send(`:x: Server stats are already enabled for this server.`)
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
    await serverstats.set(`Stats_${message.guild.id}`, { guildid: message.guild.id, totusers: x, membcount: y, botcount: z, categid: channel.id})
    })
    })
    })
    })
    message.channel.send(`:white_check_mark: Serverstats enabled for this server.`)
    } else if (args[0] === 'disable') {
    
    let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
    let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
    let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
    let categ = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.categid' })
   if(totusers === null || membcount === null || botcount === null) return message.channel.send(`:x: Serverstats for this server is not enabled.`)
      bot.channels.cache.get(totusers).delete()
      bot.channels.cache.get(membcount).delete()
      bot.channels.cache.get(botcount).delete()
      bot.channels.cache.get(categ).delete()
    
    serverstats.delete(`Stats_${message.guild.id}`)
    message.channel.send(`:white_check_mark: Serverstats disabled for this server.`) 
    }

}
module.exports.config = {
    name: "serverstats",
    description: "setup server stats",
    usage: "*serverstats",
    accessableby: "Admins",
    aliases: []
}