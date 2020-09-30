const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
  let avatar = user.user.displayAvatarURL({size: 256, dynamic: true});
  let avatar1 = user.user.displayAvatarURL({size: 2048, dynamic: true});
  let avatar2 = user.user.displayAvatarURL({size: 1024, dynamic: true});
  let avatar3 = user.user.displayAvatarURL({size: 512, dynamic: true});
  
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.user.tag} avatar`)
    .setDescription(`[(**256**)](${avatar}) [(**512**)](${avatar3}) [(**1024**)](${avatar2}) [(**2048**)](${avatar1})`)
    .setColor(0x1d1d1d)
    .setImage(avatar1)
    
    return message.channel.send(embed);

}
module.exports.config = {
    name: "avatar",
    description: "To display your/someone\`s avatar",
    usage: "avatar <@mention>/userID",
    Permissions: "PUBLIC_USAGE",
    aliases: []
}