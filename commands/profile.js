const {createCanvas, loadImage} = require("canvas");
const { MessageAttachment } = require("discord.js");
const { join } = require("path");
const botconfig = require("../botsettings.json");
const member =require('../models/member');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
 

    const messageauthor = await member.findOne({
        userID: message.member.id,
        guildID: message.guild.id
      });
      
    
    if(args[0]){
      const user = message.mentions.members.first();
      if(user.bot) return message.channel.send("**:x: | The bots cannot have profile card.**");
    
      const targetuser = await member.findOne({
        userID: user.id,
        guildID: message.guild.id
        
    });
    const canvas = createCanvas(1000,333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..","img","background.jpg"));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth =4;
    ctx.strokeStyle ="#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180,216,770,65);
    ctx.fill();
    ctx.globalAlpha =1;
    ctx.strokeRect(180,216,770,65);
    ctx.stroke();

    ctx.fillStyle = "#e67e22";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180,216,((100/(targetuser.next))*targetuser.xp)*7.7,65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign ="centre";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${targetuser.xp}/${targetuser.next} XP`,600 ,260);

    ctx.textAlign = "left";
    ctx.fillText(targetuser.username,300,120);

    ctx.font = "50px Arial";
    ctx.fillText("Level:",300,180);
    ctx.fillText(targetuser.level,470, 180);

    ctx.arc(170, 160, 120, 0,Math.PI * 2,true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.user.displayAvatarURL({format : "jpg"}));
    ctx.drawImage(avatar,40,40,250,250);
    const attachment= new MessageAttachment(canvas.toBuffer(),"rank.png");
    return message.channel.send(`Rank card for **${targetuser.username}**`,attachment);
    }
    const canvas = createCanvas(1000,333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..","img","background.jpg"));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth =4;
    ctx.strokeStyle ="#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180,216,770,65);
    ctx.fill();
    ctx.globalAlpha =1;
    ctx.strokeRect(180,216,770,65);
    ctx.stroke();

    ctx.fillStyle = "#e67e22";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180,216,((100/(messageauthor.next))*messageauthor.xp)*7.7,65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign ="centre";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${messageauthor.xp}/${messageauthor.next} XP`,600 ,260);

    ctx.textAlign = "left";
    ctx.fillText(messageauthor.username,300,120);

    ctx.font = "50px Arial";
    ctx.fillText("Level:",300,180);
    ctx.fillText(messageauthor.level,470, 180);

    ctx.arc(170, 160, 120, 0,Math.PI * 2,true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(message.member.user.displayAvatarURL({format : "jpg"}));
    ctx.drawImage(avatar,40,40,250,250);
    const attachment= new MessageAttachment(canvas.toBuffer(),"rank.png");
    message.channel.send(`Rank card for **${messageauthor.username}**`,attachment);

   
}
module.exports.config = {
    name: "profile",
    description: "to see current level of a specific user",
    usage: "profile",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}