module.exports = {
    name: "ping",
    owner: true,
    async run(m, { conn }) {
        conn.sendMessage(m.chat, "pong", 'conversation', { quoted: m })
    }
}