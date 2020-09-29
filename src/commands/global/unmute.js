const mutes = require('../../db/models/mutes.js')

module.exports.run = async (client, message, args) => {
    if(!client.staff.includes(message.author.id)) return
    const um = await mutes.deleteMany({id: args[0]})
    let m = []
    client.gmutes.forEach(m => {
        if(m==args[0]) return
        m.push(m)
    })
    client.gmutes = m
    return { msg: `Usunięto ${um.deletedCount} elementów` }
}

module.exports.use = ["unmute", "um"]