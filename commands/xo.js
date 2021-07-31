const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    if(message.author.bot)return;
   
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
    winningConditions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

    const member = message.mentions.users.first();
    if(!member)return message.reply("**Mention someone to play with him..**");
    if(member.bot)return message.reply("**Bots cant play this game**");
    if(member.id==message.author.id)return message.reply("**Dont mention your self**");
    
        
    var message_content = "1️⃣ 2️⃣ 3️⃣\n4️⃣ 5️⃣ 6️⃣\n7️⃣ 8️⃣ 9️⃣",
        msg = await message.channel.send('**Loading ...** Wait for the reactions '),
        game_state = ["", "", "", "", "", "", "", "", ""],
        collected = [],
        ActivePlayer = message.author.id;
    try { for (let emoji of emojis) await msg.react(emoji); } finally {msg.edit(message_content);} 
    const msg_two = await message.channel.send(`${message.author}`);
    const collector = msg.createReactionCollector((reaction, user) => {return emojis.includes(reaction.emoji.name) && (user.id == message.author.id || user.id == member.id);}, { time: 60 * 1000 * 5 }); // ييراكب الرياكشن اللي بيتحط علي الرسالة
    collector.on('collect', (reaction, user) => {
    reaction.users.remove(user).catch(console.error);
    if(ActivePlayer !== user.id)return;
    if(collected.find(x=> x == reaction.emoji.name))return;
    else collected.push(reaction.emoji.name);
    message_content = message_content.replace(new RegExp(reaction.emoji.name ,"g"), user.id == message.author.id ? "🇽" : "🅾️");
    msg.edit(message_content);
    ActivePlayer = ActivePlayer == message.author.id ? member.id : message.author.id; 
    msg_two.edit(`**<@${ActivePlayer}>**`);
    game_state[emojis.indexOf(reaction.emoji.name)] = user.id;
    if(ChackWiner(game_state))return msg_two.edit(`**<@${user.id}> is winner!!**`).then(()=> collector.stop()); 
    if(game_state.filter(x=> x == "").length == 0 )return msg_two.edit(`**No Winner!**`).then(()=> collector.stop());
    }).on("end",()=> msg.delete({timeout: 5000}).catch(()=> {}));
    
    function ChackWiner(score){
        for (let i = 0; i < winningConditions.length; i++) {
                let a = score[winningConditions[i][0]];
                let b = score[winningConditions[i][1]];
                let c = score[winningConditions[i][2]];
                if (a === '' || b === '' || c === '')continue;
                if (a === b && b === c) return true;
        }
        return false;
        }
    }

module.exports.config = {
    name: "xo",
    description: "tictactoe game",
    usage: "xo <@mention>",
    Permissions: "PUBLIC_USAGE",
    aliases: []
}


















