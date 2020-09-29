const channels = require('../../db/models/channels.js')

module.exports.run = async (client, message, args) => {

    const channel = message.mentions.channels.first()

    if((!channel)||(channel.guild.id!=message.guild.id)) return { msg: "Musisz jako 2 argument dać wzmiankę kanału" }

    //if(message.guild.members.cache.filter(m => !m.bot).size < 200) return { msg: "Ten serwer nie posiada wymaganych 200 osób" }

    const perms = ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENAGE_WEBHOOKS']

    let t = true
    perms.forEach(p => {
        if(!channel.permissionsFor(message.guild.me).has(p)){
            t = false
            console.log(p)
        }
    })

    if(!t) return { msg: "Źle skonfigurowane permisjie dla <@752514883316219914>", data: { image: "https://cdn.discordapp.com/attachments/756814139141259404/757334364895051816/unknown.png" } }

    if(!channel.permissionsFor(message.guild.roles.everyone).has('USE_EXTERNAL_EMOJIS')) return { msg: "Źle skonfikgurowane uprawnienia dla @everyone", data: { image: "https://cdn.discordapp.com/attachments/756814139141259404/757330843185447132/unknown.png" } }

    const ch = channels.find({guild: message.guild.id})

    if(!ch[0]) {
        await channels.insertMany([{ guild: message.guild.id, id: channel.id }])
        const webhooks = await channel.fetchWebhooks()
        client.gchannels.push(channel.id)
        if(!webhooks.first()) return
        client.webhooksclients.set(channel.id, webhooks.first())
    } else {
        await channels.update({ guild: message.guild.id }, { channel: channel.id })
        const webhooks = await channel.fetchWebhooks()
        client.gchannels.push(channel.id)
        if(!webhooks.first()) return
        client.webhooksclients.set(channel.id, webhooks.first())
    }

    return { msg: "Ustawiono kanał czatu globalnego" }

}

module.exports.use = ["channel", "kanał"]
module.exports.perms = ["ADMINISTRATOR"]