const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const moment = require('moment');
const { GiveawaysManager } = require('discord-giveaways');
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

bot.on("guildMemberAdd", async member => { //usage of welcome event
  let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  

    if(chx === null) { //check if var have value or not
      return;
    }
   

  
  
 

  let wembed = new Discord.MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("RANDOM")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`We are very happy to have you in our server`);
  
  bot.channels.cache.get(chx).send(wembed) //get channel and send embed
})
bot.on("guildMemberRemove", async member  => { //usage of welcome event

  let chx = db.get(`leavechannel_${member.guild.id}`); //defining var

   if(chx === null) { //check if var have value or not
      return;
    }
  

  let wembed = new Discord.MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("RANDOM")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`we hope to see you again in our server`);
  
  bot.channels.cache.get(chx).send(wembed) //get channel and send embed
  
})

require("./util/eventHandler")(bot)

const fs = require("fs");
const { isNull } = require('util');
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

  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  
  if(prefix === null ) prefix = botsettings.default_prefix;
  if(message.content.startsWith("prefix")) 
  return message.channel.send(`the prefix for ${message.guild.name} is \`${prefix}\``);
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if(commandfile){ commandfile.run(bot,message,args)}


})


bot.login(process.env.token);