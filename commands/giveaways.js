const Discord = require("discord.js")
const botsettings = require("../botsettings.json");
const { MessageEmbed } = require("discord.js");
const { GiveawaysManager } = require('discord-giveaways');
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You are not allowed to start giveaways');

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send('Please provide a channel');

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Pleae provide a valid duration');

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send('Ok then, I\'ll give away nothing');

    bot.giveawaysManager.start(message.channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(args[2]),
        hostedBy: message.author ,

        messages: {
            giveaway: "**GIVEAWAY** ",
            giveawayEnded: "**GIVEAWAY ENDED** ",
            timeRemaining: "Time remaining: **{duration}**",
            inviteToParticipate: "React with 🎉 to enter",
            winMessage: "Congrats {winners}, you won **{prize}**",
            embedFooter: "Giveaway time!",
            noWinner: "Couldn't determine a winner",
            hostedBy: "Hosted by {user}",
            winners: "winner(s)",
            endedAt: "Ends at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
        
    })

    message.channel.send(`Giveaway starting in ${channel}`);
















}
module.exports.config = {
    name: "giveaway",
    description: "Giveaway A prize in your server",
    usage: "giveaway [#channel] <Time> <number of winners> (the prize)",
    accessableby: "MANAGE_MESSAGES",
    aliases: []
}