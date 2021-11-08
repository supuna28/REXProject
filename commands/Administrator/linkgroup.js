const i18n = require('i18n')
module.exports = {
    name: ['linkgroup', 'linkgc'],
    tags: "admin",
    description: i18n.__('group.linkgc.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        try {
            const code = await conn.groupInviteCode(m.chat)
            conn.reply(m.chat, `Here's your group link invite:\nhttps://chat.whatsapp.com/${code}`, m)
        } catch (e) {
            return conn.reply(m.chat, i18n.__("failed.error"), m)
        }
    }
}