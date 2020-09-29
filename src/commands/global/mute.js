const mutes = require('../../db/models/mutes.js')

module.exports.run = async (client, message, args) => {
    if(!client.staff.includes(message.author.id)) return
    const m = await mutes.insertMany([{id: args[0]}])
    client.gmutes.push(args[0])
    return { msg: `Wstawiono 1 element` }
}

module.exports.use = ["mute", "spallgbt", "m"]