const i18n = require('i18n')
module.exports = {
    name: ['changenamegroup', 'cngc'],
    tags: "admin",
    description: i18n.__('group.cngc.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw i18n.__("failed.textNotIncluded")
        try {
            subject = await conn.groupUpdateSubject(m.chat, text)
            conn.reply(m.chat, "Successfully change the group name.", m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}