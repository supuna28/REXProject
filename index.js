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
const { greenBright } = require('chalk')
const yargs = require('yargs/yargs')
require('./lib/i18n')

// Slogan when initializing the bot
CFonts.say('REXProject', {
    font: 'block',
    align: "center",
    colors: ["cyanBright", "blue"]
})

CFonts.say('REXProject by rthelolchex', {
    font: 'console',
    align: "center",
    colors: ['cyanBright']
})

// Thanks to Nurutomo for database JSON
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.DATABASE = new (require('./lib/database'))(`${opts._[0] ? opts._[0] + '_' : ''}database.json`, null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
    users: {},
    groups: {},
    chats: {},
    stats: {},
  }
  if (!global.DATABASE.data.groups) global.DATABASE.data.groups = {}
  if (!global.DATABASE.data.chats) global.DATABASE.data.chats = {}
  if (!global.DATABASE.data.stats) global.DATABASE.data.stats = {}

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
        success("2", "Your bot is ready!")
        // startspin("2", "Waiting for new messages")
    })
    conn.on('close', DisconnectReason => {
        console.log(`[ ! ] Disconnected, reason ${DisconnectReason.reason}, reconnecting...`)
        conn.isReconnecting = DisconnectReason.isReconnecting
    })
    conn.handler = chatHandler.handler
    conn.on('chat-update', conn.handler)
    conn.connect().then(async () => {
        if (!global.DATABASE.data) await loadDB()
        fs.writeFileSync(authinfo, JSON.stringify(conn.base64EncodedAuthInfo()), null, '\t')
    })
    async function loadDB() {
        global.DATABASE.data = {
            users: {},
            chats: {},
            stats: {},
            msgs: {},
            sticker: {},
        }
        await global.DATABASE.save()
    }
}

async function start() {
    // Initialize commands
    global.commands = {}
    for (let commands of glob.sync('./commands/**/*.js')) {
        delete require.cache[commands]
        global.commands[commands] = require(commands)
    }
    console.log(greenBright(`Loaded ${Object.keys(global.commands).length} commands.`))
    InitializeWA();
    setInterval(async () => {
        await global.DATABASE.save()
    }, 60 * 1000)
}

process.on('exit', () => global.DATABASE.save())

start()