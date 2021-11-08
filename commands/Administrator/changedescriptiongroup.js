const i18n = require('i18n')
module.exports = {
    name: ['changedescriptiongroup', 'cdgc'],
    tags: "admin",
    description: i18n.__('group.changedesc.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw i18n.__("failed.textNotIncluded")
        try {
            subject = await conn.groupUpdateDescription(m.chat, text)
            conn.reply(m.chat, "Successfully change the group description.", m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}