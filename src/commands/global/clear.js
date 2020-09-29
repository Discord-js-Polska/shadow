module.exports.run = (client, message, args) => {

    if(!client.staff.includes(message.author.id)) return

    if(!args[0]) return { msg: "Musisz podać ilość wiadomośći do wyczyszczenia" }

    if(!((typeof Number(args[0]))=="number")) return { msg: "Pierwszym argumentem musi być liczba" }

    client.gchannels.forEach(ch => {
        const channel = client.channels.cache.get(ch)
        if(!channel) return
        channel.bulkDelete(Number(args[0]))
    })

    return { msg: "Wyczyszczono wiadomości" }

}

module.exports.use = ["clear", "purge"]