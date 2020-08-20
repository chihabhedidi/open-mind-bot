const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    const subReddits = ["meme", "me_irl", "dankmeme","wholesomememes","memes","MinecraftMemes"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
    .setImage(img)
    .setTitle(`From /r/${random}`)
    .setURL(`http://reddit.com/${random}`)

    message.channel.send(embed);

}

module.exports.config = {
    name: "meme",
    description: "Send random meme",
    usage: "meme",
    accessableby: "Public Usage",
    aliases: []
}