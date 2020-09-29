const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
    
    prefix: {
        type: "string",
        required: true
    },

    id: {
        type: "string",
        required: true,
        unique: true
    }

})

const model = mongoose.model('prefix', prefixSchema)

module.exports = model