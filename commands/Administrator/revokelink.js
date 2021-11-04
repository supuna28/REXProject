module.exports = {
    name: ["revokelink", 'resetlinkgc'],
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        try {
            const res = await conn.revokeInvite(m.chat)
            conn.reply(m.chat, `Successfully reset the group link, the code is:\n${res.code}`, m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}