require('./config.js')
const simpleChatUpdate = require('./lib/simpleChatUpdate')
const { MessageType } = require('@adiwajshing/baileys')
const util = require('util')
module.exports = {
    async handler(chatUpdate) {
        if (!chatUpdate.hasNewMessage) return
        if (!chatUpdate.messages && !chatUpdate.count) return
        let m = chatUpdate.messages.all()[0]
        try {
            simpleChatUpdate.chatUpdate(conn, m)
            try {
                let isROwner = conn.user.jid.includes(m.sender)
                let groupMetadata = m.isGroup ? conn.chats.get(m.chat).metadata || await conn.groupMetadata(m.chat) : {} || {}
                let participants = m.isGroup ? groupMetadata.participants : [] || []
                let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} 
                let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} 
                let isAdmin = user.isAdmin || user.isSuperAdmin || false 
                let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false 
                for (let file in global.commands) {
                    let commands = global.commands[file]
                    if (typeof m.text !== 'string') return
                    let usedPrefix
                    let _prefix = commands.customPrefix ? commands.customPrefix : conn.prefix ? conn.prefix : global.prefix
                    if ((usedPrefix = _prefix)) {
                        let text = m.text.startsWith(global.prefix) ? m.text : ''
                        let commandName = text.slice(global.prefix.length).trim().split(/ +/).shift().toLowerCase()
                        let args = text.trim().split(/ +/).slice(1)
                        let isAccept = typeof commands.name === 'string' ? commands.name === commandName : false
                        if (!isAccept) continue
                        if (commands.owner && !isROwner) {
                            conn.sendMessage(m.chat, global.msgFail.owner, MessageType.text, { quoted: m })
                            continue
                        }
                        if (commands.admin && !isAdmin) {
                            conn.sendMessage(m.chat, global.msgFail.notAdmin, MessageType.text, { quoted: m });
                            continue;
                        }
                        if (commands.botAdmin && !isBotAdmin) {
                            conn.sendMessage(m.chat, global.msgFail.notBotAdmin, MessageType.text, { quoted: m });
                            continue;
                        }
                        m.isCommand = true
                        m.command = commandName
                        let extra = {
                            usedPrefix,
                            text,
                            args,
                            commandName,
                            conn: this,
                            participants,
                            groupMetadata,
                            user,
                            bot,
                            isROwner,
                            isAdmin,
                            isBotAdmin,
                            chatUpdate
                        }
                        try {
                            await commands.run.call(this, m, extra)
                        } catch (e) {
                            conn.sendMessage(m.chat, util.format(e), MessageType.text, { quoted: m })
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
        try {
            require('./lib/messageLog')(this, m)
        } catch (e) {
            console.log(m, e)
        }
    }
}

global.msgFail = {
    owner: "[ ❗ ] This command can only used by the owner!",
    notAdmin: "[ ❗ ] This command can only used by the administrator group!",
    notBotAdmin: "[ ❗ ] Please promote this bot as administrator group for using this command!",
    notMentioned: "[ ❗ ] Tag the user that you wanna kick"
}

global.msgBot = {
    wait: "[ ⌛ ] *_Loading, please wait..._*",
    afterAdmin: "[ ❗ ] INFO : Please don't use admin command too frequently, because can lead bot number to be banned.",
    support: `[ 💬 ] Thank you for using this bot, considering you can donate us on *${global.prefix}donate*`
}