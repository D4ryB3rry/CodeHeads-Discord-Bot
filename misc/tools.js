const discord = require("discord.js");

module.exports = {
    send_embed: function(data, message){
        var embed = new discord.RichEmbed(data);
        message.channel.send(embed)
    },
}