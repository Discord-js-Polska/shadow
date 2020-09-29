const { Collection } = require('discord.js')
const { collect, embed } = require('../../discord/functions/tictactoe.js')

module.exports.run = async (client, message, args) => {

    console.log(embed)

    if(!client.games) {
        client.games = new Collection()
    }

    const player = message.mentions.users.first() || message.author

    if(player.id == message.author.id) {

    } else {

        const game = [["", "", ""], ["", "", ""], ["", "", ""]]

        client.games.set(message.channel.id, game)

        let msg = await message.channel.send(embed('Aby dołączyć drugi gracz musi wpisać `accept`'))

        const filter = m => m.content === 'accept' && m.author.id == player.id;
        
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })

            .then(collected => {

                collected.first().delete()
                msg.edit(embed(`Trwa łądowanie gry, <@${collected.first().author.id}> dołączył`))

                collect(player, game, msg, message.author, player)

            })

            .catch(collected => {

                msg.edit(embed('Minął czas na dołączenie do gry'))

            });
    }

    //return { msg: player.id }

}

module.exports.use = ["start"]