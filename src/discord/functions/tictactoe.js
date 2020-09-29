const embedgen = require('../models/message.js')

const embed = (msg) => {
    return  embedgen({ msg: msg })
}

const ch = (w) => {
    if(w == "") w = ":black_medium_square:"
    if(w == "o") w = ":o:"
    if(w == "x") w = ":x:"
    return w
}

const equal = (list) => {
    let results = true
    list.forEach(l=>{
        list.forEach(l1=> {
            if(l1!=l) results = false
        })
    })
    return results
}

const checkwin = (game) => {
    
    let status = null

    let r = true

    for (let i = 0; i < 3; i++) {
        if(game[i].includes("")) r = false
    }

    if(r) status = "="

    for (let i = 0; i < 3; i++) {
        if(game[i]!="") {
            if(equal([ game[i][0], game[i][1], game[i][2] ])) {
                status = game[i][0]
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if(game[0][i]!="") {
            if(equal([ game[0][i], game[1][i], game[2][i] ])) {
                status = game[0][i]
            }
        }
    }

    if(game[1][1]!="") {
        if(equal([ game[0][0], game[1][1], game[2][2] ])) status = game[0][0]
        if(equal([ game[2][0], game[1][1], game[0][2] ])) status = game[1][1]
    }

    return status

}

const render = (game) => {
    let rendered = ""
    game.forEach(g => {
        rendered = rendered + `${ch(g[0])} ${ch(g[1])} ${ch(g[2])}\n`
    })
    return rendered
}

const collect = async (player, game, msg, nextplayer, p1) => {

    const wn = checkwin(game)

    if(wn) {
        if(wn=="=") {
            msg.edit(embed(`Koniec gry\n${render(game)}`))
            msg.channel.send(embed(`Remis <@${player.id}>/<@${nextplayer.id}>`))
        } else if(wn=="o") {
            msg.edit(embed(`Koniec gry\n${render(game)}`))
            msg.channel.send(embed(`Wygrywa <@${p1.id}>`))
        } else {
            msg.edit(embed(`Koniec gry\n${render(game)}`))
            if(p1.id==player.id) {
                msg.channel.send(embed(`Wygrywa <@${nextplayer.id}>`))
            } else {
                msg.channel.send(embed(`Wygrywa <@${player.id}>`))
            }
            
        }
        return
    }

    msg.edit(embed(`Ruch użytkownika <@${player.id}>\n${render(game)}`))

    const filter = m => m.author.id == player.id

    msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
        .then(async collected => {

            collected.first().delete()
            const mcontent = collected.first().content

            if((mcontent.length != 2) || (!(mcontent.startsWith("a")||(mcontent.startsWith("b"))||(mcontent.startsWith("c")))) || (!((mcontent.endsWith("1"))||(mcontent.endsWith("2"))||(mcontent.endsWith("3"))))) {

                const m = await collected.first().reply('wpisz pozycję (np. a1, b3, c2)')
                setTimeout(() => m.delete(), 1000)
                return collect(player, game, msg, nextplayer, p1)

            } else {

                let nr = ""

                if(mcontent.startsWith("a")) nr = 0
                if(mcontent.startsWith("b")) nr = 1
                if(mcontent.startsWith("c")) nr = 2

                if(game[nr][Number(mcontent.substr(1)) - 1] != "") {
                    const m = await collected.first().reply('te pole jest już zajęte')
                    setTimeout(() => m.delete(), 1000)
                    return collect(player, game, msg, nextplayer, p1)
                }

                console.log(p1)

                if(p1.id==player.id) {
                    game[nr][Number(mcontent.substr(1)) - 1] = "o"
                } else {
                    game[nr][Number(mcontent.substr(1)) - 1] = "x"
                }

                collect(nextplayer, game, msg, player, p1)

            }
        })
        .catch(collected => {
            console.log(collected)
            msg.edit(embed(`Minął czas na ruszenie się gracza <@${player.id}>, automatycznie wygrywa <@${nextplayer.id}>`))
        })

}

module.exports = {
    collect: collect,
    ch: ch,
    equal: equal,
    checkwin: checkwin,
    embed: embed
}