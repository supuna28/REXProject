module.exports = {
    name: "ping",
    owner: true,
    async run(conn, m, args) {
        conn.sendMessage(m.chat, "pong", 'conversation', { quoted: m })
    }
}