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
      const user = message.mentions.members.first()|| message.guild.members.cache.get(args[0]);
     if(user.user.bot) return message.channel.send("**:x: | The bots cannot have profile card.**");
    
      const targetuser = await member.findOne({
        userID: user.id,
        guildID: message.guild.id
        
    });
    const balance=await loadImage(join(__dirname, "..","img","balance.png"));
    const Bravery=await loadImage(join(__dirname, "..","img","Bravery.png"));
    const Brilliance=await loadImage(join(__dirname, "..","img","Brilliance.png"));
    const BugHunter=await loadImage(join(__dirname, "..","img","BugHunter.png"));
    const BugHunterv2=await loadImage(join(__dirname, "..","img","BugHunterv2.png"));
    const de=await loadImage(join(__dirname, "..","img","des.png"));
    const es=await loadImage(join(__dirname, "..","img","es.png"));
    const he=await loadImage(join(__dirname, "..","img","he.png"));
    const partner=await loadImage(join(__dirname, "..","img","partner.png"));
    const vbd=await loadImage(join(__dirname, "..","img","vbd.png"));
        let badges =await user.user.flags
        badges = await badges.toArray();
       
    const canvas = createCanvas(1000,333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..","img","background.png"));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#D00E62";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180,216,((100/(targetuser.next))*targetuser.xp)*7.7,65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign ="centre";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${targetuser.xp}/${targetuser.next} XP`,600 ,260);
    if(badges.includes("HOUSE_BALANCE")){
      ctx.drawImage(balance,282,12,32,32);
    }if(badges.includes("HOUSE_BRILLIANCE")){
      ctx.drawImage(Brilliance,282,12,32,32);
    }if(badges.includes("HOUSE_BRAVERY")){
      ctx.drawImage(Bravery,282,12,32,32);
    }if(badges.includes("VERIFIED_DEVELOPER")){
      ctx.drawImage(vbd,322,6,40,40);
    }if(badges.includes("EARLY_SUPPORTER")){
      ctx.drawImage(es,364,12,32,32);
    }if(badges.includes("HYPESQUAD_EVENTS")){
      ctx.drawImage(he,385,2,50,50);
    }if(badges.includes("BUG_HUNTER_LEVEL_1")){
      ctx.drawImage(BugHunter,430,10,32,32);
    }if(badges.includes("BUG_HUNTER_LEVEL_2")){
      ctx.drawImage(BugHunterv2,430,10,32,32);
    }if(badges.includes("DISCORD_EMPLOYEE")){
      ctx.drawImage(de,465,4,50,50);
    }if(badges.includes("DISCORD_PARTNER")){
      ctx.drawImage(partner,515,10,40,40);
    }
    ctx.textAlign = "left";
    ctx.fillText(targetuser.username,300,120);
    ctx.textAlign = "left";
    ctx.font = "50px Arial";
    ctx.fillText("Level:",300,180);
    ctx.fillText(targetuser.level,470, 180);

    ctx.arc(170, 160, 120, 0,Math.PI * 2,true);
    ctx.lineWidth = 6;
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.user.displayAvatarURL({format : "jpg"}));
    ctx.drawImage(avatar,40,40,250,250);
    const attachment= new MessageAttachment(canvas.toBuffer(),"rank.png");
    return message.channel.send(`Rank card for **${targetuser.username}**`,attachment);
    }
const balance=await loadImage(join(__dirname, "..","img","balance.png"));
const Bravery=await loadImage(join(__dirname, "..","img","Bravery.png"));
const Brilliance=await loadImage(join(__dirname, "..","img","Brilliance.png"));
const BugHunter=await loadImage(join(__dirname, "..","img","BugHunter.png"));
const BugHunterv2=await loadImage(join(__dirname, "..","img","BugHunterv2.png"));
const de=await loadImage(join(__dirname, "..","img","des.png"));
const es=await loadImage(join(__dirname, "..","img","es.png"));
const he=await loadImage(join(__dirname, "..","img","he.png"));
const partner=await loadImage(join(__dirname, "..","img","partner.png"));
const vbd=await loadImage(join(__dirname, "..","img","vbd.png"));
    let badges =await message.member.user.flags
    badges = await badges.toArray();
   
  
    const canvas = createCanvas(1000,333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..","img","background.png"));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#D00E62";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180,216,((100/(messageauthor.next))*messageauthor.xp)*7.7,65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign ="centre";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${messageauthor.xp}/${messageauthor.next} XP`,600 ,260);
    if(badges.includes("HOUSE_BALANCE")){
      ctx.drawImage(balance,282,12,32,32);
    }if(badges.includes("HOUSE_BRILLIANCE")){
      ctx.drawImage(Brilliance,282,12,32,32);
    }if(badges.includes("HOUSE_BRAVERY")){
      ctx.drawImage(Bravery,282,12,32,32);
    }if(badges.includes("VERIFIED_DEVELOPER")){
      ctx.drawImage(vbd,322,6,40,40);
    }if(badges.includes("EARLY_SUPPORTER")){
      ctx.drawImage(es,364,12,32,32);
    }if(badges.includes("HYPESQUAD_EVENTS")){
      ctx.drawImage(he,385,2,50,50);
    }if(badges.includes("BUG_HUNTER_LEVEL_1")){
      ctx.drawImage(BugHunter,430,10,32,32);
    }if(badges.includes("BUG_HUNTER_LEVEL_2")){
      ctx.drawImage(BugHunterv2,430,10,32,32);
    }if(badges.includes("DISCORD_EMPLOYEE")){
      ctx.drawImage(de,465,4,50,50);
    }if(badges.includes("DISCORD_PARTNER")){
      ctx.drawImage(partner,515,10,40,40);
    }
    ctx.textAlign = "left";
    ctx.fillText(messageauthor.username,300,120);
    ctx.font = "50px Arial";
    ctx.fillText("Level:",300,180);
    ctx.fillText(messageauthor.level,470, 180);

    ctx.arc(170, 160, 120, 0,Math.PI * 2,true);
    ctx.lineWidth = 6;
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