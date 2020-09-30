const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const weather = require('weather-js');

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
      weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) {
             return message.channel.send("Please give the weather location")
          }
          if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');
          var current = result[0].current;
          var location = result[0].location;
  
          const weatherinfo = new Discord.MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather forecast for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(0x111111)
          .addField('Timezone', `UTC${location.timezone}`, true)
          .addField('Degree Type', 'Celsius', true)
          .addField('Temperature', `${current.temperature}°`, true)
          .addField('Wind', current.winddisplay, true)
          .addField('Feels like', `${current.feelslike}°`, true)
          .addField('Humidity', `${current.humidity}%`, true)
  
  
          message.channel.send(weatherinfo)
})
}
module.exports.config = {
    name: "weather",
    description: "To show the weather in a specific location",
    usage: "weather (location)",
    Permissions: "PUBLIC_USAGE",
    aliases: []
}
