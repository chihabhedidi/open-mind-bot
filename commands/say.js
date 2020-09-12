const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    const message1=args.join(" ");
    message.delete().catch(err=>console.log(err));
    if(message1.toLowerCase().includes("token")){
        return message.channel.send(`<:noice:749960391869857822>`);
    }if(message1.toLowerCase().includes("@everyone")){
        return message.channel.send(`am not allowed to mention everyone`);
    }if(message1.toLowerCase().includes("@here")){
        return message.channel.send(`am not allowed to mention everyone`);
    }
    message.channel.send(`${message1}`);
}
module.exports.config = {
    name: "say",
    description: "Says a message inputted",
    usage: "say (message)",
    accessableby: "PUBLIC_USAGE",
    aliases: []
}
