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
const path = require("path")
require('./lib/i18n')

// Slogan when initializing the bot
CFonts.say('REXProject', {
    font: 'block',
    align: "center",
})

CFonts.say('REXProject by rthelolchex', {
    font: 'console',
    align: "center",
})

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.owner = require('./users.json').owner
global.premium = require('./users.json').premium

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
        success("2", `${conn.user.name} ready!`)
        // startspin("2", "Waiting for new messages")
    })
    conn.on('close', DisconnectReason => {
        console.log(`[ ! ] Disconnected, reason ${DisconnectReason.reason}, reconnecting...`)
        conn.isReconnecting = DisconnectReason.isReconnecting
    })
    conn.handler = chatHandler.handler
    conn.on('chat-update', conn.handler)
    conn.connect().then(async () => {
      // Initialize database
      global.db = null
      if (!fs.existsSync("./database.json")) {
        database = {
          users: {},
          chats: {},
          stats: {}
        }
        fs.writeFileSync("./database.json", JSON.stringify(database, null, "\t"))
        global.db = require("./database.json")
      } else global.db = require("./database.json")
        fs.writeFileSync(authinfo, JSON.stringify(conn.base64EncodedAuthInfo()), null, '\t')
    })
}

async function start() {
    // Initialize commands
    global.commands = {}
    fs.readdirSync('./commands/').forEach((dir) => {
        let commands = fs.readdirSync(`./commands/${dir}`).filter((files) =>
        files.endsWith(".js")
      );
      for (let file of commands) {
          global.commands[file] = require(`./commands/${dir}/${file}`)
          nocache(`./commands/${dir}/${file}`, module => {
            console.log(`>> Reloading file ${module}.`)
            global.commands[file] = require(`./commands/${dir}/${file}`)
          })
      }
    })
    console.log(Object.keys(global.commands))
    console.log(greenBright(`Loaded ${Object.keys(global.commands).length} commands.`))
    InitializeWA();
    // Saving database every minute
    setInterval(async () => {
      await fs.writeFileSync("./database.json", JSON.stringify(global.db, null, "\t"))
    }, 60 * 1000)
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, call = () => { }) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        call(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module) {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start()

process.on("exit", () => {
  if (global.db) fs.writeFileSync("./database.json", JSON.stringify(global.db, null, "\t"))
})