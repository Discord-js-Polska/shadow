const mongoose = require('mongoose')

const mutesSchema = new mongoose.Schema({

    id: {
        type: "string",
        required: true,
    },

    ts: {
        type: "date",
    },

    reson: {
        type: "string",
        required: false,
    }
    
})

const model = mongoose.model('mutes', mutesSchema)

module.exports = model