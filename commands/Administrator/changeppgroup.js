const fs = require('fs')
const i18n = require('i18n')
module.exports = {
    name: ['changeppgc'],
    tags: "admin",
    description: i18n.__('group.cppgc.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        let isImage = (m.type === 'imageMessage' || m.quoted)
        if (!isImage) throw i18n.__('group.notquotedpp')
        let quoted = m.quoted ? m.quoted : m
        let media = await quoted.download('./tmp/img')
        try {
            pp = await conn.updateProfilePicture(m.chat, media)
            if (pp) {
                conn.reply(m.chat, global.msgBot[global.language].done, m)
                fs.unlinkSync(media)
            }
        } catch (e) {
            conn.reply(m.chat, global.msgFail[global.language].failed)
            fs.unlinkSync(media)
        }
    }
}