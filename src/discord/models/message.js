const {MessageEmbed} = require('discord.js')
module.exports = (res) => {
    let embed = new MessageEmbed()
    if(res.msg) embed.setDescription(res.msg)
    if(res.data) {
        if(res.data.author) embed.setAuthor(res.data.author.tag, res.data.author.avatar)
        if(res.data.title) embed.setTitle(res.data.title)
        if(res.data.description) embed.setDescription(res.data.description)
        if(res.data.image) embed.setImage(res.data.image)
    }
    return embed
}