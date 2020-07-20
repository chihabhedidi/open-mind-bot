const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const moment = require('moment');
const { GiveawaysManager } = require('discord-giveaways');
const bot = new Discord.Client({disableEveryone: true});
var express  = require('express')

var app  = express()
var server = app.listen(process.env.PORT || 8081, () => {
    console.log('Server is started on 127.0.0.1:'+ (process.env.PORT || 8081))
})

var reqTimer = setTimeout(function wakeUp() {
   request("https://nameless-gorge-19527.herokuapp.com", function() {
      console.log("WAKE UP DYNO");
   });
   return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);
require("./util/eventHandler")(bot)

const fs = require("fs");
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
  if(message.author.bot || message.channel.type === "dm") return;

  let prefix = botsettings.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
 if(commandfile){ commandfile.run(bot,message,args)}else{
    return message.channel.send("```i dont have that command please type *help to see all commands```")
  }


})

bot.login(process.env.token);