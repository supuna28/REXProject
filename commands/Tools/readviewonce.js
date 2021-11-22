const i18n = require("i18n")

module.exports = {
  name: "readviewonce",
  description: i18n.__("tools.readviewonce.description"),
  tags: "tools",
  async run(m, { conn, text }) {
    if (!m.quoted) throw i18n.__("tools.readviewonce.noMessage")
    if (!m.quoted.type === "viewOnceMessage") throw i18n.__("tools.readviewonce.notViewOnceMessage")
    await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.quoted.id), false, { readViewOnce: true }).catch(_ => conn.reply(m.chat, i18n.__("tools.readviewonce.failed")))
  }
}