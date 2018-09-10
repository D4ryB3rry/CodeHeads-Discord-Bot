const discord = require("discord.js");
const fs = require("fs");

const tools = require("./misc/tools.js")

const discordcreds = JSON.parse(fs.readFileSync('configs/discordcreds.json', 'utf-8'))
const configGeneral = JSON.parse(fs.readFileSync('configs/general.json', 'utf-8'))
const standards = JSON.parse(fs.readFileSync('configs/standards.json', 'utf-8'))

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

bot.on("message", function(message){
    if (message.author == bot.user) {
        return;
      }

    msg = message.content.toLowerCase().substring(prefix.length);
    args = message.content.substring(prefix.length).split(" ");
    argsStr = message.content.substring(prefix.length).substring(msg.indexOf(" ") + 1);

    switch (args[0]) {
        case "ping":
            message.channel.send("Der Pong liegt bei " + Math.round(bot.ping) + "ms")
            break;
        case "info":
            tools.send_embed({
                color: standards.embed.colors.general,
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
    }
});

bot.login(token)

