const client = require('../models/client.js')
const fs = require('fs')

fs.readdir('./src/modules/', (err, files) => {
    console.log(files)
    files.forEach(file => {
        require(`../../modules/${file}`)(client)
    })
})