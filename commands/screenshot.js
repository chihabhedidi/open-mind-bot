const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Guild =require('../models/guild');
module.exports.run = async (bot, message, args) => {
    let settings = await Guild.findOne({
        guildID: message.guild.id
    })
    if(settings.prefix === null ) settings.prefix = botsettings.default_prefix;
    var search = args.slice(1).join(" ").trim();
    (async () => {
        if(args[0].toLowerCase().includes("porn")){
            return message.channel.send(`We dont do that here`);
        }
        if(search){
        switch(args[0]){
            case "google":
			case "g":
				args[0]=`https://www.google.com/search?q=${encodeURIComponent(search)}`;
                break;
                case "bing":
                    case "b":
                        args[0]=`https://www.bing.com/search?q=${encodeURIComponent(search)}`;
                        break;
                    case "youtube":
                    case "yt":
                        args[0]=`https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`;
                        break;
                    case "ebay":
                    case "e":
                        args[0]=`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(search)}`;
                        break;
                    case "amazon":
                    case "a":
                        args[0]=`https://www.amazon.com/s?k=${encodeURIComponent(search)}`;
                        break;
                    case "duckduckgo":
                    case "ddg":
                        args[0]=`https://duckduckgo.com/?q=${encodeURIComponent(search)}`;
                        break;
                    case "yahoo":
                    case "y":
                        args[0]=`https://search.yahoo.com/search?p=${encodeURIComponent(search)}`;
                        break;
                    case "wikipedia":
                    case "w":
                        args[0]=`https://en.wikipedia.org/w/index.php?title=Special:Search&search=${encodeURIComponent(search)}`;
                        break;
                
        }
      
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${args[0]}`);
        await page.setViewport({width: 1440, height: 900});
        var screenshot = await page.screenshot({type: 'png'});
        return message.channel.send({files:[{ attachment: screenshot, name: "screenshot.png" }]});}
      

        try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        if(args[0].startsWith("http://") || args[0].startsWith("https://")) ;
        else args[0] = `https://${args[0]}`
        await page.goto(`${args[0]}`);
        await page.setViewport({width: 1440, height: 900});
        var screenshot = await page.screenshot({type: 'png'});
        message.channel.send({files:[{ attachment: screenshot, name: "screenshot.png" }]});
        }catch(error) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Invalid URL`)
    .setDescription(`\`Usage:\`
    \`${settings.prefix}ss (URL link)\`
    <:google:751812471102111754> **Google search:**\`${settings.prefix}ss g\` <:google:751812471102111754>
    <:Amazon:751812459794268210> **Amazon search:**\`${settings.prefix}ss a\` <:Amazon:751812459794268210>
    <:bing:751812457130885130> **Bing search:**\`${settings.prefix}ss b\` <:bing:751812457130885130>
    <:ebay:751812474323337286> **Ebay search:**\`${settings.prefix}ss e\` <:ebay:751812474323337286>
    <:duckduckgo:751812477611933787> **Duckduckgo search:**\`${settings.prefix}ss ddg\` <:duckduckgo:751812477611933787>
    <:youtube:751812472914051182> **Youtube search:**\`${settings.prefix}ss yt\` <:youtube:751812472914051182>
    <:wikipedia:751812479499239424> **Wikipedia search:**\`${settings.prefix}ss w\` <:wikipedia:751812479499239424>
    <:yahoo:751812480753336401> **Yahoo search:**\`${settings.prefix}ss y\` <:yahoo:751812480753336401>`)
    .setColor(0x1d1d1d)

    return message.channel.send(embed);
            
    }
        await browser.close();
      })();

}
module.exports.config = {
    name: "screenshot",
    description: "Display a specific Website",
    usage: "screenshot",
    accessableby: "PUBLIC_USAGE",
    aliases: ["ss"]
}