const mutes = require('../../db/models/mutes.js')

module.exports.run = async (client, message, args) => {
    const m = await mutes.find({id: args[0]})
    return { msg: m }
}

module.exports.use = ["mutestatus"]