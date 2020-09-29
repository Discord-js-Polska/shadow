const {MessageEmbed} = require('discord.js')

const imgs = [
    'https://cdn.discordapp.com/attachments/755796983813505104/756980179032735784/s0.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980181943451769/s1.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980184867143741/s2.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980187526070312/s3.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980191615778917/s4.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980197382946926/s5.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980199224115251/s6.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980203997364254/s7.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980208124297227/s8.jpg',
    'https://cdn.discordapp.com/attachments/755796983813505104/756980212213743616/s9.jpg',

]

const passwords = ["DISCORD", "KONIEC", "NIC"]

const render = (game) => {
    const embed = new MessageEmbed()
        .setTitle(`\` ${game.pwd}\``)
        .setImage(imgs[game.inc.length + game.incp.length])
        .addFields([
            {name: "Nietrafione litery", value: `** **${game.inc.join(", ")}`, inline: true},
            {name: "Nietrafione hasła", value: `** **${game.incp.join(", ")}`, inline: true},
            {name: "Wykorzystane szanse", value: `** **${game.inc.length + game.incp.length}/9`, inline: true},
        ])
    return embed
}

const collect = (game, msg) => {

    msg.edit(render(game))
    
    const filter = m => game.players.includes(m.author.id)
        
    msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })

        .then(collected => {

            

        })

        .catch(collected => {

            msg.edit(embed('Minął czas na dołączenie do gry'))

        });

}

module.exports.run = async (client, message, args) => {

    const password = passwords[Math.floor((Math.random() * (passwords.length - 1)))]

    const players = message.mentions.users.map(u=>u.id).push(message.author.id)

    console.log(players)

    if(players.length>20) {
        return { msg: "Maksymalna ilość graczy to 20" }
    }

    const game = {
        pas: password,
        pwd: "_ ".repeat(password.length),
        inc: [],
        incp: [],
        players: players
    }

    const msg = await message.channel.send(render(game))

    collect(game, msg)

}

module.exports.use = ["hangman"]