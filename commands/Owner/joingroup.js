module.exports = {
    name: ['joingroup', 'joingc'],
    tags: "owner",
    owner: true,
    async run(m, { conn, text }) {
        let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
        let [_, code] = text.match(linkRegex) || []
        if (!code) throw 'Your link is invalid'
        let result = await conn.acceptInvite(code)
        conn.reply(m.chat, `Successfully joined the group: ${result.gid}`, m)
    }
}