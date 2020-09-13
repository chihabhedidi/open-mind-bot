﻿const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const moment = require('moment');
const { GiveawaysManager } = require('discord-giveaways');
const bot = new Discord.Client({disableEveryone: true});
const { badwords } = require("./data.json") 
const db = require("quick.db");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMTMxNTc1NDE3NTAzNzQ4MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk3ODYwMzAxfQ.4Zht1A6PJbUGFVyKoHGZ2bq2ujOhgGB3u0P0btNVLEg', bot);

const mongoose = require('mongoose');
const Guild =require('./models/guild');
const User =require('./models/user');
bot.mongoose = require('./util/mongoose');
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
bot.on("ready", () => {
  function randomStatus() {
    let status = [`${bot.guilds.cache.size} Servers`, "m!help", `${bot.users.cache.size} Users`] // You can change it whatever you want.
    let rstatus = Math.floor(Math.random() * status.length);
    
    bot.user.setActivity(status[rstatus], {type: "WATCHING"}); 
    // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
    // Example: streaming
    
    
  }; setInterval(randomStatus, 20000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.
  
  
})




bot.on("message", async message  => { 
  let settings = await Guild.findOne({
    guildID: message.guild.id
  })
 if(settings.antiswear=="on"){
    let confirm = false;
  var i;
  for(i = 0;i < badwords.length; i++) {
    
    if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
      confirm = true;
    
  }
   
   if(confirm) {
    try{
     await message.delete()
      return message.channel.send("You are not allowed to send badwords here")
    }catch (err) {
      return message.reply(`\`${err.message}.!\``);
    }  

    } 
   
 }
  
})

require("./util/eventHandler")(bot)

const fs = require("fs");
const { isNull } = require('util');
const { settings } = require('cluster');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.giveawaysManager = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
      botsCanWin: false,
      exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
      embedColor: "#FF0000",
      reaction: "🎉"
  }
});
bot.snipes = new Map()
bot.on('messageDelete', function(message, channel){
  
  bot.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js") 
  if(jsfile.length <= 0) {
       return console.log("[LOGS] Couldn't   Commands!");
  }

  jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`);
      bot.commands.set(pull.config.name, pull);  
      pull.config.aliases.forEach(alias => {
          bot.aliases.set(alias, pull.config.name)
      });
  });
});
bot.on("message", async message => {
  if(message.author.bot) return;
  let ss = await User.findOne({
    userID: message.member.id
}, (err, user) => {
    if (err) console.error(err)
    if (!user) {
const  newUser =new User({
    _id: mongoose.Types.ObjectId(),
    userID: message.member.id,
    username: message.member.user.tag
    
})

newUser.save()
.catch(err => console.error(err));
}
})
  let settings = await Guild.findOne({
    guildID: message.guild.id
  }, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: botsettings.default_prefix,
            Autorole: botsettings.default_Autorole,
            welcome_channel: botsettings.default_welcome_channel,
            welcome_message: botsettings.default_welcome_message,
            leave_channel: botsettings.default_leave_channel
        })
  
        newGuild.save()
        .then(g => console.log(`I have joined -> ${g.guildName}`))
        .catch(err => console.error(err));
  
    }
  });
  if(message.author.bot || message.channel.type === "dm") return;

  if(!message.guild) return;
  
  
  if(settings.prefix === null ) settings.prefix = botsettings.default_prefix;
 if(message.content.startsWith("<@!731315754175037480>")) 
  return message.channel.send(`the prefix for ${message.guild.name} is \`${settings.prefix}\``);
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(settings.prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(settings.prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(settings.prefix.length)))
  if(commandfile){ commandfile.run(bot,message,args)}


})
bot.mongoose.init();
bot.login(process.env.token);
