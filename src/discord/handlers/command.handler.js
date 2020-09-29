const client = require('../models/client.js')
const fs = require('fs')
const { Collection, MessageEmbed } = require('discord.js')
const response = require('../models/message')
const prefixes = require('../../db/models/prefix.js')

client.commands = new Collection()

fs.readdir('./src/commands/', (err, folders) => {
    console.log(folders)
    folders.forEach(folder => {
        fs.readdir(`./src/commands/${folder}/`, (err, files) => {
            if(err) return console.log(err)
            files.forEach(file => {
                const command = require(`../../commands/${folder}/${file}`)
                console.log(`${file} ${command.use}`)
                command.use.forEach(cmd => {
                    client.commands.set(cmd, command)
                })
            })
        })
    })

})


client.on('message', async (message) => {

        if(!message.guild) return
        if(message.author.bot) return

        if(!message.guild.prefix) {

            const prefix = await prefixes.find({ id: message.guild.id })

            if(!prefix[0]) {
                message.guild.prefix = "!"
            } else {
                message.guild.prefix = prefix[0].prefix
            }

        }
        
        if(!message.content.toLowerCase().startsWith(message.guild.prefix)) return

        const args = message.content.slice(message.guild.prefix.length).trim().split(/ +/g)

        const command = args.shift().toLowerCase()

        const cmd = client.commands.get(command)

        if(!cmd) return

        if(cmd.perms) {
            
            let perms = true

            cmd.perms.forEach(p => {

                console.log(p)
                if(!message.member.hasPermission(p)) perms = false
            })

            if(!perms) return message.channel.send(response({ msg: "Nie posiadasz wymaganych permisji" }))

        }

    try {  
        const res = await cmd.run(client, message, args)
        if(!res) return
        message.channel.send(response(res))

    } catch (error) {

        console.log(error)

    }
})

module.exports = client.commands
module.exports.config = {run: "require"}