module.exports = {
  name: ["owner", "creator"],
  tags: "info",
  async run(m, { conn }) {
    for (let owner of global.owner) {
      conn.sendContact(m.chat, owner, await conn.getName(owner + "@s.whatsapp.net"), m)
    }
  }
}