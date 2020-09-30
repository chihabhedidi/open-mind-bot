const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**You need \`MANAGE_MESSAGES\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
     if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
      const embed = new Discord.MessageEmbed()
     .setDescription (`**The bot needs \`MANAGE_MESSAGES\` permission do use this command**`)
     .setColor('#ff5e5e')
     return message.channel.send(embed)}
    if(!args[0]) return message.channel.send('No giveaway ID provided');

    let giveaway = bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway) return message.channel.send('Couldn\'t find a giveaway with that ID/name');

    bot.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway rerolled')
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)){
            message.channel.send('This giveaway hasn\'t ended yet')
        } else {
            console.error(e);
            message.channel.send('An error occured')
        }
    })





}

module.exports.config = {
    name: "rerole",
    description: "Rerole To pick another winner",
    usage: "rerole [giveaway message id]",
    Permissions: "MANAGE_MESSAGES",
    aliases: []
}