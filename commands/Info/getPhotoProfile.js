const { MessageType } = require("@adiwajshing/baileys")

module.exports = {
    name: ['getphotoprofile', 'getpp'],
    async run(m, { conn, text }) {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        try {
            let pp = await conn.getProfilePicture(who)
            conn.sendFile(m.chat, pp, 'pp.jpg', "Fetched the profile picture.", m, false)
        } catch (e) {
            console.log(e)
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}