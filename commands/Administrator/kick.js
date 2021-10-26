const { MessageType } = require("@adiwajshing/baileys")

module.exports = {
    name: "kick", // name of the command
    group: true,
    admin: true, // if you're using on group
    botAdmin: true, // if you're using on group, same at up there
    owner: false, // owner only
    async run(m, { conn, args }) {
        // fill your code here
        if (!m.mentionedJid[0]) throw global.msgFail[global.language].notMentioned
        let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
        let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
        for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupRemove(m.chat, [user])
        conn.sendMessage(m.chat, global.msgBot.afterAdmin, MessageType.text, { quoted: m })
    }
}