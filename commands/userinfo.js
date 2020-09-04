cconst {createCanvas, loadImage} = require("canvas");
const { MessageAttachment } = require("discord.js");
const { join } = require("path");
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
 

    const user = message.mentions.members.first()|| message.guild.members.cache.get(args[0])||message.member;
    if(user.user.bot) return message.channel.send("**:x: | This command for Humans.**");
const balance=await loadImage(join(__dirname, "..","bd","balance.png"));
const Bravery=await loadImage(join(__dirname, "..","bd","bravery.png"));
const Brilliance=await loadImage(join(__dirname, "..","bd","brilliance.png"));
const BugHunter=await loadImage(join(__dirname, "..","bd","bughunter.png"));
const BugHunterv2=await loadImage(join(__dirname, "..","bd","BugHunterv2.png"));
const de=await loadImage(join(__dirname, "..","bd","de.png"));
const es=await loadImage(join(__dirname, "..","bd","earlysupporter.png"));
const he=await loadImage(join(__dirname, "..","bd","hypesquad.png"));
const partner=await loadImage(join(__dirname, "..","bd","partner.png"));
const vbd=await loadImage(join(__dirname, "..","bd","devbadge.png"));
const id=await loadImage(join(__dirname, "..","bd","id.png"));
    let badges =await user.user.flags
    badges = await badges.toArray();
   
  
    const canvas = createCanvas(214,300);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..","img","profile.png"));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#f4b5ff";
    ctx.fillText(user.user.tag,108,217);
    ctx.textAlign = "left";
    ctx.fillText(user.user.id,50,235);
    ctx.drawImage(id,28,222,16,16);
    ctx.textAlign = "left";
    ctx.fillText(`Creation date: ${user.user.createdAt.toLocaleDateString("en-us")}`,28,252);
    ctx.textAlign = "left";
    ctx.fillText(`Joined server in: ${user.joinedAt.toLocaleDateString("en-us")}`,28,269);
    ctx.textAlign = "left";
    ctx.fillText(`Highest Role: ${user.roles.highest.name}`,28,285);
    
    
  if(badges.includes("HOUSE_BALANCE")){
    ctx.drawImage(balance,170,60,16,16);
  }if(badges.includes("HOUSE_BRILLIANCE")){
    ctx.drawImage(Brilliance,170,60,16,16);
  }if(badges.includes("HOUSE_BRAVERY")){
    ctx.drawImage(Bravery,170,60,15,15);
  }if(badges.includes("VERIFIED_DEVELOPER")){
    ctx.drawImage(vbd,195,58,18,18);
  }if(badges.includes("EARLY_SUPPORTER")){
    ctx.drawImage(es,170,90,16,16);
  }if(badges.includes("HYPESQUAD_EVENTS")){
    ctx.drawImage(he,195,90,16,16);
  }if(badges.includes("BUG_HUNTER_LEVEL_1")){
    ctx.drawImage(BugHunter,195,120,16,16);
  }if(badges.includes("BUG_HUNTER_LEVEL_2")){
    ctx.drawImage(BugHunterv2,170,150,16,16);
  }if(badges.includes("DISCORD_EMPLOYEE")){
    ctx.drawImage(de,195,150,16,16);
  }if(badges.includes("DISCORD_PARTNER")){
    ctx.drawImage(partner,170,120,16,16);
  }
    ctx.arc(104, 88, 30, 0,Math.PI * 2,true);
    ctx.lineWidth = 6;
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.user.displayAvatarURL({format : "jpg"}));
    ctx.drawImage(avatar,74,59,62,62);
    const attachment= new MessageAttachment(canvas.toBuffer(),"profile.png");
    message.channel.send(attachment);

   
}




module.exports.config = {
    name: "userinfo",
    description: "To show information about a specific member",
    usage: "userinfo [Mention] ",
    accessableby: "Public Usage",
    aliases: ["us"]
}