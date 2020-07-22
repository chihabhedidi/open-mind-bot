const Discord = require("discord.js")
const botsettings = require("../botsettings.json");


const db = require("quick.db")



module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You are not allowed or do not have permission to change prefix")
      }
      if(!args[0]) {
        return message.channel.send("Please give the prefix that you want to set")
      }
      if(args[1]) {
        return message.channel.send("You can not set prefix a double argument")
      }
      if(args[0].length > 3) {
        return message.channel.send("You can not send prefix more than 3 characters")
      }
      if(args.join("") === botsettings.default_prefix) {
        db.delete(`prefix_${message.guild.id}`)
       return await message.channel.send("Reseted Prefix ✅")
      }
      db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(`Seted Bot Prefix to ${args[0]}`)

}
module.exports.config = {
    name: "setprefix",
    description: "change the prefix of the bot",
    usage: "*setprefix",
    accessableby: "Admins",
    aliases: []
}