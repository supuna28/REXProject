console.clear()
console.log("Initializing...")
const { WAConnection: _WAConnection } = require('@adiwajshing/baileys')
const simpleChatUpdate = require('./lib/simpleChatUpdate')
const WAConnection = simpleChatUpdate.WAConnection(_WAConnection)
const fs = require('fs')
const CFonts = require('cfonts')
const glob = require('glob')
const chatHandler = require('./chatHandler')
const { startspin, success, info } = require('./lib/spinner')

// Slogan when initializing the bot
CFonts.say('REXProject', {
    fonts: 'block',
    align: "center",
    colors: ["cyanBright", "blue"]
})

CFonts.say('REXProject by rthelolchex', {
    font: 'console',
    align: "center",
    colors: ['cyanBright']
})

async function InitializeWA() {
    global.conn = new WAConnection()
    let authinfo = './session.data.json'
    conn.logger.level = 'warn'
    if (fs.existsSync(authinfo)) conn.loadAuthInfo(authinfo)
    conn.on('connecting', () => {
        if (conn.isReconnecting === true) {
            startspin("2", "Reconnecting...")
        } else startspin("2", "Trying to connect.")
    })
    conn.on('qr', () => {
        info('2', "Authenticate to continue")
    })
    conn.on('open', () => {
        fs.writeFileSync(authinfo, JSON.stringify(conn.base64EncodedAuthInfo()), null, '\t')
        success("2", "Your bot is ready!")
        //startspin("2", "Waiting for new messages")
    })
    conn.on('close', DisconnectReason => {
        console.log(`[ ! ] Disconnected, reason ${DisconnectReason.reason}, reconnecting...`)
        conn.isReconnecting = DisconnectReason.isReconnecting
    })
    conn.handler = chatHandler.handler
    conn.on('chat-update', conn.handler)
    await conn.connect()
}

async function start() {
    // Initialize commands
    global.commands = {}
    for (let commands of glob.sync('./commands/**/*.js')) {
        delete require.cache[commands]
        global.commands[commands] = require(commands)
    }
    console.log(Object.keys(global.commands))
    InitializeWA();
}

start()