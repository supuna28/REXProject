const { MessageType } = require("@adiwajshing/baileys")
const i18n = require('i18n')

module.exports = {
    name: "kick",
    tags: "admin",
    description: i18n.__('group.kick.description'),
    group: true,
    admin: true,
    botAdmin: true,
    owner: false,
    async run(m, { conn, args }) {
        if (!m.mentionedJid[0]) throw i18n.__("failed.notMentioned")
        let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
        let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
        for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupRemove(m.chat, [user])
        conn.sendMessage(m.chat, i18n.__("group.afterAdmin"), MessageType.text, { quoted: m })
    }
}