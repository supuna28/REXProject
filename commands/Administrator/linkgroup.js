module.exports = {
    name: ['linkgroup', 'linkgc'],
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        try {
            const code = await conn.groupInviteCode(m.chat)
            conn.reply(m.chat, `Here's your group link invite:\nhttps://chat.whatsapp.com/${code}`, m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}