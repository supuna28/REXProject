module.exports = {
    name: ['changenamegroup', 'cngc'],
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw global.msgFail[global.language].textNotIncluded
        try {
            subject = await conn.groupUpdateSubject(m.chat, text)
            conn.reply(m.chat, "Successfully change the group name.", m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}