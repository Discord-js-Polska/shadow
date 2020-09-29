const { Collection } = require("discord.js")
const channels = require('../db/models/channels.js')
const mutes = require('../db/models/mutes.js')
module.exports = async (client) => {

    client.webhooksclients = new Collection()
    client.gchannels = (await channels.find({})).map(ch => ch.id)
    client.gmutes = (await mutes.find({})).map(m => m.id)

    client.staff = ["692717587532087376"]

    client.gchannels.forEach(async channel => {
        const ch = client.channels.cache.get(channel)
        if(!ch) return
        try {
            const webhooks = await ch.fetchWebhooks()
            if(!webhooks.first()) return
            client.webhooksclients.set(channel, webhooks.first())
        } catch(err) {
            console.log(err)
        }
    })

}