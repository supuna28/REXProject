const { MessageType } = require("@adiwajshing/baileys")
const i18n = require('i18n')
module.exports = {
    name: ['getphotoprofile', 'getpp'],
    tags: "tools",
    description: i18n.__('tools.getpp.description'),
    async run(m, { conn, text }) {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        try {
            let pp = await conn.getProfilePicture(who)
            conn.sendFile(m.chat, pp, 'pp.jpg', i18n.__("tools.getpp.done"), m, false)
        } catch (e) {
            console.log(e)
            return conn.reply(m.chat, i18n.__("failed.error"), m)
        }
    }
}