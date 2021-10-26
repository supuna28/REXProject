module.exports = {
    name: "demote",
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, participants }) {
        let members = participants.filter(member => member.isAdmin).map(member => member.jid)
        let users = participants.filter(user => members.includes(user))
        for (let user of users) await conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
    }
}