const mongoose = require('mongoose')

const channelsSchema = new mongoose.Schema({
    
    id: {
        type: "string",
        required: true
    },

    guild: {
        type: "string"
    }

})

const model = mongoose.model('channels', channelsSchema)

module.exports = model