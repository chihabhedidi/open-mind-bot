const Discord = require("discord.js")

module.exports = bot => { 
    console.log('your bot is on!');
 bot.user.setActivity('m!help', { type: 'WATCHING' });
}