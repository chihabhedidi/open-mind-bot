const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    let user;
  
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }
    
    let avatar = user.displayAvatarURL({size: 256, dynamic: true});
    let avatar1 = user.displayAvatarURL({size: 2048, dynamic: true});
    let avatar2 = user.displayAvatarURL({size: 1024, dynamic: true});
    let avatar3 = user.displayAvatarURL({size: 512, dynamic: true});
    
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`${user.tag} avatar`)
    .setDescription(`[(**256**)](${avatar}) [(**512**)](${avatar3}) [(**1024**)](${avatar2}) [(**2048**)](${avatar1})`)
    .setColor(0x1d1d1d)
    .setImage(avatar1)
    
    return message.channel.send(embed);

}
module.exports.config = {
    name: "avatar",
    description: "To display your/someone\`s avatar",
    usage: "avatar <@mention>/userID",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}