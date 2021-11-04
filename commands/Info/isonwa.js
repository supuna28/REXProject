module.exports = {
    name: 'isonwa',
    async run(m, { conn, text }) {
        if (isNaN(text)) throw 'Please fill a number not a string!'
        let result = await conn.isOnWhatsApp(text)
        if (result) {
            conn.reply(m.chat, `${text} exists on WhatsApp, sending the contact...`)
        } else {
            return conn.reply(m.chat, `${text} is not on WhatsApp.`)
        }
    }
}