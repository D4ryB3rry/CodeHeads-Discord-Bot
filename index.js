const discord = require("discord.js");
const fs = require("fs");

const tools = require("./misc/tools.js")

const discordcreds = JSON.parse(fs.readFileSync('configs/discordcreds.json', 'utf-8'))
const configGeneral = JSON.parse(fs.readFileSync('configs/general.json', 'utf-8'))
const standards = JSON.parse(fs.readFileSync('configs/standards.json', 'utf-8'))
const channels = JSON.parse(fs.readFileSync('configs/channels.json', 'utf-8'))

const token = discordcreds.token
const prefix = configGeneral.prefix

var bot = new discord.Client();

bot.on("ready", function() {
    bot.user.setPresence({
        game: {
          name: '$help',
          type: 'WATCHING'
        },
        status: 'online'
      }).catch(console.error);

    console.log("Bot is ready")
  });

bot.on("message", async function(message){
    if (message.author == bot.user) {
        return;
      }

    msg = message.content.toLowerCase().substring(prefix.length);
    args = message.content.substring(prefix.length).split(" ");
    argsStr = message.content.substring(prefix.length).substring(msg.indexOf(" ") + 1);

    if (message.content.toLowerCase() == "lol"){
            message.channel.send('rofl')
            return;
    }

    if (message.content.toLowerCase() == "rofl"){
        message.channel.send('lol')
        return;
    }

    if(message.mentions.members.array().length >= 1){
        for(member in message.mentions.members.array()){
            if(message.mentions.members.array()[member].user == bot.user){
                message.reply(' Help Placeholder')
            }
        }
        
    }

    switch (args[0]) {
        case "ping":
            message.channel.send("Der Pong liegt bei " + Math.round(bot.ping) + "ms")
            break;
        case "info":
            tools.send_embed({
                color: 0xffee00,
                fields: [
                    {
                        name: 'Info',
                        value: `CodeHeads Bot Version 0.0.1`
                    },
                    {
                        name: 'Statistics',
                        value: `The Statistics feature is not yet implemented`
                    }
                ]
            }, message)
            break;
        case "ban":
            if(message.mentions.members.array()[0]){
                let member = message.mentions.members.array()[0];
            }else{
                message.channel.send("Ich konnte diesen User nicht finden!");
                return
            }
            //if(!args[2]) return message.channel.send("Bitte den Grund mit nennen.");

            tempArray = args
            tempArray.shift().shift()
            let bReason = tempArray.join(" ")

            //if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Dazu bist du nicht berechtigt");
            //if(user.hasPermission("BAN_MEMBERS")) return message.channel.send("Diesen User kann ich nicht bannen!");
            //message.guild.member(user).ban(bReason); 

            //let reportChannel = bot.channels.get(channels.reports)
            //reportChannel.send('hi')
            tools.send_embed({
                color: 0xff1133,
                description: '~Ban~',
                fields: [
                    {
                        name: 'Banned User:',
                        value: `{member.user.username} mit ID: {member.user.id}`
                    },
                    {
                        name: 'Banned Von:',
                        value: `<@{message.author.username}> mit ID: {message.author.id}`
                    },
                    {
                        name: 'Banned In:',
                        value: "message.channel.name"
                    },
                    {
                        name: 'Time:',
                        value: "message.createdAt"
                    },
                    {
                        name: 'Reason:',
                        value: "bReason"
                    }
                ]
            }, message)
            break;
    }
});

bot.login(token)

