const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {
    bot.once("ready", function() {reqEvent("ready") (bot) });
    
 }