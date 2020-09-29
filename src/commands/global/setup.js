module.exports.run = (client, message, args) => {
    const list = `**Konfiguracja**\n\n\`${message.guild.prefix}channel\` - ustaw kanał czatu globalnego\n\n**Uprawnienia**\n\nDla bota na kanale od czatu globalnego:\nWysyłanie wiadomości, Zarządzanie wiadomościami, Zarządzanie uprawnieniami, Zarządzanie webhookami\n\nDla \\@everyone:\nWysyłanie emoji z innych serwerów\n\n**Wymagania**\n\nWymagania: 200os. na serwerze`
    return { msg: list}
}

module.exports.use = ["setup"]