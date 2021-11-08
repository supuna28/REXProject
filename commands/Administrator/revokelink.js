const i18n = require('i18n')
module.exports = {
    name: ["revokelink", 'resetlinkgc'],
    tags: "admin",
    description: i18n.__('group.revokelink.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        try {
            const res = await conn.revokeInvite(m.chat)
            conn.reply(m.chat, `Successfully reset the group link, the code is:\n${res.code}`, m)
        } catch (e) {
            return conn.reply(m.chat, i18n.__("failed.error"), m)
        }
    }
}