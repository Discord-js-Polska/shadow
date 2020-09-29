const mongoose = require("mongoose")

const { URL } = require('../../config/data.js')

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})