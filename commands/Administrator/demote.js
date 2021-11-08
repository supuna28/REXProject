const i18n = require('i18n')
module.exports = {
    name: "demote",
    tags: "admin",
    description: i18n.__('group.demote.description'),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, participants }) {
        if (!m.mentionedJid[0]) throw i18n.__("failed.notMentioned")
        let members = participants.filter(member => member.isAdmin).map(member => member.jid)
        let users = participants.filter(user => members.includes(user))
        for (let user of users) await conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
    }
}