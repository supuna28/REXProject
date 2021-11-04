module.exports = {
    name: ['changedescriptiongroup', 'cdgc'],
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw global.msgFail[global.language].textNotIncluded
        try {
            subject = await conn.groupUpdateDescription(m.chat, text)
            conn.reply(m.chat, "Successfully change the group description.", m)
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }
    }
}