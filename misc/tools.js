const discord = require("discord.js");

module.exports = {
    send_embed: function(data, message, channel){
        var embed = new discord.RichEmbed(data);
        if(channel == undefined || channel == false){
            message.channel.send(embed)
        }else{
            channel.send(embed)
        }
        
    },
}