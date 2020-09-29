module.exports.run = async (client, message, args) => {
    return {msg: `Wpisz \`${message.guild.prefix}setup\` aby włączyć czat globalny\n[Lista komend](https://github.com/shadow-discord/docs/blob/master/shadow.md)\n[Dodaj Bota](https://discord.com/api/oauth2/authorize?client_id=719434143460753488&permissions=607514433&scope=bot)\n[Serwer Support](https://discord.gg/ErZH7yf)\n[Serwer Community](https://discord.gg/gm8ESmF)\n[Shadow Beta](http://34.123.169.53/)`}
}

module.exports.use = ["help", "pomoc"]