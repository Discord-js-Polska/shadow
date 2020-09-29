const { Collection } = require("mongoose")

const disable = ["discord.gg/", "discordapp.com/invite/", "discord.com/invite/"]

module.exports = (client) => {
    client.on('message', (message) => {

        if(message.author.bot) return
        if(!client.gchannels.includes(message.channel.id)) return

        if(client.gmutes.includes(message.author.id)) {
            message.channel.updateOverwrite(message.member, { SEND_MESSAGES: false })
            message.delete()
            return
        }

        let blocked = false
        disable.forEach(dis => {
            if(!message.content.includes(dis)) return
            blocked = true
        })

        if(blocked) {
            message.channel.updateOverwrite(message.member, { SEND_MESSAGES: false })
            message.delete()
            return setTimeout(() => {
                message.channel.updateOverwrite(message.member, { SEND_MESSAGES: true })

            }, 10 * 1000)
        }

        if(client.staff.includes(message.author.id)) {
            message.author.gid = "Moderator"
        } else {
            message.author.gid = message.author.id
        }

        client.webhooksclients.forEach(w => {
            if(w.channelID==message.channel.id) return
            if(!message.content) return
            try {
                w.send(`${message.content}`, {
                    "allowedMentions": { "users" : [] },
                    "username": `${message.author.tag} (${message.author.gid})`,
                    "avatarURL": `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`
                })
            } catch(err) {
                console.log(err)
            }

        })

        message.attachments.forEach(at => {
            client.webhooksclients.forEach(w => {
                if(w.channelID==message.channel.id) return
                try {
                    w.send({
                        "content" : at.attachment,
                        "allowedMentions": { "users" : [] },
                        "username": `${message.author.tag} (${message.author.gid})`,
                        "avatarURL": `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`
                    })
                } catch(err) {
                    console.log(err)
                }
            })
        })
    })
}