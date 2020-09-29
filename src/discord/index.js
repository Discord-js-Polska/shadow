module.exports = {
    connection: {
        login: require('./connection/login.js')
    },
    models: {
        client: require('./models/client.js'),
        message: require('./models/message.js')
    },
    handlers: {
        commands: require('./handlers/command.handler.js'),
        modules: require('./handlers/module.handler.js')
    }
}