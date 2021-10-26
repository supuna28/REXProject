module.exports = {
    name: "demote",
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, participants }) {
        if (!m.mentionedJid[0]) throw global.msgFail[global.language].notMentioned
        let members = participants.filter(member => member.isAdmin).map(member => member.jid)
        let users = participants.filter(user => members.includes(user))
        for (let user of users) await conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
    }
}