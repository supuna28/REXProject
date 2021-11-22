const i18n = require('i18n')
module.exports = {
    name: 'isonwa',
    tags: "tools",
    description: i18n.__('info.isonwa.description'),
    async run(m, { conn, text }) {
        if (isNaN(text)) throw 'Please fill a number not a string!'
        let result = await conn.isOnWhatsApp(text)
        if (result) {
            conn.reply(m.chat, `${text} exists on WhatsApp, sending the contact...`)
            conn.sendContact(m.chat, text, conn.getName(result.jid))
        } else {
            return conn.reply(m.chat, `${text} is not on WhatsApp.`)
        }
    }
}